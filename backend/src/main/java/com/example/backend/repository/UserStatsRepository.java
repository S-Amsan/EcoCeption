package com.example.backend.repository;

import com.example.backend.model.UserStats;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatsRepository extends JpaRepository<UserStats, Long> {
    Optional<UserStats> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
