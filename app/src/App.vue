<template>
  <div
    id="app"
    class="tw-p-8 tw-bg-blue-100 tw-h-full ui segment"
    :style="{ overflow: showLoading ? 'hidden' : 'auto' }"
  >
    <div class="ui grid">
      <div class="sixteen wide column">
        <router-view />
      </div>
    </div>
    <div class="ui active dimmer" v-if="showLoading">
      <div class="ui loader"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  showLoading: boolean = false;
  mounted() {
    (window as any).showLoading = () => {
      this.showLoading = true;
    };
    (window as any).hideLoading = () => {
      this.showLoading = false;
    };
  }
}
</script>

<style lang="scss">
@import url("./assets/tailwindcss/dist/tailwind.min.css");
@import url("./assets/fomantic-ui/dist/semantic.min.css");
@import url("./assets/main.scss");
</style>
