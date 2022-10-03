<template>
  <h1>Score Ranking TOP 10</h1>
  <div id="ranking">
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" v-bind:key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, index) in ranking" v-bind:key="value.id">
          <th>{{ index + 1 }}</th>
          <td>{{ value.name }}</td>
          <td>{{ value.score }}</td>
        </tr>
      </tbody>
    </table>
    <button id="return" @click="moveToTop">Topへ戻る</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import Score from "../domain/Score";
import ScoreTransfer from "../infrastructure/transfer/ScoreTransfer";
export default defineComponent({
  name: "Ranking",
  setup(_, ctx) {
    const router = useRouter();
    const scoreTransfer = new ScoreTransfer();
    let ranking: Ref<Score[]> = ref([]);
    const headers = ["No.", "名前", "スコア"];

    const getRanking = async () => {
      ranking.value = await scoreTransfer.getRanking();
    };
    const moveToTop = () => {
      return router.replace({ name: "Top" });
    };

    getRanking();
    return {
      ranking,
      headers,
      moveToTop,
    };
  },
});
</script>
<style scoped lang="scss">
#ranking {
  text-align: center;
}
button {
  margin-top: 1rem;
  width: 8rem;
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
table {
  margin: auto;
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
</style>
