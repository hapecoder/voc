<template>
  <div>
    <audio ref="audio" :src="src"></audio>
    <q-btn
      round
      dense
      style="background: white;color: blue"
      size="9px"
      :icon="playing ? 'pause' : 'play_arrow'"
      @click="play"
    ></q-btn>
    <div class="wave row">
      <div
        class="self-center"
        v-for="(item, index) in waveTotal"
        :key="index"
        :style="
          `height:${item*0.02+5}%;background: ${
            index >= waveIndex ? 'grey' : 'white'
          };`
        "
      ></div>
      <a class=" text-white q-ml-md duration">{{ durationFormat }}</a>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  name: "newAudio",
  data() {
    return {
      playing: false,
      waveIndex: 0,
      timer: null
    };
  },
  props: {
    src: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    waveTotal: {
      type: Array,
      default: []
    }
  },
  mounted() {
    // this.waveTotal.splice(0, 0, 0);
    let _this = this;
    this.$refs.audio.onended = function(e) {
      _this.playing = false;
      clearInterval(_this.timer);
      _this.waveIndex = 0;
    };
    // //get audio duration
    // this.$refs.audio.ondurationchange = function(e) {
    //   if (!Number.isFinite(e.target.duration)) {
    //     console.log(e.target);
    //     e.target.currentTime = Number.MAX_SAFE_INTEGER;
    //     e.target.currentTime = 0;
    //   }
    //   let temp = Math.floor(e.target.duration);
    //   if (Number.isFinite(temp)) {
    //     _this.duration = temp >= 10 ? "00:" + temp : "00:0" + temp;
    //   }
    // };
    // this.$refs.audio.addEventListener("canplay", this.getDuration, false);
  },
  methods: {
    play() {
      if (this.playing == false) {
        this.$refs.audio.play();
        this.playing = true;
        this.timer = setInterval(() => {
          this.waveIndex++;
        }, 1000);
      } else {
        this.$refs.audio.pause();
        this.playing = false;
        clearInterval(this.timer);
      }
    }
    // getDuration(e) {
    //   if (e.target.duration != Infinity) {
    //     this.duration = Math.floor(e.target.duration);
    //   }
    // }
  },
  computed: {
    durationFormat() {
      let temp = this.duration;
      return temp >= 10 ? "00:" + temp : "00:0" + temp;
    }
  }
};
</script>
<style lang="scss">
.wave {
  overflow: hidden;
  height: 38px;
  margin: -30px 0px 0 30px;
}
.wave > div {
  max-height: 20px;
  width: 2px !important;
  margin: 0 1.5px;
  //animation: load 3s ease-in-out infinite;
}
.duration {
  margin: 13px 0px 0 10px;
}
</style>
