import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  config: { id: "UA-103555680-10" }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
