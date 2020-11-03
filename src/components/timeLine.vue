<template>
  <div class="timeline text-grey row justify-center q-mb-xs">
    - - - - - - - - {{ timeFormat }} - - - - - - -
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  name: "timeLine",
  data() {
    return {};
  },
  props: {
    time: {
      type: Date,
      required: true
    }
  },
  mounted() {
    let temp = date.formatDate(this.time, "MMM  Do YYYY HH:mm");
    let todayZero = date.extractDate(temp, "MMM  Do YYYY");
    //console.log(todayZero);
  },
  methods: {},
  computed: {
    timeFormat() {
      let day = "Yesterday ";
      let todaytemp=date.formatDate(new Date(), "MMM  Do YYYY HH:mm");
      let todayZero = date.extractDate(todaytemp, "MMM  Do YYYY");
      let diff1 = date.getDateDiff(todayZero, this.time, "hours");
      if (24 > diff1) {
        if (diff1 <= 0) {
          day = "";
        }
        return day + date.formatDate(this.time, "HH:mm");
      } else {
        return date.formatDate(this.time, "MMM  Do YYYY HH:mm");
      }

      // if (2 > diff > 0) {
      //   let temp = date.formatDate(this.time, "HH:mmA");
      //   return 'Yesterday '+temp;
      // }
      let temp2 = date.formatDate(this.time, "MMM  Do YYYY HH:mmA");
      return todayZero2;
    }
  }
};
</script>
<style lang="scss"></style>
