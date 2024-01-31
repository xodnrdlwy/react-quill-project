package com.example.board.controller;

import com.example.board.domain.Users;
import com.example.board.service.UsersService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
public class UsersController {
        private final UsersService usersService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody Users users) {
        log.info("회원정보: {}", users);
        usersService.join(users);
        return ResponseEntity.ok("Success");
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users users, HttpServletResponse response, HttpSession session) {
        log.info("remember Me : {} ", users);
        Users dbuser = usersService.login(users);

        if (dbuser != null) {   // 회원일때

            // 쿠키 등록 rememberMe를 선택했을 시
            if (users.isRememberMe()) {
                Cookie cookie = new Cookie("E-mail", String.valueOf(dbuser.getUser_id()));
                cookie.setMaxAge(60 * 60 * 24 * 7);   // 쿠키 수명 설정 초단위
                cookie.setPath("/");    // 모든 경로에 적용
                response.addCookie(cookie);
            }

            // 세션 등록
            session.setAttribute("id", dbuser.getUsers_id());
            Long users_id = (Long) session.getAttribute("id");
            log.info("users_id Data : ", users_id);
            return ResponseEntity.ok("Success");
        } else { // 회원이 아닐때
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logout Seccessful");
    }


    @GetMapping("/show/{users_id}")
    public ResponseEntity<Users> getUser(HttpSession session) {
        Long users_id = (Long) session.getAttribute("id");
        log.info("users_id Data : ", users_id);
        Users userData = usersService.getUserData(users_id);
        if (userData != null) {
            return ResponseEntity.ok(userData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }






}
