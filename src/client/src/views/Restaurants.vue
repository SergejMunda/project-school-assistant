<template>
  
  <div>
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <v-flex xs2 sm4 md2>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8 lg6 v-for="restaurant in restaurants" :key="restaurant.id" :class="{activeclass : restaurant.show}">
        <v-card class="ma-3">
           <v-card-title primary-title>
            <div>
                <div class="headline">{{ restaurant.ime }}</div>
                <span class="grey--text">{{restaurant.naslov}}</span>
            </div>
          </v-card-title>
          
          <v-spacer></v-spacer>
          
        <v-btn small :href="restaurant.link" target="_blank">Pokaži na zemljevidu</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
    

  data() {
    return {
      restaurants: [],
      email: "",
      token: "",
      //show : false,
      loading : true,
      
    };
  },
  beforeMount() {
    this.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
  },
  mounted() {
    this.getRestaurants();
  },
  methods: {
     getRestaurants() {
      axios
        .get(
          `http://localhost:3000/api/restavracije`,
          {
            headers: { Authorization: this.token }
          }
        )
        .then(response => {
          this.restaurants = response.data;
          for(var i = 0; i < this.restaurants.length;i++){
              this.restaurants[i].link = "http://maps.google.com/?q="+this.restaurants[i].ime+" "+this.restaurants[i].naslov;
              this.loading = false;
          }
          
        })
        .catch(error => console.error(error));
    },    
  }
};
</script>
<style>
</style>