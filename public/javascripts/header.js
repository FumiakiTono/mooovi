$(function(){
  $(".post").hover(function(){
    $(".post").css("background-color", "green");
  }, function() {
      $(".post").css("background-color", "");
  });

  $(".mypage").hover(function(){
    $(".mypage").css("background-color", "red");
    // DOMの追加
    $("#mypage").append("<ul id='mypage-list'><li>マイページ1</li><li>マイページ2</li></ul>");
    $("#mypage-list").css("list-style", "none");
  }, function() {
      $(".mypage").css("background-color", "");
      $("#mypage-list").remove();
  });

  $(".signout").hover(function(){
    $(".signout").css("background-color", "blue");
  }, function() {
      $(".signout").css("background-color", "");
  });

  $(".signout").click(function(){
    alert("ログアウトしますか？");
  });
});
