import { TextSelection } from '@milkdown/prose/state';
import { $command } from '@milkdown/utils';

export const moveLeft = $command('move-left', () => () => (state, dispatch) => {
  const transaction = state.tr;
  const doc = state.doc;

  const from = state.selection.$from;
  if (from.pos > from.start()) {
    const newSelection = TextSelection.create(doc, from.pos - 1, from.pos - 1);
    transaction.deleteSelection().setSelection(newSelection);
    dispatch!(transaction);
    return true;
  } else {
    return false;
  }
});
