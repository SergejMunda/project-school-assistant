<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 md6>
        <Calendar/>
        <br>
        <br>
        <Urnik/>
      </v-flex>
      <v-flex xs12 md1></v-flex>
      <v-flex xs12 md5>
        <Todo/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import Todo from "../components/Todo.vue";
import Urnik from "../components/Urnik.vue";
import Calendar from "../components/Calendar.vue";

export default {
  components: {
    Todo,
    Calendar,
    Urnik
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