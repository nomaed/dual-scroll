document.addEventListener('load', () => {
  //   const stickyStick = new StickySticks()
});

class Debouncer {
  private timer: number;
  constructor(private callback: Function, private interval: number) {
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

const debounce = new Debouncer((ev: UIEvent) => {
  console.log(ev);
}, 50);

class StickySticks {
  constructor(private container: HTMLElement, ...sticks: HTMLElement[]) {
    document.addEventListener('scroll', (ev) => debounce.trigger(ev));
  }

}
