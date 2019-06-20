<template>
  <div id="new-movie">
    <h3>New Movie</h3>
    <div class="row">
      <form @submit.prevent="saveMovie" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="movie_id" required>
            <label>Movie ID #</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="title" required>
            <label>Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="date" required>
            <label>Date</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="place" required>
            <label>Place</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="rate" number required>
            <label>Rate</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn red">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-movie",
  data() {
    return {
      movie_id: null,
      title: null,
      date: null,
      place: null,
      rate: null
    };
  },
  methods: {
    saveMovie() {
      db.collection("movies")
        .add({
          movie_id: this.movie_id,
          title: this.title,
          date: this.date,
          place: this.place,
          rate: this.rate
        })
        .then(docRef => this.$router.push("/"))
        .catch(error => console.log(err));
    }
  }
};
</script>
