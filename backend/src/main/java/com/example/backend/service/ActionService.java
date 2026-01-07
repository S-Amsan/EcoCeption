package com.example.backend.service;

import org.springframework.stereotype.Service;

@Service
public class ActionService {

    public enum ActionType {
        DONATE(8),
        WIN_EVENT(7),
        WIN_COMPETITION(6),
        VOTE_5_POSTS(5),
        RECYCLE(4),
        ASSOCIATE(3),
        POST(2),
        RECOVER(1);

        private long id;

        public long getId() {
            return id;
        }

        ActionType(long actionId) {
            this.id = actionId;
        }
    }
}
