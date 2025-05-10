import { TextSelection } from '@milkdown/prose/state';
import { $command } from '@milkdown/utils';

export const moveRight = $command('move-right', () => () => (state, dispatch) => {
  const transaction = state.tr;
  const doc = state.doc;

  const from = state.selection.$from;
  if (from.pos < from.end()) {
    const newSelection = TextSelection.create(doc, from.pos + 1, from.pos + 1);
    // Removed unnecessary console.log statement.
    transaction.deleteSelection().setSelection(newSelection);
    dispatch!(transaction);
    return true;
  } else {
    return false;
  }
});
