/******/ "use strict";
/******/ var __webpack_modules__ = ({

/***/ "./src/Articulation.ts":
/*!*****************************!*\
  !*** ./src/Articulation.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    _defineProperty(this, "velocity", void 0);

    _defineProperty(this, "length", void 0);

    if (isArticulation(first)) {
      this.velocity = first.velocity;
      this.length = first.length;
    } else {
      this.velocity = first;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Articulation);

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
/* harmony export */   "Chord": () => (/* binding */ Chord),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
var _Symbol$iterator;

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

  constructor(first) {
    super();

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "intervals", void 0);

    if (typeof first === "string") {
      this._name = first;

      for (var _len = arguments.length, intervalsIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        intervalsIn[_key - 1] = arguments[_key];
      }

      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(...intervalsIn);
    } else {
      this._name = first._name;
      this.intervals = first.intervals.map(i => i.clone());
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
  constructor(first) {
    _defineProperty(this, "base", void 0);

    _defineProperty(this, "intervals", void 0);

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
      var _isNote = _Note__WEBPACK_IMPORTED_MODULE_1__.default.REGEX.exec(first);

      if (_isNote) this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(first);else this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(first);
    } else {
      this.base = first;
    }

    for (var _len3 = arguments.length, arrayIn = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      arrayIn[_key3 - 1] = arguments[_key3];
    }

    if ((0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitchArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__.default.compare).map(pitch => this.base.getInterval(pitch));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    } else if ((0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.default.compare);
    } else {
      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(...arrayIn).sort(_Interval__WEBPACK_IMPORTED_MODULE_0__.default.compare);
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

    if ((0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitchArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__.default.compare).map(pitch => this.base.getInterval(pitch));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    }
  }

  get isAbsolute() {
    return this.base instanceof _Pitch__WEBPACK_IMPORTED_MODULE_2__.default;
  }

  get ratio() {
    return (0,_utils1__WEBPACK_IMPORTED_MODULE_4__.nearestFractions)([1, ...this.intervals.map(i => i.ratio)]);
  }

  get reciprocal() {
    return (0,_utils1__WEBPACK_IMPORTED_MODULE_4__.nearestReciprocals)([1, ...this.intervals.map(i => i.ratio)]);
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
    return this.base.div(this.ratio[0]);
  }

  get imaginaryVertex() {
    return this.base.mul(this.reciprocal[0]);
  }

  add(first) {
    if (first instanceof _Interval__WEBPACK_IMPORTED_MODULE_0__.default) {
      this.intervals.push(first);
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(first)) {
      this.intervals.push(this.base.getInterval(first));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(first)) {
      this.intervals.push(...first.map(p => this.base.getInterval(p)));
    } else {
      var d = this.base.getInterval(first.base);

      var _iterator2 = _createForOfIteratorHelper(first.intervals),
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

  sub(first) {
    if (first instanceof _Interval__WEBPACK_IMPORTED_MODULE_0__.default) {
      this.intervals = this.intervals.filter(i0 => !i0.equals(first));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(first)) {
      var that = first instanceof _Note__WEBPACK_IMPORTED_MODULE_1__.default ? first : (0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitch)(first) ? new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(first) : new _Note__WEBPACK_IMPORTED_MODULE_1__.default(first);
      var notes = this.notes.filter(n0 => !that.equals(n0));
      if (!notes.length) return null;
      this.notes = notes;
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(first)) {
      var _notes = this.notes;
      first.forEach(n => {
        var that = n instanceof _Note__WEBPACK_IMPORTED_MODULE_1__.default ? n : (0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitch)(n) ? new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(n) : new _Note__WEBPACK_IMPORTED_MODULE_1__.default(n);
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

    return /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iterator3, _step3, note;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(_this.notes);
              _context.prev = 1;

              _iterator3.s();

            case 3:
              if ((_step3 = _iterator3.n()).done) {
                _context.next = 9;
                break;
              }

              note = _step3.value;
              _context.next = 7;
              return note;

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator3.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator3.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 11, 14, 17]]);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chord);

/***/ }),

/***/ "./src/Color.ts":
/*!**********************!*\
  !*** ./src/Color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isColor": () => (/* binding */ isColor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var isColor = x => {
  return x instanceof Color || typeof x === "object" && typeof x.t === "number" && typeof x.s === "number" && typeof x.d === "number" && x.major === "number";
};

class Color {
  constructor(first, s, d, major) {
    _defineProperty(this, "t", void 0);

    _defineProperty(this, "s", void 0);

    _defineProperty(this, "d", void 0);

    _defineProperty(this, "major", void 0);

    if (isColor(first)) {
      this.t = first.t;
      this.s = first.s;
      this.d = first.d;
      this.major = first.major;
    } else if ((0,_utils1__WEBPACK_IMPORTED_MODULE_0__.isNumberArray)(first)) {
      this.fromArray(first);
    } else {
      this.t = first || 0;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Color);

/***/ }),

/***/ "./src/Duration.ts":
/*!*************************!*\
  !*** ./src/Duration.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDuration": () => (/* binding */ isDuration),
/* harmony export */   "Duration": () => (/* binding */ Duration),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


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
  // Absolute duration if in abs mode.
  constructor(first, second) {
    _defineProperty(this, "isAbsolute", void 0);

    _defineProperty(this, "numerator", void 0);

    _defineProperty(this, "denominator", void 0);

    _defineProperty(this, "seconds", void 0);

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
    var f = Math.max((0,_utils1__WEBPACK_IMPORTED_MODULE_0__.precisionFactor)(this.numerator), (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.precisionFactor)(this.denominator));
    var $gcd = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.gcd)(this.numerator * f, this.denominator * f) / f;

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Duration);

/***/ }),

/***/ "./src/Enum.ts":
/*!*********************!*\
  !*** ./src/Enum.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInterval": () => (/* binding */ isInterval),
/* harmony export */   "isIntervalArray": () => (/* binding */ isIntervalArray),
/* harmony export */   "DEGREE_TO_OFFSET": () => (/* binding */ DEGREE_TO_OFFSET),
/* harmony export */   "Interval": () => (/* binding */ Interval),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
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
    var degree = typeof degreeIn === "number" ? (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1 : 1;

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
    var degree = typeof degreeIn === "number" ? (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1 : 1;

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
    return typeof degreeIn === "number" ? DEGREE_TO_OFFSET[(0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7)] + 12 * Math.floor((degreeIn - 1) / 7) : 0;
  }
  /**
   * Returns Unison
   */


  constructor(first, second, third) {
    _defineProperty(this, "degree", void 0);

    _defineProperty(this, "onset", void 0);

    _defineProperty(this, "octave", void 0);

    this.degree = 0;
    this.onset = 0;
    this.octave = 0;

    if (isInterval(first)) {
      this.fromInterval(first.degree, first.onset, first.octave);
    } else if (typeof first === "string") {
      this.fromString(first);
    } else if (typeof first === "number") {
      this.fromInterval(first, second, third);
    }
  }

  fromInterval(degreeIn) {
    var onsetIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var octaveIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.degree = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(degreeIn - 1, 7) + 1;
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
      if (DEGREE_TO_OFFSET[i] === (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12)) {
        degree = i + 1;
        onset = 0;
        break;
      } else if (DEGREE_TO_OFFSET[i] === (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12) + 1) {
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
    i.degree = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree + iIn.degree - 1 - 1, 7) + 1;
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
    i.degree = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree - iIn.degree + 1 - 1, 7) + 1;
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
    i.degree = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(1 - this.degree, 7) + 1;
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
    i.degree = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(1 - this.degree, 7) + 1;
    i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
    i.octave = 1 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  get offset() {
    return DEGREE_TO_OFFSET[(0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.degree - 1, 7)] + 12 * Math.floor((this.degree - 1) / 7) + this.onset + 12 * this.octave;
  }

  get ratio() {
    return _Frequency__WEBPACK_IMPORTED_MODULE_2__.default.getRatio(this.offset);
  }

  get fraction() {
    return (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.nearestFraction)(this.ratio);
  }

  get reciprocal() {
    return (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.nearestReciprocal)(this.ratio);
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

_defineProperty(Interval, "REGEX", /^([PMmAd])([0-9]+)((\+|-)\d+)?$/);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Interval);

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
/* harmony export */   "Note": () => (/* binding */ Note),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    var name = EnumNote.offsetMap[(0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with offset ".concat(offsetIn, "."));
  }

  static byIndex(indexIn) {
    if (typeof indexIn !== "number") return null;
    var name = EnumNote.indexes[(0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(indexIn, 7)];
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
   * new Note("##E");
   * @throws {SyntaxError} when parse failed
   */

  /**
   * Creates an instance of Note.
   */
  constructor(first, second) {
    _defineProperty(this, "enumNote", void 0);

    _defineProperty(this, "alteration", void 0);

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
    var note = (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(offsetIn, 12);
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

  add(first) {
    if (typeof first === "number") return this.fromOffset(this.offset + first);
    if (first instanceof Note) return this.become(first);
    var i;
    if (typeof first === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(first);else if (first instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = first;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index + i.degree - 1);
    this.alteration += i.offset - 12 * i.octave - (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(newEnumNote.offset - this.enumNote.offset, 12);
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
    if (typeof first === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(first);else if (first instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = first;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index - i.degree + 1);
    this.alteration += i.offset - 12 * i.octave - (0,_utils1__WEBPACK_IMPORTED_MODULE_0__.floorMod)(this.enumNote.offset - newEnumNote.offset, 12);
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

    var _Interval$fraction = _slicedToArray(new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(_Interval__WEBPACK_IMPORTED_MODULE_1__.default.fromOffset(d)).fraction, 2),
        f = _Interval$fraction[1];

    return 1 / f;
  }

}

_defineProperty(Note, "REGEX", /^([b#]*)([a-gA-G])$/);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Note);

/***/ }),

/***/ "./src/Param.ts":
/*!**********************!*\
  !*** ./src/Param.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Param);

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
/* harmony export */   "Pitch": () => (/* binding */ Pitch),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
class Pitch extends _Note__WEBPACK_IMPORTED_MODULE_0__.default {
  static fromFrequency(f) {
    return new Pitch(69 + 12 * (Math.log(f / _Frequency__WEBPACK_IMPORTED_MODULE_2__.default.A440) / Math.log(2)));
  }

  /**
   * Creates an instance of Pitch with index
   */
  constructor(first, second) {
    super();

    _defineProperty(this, "octave", void 0);

    this.become(first, second);
  }

  become(first, second) {
    if (isPitch(first)) {
      super.become(first);
      this.octave = first.octave;
    } else if (first instanceof _Note__WEBPACK_IMPORTED_MODULE_0__.EnumNote) {
      super.become(first);
      this.octave = second || 0;
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_0__.isNote)(first)) {
      super.become(first);
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

_defineProperty(Pitch, "REGEX", /^([b#]*[a-gA-G])(-?\d+)?$/);

_defineProperty(Pitch, "MINIMUM", Pitch.fromFrequency(20));

_defineProperty(Pitch, "MAXIMUM", Pitch.fromFrequency(20000));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pitch);

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
/* harmony export */   "Scale": () => (/* binding */ Scale),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
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
  return x instanceof Scale || typeof x === "object" && (0,_utils1__WEBPACK_IMPORTED_MODULE_1__.isStringArray)(x.degreeNames) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
};
_Symbol$iterator = Symbol.iterator;
class Scale {
  constructor(first) {
    _defineProperty(this, "scaleName", void 0);

    _defineProperty(this, "intervals", void 0);

    _defineProperty(this, "degreeNames", void 0);

    if (typeof first === "string") {
      this.scaleName = first;
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
      this.scaleName = first.scaleName;
      this.intervals = first.intervals.map(i => i.clone());
      this.degreeNames = [...first.degreeNames];
    }
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
      return (0,_utils1__WEBPACK_IMPORTED_MODULE_1__.floorMod)(degreeIn - 1, this.intervals.length) + 1 === interval.degree;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Scale);

/***/ }),

/***/ "./src/TimeCode.ts":
/*!*************************!*\
  !*** ./src/TimeCode.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  constructor(first, second, third) {
    _defineProperty(this, "beats", void 0);

    _defineProperty(this, "beatDuration", void 0);

    _defineProperty(this, "bpm", void 0);

    if (isTimeCode(first)) {
      this.beats = first.beats;
      this.beatDuration = first.beatDuration;
      this.bpm = first.bpm;
    } else {
      this.beats = first || 4;
      this.beatDuration = second || 4;
      this.bpm = third || 60;
    }
  }

  getAbsoluteDuration(beatsIn) {
    return (typeof beatsIn === "number" ? beatsIn : 1) * this.bpm / 60;
  }

  toString() {
    return this.beats + "/" + this.beatDuration + " @" + this.bpm;
  }

  clone() {
    return new TimeCode(this);
  }

}

_defineProperty(TimeCode, "DEFAULT", new TimeCode(4, 4, 60));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeCode);

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
/* harmony export */   "TonalChord": () => (/* binding */ TonalChord),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* harmony import */ var _utils1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils1 */ "./src/utils1.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isTonalChord = x => {
  return x instanceof TonalChord || typeof x.alteration === "number" && typeof x.degree === "number" && x.chord instanceof _Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord;
};
var isTonalChordArray = x => {
  return Array.isArray(x) && x.every(e => e instanceof TonalChord);
};
class TonalChord {
  constructor(first) {
    _defineProperty(this, "alteration", void 0);

    _defineProperty(this, "degree", void 0);

    _defineProperty(this, "chord", void 0);

    if (typeof first === "string") {
      var matched = TonalChord.REGEX1.exec(first);

      if (matched) {
        var s = matched[1];
        this.alteration = s === "#" ? 1 : s === "b" ? -1 : 0;
        s = matched[2];
        var p = (0,_utils1__WEBPACK_IMPORTED_MODULE_1__.parseRoman)(s);
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
    s += (0,_utils1__WEBPACK_IMPORTED_MODULE_1__.toRoman)(this.degree * (this.chord.equals(_Chord__WEBPACK_IMPORTED_MODULE_0__.EnumChord.MIN) ? -1 : 1));

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TonalChord);

/***/ }),

/***/ "./src/Tonality.ts":
/*!*************************!*\
  !*** ./src/Tonality.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
  constructor(first, second) {
    _defineProperty(this, "note", void 0);

    _defineProperty(this, "scale", void 0);

    if (isTonality(first)) {
      this.note = first.note.clone();
      this.scale = first.scale.clone();
    } else if (typeof first === "string") {
      try {
        this.note = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(first);
      } catch (e) {
        throw new Error("No such tonality: ".concat(first, "."));
      }

      this.scale = first.substr(first.length - 1).match("[A-G]") ? _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MAJOR : _Scale__WEBPACK_IMPORTED_MODULE_0__.EnumScale.MINOR;
    } else {
      this.note = first;
      this.scale = second;
    }
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tonality);

/***/ }),

/***/ "./src/Velocity.ts":
/*!*************************!*\
  !*** ./src/Velocity.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Velocity);

/***/ }),

/***/ "./src/utils1.ts":
/*!***********************!*\
  !*** ./src/utils1.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Articulation": () => (/* reexport module object */ _Articulation__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "Chord": () => (/* reexport module object */ _Chord__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "Color": () => (/* reexport module object */ _Color__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "Duration": () => (/* reexport module object */ _Duration__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "Frequency": () => (/* reexport module object */ _Frequency__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   "Interval": () => (/* reexport module object */ _Interval__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "Note": () => (/* reexport module object */ _Note__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   "Param": () => (/* reexport module object */ _Param__WEBPACK_IMPORTED_MODULE_7__),
/* harmony export */   "Pitch": () => (/* reexport module object */ _Pitch__WEBPACK_IMPORTED_MODULE_8__),
/* harmony export */   "Scale": () => (/* reexport module object */ _Scale__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   "TimeCode": () => (/* reexport module object */ _TimeCode__WEBPACK_IMPORTED_MODULE_10__),
/* harmony export */   "TonalChord": () => (/* reexport module object */ _TonalChord__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   "Tonality": () => (/* reexport module object */ _Tonality__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   "Velocity": () => (/* reexport module object */ _Velocity__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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










































/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  Articulation: _Articulation__WEBPACK_IMPORTED_MODULE_0__.default,
  Chord: _Chord__WEBPACK_IMPORTED_MODULE_1__.default,
  Color: _Color__WEBPACK_IMPORTED_MODULE_2__.default,
  Duration: _Duration__WEBPACK_IMPORTED_MODULE_3__.default,
  Frequency: _Frequency__WEBPACK_IMPORTED_MODULE_4__.default,
  Interval: _Interval__WEBPACK_IMPORTED_MODULE_5__.default,
  Note: _Note__WEBPACK_IMPORTED_MODULE_6__.default,
  Param: _Param__WEBPACK_IMPORTED_MODULE_7__.default,
  Pitch: _Pitch__WEBPACK_IMPORTED_MODULE_8__.default,
  Scale: _Scale__WEBPACK_IMPORTED_MODULE_9__.default,
  TimeCode: _TimeCode__WEBPACK_IMPORTED_MODULE_10__.default,
  TonalChord: _TonalChord__WEBPACK_IMPORTED_MODULE_11__.default,
  Tonality: _Tonality__WEBPACK_IMPORTED_MODULE_12__.default,
  Velocity: _Velocity__WEBPACK_IMPORTED_MODULE_13__.default
});
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

console.log(new Random("1").randint(0, 100));

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

var __webpack_exports__Articulation = __webpack_exports__.Articulation;
var __webpack_exports__Chord = __webpack_exports__.Chord;
var __webpack_exports__Color = __webpack_exports__.Color;
var __webpack_exports__Duration = __webpack_exports__.Duration;
var __webpack_exports__Frequency = __webpack_exports__.Frequency;
var __webpack_exports__Interval = __webpack_exports__.Interval;
var __webpack_exports__Note = __webpack_exports__.Note;
var __webpack_exports__Param = __webpack_exports__.Param;
var __webpack_exports__Pitch = __webpack_exports__.Pitch;
var __webpack_exports__Scale = __webpack_exports__.Scale;
var __webpack_exports__TimeCode = __webpack_exports__.TimeCode;
var __webpack_exports__TonalChord = __webpack_exports__.TonalChord;
var __webpack_exports__Tonality = __webpack_exports__.Tonality;
var __webpack_exports__Velocity = __webpack_exports__.Velocity;
var __webpack_exports__default = __webpack_exports__.default;
export { __webpack_exports__Articulation as Articulation, __webpack_exports__Chord as Chord, __webpack_exports__Color as Color, __webpack_exports__Duration as Duration, __webpack_exports__Frequency as Frequency, __webpack_exports__Interval as Interval, __webpack_exports__Note as Note, __webpack_exports__Param as Param, __webpack_exports__Pitch as Pitch, __webpack_exports__Scale as Scale, __webpack_exports__TimeCode as TimeCode, __webpack_exports__TonalChord as TonalChord, __webpack_exports__Tonality as Tonality, __webpack_exports__Velocity as Velocity, __webpack_exports__default as default };

//# sourceMappingURL=index.js.map