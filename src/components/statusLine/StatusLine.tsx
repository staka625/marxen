import ModeViewer from './ModeViewer';
import { VimMode } from '../../utils/enum/VimMode';
import './StatusLine.scss';

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
