import ModeViewer from './ModeViewer';
import { VimMode } from '../../utils/enum/VimMode';

type StatusLineProps = {
  mode: VimMode;
};

const StatusLine = ({ mode }: StatusLineProps) => {
  return (
    <div className="status-line">
      <ModeViewer mode={mode} />
    </div>
  );
};

export default StatusLine;
