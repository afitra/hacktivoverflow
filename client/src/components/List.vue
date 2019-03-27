<template>
  <div class="container">
    <div class="col-sm-4 kotak">
      <div class="card" style="width:280px">
        <div class="card-body">
          <!-- <h1>okok</h1> -->
          <h4>{{list.title}}</h4>
          <p>{{list.description}}</p>
          <h6>{{list.upVote.length}} votes</h6>
          <!-- <h6>{{list}}</h6> -->
          <!-- <router-link to="/ListComment"> -->
          <router-link :to="{ name: 'ListComment', params: {QuestionId:list._id} }">
            <button
              type="submit"
              class="btn btn-primary"
              v-on:click="hideallUserData(list._id,list.upVote.length)"
            >show detail</button>
          </router-link>
          <!-- <router-view></router-view> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import card from "@/components/ListComment.vue";
export default {
  props: ["list"],
  name: "topData",

  methods: {
    hideallUserData(ID, votes) {
      console.log(ID);

      this.$store.state.allUserData = false;
      // this.$store.state.QuestionId = ID;
      this.$store.commit("setQuestionId", ID);
      this.$store.commit("setvotes", votes);
    }
  }
};
</script>

<style>
.list {
  /* padding-top: 10%; */
  color: black;
}
</style>

