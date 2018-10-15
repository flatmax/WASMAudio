/**
Copyright (c) 2017-2018 The WASM audio Authors. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

    * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following disclaimer
 in the documentation and/or other materials provided with the
 distribution.
    * Neither the name of mad chops coder AU nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import {html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button';

import {AudioProcessor} from './audio-processor.js';

  /**
   * `test-element`
   * WASM Audio ScriptProcessorNode tester
   *
   * @customElement
   * @polymer
   * @demo demo/index.html
   */
class TestElement extends AudioProcessor {
  static get template() {
    return html`
      <paper-button raised on-tap="startAudioProcessing">run script node</paper-button>
    `;
  }
  /** Start the audio processing using the AudioProcessor WASM code
  */
  startAudioProcessing(){
    if (this.audioProcessor == null)
      this.audioProcessor = new libwasmaudio.Audio;
    if (this.context==null)
      this.context = new AudioContext();
    // create some oscillators
    this.oscillator = new OscillatorNode(this.context);
    this.oscillator2 = new OscillatorNode(this.context);
    this.oscillator2.frequency.setValueAtTime(1000, this.context.currentTime);
    // route the oscillators to a stereo stream
    this.merger =  new ChannelMergerNode(this.context, {'numberOfInputs' : 2});
    this.oscillator.connect(this.merger, 0, 0) // connect the L + R + destination
    this.oscillator2.connect(this.merger, 0, 1);
    // create the ScriptProcessorNode and connect it to the output of the merged oscillators
    this.createScriptProcessorNode(1024, 3, 2); // this.audioProcessorNode has been created
    this.merger.connect(this.audioProcessorNode);
    // connect the ScriptProcessorNode to the output destination
    this.audioProcessorNode.connect(this.context.destination);
    // Start the audio system running
    this.oscillator.start(this.context.currentTime); // start the oscillator
    this.oscillator2.start(this.context.currentTime); // start the oscillator
  }
}

window.customElements.define('test-element', TestElement);
