import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    nuuser_id: '',
    fullname: '',
    timeStamp: ''
  },
  mutations: {
    CheckExpried(state) {
      //if(state.timeStamp > timeNow){
      setTimeout(function () {
      }, parseInt(state.timeStamp) - parseInt(new Date().getTime()));
      // state.isExpried = true
      // this.Logout();
      //}
    },
    Logout(state) {
      state.nuuser_id = '';
      state.fullname = '';
      state.timeStamp = '';
      localStorage.removeItem("N_USERID");
      localStorage.removeItem("FULLNAME");
      localStorage.removeItem("TokenId");
      window.open(process.env.VUE_APP_URL_LOGIN, '_self')
    }
  },
  actions: {

  },
  modules: {

  }
})