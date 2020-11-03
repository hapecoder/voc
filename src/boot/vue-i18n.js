import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 
export default ({
  app,store
}) => {
  app.i18n = new VueI18n({
    locale: store.state.settings.Language, // 
    //this.$i18n.locale // 
    messages: {
      'de-DE': require('../language/de.json'),
      'en-US': require('../language/en.json')
    }
  })
}

