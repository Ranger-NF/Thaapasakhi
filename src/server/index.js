import WebSocket from "ws";
import Audic from "audic";

const musicFolderPath = "../../music/";

const musicList = {
  26: "snowMan",
  27: "imCold",
  28: "himamazha",
  29: "ilavakaPoove",
  30: "goldenHour",
  31: "kadha",
  32: "btsFire",
  33: "playWithFire",
};

let audioPlayer;
const ws = new WebSocket("wss://ntfy.sh/thaapasakhi-server/ws");

ws.addEventListener("message", function (event) {
  const data = JSON.parse(event.data);

  if (data.event == "open") {
    console.log("Established websocket connection with ntfy!");
  } else {
    analyzeTemperature(parseInt(data.message));
  }
});

function analyzeTemperature(tempInCelcius) {
  const musicName = musicList[tempInCelcius];

  if (!musicName) {
    console.log("No music has been set for this temperature");
  } else {
    playMusic(musicName);
  }
}

function playMusic(musicName) {
  if (audioPlayer) {
    audioPlayer.destroy();
  }

  audioPlayer = new Audic(musicFolderPath + musicName + ".mp3");
  audioPlayer.play();

  console.log("Started playing: " + musicName);
}
