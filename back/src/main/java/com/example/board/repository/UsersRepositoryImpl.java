package com.example.board.repository;

import com.example.board.domain.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UsersRepositoryImpl implements UsersRepository{
    private final UsersMapper usersMapper;


    @Override
    public void join(Users users) {
        usersMapper.join(users);
    }


    @Override
    public Users login(Users users) {
        return usersMapper.login(users);
    }

    @Override
    public Users getUserData(Long usersId) {
        return usersMapper.getUserData(usersId);
    }

}
