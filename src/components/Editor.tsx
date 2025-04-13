import type { FC } from 'react';
import { useEffect } from 'react';

import { Crepe } from '@milkdown/crepe';
import { Milkdown, useEditor, MilkdownProvider } from '@milkdown/react';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/nord-dark.css';
import { VimMode } from '../utils/enum/VimMode';
import { themeMap } from '../utils/themeMap';

const markdown = `# Milkdown React Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **React**.`;

const MilkdownEditor: FC<{ theme: string }> = ({ theme }) => {
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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    themeMap[theme]?.().then(() => {
      document.documentElement.setAttribute('data-theme', theme);
    });
  }, [theme]);

  return <Milkdown />;
};

type MilkdownEditorWrapperProps = {
  theme: string;
  mode: VimMode;
};

export const MilkdownEditorWrapper: FC<MilkdownEditorWrapperProps> = ({ theme, mode }) => {
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (mode !== VimMode.Insert) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div onKeyDownCapture={onKeyDown}>
      <MilkdownProvider>
        <MilkdownEditor theme={theme} />
      </MilkdownProvider>
    </div>
  );
};
