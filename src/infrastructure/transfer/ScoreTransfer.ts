import Score from "../../domain/Score";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VUE_APP_SUPABASE_URL
  ? process.env.VUE_APP_SUPABASE_URL
  : "https://example.supabase.co";
const SUPABASE_API_KEY = process.env.VUE_APP_SUPABASE_API_KEY
  ? process.env.VUE_APP_SUPABASE_API_KEY
  : "dummy-key";
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default class ScoreTransfer {
  public async registerScore(name: string, score: number) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    let userId = session?.user?.id;

    if (!userId) {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInAnonymously();
      if (error) {
        throw error;
      }
      userId = user?.id;
    }

    const data = {
      name: name,
      score: score,
      user_id: userId,
    };
    const response = await supabase.from("usr_score").insert([data]);
    return response.data;
  }

  public async selectScore(): Promise<Score[]> {
    const res = await supabase
      .from("usr_score")
      .select("name, score")
      .limit(10)
      .order("score", {
        ascending: false,
      });
    const response: Score[] = new Array(0);
    const data = res.data;
    if (data == null) {
      return [];
    }
    for (let i = 0; i < data.length; i++) {
      response.push(new Score(data[i].name, data[i].score));
    }
    return response;
  }
}
