package com.example.board.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Users {
    private Long users_id;
    private String user_id;
    private String user_pw;
    private String nickname;
    private String user_name;
    private boolean rememberMe;
    private LocalDateTime regdate;
}