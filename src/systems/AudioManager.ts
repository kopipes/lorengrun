export class AudioManager {
  private context: AudioContext | undefined; muted = false;
  activate(){if(this.muted)return;this.context??=new AudioContext();if(this.context.state==='suspended')void this.context.resume();}
  cue(kind:'coin'|'jump'|'hit'|'good'|'win'){if(this.muted)return;this.activate();const c=this.context;if(!c)return;const tones={coin:[880,.07],jump:[390,.09],hit:[120,.18],good:[660,.13],win:[740,.3]} as const;const [frequency,duration]=tones[kind];const osc=c.createOscillator(),gain=c.createGain();osc.type=kind==='hit'?'sawtooth':'sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(.045,c.currentTime);gain.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);osc.connect(gain).connect(c.destination);osc.start();osc.stop(c.currentTime+duration);}
  toggle(){this.muted=!this.muted;return this.muted;}
}
