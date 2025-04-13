import type { FC } from 'react';
import { useEffect, useReducer } from 'react';

import { Crepe } from '@milkdown/crepe';
import { Milkdown, useEditor, MilkdownProvider } from '@milkdown/react';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { VimMode } from '../utils/enum/VimMode';
import { themeMap } from '../utils/themeMap';
import { useTheme } from '../utils/themeContext';
import vimModeReducer from '../Reducer/VimModeReducer';

const markdown = `# Milkdown React Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **React**.`;

const MilkdownEditor: FC = () => {
  const { theme } = useTheme();

  useEditor(
    (root) => {
      const crepe = new Crepe({
        root,
        defaultValue: markdown,
      });
      return crepe;
    },
    [theme]
  );

  useEffect(() => {
    themeMap[theme]?.();
  }, [theme]);

  return <Milkdown />;
};

export const MilkdownEditorWrapper: FC = () => {
  const [vimMode] = useReducer(vimModeReducer, { mode: VimMode.Normal });

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (vimMode.mode !== VimMode.Insert) {
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
