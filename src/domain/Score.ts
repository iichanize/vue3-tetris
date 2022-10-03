export default class Score {
  private name = "";
  private score = 0;
  constructor(public readonly userName: string, public readonly value: number) {
    this.name = userName;
    this.score = value;
  }
}
