import { useEffect, useMemo, useRef, useState } from 'react';
import { type PointerEvent } from 'react';

const MOBILE_MIN_HEIGHT = 65;
const MOBILE_MAX_HEIGHT_LIMIT = 880;
const MOBILE_VIEWPORT_RATIO = 0.7;

export function useMobileCheckoutPanel() {
  const dragStartYRef = useRef<number | null>(null);
  const dragStartHeightRef = useRef<number>(MOBILE_MIN_HEIGHT);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [mobilePanelHeight, setMobilePanelHeight] = useState(MOBILE_MIN_HEIGHT);

  const mobileMaxHeight =
    viewportHeight > 0
      ? Math.min(
          MOBILE_MAX_HEIGHT_LIMIT,
          Math.round(viewportHeight * MOBILE_VIEWPORT_RATIO),
        )
      : Math.min(MOBILE_MAX_HEIGHT_LIMIT, MOBILE_MIN_HEIGHT);

  const mobilePanelHeightSafe = useMemo(
    () =>
      Math.min(Math.max(mobilePanelHeight, MOBILE_MIN_HEIGHT), mobileMaxHeight),
    [mobileMaxHeight, mobilePanelHeight],
  );

  const mobileSnapThreshold =
    MOBILE_MIN_HEIGHT + (mobileMaxHeight - MOBILE_MIN_HEIGHT) / 2;

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, []);

  const snapToClosestState = () => {
    setMobilePanelHeight((currentHeight) =>
      currentHeight >= mobileSnapThreshold
        ? mobileMaxHeight
        : MOBILE_MIN_HEIGHT,
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dragStartYRef.current = event.clientY;
    dragStartHeightRef.current = mobilePanelHeightSafe;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragStartYRef.current === null) {
      return;
    }

    event.preventDefault();

    const delta = dragStartYRef.current - event.clientY;
    const nextHeight = Math.min(
      Math.max(dragStartHeightRef.current + delta, MOBILE_MIN_HEIGHT),
      mobileMaxHeight,
    );
    setMobilePanelHeight(nextHeight);
  };

  const handlePointerUp = () => {
    dragStartYRef.current = null;
    snapToClosestState();
  };

  const handlePointerCancel = () => {
    dragStartYRef.current = null;
    snapToClosestState();
  };

  const handlePanelToggle = () => {
    setMobilePanelHeight((currentHeight) =>
      currentHeight >= mobileSnapThreshold
        ? MOBILE_MIN_HEIGHT
        : mobileMaxHeight,
    );
  };

  return {
    mobilePanelHeightSafe,
    handlePanelToggle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  };
}
