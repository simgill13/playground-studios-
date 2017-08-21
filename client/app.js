var video = document.getElementById('video');
video.addEventListener('click',function(){
  console.log('test',video.canPlayType("video/mp4"))
  video.play();
},false);


