import { Point } from "./Point";

export class Constants {
  static readonly BLOCK_SIZE = 40;
  static readonly NAMES: string[] = ["T", "I", "O", "L", "J", "S", "Z"];
  static readonly COLORS: { [index: string]: string } = {
    T: "138, 43, 226", //"blueviolet", //#8A2BE2
    I: "0, 255, 255", //"cyan", #00FFFF
    L: "0, 0, 255", //"blue",	#0000FF
    J: "255, 165, 0", //"orange", #FFA500
    O: "255, 255, 0", //"yellow", #FFFF00
    S: "0, 255, 0", //"lime", #00FF00
    Z: "255, 0, 0", //"red", #FF0000
  };
  static readonly SHAPE: { [index: string]: Point[] } = {
    T: [new Point(0, 0), new Point(0, -1), new Point(-1, 0), new Point(1, 0)],
    I: [new Point(0, 0), new Point(-1, 0), new Point(1, 0), new Point(2, 0)],
    L: [new Point(0, 0), new Point(-1, 0), new Point(1, 0), new Point(1, -1)],
    J: [new Point(0, 0), new Point(-1, -1), new Point(-1, 0), new Point(1, 0)],
    O: [new Point(0, 0), new Point(1, 0), new Point(0, -1), new Point(1, -1)],
    S: [new Point(0, 0), new Point(-1, 0), new Point(0, -1), new Point(1, -1)],
    Z: [new Point(0, 0), new Point(-1, -1), new Point(0, -1), new Point(1, 0)],
  };
}
export default Constants;
