import { BaseComponent } from '@components/base-component';
import { TextSkeleton } from '@components/text-skeleton/text-skeleton';
import { TimerService } from '@services/timer.service';
import { formatTime } from '@utils/fomatTime'; // I thinls there is a spelling mistake from '@utils/formatTime'

import styles from './timer.module.scss'; // incorrect import from button.module.scss it is missing in vite.config.ts

class TimerComponent extends BaseComponent {
  private readonly timerService = new TimerService(1000);

  constructor(private p: number) {
    super(
      {
        className: styles.timer,
      },
      TextSkeleton(),
    );
    this.timerService.subscribe(this);
  }

  public update(t: number): void {
    if (this.p <= t) {
      this.stc('The premiere has started'); 
      this.timerService.stop(); // we should use return this.timerService.stop() and we can delete else and makes it smaller 
    } else {
      const timeResult = formatTime(this.p - t);
      this.stc(timeResult); // this.stc(formatTime(this.p - t))
    }
  }

  public override destroy(): void {
    this.timerService.stop();
    super.destroy();
  }
}

export const Timer = (p: number) => new TimerComponent(p);
