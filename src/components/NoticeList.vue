<template>
  <div class="NoticeList">
    <v-container
      class="py-8 px-6"
      fluid
    >
      <v-row justify="center">
        <v-col cols="5">
          <v-card>
            <!-- <v-subheader>{{ card }}</v-subheader> -->
            <v-subheader>通知一覧</v-subheader>

            <v-list v-if="items.length > 0">

              <!-- v-forでitem配列取る -->
              <!-- v-forとv-ifの併用はできない -->
              <template v-for="item in items">

                <!-- ここの:to="{name:'tweet'のtweetでついーと画面に行くようになる（Tweet.vueへ） -->
                <!-- <v-list-item :key="item.id" height="200" :to="{name:'tweet',params:{id:item.id}}"> -->
                <v-list-item :key="item.id" height="200">

                  <!-- プロフィール画像
                  <v-list-item-avatar color="grey darken-1">
                    <v-icon size="30">mdi-account</v-icon>
                  </v-list-item-avatar> -->

                  <v-list-item-content>


                    <v-list-item-title>

                      <!-- ここいいね、コメントのアイコン通知に合わせて変えるようにする -->
                      <!-- <v-btn icon color="pink">
                        <v-icon size="35">mdi-heart</v-icon>
                      </v-btn> -->

                      <!-- アイコンの背景グレーにしてる -->
                      <v-list-item-avatar color="grey darken-1">

                        <!-- ここいいねした人のリストをアカウント画像横に並べたい -->
                        <v-icon size="30">mdi-account</v-icon>
                      </v-list-item-avatar>
                    </v-list-item-title>

                    <!-- ここもいいね、コメントした人のリストで名前乘せたい、2,3人以上いたら「他～人」って表示させたい -->
                    <!-- <p>～さんと～さんがあなたの投稿をいいねしました</p> -->

                    <!-- 投稿のタイトル -->
                    <v-list-item-title>{{item.followee.name}}さんにフォローされました</v-list-item-title>

                    <v-list-item-subtitle>

                      <!-- 投稿の内容表示 -->

                      <!-- class="right"これで右へ寄せ -->
                      <!-- <div class="right">
                        ↓small書くとちょっと小さくなる、ここらへんコメントアウトごみになった
                        <small>投稿者:{{ item.user_id }}</small>
                      </div> -->

                      <div class="right">
                        <!-- いいね、コメント等された日付日時ここ（～時間前、～日前、～週間、～ヶ月前みたいに表示したい、日時とかなくてもいいかも -->
                        <!-- <small>～時間前{{ item.createdAt }}</small> -->
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                {{item}}
                <!-- 公式にあった、v-dividerは区切り線、insetあるとアバター画像の下まで線行かない、idは指定しないと「必要だ」って怒られる -->
                 <v-divider
                  :key="`divider-${item.id}`"
                  inset
                ></v-divider>
              </template>

            </v-list>

            <v-list v-else>
              <v-list-item height="200">
                  <v-list-item-content>

                    <v-list-item-title>通知はありません。</v-list-item-title>

                    <v-list-item-subtitle>

                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>


      <!-- <v-btn large color="primary" @click="scrollTop">上にいく</v-btn> -->


    </v-container>
  </div>
  <!-- tweetカードらへんをコンポーネントにする。一番上に飛ぶボタンつくる -->
</template>

<script>

  export default {
    props:['items'],
    components: {
    },
    methods: {
    scrollTop: function(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
  }
</script>

<style scoped>
  .right{
    text-align: right;
  }
</style>
