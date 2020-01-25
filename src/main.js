import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
