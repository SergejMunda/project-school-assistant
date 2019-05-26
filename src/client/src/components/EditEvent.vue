<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn icon slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Uredi event</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-on:submit.prevent>
          <v-text-field label="naslov" v-model="events.title" prepend-icon="edit"></v-text-field>
          <v-text-field
            label="datum"
            v-model="events.date"
            prepend-icon="edit"
            placeholder="YYYY-MM-DD"
          ></v-text-field>
          <v-textarea label="opis" v-model="events.details" prepend-icon="edit"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Uredi event</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: ["event"],
  data() {
    return {
      events: { ...this.event },
      loading: false,
      dialog: false,
      token: "",
      email: ""
    };
  },
  beforeMount() {
    // this.email = window.localStorage.getItem("email");
    // this.event.email = this.email;
    this.token = window.localStorage.getItem("accToken");
  },
  methods: {
    submit() {
      axios
        .put(
          `http://localhost:3000/api/koledarji/${this.events.id}`,
          this.events,
          {
            headers: { Authorization: this.token }
          }
        )
        .then(response => {
          this.createResp = response.status;
          this.dialog = false;
          this.$emit("eventEdit");
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
