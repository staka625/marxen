import React from 'react';
import FileTreeItem from './FileTreeItem';
import { FileElement } from '../../utils/types/FileElement';
import './FileTree.scss';

type FileTreeProps = {
  data: FileElement[];
  fileOpenHandler?: (path: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// エディタ側で編集されたときに、再レンダリングされないようにするために、memoを使用
const FileTree: React.FC<FileTreeProps> = React.memo(({ data, fileOpenHandler }) => {
  return data.map((item) => (
    <FileTreeItem
      key={item.name}
      data={item}
      level={0}
      path={`/${item.name}`}
      fileOpenHandler={fileOpenHandler}
    />
  ));
});

export default FileTree;
