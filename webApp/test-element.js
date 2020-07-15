import { LitElement, html } from 'lit-element';
import '@material/mwc-button';

class TestElement extends LitElement {
  render() {
    return html`<mwc-button raised @click="${this.runAudioWorklet}">run worklet</mwc-button>`;
  }

  static get properties() {
    return {
      context: { type: Object }
    }
  }

  /** Run the audio worklet processor
  */
  runAudioWorklet() {
    if (this.context == null)
      this.context = new AudioContext();
    this.context.audioWorklet.addModule('libwasmaudio.js').then(() => {
      let oscillator = new OscillatorNode(this.context);
      let oscillator2 = new OscillatorNode(this.context);
      oscillator2.frequency.setValueAtTime(1000, this.context.currentTime);
      let audioWorkletNode = new AudioWorkletNode(this.context, 'audio-processor', { 'numberOfInputs': 2, 'numberOfOutputs': 2 });
      let merger = new ChannelMergerNode(this.context, { 'numberOfInputs': 2 });
      // connect the oscillator to the AudioWorkletNode WASM audio processor
      oscillator.connect(audioWorkletNode, 0, 0);
      oscillator2.connect(audioWorkletNode, 0, 1);
      audioWorkletNode.connect(merger, 0, 0) // connect the L + R + destination
      audioWorkletNode.connect(merger, 1, 1).connect(this.context.destination);
      oscillator.start(); // start the oscillator
      oscillator2.start(); // start the oscillator
    }).catch(err => {console.log('error when opening '); console.log(err)});
  }
}

window.customElements.define('test-element', TestElement);
