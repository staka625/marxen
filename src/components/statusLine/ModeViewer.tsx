import { VimMode } from '../../utils/enum/VimMode';

type ModeViewerProps = {
  mode: VimMode;
};

const ModeClassNameMapping = new Map<VimMode, string>([
  [VimMode.Normal, 'normal-mode'],
  [VimMode.Insert, 'insert-mode'],
]);

const ModeViewer = ({ mode }: ModeViewerProps) => {
  return (
    <div className={`mode-viewer ${ModeClassNameMapping.get(mode)}`}>
      <p>{mode.toUpperCase()}</p>
    </div>
  );
};

export default ModeViewer;
