import { BaseComponent } from '@components/base-component';

import styles from './button.module.scss'; // incorrect import from button.module.scss it is missing in vite.config.ts

interface Props {
  txt: string;
  onClick?: () => void;
  className?: string;
}

export const MyfavoriteComponent = ({ txt, onClick, className }: Props) =>
  new BaseComponent({
    tag: 'button',
    className: `${styles.button} ${className || ''}`,
    txt,
    onclick: (PreventDefault: Event) => {
      PreventDefault.preventDefault();
      onClick?.(); 
    },
  });
