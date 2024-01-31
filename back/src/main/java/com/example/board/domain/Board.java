package com.example.board.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Board {
    private Long bid;
    private String title;
    private String content;
    private Long users_id;
    private String nickname;
    private LocalDateTime regdate;

}
