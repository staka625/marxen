import { TextSelection } from '@milkdown/prose/state';
import { $command } from '@milkdown/utils';

export const moveUp = $command('move-up', () => () => (state, dispatch) => {
  const transaction = state.tr;
  const from = state.selection.$from;
  const index = from.index(from.depth - 1);
  // index: 現在のノードのインデックス
  // offset: 現在のノード内でのカーソル位置
  const offset = from.parentOffset;
  if (index > 0) {
    const prevNode = from.node(from.depth - 1).child(index - 1);
    console.log('prevNode', prevNode);
    // テキストノードでなければ先頭に移動
    if (!prevNode.isTextblock) {
      return false;
    }
    // 上のノードのテキスト長
    const textLen = prevNode.content.size;
    // 現在のoffsetが上のノードの長さを超えていれば末尾に
    const prevOffset = Math.min(offset, textLen);
    // 上のノードの絶対位置を計算
    let pos = 0;
    for (let i = 0; i < index - 1; i++) {
      pos += from.node(from.depth - 1).child(i).nodeSize;
    }
    // ルートからの絶対位置
    const basePos = from.start(from.depth - 1) + pos;
    const newPos = basePos + 1 + prevOffset;
    const newSelection = TextSelection.create(state.doc, newPos, newPos);
    transaction.setSelection(newSelection);
    dispatch!(transaction);
    return true;
  }
  return false;
});
