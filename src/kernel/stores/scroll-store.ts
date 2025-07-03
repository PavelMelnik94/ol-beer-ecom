import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolling: boolean;
  scrollProgress: number;
  scrollVelocity: number;
}

interface ScrollActions {
  setScrollY: (y: number) => void;
  setScrollDirection: (direction: 'up' | 'down' | null) => void;
  setIsScrolling: (isScrolling: boolean) => void;
  setScrollProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;
}

export const useScrollStore = create<ScrollState & ScrollActions>()(
  subscribeWithSelector((set, get) => ({
    scrollY: 0,
    scrollDirection: null,
    isScrolling: false,
    scrollProgress: 0,
    scrollVelocity: 0,

    setScrollY: (y) => {
      const prevY = get().scrollY;
      const direction = y > prevY ? 'down' : y < prevY ? 'up' : null;

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
