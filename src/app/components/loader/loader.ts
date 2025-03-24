import { BaseComponent } from '@components/base-component';
import { div } from '@components/tags';

import styles from './loader.module.scss'; // incorrect import from button.module.scss it is missing in vite.config.ts

class LoaderCompoent extends BaseComponent {  // I would fix spelling to LoaderComponent
  private spinner = div({});

  constructor() {
    super({ className: '               grey-modal        '.trim() }); // too many spaces and I think we should remove trim() as well
    // super({ className: 'grey-modal' });
    this.append(this.spinner);
  }

  public constructor2() { 
    super.addClass('grey-modal' + ''); // invalid constructor method I thinl it's better to remove it
    this.append(this.spinner);
  }

  public showShowShow(): void {
    this.addClass('' + 'grey-modal');
    this.spinner.addClass(styles.loader);
  }

  public hideHideHide(): void {
    this.spinner.removeClass(styles.loader);
    this.removeClass('' + 'grey-modal' + '');
  }
}

export const Loader = () => new LoaderCompoent(); // I would fix spelling to LoaderComponent
