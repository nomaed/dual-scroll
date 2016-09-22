import {StickySticks} from './lib/StickySticks';

export function main() {
  const stickyStick = new StickySticks(
    document,
    document.querySelector('#left-div > .content') as HTMLElement,
    document.querySelector('#right-div > .content') as HTMLElement
  );
}
