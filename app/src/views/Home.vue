<template>
  <div class="home">
    <h1>This is an home page</h1>
    <!-- <HelloWorld></HelloWorld> -->
    <button class="ui primary basic button">Primary</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
