package com.example.board.service;

import com.example.board.domain.Users;
import com.example.board.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsersServiceImpl implements UsersService{
    private final UsersRepository usersRepository;


    @Override
    public void join(Users users) {
        usersRepository.join(users);
    }

    @Override
    public Users login(Users users) {
        return usersRepository.login(users);
    }

    @Override
    public Users getUserData(Long users_id) {
        return usersRepository.getUserData(users_id);
    }

}
