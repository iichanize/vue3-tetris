import { Point } from "./Point";
import Constants from "./Constants";

const DEFAULT_FORCE = 0.25;
let instanseCount = 0;

const randomName = () => {
  return Constants.NAMES[Math.floor(Math.random() * 7)];
};

export class MinoModel {
  readonly id = instanseCount++;
  position = new Point(0, 0);
  name = randomName();
  angle = Math.random() * 360;
  vector = new Point();
  force = DEFAULT_FORCE;
  color = "";
  shape: Point[] = [];
  insensitiveTerms = 0;
  constructor(
    x: number,
    y: number,
    name: string,
    color: string,
    shape: Point[],
    opacity?: string
  ) {
    this.position = new Point(x, y);
    this.name = name;
    if (!opacity) this.color = "rgba(" + color + ", 1.0)";
    else this.color = "rgba(" + color + ", " + opacity + ")";
    this.shape = shape;
  }

  update() {
    const vec = new Point(0, Constants.BLOCK_SIZE);
    this.position = this.position.add(vec);
    if (this.position.y > Constants.BLOCK_SIZE * 20) {
      this.position = new Point(this.position.x, Constants.BLOCK_SIZE * 20);
    }
    if (this.position.y < 0) {
      this.position = new Point(this.position.x, 0);
    }
  }
  drop() {
    const vec = new Point(0, Constants.BLOCK_SIZE);
    this.position = this.position.add(vec);
    if (this.position.y > Constants.BLOCK_SIZE * 21) {
      this.position = new Point(this.position.x, Constants.BLOCK_SIZE * 21);
    }
  }

  slideLeft() {
    this.position = new Point(
      this.position.x - Constants.BLOCK_SIZE,
      this.position.y
    );
  }

  slideRight() {
    this.position = new Point(
      this.position.x + Constants.BLOCK_SIZE,
      this.position.y
    );
  }

  slideUp() {
    this.position = new Point(
      this.position.x,
      this.position.y - Constants.BLOCK_SIZE
    );
  }

  setForce(value: number) {
    this.force = value;
  }

  resize(difference: number) {
    this.position = new Point(this.position.x + difference, this.position.y);
  }
}
