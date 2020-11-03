<template>
  <div>
    <q-page class="bg-black shadow-24">
      <div class="speakBanner ">
        <q-btn
          flat
          round
          color="grey"
          icon="keyboard_backspace"
          to="/"
          class="z-top"
        />
        <div class="siriwave">
          <div id="siriContainer1"></div>
          <div id="siriContainer2" style="margin:20px 0"></div>
          <div id="siriContainer3" style="margin:50px 0"></div>
        </div>
      </div>
      <!-- <canvas
        id="myCanvas"
        width="300"
        height="150"
        style="border:1px solid #d3d3d3;"
      /> -->
      <div class=" row justify-center speakContainer ">
        <q-list>
          <q-item class="sayTo">
            <q-item-label header class="micText text-h5">
              <q-icon name="mic" size="30px" class="q-mr-xs" />{{
                $t("Say to me")
              }}:
            </q-item-label>
          </q-item>
          <q-item
            class="text-grey"
            v-for="(item, index) in textList"
            :key="index"
            style="margin:-10px 0"
          >
            <q-item-section>· {{ $t(item) }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="speakFoot shadow-up-12">
        <q-toolbar class="row justify-center ">
          <div
            class="speakBtn z-top"
            @click.capture="mic_loading ? btnRecordStop() : btnRecord()"
          >
            <!-- <div class="speakBtn z-top" @click.capture="open_mic()"> -->
            <q-btn
              round
              class="glossy speakIcon"
              :loading="mic_loading"
              icon="mic"
              color="white"
              size="20px"
            >
              <template v-slot:loading>
                <q-spinner-bars />
              </template>
              <div class="pulse1"></div>
              <div class="pulse2"></div>
            </q-btn>
          </div>
        </q-toolbar>

        <div class="loader-container row  justify-center ">
          <div
            v-for="(item, index) in currentFreq"
            :key="index"
            :style="
              `height:${item * 0.8 + 5}%;background: ${
                index >= waveIndex ? 'grey' : 'white'
              };`
            "
          ></div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import AudioRecorder from "../utils/audiorecorder";
import axios from "axios";
import { remote } from "electron";
import { date } from "quasar";
import SiriWave from "../statics/siriwave";
const ctx = new window.AudioContext({
  sampleRate: 16000
});
export default {
  data() {
    return {
      analyser: null,
      mic_loading: false,
      audioRecorder: null,
      waveIndex: 0,
      waveTotal: [],
      timer: null,
      buffer: [],
      siriWave: "",
      currentFreq: new Array(32).fill(0),
      textList: [
        "Edit my voice",
        "Rip an audio CD",
        "Create DVD Disc",
        "I want to view photos",
        "Tag my photos",
        "Play a music",
        "Create audio CD",
        "Backup my files to disc"
      ],
      token: "",
      result: ""
    };
  },

  mounted() {
     
    let _this = this;
    this.siriWave = [
      new SiriWave({
        container: document.getElementById("siriContainer1"),
        backgroundColor: "black",
        style: "ios",
        color: "#00F5FF",
        speed: 0,
        amplitude: 0.2,
        frequency: 6,
        autostart: true
      }),
      new SiriWave({
        container: document.getElementById("siriContainer2"),
        backgroundColor: "black",
        style: "ios",
        color: "#1E90FF",
        speed: 0,
        amplitude: 0.4,
        frequency: 4,
        autostart: true
      }),
      new SiriWave({
        container: document.getElementById("siriContainer3"),
        backgroundColor: "black",
        style: "ios",
        color: "#9370DB",
        speed: 0,
        amplitude: 0.3,
        frequency: 5,
        autostart: true
      })
    ];
    axios({
      method: "post",
      url: "/auth",
      params: {
        client_id: "kVcnfD9iW2XVZSMaLMrtLYIz",
        client_secret: "O9o1O213UgG5LFn0bDGNtoRN3VWl2du6",
        grant_type: "client_credentials"
      },
      timeout: 3500
    })
      .then(res => {
        this.token = res.data.access_token;
        console.log(this.token);
      })
      .catch(function(error) {
        console.log(error);
        _this.$q.notify({
          message: _this.$t('Network error'),
          timeout: 1500
        });
      });
  },
  watch: {
    waveIndex() {
      //limit record time
      if (this.waveIndex == 30) {
        this.$q.notify(his.$t('Time limit'));
        this.btnRecordStop();
      }
    }
  },
  beforeDestroy() {
    this.$root.$off("send");
    this.$root.$off("receive");
  },
  methods: {
    visualize(analyser) {
      let _this = this;

      analyser.fftSize = 64;
      //bufferLength is fftsize/2
      var bufferLengthAlt = analyser.frequencyBinCount;
      var dataArrayAlt = new Uint8Array(bufferLengthAlt);

      var drawAlt = function() {
        analyser.getByteFrequencyData(dataArrayAlt);
        _this.currentFreq.splice(
          0,
          _this.currentFreq.length,
          ...dataArrayAlt.slice(0, 32)
        );

        if (dataArrayAlt && _this.mic_loading == true) {
          let drawVisual = requestAnimationFrame(drawAlt);
        }
        //record end
        else {
          dataArrayAlt = [];
          _this.currentFreq = new Array(32).fill(0);
        }
      };

      drawAlt();
    },
    btnRecord() {
      this.buffer = []; //clear
      this.mic_loading = true;
      this.waveIndex = 0;
      this.timer = setInterval(() => {
        this.waveIndex++;
        this.waveTotal.push(
          //sum
          this.currentFreq.reduce((total, currentValue, currentIndex, arr) => {
            return total + currentValue;
          })
        );
      }, 1000);
      //siriwave
      this.siriWave.map(wave => wave.start());
      this.siriWave.map(wave => wave.setSpeed(0.05));

      // analyser
      this.analyser = ctx.createAnalyser();
      // recognition
      // authenticate().then(loadClient)
      // gapi.client.speech.speech
      //   .recognize({
      //     resource: {
      //       audio: {
      //         uri:
      //           "https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav"
      //       }
      //     }
      //   })
      //   .then(
      //     function(response) {
      //       // Handle the results here (response.result has the parsed body).
      //       console.log("Response", response);
      //     },
      //     function(err) {
      //       console.error("Execute error", err);
      //     }
      //   );

      navigator.getUserMedia(
        {
          audio: true
        },
        mediastream => {
          const audioInput = ctx.createMediaStreamSource(mediastream);
          this.audioRecorder = new AudioRecorder(ctx);
          audioInput.connect(this.audioRecorder.node);
          this.audioRecorder.node.connect(ctx.destination);
          this.audioRecorder.start();
          //analyser
          audioInput.connect(this.analyser);
          this.visualize(this.analyser);
        },
        err => {
          console.log("getUserMedia failed.", err);
        }
      );
    },
    btnRecordStop() {
      let _this = this;
      this.audioRecorder.stop();
      const recorded = this.audioRecorder.exportWaveBlob();
      let src = window.URL.createObjectURL(recorded);
      this.waveIndex = this.waveIndex || 1;
      this.$root.$emit("send", [src, this.waveIndex, this.waveTotal]);

      this.mic_loading = false;
      this.waveTotal = [];
      clearInterval(this.timer);
      this.siriWave.map(wave => wave.stop());

      this.$router.push("/");

      const filepath = require("path").join(
        remote.app.getPath("userData"),
        "recorded.wav"
      );
      console.log(filepath);
      var reader = new FileReader();
      reader.readAsArrayBuffer(recorded);
      reader.onloadend = function() {
        // require("fs").writeFileSync(
        //   filepath,
        //   Buffer.from(new Uint8Array(reader.result))
        // );

        //audio to text api
        axios({
          method: "post",
          url: "/res",
          params: {
            dev_pid: "1737",
            cuid: "12345613265?",
            token: _this.token
          },
          data: reader.result,
          headers: {
            "Content-Type": " audio/wav;rate=16000"
          },
          timeout: 5000
        })
          .then(res => {
            if (res.data.result) {
              _this.result = res.data.result[0];
              //text to order api
              const { spawn } = require("child_process");
              const main = spawn("main", ["-t", _this.result]);
              //_this.$root.$emit("receive", "recognizing...");
              main.stdout.on("data", data => {
                let temp = data.toString().split(",");
                let software = temp[0].match(/\('?([\w ]*)'?/)[1];
                let method = temp[1].match(/'?([\w ]*)'?\)/)[1];
                _this.$root.$emit("receive", [software, method]);
              });
              main.stderr.on("data", data => {
                console.error(`stderr: ${data}`);
              });
            } else _this.$root.$emit("receive", [_this.$t('RecognizeFailed')]);
          })
          .catch(error => {
            _this.$root.$emit("receive", [_this.$t('Network error')]);
          });
      };
    }
  }
};
</script>

<style lang="scss">
.loader-container {
  overflow: hidden;
  height: 90px;
  width: 100%;
  margin-top: -55px;
  transform: rotateX(180deg);
}

.loader-container > div {
  //height: 100%;
  width: 3px !important;
  margin: 0 4.1px;
  //animation: load 3s ease-in-out infinite;
}

@keyframes warn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }

  25% {
    transform: scale(1);
    opacity: 0.1;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.25;
  }

  75% {
    transform: scale(1.2);
    opacity: 0.2;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.pulse1 {
  position: absolute;
  width: 66px;
  height: 66px;
  border: 5px solid rgb(113, 191, 243);
  border-radius: 33px;
  z-index: 1;
  opacity: 0;
  animation: warn 3s ease-out;
  animation-iteration-count: infinite;
}

.pulse2 {
  position: absolute;
  width: 72px;
  height: 72px;
  border: 4px solid rgb(149, 248, 248);
  border-radius: 35px;
  z-index: 1;
  opacity: 0;
  animation: warn 3s ease-out;
  animation-iteration-count: infinite;
}

canvas {
  width: 200vw !important; //canvas total width
}

.siriwave {
  margin-top: -13vh;
}

.siriwave > div {
  overflow: hidden;
  position: absolute;
  width: 100vw; //canvas width can see
  height: 200px;
}

#siriContainer2 > canvas {
  margin-top: 0.5vh;
  margin-left: -75px;
  transform: rotate(180deg);
}

#siriContainer3 > canvas {
  margin-top: 0vh;
  margin-left: -150px;
  transform: rotate(3deg);
}
</style>
