<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Movies</h4>
      </li>
      <li v-for="movies in movies" v-bind:key="movies.id" class="collection-item">
        {{movies.title}}
        <div class="chip">{{movies.rate}} / 10</div>
        <router-link
          class="secondary-content"
          v-bind:to="{name : 'view-movie', params: {movie_id : movies.movies_id}}"
        >
          <i class="fa fa-info"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large green pulse">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      movies: []
    };
  },
  created() {
    db.collection("movies")
      .orderBy("rate", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            movies_id: doc.data().movie_id,
            title: doc.data().title,
            date: doc.data().date,
            place: doc.data().place,
            rate: doc.data().rate
          };
          this.movies.push(data);
        });
      });
  }
};
</script>
