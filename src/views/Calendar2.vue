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
      <!-- <v-col cols="12">
        <v-row justify="space-around">
          <v-switch v-model="landscape" class="ma-4" label="Landscape"></v-switch>
          <v-switch v-model="reactive" class="ma-4" label="Reactive"></v-switch>
          <v-switch v-model="flat" class="ma-4" label="Flat"></v-switch>
          <v-switch v-model="fullWidth" class="ma-4" label="Full width"></v-switch>
          <v-switch v-model="showCurrent" class="ma-4" label="Show current date"></v-switch>
          <v-switch v-model="month" class="ma-4" label="Month picker"></v-switch>
          <v-switch v-model="multiple" class="ma-4" label="Multiple"></v-switch>
          <v-switch v-model="readonly" class="ma-4" label="Readonly"></v-switch>
          <v-switch v-model="disabled" class="ma-4" label="Disabled"></v-switch>
          <v-switch v-model="enableEvents" class="ma-4" label="Events"></v-switch>
        </v-row>
      </v-col> -->
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
    <!-- <v-row justify="center">
      <div class="display-2">今日のごはん</div>
    </v-row> -->

    <div class="display-2">今日のごはん</div>
        <v-divider></v-divider>
    <v-row>
        
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
            @click.stop="dialog = true"
          >
            <v-subheader>{{card.ranking}}</v-subheader>
            <v-card>
              <v-img
                :src="card.src"
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
                <span>400kcal</span>
              </v-card-actions>
            </v-card>
            <v-dialog
              v-model="dialog"
              max-width="600"
            >
              <v-card>
              <v-img
                :src= " require('../assets/料理/料理.png')"
                class="white--text align-end"
              >
              </v-img>
              <v-card-title>スパゲッティ</v-card-title>
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
                <span>400kcal</span>
              </v-card-actions>
            </v-card>
            </v-dialog>
          </v-col>
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
      cards: [
        { title: 'スパゲッティ', src: require('../assets/料理/料理.png'), flex: 3,ranking: '朝食'},
        { title: 'ハンバーガー', src: require('../assets/料理/ハンバーガー.png'), flex: 3,ranking: '昼食' },
        { title: '牛丼', src: require('../assets/料理/牛丼.png'), flex: 3,ranking: '夜食' },
      ],
      dialog: false,
    }
  },

  computed: {
    functionEvents () {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
    },
  },

  methods: {
    dateFunctionEvents (date) {
      const [,, day] = date.split('-')
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
      return false
    },
    monthFunctionEvents (date) {
      const month = parseInt(date.split('-')[1], 10)
      if ([1, 3, 7].includes(month)) return true
      if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
      return false
    },
  },
};
</script>