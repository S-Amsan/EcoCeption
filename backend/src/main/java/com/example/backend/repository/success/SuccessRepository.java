package com.example.backend.repository.success;

import com.example.backend.model.User;
import com.example.backend.model.success.Success;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuccessRepository extends JpaRepository<Success, Long> {
    List<Success> findAllByUser(User user);
}
