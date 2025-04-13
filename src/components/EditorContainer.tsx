import { useEffect, useReducer } from 'react';
import vimModeReducer from '../Reducer/VimModeReducer';
import { VimMode } from '../utils/enum/VimMode';
import { MilkdownEditorWrapper } from './Editor';
import FileTree from './fileTree/FileTree';
import StatusLine from './statusLine/StatusLine';

const EditorContainer = () => {
  const [vimMode, modeDispatch] = useReducer(vimModeReducer, { mode: VimMode.Normal });

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

  useEffect(() => {
    const handleCaptureKeyDown = (event: KeyboardEvent) => {
      // HACK: キーバインドの解釈システムは見直す必要がある
      if (vimMode.mode === VimMode.Insert) {
        if (event.key === 'Escape') {
          modeDispatch({ type: 'SET_MODE', payload: VimMode.Normal });
          event.preventDefault();
          event.stopPropagation();
        }
      }
      if (vimMode.mode === VimMode.Normal) {
        console.log('Normal mode');
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

  return (
    <div className="application-container">
      <div className="editor-container">
        <div className="file-tree">
          <FileTree data={fileTreeData} fileOpenHandler={fileOpenHandler} />
        </div>
        <div className="editor-content">
          <MilkdownEditorWrapper mode={vimMode.mode} />
        </div>
      </div>
      <StatusLine mode={vimMode.mode} />
    </div>
  );
};

export default EditorContainer;
