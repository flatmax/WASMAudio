# WASMAudio

Example project for processing a Worker with audio processing in WASM code.
This branch uses the ScriptProcessorNode.
The ScriptProcessorNode will be depreciated in future for the AudioWorklet
 specification. Checkout the AudioWorklet branch to use AudioWorklet processing.

# Building
## Initial Setup

./tools/autotools.sh

## configuring
### native C++
./configure

### WASM
emconfigure ./configure

## building
### native C++
make
### WASM
emmake make

## installing

Really ?

# Running the webapp

cd webApp

### installing

polymer install

### running

polymer serve
