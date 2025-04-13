import { VimMode } from '../utils/enum/VimMode';

type VimModeReducerState = {
  mode: VimMode;
};

type VimMOdeReducerAction = { type: 'SET_MODE'; payload: VimMode };

const vimModeReducer = (
  state: VimModeReducerState,
  action: VimMOdeReducerAction
): VimModeReducerState => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
export default vimModeReducer;
export type { VimModeReducerState, VimMOdeReducerAction };
