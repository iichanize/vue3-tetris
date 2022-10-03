import { onMounted, onUnmounted } from "vue";

type KeyEventHandler = (ev: KeyboardEvent) => void;

export const useKeyDown = (
  handler: KeyEventHandler,
  targetDom?: HTMLElement
) => {
  const onKeyDown = (ev: KeyboardEvent): void => {
    handler?.(ev);
  };

  onMounted(() => {
    const target = targetDom ?? document.body;
    target.addEventListener("keydown", onKeyDown);
  });
  onUnmounted(() => {
    const target = targetDom ?? document.body;
    target.removeEventListener("keydown", onKeyDown);
  });

  return {};
};
