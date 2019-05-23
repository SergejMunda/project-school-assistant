<template>
  <v-container>
    <v-layout align-start justify-start row wrap fill-height>
      <v-flex xs12 md6>
        <Calendar/>
      </v-flex>
      <v-flex md1/>
      <v-flex xs12 md5>
        <Todo/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Todo from "../components/Todo.vue";
import Calendar from "../components/Calendar.vue";

export default {
  components: {
    Todo,
    Calendar
  },
  data() {
    return {};
  }
};
</script>
<style>
</style>