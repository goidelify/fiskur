getVideos();

function getAge(age){
  var ageInHours = age / 1000 / 3600;

  if(ageInHours > 365*24)
    return "Fyrir " + age / (365*24) + " ári/árum síðan";
  if(ageInHours > 30*24)
    return "Fyrir " + age / (30*24)+ " mánuði/mánuðum síðan";
  if(ageInHours > 7*24)
    return "Fyrir " + age / (7*24) + " víku/víkum síðan";
  if(ageInHours > 24)
    return "Fyrir " + age / 24 + " degi/dögum síðan";

  return "Fyrir " + age + " klukkustund/klukkustundum síðan"
}

function getVideos(){
    var data = JSON.parse();
    setVideos(data.categories, data.videos);

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'videos.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == 200) {
        callback(xobj.responseText);
      }
    }
    xobj.send(null);

    }

// Call to function with anonymous callback
loadJSON(function(response) {
  data = JSON.parse(response);

  console.log(data[0].id);
}


function setVideos(categories, videos){
  console.log("selur");
  console.log(videos.id);
}
