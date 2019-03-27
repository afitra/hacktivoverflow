<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body text-center">
            <div class="card">
              <div class="card-header">{{data.title}}</div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>{{data.description}}</p>
                  <label>{{votescount}} votes</label>
                  <footer class="blockquote-footer">
                    <cite title="Source Title">{{data.title}}</cite>
                  </footer>
                  <button type="submit" class="btn btn-primary" v-on:click="upVote ">upvote</button>
                  <button type="submit" class="btn btn-primary" v-on:click="downVote ">downvote</button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    v-on:click.prevent="addAnswer "
                  >add Answer</button>
                  <addAnswer @form-answer="answerProses" v-if="formAnswer"></addAnswer>
                </blockquote>
              </div>
            </div>
            <!-- {{data.answerId}} -->
            <div v-for="(item,index) in data.answerId" :key="index">
              <hr>
              {{item.title}}
              <br>
              {{item.description}}
              <br>
              {{item.createdAt}}
              <hr>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </div>
</template>
<script>
const axios = require("../api/axios.js");
import swal from "sweetalert";
import addAnswer from "@/components/addAnswer.vue";
import { mapState } from "vuex";
export default {
  name: "ListComment",
  computed: {
    ...mapState(["allUserData", "QuestionId", "votes"])
  },

  components: {
    addAnswer: addAnswer
  },
  data() {
    return {
      data: "",
      votescount: "",
      formAnswer: false
    };
  },
  methods: {
    answerProses() {
      this.loadData();
      this.formAnswer = false;
    },
    loadData() {
      // console.log("masokkkk sini");
      // console.log(this.$route.params.QuestionId, "============");

      this.votescount = "";
      var token = localStorage.getItem("token");
      axios({
        url: `/question/${this.$route.params.QuestionId}`,
        method: "post",
        headers: {
          token: token
        }
      })
        .then(data => {
          this.data = data.data;
          // console.log("okkkkkkkkkkkkkkkkkkk");
          // console.log(data.data);

          this.$store.state.votes = data.data.upVote.length;
          this.votescount = this.$store.state.votes;
        })
        .catch(({ response }) => {
          swal(`${response.data.messege}`, "Try Again !!!", "error");
        });
    },
    addAnswer() {
      this.formAnswer = true;
    },
    upVote() {
      // console.log();
      // console.log("masok upvote ======");
      var token = localStorage.getItem("token");
      axios({
        url: `/question/upvote/${this.$route.params.QuestionId}`,
        method: "post",
        headers: {
          token: token
        }
      })
        .then(data => {
          swal(`vote`, "sukses !!!", "succes");
          // console.log(data.data);
          this.loadData();
        })
        .catch(err => {
          swal(`user eror `, "anda sudah upvote !!!", "error");
        });
    },
    downVote() {
      // console.log("masok downvote ======");
      var token = localStorage.getItem("token");
      axios({
        url: `/question/downvote/${this.$route.params.QuestionId}`,
        method: "post",
        headers: {
          token: token
        }
      })
        .then(data => {
          swal(`downvote`, "sukses !!!", "succes");
          // console.log(data.data);
          this.loadData();
          // console.log("okokokokokok");
        })
        .catch(err => {
          swal(`user eror `, "gagals !!!", "error");
        });
    }
  },
  mounted() {
    this.loadData();
    this.formAnswer = false;
    this.$store.state.allUserData = false;
  }
};
</script>

