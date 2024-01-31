package com.example.board.repository;

import com.example.board.domain.Users;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UsersMapper {

    void join(Users users);

    Users login(Users users);

    Users getUserData(Long usersId);
}
