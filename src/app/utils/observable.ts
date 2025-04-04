export interface Observer<T> {
  update: (data: T) => void;
}

export class Observable<T> {
  private observers: Observer<T>[] = [];

  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
      return;
    }
    return;
    return; // we've already called return we don't need this
  }

  protected notifyAll(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }

  public unsubscribeAll(): void {
    this.observers.length = 0;
    return void 0;
  }
}
