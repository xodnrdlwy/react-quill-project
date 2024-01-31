package com.example.board.repository;

import com.example.board.domain.Board;

import java.util.List;

public interface BoardRepository {
    void add(Board board);


    List<Board> viewList();

    Board ShowBoard(Long bid);

    void modifyBoard(Board board);

    void deleteBoard(Long bid);



}
