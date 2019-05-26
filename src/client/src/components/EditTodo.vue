<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn icon slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>Uredi todo</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-on:submit.prevent>
          <v-textarea label="opis" v-model="todo.opis" prepend-icon="edit"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Uredi todo</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: ["todo"],
  data() {
    return {
      // todo: { ...this.todo },
      loading: false,
      dialog: false,
      token: ""
    };
  },
  beforeMount() {
    this.todo.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
  },
  methods: {
    submit() {
      axios
        .put(`http://localhost:3000/api/todos/${this.todo.id}`, this.todo, {
          headers: { Authorization: this.token }
        })
        .then(response => {
          this.createResp = response.status;
          this.dialog = false;
          this.$emit("todoUpdated");
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
