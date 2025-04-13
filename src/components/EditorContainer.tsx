import { useEffect, useReducer } from 'react';
import vimModeReducer from '../Reducer/VimModeReducer';
import { VimMode } from '../utils/enum/VimMode';
import { MilkdownEditorWrapper } from './Editor';
import FileTree from './fileTree/FileTree';
import StatusLine from './statusLine/StatusLine';
import { Menubar } from './menubar/Menubar';
import { Store } from '@tauri-apps/plugin-store';
import { themeMap } from '../utils/themeMap';
import { ThemeProvider, useTheme } from '../utils/themeContext';

const THEME_KEY = 'theme';
const SETTINGS_FILE = 'marxen_settings.json';

const EditorContainer = () => {
  const [vimMode, modeDispatch] = useReducer(vimModeReducer, { mode: VimMode.Normal });

  const loadTheme = async () => {
    try {
      const store = await Store.load(SETTINGS_FILE);
      const savedTheme = await store.get<string>(THEME_KEY);
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const handleThemeSelect = async (newTheme: string) => {
    try {
      const store = await Store.load(SETTINGS_FILE);
      await store.set(THEME_KEY, newTheme);
      await store.save();
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
    themeMap[newTheme as keyof typeof themeMap]?.();
  };

  const MenubarWithTheme = () => {
    const { setTheme } = useTheme();

    const handleThemeSelectWithContext = (newTheme: string) => {
      setTheme(newTheme);
      handleThemeSelect(newTheme);
    };

    return <Menubar onThemeSelect={handleThemeSelectWithContext} />;
  };

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
    <ThemeProvider>
      <div className="editor-container">
        <div className="menubar">
          <MenubarWithTheme />
        </div>
        <div className="main-content">
          <div className="file-tree">
            <FileTree data={fileTreeData} fileOpenHandler={fileOpenHandler} />
          </div>
          <div className="editor-content">
            <MilkdownEditorWrapper vimMode={vimMode} dispatch={modeDispatch} />
          </div>
        </div>
        <div className="status-line">
          <StatusLine mode={vimMode.mode} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditorContainer;
