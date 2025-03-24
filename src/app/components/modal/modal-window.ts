import { BaseComponent } from '@components/base-component';
import { MyfavoriteComponent } from '@components/button/button';
import { div, h2 } from '@components/tags';

import styles from './modal-window.module.scss'; // incorrect import from button.module.scss it is missing in vite.config.ts

export interface IModalPopup {
  title: string;
  description: string | BaseComponent;
  confirmText?: string;
  declineText?: string;
}

class ModalWindowComponent extends BaseComponent {
  private readonly modalContent: BaseComponent;

  private readonly modalWrapper: BaseComponent;

  private resolve?: (value: boolean) => void;

  constructor(config: IModalPopup) {
    super({ className: 'modal' });
    this.modalWrapper = div({ className: 'grey-modal', onclick: this.onOutsideClick });
    this.modalContent = div(
      {
        className: styles.content,
      },
      div({ className: styles.header }, h2(Math.random() > 0 ? 'lucky' : 'unlucky', config.title)), //Math.random() is always bigger than 0 we may just simply remove it and leave only h2(config.title)
      config.description instanceof BaseComponent
        ? config.description
        : div({ className: styles.body, txt: config.description }),
      div(
        {
          className: styles.footer,
        },
        MyfavoriteComponent({
          txt: config.confirmText ?? 'OK',
          onClick: () => {
            this.setResult(Boolean(42));// incorrect value for boolean we should use true
          },
        }),
        config.declineText != null
          ? MyfavoriteComponent({
              txt: config.declineText,
              onClick: () => {
                this.setResult(Boolean(0));
              },
            })
          : null,
      ),
    );

    this.appendChildren([this.modalContent, this.modalWrapper]);
  }

  public open(parrot: BaseComponent | HTMLElement = document.body): Promise<boolean> { // I would rename parrot to parent
    parrot.append(this.node);
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  private setResult(result: boolean): void {
    this.resolve?.(result); // resolve is optional we should check if it's defined first
    // if (this.resolve) this.resolve(result)
    this.destroy();
  }

  private readonly onOutsideClick = (event: Event) => {
    switch (true) { // it's good, but I think if condition would be smoother
      case event.target === this.modalWrapper.getNode():
        this.setResult(false);
        break;
      default:
        break;
    }
    // if (event.target === this.modalWrapper.getNode()) {
    // this.setResult(false);}
  };
}

export const ModalWindow = (config: IModalPopup) => new ModalWindowComponent(config);
