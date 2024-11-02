import WebSocket from "ws";
import Audic from "audic";

const musicFolderPath = "../../music/";

const musicList = {
  24: "himamazha",
  26: "imCold",
  27: "btsFire",
  28: "playWithFire",
};

let audioPlayer;
const ws = new WebSocket("wss://ntfy.sh/thaapasakhi-server/ws");

ws.addEventListener("message", function (event) {
  const data = JSON.parse(event.data);
  console.log(data);

  analyzeTemperature(parseInt(data.message));
});

function analyzeTemperature(tempInCelcius) {
  const musicName = musicList[tempInCelcius];

  if (!musicName) {
    console.log("No music for this temperature");
  } else {
    console.log(musicName);
    playMusic(musicName);
  }
}

function playMusic(musicName) {
  if (audioPlayer) {
    audioPlayer.destroy();
  }

  audioPlayer = new Audic(musicFolderPath + musicName + ".mp3");

  audioPlayer.play();
}
