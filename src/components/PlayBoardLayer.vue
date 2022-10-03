<template>
  <div class="PlayBoardLayerRoot">
    <Block
      v-for="blockProps in stageState.wallList"
      :key="blockProps.id"
      class="BlockElement"
      :x="blockProps.position.x"
      :y="blockProps.position.y"
      :angle="blockProps.angle"
      :color="blockProps.color"
    />
    <MinoLayer @map="getMap" @score="updateScore" @level="setLevel" />
  </div>
  <div class="level">Lv.{{ level }}</div>
  <div class="score">SCORE<br />{{ totalScore }}</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Block } from "./Block";
import { useAnimationFrame } from "../core/useAnimationFrame";
import { MinoModel } from "../core/MinoModel";
import Constants from "../core/Constants";
import MinoLayer from "./Mino.vue";

/**
 * レイヤーの状態を管理する型
 */
type StageState = {
  map: number[][];
  wallList: MinoModel[];
  t: number;
};

export default defineComponent({
  name: "PlayBoardLayer",
  components: { Block, MinoLayer },
  props: {},
  setup(props, ctx) {
    // state: レイヤーの状態
    const stageState = reactive<StageState>({
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      wallList: [],
      t: 0,
    });
    const getMap = (map: number[][]) => {
      stageState.map = map;
    };
    let baseX1 = ref(
      Math.floor(0.5 * window.innerWidth) - 6 * Constants.BLOCK_SIZE
    );
    let baseX2 = ref(
      Math.floor(0.5 * window.innerWidth) + 5 * Constants.BLOCK_SIZE
    );
    const buildWall = () => {
      let y1 = 2 * Constants.BLOCK_SIZE;
      let y2 = 22 * Constants.BLOCK_SIZE;
      let j = 0;
      for (let i = 0; i < 21; i++) {
        stageState.wallList.push(
          new MinoModel(
            baseX1.value,
            y1 + i * Constants.BLOCK_SIZE,
            "wall",
            "128,128,128",
            []
          )
        );
        stageState.wallList.push(
          new MinoModel(
            baseX2.value,
            y1 + i * Constants.BLOCK_SIZE,
            "wall",
            "128,128,128",
            []
          )
        );
        if (j < 10) {
          stageState.wallList.push(
            new MinoModel(
              baseX1.value + (j + 1) * Constants.BLOCK_SIZE,
              y2,
              "wall",
              "128, 128, 128",
              []
            )
          );
          j++;
        }
      }
    };

    let totalScore = ref(0);

    const updateScore = (score: number) => {
      totalScore.value = score;
    };

    let level = ref(1);

    const setLevel = (lv: number) => {
      level.value = lv;
    };

    // 描画フレームごとに呼ばれる処理。
    buildWall();
    console.log("Game Start");
    useAnimationFrame(() => {
      if (stageState.map[1][4] === 1) {
        console.log("Game Over");
        ctx.emit("ending", true);
        ctx.emit("score", totalScore.value);
        return false;
      }
      // trueを返すとunmountまでの間繰り返し呼ばれる
      return true;
    });

    const adoptMinoPosToWindow = () => {
      const newBaseX1 =
        Math.floor(0.5 * window.innerWidth) - 6 * Constants.BLOCK_SIZE;
      for (let i = 0; i < stageState.wallList.length; i++) {
        stageState.wallList[i].resize(newBaseX1 - baseX1.value);
      }
      baseX1.value = newBaseX1;
    };

    onMounted(() => {
      window.addEventListener("resize", adoptMinoPosToWindow);
    });

    return {
      baseX1,
      baseX2,
      stageState,
      getMap,
      totalScore,
      updateScore,
      level,
      setLevel,
    };
  },
});
</script>

<style scoped lang="scss">
.PlayBoardLayerRoot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.BlockElement {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background-color: currentColor;
  border-style: solid;
  border-top-color: rgba(200, 200, 200, 0.2);
  border-left-color: rgba(200, 200, 200, 0.3);
  border-right-color: rgba(100, 100, 100, 0.4);
  border-bottom-color: rgba(100, 100, 100, 0.5);
  border-width: 7px;
  border-radius: 5px;
  // opacity: 0.7;
  will-change: transform;
  pointer-events: none;
}
.score {
  position: absolute;
  top: calc(21 * 40px);
  left: calc(50% - 40 * 11px);
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  -webkit-text-stroke: 1px #000;
}
.level {
  position: absolute;
  top: calc(19.5 * 40px);
  left: calc(50% - 40 * 11px);
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  -webkit-text-stroke: 1px #000;
}
</style>
