import axios from "axios";
import Score from "../../domain/Score";
export default class ScoreTransfer {
  public async sendScore(name: string, score: number) {
    const data = {
      name: name,
      score: score,
    };
    const response = await axios.post(
      "https://tetris-vue-db.herokuapp.com/score/register",
      data
    );
    return response.data;
  }
  public async getRanking(): Promise<Score[]> {
    const response = await axios
      .get("https://tetris-vue-db.herokuapp.com/score/ranking")
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }

  public async healthCheck(): Promise<boolean> {
    const response = await axios
      .get("https://tetris-vue-db.herokuapp.com/score/")
      .catch((error) => {
        return error.response;
      });
    return true;
  }
}
