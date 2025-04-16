import { useState } from 'react';
import './Menubar.scss';

type MenuItem = {
  label: string;
  action?: () => void;
  children?: MenuItem[];
};

const menuData: MenuItem[] = [
  {
    label: 'ファイル',
    children: [
      { label: '新規', action: () => console.log('新規') },
      { label: '開く', action: () => console.log('開く') },
    ],
  },
  {
    label: '編集',
    children: [
      { label: '元に戻す', action: () => console.log('Undo') },
      { label: 'やり直し', action: () => console.log('Redo') },
    ],
  },
  {
    label: 'テーマ',
    children: ['nord', 'frame', 'nord-dark', 'frame-dark'].map((t) => ({
      label: t,
      action: () => console.log(`テーマ変更: ${t}`),
    })),
  },
];

export const Menubar = ({ onThemeSelect }: { onThemeSelect: (theme: string) => void }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="menu-bar">
      {menuData.map((menu) => (
        <div
          key={menu.label}
          className="menu-item"
          onMouseEnter={() => setOpenMenu(menu.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="menu-label">{menu.label}</div>
          {openMenu === menu.label && menu.children && (
            <div className="dropdown">
              {menu.children.map((child) => (
                <div
                  key={child.label}
                  className="dropdown-item"
                  onClick={() => {
                    if (menu.label === 'テーマ') onThemeSelect(child.label);
                    child.action?.();
                    setOpenMenu(null);
                  }}
                >
                  {child.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
