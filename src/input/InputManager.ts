export type Action = 'left'|'right'|'jump'|'slide'|'pause';
export class InputManager {
  private queue: Action[]=[]; private start:{x:number;y:number}|null=null;
  constructor(target: HTMLElement) { window.addEventListener('keydown',e=>{const map:Record<string,Action|undefined>={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'jump',w:'jump',W:'jump',' ':'jump',ArrowDown:'slide',s:'slide',S:'slide',Escape:'pause'};const a=map[e.key];if(a){e.preventDefault();this.queue.push(a);}});target.addEventListener('pointerdown',e=>{this.start={x:e.clientX,y:e.clientY};});target.addEventListener('pointerup',e=>{if(!this.start)return;const dx=e.clientX-this.start.x,dy=e.clientY-this.start.y;this.start=null;if(Math.max(Math.abs(dx),Math.abs(dy))<28)return;this.queue.push(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'slide':'jump');}); }
  consume(){return this.queue.shift();}
}
