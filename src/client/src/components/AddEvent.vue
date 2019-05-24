<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Dodaj event</v-btn>
    <v-card>
      <v-card-title>
        <h2>Dodaj event</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-on:submit.prevent>
          <v-text-field label="naslov" v-model="event.title" prepend-icon="edit"></v-text-field>
          <v-text-field label="datum" v-model="event.date" prepend-icon="edit"></v-text-field>
          <v-textarea label="opis" v-model="event.details" prepend-icon="edit"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Dodaj event</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      event: { email: "", title: "", details: "", date: "" },
      loading: false,
      dialog: false,
      token: "",
      email: ""
    };
  },
  beforeMount() {
    this.email = window.localStorage.getItem("email");
    this.event.email = this.email;
    this.token = window.localStorage.getItem("accToken");
  },
  methods: {
    submit() {
      axios
        .post("http://localhost:3000/api/koledarji", this.event, {
          headers: { Authorization: this.token }
        })
        .then(response => {
          this.dialog = false;
          this.$emit("eventDodan");
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {}
};
</script>

<style>
</style>
