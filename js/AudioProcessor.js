// Copyright (c) 2017-2018 The WASM audio Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of mad chops coder AU nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/** A simple js based audio processor for running WASM processing using the
AudioWorkletProcessor.
*/
class AudioProcessor extends AudioWorkletProcessor {
  constructor(){
    super();
    this.audioProcessor = new libwasmaudio.Audio;
  }

  /** malloc a WASM heap based on an audio matrix size. If the audio buffer
  channel count or frame count is changed, then free and malloc again.
  We remember size here to check if the heap frame count is different.
  \param audioMatrix Array[Array[Float32Array]]
  \param heapName For example 'inBufs'
  */
  mallocHEAP(audioMatrix, heapName){
    let Nb=audioMatrix[0][0].byteLength; // number of bytes
    let M=audioMatrix.length; // number of channels
    let N=M*Nb; // total byte count
    // resize memory if required
    if (this[heapName]==null || this[heapName+'Size']!=N){
      if (this[heapName]!=null)
        libwasmaudio.free(this[heapName]);
      this[heapName] = libwasmaudio._malloc(N);
      this[heapName+'Size']=N;
    }
    return Nb;
  }

  /** Given audio input, call the WASM process method and load the output.
  \param inputs The AudioWorklet input audio data
  \param outputs The AudioWorklet output audio data
  \param paramteres The AudioWorklet parameters (currently unused)
  */
  process(inputs, outputs, parameters) {
    let Nb = this.mallocHEAP(inputs, 'inBufs'); // resize the heap if necessary
    for (var i=0; i<inputs.length; i++) // load the AudioWorklet data into the WASM heap
      HEAPF32.subarray((this.inBufs)>>2, (this.inBufs+this.inBufsSize)>>2).set(inputs[i][0], i*inputs[i][0].length);

    Nb = this.mallocHEAP(outputs, 'outBufs'); // resize the heap if necessary

    // process the audio
    let ret=this.audioProcessor.process(this.inBufs, inputs.length, inputs[0][0].length, this.outBufs, outputs.length, outputs[0][0].length);
    if (ret==true) // if processing was good, load the output audio
      for (var i=0; i<outputs.length; i++) // retrieve the AudioWorklet data from the WASM heap
        outputs[i][0].set(HEAPF32.subarray((this.outBufs+i*Nb)>>2, (this.outBufs+i*Nb+Nb)>>2));
    return ret;
  }
}

registerProcessor('audio-processor', AudioProcessor);
