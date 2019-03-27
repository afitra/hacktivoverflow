<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/">
        <a class="navbar-brand" v-on:click="showTopData">SLACK- overflow</a>
      </router-link>
      <button
        type="button"
        class="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/">
            <a class="nav item active nav-link">tags</a>
          </router-link>
          <router-link to="/all">
            <a class="nav item active nav-link" v-on:click="hideTopData('userData')">users</a>
          </router-link>
          <router-link to="/addQuestion">
            <a class="nav item active nav-link">add Question</a>
          </router-link>
          <router-link to="/register">
            <a class="nav item active nav-link" v-if="!button">Register</a>
          </router-link>
          <router-link to="/login">
            <a class="nav item active nav-link" v-if="!button" v-on:click="login('ok')">Login</a>
          </router-link>
          <a class="nav item active nav-link" v-if="button" v-on:click="logout()">Logout</a>
        </ul>

        <form action="#" method="post" class="form-inline my-2 mylg-0">
          <input
            type="search"
            name="buscar"
            id="buscar"
            class="form-control mr-sm-2"
            placeholder="search product"
            aria-label="Buscar"
          >
          <button class="btn btn-outline-success" type="submit">search</button>
        </form>
      </div>
    </nav>
  </div>
</template>
<script>
import swal from "sweetalert";
const axios = require("../api/axios.js");
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["email", "password", "isLogin", "userData"])
  },
  data() {
    return {
      button: localStorage.getItem("token")
    };
  },
  methods: {
    showTopData() {
      this.$store.state.allUserData = true;
    },
    hideTopData(input) {
      this.$store.state.allUserData = false;
    },
    login(input) {
      this.button = true;
    },
    logout() {
      console.log("masok log ot");

      localStorage.removeItem("token");
      swal(`Logout`, "sukses !!!", "success");
      this.button = "";
      this.$router.push("/");
    }
  },
  mounted() {
    this.hideTopData();
  }
};
</script>

<style>
.kotak {
  /* border: 1px solid red; */
  display: inline-block;
  color: black;
}
</style>
 

 