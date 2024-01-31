package com.example.board.service;

import com.example.board.domain.Board;

import java.util.List;

public interface BoardService {

    void add(Board board);


    List<Board> viewList();

    Board ShowBoard(Long bid);

    void modifyBoard(Board board);

    void deleteBoard(Long bid);


}
