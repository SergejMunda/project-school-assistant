<template>
  <div>
    <v-flex xs2 sm4 md2>
    <AddEvent @eventDodan="getEvents"/>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm12 md8 lg6 v-for="event in events" :key="event.id">
        <v-card class="ma-3">
           <v-card-title primary-title>
            <div>
                <div class="headline">{{ event.title }}</div>
                <span class="grey--text">{{event.date}}</span>
            </div>
          </v-card-title>
          <v-card-text>
           {{ event.details}}
          </v-card-text>
          <v-btn @click="deleteEvent(event.id)" icon>
                      <v-icon>delete</v-icon>
           </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import AddEvent from "../components/AddEvent.vue";
export default {
  components: {
    AddEvent
  },
  
  data() {
    return {
      events: [],
      email: "",
      token: "",
      
    };
  },
  beforeMount() {
    this.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
  },
  mounted() {
    this.getEvents();
  },
  methods: {
     getEvents() {
      axios
        .get(
          `http://localhost:3000/api/koledarji?filter[where][email]=${this.email}`,
          {
            headers: { Authorization: this.token }
          }
        )
        .then(response => {
          //console.log(response + "ASasSasAS");
          this.events = response.data;
        })
        .catch(error => console.error(error));
    },
     deleteEvent(id) {
      axios
        .delete(`http://localhost:3000/api/koledarji/${id}`, {
          headers: { Authorization: this.token }
        })
        .then(_data => {
          this.getEvents();
        })
        .catch(error => console.error(error));
    },
  }
};
</script>
<style>
</style>