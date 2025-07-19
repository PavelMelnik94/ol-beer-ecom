import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | undefined;
  isScrolling: boolean;
  scrollProgress: number;
  scrollVelocity: number;
}

interface ScrollActions {
  setScrollY: (y: number) => void;
  setScrollDirection: (direction: 'up' | 'down' | undefined) => void;
  setIsScrolling: (isScrolling: boolean) => void;
  setScrollProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;
}

export const useScrollStore = create<ScrollState & ScrollActions>()(
  subscribeWithSelector((set, get) => ({
    scrollY: 0,
    scrollDirection: undefined,
    isScrolling: false,
    scrollProgress: 0,
    scrollVelocity: 0,

    setScrollY: (y) => {
      const previousY = get().scrollY;
      const direction = y > previousY ? 'down' : (y < previousY ? 'up' : undefined);

      set({
        scrollY: y,
        scrollDirection: direction,
      });
    },

    setScrollDirection: direction => set({ scrollDirection: direction }),
    setIsScrolling: isScrolling => set({ isScrolling }),
    setScrollProgress: progress => set({ scrollProgress: progress }),
    setScrollVelocity: velocity => set(() => ({ scrollVelocity: velocity })),
  })),
);
