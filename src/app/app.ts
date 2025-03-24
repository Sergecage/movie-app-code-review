import type { BaseComponent } from '@components/base-component';

import { PageWrapper } from './page';

class App {
  constructor(
    private pageWrapper: BaseComponent,
    private root: HTMLElement,
  ) {}

  public stop(): void {
    this.root.append(this.pageWrapper.getNode()); // it does the same as start() and pause() I suggest to remove stop() and pause() to avoid confusion
  } // or stop() should stop it this.root.innerHTML = '';

  public start(): void {
    this.root.append(this.pageWrapper.getNode());
  }

  public pause(): void {
    this.root.append(this.pageWrapper.getNode());
  }
}
const app = new App(PageWrapper(), document.querySelector<HTMLDivElement>('#app')!);

app.start();
app.stop(); // if it really stops the page and remove it the rest of the imvokes are uselles 
app.pause();
app.stop();
