<template>
  <v-layout>
    <v-flex>
      <AddUrnik/>
      <v-sheet height="400">
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <v-calendar
          :weekdays="weekDays"
          ref="calendar"
          :now="today"
          :value="today"
          color="primary"
          type="week"
          interval-count="9"
          first-interval="7"
        >
          <!-- the events at the top (all-day) -->
          <template v-slot:dayHeader="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.id"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
              >
                {{event.title}}
                <v-icon @click="deleteEvent(event.id)">delete</v-icon>
              </div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import AddUrnik from "./AddUrnik.vue";
export default {
  components: {
    AddUrnik
  },
  data: () => ({
    weekDays: [1, 2, 3, 4, 5, 6, 0],
    today: "2019-01-07",
    events: [],
    email: "",
    token: ""
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  beforeMount() {
    this.email = window.localStorage.getItem("email");
    this.token = window.localStorage.getItem("accToken");
    this.getEvents();
  },
  methods: {
    getEvents() {
      axios
        .get(
          `http://localhost:3000/api/urniki?filter[where][email]=${this.email}`,
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
        .delete(`http://localhost:3000/api/urniki/${id}`, {
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

<style lang="stylus">
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}

.v-calendar-daily_head-day-label {
  display: none;
}
</style>