<template>
  <div class="PlayBoardLayerRoot" :class="{ 'mobile-layout': isMobile }">
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
import { defineComponent, reactive, ref, inject, watchEffect, Ref } from "vue";
import { Block } from "./Block";
import { useAnimationFrame } from "../core/useAnimationFrame";
import { MinoModel } from "../domain/MinoModel";
import Constants from "../domain/Constants";
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
  emits: {
    ending: (_value: boolean) => true,
    score: (_value: number) => true,
  },
  setup(props, ctx) {
    const isMobile = inject("isMobile") as Ref<boolean>; // Type casting for ease, properly should be Ref<boolean>
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

    let baseX1 = ref(0);
    let baseX2 = ref(0); // Right wall

    // Calculate base position based on layout mode
    const updateBasePosition = () => {
      const mobile = isMobile.value;
      const vWidth = mobile
        ? Constants.VIRTUAL_WIDTH_SP
        : Constants.VIRTUAL_WIDTH_PC;

      // Field Width (10 blocks) + Walls (2 blocks) = 12 blocks * 40 = 480px ?
      // No, Wall is drawn at baseX1. Field starts inside.
      // Wall Left (baseX1), Wall Right (baseX2).
      // Between walls: 10 blocks (400px).
      // Wall thickness: MinoModel size is 40px block.
      // So Wall Left is x, Wall Right is x + 11 blocks (440px).
      // Field is from x + 40 to x + 440.

      let startX = 0;
      if (mobile) {
        // Center-Left Align on Mobile
        startX = vWidth / 2 - 170;
      } else {
        // Center Align on PC
        startX = Math.floor(0.5 * vWidth) - 6 * Constants.BLOCK_SIZE;
      }
      baseX1.value = startX;
      baseX2.value = startX + 11 * Constants.BLOCK_SIZE;

      // We need to clear and rebuild walls when resizing?
      // existing wallList is reactive. We can just clear and rebuild or resize.
      // The original code used `resize` method on MinoModel.
      // But here we are changing base completely. It's cleaner to reset wallList.
      stageState.wallList = [];
      buildWall();
    };
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

    watchEffect(() => {
      updateBasePosition();
    });

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

    // Old adoptMinoPosToWindow logic removed as we use virtual size
    /*
    const adoptMinoPosToWindow = () => {
      const newBaseX1 =
        Math.floor(0.5 * window.innerWidth) - 6 * Constants.BLOCK_SIZE;
      for (let i = 0; i < stageState.wallList.length; i++) {
        stageState.wallList[i].resize(newBaseX1 - baseX1.value);
      }
      baseX1.value = newBaseX1;
    };
    */

    // onMounted(() => {
    //   window.addEventListener("resize", adoptMinoPosToWindow);
    // });

    return {
      baseX1,
      baseX2,
      stageState,
      getMap,
      totalScore,
      updateScore,
      level,
      setLevel,
      isMobile,
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
.mobile-layout .score {
  left: calc(50% - 340px);
  top: 620px;
  font-size: 20px;
}
.mobile-layout .level {
  left: calc(50% - 340px);
  top: 670px;
  font-size: 20px;
}
</style>
