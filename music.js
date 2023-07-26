// declaring variables********************************
var isPlaying = false;
var currentFile = 0;
var change = false
var buttonState = document.getElementById("playPause").getAttribute("src");
var progress = document.getElementById('progressBar');
var durationNow = document.getElementById('currentTime');
var durationTotal = document.getElementById('totalTime');
if (currentFile==0) {
  progress.disabled=true;
  }
  
// make a factory function to cunstruct song objects  
function song(name, cover, artist, src) {
  this.name = name;
  this.cover = cover;
  this.artist = artist;
  this.src = src;
}
// song list************************************ add new at bottom
var song1 = new song("Sweet Little Lies.mp3", "src/img/0.jfif", "bülow", "src/songs/Sweet Little Lies.mp3");
var song2 = new song("On My Way.mp3", "src/img/3.png", "Alan Walker", "src/songs/On My Way.mp3");
var song3 = new song("Game Over.mp3", "src/img/1.jpg", "Karan Aujla", "src/songs/Game Over.mp3");
var song4 = new song("25-25.mp3", "src/img/2.jpg", "Arjan Dhillon", "src/songs/25-25.mp3");
var song5 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song6 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song7 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song8 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song9 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song10 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song11 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");
var song12 = new song("52 Bars.mp3", "src/img/4.jfif", "Karan Aujla", "src/songs/52 Bars.mp3");


// make a new array with song objects*********************
var songList = new Array(song1, song2, song3, song4, song5,song6 ,song7,song8,song9,song10,song11,song12);
var count = 1; // to generate id
// create cards for each song*****************************
songList.forEach(function (element) {
  var cards = document.getElementById("cards");
  var card = document.createElement("div");
  card.className = "card";
  card.id = count;
  card.innerHTML = `
     <img src=${element.cover} alt=""> <h4 class="fontPrimary">${element.name}</h4>
`;
  // console.log(element);
  cards.appendChild(card);
  count++;

  // function playAudio()
});

// card click event handler****************************
var selection = document.querySelectorAll(".card");

selection.forEach((element) => {
  element.addEventListener("click", function () {
    var file = this.id;
    // console.log(file);
    playAudio(file);
    return file;
  });
});
var played;
// funcions for playing**********************************
function playAudio(file) {
  if (played) {
    played.pause();
    document
      .getElementById("playPause")
      .setAttribute("src", "src/img/play.png");
  }

  var audio = songList[file - 1];
  var audioSrc = audio.src;
  var player = new Audio(audioSrc);
  player.play();
  document.getElementById("playPause").setAttribute("src", "src/img/pause.png");
  document.getElementById('coverImg').setAttribute("src", audio.cover);
  document.getElementById('nametext').innerText = audio.name;
  document.getElementById('artist').innerText = audio.artist;
  // console.log(audioSrc);
  isPlaying = true;
  played = player;
  currentFile = file;
  // console.log(played);
  active(file);
  progress.disabled=false;
  player.addEventListener("timeupdate", function () {
    progress.max = played.duration;
    progress.value = played.currentTime;
    var getMinute = Math.floor(played.currentTime / 60);
    var getSeconds = Math.floor(played.currentTime % 60);
    var timeNow = getMinute + ':' + getSeconds;
    if (getSeconds < 10) {
      var timeNow = getMinute + ':' + '0' + getSeconds;
    }
    // console.log(timeNow);
    durationNow.innerText = timeNow;
    var totalMinute = Math.floor(played.duration / 60);
    var totalSeconds = Math.floor(played.duration % 60);
    var getDuration = totalMinute + ':' + totalSeconds;
    if (totalSeconds < 10) {
      var getDuration = totalMinute + ':' + '0' + totalSeconds;
    }
    if (isNaN(totalMinute)) {

    }
    else {
      durationTotal.innerText = getDuration;

    }

  });
  player.addEventListener('ended', function () {
    document.getElementById('next').click();
  })
}
// function for pause**************************************
function pause() {
  played.pause();
  isPlaying = false;
  document.getElementById("playPause").setAttribute("src", "src/img/play.png");
}
// play-pause button click handle********************************
document.getElementById("playPause").addEventListener("click", function () {
  // console.log(isPlaying);
  if (isPlaying == true) {
    pause();
  } else {
    if (played) {
      played.play();
      isPlaying = true;
      document
        .getElementById("playPause")
        .setAttribute("src", "src/img/pause.png");
    } else {
      playAudio(1);
    }
  }
});
// previous and next button function******************************
document.getElementById('prev').addEventListener("click", function () {
  // console.log(currentFile);
  if (currentFile > 1 && played) {
    currentFile--;
    playAudio(currentFile);
  }
  else if (currentFile = 1 && played) {
    playAudio(songList.length);
  }
});

document.getElementById('next').addEventListener("click", function () {
  // console.log(currentFile);
  if (currentFile >= 1 && currentFile < songList.length) {
    currentFile++;
    playAudio(currentFile);
  }
  else if (currentFile = songList.length && played) {
    playAudio(1);
  }
});

// hadle progress bar tasks******************************
document.getElementById('progressBar').addEventListener('input', function () {
  console.log(this.value);
  played.currentTime = this.value;
});

// play pause next and previous using keybord keypress************************
document.addEventListener("keypress", function (event) {
  // console.log(event.key);
  switch (event.key) {
    case " ":
      document.getElementById("playPause").click();
      break;
    case "a":
    case "A":
      document.getElementById("prev").click();
      break;
    case "d":
    case "D":
      document.getElementById("next").click();
      break;

  }
});
function active(currentFile) {


  var activeSong = document.querySelectorAll(".card");
  activeSong.forEach(element => {
    element.style.cssText = " background-color:white;color: black;";
  });
  document.getElementById(currentFile).style.cssText = " background-color:#232740f0;color: white;";
}