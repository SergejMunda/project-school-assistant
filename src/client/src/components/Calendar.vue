<template>
  <v-layout>
    <v-flex>
      <AddEvent @eventDodan="getEvents"/>
      <v-sheet height="500">
        <v-calendar :now="today" :value="today" color="primary">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                <template v-slot:activator="{ on }">
                  <div v-if="!event.time" class="my-event" v-on="on" v-html="event.title"></div>
                </template>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="primary" dark>
                    <EditEvent :event="event" @eventEdit="getEvents"/>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteEvent(event.id)" icon>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="secondary">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import AddEvent from "./AddEvent.vue";
import EditEvent from "./EditEvent.vue";

export default {
  components: {
    AddEvent,
    EditEvent
  },
  data: () => ({
    today: "2019-05-28",
    events: []
  }),
  beforeMount() {
    this.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
    this.formatDate();
    this.getEvents();
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    formatDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      this.today = [year, month, day].join("-");
    },
    getEvents() {
      axios
        .get(
          `http://localhost:3000/api/koledarji?filter[where][email]=${
            this.email
          }`,
          {
            headers: { Authorization: this.token }
          }
        )
        .then(response => {
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
    open(event) {
      alert(event.title);
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>