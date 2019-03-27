<template>
  <div>
    <form action>
      <!-- <h1>okok</h1> -->
      <br>
      <input type="text" placeholder="title" v-model="title">
      <textarea name id cols="30" rows="10" placeholder="description" v-model="description"></textarea>
      <button type="submit" class="btn btn-primary" v-on:click.prevent="add">add Answer</button>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
const axios = require("../api/axios.js");
export default {
  computed: {
    ...mapState(["allUserData", "QuestionId", "votes"])
  },

  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    add() {
      console.log(this.$route.params.QuestionId);

      var token = localStorage.getItem("token");
      axios({
        url: `/question/add/answer`,
        method: "post",
        headers: {
          token: token
        },
        data: {
          title: this.title,
          description: this.description,
          questionId: this.$route.params.QuestionId
        }
      })
        .then(data => {
          swal(`add title ${this.title}`, "sukses !!!", "succes");
          this.title = "";
          this.description = "";
          this.$emit("form-answer");
        })
        .catch(err => {
          swal(`user eror `, "gagals !!!", "error");
        });
    }
  }
};
</script>

