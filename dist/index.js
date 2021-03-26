/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(/*! ./lib/alea */ "./node_modules/seedrandom/lib/alea.js");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(/*! ./lib/xor128 */ "./node_modules/seedrandom/lib/xor128.js");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(/*! ./lib/xorwow */ "./node_modules/seedrandom/lib/xorwow.js");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(/*! ./lib/xorshift7 */ "./node_modules/seedrandom/lib/xorshift7.js");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(/*! ./lib/xor4096 */ "./node_modules/seedrandom/lib/xor4096.js");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(/*! ./lib/tychei */ "./node_modules/seedrandom/lib/tychei.js");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(/*! ./seedrandom */ "./node_modules/seedrandom/seedrandom.js");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "./node_modules/seedrandom/lib/alea.js":
/*!*********************************************!*\
  !*** ./node_modules/seedrandom/lib/alea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(/*! crypto */ "crypto");
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : this,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/Articulation.ts":
/*!*****************************!*\
  !*** ./src/Articulation.ts ***!
  \*****************************/
/*! exports provided: isArticulation, EnumArticulation, Articulation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArticulation", function() { return isArticulation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumArticulation", function() { return EnumArticulation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Articulation", function() { return Articulation; });
var isArticulation = x => {
  return x instanceof Articulation || typeof x === "object" && typeof x.velocity === "number" && typeof x.length === "number";
};
class EnumArticulation {
  static get STACCATISSIMO() {
    return new Articulation(1, 0.25);
  }

  static get STACCATO() {
    return new Articulation(1, 0.4);
  }

  static get MEZZO_STACCATO() {
    return new Articulation(1, 0.75);
  }

  static get LEGATO() {
    return new Articulation(1, 0.95);
  }

  static get TENUTO() {
    return new Articulation(1, 1);
  }

  static get SOSTENUTO() {
    return new Articulation(1, 1.2);
  }

  static get MARCATO() {
    return new Articulation(1.5, 1);
  }

  static get PIZZICATO() {
    return new Articulation(1, 1);
  }

  static get MUTED() {
    return new Articulation(1, 1);
  }

}
class Articulation {
  constructor(first, lengthIn) {
    this.velocity = void 0;
    this.length = void 0;

    if (isArticulation(first)) {
      this.velocity = first.velocity;
      this.length = first.length;
    } else {
      this.velocity = first;
      this.length = lengthIn;
    }

    return this;
  }

  clone() {
    return new Articulation(this);
  }

  toString() {
    return "Art: [Vel: ".concat(this.velocity, " Len: ").concat(this.length, "]");
  }

}

/***/ }),

/***/ "./src/Chord.ts":
/*!**********************!*\
  !*** ./src/Chord.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumChord": () => (/* binding */ EnumChord),
/* harmony export */   "isChord": () => (/* binding */ isChord),
/* harmony export */   "isChordArray": () => (/* binding */ isChordArray),
/* harmony export */   "Chord": () => (/* binding */ Chord)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
var _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class EnumChord extends _Enum__WEBPACK_IMPORTED_MODULE_3__.Enum {
  static get MAJ() {
    return new EnumChord("MAJ", "M3", "P5");
  }

  static get MIN() {
    return new EnumChord("MIN", "m3", "P5");
  }

  static get AUG() {
    return new EnumChord("AUG", "M3", "A5");
  }

  static get DIM() {
    return new EnumChord("DIM", "m3", "d5");
  }

  static get SUS2() {
    return new EnumChord("SUS2", "M2", "P5");
  }

  static get SUS() {
    return new EnumChord("SUS", "P5", "P5");
  }

  static get SUS4() {
    return new EnumChord("SUS4", "P5", "P5");
  }

  static get DOM7() {
    return new EnumChord("DOM7", "M3", "P5", "m7");
  }

  static get MAJ7() {
    return new EnumChord("MAJ7", "M3", "P5", "M7");
  }

  static get MINMAJ7() {
    return new EnumChord("MINMAJ7", "m3", "P5", "M7");
  }

  static get MIN7() {
    return new EnumChord("MIN7", "m3", "P5", "m7");
  }

  static get AUGMAJ7() {
    return new EnumChord("AUGMAJ7", "M3", "A5", "M7");
  }

  static get AUG7() {
    return new EnumChord("AUG7", "M3", "A5", "m7");
  }

  static get DIMMIN7() {
    return new EnumChord("DIMMIN7", "m3", "d5", "m7");
  }

  static get DIM7() {
    return new EnumChord("DIM7", "m3", "d5", "d7");
  }

  static get DOM7DIM5() {
    return new EnumChord("DOM7DIM5", "M3", "d5", "m7");
  }

  constructor(first) {
    super();
    this._name = void 0;
    this.intervals = void 0;

    if (typeof first === "string") {
      this._name = first;

      for (var _len = arguments.length, intervalsIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        intervalsIn[_key - 1] = arguments[_key];
      }

      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval.fromArray(...intervalsIn);
    } else {
      this._name = first._name;
      this.intervals = first.intervals.map(i => i.clone());
    }

    return this;
  }

  static byChord(chordIn) {
    return this.values().find(enumChord => {
      return enumChord.intervals.length === chordIn.intervals.length && enumChord.intervals.every((interval, i) => interval.equals(chordIn.intervals[i]));
    }) || null;
  }

  static byName(chordIn) {
    return EnumChord[chordIn];
  }

  toChord(base) {
    return new Chord(base, ...this.intervals);
  }

  name() {
    return this._name;
  }

  equals(chordIn) {
    return "intervals" in chordIn && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(chordIn.intervals) && chordIn.intervals.length === this.intervals.length && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
  }

  clone() {
    return new EnumChord(this);
  }

}
EnumChord.indexes = ["MAJ", "MIN", "AUG", "DIM", "SUS2", "SUS", "SUS4", "DOM7", "MAJ7", "MINMAJ7", "MIN7", "AUGMAJ7", "AUG7", "DIMMIN7", "DIM7", "DOM7DIM5"];
var isChord = x => {
  return x instanceof Chord || typeof x === "object" && (0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(x.base) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals) && typeof x.isAbsolute === "boolean";
};
var isChordArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof Chord);
};
_Symbol$iterator = Symbol.iterator;
class Chord {
  // Intervals from base

  /**
   * Gives a new Chord instance (clone)
   * @param {IChord} chordIn
   * @memberof Chord
   */

  /**
   * Construct chord by notes
   * @param {(Note | Pitch | string)} base
   * @param {(...Note[] | Pitch[])} notes
   * @memberof Chord
   */

  /**
   * Construct chord by intervals
   * @param {Pitch} base
   * @param {...Pitch[]} pitches
   * @memberof Chord
   */
  constructor(first) {
    this.base = void 0;
    this.intervals = void 0;
    this.base = null;
    this.intervals = [];

    for (var _len2 = arguments.length, arrayIn = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      arrayIn[_key2 - 1] = arguments[_key2];
    }

    this.become(first, ...arrayIn);
  }

  become(first) {
    if (isChord(first)) {
      this.base = first.base;
      this.intervals = first.intervals;
    } else if (typeof first === "string") {
      var isPitch = _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch.REGEX.exec(first);
      if (isPitch) this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch(first);else this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__.Note(first);
    } else {
      this.base = first;
    }

    for (var _len3 = arguments.length, arrayIn = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      arrayIn[_key3 - 1] = arguments[_key3];
    }

    if (arrayIn.find(e => e instanceof _Note__WEBPACK_IMPORTED_MODULE_1__.Note && !(e instanceof _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch))) this.isAbsolute = false;
    if (!this.isAbsolute) this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__.Note(this.base);

    if ((0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitchArray)(arrayIn) && this.isAbsolute) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch.compare).map(pitch => this.base.getInterval(pitch));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    } else if ((0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.Interval.compare);
    } else {
      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval.fromArray(...arrayIn).sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.Interval.compare);
    }

    return this;
  }

  get size() {
    return this.intervals.length + 1;
  }

  get notes() {
    return [this.base, ...this.intervals.map(i => this.base.clone().add(i))];
  }

  set notes(notesIn) {
    if (!notesIn.length) return;

    var _notesIn = _toArray(notesIn),
        first = _notesIn[0],
        arrayIn = _notesIn.slice(1);

    this.base = first;

    if (Object(_Pitch__WEBPACK_IMPORTED_MODULE_2__["isPitchArray"])(arrayIn)) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"].compare).map(pitch => this.base.getInterval(pitch));
    } else if (Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNoteArray"])(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    }
  }

  get isAbsolute() {
    return this.base instanceof _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"];
  }

  get ratio() {
    return Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["nearestFractions"])([1, ...this.intervals.map(i => i.ratio)]);
  }

  get reciprocal() {
    return Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["nearestReciprocals"])([1, ...this.intervals.map(i => i.ratio)]);
  }

  removeDup() {
    var intervals = this.intervals;
    this.intervals = intervals.filter((i0, i) => {
      var offset = i0.offset;
      if (offset === 0) return false;
      if (intervals.findIndex(i1 => i1 === i0 || i1.offset === offset) === i) return true;
      return false;
    });
  }

  reorder() {
    this.intervals = this.intervals.sort(_Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"].compare);

    if (this.intervals.length && this.intervals[0].offset < 0) {
      var d = this.intervals[0].reverse();

      for (var i = 1; i < this.intervals.length; i++) {
        this.intervals[i].add(d);
      }
    }
  }

  contains(noteIn) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.notes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var note = _step.value;
        if (noteIn.equals(note)) return true;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  }

  inverseUp() {
    if (this.intervals.length === 0) return this;
    var interval0 = this.intervals[0];
    this.base.add(interval0);

    for (var i = 0; i < this.intervals.length - 1; i++) {
      this.intervals[i] = this.intervals[i + 1].sub(interval0);
    }

    this.intervals[this.intervals.length - 1] = interval0.octaveReverse();
    return this;
  }

  inverseDown() {
    if (this.intervals.length === 0) return this;
    var interval0 = this.intervals[this.intervals.length - 1].octaveReverse();
    this.base.sub(interval0);

    for (var i = this.intervals.length - 1; i > 0; i--) {
      this.intervals[i] = this.intervals[i - 1].add(interval0);
    }

    this.intervals[0] = interval0;
    return this;
  }

  inverse(inversion) {
    if (this.intervals.length === 0) return this;

    if (inversion > 0) {
      for (var i = 0; i < inversion; i++) {
        this.inverseUp();
      }
    }

    if (inversion < 0) {
      for (var _i = 0; _i > inversion; _i--) {
        this.inverseDown();
      }
    }

    return this;
  }

  get enumChord() {
    return EnumChord.byChord(this);
  }

  get imaginaryBase() {
    return this.base.div(this.ratio[0]);
  }

  get imaginaryVertex() {
    return this.base.mul(this.reciprocal[0]);
  }

  add(first) {
    if (first instanceof _Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"]) {
      this.intervals.push(first);
    } else if (Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNote"])(first)) {
      this.intervals.push(this.base.getInterval(first));
    } else if (Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNoteArray"])(first)) {
      this.intervals.push(...first.map(p => this.base.getInterval(p)));
    } else {
      var d = this.base.getInterval(first.base);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = first.intervals[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var interval = _step2.value;
          this.intervals.push(d.clone().add(interval));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    this.reorder();
    return this;
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(first) {
    if (first instanceof _Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"]) {
      this.intervals = this.intervals.filter(i0 => !i0.equals(first));
    } else if (Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNote"])(first)) {
      var that = first instanceof _Note__WEBPACK_IMPORTED_MODULE_1__["Note"] ? first : Object(_Pitch__WEBPACK_IMPORTED_MODULE_2__["isPitch"])(first) ? new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"](first) : new _Note__WEBPACK_IMPORTED_MODULE_1__["Note"](first);
      var notes = this.notes.filter(n0 => !that.equals(n0));
      if (!notes.length) return null;
      this.notes = notes;
    } else if (Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNoteArray"])(first)) {
      var _notes = this.notes;
      first.forEach(n => {
        var that = n instanceof _Note__WEBPACK_IMPORTED_MODULE_1__["Note"] ? n : Object(_Pitch__WEBPACK_IMPORTED_MODULE_2__["isPitch"])(n) ? new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"](n) : new _Note__WEBPACK_IMPORTED_MODULE_1__["Note"](n);
        _notes = this.notes.filter(n0 => !that.equals(n0));
      });
      if (!_notes.length) return null;
      this.notes = _notes;
    } else {
      this.sub(first.notes);
    }

    this.reorder();
    return this;
  }

  static sub(a, b) {
    return a.clone().sub(b);
  }

  compareTo(that) {
    return Chord.compare(this, that);
  }

  static compare(x, y) {
    return x.intervals.length - y.intervals.length;
  }

  equals(chordIn) {
    return isChord(chordIn) && chordIn.base.equals(this.base) && chordIn.intervals.length === this.intervals.length && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
  }

  toString() {
    return this.base.toString() + ":" + this.intervals.toString();
  }

  clone() {
    return new Chord(this);
  }

  [_Symbol$iterator]() {
    var _this = this;

    return (/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, note;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 3;
                _iterator3 = _this.notes[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context.next = 12;
                  break;
                }

                note = _step3.value;
                _context.next = 9;
                return note;

              case 9:
                _iteratorNormalCompletion3 = true;
                _context.next = 5;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 21:
                _context.prev = 21;

                if (!_didIteratorError3) {
                  _context.next = 24;
                  break;
                }

                throw _iteratorError3;

              case 24:
                return _context.finish(21);

              case 25:
                return _context.finish(18);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 14, 18, 26], [19,, 21, 25]]);
      })()
    );
  }

  getTendancy(that) {
    var m = [];
    var notes = this.notes;
    var $notes = that.notes;

    for (var i = 0; i < $notes.length; i++) {
      m[i] = [];

      for (var j = 0; j < notes.length; j++) {
        m[i][j] = notes[j].getTendancy($notes[i]);
      }
    }

    return m.map(r => Math.max(...r)).reduce((s, e) => s += e, 0) / m.length; // eslint-disable-line no-param-reassign
  }

  getStability(that) {
    var m = [];
    var notes = this.notes;
    var $notes = that.notes;

    for (var i = 0; i < $notes.length; i++) {
      m[i] = [];

      for (var j = 0; j < notes.length; j++) {
        m[i][j] = notes[j].getStability($notes[i]);
      }
    }

    return m.map(r => Math.max(...r)).reduce((s, e) => s += e, 0) / m.length; // eslint-disable-line no-param-reassign
  }

}

/***/ }),

/***/ "./src/Duration.ts":
/*!*************************!*\
  !*** ./src/Duration.ts ***!
  \*************************/
/*! exports provided: isDuration, Duration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDuration", function() { return isDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return Duration; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");

var isDuration = x => {
  return x instanceof Duration || (typeof x.isAbsolute === "boolean" && x.isAbsolute ? typeof x.seconds === "number" : typeof x.numerator === "number" && typeof x.denominator === "number");
};
class Duration {
  // Absolute duration is represented by seconds.
  // Quarter note = 1/4, Whole note = 1/1, Quarter note triplet = 1/6
  // Absolute duration if in abs mode.
  constructor(first, second) {
    this.isAbsolute = void 0;
    this.numerator = void 0;
    this.denominator = void 0;
    this.seconds = void 0;

    if (isDuration(first)) {
      this.isAbsolute = first.isAbsolute;
      this.numerator = first.numerator;
      this.denominator = first.denominator;
      this.seconds = first.seconds;
      this.simplify().check();
    } else if (typeof second === "number") {
      this.isAbsolute = false;
      this.numerator = first;
      this.denominator = second;
      this.simplify().check();
    } else {
      this.isAbsolute = true;
      this.seconds = first;
      this.check();
    }

    return this;
  }

  get value() {
    return this.isAbsolute ? this.seconds : this.numerator / this.denominator;
  }

  getBeats(first) {
    if (typeof first === "undefined") {
      if (this.isAbsolute) throw new Error("Absolute duration needs BPM to calculate.");
      return this.value * 4;
    }

    if (typeof first === "number") {
      // bpmIn
      return this.value * 4 * first / 60;
    } // timeCodeIn


    return this.value * 4 * first.getAbsoluteDuration();
  }

  toAbsolute(first) {
    if (this.isAbsolute) return this;
    if (typeof first === "number") this.seconds = this.getBeats() * first / 60;else this.seconds = first.getAbsoluteDuration(this.getBeats());
    this.isAbsolute = true;
    return this;
  }

  add(durationIn) {
    if (this.isAbsolute && durationIn.isAbsolute) {
      this.seconds += durationIn.seconds;
    } else if (!this.isAbsolute && !durationIn.isAbsolute) {
      if (this.denominator === durationIn.denominator) {
        this.numerator += durationIn.numerator;
      } else {
        this.numerator = this.numerator * durationIn.denominator + durationIn.numerator * this.denominator;
        this.denominator *= durationIn.denominator;
      }

      this.simplify();
    } else {
      throw new Error("Cannot operate between absolute and relative duration.");
    }

    return this.check();
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(durationIn) {
    if (this.isAbsolute && durationIn.isAbsolute) {
      this.seconds -= durationIn.seconds;
    } else if (!this.isAbsolute && !durationIn.isAbsolute) {
      if (this.denominator === durationIn.denominator) {
        this.numerator -= durationIn.numerator;
      } else {
        this.numerator = this.numerator * durationIn.denominator - durationIn.numerator * this.denominator;
        this.denominator *= durationIn.denominator;
      }

      this.simplify();
    } else {
      throw new Error("Cannot operate between absolute and relative duration.");
    }

    return this.check();
  }

  static sub(a, b) {
    return a.clone().sub(b);
  }

  mul(f) {
    if (this.isAbsolute) {
      this.seconds *= f;
    } else {
      this.numerator *= f;
      this.simplify();
    }

    return this.check();
  }

  static mul(a, b) {
    return a.clone().mul(b);
  }

  div(first) {
    if (typeof first === "number") {
      if (this.isAbsolute) {
        this.seconds /= first;
      } else {
        this.denominator *= first;
        this.simplify();
      }

      return this.check();
    }

    if (this.isAbsolute === first.isAbsolute) return this.value / first.value;
    throw new Error("Cannot operate between absolute and relative duration.");
  }

  static div(a, b) {
    if (typeof b === "number") return a.clone().div(b);
    return a.clone().div(b);
  }

  equals(durationIn) {
    return isDuration(durationIn) && this.compareTo(durationIn) === 0;
  }

  compareTo(that) {
    return Duration.compare(this, that);
  }

  static compare(x, y) {
    if (x.isAbsolute !== y.isAbsolute) throw new Error("Cannot compare between absolute and relative duration");
    return x.isAbsolute ? x.seconds - y.seconds : x.numerator / x.denominator - y.numerator / y.denominator;
  }

  simplify() {
    if (this.numerator === 0) return this;
    var f = Math.max(Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["precisionFactor"])(this.numerator), Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["precisionFactor"])(this.denominator));
    var $gcd = Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["gcd"])(this.numerator * f, this.denominator * f) / f;

    if ($gcd !== 1) {
      this.denominator /= $gcd;
      this.numerator /= $gcd;
    }

    return this;
  }

  check() {
    /*
    if (this.isAbsolute) {
        if (this.numerator < 0 || this.denominator <= 0) throw new Error("Duration should have positive value.");
    } else {
        if (this.seconds < 0) throw new Error("Duration should have positive value.");
    }
    */
    return this;
  }

  clone() {
    return new Duration(this);
  }

  static random(randomIn, min, max, step) {
    if (min.equals(max)) return min.clone();
    var d = max.clone().sub(min);
    var steps = randomIn.randint(0, ~~d.div(step));
    return min.clone().add(step.clone().mul(steps));
  }

  toString() {
    return this.isAbsolute ? this.seconds + "s" : this.getBeats() + " beats";
  }

}

/***/ }),

/***/ "./src/Enum.ts":
/*!*********************!*\
  !*** ./src/Enum.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Enum": () => (/* binding */ Enum)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Enum {
  static values() {
    return this.indexes.map(key => this[key]);
  }

  static valueOf(key) {
    return this[key];
  }

  constructor() {
    return this;
  }

  name() {
    throw new Error("Method not implemented");
  }

  ordinal() {
    return this.constructor.indexes.indexOf(this.name());
  }

  toString() {
    return this.name();
  }

}
Enum.indexes = [];

/***/ }),

/***/ "./src/Frequency.ts":
/*!**************************!*\
  !*** ./src/Frequency.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Frequency": () => (/* binding */ Frequency)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Frequency {}
Frequency.A440 = 440;
Frequency.SEMITONE = Math.pow(2, 1 / 12);
Frequency.THRES_AUDIT = Math.pow(2, 1 / 36);

Frequency.getRatio = d => Math.pow(2, d / 12);

/***/ }),

/***/ "./src/Interval.ts":
/*!*************************!*\
  !*** ./src/Interval.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInterval": () => (/* binding */ isInterval),
/* harmony export */   "isIntervalArray": () => (/* binding */ isIntervalArray),
/* harmony export */   "DEGREE_TO_OFFSET": () => (/* binding */ DEGREE_TO_OFFSET),
/* harmony export */   "Interval": () => (/* binding */ Interval)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");



var isInterval = x => {
  return x instanceof Interval || typeof x === "object" && typeof x.degree === "number" && typeof x.onset === "number" && typeof x.octave === "number";
};
var isIntervalArray = x => {
  return Array.isArray(x) && x.every(el => el instanceof Interval);
};
var DEGREE_TO_OFFSET = [0, 2, 4, 5, 7, 9, 11];

class EnumIntervalProperty extends _Enum__WEBPACK_IMPORTED_MODULE_1__.Enum {
  static get PERFECT() {
    return new EnumIntervalProperty("P");
  }

  static get MAJOR() {
    return new EnumIntervalProperty("M");
  }

  static get MINOR() {
    return new EnumIntervalProperty("m");
  }

  static get AUGMENTED() {
    return new EnumIntervalProperty("A");
  }

  static get DIMINISHED() {
    return new EnumIntervalProperty("d");
  }

  static byAbb(abbIn) {
    var name = this.abbMap[abbIn];
    if (name) return EnumIntervalProperty[name];
    throw new SyntaxError("No such interval property with abbreviation ".concat(abbIn, "."));
  }

  constructor(abbIn) {
    super();
    this.abb = void 0;
    this.abb = abbIn;
    return this;
  }

  name() {
    return EnumIntervalProperty.abbMap[this.abb];
  }

  toString() {
    return this.name();
  }

  equals(propertyIn) {
    return propertyIn instanceof EnumIntervalProperty && this.abb === propertyIn.abb;
  }

}

EnumIntervalProperty.indexes = ["PERFECT", "MAJOR", "MINOR", "AUGMENTED", "DIMINISHED"];
EnumIntervalProperty.abbMap = {
  P: "PERFECT",
  M: "MAJOR",
  m: "MINOR",
  A: "AUGMENTED",
  d: "DIMINISHED"
};
class Interval {
  static getOffsetFromProperty(propertyIn, degreeIn) {
    var degree = typeof degreeIn === "number" ? (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1 : 1;

    if (degree === 1 || degree === 4 || degree === 5) {
      if (propertyIn.equals(EnumIntervalProperty.PERFECT)) return 0;
      if (propertyIn.equals(EnumIntervalProperty.AUGMENTED)) return 1;
      if (propertyIn.equals(EnumIntervalProperty.DIMINISHED)) return -1;
    } else {
      if (propertyIn.equals(EnumIntervalProperty.MAJOR)) return 0;
      if (propertyIn.equals(EnumIntervalProperty.MINOR)) return -1;
      if (propertyIn.equals(EnumIntervalProperty.AUGMENTED)) return 1;
      if (propertyIn.equals(EnumIntervalProperty.DIMINISHED)) return -2;
    }

    return 0;
  }

  static getPropertyFromOffset(onsetIn, degreeIn) {
    var degree = typeof degreeIn === "number" ? (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1 : 1;

    if (degree === 1 || degree === 4 || degree === 5) {
      if (onsetIn === 0) return EnumIntervalProperty.PERFECT;
      if (onsetIn === 1) return EnumIntervalProperty.AUGMENTED;
      if (onsetIn === -1) return EnumIntervalProperty.DIMINISHED;
    } else {
      if (onsetIn === 0) return EnumIntervalProperty.MAJOR;
      if (onsetIn === -1) return EnumIntervalProperty.MINOR;
      if (onsetIn === 1) return EnumIntervalProperty.AUGMENTED;
      if (onsetIn === -2) return EnumIntervalProperty.DIMINISHED;
    }

    return null;
  }

  static getOffsetFromDegree(degreeIn) {
    return typeof degreeIn === "number" ? DEGREE_TO_OFFSET[(0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7)] + 12 * Math.floor((degreeIn - 1) / 7) : 0;
  }
  /**
   * Returns Unison
   * @memberof Interval
   */


  constructor(first, second, third) {
    this.degree = void 0;
    this.onset = void 0;
    this.octave = void 0;
    this.degree = 0;
    this.onset = 0;
    this.octave = 0;

    if (isInterval(first)) {
      this.degree = Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["floorMod"])(first.degree - 1, 7) + 1;
      this.onset = first.onset || 0;
      this.octave = Math.floor((first.octave - 1) / 7) + (third || 0);
    } else if (typeof first === "string") {
      this.fromString(first);
    } else if (typeof first === "number") {
      this.degree = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(first - 1, 7) + 1;
      this.onset = second || 0;
      this.octave = Math.floor((first - 1) / 7) + (third || 0);
    }

    return this;
  }

  static fromString(nameIn) {
    var matched = Interval.REGEX.exec(nameIn);
    if (matched === null) throw new SyntaxError("No such interval ".concat(nameIn, "."));
    var degree = parseInt(matched[2]);
    var onset = Interval.getOffsetFromProperty(EnumIntervalProperty.byAbb(matched[1]), degree);
    var octave = parseInt(matched[3]) || 0;
    return {
      degree,
      onset,
      octave
    };
  }

  fromString(nameIn) {
    var _Interval$fromString = Interval.fromString(nameIn),
        degree = _Interval$fromString.degree,
        onset = _Interval$fromString.onset,
        octave = _Interval$fromString.octave;

    this.degree = degree;
    this.onset = onset;
    this.octave = octave;
    return this;
  }

  static fromOffset(offsetIn) {
    var degree = 0;
    var onset = 0;
    var octave = Math.floor(offsetIn / 12);

    for (var i = 0; i < DEGREE_TO_OFFSET.length; i++) {
      if (DEGREE_TO_OFFSET[i] === (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12)) {
        degree = i + 1;
        onset = 0;
        break;
      } else if (DEGREE_TO_OFFSET[i] === (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12) + 1) {
        degree = i + 1;
        onset = -1;
        break;
      }
    }

    return {
      degree,
      onset,
      octave
    };
  }

  fromOffset(offsetIn) {
    var _Interval$fromOffset = Interval.fromOffset(offsetIn),
        degree = _Interval$fromOffset.degree,
        onset = _Interval$fromOffset.onset,
        octave = _Interval$fromOffset.octave;

    this.degree = degree;
    this.onset = onset;
    this.octave = octave;
    return this;
  }

  static fromRatio(ratioIn) {
    var offset = Math.round(Math.log(ratioIn) / Math.log(_Frequency__WEBPACK_IMPORTED_MODULE_2__.Frequency.SEMITONE));
    return new Interval(offset);
  }

  add(iIn) {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree + iIn.degree - 1 - 1, 7) + 1;
    i.onset = this.offset - 12 * this.octave + iIn.offset - 12 * iIn.octave - Interval.getOffsetFromDegree(this.degree + iIn.degree - 1);
    i.octave = this.octave + iIn.octave + Math.floor((this.degree + iIn.degree - 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(iIn) {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree - iIn.degree + 1 - 1, 7) + 1;
    i.onset = this.offset - 12 * this.octave - (iIn.offset - 12 * iIn.octave) - Interval.getOffsetFromDegree(this.degree - iIn.degree + 1);
    i.octave = this.octave - iIn.octave + Math.floor((this.degree - iIn.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  static sub(a, b) {
    return a.clone().sub(b);
  }

  equals(intervalIn) {
    return isInterval(intervalIn) && this.degree === intervalIn.degree && this.onset === intervalIn.onset && this.octave === intervalIn.octave;
  }

  compareTo(iIn) {
    return Interval.compare(this, iIn);
  }

  static compare(x, y) {
    return x.offset - y.offset;
  }

  reverse() {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(1 - this.degree, 7) + 1;
    i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
    i.octave = 0 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  octaveReverse() {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(1 - this.degree, 7) + 1;
    i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
    i.octave = 1 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  get offset() {
    return DEGREE_TO_OFFSET[(0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree - 1, 7)] + 12 * Math.floor((this.degree - 1) / 7) + this.onset + 12 * this.octave;
  }

  get ratio() {
    return Math.pow(_Frequency__WEBPACK_IMPORTED_MODULE_2__.Frequency.SEMITONE, this.offset);
  }

  get property() {
    return Interval.getPropertyFromOffset(this.onset, this.degree);
  }

  static fromArray() {
    for (var _len = arguments.length, arrayIn = new Array(_len), _key = 0; _key < _len; _key++) {
      arrayIn[_key] = arguments[_key];
    }

    return arrayIn.map(e => new Interval(e));
  }

  toString() {
    var sOnset = this.property ? this.property.abb : (this.onset > 0 ? "+" : "") + this.onset.toString() + "_";
    var sOctave = this.octave > 0 ? "+" + this.octave : this.octave < 0 ? this.octave : "";
    return sOnset + this.degree + sOctave;
  }

  clone() {
    return new Interval(this);
  }

}
Interval.REGEX = /^([PMmAd])([0-9]+)((\+|-)\d+)?$/;

/***/ }),

/***/ "./src/Note.ts":
/*!*********************!*\
  !*** ./src/Note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumNote": () => (/* binding */ EnumNote),
/* harmony export */   "isNote": () => (/* binding */ isNote),
/* harmony export */   "isNoteArray": () => (/* binding */ isNoteArray),
/* harmony export */   "Note": () => (/* binding */ Note)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





class EnumNote extends _Enum__WEBPACK_IMPORTED_MODULE_2__.Enum {
  static get C() {
    return new EnumNote(0);
  }

  static get D() {
    return new EnumNote(2);
  }

  static get E() {
    return new EnumNote(4);
  }

  static get F() {
    return new EnumNote(5);
  }

  static get G() {
    return new EnumNote(7);
  }

  static get A() {
    return new EnumNote(9);
  }

  static get B() {
    return new EnumNote(11);
  }

  constructor(offsetIn) {
    super();
    this.offset = void 0;
    this.offset = offsetIn;
    return this;
  }

  static byOffset(offsetIn) {
    if (typeof offsetIn !== "number") return null;
    var name = EnumNote.offsetMap[(0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with offset ".concat(offsetIn, "."));
  }

  static byIndex(indexIn) {
    if (typeof indexIn !== "number") return null;
    var name = EnumNote.indexes[(0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(indexIn, 7)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with index ".concat(indexIn, "."));
  }

  name() {
    return EnumNote.offsetMap[this.offset];
  }

  get index() {
    return _Interval__WEBPACK_IMPORTED_MODULE_1__.DEGREE_TO_OFFSET.indexOf(this.offset);
  }

  ordinal() {
    return this.index;
  }

  equals(noteIn) {
    return noteIn instanceof EnumNote && noteIn.offset === this.offset;
  }

}
EnumNote.indexes = ["C", "D", "E", "F", "G", "A", "B"];
EnumNote.offsetMap = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B"
};
EnumNote.c = EnumNote.C;
EnumNote.d = EnumNote.D;
EnumNote.e = EnumNote.E;
EnumNote.f = EnumNote.F;
EnumNote.g = EnumNote.G;
EnumNote.a = EnumNote.A;
EnumNote.b = EnumNote.B;
var isNote = x => {
  return x instanceof Note || typeof x === "object" && x.enumNote instanceof EnumNote && typeof x.alteration === "number";
};
var isNoteArray = x => {
  return Array.isArray(x) && x.every(el => el instanceof Note);
};
class Note {
  /**
   * Returns C
   * @memberof Note
   */

  /**
   * New note
   * @param {EnumNote} noteIn
   * @param {number} [alteration]
   * @memberof Note
   */

  /**
   * Gives a new Note instance (clone)
   * @param {INote} noteIn
   * @memberof Note
   */

  /**
   * Parses note string.
   * @example
   * new Note("##E");
   * @throws {SyntaxError} when parse failed
   * @param {string} noteIn
   * @memberof Note
   */

  /**
   * Creates an instance of Note.
   * @param {number} offset
   * @param {number} [alteration]
   * @memberof Note
   */
  constructor(first, second) {
    this.enumNote = void 0;
    this.alteration = void 0;
    this.enumNote = EnumNote.C;
    this.alteration = 0;
    this.become(first, second);
  }

  become(first, second) {
    if (first instanceof EnumNote) {
      this.enumNote = first;
      if (second) this.alteration = second;
    } else if (isNote(first)) {
      this.enumNote = first.enumNote;
      this.alteration = first.alteration;
    } else if (typeof first === "string") {
      this.fromString(first);
    } else if (typeof first === "number") {
      this.fromOffset(first, second);
    }

    return this;
  }

  static fromString(nameIn) {
    var matched = Note.REGEX.exec(nameIn);
    if (matched === null) throw new SyntaxError("No such note ".concat(nameIn, "."));
    var enumNote = EnumNote[matched[2]];
    var alteration = 0;
    matched[1].split("").forEach(c => alteration += c === "#" ? 1 : -1);
    return {
      enumNote,
      alteration
    };
  }

  fromString(nameIn) {
    var _Note$fromString = Note.fromString(nameIn),
        enumNote = _Note$fromString.enumNote,
        alteration = _Note$fromString.alteration;

    this.enumNote = enumNote;
    this.alteration = alteration;
    return this;
  }

  static fromOffset(offsetIn, alterationIn) {
    var note = (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12);
    var offset = 11;

    for (var i = _Interval__WEBPACK_IMPORTED_MODULE_1__.DEGREE_TO_OFFSET.length - 1; i >= 0; i--) {
      var el = _Interval__WEBPACK_IMPORTED_MODULE_1__.DEGREE_TO_OFFSET[i];

      if (el <= note) {
        offset = el;
        break;
      }
    }

    var enumNote = EnumNote.byOffset(offset);
    var alteration = note - offset;
    if (alterationIn) alteration += alterationIn;
    return {
      enumNote,
      alteration
    };
  }

  fromOffset(offsetIn, alterationIn) {
    var _Note$fromOffset = Note.fromOffset(offsetIn, alterationIn),
        enumNote = _Note$fromOffset.enumNote,
        alteration = _Note$fromOffset.alteration;

    this.enumNote = enumNote;
    this.alteration = alteration;
    return this;
  }

  static ratioToOffset(ratio) {
    return Math.round(Math.log(ratio) / Math.log(_Frequency__WEBPACK_IMPORTED_MODULE_3__["Frequency"].SEMITONE));
  }

  static offsetToRatio(offset) {
    return Math.pow(_Frequency__WEBPACK_IMPORTED_MODULE_3__["Frequency"].SEMITONE, offset);
  }

  add(first) {
    if (typeof first === "number") return this.fromOffset(this.offset + first);
    if (first instanceof Note) return this.become(first);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval) i = iIn;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index + i.degree - 1);
    this.alteration += i.offset - 12 * i.octave - (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(newEnumNote.offset - this.enumNote.offset, 12);
    this.enumNote = newEnumNote;
    return this;
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(first) {
    if (typeof first === "number") return this.fromOffset(this.offset - first);
    if (first instanceof Note) return this.become(first);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval) i = iIn;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index - i.degree + 1);
    this.alteration += i.offset - 12 * i.octave - (0,_Utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.enumNote.offset - newEnumNote.offset, 12);
    this.enumNote = newEnumNote;
    return this;
  }

  static sub(a, b) {
    return a.clone().sub(b);
  }

  mul(fIn) {
    return this.add(Note.ratioToOffset(fIn));
  }

  static mul(a, b) {
    return a.clone().mul(b);
  }

  div(first) {
    if (first instanceof Note) return Note.offsetToRatio(this.offset - first.offset);
    return this.mul(1 / first);
  }

  static div(a, b) {
    if (typeof b === "number") return a.clone().div(b);
    return a.clone().div(b);
  }

  equals(noteIn) {
    return isNote(noteIn) && this.enumNote.equals(noteIn.enumNote) && this.alteration === noteIn.alteration;
  }

  compareTo(that) {
    return Note.compare(this, that);
  }

  static compare(x, y) {
    return x.offset - y.offset;
  }

  getInterval(noteIn) {
    var that = noteIn instanceof Note && noteIn.constructor === Note ? noteIn : new Note(noteIn);
    var degree = that.enumNote.index - this.enumNote.index + 1;
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval.getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval(degree, onset, octave);
  }

  getDistance(that) {
    var distance = Math.abs(this.offset - that.offset);
    return distance > 6 ? 12 - distance : distance;
  }

  get offset() {
    return this.enumNote.offset + this.alteration;
  }

  static fromArray() {
    for (var _len = arguments.length, arrayIn = new Array(_len), _key = 0; _key < _len; _key++) {
      arrayIn[_key] = arguments[_key];
    }

    return arrayIn.map(e => new Note(e));
  }

  toString() {
    return (this.alteration > 0 ? "#" : "b").repeat(Math.abs(this.alteration)) + this.enumNote.name();
  }

  clone() {
    return new Note(this);
  }

  getTendancy(that) {
    var d = this.getDistance(that);
    return d === 0 || d > 2 ? 0 : 1 / d;
  }

  getStability(that) {
    var d = this.getDistance(that);

    var _fraction = _slicedToArray(new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](_Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"].fromOffset(d)).fraction, 2),
        f = _fraction[1];

    return 1 / f;
  }

}
Note.REGEX = /^([b#]*)([a-gA-G])$/;

/***/ }),

/***/ "./src/Pitch.ts":
/*!**********************!*\
  !*** ./src/Pitch.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPitch": () => (/* binding */ isPitch),
/* harmony export */   "isPitchArray": () => (/* binding */ isPitchArray),
/* harmony export */   "Pitch": () => (/* binding */ Pitch)
/* harmony export */ });
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isPitch = x => {
  return x instanceof Pitch || typeof x === "object" && x.enumNote instanceof _Note__WEBPACK_IMPORTED_MODULE_0__.EnumNote && typeof x.alteration === "number" && typeof x.octave === "number";
};
var isPitchArray = x => {
  return Array.isArray(x) && x.every(el => el instanceof Pitch);
};
class Pitch extends _Note__WEBPACK_IMPORTED_MODULE_0__.Note {
  static fromFrequency(f) {
    return new Pitch(69 + 12 * (Math.log(f / _Frequency__WEBPACK_IMPORTED_MODULE_2__.Frequency.A440) / Math.log(2)));
  }

  /**
   * Creates an instance of Pitch with index
   * @param {number} pitchIn
   * @memberof Pitch
   */
  constructor(first, second) {
    super();
    this.octave = void 0;
    this.become(first, second);
  }

  become(first, second) {
    if (isPitch(first)) {
      super.become(first);
      this.octave = first.octave;
    } else if (first instanceof _Note__WEBPACK_IMPORTED_MODULE_0__.EnumNote) {
      super(first);

      _defineProperty(this, "octave", void 0);

      this.octave = second || 0;
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_0__.isNote)(first)) {
      super(first);

      _defineProperty(this, "octave", void 0);

      this.octave = second || 0;
    } else if (typeof first === "string") {
      super.become();
      this.fromString(first);
    } else if (typeof first === "number") {
      super.become(first);
      this.octave = Math.floor(first / 12 - 1);
    } else {
      super.become();
    }

    return this;
  }

  get frequency() {
    return _Frequency__WEBPACK_IMPORTED_MODULE_2__["Frequency"].A440 * Math.pow(2, (this.offset - 69) / 12);
  }

  static fromString(nameIn) {
    var matched = Pitch.REGEX.exec(nameIn);
    if (matched === null) throw new SyntaxError("No such pitch ".concat(nameIn, "."));
    var octave = parseInt(matched[2]) || 0;
    return _objectSpread(_objectSpread({}, _Note__WEBPACK_IMPORTED_MODULE_0__.Note.fromString(matched[1])), {}, {
      octave
    });
  }

  fromString(nameIn) {
    var _Pitch$fromString = Pitch.fromString(nameIn),
        enumNote = _Pitch$fromString.enumNote,
        alteration = _Pitch$fromString.alteration,
        octave = _Pitch$fromString.octave;

    this.enumNote = enumNote;
    this.alteration = alteration;
    this.octave = octave;
    return this;
  }

  static fromOffset(offsetIn) {
    return _objectSpread(_objectSpread({}, super.fromOffset(offsetIn)), {}, {
      octave: Math.floor(offsetIn / 12 - 1)
    });
  }

  fromOffset(offsetIn) {
    var _Pitch$fromOffset = Pitch.fromOffset(offsetIn),
        enumNote = _Pitch$fromOffset.enumNote,
        alteration = _Pitch$fromOffset.alteration,
        octave = _Pitch$fromOffset.octave;

    this.enumNote = enumNote;
    this.alteration = alteration;
    this.octave = octave;
    return this;
  }

  add(iIn) {
    if (typeof iIn === "number") return this.fromOffset(this.offset + iIn);
    if (iIn instanceof Pitch) return this.mul(1 + iIn.frequency / this.frequency);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval) i = iIn;
    this.octave += Math.floor((this.enumNote.index + i.degree - 1) / 7) + i.octave;
    return super.add(i);
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(iIn) {
    if (typeof iIn === "number") return this.fromOffset(this.offset - iIn);
    if (iIn instanceof Pitch) return this.mul(1 - iIn.frequency / this.frequency);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval) i = iIn;
    this.octave += Math.floor((this.enumNote.index - i.degree + 1) / 7) - i.octave;
    return super.sub(i);
  }

  static sub(a, b) {
    return a.clone().sub(b);
  }

  mul(fIn) {
    var d = _Note__WEBPACK_IMPORTED_MODULE_0__["Note"].ratioToOffset(fIn);
    return this.add(d);
  }

  static mul(a, b) {
    return a.clone().mul(b);
  }

  div(first) {
    if (first instanceof Pitch) return this.frequency / first.frequency;
    return this.mul(1 / first);
  }

  static div(a, b) {
    if (typeof b === "number") return a.clone().div(b);
    return a.clone().div(b);
  }

  equals(pitchIn) {
    return super.equals(pitchIn) && isPitch(pitchIn) && this.octave === pitchIn.octave;
  }

  compareTo(pitchIn) {
    return Pitch.compare(this, pitchIn);
  }

  static compare(x, y) {
    return x.offset - y.offset;
  }

  getInterval(pitchIn) {
    if (!isPitch(pitchIn)) throw new TypeError("Cannot get Interval with other object than Pitch");
    var that = pitchIn instanceof Pitch ? pitchIn : new Pitch(pitchIn);
    var degree = that.enumNote.index - this.enumNote.index + 1 + (pitchIn.octave - this.octave) * 7;
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval.getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_1__.Interval(degree, onset, octave);
  }

  getDistance(that) {
    return Math.abs(this.offset - that.offset);
  }

  get offset() {
    return this.enumNote.offset + this.alteration + 12 * (this.octave + 1);
  }

  static fromArray() {
    for (var _len = arguments.length, arrayIn = new Array(_len), _key = 0; _key < _len; _key++) {
      arrayIn[_key] = arguments[_key];
    }

    return arrayIn.map(e => new Pitch(e));
  }

  toString() {
    return super.toString() + this.octave;
  }

  clone() {
    return new Pitch(this);
  }

  getTendancy(that) {
    return super.getTendancy(that);
  }

  getStability(that) {
    return super.getStability(that);
  }

}
Pitch.REGEX = /^([b#]*[a-gA-G])(-?\d+)?$/;
Pitch.MINIMUM = Pitch.fromFrequency(20);
Pitch.MAXIMUM = Pitch.fromFrequency(20000);

/***/ }),

/***/ "./src/Scale.ts":
/*!**********************!*\
  !*** ./src/Scale.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumScale": () => (/* binding */ EnumScale),
/* harmony export */   "isScale": () => (/* binding */ isScale),
/* harmony export */   "Scale": () => (/* binding */ Scale)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
var _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class EnumScale {
  static get MAJOR() {
    return new Scale("Major", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading");
  }

  static get MINOR() {
    return new Scale("Minor", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic");
  }

  static get PENTA() {
    return new Scale("Penta", "P1:Gong", "M2:Shang", "M3:Jiao", "P5:Zhi", "M6:Yu");
  }

  static get IONIAN() {
    return EnumScale.MAJOR;
  }

  static get DORIAN() {
    return new Scale("Dorian", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic");
  }

  static get PHRYGIAN() {
    return new Scale("Phrygian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic");
  }

  static get LYDIAN() {
    return new Scale("Lydian", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading");
  }

  static get MIXOLYDIAN() {
    return new Scale("Mixolydian", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic");
  }

  static get AEOLIAN() {
    return EnumScale.MINOR;
  }

  static get LOCRIAN() {
    return new Scale("Locrian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic");
  }

  static get ASCENDING_MELODIC_MINOR() {
    return new Scale("Ascending Melodic Minor", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "M7:Leading");
  }

  static get PHRYGIAN_MAJ6() {
    return new Scale("Phrygian M6", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "P4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic");
  }

  static get LYDIAN_AUG() {
    return new Scale("Lydian Augmented", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "A5:Dominant", "M6:Submediant", "M7:Leading");
  }

  static get LYDIAN_DOM() {
    return new Scale("Lydian Dominant", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "A4:Subdominant", "P5:Dominant", "M6:Submediant", "m7:Subtonic");
  }

  static get MIXOLYDIAN_MIN6() {
    return new Scale("Mixolydian m6", "P1:Tonic", "M2:Supertonic", "M3:Mediant", "P4:Subdominant", "P5:Dominant", "m6:Submediant", "m7:Subtonic");
  }

  static get LOCRIAN_MAJ2() {
    return new Scale("Locrian M2", "P1:Tonic", "M2:Supertonic", "m3:Mediant", "P4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic");
  }

  static get SUPER_LOCRIAN() {
    return new Scale("Super Locrian", "P1:Tonic", "m2:Supertonic", "m3:Mediant", "d4:Subdominant", "d5:Dominant", "m6:Submediant", "m7:Subtonic");
  }

}
var isScale = x => {
  return x instanceof Scale || typeof x === "object" && (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.isStringArray)(x.degreeNames) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
};
_Symbol$iterator = Symbol.iterator;
class Scale {
  constructor(first) {
    this.scaleName = void 0;
    this.intervals = void 0;
    this.degreeNames = void 0;

    if (typeof first === "string") {
      this.scaleName = first;
      this.intervals = [];
      this.degreeNames = [];

      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        var degreeName = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
        var split = degreeName.split(":");

        if (split.length === 2) {
          this.intervals[i] = new _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval(split[0]);
          this.degreeNames[i] = split[1];
        } else {
          this.intervals[i] = new _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval(degreeName);
          this.degreeNames[i] = degreeName;
        }
      }
    } else {
      this.scaleName = first.scaleName;
      this.intervals = first.intervals.map(i => i.clone());
      this.degreeNames = [...first.degreeNames];
    }

    return this;
  }

  get size() {
    return this.intervals.length;
  }

  addNote(noteIn) {
    var interval;
    var name;
    var split = noteIn.split(":");

    if (split.length === 2) {
      interval = new _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval(split[0]);
      name = split[1];
    } else {
      interval = new _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval(noteIn);
      name = noteIn;
    }

    this.intervals.push(interval);
    this.degreeNames.push(name);
    return this;
  }

  getIntervalFromIndex(index) {
    return this.intervals[index];
  }

  getIntervalFromDegree(degreeIn) {
    return this.intervals.find(interval => {
      return (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.floorMod)(degreeIn - 1, this.intervals.length) + 1 === interval.degree;
    });
  }

  get degrees() {
    return this.intervals.map(i => i.degree);
  }

  equals(scaleIn) {
    return isScale(scaleIn) && this.intervals.length === scaleIn.intervals.length && this.intervals.every((interval, i) => interval.equals(scaleIn.intervals[i])) && this.degreeNames.length === scaleIn.degreeNames.length && this.degreeNames.every((name, i) => name === scaleIn.degreeNames[i]);
  }

  getName() {
    return this.scaleName;
  }

  toString() {
    var s = this.scaleName ? "Scale \"".concat(this.scaleName, "\": {") : "Scale :{";

    for (var i = 0; i < this.intervals.length; i++) {
      var sI = this.intervals[i].toString();
      var sN = this.degreeNames[i];
      s += sI + (sN.length > 0 && sN !== sI ? ":" + sN : "");
      if (i !== this.intervals.length - 1) s += ", ";
    }

    s += "}";
    return s;
  }

  clone() {
    return new Scale(this);
  }

  [_Symbol$iterator]() {
    var _this = this;

    return (/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, interval;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = _this.intervals[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 12;
                  break;
                }

                interval = _step.value;
                _context.next = 9;
                return interval;

              case 9:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 21:
                _context.prev = 21;

                if (!_didIteratorError) {
                  _context.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context.finish(21);

              case 25:
                return _context.finish(18);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 14, 18, 26], [19,, 21, 25]]);
      })()
    );
  }

}

/***/ }),

/***/ "./src/TonalChord.ts":
/*!***************************!*\
  !*** ./src/TonalChord.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTonalChord": () => (/* binding */ isTonalChord),
/* harmony export */   "isTonalChordArray": () => (/* binding */ isTonalChordArray),
/* harmony export */   "TonalChord": () => (/* binding */ TonalChord)
/* harmony export */ });
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");



var isTonalChord = x => {
  return x instanceof TonalChord || typeof x.alteration === "number" && typeof x.degree === "number" && x.chord instanceof _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord;
};
var isTonalChordArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof TonalChord);
};
class TonalChord {
  constructor(first) {
    this.alteration = void 0;
    this.degree = void 0;
    this.chord = void 0;

    if (typeof first === "string") {
      var matched = TonalChord.REGEX1.exec(first);

      if (matched) {
        var s = matched[1];
        this.alteration = s === "#" ? 1 : s === "b" ? -1 : 0;
        s = matched[2];
        var p = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.parseRoman)(s);
        if (p !== 0 && p > 7 && p < -7) throw new Error("Roman number too large for degree.");
        this.degree = Math.abs(p);
        s = matched[3];
        this.chord = s.length === 0 ? p > 0 ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ : _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN : s === "+" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG : _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.DIM;
      } else {
        matched = TonalChord.REGEX2.exec(first);

        if (matched) {
          var _s = matched[1];
          this.alteration = _s === "#" ? 1 : _s === "b" ? -1 : 0;
          _s = matched[2];
          this.degree = +_s;
          _s = matched[3];
          this.chord = _s.length === 0 ? null : _s === "M" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ : _s === "m" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ : _s === "+" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG : _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.DIM;
        } else throw new Error("Input string error: " + first);
      }
    } else {
      this.alteration = first.alteration;
      this.degree = first.degree;
      this.chord = first.chord.clone();
    }

    return this;
  }

  getChord(tonalityIn) {
    var chord;
    if (this.chord) chord = new _Chord__WEBPACK_IMPORTED_MODULE_0__.Chord(tonalityIn.getNoteFromDegree(this.degree));else chord = tonalityIn.getTriad(this.degree);
    if (this.alteration === 1) chord.base.add(new _Interval__WEBPACK_IMPORTED_MODULE_2__.Interval("A1"));else if (this.alteration === -1) chord.base.sub(new _Interval__WEBPACK_IMPORTED_MODULE_2__.Interval("A1"));
    return chord;
  }

  equals(chordIn) {
    return isTonalChord(chordIn) && chordIn.alteration === this.alteration && chordIn.degree === this.degree && chordIn.chord.equals(this.chord);
  }

  toString() {
    var s = "";
    if (this.alteration === 1) s = "#";else if (this.alteration === -1) s = "b";
    if (!this.chord) return s + this.degree;
    s += (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.toRoman)(this.degree * (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN) ? -1 : 1));

    if (!this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ) && !this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN)) {
      if (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG)) s += "+";else if (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG)) s += "-";else s += this.chord.name().toLowerCase();
    }

    return s;
  }

  clone() {
    return new TonalChord(this);
  }

}
TonalChord.REGEX1 = /^([#b]?)(I{1,3}|i{1,3}|I?V|i?v|VI{1,2}|vi{1,2})(\+|-?)$/;
TonalChord.REGEX2 = /^([#b]?)([1-7])(M|m|\+|-?)$/;

/***/ }),

/***/ "./src/Tonality.ts":
/*!*************************!*\
  !*** ./src/Tonality.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTonality": () => (/* binding */ isTonality),
/* harmony export */   "Tonality": () => (/* binding */ Tonality)
/* harmony export */ });
/* harmony import */ var _Scale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scale */ "./src/Scale.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
var _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var isTonality = x => {
  return x instanceof Tonality || typeof x === "object" && (0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(x.note) && (0,_Scale__WEBPACK_IMPORTED_MODULE_0__.isScale)(x.scale);
};
_Symbol$iterator = Symbol.iterator;
class Tonality {
  constructor(first, second) {
    this.note = void 0;
    this.scale = void 0;

    if (isTonality(first)) {
      this.note = first.note.clone();
      this.scale = first.scale.clone();
    } else if (typeof first === "string") {
      try {
        this.note = new _Note__WEBPACK_IMPORTED_MODULE_1__.Note(first);
      } catch (e) {
        throw new Error("No such tonality: ".concat(first, "."));
      }

      this.scale = first.substr(first.length - 1).match("[A-G]") ? _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR : _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR;
    } else {
      this.note = first;
      this.scale = second;
    }

    return this;
  }

  add(intervalIn) {
    this.note.add(intervalIn);
    return this;
  }

  sub(intervalIn) {
    this.note.sub(intervalIn);
    return this;
  }

  get notes() {
    return this.scale.intervals.map(i => this.note.clone().add(i));
  }

  getNoteFromDegree(degreeIn) {
    return this.note.clone().add(this.scale.getIntervalFromDegree(degreeIn));
  }

  getTriad(degreeIn) {
    return new _Chord__WEBPACK_IMPORTED_MODULE_2__.Chord(this.getNoteFromDegree(degreeIn), this.getNoteFromDegree(degreeIn + 2), this.getNoteFromDegree(degreeIn + 4));
  }

  getTriads() {
    return this.scale.degrees.map(d => this.getTriad(d));
  }

  get triads() {
    return this.getTriads();
  }

  toRelative() {
    if (this.scale.equals(_Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR)) {
      this.note.sub(new _Interval__WEBPACK_IMPORTED_MODULE_3__.Interval("m3"));
      this.scale = _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR;
    } else if (this.scale.equals(_Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR)) {
      this.note.add(new _Interval__WEBPACK_IMPORTED_MODULE_3__.Interval("m3"));
      this.scale = _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR;
    } else throw new Error("Relative not found.");

    return this;
  }

  get relative() {
    return this.clone().toRelative();
  }

  toNext() {
    this.note.add(new _Interval__WEBPACK_IMPORTED_MODULE_3__.Interval("P5"));
    return this;
  }

  get next() {
    return this.clone().toNext();
  }

  toPrev() {
    this.note.sub(new _Interval__WEBPACK_IMPORTED_MODULE_3__.Interval("P5"));
    return this;
  }

  get prev() {
    return this.clone().toPrev();
  }

  toString() {
    return "".concat(this.note.toString(), " ").concat(this.scale.getName() || this.scale.toString());
  }

  clone() {
    return new Tonality(this);
  }

  [_Symbol$iterator]() {
    var _this = this;

    return (/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < _this.scale.size)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return _this.note.clone().add(_this.scale.intervals[i]);

              case 4:
                i++;
                _context.next = 1;
                break;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })()
    );
  }

}

/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gcd": () => (/* binding */ gcd),
/* harmony export */   "lcm": () => (/* binding */ lcm),
/* harmony export */   "floorMod": () => (/* binding */ floorMod),
/* harmony export */   "isStringArray": () => (/* binding */ isStringArray),
/* harmony export */   "isNumberArray": () => (/* binding */ isNumberArray),
/* harmony export */   "parseRoman": () => (/* binding */ parseRoman),
/* harmony export */   "toRoman": () => (/* binding */ toRoman)
/* harmony export */ });
var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
var lcm = (a, b) => a * (b / gcd(a, b));
var floorMod = (x, y) => (x % y + y) % y;
var isStringArray = x => {
  return Array.isArray(x) && x.every(e => typeof e === "string");
};
var isNumberArray = x => {
  return Array.isArray(x) && x.every(e => typeof e === "number");
};
var parseRoman = stringIn => {
  if (stringIn.length === 0) return 0;
  var c;
  if (stringIn.match(/[IVXLCDM]+/)) c = 1;else if (stringIn.match(/[ivxlcdm]+/)) c = -1;else throw new Error("Roman number error.");
  var string = stringIn.toUpperCase();

  if (!string.match(/(M{0,3})(C{1,3}|C?D|DC{1,3}|CM)?(X{1,3}|X?L|LX{1,3}|XC)?(I{1,3}|I?V|VI{1,3}|IX)?$/)) {
    throw new Error("Roman number error.");
  }

  var r = ["I", "V", "X", "L", "C", "D", "M"];
  var a = [1, 5, 10, 50, 100, 500, 1000];
  var rIn = string.split("");
  var aOut = [];

  for (var i = 0; i < rIn.length; i++) {
    for (var j = 0; j < r.length; j++) {
      if (rIn[i] === r[j]) aOut[i] = a[j];
    }
  }

  var sum = aOut[0];

  for (var _i = 0; _i < rIn.length - 1; _i++) {
    if (aOut[_i] >= aOut[_i + 1]) {
      sum += aOut[_i + 1];
    } else {
      sum = sum + aOut[_i + 1] - 2 * aOut[_i];
    }
  }

  return sum * c;
};
var toRoman = nIn => {
  var n = Math.round(Math.abs(nIn));
  if (n > 3999 || n === 0) throw new Error("Too large or Too small for Roman Number.");
  var a = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var r = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  var rOut = "";

  for (var i = 0; i < a.length; i++) {
    while (n >= a[i]) {
      rOut += r[i];
      n -= a[i];
    }
  }

  return nIn > 0 ? rOut : rOut.toLowerCase();
};
var getValueFromCurve = (t0, t1, t, exp) => t0 + (t1 - t0) * Math.pow(t, Math.pow(2, exp));
/**
 * Get a fraction typle from a floating number.
 *
 * @param {number} v Floating number
 * @param {number} [approx=Frequency.THRES_AUDIT] Approximation ratio (> 1)
 * @returns {number[]} fraction tuple
 */

var nearestFraction = function nearestFraction(v) {
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__["Frequency"].THRES_AUDIT;
  return nearestFractions([1, v], approxIn);
};
var nearestFractions = function nearestFractions(ratio) {
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__["Frequency"].THRES_AUDIT;
  if (ratio.length < 2) return ratio.map(() => 1);
  var approx = approxIn;
  var iApprox = 1 / approx;

  if (iApprox > approx) {
    var _ref = [approx, iApprox];
    iApprox = _ref[0];
    approx = _ref[1];
  }

  var div = 0;
  var ref;
  var factor = [];
  var iFactor = [];
  var delta = [];

  do {
    ref = ratio[0] / ++div;
    factor[0] = div;
    iFactor[0] = div;
    delta[0] = 1;

    for (var i = 1; i < ratio.length; i++) {
      factor[i] = ratio[i] / ref;
      iFactor[i] = Math.round(factor[i]);
      delta[i] = iFactor[i] / factor[i];
    }
  } while (!delta.every(d => iApprox < d && d < approx));

  return iFactor;
};
var nearestReciprocal = function nearestReciprocal(ratio) {
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__["Frequency"].THRES_AUDIT;
  return nearestReciprocals([ratio, 1], approxIn);
};
var nearestReciprocals = function nearestReciprocals(ratio) {
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__["Frequency"].THRES_AUDIT;
  if (ratio.length < 2) return ratio.map(() => 1);
  var approx = approxIn;
  var iApprox = 1 / approx;

  if (iApprox > approx) {
    var _ref2 = [approx, iApprox];
    iApprox = _ref2[0];
    approx = _ref2[1];
  }

  var mul = 0;
  var ref;
  var factor = [];
  var iFactor = [];
  var delta = [];

  do {
    ref = ratio[0] * ++mul;
    factor[0] = mul;
    iFactor[0] = mul;
    delta[0] = 1;

    for (var i = 1; i < ratio.length; i++) {
      factor[i] = ref / ratio[i];
      iFactor[i] = Math.round(factor[i]);
      delta[i] = iFactor[i] / factor[i];
    }
  } while (!delta.every(d => iApprox < d && d < approx));

  return iFactor;
}; // eslint-disable-next-line arrow-parens

var permutations = array => {
  var length = array.length;
  var result = [array.slice()];
  var c = new Array(length).fill(0);
  var i = 1;
  var k;
  var p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      var permutation = array.slice();
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      c[i]++;
      i = 1;
      result.push(permutation);
    } else {
      c[i] = 0;
      i++;
    }
  }

  return result;
}; // eslint-disable-next-line arrow-parens

var permute = (array, random) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = random ? random.randint(0, i + 1) : ~~(Math.random() * (i + 1));
    var _ref3 = [array[j], array[i]];
    array[i] = _ref3[0];
    array[j] = _ref3[1];
  }

  return array;
}; // eslint-disable-next-line arrow-parens

var combinations = array => {
  var length = array.length;

  var helper = ($, current, result) => {
    for (var i = $; i < length; i++) {
      var next = current.slice().concat(array[i]);
      result.push(next);
      if ($ < length - 1) helper(i + 1, next, result);
    }

    return result;
  };

  return helper(0, [], []);
}; // eslint-disable-next-line arrow-parens

var randomCombination = (array, random) => {
  return array.filter(() => random ? !!random.randint(0, 1) : Math.random() < 0.5);
};

/***/ }),

/***/ "./src/Velocity.ts":
/*!*************************!*\
  !*** ./src/Velocity.ts ***!
  \*************************/
/*! exports provided: isVelocity, EnumVelocity, Velocity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVelocity", function() { return isVelocity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumVelocity", function() { return EnumVelocity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Velocity", function() { return Velocity; });
var isVelocity = x => {
  return x instanceof Velocity || typeof x === "object" && typeof x.velocity === "number";
};
class EnumVelocity {
  static get SILENT() {
    return new Velocity(0);
  }

  static get PPP() {
    return new Velocity(10);
  }

  static get PP() {
    return new Velocity(25);
  }

  static get PIANISSIMO() {
    return new Velocity(25);
  }

  static get P() {
    return new Velocity(50);
  }

  static get MP() {
    return new Velocity(60);
  }

  static get MEZZO_PIANO() {
    return new Velocity(60);
  }

  static get MF() {
    return new Velocity(70);
  }

  static get MEZZO_FORTE() {
    return new Velocity(70);
  }

  static get F() {
    return new Velocity(85);
  }

  static get FORTE() {
    return new Velocity(85);
  }

  static get FF() {
    return new Velocity(100);
  }

  static get FORTISSIMO() {
    return new Velocity(100);
  }

  static get FFF() {
    return new Velocity(120);
  }

}
class Velocity {
  constructor(velocityIn) {
    this._velocity = void 0;
    if (typeof velocityIn === "number") this.velocity = velocityIn;else this.velocity = velocityIn.velocity;
    return this;
  }

  get velocity() {
    return this._velocity;
  }

  set velocity(value) {
    this._velocity = Math.max(0, Math.min(128, ~~value));
  }

  add(that) {
    this.velocity += that.velocity;
    return this;
  }

  sub(that) {
    this.velocity -= that.velocity;
    return this;
  }

  mul(fIn) {
    this.velocity *= fIn;
    return this;
  }

  div(that) {
    if (typeof that === "number") {
      this.velocity /= that;
      return this;
    }

    return this.velocity /= that.velocity;
  }

  equals(that) {
    return isVelocity(that) && this.velocity === that.velocity;
  }

  compareTo(that) {
    return this.velocity - that.velocity;
  }

  normalize() {
    return this.velocity / 128;
  }

  clone() {
    return new Velocity(this);
  }

  toString() {
    return "Vel: ".concat(this.velocity);
  }

}

/***/ }),

/***/ "./src/effect/Automation.ts":
/*!**********************************!*\
  !*** ./src/effect/Automation.ts ***!
  \**********************************/
/*! exports provided: isAutomation, isAutomationArray, Automation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAutomation", function() { return isAutomation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAutomationArray", function() { return isAutomationArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Automation", function() { return Automation; });
/* harmony import */ var _AutomationPoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutomationPoint */ "./src/effect/AutomationPoint.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");


var isAutomation = x => {
  return x instanceof Automation || typeof x.path === "string" && Object(_AutomationPoint__WEBPACK_IMPORTED_MODULE_0__["isAutomationPointArray"])(x.points);
};
var isAutomationArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof Automation);
};
class Automation {
  constructor(first, points) {
    this.path = void 0;
    this.points = void 0;

    if (typeof first === "string") {
      this.path = first;
      this.points = points ? points.map(e => e.clone()) : [];
    } else {
      this.path = first.path;
      this.points = first.points.map(e => e.clone());
    }

    return this;
  }

  getValueAtTime(time) {
    this.sort();
    var prev;
    var next;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var p = _step.value;
        if (p.offset.compareTo(time) < 0) prev = p;

        if (p.offset.compareTo(time) > 0) {
          next = p;
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!prev) return next.value;
    if (!next) return prev.value;

    if (prev && next) {
      var duration = next.offset.clone().sub(prev.offset);
      var split = time.clone().sub(prev.offset);
      var ratio = split.div(duration);
      return Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["getValueFromCurve"])(prev.value, next.value, ratio, prev.exponent);
    }

    throw new Error("No point in automation: ".concat(this.path));
  }

  addPointAtTime(time) {
    this.points.push(new _AutomationPoint__WEBPACK_IMPORTED_MODULE_0__["AutomationPoint"](this.getValueAtTime(time), time, 0));
  }

  sort() {
    this.points = this.points.sort((a, b) => a.offset.compareTo(b.offset));
  }

  forward(duration) {
    this.points.forEach(p => p.offset.add(duration));
  }

  rewind(duration) {
    this.points.forEach(p => p.offset.sub(duration));
  }

  toString() {
    return "Automation: \"".concat(this.path, "\": {").concat(this.points.map(p => "".concat(p.value.toFixed(2), "@").concat(p.offset.toString())).join(), "}");
  }

  clone() {
    return new Automation(this);
  }

}

/***/ }),

/***/ "./src/effect/AutomationPoint.ts":
/*!***************************************!*\
  !*** ./src/effect/AutomationPoint.ts ***!
  \***************************************/
/*! exports provided: isAutomationPoint, isAutomationPointArray, AutomationPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAutomationPoint", function() { return isAutomationPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAutomationPointArray", function() { return isAutomationPointArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutomationPoint", function() { return AutomationPoint; });
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Duration */ "./src/Duration.ts");

var isAutomationPoint = x => {
  return x instanceof AutomationPoint || typeof x.value === "number" && Object(_Duration__WEBPACK_IMPORTED_MODULE_0__["isDuration"])(x.offset) && typeof x.exponent === "number";
};
var isAutomationPointArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof AutomationPoint);
};
class AutomationPoint {
  constructor(first, offset, exponent) {
    this.value = void 0;
    this.offset = void 0;
    this.exponent = void 0;

    if (typeof first === "number") {
      this.value = first;
      this.offset = offset.clone();
      this.exponent = exponent || 0;
    } else {
      this.value = first.value;
      this.offset = first.offset;
      this.exponent = first.exponent;
    }

    return this;
  }

  clone() {
    return new AutomationPoint(this);
  }

}

/***/ }),

/***/ "./src/genre/ChordProgression.ts":
/*!***************************************!*\
  !*** ./src/genre/ChordProgression.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isChordProgression": () => (/* binding */ isChordProgression),
/* harmony export */   "ChordProgression": () => (/* binding */ ChordProgression)
/* harmony export */ });
/* harmony import */ var _TonalChord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TonalChord */ "./src/TonalChord.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils */ "./src/Utils.ts");
var _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isChordProgression = x => {
  return x instanceof ChordProgression || typeof x === "object" && (0,_TonalChord__WEBPACK_IMPORTED_MODULE_0__.isTonalChord)(x.chord);
};
_Symbol$iterator = Symbol.iterator;
class ChordProgression {
  constructor(cp) {
    _defineProperty(this, "chords", void 0);

    if (typeof cp === "string") {
      var chords = cp.split(/\s+/);
      this.fromStringArray(chords);
    } else if ((0,_Utils__WEBPACK_IMPORTED_MODULE_1__.isStringArray)(cp)) {
      this.fromStringArray(cp);
    } else if ((0,_TonalChord__WEBPACK_IMPORTED_MODULE_0__.isTonalChordArray)(cp)) {
      this.chords = cp.map(c => c.clone());
    } else {
      this.chords = cp.chords.map(c => c.clone());
    }

    return this;
  }

  getChords(tonalityIn) {
    return this.chords.map(c => c.getChord(tonalityIn));
  }

  fromString(chords) {
    return chords.split(/\s+/).map(s => new _TonalChord__WEBPACK_IMPORTED_MODULE_0__["TonalChord"](s));
  }

  fromStringArray(chords) {
    if (chords.length < 2) throw new Error("Input string not enough long.");
    this.chords = chords.map(s => new _TonalChord__WEBPACK_IMPORTED_MODULE_0__.TonalChord(s));
  }

  toString() {
    return "ChordProgression: {".concat(this.chords.map(tc => tc.toString()).join(" "), "}");
  }

  clone() {
    return new ChordProgression(this);
  }

  [_Symbol$iterator]() {
    var _this = this;

    return (/*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chord;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = _this.chords[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 12;
                  break;
                }

                chord = _step.value;
                _context.next = 9;
                return chord;

              case 9:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 21:
                _context.prev = 21;

                if (!_didIteratorError) {
                  _context.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context.finish(21);

              case 25:
                return _context.finish(18);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 14, 18, 26], [19,, 21, 25]]);
      })()
    );
  }

}

/***/ }),

/***/ "./src/genre/EnumChordProgression.ts":
/*!*******************************************!*\
  !*** ./src/genre/EnumChordProgression.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumChordProgression": () => (/* binding */ EnumChordProgression)
/* harmony export */ });
/* harmony import */ var _ChordProgression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChordProgression */ "./src/genre/ChordProgression.ts");

class EnumChordProgression {}
EnumChordProgression.PERFECT = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("IV V I");
EnumChordProgression.REV_ANDAL = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("bVI bVII I");
EnumChordProgression.CANON = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("I V vi iii IV I");
EnumChordProgression.POP1 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("IV V iii vi");
EnumChordProgression.POP2 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("I vi IV V");
EnumChordProgression.POP3 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("I V vi IV");
EnumChordProgression.EPIC1 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("vi IV I V");
EnumChordProgression.EPIC2 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("vi I V ii");
EnumChordProgression.EDM1 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("IV I vi V");
EnumChordProgression.EDM2 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("IV V vi I");
EnumChordProgression.TRAP1 = new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__["ChordProgression"]("vi I IV III");

/***/ }),

/***/ "./src/genre/Random.ts":
/*!*****************************!*\
  !*** ./src/genre/Random.ts ***!
  \*****************************/
/*! exports provided: Random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Random", function() { return Random; });
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(seedrandom__WEBPACK_IMPORTED_MODULE_0__);

class Random {
  constructor(seedIn) {
    this.prng = void 0;
    this.prng = seedrandom__WEBPACK_IMPORTED_MODULE_0__(seedIn || "");
    return this;
  }

  quick() {
    return this.prng.quick();
  }

  int32() {
    return this.prng.int32();
  }

  double() {
    return this.prng.double();
  }

  state() {
    return this.prng.state();
  }

  randint(minimum, maximum) {
    return Math.floor(this.quick() * (maximum - minimum + 1)) + minimum;
  }

}

/***/ }),

/***/ "./src/genre/modifier/HClipper.ts":
/*!****************************************!*\
  !*** ./src/genre/modifier/HClipper.ts ***!
  \****************************************/
/*! exports provided: HClipperRight, HClipperLeft, HClipper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HClipperRight", function() { return HClipperRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HClipperLeft", function() { return HClipperLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HClipper", function() { return HClipper; });
/* harmony import */ var _Modifier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modifier */ "./src/genre/modifier/Modifier.ts");
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Duration */ "./src/Duration.ts");


class HClipperRight extends _Modifier__WEBPACK_IMPORTED_MODULE_0__["Modifier"] {}

HClipperRight.use = (s, params) => {
  var duration = params.duration;
  var mode = params.mode || "clip";
  var end = duration.clone();
  s.notes.forEach((note, i) => {
    if (note.offset.compareTo(duration) >= 0) {
      s.notes[i] = null;
    } else {
      var noteEnd = note.offset.clone().add(note.duration);

      if (mode === "preserve") {
        if (noteEnd.compareTo(end) > 0) end = noteEnd;
      } else {
        if (noteEnd.compareTo(duration) > 0) {
          if (mode === "clip") note.duration = noteEnd.sub(duration);else if (mode === "remove") s.notes[i] = null;
        }
      }
    }
  });
  s.notes = s.notes.filter(e => e);
  s.duration = end;
  s.automations.forEach(a => {
    a.sort();
    var $oob = a.points.findIndex(p => p.offset.compareTo(end) > 0);
    if ($oob !== -1) a.points = a.points.slice(0, $oob);
  });
  return s;
};

class HClipperLeft extends _Modifier__WEBPACK_IMPORTED_MODULE_0__["Modifier"] {}

_defineProperty(EnumChordProgression, "PERFECT", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("IV V I"));

_defineProperty(EnumChordProgression, "REV_ANDAL", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("bVI bVII I"));

_defineProperty(EnumChordProgression, "CANON", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("I V vi iii IV I"));

_defineProperty(EnumChordProgression, "POP1", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("IV V iii vi"));

_defineProperty(EnumChordProgression, "POP2", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("I vi IV V"));

_defineProperty(EnumChordProgression, "POP3", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("I V vi IV"));

_defineProperty(EnumChordProgression, "EPIC1", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("vi IV I V"));

_defineProperty(EnumChordProgression, "EPIC2", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("vi I V ii"));

_defineProperty(EnumChordProgression, "EDM1", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("IV I vi V"));

_defineProperty(EnumChordProgression, "EDM2", new _ChordProgression__WEBPACK_IMPORTED_MODULE_0__.ChordProgression("IV V vi I"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* harmony import */ var _Scale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Scale */ "./src/Scale.ts");
/* harmony import */ var _Tonality__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tonality */ "./src/Tonality.ts");
/* harmony import */ var _genre_EnumChordProgression__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./genre/EnumChordProgression */ "./src/genre/EnumChordProgression.ts");
/* harmony import */ var _genre_Random__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./genre/Random */ "./src/genre/Random.ts");
/* harmony import */ var _track_TrackNote__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./track/TrackNote */ "./src/track/TrackNote.ts");
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Duration */ "./src/Duration.ts");
/* harmony import */ var _track_Segment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./track/Segment */ "./src/track/Segment.ts");
/* harmony import */ var _genre_modifier_HClipper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./genre/modifier/HClipper */ "./src/genre/modifier/HClipper.ts");
/* eslint-disable no-console */







new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("#G").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("C"));
console.log(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("#G").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("C")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("#C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("G")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("bC")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("#C")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("bB")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_1__.Note("#A")).toString());
var n = new _Note__WEBPACK_IMPORTED_MODULE_1__.Note(1);
console.log(n.toString());
var p = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("##F0");
console.log(p.add("A4").toString() + " " + p.offset);
var f = 440;
console.log(_Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch.fromFrequency(f).offset);
var c = new _Chord__WEBPACK_IMPORTED_MODULE_3__.Chord(new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("C1"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("bC2"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("#C1"));
console.log(c.toString());
console.log(new _Interval__WEBPACK_IMPORTED_MODULE_0__.Interval("M3").reverse().toString());
console.log(c.notes.toString());
console.log(c.contains(new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("#C1")));
var c1 = new _Chord__WEBPACK_IMPORTED_MODULE_3__.Chord(new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("C1"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("E1"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__.Pitch("G1"));
console.log(c1.getEnumChord());
var s = _Scale__WEBPACK_IMPORTED_MODULE_4__.EnumScale.MINOR;
console.log(s.toString());
console.log(new _Tonality__WEBPACK_IMPORTED_MODULE_5__.Tonality("C").toRelative().toString());
console.log(new _Tonality__WEBPACK_IMPORTED_MODULE_5__.Tonality("C").toPrev().toString());
console.log(new _Tonality__WEBPACK_IMPORTED_MODULE_5__.Tonality("C").toNext().toString());
console.log(_genre_EnumChordProgression__WEBPACK_IMPORTED_MODULE_6__.EnumChordProgression.EPIC1.toString());
})();

/******/ })()
;
//# sourceMappingURL=index.js.map