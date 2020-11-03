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
          {{ $t("Report Issue") }}
        </div>
      </div>

      <div class=" row justify-center settingContainer micText">
        <q-form @submit="onSubmit">
          <div class="row justify-between" style="margin:10px -80px">
            <div class="self-center">{{ $t("Your product") }}</div>
            <q-select
              dense
              v-model="product"
              outlined
              :options="productOptions"
              class="inputBgColor"
              :style="'width:' + boxWidth + 'vw'"
            />
          </div>
          <div class="row justify-between" style="margin:10px -80px">
            <div class="self-center q-mr-sm">
              {{ $t("Your serial number") }}
            </div>
            <q-field
              outlined
              dense
              class="inputBgColor"
              :style="'width:' + boxWidth + 'vw'"
            >
              <template v-slot:control>
                <div
                  class="self-center full-width no-outline"
                  tabindex="0"
                ></div>
                {{ serialNumber }}
              </template>
            </q-field>
          </div>
          <div class="row justify-between" style="margin:10px -80px">
            <div class="self-center">{{ $t("Your application") }}</div>
            <q-select
              dense
              v-model="application"
              outlined
              :options="applicationOptions"
              class="inputBgColor"
              :style="'width:' + boxWidth + 'vw'"
            />
          </div>
          <div class="row justify-between" style="margin:10px -80px">
            <div class="self-center ">{{ $t("Your e-mail") }}</div>
            <q-input
              type="email"
              outlined
              hide-bottom-space
              dense
              v-model="email"
              class="inputBgColor"
              :style="'width:' + boxWidth + 'vw'"
              :rules="[val => (val !== null && val !== '') || '']"
            />
          </div>
          <div class="row justify-between" style="margin:10px -80px">
            <div class="self-center ">{{ $t("Stand-in e-mail") }}</div>
            <q-input
              outlined
              dense
              v-model="StandinEmail"
              placeholder="optional"
              class="inputBgColor"
              :style="'width:' + boxWidth + 'vw'"
            />
          </div>
          <div class="row justify-between" style="margin:10px -80px">
            <div class="self-center ">{{ $t("Your subject") }}</div>
            <q-input
              outlined
              dense
              placeholder="optional"
              v-model="subject"
              class="inputBgColor"
              :style="'width:' + boxWidth + 'vw'"
            />
          </div>
          <div style="margin:10px -80px">
            <div class="self-center q-my-sm">
              {{ $t("Describe your issue") }}
            </div>
            <q-input
              dense
              outlined
              hide-bottom-space
              v-model="issue"
              type="textarea"
              class="inputBgColor"
              :rules="[val => (val !== null && val !== '') || '']"
            />
          </div>
          <div style="margin:10px -80px">
            <div class="self-center q-my-sm">{{ $t("Upload files") }}</div>
            <div>
              <q-uploader
                :url="uploadUrl"
                multiple
                class="full-width "
                style="max-height:200px"
              >
                <template v-slot:header="scope">
                  <div
                    class="row no-wrap items-center q-pa-sm  micText inputBgColor"
                  >
                    <q-btn
                      v-if="scope.queuedFiles.length > 0"
                      icon="clear_all"
                      @click="scope.removeQueuedFiles"
                      round
                      dense
                      flat
                    >
                      <q-tooltip>{{ $t("Clear All") }}</q-tooltip>
                    </q-btn>

                    <q-spinner
                      v-if="scope.isUploading"
                      class="q-uploader__spinner"
                    />
                    <div class="col">
                      <div class="q-uploader__title ">
                        {{ $t("Upload your files") }}
                      </div>
                      <div class="q-uploader__subtitle">
                        {{ scope.uploadSizeLabel }} /
                        {{ scope.uploadProgressLabel }}
                      </div>
                    </div>
                    <q-btn
                      v-if="scope.canAddFiles"
                      type="a"
                      icon="add_box"
                      round
                      dense
                      flat
                    >
                      <q-uploader-add-trigger />
                      <q-tooltip>{{ $t("Pick Files") }}</q-tooltip>
                    </q-btn>

                    <!-- <q-btn
                      v-if="scope.isUploading"
                      icon="clear"
                      @click="scope.abort"
                      round
                      dense
                      flat
                    >
                      <q-tooltip>Abort Upload</q-tooltip>
                    </q-btn> -->
                  </div>
                </template>
                <template v-slot:list="scope">
                  <q-list separator class="text-black" style="max-height:70px;">
                    <q-item v-for="file in scope.files" :key="file.name">
                      <q-item-section>
                        <q-item-label class="full-width ellipsis">
                          {{ file.name }}
                        </q-item-label>

                        <!-- <q-item-label caption>
                                                Status: {{ file.__status }}
                                            </q-item-label> -->

                        <q-item-label caption>
                          {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                        </q-item-label>
                      </q-item-section>

                      <q-item-section v-if="file.__img" thumbnail>
                        <img :src="file.__img.src" />
                      </q-item-section>

                      <q-item-section top side>
                        <q-btn
                          class="q-mt-sm"
                          size="15px"
                          flat
                          dense
                          round
                          icon="delete"
                          @click="scope.removeFile(file)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
              </q-uploader>
            </div>
          </div>

          <div class="row justify-center q-mt-md  ">
            <q-btn
              rounded
              no-caps
              label="Send Now"
              type="submit"
              color="primary"
              style="padding:5px 30px"
            />
          </div>
        </q-form>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: "Nero Platinum 365",
      productOptions: [
        "Nero Platinum 365",
        "Nero Platinum 2019 Subscription",
        "Nero Platinum Trial"
      ],
      application: "Nero BackItUp",
      applicationOptions: [
        "Nero BackItUp",
        "Nero Burning ROM",
        "Nero DuplicateManager",
        "Nero Express",
        "Nero KonwHow plus",
        "Nero MediaHome",
        "Nero Record",
        "Nero RescueAgent",
        "Nero Start",
        "Nero Video"
      ],
      email: "mchen@nero.com",
      bgColor: "grey-9",
      boxWidth: 50,
      issue: "",
      StandinEmail: "",
      subject: "",
      uploadUrl: ""
    };
  },

  created() {},
  computed: {
    serialNumber() {
      return;
    }
  },
  methods: {
    onSubmit() {}
  }
};
</script>

<style lang="scss">
.optionCaption {
  color: grey;
  font-size: 12.5px;
}

.q-field__native {
  color: silver;
}

.toggle {
  margin-top: -8px;
}

.q-toggle__thumb {
  color: white;
  transform: scale(0.65);
}

.q-toggle__track {
  transform: scale(1.3);
}

textarea {
  height: 8vh;
  overflow-y: scroll;
}

textarea::-webkit-scrollbar {
  width: 0 !important;
}

.q-uploader__list {
  background-color: rgba(162, 140, 140, 0.192);
}
</style>
