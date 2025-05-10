import { TextSelection } from '@milkdown/prose/state';
import { $command } from '@milkdown/utils';

export const moveDown = $command('move-down', () => () => (state, dispatch) => {
  const transaction = state.tr;
  const from = state.selection.$from;
  const index = from.index(from.depth - 1);
  console.log('index', index);
  // index: 現在のノードのインデックス
  // offset: 現在のノード内でのカーソル位置
  const offset = from.parentOffset;
  const parent = from.node(from.depth - 1);
  console.log('parent', parent);
  if (index < parent.childCount - 1) {
    console.log('childCount', parent.childCount);
    const nextNode = from.node(from.depth - 1).child(index + 1);
    console.log('nextNode', nextNode);
    // テキストノードでなければ先頭に移動
    if (!nextNode.isTextblock) {
      return false;
    }
    // 下のノードのテキスト長
    const textLen = nextNode.content.size;
    // 現在のoffsetが下のノードの長さを超えていれば末尾に
    const nextOffset = Math.min(offset, textLen);
    // 下のノードの絶対位置を計算
    let pos = 0;
    for (let i = 0; i <= index; i++) {
      pos += from.node(from.depth - 1).child(i).nodeSize;
    }
    // ルートからの絶対位置
    const basePos = from.start(from.depth - 1) + pos;
    const newPos = basePos + 1 + nextOffset;
    const newSelection = TextSelection.create(state.doc, newPos, newPos);
    transaction.setSelection(newSelection);
    if (dispatch) dispatch(transaction);
    return true;
  }
  return false;
});
