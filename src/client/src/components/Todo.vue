<template>
  <div>
    <v-flex xs2 sm4 md2>
      <!--<v-btn color="primary" dark>Create Ad</v-btn>-->
      <TodoPopup @todoDodan="getTodos"/>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8 lg6 v-for="todo in todos" :key="todo.id">
        <v-card class="ma-3">
          <v-card-text>{{ todo.opis }}</v-card-text>
          <v-card-actions wrap>
            <EditTodo :todo="todo" @todoUpdated="getTodos"/>
            <v-btn v-on:click="deleteTodo(todo.id)" icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import TodoPopup from "./TodoPopup.vue";
import EditTodo from "./EditTodo.vue";

export default {
  components: {
    TodoPopup,
    EditTodo
  },
  data() {
    return {
      todos: [],
      email: "",
      token: ""
    };
  },
  beforeMount() {
    this.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      axios
        .get(
          `http://localhost:3000/api/todos?filter[where][email]=${this.email}`,
          {
            headers: { Authorization: this.token }
          }
        )
        .then(response => {
          this.todos = response.data;
        })
        .catch(error => console.error(error));
    },
    deleteTodo(id) {
      axios
        .delete(`http://localhost:3000/api/todos/${id}`, {
          headers: { Authorization: this.token }
        })
        .then(_data => {
          this.getTodos();
        })
        .catch(error => console.error(error));
    },
    editTodo(id) {
      axios
        .put(`http://localhost:3000/api/todos/${id}`, this.data, {
          headers: { Authorization: this.token }
        })
        .then(response => {
          // this.todos = response.data;
          console.log(response);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
<style>
</style>