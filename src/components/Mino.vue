<template>
  <!-- ミノ(フィールド内、ゴースト、ホールド欄、NEXT欄)表示レイヤー -->
  <div class="MinoLayerRoot">
    <Block
      v-for="block in stageState.ghost"
      :key="block.id"
      class="BlockElement"
      :x="block.position.x"
      :y="block.position.y"
      :angle="block.angle"
      :color="block.color"
      :scale="block.scale"
    />
    <Block
      v-for="blockProps in stageState.minoList"
      :key="blockProps.id"
      class="BlockElement"
      :x="blockProps.position.x"
      :y="blockProps.position.y"
      :angle="blockProps.angle"
      :color="blockProps.color"
      :scale="blockProps.scale"
    />
    <Block
      v-for="block in stageState.holdMino"
      :key="block.id"
      class="BlockElement"
      :x="block.position.x"
      :y="block.position.y"
      :angle="block.angle"
      :color="block.color"
      :scale="block.scale"
    />

    <Block
      v-for="block in stageState.stock"
      :key="block.id"
      class="BlockElement"
      :x="block.position.x"
      :y="block.position.y"
      :angle="block.angle"
      :color="block.color"
      :scale="block.scale"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { Block } from "./Block";
import { Point } from "../core/Point";
import { useAnimationFrame } from "../core/useAnimationFrame";
import { MinoModel } from "../core/MinoModel";
import Constants from "../core/Constants";
import { useKeyDown } from "../core/useKeyEvent";

/**
 * ミノレイヤーの状態を管理する型
 */
type StageState = {
  minoList: MinoModel[];
  map: number[][];
  t: number;
  healthCheckTime: number;
  name: string[];
  holdMino: MinoModel[];
  stock: MinoModel[];
  ghost: MinoModel[];
  totalScore: number;
  ren: number;
  deleteLineNum: number;
  level: number;
};

export default defineComponent({
  name: "MinoLayer",
  components: { Block },
  props: {
    keyInput: { type: String, default: "" },
  },
  setup(props, ctx) {
    // state: レイヤーの状態
    // const { keyInput } = toRefs(props);
    let keyInput = ref("");
    const stageState = reactive<StageState>({
      minoList: [],
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
      t: 0,
      healthCheckTime: 0,
      name: JSON.parse(JSON.stringify(Constants.NAMES)),
      holdMino: [],
      stock: [],
      ghost: [],
      totalScore: 0,
      ren: 0,
      deleteLineNum: 0,
      level: 1,
    });
    let forceRefresh = false;
    let canHold = true;
    let baseX = ref(
      Math.floor(0.5 * window.innerWidth) - 5 * Constants.BLOCK_SIZE
    );
    let baseY = 2 * Constants.BLOCK_SIZE;
    const record = () => {
      stageState.map = JSON.parse(
        JSON.stringify(new Array(22).fill(new Array(10).fill(0)))
      );
      stageState.minoList.map((mino) => {
        stageState.map[(mino.position.y - baseY) / Constants.BLOCK_SIZE + 2][
          (mino.position.x - baseX.value) / Constants.BLOCK_SIZE
        ] = 1;
      });
    };
    const refill_mino_name = () => {
      stageState.name.push("T");
      stageState.name.push("I");
      stageState.name.push("O");
      stageState.name.push("L");
      stageState.name.push("J");
      stageState.name.push("S");
      stageState.name.push("Z");
    };
    const minoNamePopper = () => {
      let t: number = Math.floor(Math.random() * stageState.name.length);
      if (stageState.name.length === 0) {
        refill_mino_name();
      }
      const res = stageState.name[t];
      stageState.name.splice(t, 1);
      return res;
    };
    const drawMino = () => {
      let x = baseX.value + 14 * Constants.BLOCK_SIZE;
      let y = 20 * Constants.BLOCK_SIZE;
      const name = minoNamePopper();
      const color = Constants.COLORS[name];
      const shape = JSON.parse(JSON.stringify(Constants.SHAPE[name]));
      for (let i = 0; i < shape.length; i++) {
        stageState.stock.push(
          new MinoModel(
            x + shape[i].x * Constants.BLOCK_SIZE,
            y + shape[i].y * Constants.BLOCK_SIZE,
            name,
            color,
            shape
          )
        );
      }
    };
    const hold = () => {
      const x = baseX.value - 5 * Constants.BLOCK_SIZE;
      const y = baseY + 3 * Constants.BLOCK_SIZE;
      for (let i = 0; i < 4; i++) {
        let length = stageState.minoList.length;
        const temp = stageState.minoList[length - 1];
        const name = JSON.parse(JSON.stringify(temp.name));
        const color = Constants.COLORS[name];
        const shape = JSON.parse(JSON.stringify(Constants.SHAPE[name]));
        stageState.holdMino.push(
          new MinoModel(
            x + shape[i].x * Constants.BLOCK_SIZE,
            y + shape[i].y * Constants.BLOCK_SIZE,
            name,
            color,
            shape
          )
        );
        stageState.minoList.splice(length - 1, 1);
      }
      if (stageState.holdMino.length !== 4) {
        const temp = stageState.holdMino[0];
        let x = baseX.value + 4 * Constants.BLOCK_SIZE;
        let y = 1 * Constants.BLOCK_SIZE;
        const name = JSON.parse(JSON.stringify(temp.name));
        const color = Constants.COLORS[name];
        const shape = JSON.parse(JSON.stringify(Constants.SHAPE[name]));
        for (let i = 0; i < 4; i++) {
          stageState.minoList.push(
            new MinoModel(
              x + shape[i].x * Constants.BLOCK_SIZE,
              y + shape[i].y * Constants.BLOCK_SIZE,
              name,
              color,
              shape
            )
          );
          stageState.holdMino.shift();
        }
      } else {
        shiftStock();
        alignStock();
      }
    };

    const shiftStock = () => {
      let x = baseX.value + 4 * Constants.BLOCK_SIZE;
      let y = 1 * Constants.BLOCK_SIZE;
      let name = stageState.stock[0].name;
      const shape = JSON.parse(JSON.stringify(Constants.SHAPE[name]));
      const color = Constants.COLORS[name];
      drawMino();
      for (let i = 0; i < shape.length; i++) {
        stageState.minoList.push(
          new MinoModel(
            x + shape[i].x * Constants.BLOCK_SIZE,
            y + shape[i].y * Constants.BLOCK_SIZE,
            name,
            color,
            shape
          )
        );
        stageState.stock.shift();
      }
    };

    const alignStock = () => {
      stageState.stock.map((mino, index) => {
        mino.position = new Point(
          mino.position.x,
          (4 +
            Constants.SHAPE[mino.name][index % 4].y +
            Math.floor(index / 4) * 3) *
            Constants.BLOCK_SIZE
        );
      });
    };

    const isBottom = (minoList: MinoModel[]) => {
      let length = minoList.length;
      if (length < 4) return false;
      if (
        minoList[minoList.length - 1].position.y ===
          Constants.BLOCK_SIZE * 21 ||
        minoList[minoList.length - 2].position.y ===
          Constants.BLOCK_SIZE * 21 ||
        minoList[minoList.length - 3].position.y ===
          Constants.BLOCK_SIZE * 21 ||
        minoList[minoList.length - 4].position.y === Constants.BLOCK_SIZE * 21
      )
        return true;
      return false;
    };

    const isCollision = (minoList: MinoModel[]) => {
      let length = minoList.length;
      if (length < 4) return false;
      for (let i = 0; i < 4; i++) {
        if (
          stageState.map[
            (minoList[length - (i + 1)].position.y - baseY) /
              Constants.BLOCK_SIZE +
              3
          ][
            (minoList[length - (i + 1)].position.x - baseX.value) /
              Constants.BLOCK_SIZE
          ] == 1
        )
          return true;
      }
      return false;
    };
    useKeyDown(async (event: KeyboardEvent) => {
      console.log("KEY:", event.key);
      keyInput.value = event.key;
      if (keyInput.value === "ArrowLeft") {
        slideLeft();
        collisionToWall();
        collisionToLeftMino();
        setGhost();
      }
      if (keyInput.value === "ArrowRight") {
        slideRight();
        collisionToWall();
        collisionToRightMino();
        setGhost();
      }
      if (keyInput.value === "ArrowDown") {
        if (
          !isBottom(stageState.minoList) &&
          !isCollision(stageState.minoList)
        ) {
          drop(stageState.minoList);
          stageState.t = 1;
          stageState.totalScore += 5;
          ctx.emit("score", stageState.totalScore);
        }
      }
      if (keyInput.value === "ArrowUp") {
        while (
          !isBottom(stageState.minoList) &&
          !isCollision(stageState.minoList)
        ) {
          drop(stageState.minoList);
          stageState.totalScore += 5;
        }
        ctx.emit("score", stageState.totalScore);
        forceRefresh = true;
      }
      if (keyInput.value === "x") {
        await superRotateRight();
        setGhost();
      }
      if (keyInput.value === "z") {
        await superRotateLeft();
        setGhost();
      }
      if (keyInput.value === "a") {
        if (canHold) {
          hold();
          canHold = false;
          forceRefresh = true;
        }
      }
    });

    const collisionToWall = async () => {
      let counter = 0;
      let length = stageState.minoList.length;
      if (
        stageState.minoList[length - 1].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9 ||
        stageState.minoList[length - 2].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9 ||
        stageState.minoList[length - 3].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9 ||
        stageState.minoList[length - 4].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9
      ) {
        slideLeft();
        counter++;
        collisionToWall();
      }
      if (
        stageState.minoList[length - 1].position.x < baseX.value ||
        stageState.minoList[length - 2].position.x < baseX.value ||
        stageState.minoList[length - 3].position.x < baseX.value ||
        stageState.minoList[length - 4].position.x < baseX.value
      ) {
        slideRight();
        counter++;
        collisionToWall();
      }
      return counter;
    };

    const collisionToLeftMino = async () => {
      let counter = 0;
      const currentPos: Point[] = [
        stageState.minoList[stageState.minoList.length - 4].position,
        stageState.minoList[stageState.minoList.length - 3].position,
        stageState.minoList[stageState.minoList.length - 2].position,
        stageState.minoList[stageState.minoList.length - 1].position,
      ];
      if (
        stageState.map[(currentPos[0].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[0].x - baseX.value) / Constants.BLOCK_SIZE
        ] == 1 ||
        stageState.map[(currentPos[1].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[1].x - baseX.value) / Constants.BLOCK_SIZE
        ] == 1 ||
        stageState.map[(currentPos[2].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[2].x - baseX.value) / Constants.BLOCK_SIZE
        ] == 1 ||
        stageState.map[(currentPos[3].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[3].x - baseX.value) / Constants.BLOCK_SIZE
        ] == 1
      ) {
        slideRight();
        counter++;
        counter += await collisionToLeftMino();
      }
      return counter;
    };
    const collisionToRightMino = async () => {
      let counter = 0;
      const currentPos: Point[] = [
        stageState.minoList[stageState.minoList.length - 4].position,
        stageState.minoList[stageState.minoList.length - 3].position,
        stageState.minoList[stageState.minoList.length - 2].position,
        stageState.minoList[stageState.minoList.length - 1].position,
      ];
      if (
        stageState.map[(currentPos[0].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[0].x - baseX.value) / Constants.BLOCK_SIZE
        ] === 1 ||
        stageState.map[(currentPos[1].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[1].x - baseX.value) / Constants.BLOCK_SIZE
        ] === 1 ||
        stageState.map[(currentPos[2].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[2].x - baseX.value) / Constants.BLOCK_SIZE
        ] === 1 ||
        stageState.map[(currentPos[3].y - baseY) / Constants.BLOCK_SIZE + 2][
          (currentPos[3].x - baseX.value) / Constants.BLOCK_SIZE
        ] === 1
      ) {
        slideLeft();
        counter++;
        counter += await collisionToRightMino();
      }
      return counter;
    };

    const slideLeft = () => {
      let length = stageState.minoList.length;
      for (let i = 0; i < 4; i++)
        stageState.minoList[length - (i + 1)].slideLeft();
    };

    const slideRight = () => {
      let length = stageState.minoList.length;
      for (let i = 0; i < 4; i++)
        stageState.minoList[length - (i + 1)].slideRight();
    };

    const drop = (minoList: MinoModel[]) => {
      let length = minoList.length;
      if (length != 0) {
        for (let i = 0; i < 4; i++) minoList[length - (i + 1)].drop();
      }
    };

    const rotateRight = () => {
      let length = stageState.minoList.length;
      if (stageState.minoList[length - 4].name != "O") {
        for (let i = 0; i < 4; i++) {
          stageState.minoList[length - (4 - i)].position = new Point(
            stageState.minoList[length - 4].position.x -
              stageState.minoList[length - (4 - i)].shape[i].y *
                Constants.BLOCK_SIZE,
            stageState.minoList[length - 4].position.y +
              stageState.minoList[length - (4 - i)].shape[i].x *
                Constants.BLOCK_SIZE
          );
          stageState.minoList[length - (4 - i)].shape[i] = new Point(
            -1 * stageState.minoList[length - (4 - i)].shape[i].y,
            stageState.minoList[length - (4 - i)].shape[i].x
          );
        }
      }
    };
    const rotateLeft = () => {
      let length = stageState.minoList.length;
      if (stageState.minoList[length - 4].name != "O") {
        for (let i = 1; i < 4; i++) {
          stageState.minoList[length - (4 - i)].position = new Point(
            stageState.minoList[length - 4].position.x +
              stageState.minoList[length - (4 - i)].shape[i].y *
                Constants.BLOCK_SIZE,
            stageState.minoList[length - 4].position.y -
              stageState.minoList[length - (4 - i)].shape[i].x *
                Constants.BLOCK_SIZE
          );
          stageState.minoList[length - (4 - i)].shape[i] = new Point(
            stageState.minoList[length - (4 - i)].shape[i].y,
            -1 * stageState.minoList[length - (4 - i)].shape[i].x
          );
        }
      }
    };

    const resetPosition = (lastPos: Point[], lastShape: Point[]) => {
      let length = stageState.minoList.length;
      for (let i = 0; i < 4; i++) {
        stageState.minoList[length - (4 - i)].position = lastPos[i];
        stageState.minoList[length - (4 - i)].shape[i] = lastShape[i];
      }
    };

    const isI = (name: string) => {
      return name === "I" ? true : false;
    };

    const resetRotate = (
      counterW: number,
      counterM: number,
      lastPos: Point[],
      lastShape: Point[]
    ) => {
      let length = stageState.minoList.length;
      if (
        (isI(stageState.minoList[length - 4].name)
          ? counterM > 2
          : counterM > 1) ||
        stageState.minoList[length - 1].position.x < baseX.value ||
        stageState.minoList[length - 2].position.x < baseX.value ||
        stageState.minoList[length - 3].position.x < baseX.value ||
        stageState.minoList[length - 4].position.x < baseX.value ||
        stageState.minoList[length - 1].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9 ||
        stageState.minoList[length - 2].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9 ||
        stageState.minoList[length - 3].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9 ||
        stageState.minoList[length - 4].position.x >
          baseX.value + Constants.BLOCK_SIZE * 9
      ) {
        resetPosition(lastPos, lastShape);
        return true;
      }
      return false;
    };

    const superRotateRight = async () => {
      const length = stageState.minoList.length;
      let lastPos = [
        stageState.minoList[length - 4].position,
        stageState.minoList[length - 3].position,
        stageState.minoList[length - 2].position,
        stageState.minoList[length - 1].position,
      ];
      let lastShape: Point[] = [
        stageState.minoList[length - 4].shape[0],
        stageState.minoList[length - 3].shape[1],
        stageState.minoList[length - 2].shape[2],
        stageState.minoList[length - 1].shape[3],
      ];
      rotateRight();
      if (isBottom(stageState.minoList)) {
        resetPosition(lastPos, lastShape);
        return;
      }
      const counterW = await collisionToWall();
      let counterL = await collisionToLeftMino();
      if (resetRotate(counterW, counterL, lastPos, lastShape)) rotateRight();
      const counterR = await collisionToRightMino();
      resetRotate(counterW, counterR, lastPos, lastShape);
    };

    const superRotateLeft = async () => {
      const length = stageState.minoList.length;
      let lastPos = [
        stageState.minoList[length - 4].position,
        stageState.minoList[length - 3].position,
        stageState.minoList[length - 2].position,
        stageState.minoList[length - 1].position,
      ];
      let lastShape: Point[] = [
        stageState.minoList[length - 4].shape[0],
        stageState.minoList[length - 3].shape[1],
        stageState.minoList[length - 2].shape[2],
        stageState.minoList[length - 1].shape[3],
      ];
      rotateLeft();
      if (isBottom(stageState.minoList)) {
        resetPosition(lastPos, lastShape);
        return;
      }
      const counterW = await collisionToWall();
      let counterR = await collisionToRightMino();
      if (resetRotate(counterW, counterR, lastPos, lastShape)) rotateLeft();
      const counterL = await collisionToLeftMino();
      resetRotate(counterW, counterL, lastPos, lastShape);
    };

    const deleteLine = () => {
      let score_counter = 0;
      let isFillLine = false;
      for (let i = 2; i < stageState.map.length; i++) {
        let sum = 0;
        for (let j = 0; j < stageState.map[i].length; j++)
          sum += stageState.map[i][j];
        if (sum === 10) {
          stageState.deleteLineNum++;
          score_counter++;
          isFillLine = true;
          for (let k = stageState.minoList.length - 1; k >= 0; k--) {
            let y = stageState.minoList[k].position.y;
            let deleteLine = baseY + (i - 2) * Constants.BLOCK_SIZE;
            if (y === deleteLine) {
              stageState.minoList.splice(k, 1);
            } else if (y < deleteLine) {
              stageState.minoList[k].drop();
            }
          }
          record();
          if (
            stageState.deleteLineNum % 10 === 0 &&
            Math.ceil(stageState.deleteLineNum / 10) < 30
          )
            stageState.level = Math.ceil(stageState.deleteLineNum / 10) + 1;
        }
      }
      if (!isFillLine) stageState.ren = 0;
      else stageState.ren++;
      stageState.totalScore += score_counter * score_counter * 100;
      stageState.totalScore +=
        score_counter * score_counter * stageState.ren * 20;
      score_counter = 0;
    };

    const setGhost = () => {
      const length = stageState.minoList.length;
      stageState.ghost = JSON.parse(JSON.stringify([]));
      for (let i = 0; i < 4; i++) {
        let x = stageState.minoList[length - (i + 1)].position.x;
        let y = stageState.minoList[length - (i + 1)].position.y;
        const name = stageState.minoList[length - (i + 1)].name;
        const shape = JSON.parse(
          JSON.stringify(stageState.minoList[length - (i + 1)].shape)
        );
        const color = Constants.COLORS[name];
        const opacity = "0.3";
        stageState.ghost.push(new MinoModel(x, y, name, color, shape, opacity));
      }
      while (!isBottom(stageState.ghost) && !isCollision(stageState.ghost))
        drop(stageState.ghost);
    };

    ///////////////////////////初期ミノセット
    for (let i = 0; i < 4; i++) drawMino();
    shiftStock();
    alignStock();
    setGhost();
    //////////////////////////////////////
    // 描画フレームごとに呼ばれる処理
    useAnimationFrame(() => {
      if (stageState.map[1][4] === 1) {
        return false;
      }
      // if (stageState.healthCheckTime % 2000 === 0) {
      //   scoreTransfer.healthCheck();
      //   stageState.healthCheckTime = 0;
      // }
      if (
        stageState.t % (52 - Math.floor(1.7 * stageState.level)) === 0 ||
        forceRefresh
      ) {
        if (isBottom(stageState.minoList) || isCollision(stageState.minoList)) {
          record();
          deleteLine();
          console.log("REN", stageState.ren);
          console.log("SCORE", stageState.totalScore);
          mapEmit();
          shiftStock();
          alignStock();
          setGhost();
          canHold = true;
          ctx.emit("score", stageState.totalScore);
        } else {
          drop(stageState.minoList);
          setGhost();
        }
        if (forceRefresh) {
          forceRefresh = false;
          stageState.t = 0;
        }
      }
      stageState.t++;
      stageState.healthCheckTime++;
      return true;
    });

    const mapEmit = () => {
      ctx.emit("map", stageState.map);
      ctx.emit("level", stageState.level);
    };

    const adoptMinoPosToWindow = () => {
      const newBaseX =
        Math.floor(0.5 * window.innerWidth) - 5 * Constants.BLOCK_SIZE;
      for (let i = 0; i < stageState.minoList.length; i++) {
        stageState.minoList[i].resize(newBaseX - baseX.value);
      }
      for (let i = 0; i < stageState.holdMino.length; i++) {
        stageState.holdMino[i].resize(newBaseX - baseX.value);
      }
      for (let i = 0; i < stageState.ghost.length; i++) {
        stageState.ghost[i].resize(newBaseX - baseX.value);
      }
      for (let i = 0; i < stageState.stock.length; i++) {
        stageState.stock[i].resize(newBaseX - baseX.value);
      }
      baseX.value = newBaseX;
    };

    onMounted(() => {
      window.addEventListener("resize", adoptMinoPosToWindow);
    });

    return {
      baseX,
      drawMino,
      hold,
      stageState,
      mapEmit,
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
</style>
