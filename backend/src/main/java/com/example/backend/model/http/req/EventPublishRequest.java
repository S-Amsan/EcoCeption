package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import java.util.Date;
import lombok.Data;

@Data
public class EventPublishRequest {

    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @FutureOrPresent
    private Date deadline;

    @NotNull
    private Integer goalPoints;

    @NotNull
    private Integer inscriptionCost;
}
