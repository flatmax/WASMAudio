# WASMAudio

Example project for processing AudioWorklet audio in WASM code.

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
