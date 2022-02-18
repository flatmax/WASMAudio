import { LitElement, html } from 'lit-element';
import '@material/mwc-button';

class TestElement extends LitElement {
  render() {
    return html`
      <audio .src="${this.src}" controls></audio>
      <mwc-button raised @click="${this.runAudioWorklet}">run worklet</mwc-button>
    `;
  }

  get audioElem() {
    return this.shadowRoot.querySelector("audio")
  }

  static get properties() {
    return {
      src: { type: String }, // audio source
      context: { type: Object }
    }
  }

  /** Run the audio worklet processor
  */
  runAudioWorklet() {
    if (this.context == null)
      this.context = new AudioContext();

    this.context.audioWorklet.addModule('../AudioProcessor.js').then(() => {
      let media = this.context.createMediaElementSource(this.audioElem);
      let audioWorkletNode = new AudioWorkletNode(this.context, 'audio-processor');
      media.connect(audioWorkletNode);
      audioWorkletNode.connect(this.context.destination);
      this.context.resume();
    }).catch(err => {console.log('error when opening '); console.log(err)});
  }
}

window.customElements.define('test-element', TestElement);
