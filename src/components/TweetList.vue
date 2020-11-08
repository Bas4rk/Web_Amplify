<template>
  <div class="TweetList">
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
                <v-list-item :key="item.id">
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
                  :key="`divider-${item.id}`"
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
  </div>
</template>

<script>
import NewTodo from '@/components/NewTodo.vue';

  export default {
    props:['items'],
    components: {
      NewTodo
    }
  }
</script>
