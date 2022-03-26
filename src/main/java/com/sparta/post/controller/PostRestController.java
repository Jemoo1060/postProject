package com.sparta.post.controller;



import com.sparta.post.models.Post;
import com.sparta.post.models.PostRepository;
import com.sparta.post.models.PostRequestDto;
import com.sparta.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor // final로 선언된 멤버 변수를 자동으로 생성합니다.
@RestController // JSON으로 데이터를 주고받음을 선언합니다.
public class PostRestController {

    private final PostService postService;
    private final PostRepository postRepository;

    // 메인페이지 게시판 나열
    @GetMapping("/api/posts")
    public List<Post> getPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    // 게시판 등록
    @PostMapping("/api/posts")
    public Post createPost(@RequestBody PostRequestDto postrequestDto) {
        Post post = new Post(postrequestDto);
        postRepository.save(post);
        return post;
    }

    // 상세글 정보 나열
    @GetMapping("/api/detailposts/{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.findById(id).get();
    }

    // 특정 글 삭제
    @DeleteMapping ("/api/posts/{id}")
    public String deleteOne(@PathVariable Long id) {
        postRepository.deleteById(id);

        return  "";
    }

    @PutMapping("/api/posts/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody PostRequestDto requestDto) {
        return postService.update(id, requestDto);
    }



    // 글 전부 삭제
    @DeleteMapping ("/api/posts")
    public String deleteCourse() {
        postRepository.deleteAll();

        return "";
    }
}
