<template>
  <div>
    <v-flex xs2 sm4 md2>
      <!--<v-btn color="primary" dark>Create Ad</v-btn>-->
      <p>Avtobusi:</p>
      <!--<TodoPopup @todoDodan="getTodos"/>-->
    </v-flex>
    <v-layout column wrap>
      <v-flex v-for="postaja in postaje" :key="postaja.id">
        <v-card class="ma-3">
          <v-card-text>Smer: {{ postaja.smer }}</v-card-text>
          <v-card-text>Številka avtobusa: {{ postaja.stevilka }}</v-card-text>
          <v-card-text>Prihod čez (v minutah): {{ postaja.comesIn }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  data() {
    return {
      postaje: [
        {
          id: 1,
          smer: "Rudnik",
          stevilka: 3,
          comesIn: [39, 64, 89]
        },
        {
          id: 2,
          smer: "Zalog",
          stevilka: 11,
          comesIn: [14, 44, 84]
        },
        {
          id: 3,
          smer: "Center stožice p+r",
          stevilka: 18,
          comesIn: [9, 32, 65]
        }
      ]
    };
  },
  mounted() {
    this.postaje();
  },
  methods: {
    postaje(id) {
      console.log(this.postaje);
    }
  }
};
</script>
<style>
</style>