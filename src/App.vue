<template>
  <div id="app">
    <h1><span class="faded">NSW</span> AQI</h1>
    <div v-if="loading" class="loading">
      Loading&hellip;
    </div>
    <div v-else>
      <v-select
        v-model="siteName"
        :options="$store.getters.siteNames"
        :clearable="false"
        placeholder="Choose an air quality monitoring site"
      />
      <div v-if="aqi === null" class="error-page">
        {{ siteName }} air quality is unavailable at the moment.
      </div>
      <div v-else class="aqi-display">
        <!-- <div class="aqi-sub">Current Air Quality Index (AQI)</div> -->
        <div class="aqi-sub">
          Last updated at {{ $store.getters.lastUpdated }}
        </div>
        <div class="aqi">{{ aqi }}</div>
        <div class="aqi-range" :style="{ color: aqiRange.color }">
          Air quality is {{ aqiRange.name.toLowerCase() }}
        </div>
        <p class="aqi-range-explanation">{{ aqiRange.explanation }}</p>
      </div>
      <a
        class="source"
        href="https://www.dpie.nsw.gov.au/air-quality/current-air-quality"
        target="_blank"
        rel="noopener noreferrer"
        >Source: NSW Government</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.dispatch(`getAqiData`);
  },
  computed: {
    aqi() {
      return this.$store.getters.aqi;
    },
    aqiRange() {
      return this.$store.getters.aqiRange;
    },
    loading() {
      return this.$store.state.loadingAqiData;
    },
    siteName: {
      get() {
        return this.$store.getters.siteName;
      },
      set(value) {
        this.$store.commit("setSiteName", value);
      }
    }
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  font-family: "Product Sans", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  min-height: 100%;
}
#app > div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
h1 {
  text-align: center;
}
.aqi-display {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.aqi {
  font-size: 7rem;
  font-weight: 500;
  line-height: 1em;
}
.aqi-sub {
  text-align: center;
  opacity: 0.7;
}
.faded {
  opacity: 0.5;
}
.loading,
.error-page {
  display: flex;
  flex-grow: 1;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  opacity: 0.8;
}
.loading {
  animation: loading-pulse 1s infinite alternate linear;
}
@keyframes loading-pulse {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.8;
  }
}
.v-select {
  width: 28rem;
  margin: 0 auto;
  max-width: 100%;
}
// .vs__dropdown-menu {
//   box-shadow: none;
// }
.source {
  text-align: center;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-decoration: none;
  color: inherit;
  font-size: 0.8em;
  opacity: 0.3;
  font-weight: 500;
}
.aqi-range {
  font-weight: 500;
  z-index: 1;
  cursor: pointer;
}
.aqi-range-explanation {
  opacity: 0.5;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.9em;
  max-width: 13rem;
}
</style>
