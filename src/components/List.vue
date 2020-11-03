<template>
  <!-- <v-app>はApp.vueに書く -->
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
        <v-icon size="60">mdi-account</v-icon>
        </v-avatar>

        <div>{{ getUserEmail }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon> mdi-logout</v-icon>
          </v-list-item-icon>
          <amplify-sign-out />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
           <!-- 日ごとに表示させる -->
          <!-- <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          > -->
          <v-col cols="12">
            <v-card>
              <!-- <v-subheader>{{ card }}</v-subheader> -->
              <v-subheader>投稿一覧</v-subheader>

              <v-list>
                <template v-for="item in items">
                  <v-list-item :key="item">
                    <v-list-item-avatar color="grey darken-1">
                      <v-icon size="30">mdi-account</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>

                      <v-list-item-subtitle>
                        {{ item.description}}
                        <div>
                          <small>投稿者:{{ item.user_id }}</small>
                        </div>
                        <div>
                          <small>{{ item.createdAt }}</small>
                        </div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    :key="`divider-${item}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>

          <v-col>
            <v-card >
              <v-subheader>投稿投稿</v-subheader>
              <NewTodo></NewTodo>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NewTodo from '@/components/NewTodo.vue';

  export default {
    props:['items'],
    components: {
      NewTodo
    },
    data: () => ({
      // cards: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
    }),
    computed: {
      getUserEmail (){
        return  this.$store.getters.getUserEmail
      }
    }
  }
</script>
