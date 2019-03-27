 <template>
  <div>
    <div class="body"></div>
    <div class="grad"></div>
    <div class="header">
      <div>
        Login
        <span>User</span>
      </div>
    </div>
    <br>
    <div class="login">
      <input type="email" placeholder="email" name="email" v-model="Nemail" required>
      <br>
      <input type="password" placeholder="password" name="password" v-model="Npassword" required>
      <br>

      <input type="button" value="login" v-on:click.prevent="login">
      <input type="button" value="register" v-on:click.prevent="register">
      <!-- <router-link to="/">
        <button v-on:click.prevent="login()" type="button" class="btn btn-primary">Login</button>
      </router-link>-->

      <br>
      <router-link to="/">
        <button type="button" class="btn btn-primary">Go Home</button>
      </router-link>
    </div>
  </div>
</template>
<script>
// const axios = require("../api/axios.js");
import swal from "sweetalert";
const axios = require("../api/axios.js");
import { mapState, mapMutations } from "vuex";
export default {
  name: "login",
  computed: {
    dataEmail: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("setEmail", value);
      }
    },
    dataPassword: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        this.$store.commit("setPassword", value);
      }
    },
    ...mapState(["email", "password", "isLogin", "allUserData"])
  },
  data() {
    return {
      Nemail: "",
      Npassword: "",
      pesan: "",
      button: "",
      pesan: ""
    };
  },
  methods: {
    login() {
      axios({
        url: `/user/login`,
        method: "post",
        data: {
          email: this.Nemail,
          password: this.Npassword
        }
      })
        .then(data => {
          // console.log(data);
          localStorage.setItem("token", data.data.token);
          swal("Good job!", "login sukses", "success");
          this.$store.state.isLogin = true;
          this.$store.state.allUserData = true;
          this.$store.state.email = this.Nemail;
          this.Nemail = "";
          this.Npassword = "";
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.pesan = response.data.messege;
          // console.log(this.pesan);
          swal(`${this.pesan}`, "login gagal", "Error");
          this.Nemail = "";
          this.Npassword = "";
        });
    },
    register() {
      axios({
        url: `/user/register`,
        method: "post",
        data: {
          email: this.Nemail,
          password: this.Npassword
        }
      })
        .then(data => {
          // console.log(data);
          localStorage.setItem("token", data.data.token);
          swal("Good job!", "register sukses", "success");
          // this.$router.push("/");
          this.Nemail = "";
          this.Npassword = "";
        })
        .catch(({ response }) => {
          // console.log(response.data.messege);

          this.pesan = response.data.messege;
          // console.log(this.pesan);
          swal(`${this.pesan}`, "register gagal", "Error");
          this.Nemail = "";
          this.Npassword = "";
        });
    }
  },
  mounted() {
    this.$store.state.allUserData = false;
  }
};
</script>

 <style scope >
body {
  margin: 0;
  padding: 0;
  background: #fff;

  color: #fff;
  font-family: Arial;
  font-size: 12px;
}

.body {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -40px;
  bottom: -40px;
  width: auto;
  height: auto;
  background-image: url(https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=background-blur-clean-531880.jpg&fm=jpg);
  background-size: relative;

  z-index: 0;
}

.grad {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -40px;
  bottom: -40px;
  width: auto;
  height: auto;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(0, 0, 0, 0)),
    color-stop(100%, rgba(0, 0, 0, 0.65))
  ); /* Chrome,Safari4+ */
  z-index: 1;
  opacity: 0.7;
}

.header {
  position: absolute;
  top: calc(50% - 35px);
  left: calc(50% - 255px);
  z-index: 2;
}

.header div {
  float: left;
  color: #fff;
  font-family: "Exo", sans-serif;
  font-size: 35px;
  font-weight: 200;
}

.header div span {
  color: #8b008b !important;
}

.login {
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 50px);
  height: 150px;
  width: 350px;
  padding: 10px;
  z-index: 2;
}

.login input {
  width: 250px;
  height: 30px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  color: black;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 4px;
}

.login input[type="button"] {
  width: 260px;
  height: 35px;
  background: #3cb371;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 2px;
  color: black;
  font-family: "Exo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 6px;
  margin-top: 10px;
}

.login input[type="button"]:hover {
  opacity: 0.8;
}

.login input[type="button"]:active {
  opacity: 0.6;
}

.login input[type="text"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="password"]:focus {
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.login input[type="button"]:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: black;
}

::-moz-input-placeholder {
  color: black;
}
</style>
 