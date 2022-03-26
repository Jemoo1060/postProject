package com.sparta.post.service;

import com.sparta.post.models.Post;
import com.sparta.post.models.PostRepository;
import com.sparta.post.models.PostRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor // final로 선언된 멤버 변수를 자동으로 생성합니다.
@Service // 서비스임을 선언합니다.
public class PostService {

    private final PostRepository postRepository;

    @Transactional // 메소드 동작이 SQL 쿼리문임을 선언합니다.
    public Post update(Long id, PostRequestDto postrequestDto) {
        Post post = postRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다.")
        );
        post.update(postrequestDto);
        return post;
    }
}
