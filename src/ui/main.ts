import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports"
import './assets/css/main.css'

Amplify.configure(awsconfig)

Vue.config.productionTip = false;

import { getModule } from "vuex-module-decorators";
import AuthStore from "@/ui/store/modules/auth/authStore";

const authModule = getModule(AuthStore, store);
authModule.init().then(() => {
    const app = new Vue({
      router,
      store,
      render: (h) => h(App),
    })
    app.$mount("#app")
  })

  .catch((e) => {
    console.error(`Can't init application`);
    console.error(e);
  });



