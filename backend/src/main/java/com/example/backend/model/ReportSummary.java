package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ReportSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    Level adult;

    @Enumerated(EnumType.STRING)
    Level violence;

    @Enumerated(EnumType.STRING)
    Level racy;

    @Enumerated(EnumType.STRING)
    Level medical;

    @Enumerated(EnumType.STRING)
    Level spoof;

    public enum Level {
        VERY_UNLIKELY,
        UNLIKELY,
        POSSIBLE,
        LIKELY,
        VERY_LIKELY,
    }
}
