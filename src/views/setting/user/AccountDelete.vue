<template>
  
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
      <v-col cols="12" sm="6" md="3" justify="left">
              <v-btn
                class="ma-2"
                color="primary"
                dark
                @click="back"
              >
              <v-icon
                dark
                left
              >
                mdi-arrow-left
              </v-icon>Back</v-btn><br><br>
    </v-col>
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
        >
          アカウント削除<!--ボタン名-->
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">アカウント削除</span> <!--ダイアログタイトル-->
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="削除する理由を教えてください"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="ユーザIDを入力してください"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col 
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {
    data: () => ({
      dialog: false,
    }),
    methods: {
    back: function(){
      this.$router.push('/SettingAccount');
      },
    },
  }
</script>