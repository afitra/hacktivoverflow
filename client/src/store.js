import Vue from 'vue';
import Vuex from 'vuex';

const axios = require("./api/axios.js");
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: '',
    email: "",
    allUserData: "",
    password: "",
    questionData: "",
    QuestionId: '',
    votes: ''

  },
  mutations: {
    setEmail(state, value) {
      state.email = value
    },
    setPassword(state, value) {
      state.password = value
    },
    setQuestionId(state, value) {
      console.log('ini masok QuestionId', value);

      state.QuestionId = value
    },
    setvotes(state, value) {
      state.votes = value
    },
    readQuestionData(state, value) {

      axios({
          url: `/question/all`,
          method: "get",
          data: {
            email: this.Nemail,
            password: this.Npassword
          }
        })
        .then(data => {
          state.questionData = data.data
        })
    }

  },
  actions: {
    getData(context) {
      context.commit("readQuestionData")
    }
  },
});
