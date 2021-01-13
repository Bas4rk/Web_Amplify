<template>
  <v-row>
    <v-col
      sm="12"
      lg="3"
      class="mb-4 controls"
    >
      <v-btn
        fab
        small
        absolute
        left
        color="primary"
        @click="$refs.calendar.prev()"
      >
        <v-icon dark>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        absolute
        right
        color="primary"
        @click="$refs.calendar.next()"
      >
        <v-icon dark>mdi-chevron-right</v-icon>
      </v-btn>
      <br><br><br>
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
        hide-details
        outlined
        dense
      ></v-select>
      <v-checkbox
        v-model="dark"
        label="Dark"
        hide-details
      ></v-checkbox>
      <v-checkbox
        v-model="shortIntervals"
        label="Short intervals"
        hide-details
      ></v-checkbox>
      <v-checkbox
        v-model="shortMonths"
        label="Short months"
        hide-details
      ></v-checkbox>
      <v-checkbox
        v-model="shortWeekdays"
        label="Short weekdays"
        hide-details
      ></v-checkbox>
      <v-select
        v-model="color"
        :items="colorOptions"
        class="mt-3"
        label="Color"
        hide-details
        outlined
        dense
      ></v-select>
      <v-menu
        ref="startMenu"
        v-model="startMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="start"
        transition="scale-transition"
        min-width="290px"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="start"
            class="mt-3"
            label="Start Date"
            prepend-icon="event"
            dense
            readonly
            outlined
            hide-details
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="start"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="startMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.startMenu.save(start)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        v-if="hasEnd"
        ref="endMenu"
        v-model="endMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="end"
        transition="scale-transition"
        min-width="290px"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="end"
            class="mt-3"
            label="End Date"
            prepend-icon="event"
            dense
            readonly
            outlined
            hide-details
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="end"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="endMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.endMenu.save(end)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="nowMenu"
        v-model="nowMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="now"
        transition="scale-transition"
        min-width="290px"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="now"
            class="mt-3"
            label="Today"
            prepend-icon="event"
            dense
            readonly
            outlined
            hide-details
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="now"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="nowMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.nowMenu.save(now)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-select
        v-model="mode"
        :items="modeOptions"
        dense
        outlined
        hide-details
        class="mt-3"
        label="Event Overlap Mode"
      ></v-select>
      <v-select
        v-model="weekdays"
        :items="weekdaysOptions"
        dense
        outlined
        hide-details
        class="mt-3"
        label="Weekdays"
      ></v-select>
      <v-text-field
        v-if="type === 'custom-weekly'"
        v-model="minWeeks"
        dense
        outlined
        hide-details
        class="mt-3"
        label="Minimum Weeks"
        type="number"
      ></v-text-field>
      <v-select
        v-if="hasIntervals"
        v-model="intervals"
        :items="intervalsOptions"
        dense
        outlined
        hide-details
        class="mt-3"
        label="Intervals"
      ></v-select>
      <v-select
        v-if="type === 'custom-daily'"
        v-model="maxDays"
        :items="maxDaysOptions"
        dense
        outlined
        hide-details
        class="mt-3"
        label="# of Days"
      ></v-select>
      <v-select
        v-if="hasIntervals"
        v-model="styleInterval"
        :items="styleIntervalOptions"
        dense
        outlined
        hide-details
        class="mt-3"
        label="Styling"
      ></v-select>
    </v-col>
    <v-col
      sm="12"
      lg="9"
      class="pl-4"
    >
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="start"
          :type="type"
          :start="start"
          :end="end"
          :min-weeks="minWeeks"
          :max-days="maxDays"
          :now="now"
          :dark="dark"
          :weekdays="weekdays"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :interval-style="intervalStyle"
          :show-interval-label="showIntervalLabel"
          :short-intervals="shortIntervals"
          :short-months="shortMonths"
          :short-weekdays="shortWeekdays"
          :color="color"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="45"
          :event-color="getEventColor"
          @change="getEvents"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

  const intervalsDefault = {
    first: 0,
    minutes: 60,
    count: 24,
    height: 48,
  }

  const stylings = {
    default (interval) {
      return undefined
    },
    workday (interval) {
      const inactive = interval.weekday === 0 ||
        interval.weekday === 6 ||
        interval.hour < 9 ||
        interval.hour >= 17
      const startOfHour = interval.minute === 0
      const dark = this.dark
      const mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

      return {
        backgroundColor: inactive ? (dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined,
        borderTop: startOfHour ? undefined : '1px dashed ' + mid,
      }
    },
    past (interval) {
      return {
        backgroundColor: interval.past ? (this.dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined,
      }
    },
  }

  export default {
    data: () => ({
      dark: false,
      startMenu: false,
      start: '2019-01-12',
      endMenu: false,
      end: '2019-01-27',
      nowMenu: false,
      minWeeks: 1,
      now: null,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      type: 'month',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' },
      ],
      mode: 'stack',
      modeOptions: [
        { text: 'Stack', value: 'stack' },
        { text: 'Column', value: 'column' },
      ],
      weekdays: weekdaysDefault,
      weekdaysOptions: [
        { text: 'Sunday - Saturday', value: weekdaysDefault },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      ],
      intervals: intervalsDefault,
      intervalsOptions: [
        { text: 'Default', value: intervalsDefault },
        { text: 'Workday', value: { first: 16, minutes: 30, count: 20, height: 48 } },
      ],
      maxDays: 7,
      maxDaysOptions: [
        { text: '7 days', value: 7 },
        { text: '5 days', value: 5 },
        { text: '4 days', value: 4 },
        { text: '3 days', value: 3 },
      ],
      styleInterval: 'default',
      styleIntervalOptions: [
        { text: 'Default', value: 'default' },
        { text: 'Workday', value: 'workday' },
        { text: 'Past', value: 'past' },
      ],
      color: 'primary',
      colorOptions: [
        { text: 'Primary', value: 'primary' },
        { text: 'Secondary', value: 'secondary' },
        { text: 'Accent', value: 'accent' },
        { text: 'Red', value: 'red' },
        { text: 'Pink', value: 'pink' },
        { text: 'Purple', value: 'purple' },
        { text: 'Deep Purple', value: 'deep-purple' },
        { text: 'Indigo', value: 'indigo' },
        { text: 'Blue', value: 'blue' },
        { text: 'Light Blue', value: 'light-blue' },
        { text: 'Cyan', value: 'cyan' },
        { text: 'Teal', value: 'teal' },
        { text: 'Green', value: 'green' },
        { text: 'Light Green', value: 'light-green' },
        { text: 'Lime', value: 'lime' },
        { text: 'Yellow', value: 'yellow' },
        { text: 'Amber', value: 'amber' },
        { text: 'Orange', value: 'orange' },
        { text: 'Deep Orange', value: 'deep-orange' },
        { text: 'Brown', value: 'brown' },
        { text: 'Blue Gray', value: 'blue-gray' },
        { text: 'Gray', value: 'gray' },
        { text: 'Black', value: 'black' },
      ],
      shortIntervals: true,
      shortMonths: false,
      shortWeekdays: false,
    }),
    computed: {
      intervalStyle () {
        return stylings[this.styleInterval].bind(this)
      },
      hasIntervals () {
        return this.type in {
          week: 1, day: 1, '4day': 1, 'custom-daily': 1,
        }
      },
      hasEnd () {
        return this.type in {
          'custom-weekly': 1, 'custom-daily': 1,
        }
      },
    },
    methods: {
      viewDay ({ date }) {
        this.start = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      showIntervalLabel (interval) {
        return interval.minute === 0
      },
      getEvents ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            timed: !allDay,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style scoped>
.controls {
  position: relative;
}
</style>

<v-date-picker
    v-model="picker"
    locale="jp-ja"
    :day-format="date => new Date(date).getDate()"
    :landscape="landscape"
    :reactive="reactive"
    :flat="flat"
    :full-width="fullWidth"
    :show-current="showCurrent"
    :type="month ? 'month' : 'date'"
    :multiple="multiple"
    :readonly="readonly"
    :disabled="disabled"
    :events="enableEvents ? functionEvents : null"
></v-date-picker>

data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: true,
      fullWidth: true,
      flat: false,
      showCurrent: true,
      month: false,
      multiple: false,
      readonly: false,
      disabled: false,
      enableEvents: true,
      dialog: false,
      currentCard: null,
  },
  computed: {
  },
  methods: {
    dateFunctionEvents (date) {
      // console.log("date:"+date)
      // console.log("parseInt(day, 10):"+parseInt(day, 10))
      const [,, day] = date.split('-')
      const foodMemoDay = []
      this.foodMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = value.memoDate.split('-')
        foodMemoDay.push(Number(memo))
      });
      // if (foodMemoDay.includes(parseInt(day, 10))) return true
      const trainingMemoDay = []
      this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = value.memoDate.split('-')
        trainingMemoDay.push(Number(memo))
      });
      
      if (foodMemoDay.includes(parseInt(day, 10)) && trainingMemoDay.includes(parseInt(day, 10))){
        return ['blue', 'red']
      } else if(foodMemoDay.includes(parseInt(day, 10))){
        return 'blue'
      } else if(trainingMemoDay.includes(parseInt(day, 10))){
        return 'red'
      }
      //[fix]ここら辺めっちゃ呼び出されてるけど、どうにかならないか？
      return false
    },
    monthFunctionEvents (date) {
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
    onClickBtn(card) {
      this.currentCard = card
      this.dialog = true
    }
  },
};

<template>
  <div class="calendar">
    <Navigation></Navigation>
    <!-- <div>
      {{}}
    </div> -->
    <v-row>
      <v-col  cols="8">
        <v-row align-content="space-between">
          <v-col cols="12" align="center">
          <div class="display-4 ">{{picker}}日</div>
          </v-col>
          <v-col cols="12" align="center">
          <div class="display-3">体重:60kg</div>
          </v-col>
          <v-col cols="12" align="center">
          <div class="display-3">体脂肪率:20%</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" align="right">
        <v-date-picker
          v-model="picker"
          locale="jp-ja"
          :day-format="date => new Date(date).getDate()"
          :landscape="landscape"
          :reactive="reactive"
          :flat="flat"
          :full-width="fullWidth"
          :show-current="showCurrent"
          :type="month ? 'month' : 'date'"
          :multiple="multiple"
          :readonly="readonly"
          :disabled="disabled"
          :events="enableEvents ? functionEvents : null"
        ></v-date-picker>
      </v-col>
    </v-row>

    <!-- [fix]ごはんと筋トレ、コンポーネント化する -->
    <v-row justify="center">
      <div class="display-2">今日のごはん</div>
    </v-row>
    <v-divider></v-divider>

    <v-row v-if="todayFoodMenus.length > 0" id="clmenu" align="center" class="my-5">
      <v-col
        v-for="(card,index) in todayFoodMenus"
        :key="index"
        :cols=3
        @click.stop="onClickBtn(card)"
      >
        <v-subheader>{{card.subtitle}}</v-subheader>
        <v-card>
          <v-img
            :src="card.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-fire</v-icon>
            </v-btn>
            <span>{{card.calorele}}kcal</span>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-dialog
        v-model="dialog"
        v-if="currentCard"
        max-width="600"
      >
        <v-card>
          <v-img
            :src= "currentCard.image"
            class="white--text align-end"
          >
          </v-img>
          <v-card-title>{{currentCard.title}}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>栄養成分</v-card-title>
          <v-list class="transparent">
            <v-list-item>
              <v-list-item-title>エネルギー</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>炭水化物</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>タンパク質</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>脂質</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>なんか</v-list-item-title>
              <v-list-item-subtitle>400kcal</v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-fire</v-icon>
            </v-btn>
            <span>{{currentCard.calorele}}cal</span>
          </v-card-actions>
        </v-card>
      </v-dialog>  
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        何も食べてません。
      </div>
    </v-row>




    <!-- 筋トレ -->
    <!-- 後でコンポーネント化する -->
    <v-row justify="center" class="my-5">
      <div class="display-2">今日の筋トレ</div>
    </v-row>
    <v-divider></v-divider>

    <v-row v-if="todayTrainingMenus" id="clmenu" align="center">
      <v-treeview
        open-all
        :items="todayTrainingMenus.items"
      ></v-treeview>
    </v-row>
    <v-row v-else justify="center" class="my-5">
      <div class="display-2">
        トレーニングしていません。
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
   data () {
    return {
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: true,
      fullWidth: true,
      flat: false,
      showCurrent: true,
      month: false,
      multiple: false,
      readonly: false,
      disabled: false,
      enableEvents: true,
      dialog: false,
      currentCard: null,
      foodMemos: [
        { memoDate: "2020-12-02",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 100 },
        { memoDate: "2020-12-02",title: "ハンバーガー",image: require('../assets/料理/ハンバーガー.png'),subtitle: "夜食",calorele: 200 },
        { memoDate: "2020-12-06",title: "牛丼",image: require('../assets/料理/牛丼.png'),subtitle: "朝食",calorele: 500 },
      ],
      // trainingMemosのフィールドどうするか
      trainingMemos: [
        {memoDate: "2020-12-02",
          items: [
                  {
                    id: 1,
                    name: '有酸素 :',
                    children: [
                      { id: 2, name: 'ランニング 10km 20分' },
                    ],
                  },
                  {
                    id: 3,
                    name: '胸 :',
                    children: [
                      { id: 4, name: 'ベンチプレス 100kg 10回' },
                      { id: 5, name: 'ベンチプレス 120kg 5回' },
                    ],
                  },
                ] 
        },
        {memoDate: "2020-12-05",
          items: [
                  {
                    id: 1,
                    name: '有酸素 :',
                    children: [
                      { id: 2, name: 'ランニング 10km 20分' },
                    ],
                  },
                ] 
        },
        // { memoDate: "2020-12-02",title: "胸",subtitle: "ベンチプレス",value1: "100kg",value2: "10回" },
        // { memoDate: "2020-12-02",title: "胸",subtitle: "ベンチプレス",value1: "120kg",value2: "5回" },
      ]
    }
  },
  computed: {
    functionEvents () {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
    },
    todayFoodMenus(){
      const menu = []
      const today = this.picker
      this.foodMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        if(value.memoDate == today){menu.push(value)}
      });
      return menu
    },
    todayTrainingMenus(){
      let menu = null
      const today = this.picker
      this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        if(value.memoDate == today){ menu= value}
      });
      return menu
    }
  },
  methods: {
    dateFunctionEvents (date) {
      // console.log("date:"+date)
      // console.log("parseInt(day, 10):"+parseInt(day, 10))
      const [,, day] = date.split('-')
      const foodMemoDay = []
      this.foodMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = value.memoDate.split('-')
        foodMemoDay.push(Number(memo))
      });
      // if (foodMemoDay.includes(parseInt(day, 10))) return true
      const trainingMemoDay = []
      this.trainingMemos.forEach(function (value) {
        // console.log(index + '番目 : ' + value);
        const [,, memo] = value.memoDate.split('-')
        trainingMemoDay.push(Number(memo))
      });
      
      if (foodMemoDay.includes(parseInt(day, 10)) && trainingMemoDay.includes(parseInt(day, 10))){
        return ['blue', 'red']
      } else if(foodMemoDay.includes(parseInt(day, 10))){
        return 'blue'
      } else if(trainingMemoDay.includes(parseInt(day, 10))){
        return 'red'
      }
      //[fix]ここら辺めっちゃ呼び出されてるけど、どうにかならないか？
      return false
    },
    monthFunctionEvents (date) {
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
    onClickBtn(card) {
      this.currentCard = card
      this.dialog = true
    }
  },
};
</script>