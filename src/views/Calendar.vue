<template>
  <div class="calendar">
    <Navigation></Navigation>
    <!-- <div>
      {{}}
    </div> -->
    <v-row align-content="space-between">
      <div>
        <v-col cols="12" xs="12" sm="12" md="12" align="center">
          <v-sheet
            tile
            height="54"
            color="grey lighten-3"
            class="d-flex"
          >
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              class="ma-2"
              label="type"
            ></v-select>
            <v-select
              v-model="mode"
              :items="modes"
              dense
              outlined
              hide-details
              label="event-overlap-mode"
              class="ma-2"
            ></v-select>
            <v-select
              v-model="weekday"
              :items="weekdays"
              dense
              outlined
              hide-details
              label="weekdays"
              class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.next()"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </div>
    </v-row>
    <v-row align-content="space-between">
      <v-col cols="12" xs="4" sm="4" md="4" align="center">
        <div class="display-2">体重:60kg</div>
      </v-col>
      <v-col cols="12" xs="8" sm="8" md="8" align="center">
        <div class="display-2">体脂肪率:20%</div>
      </v-col>
    </v-row>
    <v-row align-content="space-between">
      <v-col cols="12" xs="12" sm="6" md="6" class="my-5">
        <div class="display-1">・メニュー</div>
      </v-col>
      <div class="my-5">
        <v-col cols="12" xs="12" sm="12" md="12" align="center">
          <a class="display-1" href="Menu">記録がありません</a>
        </v-col>
      </div>
      <!-- 筋トレ -->
      <!-- 後でコンポーネント化する -->
      <v-col cols="12" xs="12" sm="6" md="6" class="my-5">
        <div class="display-1">・トレーニング</div>
      </v-col>
      
      <div class="my-5">
        <v-col cols="12" xs="12" sm="12" md="12" align="center">
          <div class="display-1">
          <a class="display-1" href="Training">記録がありません</a>
          </div>
        </v-col>
      </div>
    </v-row>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
  components: {
    Navigation
  },
  data: () => ({
    type: 'month',
    types: ['month', 'week', 'day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Sun , Sat', value: [0, 6] },
    ],
    value: '',
    events: [],
    colors: ['blue', 'red'],
    names: ['筋トレ', '食トレ'],
  }),
  methods: {
    getEvents ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 1))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 1
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
};
</script>