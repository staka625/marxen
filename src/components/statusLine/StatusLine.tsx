import ModeViewer from './ModeViewer';
import { VimMode } from '../../utils/enum/VimMode';
import './StatusLine.scss';

type StatusLineProps = {
  mode: VimMode;
};

const StatusLine = ({ mode }: StatusLineProps) => {
  return <ModeViewer mode={mode} />;
};

export default StatusLine;
