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
    },
    aqiRange(state, getters) {
      const aqi = getters.aqi;
      if (aqi <= 33) {
        return {
          name: `Very good`,
          color: `hsl(194, 65%, 51%)`,
          explanation: `No health impacts are expected when air quality is in this range.`
        };
      } else if (aqi <= 66) {
        return {
          name: `Good`,
          color: `hsl(83, 38%, 56%)`,
          explanation: `No health impacts are expected when air quality is in this range.`
        };
      } else if (aqi <= 99) {
        return {
          name: `Fair`,
          color: `hsl(47, 100%, 61%)`,
          explanation: `Unusually sensitive people should consider reducing prolonged or heavy outdoor exertion.`
        };
      } else if (aqi <= 149) {
        return {
          name: `Poor`,
          color: `hsl(21, 82%, 58%)`,
          explanation: `People with heart or lung disease should limit  exercising outdoors.`
        };
      } else if (aqi <= 199) {
        return {
          name: `Very poor`,
          color: `hsl(338, 45%, 32%)`,
          explanation: `People with heart or lung disease, older adults, and  children should avoid exercising outdoors. Everyone else should reduce prolonged or heavy exertion. If you have symptoms rest and use your reliever medicine. If symptoms persist, seek medical advice.`
        };
      } else {
        return {
          name: `Hazardous`,
          color: `hsl(9, 63%, 50%)`,
          explanation: `Everyone, especially people with heart or lung disease should avoid outdoor exertion and stay inside as much as possible. If you have symptoms rest and use your reliever medicine. If symptoms persist, seek medical advice.`
        };
      }
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
        const potentialSiteAqiTds = siteTd.parentElement.querySelectorAll(
          `td[class^=i]:not(:empty)`
        );
        const siteAqiTd =
          potentialSiteAqiTds.length > 0
            ? potentialSiteAqiTds[potentialSiteAqiTds.length - 1]
            : { innerText: `` };
        const siteAqi = siteAqiTd.innerText.trim();
        if (siteAqi) {
          aqiData[siteName] = Number(siteAqi);
        } else {
          aqiData[siteName] = null;
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
