package com.example.board.repository;

import com.example.board.domain.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {

    // Create
    void add(Board board);

    // Read List
    List<Board> viewList();

    // Read Detail
    Board ShowBoard(Long bid);

    // Update
    void modifyBoard(Board board);


    // Delete
    void deleteBoard(Long bid);

}
