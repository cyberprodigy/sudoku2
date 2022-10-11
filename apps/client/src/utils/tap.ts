import React from "react";

var DELTA_TIME_THRESHOLD_MS = 700;
var timer: NodeJS.Timeout | null = null;
var target: EventTarget | null = null;

type CallBack = () => any;
type TapParams = { onSingleTap?: CallBack; onDoubleTap?: CallBack };

export function tap(
  e: React.MouseEvent,
  { onSingleTap, onDoubleTap }: TapParams
) {
  if (e.currentTarget !== target) {
    // First tap
    onSingleTap?.();
  }

  if (timer == null) {
    timer = setTimeout(() => {
      timer = null;
      target = null;
    }, DELTA_TIME_THRESHOLD_MS);
  } else {
    // Second tap
    if (e.currentTarget === target) {
      onDoubleTap?.();
    }

    clearTimeout(timer);
    timer = null;
  }
  target = e.currentTarget;
}
