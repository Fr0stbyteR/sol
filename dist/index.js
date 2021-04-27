(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Sol"] = factory();
	else
		root["Sol"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Articulation.ts":
/*!*****************************!*\
  !*** ./src/Articulation.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArticulation": () => (/* binding */ isArticulation),
/* harmony export */   "EnumArticulation": () => (/* binding */ EnumArticulation),
/* harmony export */   "Articulation": () => (/* binding */ Articulation),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  static get ACCENT() {
    return new Articulation(1.2, 1);
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
  constructor(p1, lengthIn) {
    _defineProperty(this, "velocity", void 0);

    _defineProperty(this, "length", void 0);

    if (isArticulation(p1)) {
      this.velocity = p1.velocity;
      this.length = p1.length;
    } else {
      this.velocity = p1;
      this.length = lengthIn;
    }
  }

  clone() {
    return new Articulation(this);
  }

  toString() {
    return "Art: [Vel: ".concat(this.velocity, " Len: ").concat(this.length, "]");
  }

}

_defineProperty(Articulation, "isArticulation", isArticulation);

_defineProperty(Articulation, "EnumArticulation", EnumArticulation);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Articulation);

/***/ }),

/***/ "./src/Chord.ts":
/*!**********************!*\
  !*** ./src/Chord.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumChord": () => (/* binding */ EnumChord),
/* harmony export */   "isChord": () => (/* binding */ isChord),
/* harmony export */   "isChordArray": () => (/* binding */ isChordArray),
/* harmony export */   "Chord": () => (/* binding */ Chord),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var _Symbol$iterator;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class EnumChord extends _Enum__WEBPACK_IMPORTED_MODULE_3__.default {
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

  constructor(p1) {
    super();

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "intervals", void 0);

    if (typeof p1 === "string") {
      this._name = p1;

      for (var _len = arguments.length, intervalsIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        intervalsIn[_key - 1] = arguments[_key];
      }

      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(intervalsIn);
    } else {
      this._name = p1._name;
      this.intervals = p1.intervals.map(i => i.clone());
    }
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
    return isChord(chordIn) && "intervals" in chordIn && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(chordIn.intervals) && chordIn.intervals.length === this.intervals.length && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
  }

  clone() {
    return new EnumChord(this);
  }

}

_defineProperty(EnumChord, "indexes", ["MAJ", "MIN", "AUG", "DIM", "SUS2", "SUS", "SUS4", "DOM7", "MAJ7", "MINMAJ7", "MIN7", "AUGMAJ7", "AUG7", "DIMMIN7", "DIM7", "DOM7DIM5"]);

var isChord = x => {
  return x instanceof Chord || typeof x === "object" && (0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(x.base) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
};
var isChordArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof Chord);
};
_Symbol$iterator = Symbol.iterator;
class Chord {
  // Intervals from base

  /**
   * Gives a new Chord instance (clone)
   */

  /**
   * Construct chord by notes
   */

  /**
   * Construct chord by intervals
   */
  constructor(p1) {
    _defineProperty(this, "base", void 0);

    _defineProperty(this, "intervals", void 0);

    this.base = null;
    this.intervals = [];

    for (var _len2 = arguments.length, arrayIn = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      arrayIn[_key2 - 1] = arguments[_key2];
    }

    this.become(p1, ...arrayIn);
  }

  become(p1) {
    if (isChord(p1)) {
      this.base = p1.base;
      this.intervals = p1.intervals;
    } else if (typeof p1 === "string") {
      var _isNote = _Note__WEBPACK_IMPORTED_MODULE_1__.default.REGEX.exec(p1);

      if (_isNote) this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(p1);else this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(p1);
    } else if (typeof p1 === "number") {
      this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(p1);
    } else {
      this.base = p1;
    }

    for (var _len3 = arguments.length, arrayIn = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      arrayIn[_key3 - 1] = arguments[_key3];
    }

    if ((0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitchArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__.default.compare).map(pitch => this.base.getInterval(pitch));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_4__.isNumberArray)(arrayIn)) {
      this.intervals = arrayIn.map(pitch => this.base.getInterval(new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(pitch)));
    } else if ((0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.default.compare);
    } else {
      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(arrayIn).sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.default.compare);
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
        p1 = _notesIn[0],
        arrayIn = _notesIn.slice(1);

    this.base = p1;

    if ((0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitchArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__.default.compare).map(pitch => this.base.getInterval(pitch));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    }
  }

  get isAbsolute() {
    return this.base instanceof _Pitch__WEBPACK_IMPORTED_MODULE_2__.default;
  }

  toAbsolute() {
    var octaveIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
    if (!this.isAbsolute) this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(this.base, octaveIn);
    return this;
  }

  get ratio() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.nearestFractions)([1, ...this.intervals.map(i => i.ratio)]);
  }

  get reciprocal() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.nearestReciprocals)([1, ...this.intervals.map(i => i.ratio)]);
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
    this.intervals = this.intervals.sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.default.compare);

    if (this.intervals.length && this.intervals[0].offset < 0) {
      var d = this.intervals[0].reverse();

      for (var i = 1; i < this.intervals.length; i++) {
        this.intervals[i].add(d);
      }
    }
  }

  contains(noteIn) {
    var _iterator = _createForOfIteratorHelper(this.notes),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var note = _step.value;
        if (noteIn.equals(note)) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
    return this.base.clone().div(this.ratio[0]);
  }

  get imaginaryTop() {
    return this.base.clone().mul(this.reciprocal[0]);
  }

  add(p1) {
    if (p1 instanceof _Interval__WEBPACK_IMPORTED_MODULE_0__.default) {
      this.intervals.push(p1);
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(p1)) {
      this.intervals.push(this.base.getInterval(p1));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(p1)) {
      this.intervals.push(...p1.map(p => this.base.getInterval(p)));
    } else {
      var d = this.base.getInterval(p1.base);

      var _iterator2 = _createForOfIteratorHelper(p1.intervals),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var interval = _step2.value;
          this.intervals.push(d.clone().add(interval));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    this.reorder();
    return this;
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(p1) {
    if (p1 instanceof _Interval__WEBPACK_IMPORTED_MODULE_0__.default) {
      this.intervals = this.intervals.filter(i0 => !i0.equals(p1));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(p1)) {
      var that = p1 instanceof _Note__WEBPACK_IMPORTED_MODULE_1__.default ? p1 : (0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitch)(p1) ? new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(p1) : new _Note__WEBPACK_IMPORTED_MODULE_1__.default(p1);
      var notes = this.notes.filter(n0 => !that.equals(n0));
      if (!notes.length) return null;
      this.notes = notes;
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(p1)) {
      var _notes = this.notes;
      p1.forEach(n => {
        var that = n instanceof _Note__WEBPACK_IMPORTED_MODULE_1__.default ? n : (0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitch)(n) ? new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(n) : new _Note__WEBPACK_IMPORTED_MODULE_1__.default(n);
        _notes = this.notes.filter(n0 => !that.equals(n0));
      });
      if (!_notes.length) return null;
      this.notes = _notes;
    } else {
      this.sub(p1.notes);
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

  toGuidoAR(factory) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iterator3, _step3, note;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return factory.openMusic();

            case 2:
              _context.next = 4;
              return factory.openVoice();

            case 4:
              _context.next = 6;
              return factory.openChord();

            case 6:
              _iterator3 = _createForOfIteratorHelper(_this.notes);
              _context.prev = 7;

              _iterator3.s();

            case 9:
              if ((_step3 = _iterator3.n()).done) {
                _context.next = 15;
                break;
              }

              note = _step3.value;
              _context.next = 13;
              return note.openGuidoEvent(factory);

            case 13:
              _context.next = 9;
              break;

            case 15:
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](7);

              _iterator3.e(_context.t0);

            case 20:
              _context.prev = 20;

              _iterator3.f();

              return _context.finish(20);

            case 23:
              _context.next = 25;
              return factory.closeChord();

            case 25:
              _context.next = 27;
              return factory.closeVoice();

            case 27:
              return _context.abrupt("return", factory.closeMusic());

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 17, 20, 23]]);
    }))();
  }

  [_Symbol$iterator]() {
    var _this2 = this;

    return /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _iterator4, _step4, note;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iterator4 = _createForOfIteratorHelper(_this2.notes);
              _context2.prev = 1;

              _iterator4.s();

            case 3:
              if ((_step4 = _iterator4.n()).done) {
                _context2.next = 9;
                break;
              }

              note = _step4.value;
              _context2.next = 7;
              return note;

            case 7:
              _context2.next = 3;
              break;

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);

              _iterator4.e(_context2.t0);

            case 14:
              _context2.prev = 14;

              _iterator4.f();

              return _context2.finish(14);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11, 14, 17]]);
    })();
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

_defineProperty(Chord, "isChord", isChord);

_defineProperty(Chord, "isChordArray", isChordArray);

_defineProperty(Chord, "EnumChord", EnumChord);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chord);

/***/ }),

/***/ "./src/Color.ts":
/*!**********************!*\
  !*** ./src/Color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isColor": () => (/* binding */ isColor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var isColor = x => {
  return x instanceof Color || typeof x === "object" && typeof x.t === "number" && typeof x.s === "number" && typeof x.d === "number" && x.major === "number";
};

class Color {
  constructor(p1, s, d, major) {
    _defineProperty(this, "t", void 0);

    _defineProperty(this, "s", void 0);

    _defineProperty(this, "d", void 0);

    _defineProperty(this, "major", void 0);

    if (isColor(p1)) {
      this.t = p1.t;
      this.s = p1.s;
      this.d = p1.d;
      this.major = p1.major;
    } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNumberArray)(p1)) {
      this.fromArray(p1);
    } else {
      this.t = p1 || 0;
      this.s = s || 0;
      this.d = d || 0;
      this.major = major || 0;
    }
  }

  toArray() {
    return [this.t, this.s, this.d, this.major];
  }

  fromArray(color) {
    this.t = color[0] || 0;
    this.s = color[1] || 0;
    this.d = color[2] || 0;
    this.major = color[3] || 0;
    return this;
  }

  equals(colorIn) {
    return isColor(colorIn) && this.t === colorIn.t && this.s === colorIn.s && this.d === colorIn.d && this.major === colorIn.major;
  }

  toString() {
    return "Color{t=".concat(this.t, ", s=").concat(this.s, ", d=").concat(this.d, ", major=").concat(this.major, "}");
  }

  clone() {
    return new Color(this);
  }

}

_defineProperty(Color, "isColor", isColor);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Color);

/***/ }),

/***/ "./src/Duration.ts":
/*!*************************!*\
  !*** ./src/Duration.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDurationAbbreviation": () => (/* binding */ isDurationAbbreviation),
/* harmony export */   "isDuration": () => (/* binding */ isDuration),
/* harmony export */   "Duration": () => (/* binding */ Duration),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var isDurationAbbreviation = x => {
  return typeof x === "string" && !!x.match(/^\d+n(t|d)?$/) && new Array(8).fill(null).map((v, i) => Math.pow(2, i)).indexOf(parseInt(x)) !== -1;
};
var isDuration = x => {
  return x instanceof Duration || (typeof x.isAbsolute === "boolean" && x.isAbsolute ? typeof x.seconds === "number" : typeof x.numerator === "number" && typeof x.denominator === "number");
};
class Duration {
  /**
   * Absolute mode (use seconds or numerator/denominator)
   */

  /**
   * Quarter note = 1/4, Whole note = 1/1, Quarter note triplet = 1/6
   */

  /**
   * Quarter note = 1/4, Whole note = 1/1, Quarter note triplet = 1/6
   */

  /**
   * Absolute duration if in abs mode, in seconds
   */
  constructor(p1, p2) {
    _defineProperty(this, "isAbsolute", void 0);

    _defineProperty(this, "numerator", void 0);

    _defineProperty(this, "denominator", void 0);

    _defineProperty(this, "seconds", void 0);

    this.become(p1, p2);
  }

  become(p1, p2) {
    if (isDurationAbbreviation(p1)) {
      this.isAbsolute = false;
      this.denominator = parseInt(p1);

      if (p1.endsWith("d")) {
        this.numerator = 3;
        this.denominator *= 2;
      } else if (p1.endsWith("t")) {
        this.numerator = 2;
        this.denominator *= 3;
      } else {
        this.numerator = 1;
      }

      this.simplify();
    } else if (isDuration(p1)) {
      this.isAbsolute = p1.isAbsolute;
      this.numerator = p1.numerator;
      this.denominator = p1.denominator;
      this.seconds = p1.seconds;
      this.simplify();
    } else if (typeof p2 === "number") {
      this.isAbsolute = false;
      this.numerator = p1;
      this.denominator = p2;
      this.simplify();
    } else {
      this.isAbsolute = true;
      this.seconds = p1;
    }

    return this;
  }

  get value() {
    return this.isAbsolute ? this.seconds : this.numerator / this.denominator;
  }

  get isRelative() {
    return !this.isAbsolute;
  }

  getBeats(p1) {
    if (!this.isAbsolute) return this.value * 4;
    if (typeof p1 === "undefined") throw new Error("Absolute duration needs BPM to calculate.");
    if (typeof p1 === "number") return this.value * 4 * p1 / 60; // bpmIn

    return this.value * 4 * p1.getSecondsFromBeats();
  }

  getTicks(p1) {
    return Math.round(this.getBeats(p1) * 480);
  }

  toAbsolute(p1) {
    if (this.isAbsolute) return this;
    if (typeof p1 === "number") this.seconds = this.getBeats() * 60 / p1;else this.seconds = p1.getSecondsFromBeats(this.getBeats());
    this.isAbsolute = true;
    return this;
  }

  toRelative(p1) {
    if (!this.isAbsolute) return this;
    if (typeof p1 === "number") this.numerator = this.seconds * p1 / 60;else this.numerator = p1.getBeatsFromSeconds(this.seconds);
    this.denominator = 4;
    this.isAbsolute = false;
    this.simplify();
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

    return this;
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

    return this;
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

    return this;
  }

  static mul(a, b) {
    return a.clone().mul(b);
  }

  div(p1) {
    if (typeof p1 === "number") {
      if (this.isAbsolute) {
        this.seconds /= p1;
      } else {
        this.denominator *= p1;
        this.simplify();
      }

      return this;
    }

    if (this.isAbsolute === p1.isAbsolute) return this.value / p1.value;
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
    var f = Math.max((0,_utils__WEBPACK_IMPORTED_MODULE_0__.precisionFactor)(this.numerator), (0,_utils__WEBPACK_IMPORTED_MODULE_0__.precisionFactor)(this.denominator));
    var $gcd = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.gcd)(this.numerator * f, this.denominator * f) / f;

    if ($gcd !== 1) {
      this.denominator /= $gcd;
      this.numerator /= $gcd;
    }

    var _nearestFractions = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.nearestFractions)([this.numerator, this.denominator], 1.001),
        _nearestFractions2 = _slicedToArray(_nearestFractions, 2),
        n = _nearestFractions2[0],
        d = _nearestFractions2[1];

    this.numerator = n;
    this.denominator = d;
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

_defineProperty(Duration, "isDuration", isDuration);

_defineProperty(Duration, "isDuractionAbbreviation", isDurationAbbreviation);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Duration);

/***/ }),

/***/ "./src/Enum.ts":
/*!*********************!*\
  !*** ./src/Enum.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Enum": () => (/* binding */ Enum),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Enum {
  static values() {
    return this.indexes.map(key => this[key]);
  }

  static valueOf(key) {
    return this[key];
  }

  constructor() {}

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

_defineProperty(Enum, "indexes", []);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enum);

/***/ }),

/***/ "./src/Frequency.ts":
/*!**************************!*\
  !*** ./src/Frequency.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Frequency": () => (/* binding */ Frequency),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Frequency {}

_defineProperty(Frequency, "A440", 440);

_defineProperty(Frequency, "SEMITONE", Math.pow(2, 1 / 12));

_defineProperty(Frequency, "THRES_AUDIT", Math.pow(2, 1 / 36));

_defineProperty(Frequency, "getRatio", d => Math.pow(2, d / 12));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Frequency);

/***/ }),

/***/ "./src/Interval.ts":
/*!*************************!*\
  !*** ./src/Interval.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInterval": () => (/* binding */ isInterval),
/* harmony export */   "isIntervalArray": () => (/* binding */ isIntervalArray),
/* harmony export */   "DEGREE_TO_OFFSET": () => (/* binding */ DEGREE_TO_OFFSET),
/* harmony export */   "Interval": () => (/* binding */ Interval),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isInterval = x => {
  return x instanceof Interval || typeof x === "object" && typeof x.degree === "number" && typeof x.onset === "number" && typeof x.octave === "number";
};
var isIntervalArray = x => {
  return Array.isArray(x) && x.every(el => el instanceof Interval);
};
var DEGREE_TO_OFFSET = [0, 2, 4, 5, 7, 9, 11];

class EnumIntervalProperty extends _Enum__WEBPACK_IMPORTED_MODULE_1__.default {
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

    _defineProperty(this, "abb", void 0);

    this.abb = abbIn;
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

_defineProperty(EnumIntervalProperty, "indexes", ["PERFECT", "MAJOR", "MINOR", "AUGMENTED", "DIMINISHED"]);

_defineProperty(EnumIntervalProperty, "abbMap", {
  P: "PERFECT",
  M: "MAJOR",
  m: "MINOR",
  A: "AUGMENTED",
  d: "DIMINISHED"
});

class Interval {
  static getOffsetFromProperty(propertyIn, degreeIn) {
    var degree = typeof degreeIn === "number" ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1 : 1;

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
    var degree = typeof degreeIn === "number" ? (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1 : 1;

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
    return typeof degreeIn === "number" ? DEGREE_TO_OFFSET[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7)] + 12 * Math.floor((degreeIn - 1) / 7) : 0;
  }
  /**
   * Returns Unison
   */


  constructor(p1, p2, p3) {
    _defineProperty(this, "degree", void 0);

    _defineProperty(this, "onset", void 0);

    _defineProperty(this, "octave", void 0);

    this.become(p1, p2, p3);
  }

  become(p1, p2, p3) {
    this.degree = 0;
    this.onset = 0;
    this.octave = 0;

    if (isInterval(p1)) {
      this.fromInterval(p1.degree, p1.onset, p1.octave);
    } else if (typeof p1 === "string") {
      this.fromString(p1);
    } else if (typeof p1 === "number") {
      this.fromInterval(p1, p2, p3);
    }

    return this;
  }

  fromInterval(degreeIn) {
    var onsetIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var octaveIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.degree = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1;
    this.onset = onsetIn;
    this.octave = Math.floor((degreeIn - 1) / 7) + octaveIn;
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
      if (DEGREE_TO_OFFSET[i] === (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12)) {
        degree = i + 1;
        onset = 0;
        break;
      } else if (DEGREE_TO_OFFSET[i] === (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12) + 1) {
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
    var offset = Math.round(Math.log(ratioIn) / Math.log(_Frequency__WEBPACK_IMPORTED_MODULE_2__.default.SEMITONE));
    return new Interval(offset);
  }

  add(iIn) {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree + iIn.degree - 1 - 1, 7) + 1;
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
    i.degree = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree - iIn.degree + 1 - 1, 7) + 1;
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
    i.degree = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(1 - this.degree, 7) + 1;
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
    i.degree = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(1 - this.degree, 7) + 1;
    i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
    i.octave = 1 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  get offset() {
    return DEGREE_TO_OFFSET[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree - 1, 7)] + 12 * Math.floor((this.degree - 1) / 7) + this.onset + 12 * this.octave;
  }

  get ratio() {
    return _Frequency__WEBPACK_IMPORTED_MODULE_2__.default.getRatio(this.offset);
  }

  get fraction() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.nearestFraction)(this.ratio);
  }

  get reciprocal() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.nearestReciprocal)(this.ratio);
  }

  get property() {
    return Interval.getPropertyFromOffset(this.onset, this.degree);
  }

  static fromArray(arrayIn) {
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

_defineProperty(Interval, "REGEX", /^([PMmAd])([0-9]+)((\+|-)\d+)?$/);

_defineProperty(Interval, "DEGREE_TO_OFFSET", DEGREE_TO_OFFSET);

_defineProperty(Interval, "isInterval", isInterval);

_defineProperty(Interval, "isIntervalArray", isIntervalArray);

_defineProperty(Interval, "EnumIntervalProperty", EnumIntervalProperty);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interval);

/***/ }),

/***/ "./src/Note.ts":
/*!*********************!*\
  !*** ./src/Note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumNote": () => (/* binding */ EnumNote),
/* harmony export */   "isNote": () => (/* binding */ isNote),
/* harmony export */   "isNoteArray": () => (/* binding */ isNoteArray),
/* harmony export */   "Note": () => (/* binding */ Note),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class EnumNote extends _Enum__WEBPACK_IMPORTED_MODULE_2__.default {
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

    _defineProperty(this, "offset", void 0);

    this.offset = offsetIn;
  }

  static byOffset(offsetIn) {
    if (typeof offsetIn !== "number") return null;
    var name = EnumNote.offsetMap[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with offset ".concat(offsetIn, "."));
  }

  static byIndex(indexIn) {
    if (typeof indexIn !== "number") return null;
    var name = EnumNote.indexes[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(indexIn, 7)];
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

_defineProperty(EnumNote, "indexes", ["C", "D", "E", "F", "G", "A", "B"]);

_defineProperty(EnumNote, "offsetMap", {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B"
});

_defineProperty(EnumNote, "c", EnumNote.C);

_defineProperty(EnumNote, "d", EnumNote.D);

_defineProperty(EnumNote, "e", EnumNote.E);

_defineProperty(EnumNote, "f", EnumNote.F);

_defineProperty(EnumNote, "g", EnumNote.G);

_defineProperty(EnumNote, "a", EnumNote.A);

_defineProperty(EnumNote, "b", EnumNote.B);

var isNote = x => {
  return x instanceof Note || typeof x === "object" && x.enumNote instanceof EnumNote && typeof x.alteration === "number";
};
var isNoteArray = x => {
  return Array.isArray(x) && x.every(el => el instanceof Note);
};
class Note {
  /**
   * Returns C
   */

  /**
   * New note
   */

  /**
   * Gives a new Note instance (clone)
   */

  /**
   * Parses note string.
   * @example
   * new Note("E##");
   * @throws {SyntaxError} when parse failed
   */

  /**
   * Creates an instance of Note.
   */
  constructor(p1, p2) {
    _defineProperty(this, "enumNote", void 0);

    _defineProperty(this, "alteration", void 0);

    this.enumNote = EnumNote.C;
    this.alteration = 0;
    this.become(p1, p2);
  }

  become(p1, p2) {
    if (p1 instanceof EnumNote) {
      this.enumNote = p1;
      if (p2) this.alteration = p2;
    } else if (isNote(p1)) {
      this.enumNote = p1.enumNote;
      this.alteration = p1.alteration;
    } else if (typeof p1 === "string") {
      this.fromString(p1);
    } else if (typeof p1 === "number") {
      this.fromOffset(p1, p2);
    }

    return this;
  }

  static fromString(nameIn) {
    var matched = Note.REGEX.exec(nameIn);
    if (matched === null) throw new SyntaxError("No such note ".concat(nameIn, "."));
    var enumNote = EnumNote[matched[1]];
    var alteration = 0;
    matched[2].split("").forEach(c => alteration += c === "x" ? 2 : c === "#" ? 1 : -1);
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
    var note = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12);
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
    return Math.round(Math.log(ratio) / Math.log(_Frequency__WEBPACK_IMPORTED_MODULE_3__.default.SEMITONE));
  }

  static offsetToRatio(offset) {
    return Math.pow(_Frequency__WEBPACK_IMPORTED_MODULE_3__.default.SEMITONE, offset);
  }

  add(p1) {
    if (typeof p1 === "number") return this.fromOffset(this.offset + p1);
    if (p1 instanceof Note) return this.become(p1);
    var i;
    if (typeof p1 === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(p1);else if (p1 instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = p1;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index + i.degree - 1);
    this.alteration += i.offset - 12 * i.octave - (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(newEnumNote.offset - this.enumNote.offset, 12);
    this.enumNote = newEnumNote;
    return this;
  }

  static add(a, b) {
    return a.clone().add(b);
  }

  sub(p1) {
    if (typeof p1 === "number") return this.fromOffset(this.offset - p1);
    if (p1 instanceof Note) return this.become(p1);
    var i;
    if (typeof p1 === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(p1);else if (p1 instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = p1;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index - i.degree + 1);
    this.alteration += i.offset - 12 * i.octave - (0,_utils__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.enumNote.offset - newEnumNote.offset, 12);
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

  div(p1) {
    if (p1 instanceof Note) return Note.offsetToRatio(this.offset - p1.offset);
    return this.mul(1 / p1);
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
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_1__.default.getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(degree, onset, octave);
  }

  getDistance(that) {
    var distance = Math.abs(this.offset - that.offset);
    return distance > 6 ? 12 - distance : distance;
  }

  get offset() {
    return this.enumNote.offset + this.alteration;
  }

  static fromArray(arrayIn) {
    return arrayIn.map(e => new Note(e));
  }

  toString() {
    return this.enumNote.name() + (this.alteration > 0 ? "#" : "b").repeat(Math.abs(this.alteration));
  }

  clone() {
    return new Note(this);
  }

  openGuidoEvent(factory) {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var close, octaveIn, alteration, accidentals, alterDetune;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              close = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
              octaveIn = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : 3;
              alteration = _this.alteration;
              accidentals = Math.max(-2, Math.min(2, ~~alteration));
              alterDetune = alteration - accidentals;

              if (!alterDetune) {
                _context.next = 12;
                break;
              }

              _context.next = 8;
              return factory.openTag("alter", 0);

            case 8:
              _context.next = 10;
              return factory.addTagParameterFloat(alterDetune);

            case 10:
              _context.next = 12;
              return factory.setParameterName("detune");

            case 12:
              _context.next = 14;
              return factory.openEvent(_this.enumNote.name());

            case 14:
              _context.next = 16;
              return factory.setEventAccidentals(_this.alteration);

            case 16:
              _context.next = 18;
              return factory.setOctave(octaveIn - 3);

            case 18:
              if (!close) {
                _context.next = 26;
                break;
              }

              _context.next = 21;
              return factory.closeEvent();

            case 21:
              if (!alterDetune) {
                _context.next = 26;
                break;
              }

              _context.next = 24;
              return factory.closeTag();

            case 24:
              _context.next = 26;
              return factory.endTag();

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }

  toGuidoAR(factory) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return factory.openMusic();

            case 2:
              _context2.next = 4;
              return factory.openVoice();

            case 4:
              _context2.next = 6;
              return _this2.openGuidoEvent(factory);

            case 6:
              _context2.next = 8;
              return factory.closeVoice();

            case 8:
              return _context2.abrupt("return", factory.closeMusic());

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }

  getTendancy(that) {
    var d = this.getDistance(that);
    return d === 0 || d > 2 ? 0 : 1 / d;
  }

  getStability(that) {
    var d = this.getDistance(that);

    var _Interval$fraction = _slicedToArray(new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(_Interval__WEBPACK_IMPORTED_MODULE_1__.default.fromOffset(d)).fraction, 2),
        f = _Interval$fraction[1];

    return 1 / f;
  }

}

_defineProperty(Note, "REGEX", /^([a-gA-G])([b#x]*)$/);

_defineProperty(Note, "isNote", isNote);

_defineProperty(Note, "isNoteArray", isNoteArray);

_defineProperty(Note, "EnumNote", EnumNote);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Note);

/***/ }),

/***/ "./src/Param.ts":
/*!**********************!*\
  !*** ./src/Param.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isParam": () => (/* binding */ isParam),
/* harmony export */   "Param": () => (/* binding */ Param),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isParam = x => {
  return x instanceof Param || typeof x === "object" && typeof x.path === "string" && (typeof x.name === "undefined" || x.name === "string") && typeof x.min === "number" && typeof x.max === "number" && typeof x.step === "number" && typeof x.value === "number" && typeof x.init === "number";
};
class Param {
  constructor(optionsIn) {
    _defineProperty(this, "path", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "_min", void 0);

    _defineProperty(this, "_max", void 0);

    _defineProperty(this, "step", void 0);

    _defineProperty(this, "_value", void 0);

    this.path = optionsIn.path;
    this.name = optionsIn.name;
    this._value = optionsIn.value;
    this.step = optionsIn.step;
    this.setRange(optionsIn.min, optionsIn.max);
  }

  get value() {
    return this._value;
  }

  set value(valueIn) {
    if (valueIn < this.min) {
      this._value = this.min;
    } else if (valueIn > this.max) {
      var d = this.max - this.min;
      this._value = this.min + d - d % this.step;
    } else {
      var _d = valueIn - this.min;

      this._value = this.min + _d - _d % this.step;
    }
  }

  get min() {
    return this._min;
  }

  set min(minIn) {
    this._min = Math.min(minIn, this.max);
    if (this.value < this.min) this.value = this.min;
  }

  get max() {
    return this._max;
  }

  set max(maxIn) {
    this._max = Math.max(maxIn, this.min);
    if (this.value > this.max) this.value = this.max;
  }

  setRange(minIn, maxIn) {
    var min = Math.min(minIn, maxIn);
    var max = Math.max(minIn, maxIn);
    this._min = min;
    this._max = max;
    this.value = this._value;
  }

  clone() {
    return new Param(this);
  }

}

_defineProperty(Param, "isParam", isParam);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Param);

/***/ }),

/***/ "./src/Pitch.ts":
/*!**********************!*\
  !*** ./src/Pitch.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPitch": () => (/* binding */ isPitch),
/* harmony export */   "isPitchArray": () => (/* binding */ isPitchArray),
/* harmony export */   "Pitch": () => (/* binding */ Pitch),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isPitch = x => {
  return x instanceof Pitch || typeof x === "object" && x.enumNote instanceof _Note__WEBPACK_IMPORTED_MODULE_0__.EnumNote && typeof x.alteration === "number" && typeof x.octave === "number";
};
var isPitchArray = x => {
  return Array.isArray(x) && x.every(el => el instanceof Pitch);
};
class Pitch extends _Note__WEBPACK_IMPORTED_MODULE_0__.default {
  static fromFrequency(f) {
    return new Pitch(69 + 12 * (Math.log(f / _Frequency__WEBPACK_IMPORTED_MODULE_2__.default.A440) / Math.log(2)));
  }

  /**
   * Creates an instance of Pitch with index
   */
  constructor(p1) {
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
    super();

    _defineProperty(this, "octave", void 0);

    this.become(p1, p2);
  }

  become(p1) {
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    if (isPitch(p1)) {
      super.become(p1);
      this.octave = p1.octave;
    } else if (p1 instanceof _Note__WEBPACK_IMPORTED_MODULE_0__.EnumNote) {
      super.become(p1);
      this.octave = p2;
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_0__.isNote)(p1)) {
      super.become(p1);
      this.octave = p2;
    } else if (typeof p1 === "string") {
      super.become();
      this.fromString(p1);
    } else if (typeof p1 === "number") {
      super.become(p1);
      this.octave = Math.floor(p1 / 12 - 1);
    } else {
      super.become();
    }

    return this;
  }

  get frequency() {
    return _Frequency__WEBPACK_IMPORTED_MODULE_2__.default.A440 * Math.pow(2, (this.offset - 69) / 12);
  }

  static fromString(nameIn) {
    var matched = Pitch.REGEX.exec(nameIn);
    if (matched === null) throw new SyntaxError("No such pitch ".concat(nameIn, "."));
    var octave = parseInt(matched[2]) || 0;
    return _objectSpread(_objectSpread({}, _Note__WEBPACK_IMPORTED_MODULE_0__.default.fromString(matched[1])), {}, {
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
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = iIn;
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
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = iIn;
    this.octave += Math.floor((this.enumNote.index - i.degree + 1) / 7) - i.octave;
    return super.sub(i);
  }

  static sub(a, b) {
    return a.clone().sub(b);
  }

  mul(fIn) {
    var d = _Note__WEBPACK_IMPORTED_MODULE_0__.default.ratioToOffset(fIn);
    return this.add(d);
  }

  static mul(a, b) {
    return a.clone().mul(b);
  }

  div(p1) {
    if (p1 instanceof Pitch) return this.frequency / p1.frequency;
    return this.mul(1 / p1);
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
    var that = pitchIn instanceof Pitch ? pitchIn : isPitch(pitchIn) ? new Pitch(pitchIn) : new Pitch(pitchIn, this.octave);
    var degree = that.enumNote.index - this.enumNote.index + 1 + (that.octave - this.octave) * 7;
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_1__.default.getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(degree, onset, octave);
  }

  getDistance(that) {
    return Math.abs(this.offset - that.offset);
  }

  get offset() {
    return this.enumNote.offset + this.alteration + 12 * (this.octave + 1);
  }

  static fromArray(arrayIn) {
    return arrayIn.map(e => new Pitch(e));
  }

  toString() {
    return super.toString() + this.octave;
  }

  clone() {
    return new Pitch(this);
  }

  openGuidoEvent(factory) {
    var _arguments = arguments,
        _superprop_getOpenGuidoEvent = () => super.openGuidoEvent,
        _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var close;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              close = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
              _context.next = 3;
              return _superprop_getOpenGuidoEvent().call(_this, factory, close, _this.octave);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }

  getTendancy(that) {
    return super.getTendancy(that);
  }

  getStability(that) {
    return super.getStability(that);
  }

}

_defineProperty(Pitch, "REGEX", /^([a-gA-G][b#x]*)(-?\d+)?$/);

_defineProperty(Pitch, "MINIMUM", Pitch.fromFrequency(20));

_defineProperty(Pitch, "MAXIMUM", Pitch.fromFrequency(20000));

_defineProperty(Pitch, "isPitch", isPitch);

_defineProperty(Pitch, "isPitchArray", isPitchArray);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pitch);

/***/ }),

/***/ "./src/Scale.ts":
/*!**********************!*\
  !*** ./src/Scale.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EnumScale": () => (/* binding */ EnumScale),
/* harmony export */   "isScale": () => (/* binding */ isScale),
/* harmony export */   "Scale": () => (/* binding */ Scale),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var _Symbol$iterator;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  return x instanceof Scale || typeof x === "object" && (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isStringArray)(x.degreeNames) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
};
_Symbol$iterator = Symbol.iterator;
class Scale {
  constructor(p1) {
    _defineProperty(this, "scaleName", void 0);

    _defineProperty(this, "intervals", void 0);

    _defineProperty(this, "degreeNames", void 0);

    for (var _len = arguments.length, degreesIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      degreesIn[_key - 1] = arguments[_key];
    }

    this.become(p1, ...degreesIn);
  }

  become(p1) {
    if (typeof p1 === "string") {
      this.scaleName = p1;
      this.intervals = [];
      this.degreeNames = [];

      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        var degreeName = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
        var split = degreeName.split(":");

        if (split.length === 2) {
          this.intervals[i] = new _Interval__WEBPACK_IMPORTED_MODULE_0__.default(split[0]);
          this.degreeNames[i] = split[1];
        } else {
          this.intervals[i] = new _Interval__WEBPACK_IMPORTED_MODULE_0__.default(degreeName);
          this.degreeNames[i] = degreeName;
        }
      }
    } else {
      this.scaleName = p1.scaleName;
      this.intervals = p1.intervals.map(i => i.clone());
      this.degreeNames = [...p1.degreeNames];
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
      interval = new _Interval__WEBPACK_IMPORTED_MODULE_0__.default(split[0]);
      name = split[1];
    } else {
      interval = new _Interval__WEBPACK_IMPORTED_MODULE_0__.default(noteIn);
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
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.floorMod)(degreeIn - 1, this.intervals.length) + 1 === interval.degree;
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

    return /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iterator, _step, interval;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(_this.intervals);
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }

              interval = _step.value;
              _context.next = 7;
              return interval;

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 11, 14, 17]]);
    })();
  }

}

_defineProperty(Scale, "isScale", isScale);

_defineProperty(Scale, "EnumScale", EnumScale);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scale);

/***/ }),

/***/ "./src/TimeCode.ts":
/*!*************************!*\
  !*** ./src/TimeCode.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTimeCode": () => (/* binding */ isTimeCode),
/* harmony export */   "TimeCode": () => (/* binding */ TimeCode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isTimeCode = x => {
  return x instanceof TimeCode || typeof x.beats === "number" && typeof x.beatDuration === "number" && typeof x.bpm === "number";
};
class TimeCode {
  constructor(p1, p2, p3) {
    _defineProperty(this, "beats", void 0);

    _defineProperty(this, "beatDuration", void 0);

    _defineProperty(this, "bpm", void 0);

    if (isTimeCode(p1)) {
      this.beats = p1.beats;
      this.beatDuration = p1.beatDuration;
      this.bpm = p1.bpm;
    } else {
      this.beats = p1 || 4;
      this.beatDuration = p2 || 4;
      this.bpm = p3 || 60;
    }
  }

  getSecondsFromBeats() {
    var beatsIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return beatsIn * 60 / this.bpm;
  }

  getBeatsFromSeconds() {
    var secondsIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return secondsIn * this.bpm / 60;
  }

  toString() {
    return this.beats + "/" + this.beatDuration + " @" + this.bpm;
  }

  clone() {
    return new TimeCode(this);
  }

}

_defineProperty(TimeCode, "DEFAULT", new TimeCode(4, 4, 60));

_defineProperty(TimeCode, "isTimeCode", isTimeCode);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeCode);

/***/ }),

/***/ "./src/TonalChord.ts":
/*!***************************!*\
  !*** ./src/TonalChord.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTonalChord": () => (/* binding */ isTonalChord),
/* harmony export */   "isTonalChordArray": () => (/* binding */ isTonalChordArray),
/* harmony export */   "TonalChord": () => (/* binding */ TonalChord),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isTonalChord = x => {
  return x instanceof TonalChord || typeof x.alteration === "number" && typeof x.degree === "number" && x.chord instanceof _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord;
};
var isTonalChordArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof TonalChord);
};
class TonalChord {
  constructor(p1) {
    _defineProperty(this, "alteration", void 0);

    _defineProperty(this, "degree", void 0);

    _defineProperty(this, "chord", void 0);

    if (typeof p1 === "string") {
      var matched = TonalChord.REGEX1.exec(p1);

      if (matched) {
        var s = matched[1];
        this.alteration = s === "#" ? 1 : s === "b" ? -1 : 0;
        s = matched[2];
        var p = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.parseRoman)(s);
        if (p !== 0 && p > 7 && p < -7) throw new Error("Roman number too large for degree.");
        this.degree = Math.abs(p);
        s = matched[3];
        this.chord = s.length === 0 ? p > 0 ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ : _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN : s === "+" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG : _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.DIM;
      } else {
        matched = TonalChord.REGEX2.exec(p1);

        if (matched) {
          var _s = matched[1];
          this.alteration = _s === "#" ? 1 : _s === "b" ? -1 : 0;
          _s = matched[2];
          this.degree = +_s;
          _s = matched[3];
          this.chord = _s.length === 0 ? null : _s === "M" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ : _s === "m" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ : _s === "+" ? _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG : _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.DIM;
        } else throw new Error("Input string error: " + p1);
      }
    } else {
      this.alteration = p1.alteration;
      this.degree = p1.degree;
      this.chord = p1.chord.clone();
    }
  }

  getChord(tonalityIn) {
    var chord;
    if (this.chord) chord = new _Chord__WEBPACK_IMPORTED_MODULE_0__.default(tonalityIn.getNoteFromDegree(this.degree));else chord = tonalityIn.getTriad(this.degree);
    if (this.alteration === 1) chord.base.add(new _Interval__WEBPACK_IMPORTED_MODULE_2__.default("A1"));else if (this.alteration === -1) chord.base.sub(new _Interval__WEBPACK_IMPORTED_MODULE_2__.default("A1"));
    return chord;
  }

  equals(chordIn) {
    return isTonalChord(chordIn) && chordIn.alteration === this.alteration && chordIn.degree === this.degree && chordIn.chord.equals(this.chord);
  }

  toString() {
    var s = "";
    if (this.alteration === 1) s = "#";else if (this.alteration === -1) s = "b";
    if (!this.chord) return s + this.degree;
    s += (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toRoman)(this.degree * (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN) ? -1 : 1));

    if (!this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MAJ) && !this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN)) {
      if (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG)) s += "+";else if (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.AUG)) s += "-";else s += this.chord.name().toLowerCase();
    }

    return s;
  }

  clone() {
    return new TonalChord(this);
  }

}

_defineProperty(TonalChord, "REGEX1", /^([#b]?)(I{1,3}|i{1,3}|I?V|i?v|VI{1,2}|vi{1,2})(\+|-?)$/);

_defineProperty(TonalChord, "REGEX2", /^([#b]?)([1-7])(M|m|\+|-?)$/);

_defineProperty(TonalChord, "isTonalChord", isTonalChord);

_defineProperty(TonalChord, "isTonalChordArray", isTonalChordArray);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TonalChord);

/***/ }),

/***/ "./src/Tonality.ts":
/*!*************************!*\
  !*** ./src/Tonality.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTonality": () => (/* binding */ isTonality),
/* harmony export */   "Tonality": () => (/* binding */ Tonality),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
  constructor(p1, p2) {
    _defineProperty(this, "note", void 0);

    _defineProperty(this, "scale", void 0);

    this.become(p1, p2);
  }

  become(p1, p2) {
    if (isTonality(p1)) {
      this.note = p1.note.clone();
      this.scale = p1.scale.clone();
    } else if (typeof p1 === "string") {
      try {
        this.note = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(p1);
      } catch (e) {
        throw new Error("No such tonality: ".concat(p1, "."));
      }

      this.scale = p1.substr(p1.length - 1).match("[A-G]") ? _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR : _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR;
    } else {
      this.note = p1;
      this.scale = p2;
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
    return new _Chord__WEBPACK_IMPORTED_MODULE_2__.default(this.getNoteFromDegree(degreeIn), this.getNoteFromDegree(degreeIn + 2), this.getNoteFromDegree(degreeIn + 4));
  }

  getTriads() {
    return this.scale.degrees.map(d => this.getTriad(d));
  }

  get triads() {
    return this.getTriads();
  }

  toRelative() {
    if (this.scale.equals(_Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR)) {
      this.note.sub(new _Interval__WEBPACK_IMPORTED_MODULE_3__.default("m3"));
      this.scale = _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR;
    } else if (this.scale.equals(_Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR)) {
      this.note.add(new _Interval__WEBPACK_IMPORTED_MODULE_3__.default("m3"));
      this.scale = _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR;
    } else throw new Error("Relative not found.");

    return this;
  }

  get relative() {
    return this.clone().toRelative();
  }

  toNext() {
    this.note.add(new _Interval__WEBPACK_IMPORTED_MODULE_3__.default("P5"));
    return this;
  }

  get next() {
    return this.clone().toNext();
  }

  toPrev() {
    this.note.sub(new _Interval__WEBPACK_IMPORTED_MODULE_3__.default("P5"));
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

    return /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
    })();
  }

}

_defineProperty(Tonality, "isTonality", isTonality);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tonality);

/***/ }),

/***/ "./src/Velocity.ts":
/*!*************************!*\
  !*** ./src/Velocity.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isVelocity": () => (/* binding */ isVelocity),
/* harmony export */   "EnumVelocity": () => (/* binding */ EnumVelocity),
/* harmony export */   "Velocity": () => (/* binding */ Velocity),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    _defineProperty(this, "_velocity", void 0);

    if (typeof velocityIn === "number") this.velocity = velocityIn;else this.velocity = velocityIn.velocity;
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

_defineProperty(Velocity, "isVelocity", isVelocity);

_defineProperty(Velocity, "EnumVelocity", EnumVelocity);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Velocity);

/***/ }),

/***/ "./src/genre/Random.ts":
/*!*****************************!*\
  !*** ./src/genre/Random.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Random": () => (/* binding */ Random),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(seedrandom__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Random {
  constructor(seedIn) {
    _defineProperty(this, "prng", void 0);

    this.prng = seedrandom__WEBPACK_IMPORTED_MODULE_0__(seedIn || "");
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Random);

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "precisionFactor": () => (/* binding */ precisionFactor),
/* harmony export */   "gcd": () => (/* binding */ gcd),
/* harmony export */   "lcm": () => (/* binding */ lcm),
/* harmony export */   "floorMod": () => (/* binding */ floorMod),
/* harmony export */   "isStringArray": () => (/* binding */ isStringArray),
/* harmony export */   "isNumberArray": () => (/* binding */ isNumberArray),
/* harmony export */   "parseRoman": () => (/* binding */ parseRoman),
/* harmony export */   "toRoman": () => (/* binding */ toRoman),
/* harmony export */   "getValueFromCurve": () => (/* binding */ getValueFromCurve),
/* harmony export */   "nearestFraction": () => (/* binding */ nearestFraction),
/* harmony export */   "nearestFractions": () => (/* binding */ nearestFractions),
/* harmony export */   "nearestReciprocal": () => (/* binding */ nearestReciprocal),
/* harmony export */   "nearestReciprocals": () => (/* binding */ nearestReciprocals),
/* harmony export */   "permutations": () => (/* binding */ permutations),
/* harmony export */   "permute": () => (/* binding */ permute),
/* harmony export */   "combinations": () => (/* binding */ combinations),
/* harmony export */   "randomCombination": () => (/* binding */ randomCombination)
/* harmony export */ });
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");

var precisionFactor = function precisionFactor(x) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Math.round(x * e) !== x * e ? precisionFactor(x, e * 10) : e;
};
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
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__.default.THRES_AUDIT;
  return nearestFractions([1, v], approxIn);
};
var nearestFractions = function nearestFractions(ratio) {
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__.default.THRES_AUDIT;
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
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__.default.THRES_AUDIT;
  return nearestReciprocals([ratio, 1], approxIn);
};
var nearestReciprocals = function nearestReciprocals(ratio) {
  var approxIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Frequency__WEBPACK_IMPORTED_MODULE_0__.default.THRES_AUDIT;
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

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
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
} else if (__webpack_require__.amdD && __webpack_require__.amdO) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__.amdD   // present with an AMD loader
);




/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
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
} else if (__webpack_require__.amdD && __webpack_require__.amdO) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__.amdD   // present with an AMD loader
);




/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
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
} else if (__webpack_require__.amdD && __webpack_require__.amdO) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__.amdD   // present with an AMD loader
);




/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
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
} else if (__webpack_require__.amdD && __webpack_require__.amdO) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__.amdD   // present with an AMD loader
);


/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
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
} else if (__webpack_require__.amdD && __webpack_require__.amdO) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__.amdD   // present with an AMD loader
);



/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
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
} else if (__webpack_require__.amdD && __webpack_require__.amdO) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__.amdD   // present with an AMD loader
);




/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
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
    nodecrypto = __webpack_require__(/*! crypto */ "?d4c0");
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

/***/ "?d4c0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Articulation": () => (/* reexport safe */ _Articulation__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "Chord": () => (/* reexport safe */ _Chord__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "Color": () => (/* reexport safe */ _Color__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "Duration": () => (/* reexport safe */ _Duration__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Frequency": () => (/* reexport safe */ _Frequency__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Interval": () => (/* reexport safe */ _Interval__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "Note": () => (/* reexport safe */ _Note__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "Param": () => (/* reexport safe */ _Param__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "Pitch": () => (/* reexport safe */ _Pitch__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "Scale": () => (/* reexport safe */ _Scale__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "TimeCode": () => (/* reexport safe */ _TimeCode__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "TonalChord": () => (/* reexport safe */ _TonalChord__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "Tonality": () => (/* reexport safe */ _Tonality__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "Velocity": () => (/* reexport safe */ _Velocity__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "Random": () => (/* reexport safe */ _genre_Random__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "Utils": () => (/* reexport module object */ _utils__WEBPACK_IMPORTED_MODULE_15__)
/* harmony export */ });
/* harmony import */ var _Articulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Articulation */ "./src/Articulation.ts");
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* harmony import */ var _Color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Color */ "./src/Color.ts");
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Duration */ "./src/Duration.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Param__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Param */ "./src/Param.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Scale__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Scale */ "./src/Scale.ts");
/* harmony import */ var _TimeCode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TimeCode */ "./src/TimeCode.ts");
/* harmony import */ var _TonalChord__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TonalChord */ "./src/TonalChord.ts");
/* harmony import */ var _Tonality__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Tonality */ "./src/Tonality.ts");
/* harmony import */ var _Velocity__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Velocity */ "./src/Velocity.ts");
/* harmony import */ var _genre_Random__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./genre/Random */ "./src/genre/Random.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
















/*
export * as Articulation from "./Articulation";
export * as Chord from "./Chord";
export * as Color from "./Color";
export * as Duration from "./Duration";
export * as Frequency from "./Frequency";
export * as Interval from "./Interval";
export * as Note from "./Note";
export * as Param from "./Param";
export * as Pitch from "./Pitch";
export * as Scale from "./Scale";
export * as TimeCode from "./TimeCode";
export * as TonalChord from "./TonalChord";
export * as Tonality from "./Tonality";
export * as Velocity from "./Velocity";
*/


/* eslint-disable no-console */

/*
console.log(new Pitch("C8").offset);
new Note("#G").getInterval(new Note("C"));
console.log(new Note("#G").getInterval(new Note("C")).toString());
console.log(new Note("#C").getInterval(new Note("G")).toString());
console.log(new Note("C").getInterval(new Note("bC")).toString());
console.log(new Note("C").getInterval(new Note("#C")).toString());
console.log(new Note("C").getInterval(new Note("bB")).toString());
console.log(new Note("C").getInterval(new Note("#A")).toString());

const n = new Note(1);
console.log(n.toString());

const p = new Pitch("##F0");
console.log(p.add("A4").toString() + " " + p.offset);

const f = 440;
console.log(Pitch.fromFrequency(f).offset);

const c = new Chord(new Pitch("C1"), new Pitch("bC2"), new Pitch("#C1"));

console.log(c.toString());

console.log(new Interval("M3").reverse().toString());

console.log(c.notes.toString());
console.log(c.contains(new Pitch("#C1")));
const c1 = new Chord(new Pitch("C1"), new Pitch("E1"), new Pitch("G1"));
const c2 = new Chord(new Pitch("B0"), new Pitch("D1"), new Pitch("G1"));
console.log(c1.enumChord);

const s = EnumScale.MINOR;
console.log(s.toString());
console.log(new Tonality("C").toRelative().toString());
console.log(new Tonality("C").toPrev().toString());
console.log(new Tonality("C").toNext().toString());

console.log(EnumChordProgression.EPIC1.toString());

*/

/*
const tn1 = new TrackNote({ pitch: new Pitch("C1"), duration: new Duration(1, 4), offset: new Duration(0, 4) });
const tn2 = new TrackNote({ pitch: new Pitch("D1"), duration: new Duration(1, 4), offset: new Duration(1, 4) });
const tn3 = new TrackNote({ pitch: new Pitch("E1"), duration: new Duration(1, 4), offset: new Duration(2, 4) });
const seg = new Segment({ notes: [tn2, tn3, tn1], automations: [], duration: new Duration(1, 1) });
seg.notes.sort((a, b) => a.offset.compareTo(b.offset)).forEach(n => console.log(n.toString()));
HClipper.use(seg, { start: new Duration(1, 8), end: new Duration(3, 8), mode: "clip" });
seg.notes.sort((a, b) => a.offset.compareTo(b.offset)).forEach(n => console.log(n.toString()));
console.log(seg.duration.toString());
console.log(new Interval("P5").fraction.toString());
console.log(new Interval("M3").fraction.toString());
console.log(new Interval("M2").fraction.toString());
const C3 = EnumChord.DOM7.toChord("C");
console.log(C3.ratio);
console.log(C3.imaginaryBase.toString());
const c3 = EnumChord.MIN.toChord("C");
console.log(c3.reciprocal);
console.log(c3.imaginaryVertex.toString());

console.log(Duration.random(new Random("2"), new Duration(1, 4), new Duration(3, 1), new Duration(1, 2)));
console.log(new Duration(0.03, 4).div(2));
console.log(new Pitch("C4").getStability(new Pitch("G3")));
console.log(c1.getTendancy(c2));
console.log(c1.add(c2).toString());
console.log(new Note("C").mul(2));
console.log(new Note("C").mul(3));

const c5 = EnumChord.MAJ.toChord("C");
const c4 = EnumChord.MAJ.toChord("G");
const ii = new Interval("P5");
for (let i = 0; i < 12; i++) {
    console.log(c4.toString() + ": " + c5.getStability(c4));
    c4.base.add(ii);
}
*/
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map