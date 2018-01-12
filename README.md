# WASMAudio

Trying to work out how to get audio going with WASM
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
