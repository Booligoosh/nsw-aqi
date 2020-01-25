import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import VueGtag from "vue-gtag";
if (process.env.NODE_ENV === "production") {
  Vue.use(VueGtag, {
    config: { id: "UA-103555680-10" }
  });
}

import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faInfoCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
