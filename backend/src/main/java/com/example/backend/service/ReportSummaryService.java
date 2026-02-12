package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.ReportSummary;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ReportSummaryService {

    @Value("${google.key}")
    private String apiKey;

    private static final String API_URI =
        "https://vision.googleapis.com/v1/images:annotate";

    public ReportSummary generateSummary(Post post)
        throws IOException, URISyntaxException, InterruptedException {
        VisionRequest requestBody = new VisionRequest(
            List.of(
                new VisionRequest.AnnotateRequest(
                    new VisionRequest.Image(post.getImageUrl()),
                    List.of(new VisionRequest.Feature("SAFE_SEARCH_DETECTION"))
                )
            )
        );

        HttpClient client = HttpClient.newHttpClient();
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(requestBody);

        HttpRequest request = java.net.http.HttpRequest.newBuilder()
            .uri(new URI(ReportSummaryService.API_URI + "?key=" + apiKey))
            .header("Content-Type", "application/json")
            .POST(java.net.http.HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(
            request,
            HttpResponse.BodyHandlers.ofString()
        );

        var responses = objectMapper.readValue(
            response.body(),
            VisionResponses.class
        );

        return responses.responses().getFirst().safeSearchAnnotation();
    }

    private record VisionResponses(List<VisionResponse> responses) {}

    private record VisionResponse(ReportSummary safeSearchAnnotation) {}

    private record VisionRequest(List<AnnotateRequest> requests) {
        static record AnnotateRequest(Image image, List<Feature> features) {}
        public record Image(String imageUri) {}
        public record Feature(String type) {}
    }
}
