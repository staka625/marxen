import { selectTextblockEnd } from '@milkdown/prose/commands';
import { $command } from '@milkdown/utils';

export const selectLineEnd = $command('select-line-end', () => () => selectTextblockEnd);
