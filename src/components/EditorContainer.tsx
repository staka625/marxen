import { useEffect, useReducer, useState } from 'react';
import vimModeReducer from '../Reducer/VimModeReducer';
import { VimMode } from '../utils/enum/VimMode';
import { MilkdownEditorWrapper } from './Editor';
import FileTree from './fileTree/FileTree';
import StatusLine from './statusLine/StatusLine';
import { Menubar } from './menubar/Menubar';
import { Store } from 'tauri-plugin-store-api';

const EditorContainer = () => {
  const [vimMode, modeDispatch] = useReducer(vimModeReducer, { mode: VimMode.Normal });
  const [theme, setTheme] = useState('nord-dark');

  useEffect(() => {
    const store = new Store('.milkdown-store');
    const THEME_KEY = 'theme';
    store.get<string>(THEME_KEY).then((saved) => {
      if (saved) setTheme(saved);
    });
  }, []);

  useEffect(() => {
    const store = new Store('.milkdown-store');
    const themeMap: Record<'frame' | 'nord' | 'frame-dark' | 'nord-dark', () => Promise<void>> = {
      frame: () => import('@milkdown/crepe/theme/frame.css').then(() => {}),
      nord: () => import('@milkdown/crepe/theme/nord.css').then(() => {}),
      'frame-dark': () => import('@milkdown/crepe/theme/frame-dark.css').then(() => {}),
      'nord-dark': () => import('@milkdown/crepe/theme/nord-dark.css').then(() => {}),
    };
    themeMap[theme as keyof typeof themeMap]?.();
    store.set('theme', theme);
    store.save();
  }, [theme]);

  useEffect(() => {
    const handleCaptureKeyDown = (event: KeyboardEvent) => {
      if (vimMode.mode === VimMode.Insert) {
        if (event.key === 'Escape') {
          modeDispatch({ type: 'SET_MODE', payload: VimMode.Normal });
          event.preventDefault();
          event.stopPropagation();
        }
      }
      if (vimMode.mode === VimMode.Normal) {
        if (event.key === 'i') {
          modeDispatch({ type: 'SET_MODE', payload: VimMode.Insert });
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };
    window.addEventListener('keydown', handleCaptureKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleCaptureKeyDown, true);
    };
  }, [modeDispatch, vimMode.mode]);

  const fileTreeData = [
    {
      name: 'src',
      children: [
        {
          name: 'components',
          children: [{ name: 'test.md' }, { name: 'Editor.tsx' }, { name: 'fileTree' }],
        },
        { name: 'App.tsx' },
      ],
    },
  ];

  const fileOpenHandler = (
    path: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    console.log(`File opened: ${path}`);
  };

  return (
    <div className="editor-container">
      <Menubar onThemeSelect={setTheme} />
      <div className="file-tree">
        <FileTree data={fileTreeData} fileOpenHandler={fileOpenHandler} />
      </div>
      <div className="editor-content">
        <MilkdownEditorWrapper theme={theme} mode={vimMode.mode} />
      </div>
      <StatusLine mode={vimMode.mode} />
    </div>
  );
};

export default EditorContainer;
