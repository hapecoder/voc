//default settings
const state = {
  Theme: localStorage.getItem("Theme") || 'dark',
  VoiceSource: '1',
  SpeechLibrary: '1',
  Language: localStorage.getItem("Language") ||'en-US',
  FilePath: ''
}


const mutations = {
  CHANGE_SETTING: (state, data) => {
    let [key, value] = [Object.keys(data), Object.values(data)]
    // eslint-disable-next-line no-prototype-builtins
   
    key.map((item, index) => {
      if (state.hasOwnProperty(item)) {
        localStorage.setItem(item, value[index]);
        state[key] = value[index]
      }
    })

  }
}

const actions = {

  changeSetting({
    commit
  }, data) {
    commit('CHANGE_SETTING', data)
    

  }
}

export default {
 // namespaced: true,
  state,
  mutations,
  actions,
}
