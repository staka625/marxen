import { selectTextblockStart } from '@milkdown/prose/commands';
import { $command } from '@milkdown/utils';

export const selectLineStart = $command('select-line-start', () => () => selectTextblockStart);
