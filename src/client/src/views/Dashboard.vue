<template>
  <v-container class="my-5">
    <v-flex xs2 sm4 md2>
      <!--<v-btn color="primary" dark>Create Ad</v-btn>-->
      <TodoPopup @todoDodan="getTodos"/>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="todo in todos" :key="todo.id">
        <v-card class="ma-3">
          <v-card-title>{{ todo.email }}</v-card-title>
          <v-card-text class="grey--text">{{ todo.opis }}</v-card-text>
          <v-card-actions>
            <v-btn v-on:click="deleteTodo(todo.id)" color="white--grey">
              <v-icon small left>delete</v-icon>
              <span>Izbrisi</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import TodoPopup from "../components/TodoPopup.vue";

export default {
  components: {
    TodoPopup
  },
  data() {
    return {
      todos: []
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      axios
        .get("http://localhost:3000/api/todos")
        .then(response => {
          //console.log(response + "ASasSasAS");
          this.todos = response.data;
        })
        .catch(error => console.error(error));
    },
    deleteTodo(id) {
      axios
        .delete(`http://localhost:3000/api/todos/${id}`)
        .then(_data => {
          this.getTodos();
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
<style>
</style>