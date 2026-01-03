package com.example.backend.controller;

import com.example.backend.model.Competition;
import com.example.backend.model.Success;
import com.example.backend.repository.CompetitionRepository;
import com.example.backend.repository.SuccessRepository;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private SuccessRepository successRepository;

    @GetMapping("/all")
    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }

    @GetMapping("/latest")
    public Competition getLatestCompetition() {
        return competitionRepository.findFirstByDeadlineAfterOrderByCreationDate(
            new Date()
        );
    }

    @GetMapping("/success")
    public List<Success> getAllSuccess() {
        return successRepository.findAll();
    }
}
