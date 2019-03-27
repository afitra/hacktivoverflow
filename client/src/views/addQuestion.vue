<template>
  <div>
    title:
    <br>
    <input type="text" name="title" value="Mickey" v-model="title">
    <br>description:
    <br>
    <textarea name="description" id cols="30" rows="10" v-model="description"></textarea>

    <br>
    <br>
    <button type="submit" class="btn btn-primary" v-on:click="post">post</button>
  </div>
</template>
<script>
const axios = require("../api/axios.js");
import { mapState, mapMutations } from "vuex";
import swal from "sweetalert";
export default {
  computed: {
    ...mapState(["allUserData"])
  },
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    post() {
      var token = localStorage.getItem("token");
      // axios
      //   .post(`http://localhost:3000/question/add`, {
      //     headers: {
      //       token: localStorage.getItem("token")
      //     },
      //     data: {
      //       title: this.title,
      //       description: this.description
      //     }
      //   })
      //   .then(data => {
      //     console.log(data.data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      axios({
        url: `/question/add`,
        method: "post",
        headers: {
          token: token
        },
        data: {
          title: this.title,
          description: this.description
        }
      })
        .then(data => {
          this.$router.push("/");
          this.$store.state.allUserData = true;
          this.$store.dispatch("getData");
          swal(
            "Good job!",
            `post ${this.title} berhasil di tembahkan `,
            "success"
          );
          this.title = "";
          this.description = "";
        })
        .catch(err => {
          swal(`${this.title}`, "gagal  ditambahkan", "Error");
        });
    }
  },
  mounted() {
    this.$store.state.allUserData = false;
  }
};
</script>

