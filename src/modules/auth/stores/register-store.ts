import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface State {

}

interface Actions {

}

export const useRegisterStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({

  })),
);
