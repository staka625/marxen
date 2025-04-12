import { MilkdownEditorWrapper } from './Editor';
import FileTree from './fileTree/FileTree';

const EditorContainer = () => {
  const fileTreeData = [
    {
      name: 'src',
      children: [
        {
          name: 'components',
          children: [{ name: 'EditorContainer.tsx' }, { name: 'Editor.tsx' }, { name: 'fileTree' }],
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
      <div className="file-tree">
        <FileTree data={fileTreeData} fileOpenHandler={fileOpenHandler} />
      </div>
      <div className="editor-content">
        <MilkdownEditorWrapper />
      </div>
    </div>
  );
};

export default EditorContainer;
