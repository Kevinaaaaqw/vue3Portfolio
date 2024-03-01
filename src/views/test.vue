<script setup lang="ts">
import { useRouter } from 'vue-router'
import { unref, ref } from 'vue'
import axios from 'axios'
import { movieList } from '../pinia'

const title = ref('')
const movies = ref([])

const searchMovie = () => {
  axios.post(`https://www.omdbapi.com/?s=${title.value || ''}&apikey=a9ad8207`).then((response) => {
    movies.value = response.data.Search
  })
}
const addMovieList = (data) => {
  movieList().list.push(data)
  console.log(movieList().list)
}
</script>

<template>
  <router-link to="/cart" class="nav-link">購物車</router-link>
  <div class="intro">電影搜尋</div>
  <div style="display: flex">
    <div>電影名稱</div>
    <input v-model="title" />
    <button @click="searchMovie">搜尋</button>
  </div>
  <div
    v-for="movie in movies"
    style="border: 1px solid black; display: flex; justify-content: space-between"
  >
    <div>
      <div>{{ movie.Title }}</div>
      <div>{{ movie.Year }}</div>
      <div>{{ movie.Type }}</div>
      <div>{{ movie.imdbID }}</div>
      <br />
      <br />
      <button
        @click="
          () => {
            addMovieList({
              Title: movie.Title,
              Year: movie.Year,
              Type: movie.Type,
              imdbID: movie.imdbID,
              Poster: movie.Poster
            })
          }
        "
      >
        加入車車
      </button>
    </div>
    <img :src="movie.Poster" />
  </div>
</template>

<style scoped></style>
