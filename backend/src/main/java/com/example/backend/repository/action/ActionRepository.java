package com.example.backend.repository.action;

import com.example.backend.model.User;
import com.example.backend.model.action.Action;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {
    List<Action> findAllByUser(User user);
}
