import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
const vuexPersist = new VuexPersist({
  key: "vuex",
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    loadingAqiData: false,
    aqiData: {},
    siteName: null,
    lastUpdated: ``
  },
  mutations: {
    setLoadingStatus(state, loading) {
      state.loadingAqiData = loading;
    },
    setAqiData(state, aqiData) {
      state.aqiData = aqiData;
    },
    setSiteName(state, siteName) {
      state.siteName = siteName;
    },
    setLastUpdated(state, lastUpdated) {
      state.lastUpdated = lastUpdated;
    }
  },
  getters: {
    aqi(state, getters) {
      return state.aqiData[getters.siteName];
    },
    siteName(state) {
      if (state.siteName) {
        return state.siteName;
      } else {
        return Object.keys(state.aqiData)[0];
      }
    },
    siteNames(state) {
      return Object.keys(state.aqiData);
    },
    lastUpdated(state) {
      return state.lastUpdated;
    }
  },
  actions: {
    async getAqiData({ commit }) {
      commit(`setLoadingStatus`, true);
      const html = await fetch(
        `https://cors-anywhere.herokuapp.com/https://airquality.environment.nsw.gov.au/aquisnetnswphp/getPage.php?reportid=1`
      ).then(r => r.text());
      // console.log({ html });
      const scrapedDOM = new DOMParser().parseFromString(html, `text/html`);
      // console.log(scrapedDOM);

      const siteTds = scrapedDOM.querySelectorAll(`table td.site`);
      // console.log(siteTds);

      const aqiData = {};
      siteTds.forEach(siteTd => {
        const siteName = siteTd.innerHTML;
        // console.log(siteName);
        const siteAqiTd = siteTd.parentElement.querySelector(`td:last-child`);
        const siteAqi = siteAqiTd.innerText.trim();
        if (siteAqi) {
          aqiData[siteName] = Number(siteAqi);
        }
      });

      const dateTd = scrapedDOM.querySelector(`td.date`);
      const lastUpdatedRegEx = /- *(.+?[ap]m) *\(/g;
      const lastUpdatedRegExResult = lastUpdatedRegEx.exec(dateTd.innerText);
      const lastUpdated = (lastUpdatedRegExResult[1] || `???`).replace(
        / /g,
        ``
      );

      commit(`setLoadingStatus`, false);
      commit(`setLastUpdated`, lastUpdated);
      commit(`setAqiData`, aqiData);
    }
  },
  modules: {}
});
