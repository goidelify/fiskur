var videos;
var addedVid;
var isPlaying = false;
var isMuted = false;
init();

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function init(){
  getVideos(function(response) {
    // Parse JSON string into object
      var vids = JSON.parse(response);
      videos = vids.videos;
      addVideo(getQueryStringValue('id'));
   });
 }

 function getVideos(callback){
     var xobj = new XMLHttpRequest();
     xobj.overrideMimeType("application/json");
     xobj.open('GET', 'videos.json', true);
     xobj.onreadystatechange = function () {
           if (xobj.readyState == 4 && xobj.status == "200") {
             callback(xobj.responseText);
           }
     };
     xobj.send(null);
 }

 function addVideo(id){
   var vidDiv = document.querySelector('.player');
   var titleDiv = document.querySelector('.title');

   var vid = document.createElement('video');
   vid.src = videos[id].video;
   vid.poster = videos[id].poster;
   vid.className = "row video";

   var title = document.createElement('heading');
   title.innerHTML = videos[id].title;
   title.className = 'heading-h1';

   titleDiv.appendChild(title);
   vidDiv.appendChild(vid);
   addedVid = vid;
   setButtons(id);
 }

 function setButtons(id){
   //Set play button. Switches between pause/play icon
   document.querySelector('.play').addEventListener('click', function(){
      if(!isPlaying){
        document.querySelector('.play').src = "img/pause.svg";
        document.querySelector('.play').alt = "Pause";
        addedVid.play();
      }
      else {
        document.querySelector('.play').src = "img/play.svg";
        document.querySelector('.play').alt = "Play";
        addedVid.pause();
      }
      isPlaying = !isPlaying;
   });
   //Set mute button. Switches between mute/unmute icon
   document.querySelector('.mute').addEventListener('click', function(){
      if(!isMuted){
        document.querySelector('.mute').src = "img/unmute.svg";
        document.querySelector('.mute').alt = "Unmute";
        addedVid.muted = true;
      }
      else {
        document.querySelector('.mute').src = "img/mute.svg";
        document.querySelector('.mute').alt = "Mute";
        addedVid.muted = false;
      }
      isMuted = !isMuted;
   });
   //Set fullscreen button
   document.querySelector('.fullscreen').addEventListener('click', function(){
     if(addedVid.requestFullscreen){
        addedVid.requestFullscreen();
      }else if (addedVid.mozRequestFullScreen) {
      addedVid.mozRequestFullScreen();
    } else if (addedVid.webkitRequestFullscreen) {
      addedVid.webkitRequestFullscreen();
    }
   });
   //Set next buttons
   document.querySelector('.next').addEventListener('click', function(){
     addedVid.currentTime += 3;
   });
   //Set back button
   document.querySelector('.back').addEventListener('click', function(){
     addedVid.currentTime -= 3;
   });
 }
