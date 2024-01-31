package com.example.board.controller;

import com.example.board.domain.Board;
import com.example.board.domain.BoardAssist;
import com.example.board.service.BoardService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Board board, HttpSession session) {

//        if (id != null) {
//            board.setUsers_id(id);
//            boardService.add(board);
//            log.info("Board added successfully. User ID: {}, Board Content: {}", id, board);
//            return ResponseEntity.ok("add Board Success");
//        } else {
//            // 세션이 없는 경우 로그만 출력
//            log.info("Session does not exist. Board content: {}", board);
//            return ResponseEntity.ok("add Board Success");
//        }

        Long id = (Long) session.getAttribute("id");    // session 검색하여 users_id 정보 가져오기
        board.setUsers_id(id);                                // board 테이블에 users_id 컬럼 설정
        boardService.add(board);                              // service 메서드 호출
        return ResponseEntity.ok("add Board Success");  // 성공하면 ResponseEntity.ok 클라이언트 반환
    }

    @GetMapping("/viewList")
    public ResponseEntity<List<Board>> viewList() {

        List<Board> boards = boardService.viewList(); // service 메서드 호출한 데이터 저장
        for (Board board : boards) {                  // boards 의 갯수만큼 for 문
            String nickname = board.getNickname();    // DB에서 users 테이블의 Nickname 컬럼 저장
            board.setNickname(nickname);              // board 테이블의 nickname 컬럼 성정
        }
        return ResponseEntity.ok(boards);             // 성공하면 ResponseEntity.ok 클라이언트 반환
    }

    @GetMapping("/showBoard/{bid}")
    public ResponseEntity<Board> showBoard(@PathVariable Long bid) {
        Board board = boardService.ShowBoard(bid);  // service 메서드 호출한 데이터 저장
        if (board == null) {                        // board 가 null 일때 해당 게시물이 존재하지 않을때
            return ResponseEntity.notFound().build();   // 404 에러 반환
        }

        log.info("board Data : {}", board);

        String nickname = board.getNickname();    // DB에서 users 테이블의 Nickname 컬럼 저장
        board.setNickname(nickname);              // board 테이블의 nickname 컬럼 성정

        return ResponseEntity.ok(board);          // 성공하면 ResponseEntity.ok 클라이언트 반환
    }


    @PutMapping("/modifyBoard/{bid}")   // 수정 PUTMapping
    public ResponseEntity<Board> modifyBoard(@RequestBody Board board) {
        boardService.modifyBoard(board);    // service 메서드 호출
        return ResponseEntity.ok(board);    // 성공하면 ResponseEntity.ok board 객체 반환
    }

    @DeleteMapping("deleteBoard/{bid}")
    public ResponseEntity<String> deleteBoard(@PathVariable Long bid) {
        boardService.deleteBoard(bid);
        return ResponseEntity.ok("delete Success!");
    }
}
