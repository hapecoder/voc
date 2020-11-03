<template>
  <div class="column">
    <q-page class="bg-black">
      <div class="indexBanner">
        <q-btn-dropdown
          flat
          round
          dense
          dropdown-icon="menu"
          color="grey"
          class="fixed-top-left z-top"
          style="transform: translateY(130%);"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="item in linkMenu"
              :key="item.title"
              :to="item.to"
            >
              <q-item-section>
                <q-item-label>{{  $t(item.title) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="clear">
              <q-item-section>
                <q-item-label> {{ $t("Clear") }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="ThemeChange">
              <q-item-section>
                <q-item-label>{{ $t("Change theme") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div class="row justify-center ">
          <img
            src="../assets/nero logo.png"
            style="filter: invert(100%);max-width:10rem"
            class="q-mt-lg col-3"
          />
        </div>
      </div>
      <div class="indexContainer  row justify-center ">
        <q-scroll-area style="width: 100%;" :visible="false" ref="scrollArea">
          <div v-for="(item, index) in message" :key="item.index">
            <timeLine
              :time="item.time"
              v-if="
                index >= 1
                  ? message[index].time.getTime() -
                      message[index - 1].time.getTime() >
                    180000
                  : true
              "
            ></timeLine>
            <q-chat-message
              class="q-mx-md q-mt-lg"
              :text-color="msgTextColor"
              :text="item.type == 'text' ? [$t(item.msg)] : []"
              :sent="item.isSend"
              :stamp="item.time.toString().split(' ')[4]"
              :bg-color="item.isSend ? msgBgColor[0] : msgBgColor[1]"
            >
              <newAudio
                v-if="item.type == 'audio'"
                :src="item.msg"
                :duration="item.timedelta"
                :waveTotal="item.waveTotal"
              ></newAudio>
              <div v-if="item.type == 'shortcut'">
                <q-item style="padding:0">
                  <q-item-section avatar top>
                    <img
                      :src="require('../assets/' + item.msg[0] + '.png')"
                      height="70"
                    />
                  </q-item-section>

                  <q-item-section class="text-body2">
                    <q-item-label class="q-mb-sm">Opening</q-item-label>
                    <q-item-label lines="2">{{ item.msg[0] }}</q-item-label>
                  </q-item-section>
                  <q-item-section
                    side
                    top
                    class="shortcutIcon"
                    @click="shortcut(item.msg[0])"
                  >
                    <q-btn color="white" round>
                      <q-avatar
                        size="34px"
                        icon="reply_all"
                        color="yellow-14"
                        text-color="white"
                      />
                    </q-btn>
                  </q-item-section>
                </q-item>
              </div>
            </q-chat-message>
          </div>
        </q-scroll-area>
      </div>

      <div class="indexFoot shadow-up-6">
        <q-toolbar class="row justify-between">
          <q-input
            rounded
            standout="bg-blue-grey-7 text-white"
            v-model="text"
            :placeholder="$t('Ask Nero Voice Control')"
            class="col-10 q-mr-sm"
            :bg-color="themeNow == 'dark' ? 'grey-9' : 'grey-3'"
            @keydown.enter.prevent="send"
          >
            <template v-slot:prepend>
              <q-icon name="edit" />
            </template>
          </q-input>
          <q-btn
            round
            to="/speaking"
            :color="themeNow == 'dark' ? 'grey-9' : 'grey-3'"
            icon="mic_none"
            :text-color="themeNow == 'dark' ? 'grey-5' : 'black'"
            size="20px"
          ></q-btn>
        </q-toolbar>
      </div>
    </q-page>
  </div>
</template>

<script>
import newAudio from "../components/audio";
import timeLine from "../components/timeLine";
//import global from "../global";
import { date } from "quasar";
import { textToMsg } from "../utils/pushMessage";
const { spawn } = require("child_process");

export default {
  name: "PageIndex",
  components: {
    newAudio,
    timeLine
  },
  data() {
    return {
      text: "",
      message: [
        {
          msg: "Hello",
          isSend: false,
          type: "text",
          //for test
          time: date.subtractFromDate(new Date(), {
            hours: 0,
            minutes: 0
          })
        }
      ],
      linkMenu: [
        {
          title: "Options",
          to: "/options"
        },
        {
          title: "Report issue",
          to: "/reportIssue"
        }
      ],
      linkHeader: "C:\\Program Files (x86)\\Nero\\",
      neroVersion: "Nero Platinum Suite"
    };
  },
  computed: {
    messageLength() {
      if (this.$refs.scrollArea) {
        //auto scroll to bottom when massage changed
        this.$refs.scrollArea.setScrollPercentage(3);
      }
      return this.message.length;
    },
    themeNow() {
      return this.$store.state.settings.Theme;
    },
    msgTextColor() {
      return this.themeNow == "dark" ? "grey-4" : "black";
    },
    msgBgColor() {
      return this.themeNow == "dark"
        ? ["blue", "grey-9"]
        : ["blue-4", "green-4"];
    },

    softwareLink() {
      return new Map([
        [
          "Nero Start",
          this.linkHeader + "\\Nero Common\\Nero Launcher\\NeroLauncher"
        ],
        [
          "Nero MediaHome",
          this.linkHeader + this.neroVersion + "\\Nero MediaHome\\MediaHome"
        ],
        [
          "Nero Video",
          this.linkHeader + this.neroVersion + "\\Nero Vision\\NeroVision"
        ],
        [
          "Nero RescueAgent",
          this.linkHeader +
            this.neroVersion +
            "\\Nero RescueAgent\\NeroRescueAgent"
        ],
        [
          "Nero DuplicateManager",
          this.linkHeader + this.neroVersion + "\\Nero NDM\\Duplicate"
        ],
        [
          "Nero BackItUp",
          this.linkHeader + this.neroVersion + "\\Nero BackItUp\\BackItUp"
        ],
        [
          "Nero Recode",
          this.linkHeader +
            this.neroVersion +
            "\\Nero Recode\\Nero Recode\\Recode"
        ],
        [
          "NeroAITag",
          this.linkHeader + this.neroVersion + "\\NeroAITag\\NeroAITag"
        ],
        [
          "Nero Burning ROM",
          this.linkHeader + this.neroVersion + "\\Nero Burning ROM\\nero"
        ],
        [
          "Nero RescueAgent",
          this.linkHeader +
            this.neroVersion +
            "\\Nero RescueAgent\\NeroRescueAgent"
        ],
        [
          "Nero CoverDesigner",
          this.linkHeader + "Nero Apps\\Nero CoverDesigner\\CoverDes"
        ],
        ["Nero TuneItUp", this.linkHeader + "Nero TuneItUp\\TuneItUp.exe"]
      ]);
    }
  },
  watch: {
    //here to active scroll in computed
    messageLength(newLen, oldLen) {}
  },
  mounted() {
    let that = this;
    this.$root.$on("send", function(data) {
      console.log("sended asdsad");
      that.message.push(textToMsg(data, true));
    });
    this.$root.$on("receive", function(data) {
      that.message.push(textToMsg(data));
    });
  },

  methods: {
    send() {
      if (this.text) {
        this.message.push(textToMsg([this.text], true));
        let _this = this;
        const main = spawn("main", ["-t", this.text]);
        main.stdout.on("data", data => {
          let temp = data.toString().split(",");
          let software = temp[0].match(/\('?([\w ]*)'?/)[1];
          let method = temp[1].match(/'?([\w ]*)'?\)/)[1];
          //console.log(software,method)
          let msg = textToMsg([software, method]);
          this.message.push(msg);
        });
        this.text = "";
      }
    },

    clear() {
      this.message = [];
    },
    ThemeChange() {
      let theme = this.$store.state.settings.Theme == "dark" ? "light" : "dark";
      window.document.documentElement.setAttribute("data-theme", theme);
      this.$store.dispatch("changeSetting", {
        Theme: theme
      });
    },
    shortcut(software) {
      let link = this.softwareLink.get(software);
      console.log("Now opening:", software);
      const open = spawn(link);
      console.log(link);
      // open.stdout.on("data", data => {
      //     console.log(`stdout: ${data}`);
      // });
      open.on("error", code => {
        this.$q.notify({
          message: "Cannot find your software, please change file path",
          timeout: 500
        });
      });
    }
  }
};
</script>

<style lang="scss">
//message-box padding
.q-message-text {
  padding: 8px 12px;
}
</style>
