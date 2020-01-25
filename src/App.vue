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
      <div class="aqi-display">
        <!-- <div class="aqi-sub">Current Air Quality Index (AQI)</div> -->
        <div class="aqi">{{ $store.getters.aqi }}</div>
        <div class="aqi-sub">
          Last updated at {{ $store.getters.lastUpdated }}
        </div>
      </div>
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
  min-height: 100vh;
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
.loading {
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  opacity: 0.8;
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
</style>
