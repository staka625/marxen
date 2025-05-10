import type { FC } from 'react';

import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';

import { Crepe } from '@milkdown/crepe';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { commandsCtx } from '@milkdown/kit/core';
import { VimMode } from '../utils/enum/VimMode';
import './Editor.scss';
import * as vimCommands from './milkdown/commands';

const markdown = `# Milkdown React Crepe
> You're scared of a world where you're needed.
This is a demo for using Crepe with **React**.`;

type MilkdownEditorProps = {
  vimMode: { mode: VimMode };
};

const vimCommandsEntries = Object.entries(vimCommands);

export const MilkdownEditor: FC<MilkdownEditorProps> = ({ vimMode }) => {
  // ts-ignore
  const { get } = useEditor((root) => {
    const crepe = new Crepe({ root, defaultValue: markdown });
    vimCommandsEntries.forEach(([, command]) => {
      crepe.editor.use(command);
    });

    return crepe;
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
