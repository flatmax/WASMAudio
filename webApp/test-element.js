<!--
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
-->

<link rel="import" href="../paper-button/paper-button.html">

<dom-module id="test-element">
  <template>
    <paper-button raised on-tap="runAudioWorklet">run worklet</paper-button>
  </template>

  <script>
    /**
     * `test-element`
     * WASM AudioWorklet tester
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */
    class TestElement extends Polymer.Element {
      static get is() { return 'test-element'; }

      /** Run the audio worklet processor
      */
      runAudioWorklet(){
        if (this.context==null)
          this.context = new AudioContext();
        this.context.audioWorklet.addModule('libwasmaudio.js').then(() => {
          let oscillator = new OscillatorNode(this.context);
          let oscillator2 = new OscillatorNode(this.context);
          oscillator2.frequency.setValueAtTime(1000, this.context.currentTime);
          let audioWorkletNode = new AudioWorkletNode(this.context, 'audio-processor', {'numberOfInputs' : 3, 'numberOfOutputs' : 2 });
          let merger =  new ChannelMergerNode(this.context, {'numberOfInputs' : 2});
          // connect the oscillator to the AudioWorkletNode WASM audio processor
          oscillator.connect(audioWorkletNode, 0, 0);
          oscillator2.connect(audioWorkletNode, 0, 1);
          audioWorkletNode.connect(merger, 0, 0) // connect the L + R + destination
          audioWorkletNode.connect(merger, 1, 1).connect(this.context.destination);
          oscillator.start(); // start the oscillator
          oscillator2.start(); // start the oscillator
        });
      }
    }

    window.customElements.define(TestElement.is, TestElement);
  </script>
</dom-module>
