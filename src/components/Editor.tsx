import type { FC } from 'react';

import { Crepe } from '@milkdown/crepe';
import { Milkdown, useEditor, MilkdownProvider } from '@milkdown/react';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { VimMode } from '../utils/enum/VimMode';

const markdown = `# Milkdown React Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **React**.`;

export const MilkdownEditor: FC = () => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: markdown,
    });
    return crepe;
  }, []);

  return <Milkdown />;
};

type MilkdownEditorWrapperProps = {
  mode: VimMode;
};

export const MilkdownEditorWrapper: React.FC<MilkdownEditorWrapperProps> = ({ mode }) => {
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (mode !== VimMode.Insert) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div onKeyDownCapture={onKeyDown}>
      <MilkdownProvider>
        <MilkdownEditor />
      </MilkdownProvider>
    </div>
  );
};
