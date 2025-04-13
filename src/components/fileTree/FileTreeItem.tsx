import React from 'react';
import { MouseEventHandler } from 'react';
import { FileElement } from '../../utils/types/FileElement';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';

type FileTreeItemProps = {
  data: FileElement;
  level: number;
  path: string;
  fileOpenHandler?: (path: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const FileTreeItem: React.FC<FileTreeItemProps> = ({ data, level, path, fileOpenHandler }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const isFile = !data.children || data.children.length === 0;
  const openHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isFile && fileOpenHandler) fileOpenHandler(path, event);
    setIsOpen(!isOpen);
  };

  return (
    <div className="file-tree-item">
      <div className="file-tree-item-content">
        {!isFile && (
          <span className="file-tree-icon" onClick={openHandler}>
            {isOpen ? <FaFolderOpen /> : <FaFolder />}
          </span>
        )}
        <button onClick={openHandler} className="file-tree-element">
          {data.name}
        </button>
      </div>
      {isOpen &&
        data.children?.map((child) => (
          <FileTreeItem
            key={child.name}
            data={child}
            level={level + 1}
            path={`${path}/${child.name}`}
            fileOpenHandler={fileOpenHandler}
          />
        ))}
    </div>
  );
};

export default FileTreeItem;
