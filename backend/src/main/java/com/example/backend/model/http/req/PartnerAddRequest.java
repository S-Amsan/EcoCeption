package com.example.backend.model.http.req;

import com.example.backend.model.partner.PartnerType;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PartnerAddRequest {

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    private PartnerType type;

    @NotNull
    private MultipartFile image;
}
