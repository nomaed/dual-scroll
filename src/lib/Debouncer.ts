export class Debouncer {
  private timer: number | undefined;

  constructor(private callback: Function,
              private interval: number) {
  }

  public trigger(...args: any[]) {
    this.stop();
    this.timer = setTimeout(() => {
      this.callback(...args);
    }, this.interval);
  }

  public stop() {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = undefined;
  }
}
