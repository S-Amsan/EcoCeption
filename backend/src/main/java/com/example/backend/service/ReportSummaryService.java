package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.ReportSummary;
import com.example.backend.repository.ReportSummaryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ReportSummaryService {

    @Value("${google.key}")
    private String apiKey;

    private static final String API_URI =
        "https://vision.googleapis.com/v1/images:annotate";

    @Autowired
    private ReportSummaryRepository reportSummaryRepository;

    public ReportSummary generateSummary(Post post)
        throws IOException, URISyntaxException, InterruptedException {
        // Fetch image bytes from URL and convert to base64
        byte[] imageBytes;
        try (
            var inputStream = new URI(post.getImageUrl()).toURL().openStream()
        ) {
            imageBytes = inputStream.readAllBytes();
        }
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        VisionRequest requestBody = new VisionRequest(
            List.of(
                new VisionRequest.AnnotateRequest(
                    new VisionRequest.Image(base64Image),
                    List.of(new VisionRequest.Feature("SAFE_SEARCH_DETECTION"))
                )
            )
        );

        HttpClient client = HttpClient.newHttpClient();
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(new URI(ReportSummaryService.API_URI + "?key=" + apiKey))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );

        var responses = objectMapper.readValue(
            response.body(),
            VisionResponses.class
        );

        ReportSummary summary = responses
            .responses()
            .getFirst()
            .safeSearchAnnotation();

        return reportSummaryRepository.save(summary);
    }

    private record VisionResponses(List<VisionResponse> responses) {}

    private record VisionResponse(ReportSummary safeSearchAnnotation) {}

    private record VisionRequest(List<AnnotateRequest> requests) {
        static record AnnotateRequest(Image image, List<Feature> features) {}
        public record Image(String content) {}
        public record Feature(String type) {}
    }
}
