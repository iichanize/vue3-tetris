<template>
  <div id="app" :style="appStyle" :class="{ 'is-mobile': isMobile }">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Constants from "./domain/Constants";

export default defineComponent({
  name: "App",
  provide() {
    return {
      isMobile: computed(() => this.isMobile),
    };
  },
  components: {},
  data() {
    return {
      scale: 1,
      isMobile: false,
    };
  },
  computed: {
    appStyle(): Record<string, string> {
      const width = this.isMobile
        ? Constants.VIRTUAL_WIDTH_SP
        : Constants.VIRTUAL_WIDTH_PC;
      const height = this.isMobile
        ? Constants.VIRTUAL_HEIGHT_SP
        : Constants.VIRTUAL_HEIGHT_PC;

      if (this.isMobile) {
        return {
          transform: `scale(${this.scale})`,
          transformOrigin: "top left",
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          top: "0",
          left: "0",
        };
      }

      return {
        transform: `scale(${this.scale})`,
        transformOrigin: "top center",
        width: `${width}px`,
        height: `${height}px`,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: `${(-height * this.scale) / 2}px`,
        marginLeft: `${(-width * this.scale) / 2}px`,
      };
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Determine mobile mode based on aspect ratio or width
      // Simple logic: if width < height or width < 768, treat as mobile
      this.isMobile = windowWidth < 768 || windowWidth < windowHeight;

      const targetWidth = this.isMobile
        ? Constants.VIRTUAL_WIDTH_SP
        : Constants.VIRTUAL_WIDTH_PC;
      const targetHeight = this.isMobile
        ? Constants.VIRTUAL_HEIGHT_SP
        : Constants.VIRTUAL_HEIGHT_PC;

      const widthRatio = windowWidth / targetWidth;
      const heightRatio = windowHeight / targetHeight;

      // Fit to screen (contain)
      this.scale = Math.min(widthRatio, heightRatio);
    },
  },
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
  touch-action: none;
  user-select: none;
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
