var posts=["2024/09/25/fgfobdpqjs正在测试Hexo博客/","2024/09/25/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };