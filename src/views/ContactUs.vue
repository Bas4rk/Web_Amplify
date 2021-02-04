<template>
  <div class="calendar">
    <v-container
      class="py-8 px-6"
      fluid
    > 
    <v-layout justify-center>
      <div class="title">お問い合わせはこちら</div>
    </v-layout>
      <v-row justify="center">

        <v-col cols="5">
          <br>
          <v-text-field
            label="email"
            outlined
          ></v-text-field>
          <v-text-field
            label="name"
            outlined
          ></v-text-field>
          <v-textarea
            outlined
            name="input-7-4"
            label="contents"
          ></v-textarea>

          <v-btn color="primary">送信</v-btn>

            
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: false
    };
  },
  mounted : async function(){
    console.log("err")
  }
}
</script>