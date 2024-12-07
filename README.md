# WASMAudio

This project exemplifies webassembly (WASM) audio processing.
If provides both the C++ backend and the webapp.

It has two branches :
ScriptProcessorNode - The soon to be depreciated method for processing audio in the browser.

AudioWorklet - The Worklet approach to processing audio in the browser.

To use :
```
git checkout ScriptProcessorNode
```
OR
```
git checkout AudioWorklet
```
Example project for processing AudioWorklet audio in WASM code.

# Prerequisites

This project uses the Eigen headers : http://eigen.tuxfamily.org
The Eigen package allows the handling of audio in matrices and is a powerful
numerical processing in C++ tool.

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

# Reference

The original mad chops coder AU
![mad chops coder AU icon](https://raw.githubusercontent.com/flatmax/WASMAudio/master/madChopsCoderAu.png)
