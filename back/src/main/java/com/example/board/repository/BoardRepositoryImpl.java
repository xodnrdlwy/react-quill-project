package com.example.board.repository;

import com.example.board.domain.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepositoryImpl implements BoardRepository{
    private final BoardMapper boardMapper;

    @Override
    public void add(Board board) {
        boardMapper.add(board);
    }

    @Override
    public List<Board> viewList() {
        return boardMapper.viewList();
    }

    @Override
    public Board ShowBoard(Long bid) {
        return boardMapper.ShowBoard(bid);
    }

    @Override
    public void modifyBoard(Board board) {
        boardMapper.modifyBoard(board);
    }


    @Override
    public void deleteBoard(Long bid) {
        boardMapper.deleteBoard(bid);
    }



}
