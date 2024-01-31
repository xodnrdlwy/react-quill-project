package com.example.board.service;

import com.example.board.domain.Board;
import com.example.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;

    @Override
    public void add(Board board) {
        boardRepository.add(board);
    }

    @Override
    public List<Board> viewList() {
        return boardRepository.viewList();
    }

    @Override
    public Board ShowBoard(Long bid) {
        return boardRepository.ShowBoard(bid);
    }

    @Override
    public void modifyBoard(Board board) {
        boardRepository.modifyBoard(board);
    }


    @Override
    public void deleteBoard(Long bid) {
        boardRepository.deleteBoard(bid);
    }




}
