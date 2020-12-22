<template>
  <div class="calendar">
    <Navigation></Navigation>
    <v-container
      class="py-8 px-6"
      fluid
    > 
    <v-layout justify-center>
      <div class="title">設定・その他</div>
    </v-layout>
      <v-row justify="center">
        <v-col cols="5">
          <v-list>
            <v-btn block to="/SettingPremium">プレミアムサービスを登録する</v-btn><br>
            <v-btn block to="/SettingAccount">アカウント管理</v-btn><br>
            <v-btn block to="/SettingNotification">通知の設定</v-btn><br>
            <v-btn block to="/SettingHelp" color="black" class="white--text">お困りの方はこちら</v-btn><br>
            <v-btn block to="/SettingPersonal">個人情報に関するお問い合わせ</v-btn><br>
            <v-btn block to="/SettingContact">お問い合わせ履歴</v-btn><br>
            <v-btn block to="/SettingService">利用規約</v-btn><br>
            <v-divider></v-divider>
            <v-switch :label="`Dark Theme`" v-model="theme" ></v-switch>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import {signOut} from '@/utils/auth.js'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      theme: false
    };
  },
  methods: {
    signOut() {
      signOut().then((data) => console.log('DONE', data)).catch((err) => console.log('SIGN OUT ERR', err));
    }
  },
  watch: {
    theme() {
      this.$vuetify.theme.dark = this.theme
    }
  }
}
</script>