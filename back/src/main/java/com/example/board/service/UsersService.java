package com.example.board.service;

import com.example.board.domain.Users;


public interface UsersService {

    void join(Users users);

    Users login(Users users);

    Users getUserData(Long usersId);
}
