package com.example.board.repository;

import com.example.board.domain.Users;


public interface UsersRepository {

    void join(Users users);

    Users login(Users users);

    Users getUserData(Long usersId);
}
