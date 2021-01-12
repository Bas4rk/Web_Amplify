import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import setting from './view/setting'
import "@aws-amplify/ui-vue";
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
import vuetify from './plugins/vuetify';
import VueCroppie from  'vue-croppie';
import 'croppie/croppie.css'
Amplify.configure(awsconfig)

Vue.use(VueCroppie,AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')