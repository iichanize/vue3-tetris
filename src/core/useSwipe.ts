import { onMounted, onUnmounted } from "vue";

export type SwipeDirection = "left" | "right" | "up" | "down" | "none";

interface SwipeOptions {
  threshold?: number;
  tapThreshold?: number; // Time in ms to consider a tap
  targetDom?: HTMLElement;
}

interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
}

export const useSwipe = (
  callbacks: SwipeCallbacks,
  options: SwipeOptions = {}
) => {
  const { threshold = 30, tapThreshold = 200, targetDom } = options;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let isSwiping = false;
  let isTouchDetected = false;

  const onTouchStart = (e: TouchEvent) => {
    isTouchDetected = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    isSwiping = true;
  };

  const onTouchMove = () => {
    if (!isSwiping) return;
    // Prevent default scrolling behavior if needed, but might interfere with UI
    // e.preventDefault();
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!isSwiping) return;
    isSwiping = false;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    const duration = Date.now() - startTime;

    // Tap detection
    if (absX < 10 && absY < 10 && duration < tapThreshold) {
      callbacks.onTap?.();
      return;
    }

    // Swipe detection
    if (Math.max(absX, absY) > threshold) {
      if (absX > absY) {
        if (diffX > 0) {
          callbacks.onSwipeRight?.();
        } else {
          callbacks.onSwipeLeft?.();
        }
      } else {
        if (diffY > 0) {
          callbacks.onSwipeDown?.();
        } else {
          callbacks.onSwipeUp?.();
        }
      }
    }
  };

  // Mouse fallback for testing on desktop
  const onMouseDown = (e: MouseEvent) => {
    if (isTouchDetected) return;
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    isSwiping = true;
  };

  const onMouseUp = (e: MouseEvent) => {
    if (!isSwiping) return;
    isSwiping = false;

    const endX = e.clientX;
    const endY = e.clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);
    const duration = Date.now() - startTime;

    // Tap detection
    if (absX < 10 && absY < 10 && duration < tapThreshold) {
      callbacks.onTap?.();
      return;
    }

    // Swipe detection
    if (Math.max(absX, absY) > threshold) {
      if (absX > absY) {
        if (diffX > 0) {
          callbacks.onSwipeRight?.();
        } else {
          callbacks.onSwipeLeft?.();
        }
      } else {
        if (diffY > 0) {
          callbacks.onSwipeDown?.();
        } else {
          callbacks.onSwipeUp?.();
        }
      }
    }
  };

  onMounted(() => {
    const target = targetDom ?? document.body;
    target.addEventListener("touchstart", onTouchStart, { passive: false });
    target.addEventListener("touchmove", onTouchMove, { passive: false });
    target.addEventListener("touchend", onTouchEnd);
    // Mouse listeners for testing
    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
  });

  onUnmounted(() => {
    const target = targetDom ?? document.body;
    target.removeEventListener("touchstart", onTouchStart);
    target.removeEventListener("touchmove", onTouchMove);
    target.removeEventListener("touchend", onTouchEnd);
    target.removeEventListener("mousedown", onMouseDown);
    target.removeEventListener("mouseup", onMouseUp);
  });
};
