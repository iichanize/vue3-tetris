// ブロックのDOMを表示するためのコンポーネントです。
// Vueとして状態を管理する必要がないので関数コンポーネントにしています。

import { h, FunctionalComponent } from "vue";
import { Point } from "../domain/Point";

type Props = {
  x: number;
  y: number;
  angle: number;
  color: string;
  shape?: Point[]; // Optional if not used? Wait, original code had shape.
  scale?: number;
};

export const Block: FunctionalComponent<Props> = (props) => {
  const scale = props.scale || 1;
  const style = `color: ${props.color};transform: translate(${props.x}px, ${props.y}px) scale(${scale});`;
  return h("div", { class: "BlockRoot", style });
};
