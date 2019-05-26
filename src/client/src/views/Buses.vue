<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <h2>Postaja</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-on:submit.prevent>
              <v-text-field v-model="postaja" aria-placeholder="Vnesite ime postaje" required></v-text-field>
              <v-btn flat class="success mx-0 mt-3" @click="getBuses" :loading="loading">Prikaži avtobuse</v-btn>
              <!-- <p>Izbrana postaja: {{postaja}} </p> -->
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md1></v-flex>
      <v-flex xs12 md5>
        <BusList/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
import BusList from "../components/BusList";
import rp from "request-promise";



export default {
  components: {
    BusList,
  },
  data() {
    return {
      postaja:""
    };
  },
  mounted() {
    this.getBuses();
  },
  methods: {
    getBuses() {
      if (this.$refs.form.validate()) {
        console.log("got the method " + this.postaja);
        //https://www.trola.si/"+this.postaja+"/"
        axios
          .get("http://www.google.com", {headers:{"User-Agent" : "Request-Promise"}})
          .then(response => {
            console.log(response);
          })
          .catch(error => console.error(error));
      }
    },
  }
};
</script>
<style>
</style>