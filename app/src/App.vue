<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("./assets/tailwindcss/dist/tailwind.min.css");
@import url("./assets/fomantic-ui/dist/semantic.min.css");
@import url("./assets/main.scss");
</style>
