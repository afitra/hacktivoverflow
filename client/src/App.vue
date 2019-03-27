<template>
  <div id="app">
    <navbar></navbar>
    <div v-if="allUserData">
      <div v-for=" item in data " v-bind:key="item._id">
        <topData v-bind:list="item"></topData>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import navbar from "@/views/navbar.vue";
import topData from "@/components/List.vue";
import { mapState } from "vuex";
export default {
  name: "home",

  computed: {
    ...mapState(["allUserData", "questionData"]),
    data: {
      get() {
        return this.$store.state.questionData;
      }
    }
  },

  components: {
    navbar: navbar,
    topData: topData
  },
  methods: {},
  mounted() {
    this.$store.state.allUserData = true;
    this.$store.dispatch("getData");
  }
};
</script>


 