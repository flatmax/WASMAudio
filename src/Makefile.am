# Copyright (c) 2017-2018 The WASM audio Authors. All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are
# met:
#
#    * Redistributions of source code must retain the above copyright
# notice, this list of conditions and the following disclaimer.
#    * Redistributions in binary form must reproduce the above
# copyright notice, this list of conditions and the following disclaimer
# in the documentation and/or other materials provided with the
# distribution.
#    * Neither the name of mad chops coder AU nor the names of its
# contributors may be used to endorse or promote products derived from
# this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
# A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
# OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
# LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
# DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
# THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

lib_LTLIBRARIES = libwasmaudio.la

libwasmaudio_la_SOURCES = Test.C Audio.C
libwasmaudio_la_CPPFLAGS = -I$(top_srcdir)/include $(EIGEN_CFLAGS)
libwasmaudio_la_LDFLAGS =  -version-info $(LT_CURRENT) -release $(LT_RELEASE)

if HAVE_EMSCRIPTEN
all-local: libwasmaudio.la
	@emcc --bind -s TOTAL_MEMORY=32MB --llvm-lto 1 --memory-init-file 0 $(AM_CXXFLAGS) .libs/libwasmaudio.so -o .libs/libwasmaudio.js
	mv .libs/libwasmaudio.js .libs/libwasmaudio.node
	@emcc --bind --llvm-lto 1 --memory-init-file 0 -s MODULARIZE_INSTANCE=1 -s "MODULARIZE=1" -s EXPORT_NAME="'libwasmaudio'" -s SINGLE_FILE=1 -s "BINARYEN_METHOD='native-wasm'" -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=0 $(AM_CXXFLAGS) -O1 --pre-js ../js/pre.js .libs/libwasmaudio.so -o .libs/libwasmaudio.js
install-exec-hook:
	cp .libs/libwasmaudio.js $(DESTDIR)$(libdir)
clean-local:
	@rm -f .libs/libwasmaudio.node
endif
