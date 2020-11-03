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
        <div class=" text-center text-h5 micText">
          {{ $t("Options") }}
        </div>
      </div>

      <div class=" row justify-between settingContainer micText">
        <div class="q-pa-md" style="width:100vw;  margin-top:-6vh;">
          <q-list padding>
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>{{ $t("language") }}</q-item-label>
                <q-select
                  class="q-mt-xs inputBgColor"
                  dense
                  v-model="language"
                  outlined
                  :options="options"
                  @input="changeLang"
                />
                <q-item-label caption class="optionCaption q-mt-sm">{{
                  $t("languageDetail")
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              tag="label"
              v-ripple
              v-for="item in optionList"
              :key="item.name"
            >
              <q-item-section class="q-mt-sm">
                <q-item-label class="row justify-between"
                  ><div style="padding:11px 0">
                    {{ $t(item.name) }}
                  </div>
                  <q-toggle v-model="item.state">{{
                    $t(item.state == true ? "on" : "off")
                  }}</q-toggle>
                </q-item-label>
                <q-item-label caption class="optionCaption">{{
                  $t(item.detail)
                }}</q-item-label>
                <q-item-label caption :line="2" class="optionCaption">{{
                  $t(item.detailAdd)
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Theme</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div>
                  {{ $store.state.settings.Theme }}
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="arrow_forward_ios"
                    @click="changeTheme"
                  />
                </div>
              </q-item-section>
            </q-item> -->

            <!-- <q-item
              tag="label"
              v-ripple
              v-for="item in settingList"
              :key="item.name"
            >
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption>{{ item.detail }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div>
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="arrow_forward_ios"
                  />
                </div>
              </q-item-section>
            </q-item> -->

            <!-- <q-separator />
            <q-item tag="label" v-ripple to="/reportIssue">
              <q-item-section>
                <q-item-label>Report Issue</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div>
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="arrow_forward_ios"
                  />
                </div>
              </q-item-section>
            </q-item> -->
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>About</q-item-label>
                <q-item-label caption class="optionCaption"
                  >Version 1.0.0.0</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <div>
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="arrow_forward_ios"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settingList: [
        {
          name: "Voice source",
          detail: "",
          options: ["1", "2", "3"],
          current: "1"
        },
        { name: "Speech library", detail: "", options: ["1", "2", "3"] },
        { name: "Language", detail: "", options: ["1", "2", "3"] },
        { name: "Nero files' path", detail: "", options: ["1", "2", "3"] }
      ],
      optionList: [
        {
          name: "Voice Wakeup",
          detail: "Voice WakeupDetail",
          detailAdd: "Voice WakeupDetailAdd",
          val: "VoiceWakeup",
          state: true
        },
        {
          name: "Updates",
          detail: "UpdatesDetail",
          val: "Updates",
          state: true
        },
        {
          name: "Auto Startup",
          detail: "Auto StartupDetail",
          val: "AutoStartup",
          state: true
        },
        {
          name: "Nero Product Improvement",
          detail: "Nero Product ImprovementDetail",
          detailAdd: "Nero Product ImprovementDetailAdd",
          state: true
        }
      ],
      dark: false,
      options: ["English", "German"],
      language:
        this.$store.state.settings.Language == "en-US" ? "English" : "German",

    };
  },

  created() {},

  methods: {
    changeTheme() {
      this.$q
        .dialog({
          title: "Theme",
          message: "Choose a theme",
          options: {
            type: "radio",
            model: this.$store.state.settings.Theme,
            items: [
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" }
            ]
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          let theme = data;
          window.document.documentElement.setAttribute("data-theme", theme);
          this.$store.dispatch("changeSetting", {
            Theme: theme
          });
        });
    },
    changeLang(lang) {
      let langSelect = lang == "English" ? "en-US" : "de-DE";
      this.$i18n.locale = langSelect;
      console.log(this.$i18n.locale);
      this.$store.dispatch("changeSetting", {
        Language: langSelect
      });
    }
  }
};
</script>
<style lang="scss">
.optionCaption {
  color: grey;
  font-size: 12.5px;
}

.toggle {
  margin-top: -8px;
}
.q-toggle__thumb {
  color: white;
  transform: scale(0.66);
}
.q-toggle__track {
  transform: scale(1.3);
}
</style>
