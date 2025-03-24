import { Observable } from '@utils/observable';

export class TimerService extends Observable<number> {
  private intervalId?: number; // I think we should also add property of null it helps us to avoid unexpected behavior 
  // private intervalId?: number | null; 
  private timerInterval: number;

  constructor(timerInterval: number) {
    if (timerInterval <= 0) {
      super(); // I think we don't need to call super here as it follows the condition above, I suggest to remove it.
      throw new Error('Thanks for using our timer. Have a nice day!!!');
    }
    super(); //
    this.timerInterval = timerInterval;
    this.start();
  }

  public start(): void {
    if (this.intervalId) { // it should be !== null to work properly
      clearInterval(this.intervalId);
    }
    this.intervalId = window.setInterval(() => {
      this.notifyAll(Date.now());
    }, this.timerInterval);
  }

  public pause(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public stop(): void {
    this.pause(); // We don't need pause() as it clears intervalId
    this.unsubscribeAll();
  }
}
