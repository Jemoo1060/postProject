$(document).ready(function () {
    preInfo();
})
// 현재 정보 불러오기(수정전)
function  preInfo(){
    let id = window.location.search.split("=")[1];
    $.ajax({
        type: 'GET',
        url: `/api/detailposts/${id}`,
        success: function (response) {
            let post = response;
            $('#title').val(post.title);
            $('#username').val(post.username);
            $('#content').val(post.content);
        }
    })

}
// 글 정보 수정하기
function updatePost() {
    let username = $('#username').val();
    let title = $('#title').val();
    let content = $('#content').val();
    let id = window.location.search.split("=")[1];

    if(username.length > 8 || username.length == 0){
        alert('작성자는 1 ~ 8자리로 설정해주세요');
        $('#username').val('');
        $('#username').focus();
        return
    }
    else if(title.length > 12 || title.length == 0){
        alert('제목은 1 ~ 12자리로 설정해주세요');
        $('#title').val('');
        $('#title').focus();
        return
    }
    else if(content.length == 0){
        alert('글 내용을 작성해주세요');
        $('#content').focus();
        return
    }

    let data = {'title': title, 'username': username, 'content': content};
    $.ajax({
        type: "PUT",
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('글이 성공적으로 수정되었습니다.');
            let post = response;
            window.location.href = '/detailPost.html?id=' + post.id;
        }
    });
}