<template>
  <div>
    <h1>Vue Practice</h1>
    <div id="links">
      <div id="tetris">
        <span>Tetris</span>
        <button @click="moveToTetris">PLAY</button>
      </div>
      <div id="ranking">
        <span>Score Ranking</span>
        <button @click="moveToRanking">SHOW</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Top",
  setup() {
    const router = useRouter();
    const moveToTetris = () => {
      return router.replace({ name: "Tetris" });
    };
    const moveToRanking = () => {
      return router.replace({ name: "Ranking" });
    };

    return {
      moveToTetris,
      moveToRanking,
    };
  },
});
</script>
<style scoped lang="scss">
table {
  color: cornsilk;
  background-color: rgb(25, 92, 75);
  font-size: 25px;
  border-collapse: collapse;
  th {
    background-color: rgb(67, 144, 70);
  }
  th,
  td,
  tr {
    padding: 0.5rem 1rem;
    text-align: center;
    border-color: cornsilk;
    border: solid 1.5px;
  }
}
#links {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  font-size: 25px;
  color: cornsilk;
  #tetris,
  #ranking {
    align-items: center;
    display: flex;
    flex-direction: column;
    button {
      margin-top: 1rem;
      width: 5rem;
      cursor: pointer;
      color: cornsilk;
      background-color: rgb(67, 144, 70);
      border-color: rgb(67, 144, 70);
      cursor: pointer;
      font-weight: 200;
      padding: 0.375rem 0.75rem;
      font-size: 20px;
      line-height: 1.5;
      border-radius: 0.25rem;
      border: 1px solid transparent;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      &:focus {
        box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
        outline: 0;
      }
    }
  }
}
</style>
