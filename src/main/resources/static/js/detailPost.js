$(document).ready(function () {
    detailShow();
})

// 상세 글 정보 조회
function detailShow() {
    let id = window.location.search.split("=")[1];
    $.ajax({
        type: 'GET',
        url: `/api/detailposts/${id}`,
        success: function (response) {
            $('#detail-info').empty();
            let post = response;
            let date = post.createdAt.split('T')[0] + " " + post.createdAt.split('T')[1].substring(0, 8);
            let tempHtml = `<h1>제목 : ${post.title}</h1>
                                    <p id="writer">작성자 : ${post.username} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 작성시간 : ${date}</p>
                                    <p id="content">내용 : ${post.content}</p>`;
            $('#detail-info').append(tempHtml);
            tempHtml = `<button class="button is-danger is-light" onclick="window.location.href ='postUpdate.html?id=${post.id}'">수정</button>
                                <button class="button is-danger is-light" onclick="deleteOne(${post.id})">삭제</button>
                                <button class="button is-danger is-light" onclick="window.location.href = 'index.html'">돌아가기</button>`
            $('#detail-btn').append(tempHtml);
        }
    })
}
// 게시글 삭제
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/posts/${id}`,
        success: function (response) {
            alert('글 삭제에 성공하였습니다.');
            window.location.href = 'index.html';
        }
    })
}

