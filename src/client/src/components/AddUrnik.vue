<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Dodaj uro</v-btn>
    <v-card>
      <v-card-title>
        <h2>Dodaj uro</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-on:submit.prevent>
          <v-text-field label="naslov" v-model="event.title" prepend-icon="edit"></v-text-field>
          <v-text-field label="dolžina" v-model="event.duration" prepend-icon="edit"></v-text-field>
          <v-select :items="items" v-model="event.date" label="Dan" solo></v-select>

          <v-time-picker v-model="event.time"></v-time-picker>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Dodaj uro</v-btn>
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
      event: { email: "", title: "", duration: "", date: "", time: "" },
      items: [
        {
          text: "Ponedeljek",
          value: "2019-01-07"
        },
        {
          text: "Torek",
          value: "2019-01-08"
        },
        {
          text: "Sreda",
          value: "2019-01-09"
        },
        {
          text: "Četrtek",
          value: "2019-01-10"
        },
        {
          text: "Petek",
          value: "2019-01-11"
        },
        {
          text: "Sobota",
          value: "2019-01-12"
        },
        {
          text: "Nedelja",
          value: "2019-01-13"
        }
      ],
      loading: false,
      dialog: false,
      token: ""
    };
  },
  beforeMount() {
    this.event.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
  },
  methods: {
    submit() {
      axios
        .post("http://localhost:3000/api/urniki", this.event, {
          headers: { Authorization: this.token }
        })
        .then(response => {
          this.dialog = false;
          this.$emit("urnikDodan");
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
