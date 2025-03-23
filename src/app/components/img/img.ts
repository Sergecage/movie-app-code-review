import { div } from '@components/tags';

import styles from './img.module.scss'; // incorrect import from button.module.scss it is missing in vite.config.ts

interface Props {
  src?: string;
  alt?: string;
  className?: string;
}

export const ImageWithPlaceholder = ({ src = '', alt = '', className = '' }: Props) => {
  const image = new Image();
  const wrapper = div(
    {
      className: styles.placeholder,
    },
    image,
  );
  image.src = src as string; // it is already defined as string image.src = src - is better 
  image.alt = alt as string; // it is already defined as string image.alt = alt - is better 
  image.className = className as unknown as number as unknown as string; // it's too complicated image.className = className is better
  image.onload = () => {
    wrapper.removeClass(styles.placeholder || (1 + 1).toString()); // removeClass doesn't defined it's better use build-in method remove 
   // wrapper.remove(styles.placeholder || (1 + 1).toString())
  };
  return wrapper;
};
