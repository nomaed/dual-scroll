import { Debouncer } from './Debouncer';

export type TScrollableElement = HTMLElement | Document;

interface IStickie {
  element: HTMLElement;
  origTop: number;
  origBottom?: number;
}

export class StickySticks {
  private parent: TScrollableElement;
  private isDocument = false;

  private sticks: IStickie[] = [];
  private debounce: Debouncer;

  constructor(container: TScrollableElement, ...sticks: TScrollableElement[]) {
    this.parent = container;
    this.sticks = sticks.map((el: TScrollableElement) => ({
      element: el instanceof Document ? el.documentElement : el,
      origTop: StickySticks.getTopPosition(el),
      origBottom: undefined
    }));
    this.isDocument = container instanceof Document;

    this.debounce = new Debouncer((ev: UIEvent) => this.onScroll(ev), 10);
    container.addEventListener('scroll', ev => this.debounce.trigger(ev));
  }

  private static getTopPosition(el: TScrollableElement): number {
    if (el instanceof Document) {
      el = el.documentElement;
    }
    let pos = 0;
    while (el.parentElement) {
      pos += el.offsetTop;
      el = el.parentElement;
    }
    return pos;
  }

  private static getClientHeight(el: TScrollableElement): number {
    return el instanceof Document
      ? el.documentElement.clientHeight
      : el.clientHeight;
  }

  private static getScrollTop(el: TScrollableElement): number {
    return el instanceof Document
      ? window.pageYOffset || el.documentElement.scrollTop || el.body.scrollTop || 0
      : el.scrollTop;
  }

  private onScroll(ev: UIEvent) {
    const scrollTop = StickySticks.getScrollTop(this.parent);
    const clientHeight = StickySticks.getClientHeight(this.parent);
    this.sticks.forEach(sticky => {
      const adjustment = sticky.element.clientHeight - clientHeight - scrollTop + sticky.origTop;
      console.log(sticky.element.id, adjustment);
      console.log(sticky.element.clientHeight, clientHeight, scrollTop, sticky.origTop);
      if (adjustment < 0) {
        sticky.element.classList.add('sticky-stick');
        sticky.element.style.bottom = adjustment + 'px';
      } else {
        sticky.element.classList.remove('sticky-stick');
        sticky.element.style.top = null;
      }
    });
  }

}
