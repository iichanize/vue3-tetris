// ブロックのDOMを表示するためのコンポーネントです。
// Vueとして状態を管理する必要がないので関数コンポーネントにしています。

import { h } from "vue";
import { Point } from "../domain/Point";

type Props = {
  x: number;
  y: number;
  angle: number;
  color: string;
  shape: Point[];
  scale: number;
};

export const Block = (props: Props) => {
  const style = `color: ${props.color};transform: translate(${props.x}px, ${props.y}px);`;
  return h("div", { class: "BlockRoot", style });
};
