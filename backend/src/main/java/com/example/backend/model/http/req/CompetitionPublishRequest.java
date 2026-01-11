package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import java.util.Date;
import lombok.Data;

@Data
public class CompetitionPublishRequest {

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    private Date deadline;

    @NotNull
    private Integer goalPoints;

    @NotNull
    private Integer inscriptionCost;
}
