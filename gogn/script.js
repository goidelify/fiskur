init();
var videos;

function init(){
  getVideos(function(response) {
    // Parse JSON string into object
      var vids = JSON.parse(response);
      videos = vids.videos;
      console.log(vids.categories, vids.videos);
      setVideos(vids.categories);
   });
 }

function getAge(age){
  var d = new Date();
  var curTime = d.getTime();

  var ageInHours = (curTime - age) / 1000 / 3600;

  if(ageInHours > 365*24)
    return "Fyrir " + Math.round(ageInHours / (365*24)) + " ári/árum síðan";
  if(ageInHours > 30*24)
    return "Fyrir " + Math.round(ageInHours / (30*24))+ " mánuði/mánuðum síðan";
  if(ageInHours > 7*24)
    return "Fyrir " + Math.round(ageInHours / (7*24)) + " víku/víkum síðan";
  if(ageInHours > 24)
    return "Fyrir " + Math.round(ageInHours / 24) + " degi/dögum síðan";

  return "Fyrir " + ageInHours + " klukkustund/klukkustundum síðan"
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


function setVideos(categories){
  var col = document.createElement('div');
  col.className = 'col';
  for(var k = 0; k < categories.length; k++){
    col.appendChild(addCategory(categories[k]));
  }

  document.body.appendChild(col);
}

function addCategory(category){
  var row = document.createElement('div');
  row.className = 'category row';

  var categoryName = document.createElement('heading');
  categoryName.innerHTML = category.title;
  categoryName.className = 'heading-h1 col col-12';

  row.appendChild(categoryName);

  for(var i = 0; i < category.videos.length; i++){
    var newVid = addVideo(category.videos[i]-1);
    row.appendChild(newVid);
  }
  return row;

}

function addVideo(id){
  var vidDiv = document.createElement('div');
  vidDiv.className = "col col-6";

  var vid = document.createElement('video');
  vid.src = videos[id].video;
  vid.poster = videos[id].poster;
  vid.className = "video";
  vid.style.zIndex = "1";

  var vidDuration = document.createElement('p');
  vidDuration.innerHTML = getDuration(videos[id].duration);
  vidDuration.style.zIndex = "2";
  vidDuration.style.position = "absolute";
  vidDuration.style.marginLeft = "20px";
  vidDuration.style.marginTop = "20px";
  vidDuration.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  vidDuration.style.padding = "4px";
  vidDuration.style.borderRadius = "4px";

  var vidName = document.createElement('p');
  vidName.innerHTML = videos[id].title;
  vidName.className = "caption";

  var vidAge = document.createElement('p');
  vidAge.innerHTML = getAge(videos[id].created);
  vidAge.className = "age";

  vidDiv.appendChild(vidDuration);
  vidDiv.appendChild(vid);
  vidDiv.appendChild(vidName);
  vidDiv.appendChild(vidAge);

  return vidDiv;
}

function getDuration(duration){
  var sec;
  var min;

  if((duration%60) >= 10)
    sec = duration%60;
  else
    sec = "0" + duration%60;

  if((Math.floor(duration/60)) >= 10)
    min = Math.floor(duration/60);
  else
    min = "0" + Math.floor(duration/60);

  return min + ":" + sec;
}
