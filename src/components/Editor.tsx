import type { FC } from 'react';

import { Milkdown, useEditor, MilkdownProvider } from '@milkdown/react';
import { $command } from '@milkdown/utils';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { VimMode } from '../utils/enum/VimMode';
import './Editor.scss';
import { selectTextblockEnd, selectTextblockStart } from '@milkdown/prose/commands';
import { commandsCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { Crepe } from '@milkdown/crepe';
import { TextSelection } from '@milkdown/prose/state';

type MilkdownEditorProps = {
  vimMode: { mode: VimMode };
};

export const MilkdownEditor: FC<MilkdownEditorProps> = ({ vimMode }) => {
  const selectLineEnd = $command('select-line-end', () => () => selectTextblockEnd);
  const selectLineStart = $command('select-line-start', () => () => selectTextblockStart);
  const moveLeft = $command('move-left', () => () => (state, dispatch) => {
    const transaction = state.tr;
    const doc = state.doc;

    const from = state.selection.$from;
    if (from.pos > from.start()) {
      const newSelection = TextSelection.create(doc, from.pos - 1, from.pos - 1);
      console.log('newRange', from.pos, from.start());
      transaction.deleteSelection().setSelection(newSelection);
      dispatch!(transaction);
      return true;
    } else {
      return false;
    }
  });
  const moveRight = $command('move-right', () => () => (state, dispatch) => {
    const transaction = state.tr;
    const doc = state.doc;

    const from = state.selection.$from;
    if (from.pos < from.end()) {
      const newSelection = TextSelection.create(doc, from.pos + 1, from.pos + 1);
      console.log('newRange', from.pos, from.start());
      transaction.deleteSelection().setSelection(newSelection);
      dispatch!(transaction);
      return true;
    } else {
      return false;
    }
  });
  const moveUp = $command('move-up', () => () => (state, dispatch) => {
    const transaction = state.tr;
    const from = state.selection.$from;
    const index = from.index(from.depth - 1);
    // index: 現在のノードのインデックス
    // offset: 現在のノード内でのカーソル位置
    const offset = from.parentOffset;
    if (index > 0) {
      const prevNode = from.node(from.depth - 1).child(index - 1);
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

  const moveDown = $command('move-down', () => () => (state, dispatch) => {
    const transaction = state.tr;
    const from = state.selection.$from;
    const index = from.index(from.depth - 1);
    // index: 現在のノードのインデックス
    // offset: 現在のノード内でのカーソル位置
    const offset = from.parentOffset;
    if (index < state.doc.childCount - 1) {
      const nextNode = from.node(from.depth - 1).child(index + 1);
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
      dispatch!(transaction);
      return true;
    }
    return false;
  });

  // ts-ignore
  const { get } = useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(commonmark)
      .use(moveDown)
      .use(moveUp)
      .use(moveLeft)
      .use(moveRight)
      .use(selectLineStart)
      .use(selectLineEnd) as Editor | Crepe | undefined;
  }, []);

  const editor = get();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (vimMode.mode === VimMode.Insert) {
      return;
    }
    if (event.key === '$') {
      event.preventDefault();
      event.stopPropagation();
      editor?.action((ctx) => {
        // get command manager

        const commandManager = ctx.get(commandsCtx);
        // call command
        commandManager.call('select-line-end');
      });
    }
    if (event.key === '^') {
      event.preventDefault();
      event.stopPropagation();
      editor?.action((ctx) => {
        // get command manager

        const commandManager = ctx.get(commandsCtx);
        // call command
        commandManager.call('select-line-start');
      });
    }
    if (event.key === 'h') {
      event.preventDefault();
      event.stopPropagation();
      editor?.action((ctx) => {
        // get command manager

        const commandManager = ctx.get(commandsCtx);
        // call command
        commandManager.call('move-left');
      });
    }
    if (event.key === 'l') {
      event.preventDefault();
      event.stopPropagation();
      editor?.action((ctx) => {
        // get command manager

        const commandManager = ctx.get(commandsCtx);
        // call command
        commandManager.call('move-right');
      });
    }
    if (event.key === 'k') {
      event.preventDefault();
      event.stopPropagation();
      editor?.action((ctx) => {
        // get command manager

        const commandManager = ctx.get(commandsCtx);
        // call command
        commandManager.call('move-up');
      });
    }
    if (event.key === 'j') {
      event.preventDefault();
      event.stopPropagation();
      editor?.action((ctx) => {
        // get command manager

        const commandManager = ctx.get(commandsCtx);
        // call command
        commandManager.call('move-down');
      });
    }
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <Milkdown />
    </div>
  );
};

interface MilkdownEditorWrapperProps {
  vimMode: { mode: VimMode };
}

export const MilkdownEditorWrapper: React.FC<MilkdownEditorWrapperProps> = ({ vimMode }) => {
  return (
    <div>
      <MilkdownProvider>
        <MilkdownEditor vimMode={vimMode} />
      </MilkdownProvider>
    </div>
  );
};
