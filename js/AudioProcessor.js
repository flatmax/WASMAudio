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

/** A simple js based audio processor for testing AudioWorkletProcessor.
The AudioWorkletProcessor's scope is too tight to srouce WASM from a url.
This version doesn't work.
*/
class AudioProcessor extends AudioWorkletProcessor {
  constructor(){
    super();
    this.audioProcessor = new libwasmaudio.Audio;
    console.log(this.audioProcessor)
    console.log('AudioProcessor constructor exit')
  }

  mallocHEAP(audioMatrix, heapName){
    let Nb=audioMatrix[0][0].byteLength;
    // resize memory if required
    if (this[heapName]==null || this[heapName].length!=audioMatrix.length*Nb){
      if (this[heapName]!=null)
        libwasmaudio.free(this[heapName]);
      this[heapName] = libwasmaudio._malloc(Nb);
    }
    return Nb;
  }

  process(inputs, outputs, parameters) {
    let Nb = this.mallocHEAP(outputs, 'outBufs');
    Nb = this.mallocHEAP(inputs, 'inBufs');
    for (var i=0; i<inputs[0].length; i++)
      libwasmaudio.HEAPF32.set(inputs[0][i], this.inBufs>>2);

    // console.log(inputs[0][0])
    // console.log(this.inBufs)
    //
    // console.log(inputs.length)
    // console.log(inputs[0].length)
    // console.log(inputs[0][0].length)
    //
    // console.log(HEAPF32.subarray(this.inBufs/4, (this.inBufs+Nb)/4))

    this.audioProcessor.process(this.inBufs, inputs[0].length, inputs[0][0].length, this.outBufs, outputs[0].length, outputs[0][0].length);

    console.log('processed once and exiting')
    return false;
  }
}

registerProcessor('audio-processor', AudioProcessor);
