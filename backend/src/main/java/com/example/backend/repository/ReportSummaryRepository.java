package com.example.backend.repository;

import com.example.backend.model.ReportSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportSummaryRepository
    extends JpaRepository<ReportSummary, Long> {}
