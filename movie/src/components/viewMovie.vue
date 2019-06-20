<template>
  <div id="view-movie">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{title}}</h4>
      </li>

      <li class="collection-item">Date : {{date}}</li>
      <li class="collection-item">Place : {{place}}</li>
      <li class="collection-item">Rate : {{rate}}</li>
    </ul>
    <router-link to="/" class="btn green">Back</router-link>
    <button @click="deleteMovie" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name : 'edit-movie', params : {movies_id : movies_id}}"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
  <!--fin du view-movie -->
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-movie",
  data() {
    return {
      movies_id: null,
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
            vm.movies_id = doc.data().movies_id;
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
    deleteMovie() {
      if (confirm("Are you sure?")) {
        db.collection("movies")
          .where("movie_id", "==", this.$route.params.movie_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>
