<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 kotak" v-for="item in data" v-bind:key="item._id">
        <div class="card" style="width:280px">
          <img class="card-img-top" :src="item.image" alt="Card image" width="350px" height="197px">
          <div class="card-body">
            <h4>{{item.email}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["allUserData"])
  },
  data() {
    return {
      data: ""
    };
  },
  methods: {
    loadData() {
      axios({
        url: `http://localhost:3000/user/all`,
        method: "get"
      })
        .then(data => {
          this.data = data.data;
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  mounted() {
    this.$store.state.allUserData = false;
    this.loadData();
  }
};
</script><style scoped>
.card {
  border: 2px solid black;
}
.kotak {
  padding-bottom: 20px;
}
.container {
  margin-top: 20px;
}
</style>

