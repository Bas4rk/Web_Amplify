<template>
  <div class="search">
    <v-row justify="center">
      <v-col cols="5">
          <v-text-field
            v-model="message"
            label="検索キーワードを入力してください。"
            type="text"
          >
          <template v-slot:append-outer>
            <v-btn color="primary">検索</v-btn>
          </template>
          </v-text-field>


              <v-card >
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        v-bind:src="imgUrl"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
  
        <v-toolbar-title>Title</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-spacer></v-spacer>
            <v-tab v-on:click="imgUrl='../assets/つぶやき.jpg'">つぶやき</v-tab>
            <v-spacer></v-spacer>
            <v-tab v-on:click="imgUrl='../assets/料理.jpg'">料理</v-tab>
            <v-spacer></v-spacer>
            <v-tab v-on:click="imgUrl='../assets/筋トレ.jpg'">筋トレ</v-tab>
            <v-spacer></v-spacer>
          </v-tabs>
        </template>
      </v-app-bar>
    </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    imgUrl: "../assets/筋トレ.jpg"
  })
}
</script>