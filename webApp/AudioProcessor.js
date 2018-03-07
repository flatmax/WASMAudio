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
    // WASM can't be sourced from a url, as there is no docuiment nor window elements.
    // this.libwasmaudio=libwasmaudio({
    //   onRuntimeInitialized:console.log('libwasmaudio initalised'),
    //   // 'print': function(text) { console.log('stdout: ' + text) },
    //   // 'printErr': function(text) { console.log('stderr: ' + text) }
    // });
  }

  /** Load a js file which will load a WASM file.
    \param url the source of the js file, which has to be able to find the wasm file.
    \param onLoadFn The function to run once the script has loaded.
  */
  static loadWASM(url, onLoadFn){
    let script = document.createElement('script');
    script.onload = onLoadFn;
    script.src = url;
    document.head.appendChild(script);
  }

  static instantiateWASM(document){
    return new Promise( (resolve, reject) => {
      try {
        let me=this;
        this.loadWASM('libwasmaudio.js', function(){
          me.libwasmaudio=libwasmaudio({onRuntimeInitialized:console.log('libwasmaudio initalised')});
        }); // load in the wasm file
        resolve();
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  process(inputs, outputs, parameters) {
    console.log('processed once and exiting - no WASM')
    return false;
  }
}

registerProcessor('audio-processor', AudioProcessor);
