<template>
  <div id="edit-movie">
    <h3>Edit Movie</h3>
    <div class="row">
      <form @submit.prevent="updateMovie" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="movie_id" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="title" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="date" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="place" required>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="rate" required number>
          </div>
        </div>
        <button type="submit" class="btn">Update</button>
        <router-link to="/" class="btn red">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "edit-movie",
  data() {
    return {
      movie_id: null,
      title: null,
      date: null,
      place: null,
      rate: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("movies")
      .where("movie_id", "==", to.params.movie_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.movie_id = doc.data().movie_id;
            vm.title = doc.data().title;
            vm.date = doc.data().date;
            vm.place = doc.data().place;
            vm.rate = doc.data().rate;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("movies")
        .where("movie_id", "==", this.$route.params.movie_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.movie_id = doc.data().movie_id;
            this.title = doc.data().title;
            this.date = doc.data().date;
            this.place = doc.data().place;
            this.rate = doc.data().rate;
          });
        });
    },
    updateMovie() {
      db.collection("movies")
        .where("movie_id", "==", this.$route.params.movie_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                movie_id: this.movie_id,
                title: this.title,
                date: this.date,
                place: this.place,
                rate: this.rate
              })
              .then(() => {
                this.$router.push({
                  name: "view-movie",
                  params: { movie_id: this.movie_id }
                });
              });
          });
        });
    }
  }
};
</script>
