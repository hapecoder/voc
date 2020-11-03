<template>
  <q-layout view="lHh Lpr lFf">
    <div class="header q-px-xs q-pt-xs">
      <q-bar class="bg-white">
        <q-icon :name="`img:${iconPath}`" />
        <div class="text-black">Nero Voice Control</div>

        <q-space />
        <div style="-webkit-app-region: no-drag;">
          <q-btn
            dense
            flat
            icon="minimize"
            @click="minimize"
            color="black"
            class="z-top"
          />
          <!-- <q-btn dense flat icon="crop_square" @click="maximize" /> -->
          <q-btn
            dense
            flat
            icon="close"
            @click="close"
            color="black"
            class="z-top"
          />
        </div>
      </q-bar>
    </div>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      iconPath: require("../statics/nero.png")
    };
  },
  mounted() {
    window.document.documentElement.setAttribute(
      "data-theme",
      this.$store.state.settings.Theme
    );
  },
  methods: {
    minimize() {
      if (process.env.MODE === "electron") {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
      }
    },
    maximize() {
      if (process.env.MODE === "electron") {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
      }
    },
    close() {
      if (process.env.MODE === "electron") {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
      }
    }
  }
};
</script>
<style lang="scss">
@import "../css/mixin.scss";
.header {
  width: 100%;
  margin: auto;
  height: 5vh;
  background-color: white;
  -webkit-app-region: drag;
}
.sayTo {
  margin-left: -1.3rem;
}
.speakBtn {
  transform: translateY(-50%);
}
.speakIcon {
  background-image: linear-gradient(
    to bottom right,
    rgb(0, 253, 241),
    rgb(24, 197, 250),
    rgb(125, 103, 221),
    rgb(232, 6, 253)
  ) !important;
}
.speakBanner {
  height: 13vh;
  @include speak_background_image("speak_background_image");
}
.indexBanner {
  height: 100vh;
  @include index_background_image("index_background_image");
}
.indexContainer {
  margin-top: -90vh;
  padding: 3vh 3vw;
  height: 75vh;
  @include indexContainer("indexContainer");
}
.speakContainer {
  padding: 3vh 3vw;
  height: 68vh;
  @include speakContainer("speakContainer");
}
.settingContainer {
  height: 90vh;
  @include indexContainer("speakContainer");
}
.indexFoot {
  @include indexFootBgColor("indexFootBgColor");
  height: 10vh;
  padding-top: 10px;
}
.speakFoot {
  @include speakFootBgColor("speakFootBgColor");
  height: 15vh;
}
.inputBgColor {
  @include inputBgColor("inputBgColor");
}
.micText {
  @include micText("micText");
}
.shortcutIcon {
  transform: rotateY(180deg) translateY(-35%) translateX(-60%);
}
.q-field__native {
  @include micText("micText");
}
</style>
