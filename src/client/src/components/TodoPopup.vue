<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Dodaj todo</v-btn>
    <v-card>
      <v-card-title>
        <h2>Dodaj todo</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-on:submit.prevent>
          <v-text-field label="Email" v-model="todo.email" prepend-icon="folder"></v-text-field>
          <v-textarea label="opis" v-model="todo.opis" prepend-icon="edit"></v-textarea>
          <v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Dodaj todo</v-btn>
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
      todo: { email: "", opis: "" },
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      axios
        .post("http://localhost:3000/api/todos", this.todo)
        .then(response => {
          this.createResp = response.status;
          this.dialog = false;
          this.$emit("todoDodan");
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
