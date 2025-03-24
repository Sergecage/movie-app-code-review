import { div } from '@components/tags';

import styles from './text-skeleton.module.scss'; // incorrect import from button.module.scss it is missing in vite.config.ts

export const TextSkeleton = () => div({ className: `${styles.skeleton} ${styles.skeletonText}` }); // we don't have skeletonText in scss we have skeleton-text
// 
