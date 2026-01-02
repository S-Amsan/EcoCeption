package com.example.backend.model.http.res;

import com.example.backend.model.UserStats;
import lombok.Data;

/**
 * Dedicated DTO to expose user counters without mixing them into {@link UserResponse}.
 */
@Data
public class UserStatsResponse {

    private Integer points;
    private Integer trophies;
    private Integer flames;

    public UserStatsResponse() {}

    public UserStatsResponse(Integer points, Integer trophies, Integer flames) {
        this.points = points;
        this.trophies = trophies;
        this.flames = flames;
    }

    public UserStatsResponse(UserStats stats) {
        if (stats == null) {
            this.points = 0;
            this.trophies = 0;
            this.flames = 0;
            return;
        }
        this.points = stats.getPoints();
        this.trophies = stats.getTrophies();
        this.flames = stats.getFlames();
    }
}
