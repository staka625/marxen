export const VimMode = {
  Normal: 'normal',
  Insert: 'insert',
};
export type VimMode = (typeof VimMode)[keyof typeof VimMode];
