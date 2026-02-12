package com.example.backend.controller;

import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.ParrainageService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parrainage")
public class ParrainageController {

    @Autowired
    private ParrainageService parrainageService;

    @GetMapping("/code")
    public Map<String, String> getCode(@AuthenticationPrincipal MyUserDetails userDetails) {
        return Map.of("codeParrainage", userDetails.getUser().getCodeParrainage());
    }

    @GetMapping("/exists/{code}")
    public Map<String, Boolean> existsCode(@PathVariable String code) {
        return Map.of("exists", parrainageService.existsCode(code));
    }
}
