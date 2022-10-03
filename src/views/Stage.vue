<template>
  <PlayBoardLayer @ending="ending" @score="resultScore" />
  <div class="arrow">
    <div id="first">↑</div>
    <div id="second">↑</div>
    <div id="third">↑</div>
  </div>
  <div class="holdFrame"></div>
  <div class="title" id="hold">HOLD</div>
  <div class="stockFrame"></div>
  <div class="title" id="stock">NEXT</div>
  <div class="end" v-if="flag">
    <div class="message">
      <div class="header">
        <span> Result </span>
      </div>
      <div class="body" v-if="flag">
        <span>スコア：{{ score }}</span>
        <span
          >ユーザー名：
          <input v-model="userName" />
        </span>
      </div>
      <div class="footer">
        <button id="sendButton" @click="moveToRanking">ランキングへ送信</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import PlayBoardLayer from "../components/PlayBoardLayer.vue";
import ScoreTransfer from "../infrastructure/transfer/ScoreTransfer";

export default defineComponent({
  name: "Stage",
  components: { PlayBoardLayer },
  props: {
    maxFish: { type: Number, default: 50 },
  },
  setup() {
    let flag = ref(false);
    let score = ref(0);
    let userName = ref("");
    const router = useRouter();
    const scoreTransfer = new ScoreTransfer();
    const ending = (end: boolean) => {
      if (end) flag.value = true;
    };
    const resultScore = (result: number) => {
      score.value = result;
    };
    const sendScore = async (name: string, value: number) => {
      return await scoreTransfer.sendScore(name, value);
    };
    const moveToRanking = async () => {
      await sendScore(userName.value, score.value);
      return router.replace({ name: "Ranking" });
    };
    return {
      flag,
      score,
      userName,
      ending,
      resultScore,
      moveToRanking,
    };
  },
});
</script>
<style scoped lang="scss">
.holdFrame {
  width: 240px;
  height: 240px;
  border-style: solid;
  border-color: gray;
  border-radius: 5px;
  border-width: 10px;
  position: absolute;
  top: 80px;
  left: calc(50% - 40 * 13px + 20px);
}
.stockFrame {
  width: 240px;
  height: 520px;
  border-style: solid;
  border-color: gray;
  border-radius: 5px;
  border-width: 10px;
  position: absolute;
  top: 80px;
  left: calc(50% + 40 * 6px + 20px);
}
.title {
  -webkit-text-stroke: 1px #000;
  width: 240px;
  height: 100px;
  position: absolute;
  top: 30px;
  font-size: 40px;
  color: white;
}
.arrow {
  width: 240px;
  height: 100px;
  font-size: 30px;
  font-weight: bold;
  color: white;
  #first {
    position: absolute;
    left: calc(50% + 40 * 6px + 130px);
    top: 200px;
  }
  #second {
    position: absolute;
    left: calc(50% + 40 * 6px + 130px);
    top: 320px;
  }
  #third {
    position: absolute;
    left: calc(50% + 40 * 6px + 130px);
    top: 440px;
  }
}
#stock {
  left: calc(50% + 40 * 6px + 20px);
}
#hold {
  left: calc(50% - 40 * 13px + 20px);
}

.end {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.7);
  margin: 0.75rem 0.5rem;
  z-index: 10;
  button {
    cursor: pointer;
  }
  .message {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: 0;
    min-width: 50%;
    .header {
      display: flex;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
      justify-content: space-between;
      background-color: rgb(67, 144, 70);
      color: cornsilk;
      span {
        line-height: 1.5;
        font-size: 20px;
        font-weight: 500;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      .inputItem {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 1rem;
        span {
          font-size: 15px;
          margin-bottom: 0.1rem;
        }
        select,
        input {
          font-size: 15px;
          padding: 0.25rem;
        }
        select {
          background-color: #fff;
          border: 1px solid #ced4da;
          outline: 0;
        }
      }
      p {
        margin-left: 1rem;
        font-size: 15px;
      }
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 1rem;
      border-top: 1px solid #dee2e6;
      margin-top: 10px;
      button {
        color: #fff;
        background-color: rgb(67, 144, 70);
        border-color: rgb(67, 144, 70);
        cursor: pointer;
        font-weight: 400;
        padding: 0.375rem 0.75rem;
        font-size: 15px;
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
  @media (max-width: 768px) {
    margin: 0.75rem 0;
    .message {
      .subHeader {
        font-size: 10px;
      }
      .url {
        .value {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
