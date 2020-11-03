<template>
  <div>
    <q-page class="bg-black shadow-24">
      <q-btn to="/" color="red">back</q-btn>
      <audio id="myAudio" src="./test.wav" controls></audio>
      <canvas
        id="myCanvas"
        width="300"
        height="150"
        style="border:1px solid #d3d3d3;"
      />
    </q-page>

    <q-footer class="speakFoot shadow-up-24"> </q-footer>
  </div>
</template>

<script>
import AudioRecorder from "../utils/audiorecorder";
import { remote } from "electron";
import { date } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      analyser: null,
      dataArray: [],
      mic_loading: false,
      audioRecorder: null,
      waveIndex: 0,
      timer: null,
      buffer: [],
      startTime: 0,
      mediaRecorder: null,
      siriWave: "",
      textList: [
        "Edit my voice",
        "Rip an audio CD",
        "Create DVD Disc",
        "I want to view photos",
        "Tag my photos",
        "Play a music",
        "Create audio CD",
        "Backup my files to disc"
      ]
    };
  },

  mounted() {
    const audio = document.getElementById("myAudio");

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    analyser.fftSize = 512;

    source.connect(analyser);

    analyser.connect(ctx.destination);

    this.visualize(analyser);
    // var siriWave2 = new SiriWave({
    //   container: document.getElementById("siri-container2"),
    //   width: 700,
    //   height: 300,
    //   backgroundColor: "black",
    //   style: "ios",
    //   color: "#aaaa00",
    //   pixelDepth: 0.02, //
    //   lerpSpeed: 0.01,
    //   speed: 0.1,
    //   amplitude: 0.5,
    //   frequency: 5, //
    //   cover: false,
    //   ratio: 2, //
    //   autostart: false
    // });

    // setTimeout(() => {
    //   siriWave2.start();
    // }, 400);
  },
  beforeDestroy() {
    this.$root.$off("send");
    this.$root.$off("receive");
  },
  methods: {
    visualize(analyser) {
      var canvas = document.getElementById("myCanvas");
      var canvasCtx = canvas.getContext("2d");
      let WIDTH = canvas.width;
      let HEIGHT = canvas.height;

      analyser.fftSize = 256;
      var bufferLengthAlt = analyser.frequencyBinCount;
      console.log(bufferLengthAlt);
      var dataArrayAlt = new Uint8Array(bufferLengthAlt);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      var drawAlt = function() {
        analyser.getByteFrequencyData(dataArrayAlt);
        if (dataArrayAlt) {
          let drawVisual = requestAnimationFrame(drawAlt);
        }
        //console.log(dataArrayAlt)
        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLengthAlt; i++) {
          barHeight = dataArrayAlt[i];
          canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          canvasCtx.fillRect(
            x,
            HEIGHT - barHeight / 2,
            barWidth,
            barHeight / 2
          );
          x += barWidth + 1;
        }
      };

      drawAlt();
    }
  }
};
</script>
