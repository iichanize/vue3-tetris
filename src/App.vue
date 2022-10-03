<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  height: 100%;
  background-color: rgb(31, 36, 43);
  color: rgb(80, 110, 124);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  overflow: hidden;
}
button {
  display: inline-block;
  border: 2px solid rgb(80, 110, 124);
  color: rgb(80, 110, 124);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding: 2px 5px;
  background-color: transparent;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
}
.Control {
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 5px;
  background-color: #00000066;
}
</style>
