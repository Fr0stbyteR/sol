/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Chord.ts":
/*!**********************!*\
  !*** ./src/Chord.ts ***!
  \**********************/
/*! exports provided: EnumChord, isChord, Chord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumChord", function() { return EnumChord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isChord", function() { return isChord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chord", function() { return Chord; });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class EnumChord extends _Enum__WEBPACK_IMPORTED_MODULE_3__["Enum"] {
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

  constructor(nameIn) {
    super();

    _defineProperty(this, "_name", void 0);

    _defineProperty(this, "intervals", void 0);

    this._name = nameIn;

    for (var _len = arguments.length, intervalsIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      intervalsIn[_key - 1] = arguments[_key];
    }

    this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"].fromArray(...intervalsIn);
  }

  static byChord(chordIn) {
    return this.values().find(enumChord => {
      return enumChord.intervals.length === chordIn.intervals.length && enumChord.intervals.every((interval, i) => interval.equals(chordIn.intervals[i]));
    }) || null;
  }

  static byName(chordIn) {
    return EnumChord[chordIn];
  }

}

_defineProperty(EnumChord, "indexes", ["MAJ", "MIN", "AUG", "DIM", "SUS2", "SUS", "SUS4", "DOM7", "MAJ7", "MINMAJ7", "MIN7", "AUGMAJ7", "AUG7", "DIMMIN7", "DIM7", "DOM7DIM5"]);

var isChord = x => {
  return typeof x === "object" && Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNote"])(x.base) && Object(_Interval__WEBPACK_IMPORTED_MODULE_0__["isIntervalArray"])(x.intervals) && typeof x.isAbsolute === "boolean";
};
var _Symbol$iterator = Symbol.iterator;
class Chord {
  // Intervals from base

  /**
   * Gives a new Chord instance (clone)
   * @param {(Chord | TChord)} chordIn
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
    _defineProperty(this, "base", void 0);

    _defineProperty(this, "intervals", void 0);

    _defineProperty(this, "isAbsolute", void 0);

    this.base = null;
    this.intervals = [];
    this.isAbsolute = false;

    if (isChord(first)) {
      this.base = first.base;
      this.intervals = first.intervals;
      this.isAbsolute = first.isAbsolute;
    } else if (typeof first === "string") {
      var isPitch = _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"].REGEX.exec(first);
      if (isPitch) this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"](first);else this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__["Note"](first);
    } else {
      this.base = first;
    }

    this.isAbsolute = true;

    for (var _len2 = arguments.length, arrayIn = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      arrayIn[_key2 - 1] = arguments[_key2];
    }

    if (arrayIn.find(e => e instanceof _Note__WEBPACK_IMPORTED_MODULE_1__["Note"] && !(e instanceof _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]))) this.isAbsolute = false;
    if (!this.isAbsolute) this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__["Note"](this.base);

    if (Object(_Pitch__WEBPACK_IMPORTED_MODULE_2__["isPitchArray"])(arrayIn) && this.isAbsolute) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"].compare).map(pitch => this.base.getInterval(pitch));
    } else if (Object(_Note__WEBPACK_IMPORTED_MODULE_1__["isNoteArray"])(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    } else if (Object(_Interval__WEBPACK_IMPORTED_MODULE_0__["isIntervalArray"])(arrayIn)) {
      this.intervals = arrayIn.sort(_Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"].compare);
    } else {
      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"].fromArray(...arrayIn).sort(_Interval__WEBPACK_IMPORTED_MODULE_0__["Interval"].compare);
    }

    return this;
  }

  get size() {
    return this.intervals.length + 1;
  }

  get notes() {
    return [this.base, ...this.intervals.map(i => this.base.clone().add(i))];
  }

  contains(noteIn) {
    return !!this.notes.find(note => noteIn.equals(note));
  }

  getEnumChord() {
    return EnumChord.byChord(this);
  }

  toString() {
    return this.base.toString() + ":" + this.intervals.toString();
  }

  clone() {
    return new Chord(this);
  }

  [_Symbol$iterator]() {
    var o = this;
    var i = -1;
    return {
      next() {
        var value;
        var done = true;

        if (i < o.intervals.length) {
          value = i === -1 ? o.base : o.base.clone().add(o.intervals[i]);
          i++;
          done = false;
        }

        return {
          value,
          done
        };
      }

    };
  }

}

/***/ }),

/***/ "./src/Enum.ts":
/*!*********************!*\
  !*** ./src/Enum.ts ***!
  \*********************/
/*! exports provided: Enum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enum", function() { return Enum; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Enum {
  static values() {
    return this.indexes.map(key => this[key]);
  }

  static valueOf(key) {
    return this[key];
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

_defineProperty(Enum, "indexes", []);

/***/ }),

/***/ "./src/Frequency.ts":
/*!**************************!*\
  !*** ./src/Frequency.ts ***!
  \**************************/
/*! exports provided: Frequency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Frequency", function() { return Frequency; });
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Frequency {
  static toPitch(f) {
    return new _Pitch__WEBPACK_IMPORTED_MODULE_0__["Pitch"](69 + 12 * (Math.log(f / Frequency.A440) / Math.log(2)));
  }

}

_defineProperty(Frequency, "A440", 440);

_defineProperty(Frequency, "SEMITONE", Math.pow(2, 1 / 12));

_defineProperty(Frequency, "THRES_AUDIT", Math.pow(2, 1 / 36));

/***/ }),

/***/ "./src/Interval.ts":
/*!*************************!*\
  !*** ./src/Interval.ts ***!
  \*************************/
/*! exports provided: isInterval, isIntervalArray, DEGREE_TO_OFFSET, Interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInterval", function() { return isInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIntervalArray", function() { return isIntervalArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEGREE_TO_OFFSET", function() { return DEGREE_TO_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interval", function() { return Interval; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isInterval = x => {
  return typeof x === "object" && typeof x.degree === "number" && typeof x.onset === "number" && typeof x.octave === "number";
};
var isIntervalArray = x => {
  if (!Array.isArray(x)) return false;
  return x.every(el => el instanceof Interval);
};
var DEGREE_TO_OFFSET = [0, 2, 4, 5, 7, 9, 11];

class EnumIntervalProperty extends _Enum__WEBPACK_IMPORTED_MODULE_1__["Enum"] {
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
    var degree = typeof degreeIn === "number" ? _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(degreeIn - 1, 7) + 1 : 1;

    if (degree === 1 || degree === 4 || degree === 5) {
      if (propertyIn === EnumIntervalProperty.PERFECT) return 0;
      if (propertyIn === EnumIntervalProperty.AUGMENTED) return 1;
      if (propertyIn === EnumIntervalProperty.DIMINISHED) return -1;
    } else {
      if (propertyIn === EnumIntervalProperty.MAJOR) return 0;
      if (propertyIn === EnumIntervalProperty.MINOR) return -1;
      if (propertyIn === EnumIntervalProperty.AUGMENTED) return 1;
      if (propertyIn === EnumIntervalProperty.DIMINISHED) return -2;
    }

    return 0;
  }

  static getPropertyFromOffset(onsetIn, degreeIn) {
    var degree = typeof degreeIn === "number" ? _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(degreeIn - 1, 7) + 1 : 1;

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
    return typeof degreeIn === "number" ? DEGREE_TO_OFFSET[_Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(degreeIn - 1, 7)] + 12 * Math.floor((degreeIn - 1) / 7) : 0;
  }
  /**
   * Returns Unison
   * @memberof Interval
   */


  constructor(first, second, third) {
    _defineProperty(this, "degree", void 0);

    _defineProperty(this, "onset", void 0);

    _defineProperty(this, "octave", void 0);

    this.degree = 0;
    this.onset = 0;
    this.octave = 0;

    if (isInterval(first)) {
      this.constructor(first.degree, first.onset, first.octave);
    } else if (typeof first === "string") {
      this.fromString(first);
    } else if (typeof first === "number") {
      this.degree = _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(first - 1, 7) + 1;
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
      if (DEGREE_TO_OFFSET[i] === _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(offsetIn, 12)) {
        degree = i + 1;
        onset = 0;
        break;
      } else if (DEGREE_TO_OFFSET[i] === _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(offsetIn, 12) + 1) {
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

  add(iIn) {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(this.degree + iIn.degree - 1 - 1, 7) + 1;
    i.onset = this.offset - 12 * this.octave + iIn.offset - 12 * iIn.octave - Interval.getOffsetFromDegree(this.degree + iIn.degree - 1);
    i.octave = this.octave + iIn.octave + (this.degree + iIn.degree - 1 - 1) / 7;
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  sub(iIn) {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(this.degree - iIn.degree + 1 - 1, 7) + 1;
    i.onset = this.offset - 12 * this.octave - (iIn.offset - 12 * iIn.octave) - Interval.getOffsetFromDegree(this.degree - iIn.degree + 1);
    i.octave = this.octave - iIn.octave + Math.floor((this.degree - iIn.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  reverse() {
    var i = {
      degree: 0,
      onset: 0,
      octave: 0
    };
    i.degree = _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(1 - this.degree, 7) + 1;
    i.onset = 0 - (this.offset - 12 * this.octave) - Interval.getOffsetFromDegree(1 - this.degree + 1);
    i.octave = 0 - this.octave + Math.floor((1 - this.degree + 1 - 1) / 7);
    this.degree = i.degree;
    this.onset = i.onset;
    this.octave = i.octave;
    return this;
  }

  get offset() {
    return DEGREE_TO_OFFSET[_Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(this.degree - 1, 7)] + 12 * Math.floor((this.degree - 1) / 7) + this.onset + 12 * this.octave;
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

  equals(intervalIn) {
    return isInterval(intervalIn) && this.degree === intervalIn.degree && this.onset === intervalIn.onset && this.octave === intervalIn.octave;
  }

  toString() {
    var sOnset = this.property ? this.property.abb : (this.onset > 0 ? "+" : "") + this.onset.toString() + "_";
    var sOctave = this.octave > 0 ? "+" + this.octave : this.octave < 0 ? this.octave : "";
    return sOnset + this.degree + sOctave;
  }

  clone() {
    return new Interval(this);
  }

  static compare(x, y) {
    return x.offset - y.offset;
  }

}

_defineProperty(Interval, "REGEX", /^([PMmAd])([0-9]+)((\+|-)\d+)?$/);

/***/ }),

/***/ "./src/Note.ts":
/*!*********************!*\
  !*** ./src/Note.ts ***!
  \*********************/
/*! exports provided: EnumNote, isNote, isNoteArray, Note */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumNote", function() { return EnumNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNote", function() { return isNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNoteArray", function() { return isNoteArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Note", function() { return Note; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class EnumNote extends _Enum__WEBPACK_IMPORTED_MODULE_2__["Enum"] {
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
    var name = EnumNote.offsetMap[_Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(offsetIn, 12)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with offset ".concat(offsetIn, "."));
  }

  static byIndex(indexIn) {
    if (typeof indexIn !== "number") return null;
    var name = EnumNote.indexes[_Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(indexIn, 7)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with index ".concat(indexIn, "."));
  }

  name() {
    return EnumNote.offsetMap[this.offset];
  }

  get index() {
    return _Interval__WEBPACK_IMPORTED_MODULE_1__["DEGREE_TO_OFFSET"].indexOf(this.offset);
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
  if (!Array.isArray(x)) return false;
  return x.every(el => el instanceof Note);
};
class Note {
  /**
   * Returns C
   * @memberof Note
   */

  /**
   * New note
   * @param {(EnumNote)} noteIn
   * @param {number} [alteration]
   * @memberof Note
   */

  /**
   * Gives a new Note instance (clone)
   * @param {(Note | TNote | string)} noteIn
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
    _defineProperty(this, "enumNote", void 0);

    _defineProperty(this, "alteration", void 0);

    this.enumNote = EnumNote.C;
    this.alteration = 0;

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
    var note = _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(offsetIn, 12);
    var offset = 11;

    for (var i = _Interval__WEBPACK_IMPORTED_MODULE_1__["DEGREE_TO_OFFSET"].length - 1; i >= 0; i--) {
      var el = _Interval__WEBPACK_IMPORTED_MODULE_1__["DEGREE_TO_OFFSET"][i];

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

  add(iIn) {
    if (typeof iIn === "number") return this.fromOffset(this.offset + iIn);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"]) i = iIn;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index + i.degree - 1);
    this.alteration += i.offset - 12 * i.octave - _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(newEnumNote.offset - this.enumNote.offset, 12);
    this.enumNote = newEnumNote;
    return this;
  }

  sub(iIn) {
    if (typeof iIn === "number") return this.fromOffset(this.offset - iIn);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"]) i = iIn;
    var newEnumNote = EnumNote.byIndex(this.enumNote.index - i.degree + 1);
    this.alteration += i.offset - 12 * i.octave - _Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(this.enumNote.offset - newEnumNote.offset, 12);
    this.enumNote = newEnumNote;
    return this;
  }

  equals(noteIn) {
    return isNote(noteIn) && this.enumNote.equals(noteIn.enumNote) && this.alteration === noteIn.alteration;
  }

  getInterval(noteIn) {
    if (!isNote(noteIn)) throw new TypeError("Cannot get Interval with other object than Note");
    var that = noteIn instanceof Note ? noteIn : new Note(noteIn);
    var degree = that.enumNote.index - this.enumNote.index + 1;
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"].getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](degree, onset, octave);
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

}

_defineProperty(Note, "REGEX", /^([b#]*)([a-gA-G])$/);

/***/ }),

/***/ "./src/Pitch.ts":
/*!**********************!*\
  !*** ./src/Pitch.ts ***!
  \**********************/
/*! exports provided: isPitch, isPitchArray, Pitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPitch", function() { return isPitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPitchArray", function() { return isPitchArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pitch", function() { return Pitch; });
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isPitch = x => {
  return x instanceof Pitch || typeof x === "object" && x.enumNote instanceof _Note__WEBPACK_IMPORTED_MODULE_0__["EnumNote"] && typeof x.alteration === "number" && typeof x.octave === "number";
};
var isPitchArray = x => {
  if (!Array.isArray(x)) return false;
  return x.every(el => el instanceof Pitch);
};
class Pitch extends _Note__WEBPACK_IMPORTED_MODULE_0__["Note"] {
  /**
   * Returns C0
   * @memberof Pitch
   */

  /**
   * Gives a new Pitch instance (clone)
   * @param {Pitch | TPitch} pitchIn
   * @memberof Pitch
   */

  /**
   * Add octave info to a note
   * @param {(Note | EnumNote | TNote)} noteIn
   * @param {number} [octaveIn]
   * @memberof Pitch
   */

  /**
   * Parses pitch string.
   * @example
   * new Pitch("##E5");
   * @throws {SyntaxError} when parse failed
   * @param {string} pitchIn
   * @memberof Note
   */

  /**
   * Creates an instance of Pitch with index
   * @param {number} pitchIn
   * @memberof Pitch
   */

  /**
   * Creates an instance of Pitch with index
   * @param {number} pitchIn
   * @memberof Pitch
   */
  constructor(first, second) {
    if (isPitch(first)) {
      super(first);

      _defineProperty(this, "octave", void 0);

      this.octave = first.octave;
    } else if (first instanceof _Note__WEBPACK_IMPORTED_MODULE_0__["EnumNote"] || Object(_Note__WEBPACK_IMPORTED_MODULE_0__["isNote"])(first)) {
      super(first);

      _defineProperty(this, "octave", void 0);

      this.octave = second || 0;
    } else if (typeof first === "string") {
      super();

      _defineProperty(this, "octave", void 0);

      this.fromString(first);
    } else if (typeof first === "number") {
      super(first);

      _defineProperty(this, "octave", void 0);

      this.octave = Math.floor(first / 12 - 1);
    } else {
      super();

      _defineProperty(this, "octave", void 0);
    }

    return this;
  }

  static fromString(nameIn) {
    var matched = Pitch.REGEX.exec(nameIn);
    if (matched === null) throw new SyntaxError("No such pitch ".concat(nameIn, "."));
    var octave = parseInt(matched[2]) || 0;
    return _objectSpread({}, _Note__WEBPACK_IMPORTED_MODULE_0__["Note"].fromString(matched[1]), {
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
    return _objectSpread({}, super.fromOffset(offsetIn), {
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
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"]) i = iIn;
    this.octave += Math.floor((this.enumNote.index + i.degree - 1) / 7) + i.octave;
    return super.add(i);
  }

  sub(iIn) {
    if (typeof iIn === "number") return this.fromOffset(this.offset - iIn);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"]) i = iIn;
    this.octave += Math.floor((this.enumNote.index - i.degree + 1) / 7) - i.octave;
    return super.sub(i);
  }

  equals(pitchIn) {
    return super.equals(pitchIn) && isPitch(pitchIn) && this.octave === pitchIn.octave;
  }

  getInterval(pitchIn) {
    if (!isPitch(pitchIn)) throw new TypeError("Cannot get Interval with other object than Pitch");
    var that = pitchIn instanceof Pitch ? pitchIn : new Pitch(pitchIn);
    var degree = that.enumNote.index - this.enumNote.index + 1 + (pitchIn.octave - this.octave) * 7;
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"].getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"](degree, onset, octave);
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

  static compare(x, y) {
    return x.offset - y.offset;
  }

}

_defineProperty(Pitch, "REGEX", /^([b#]*[a-gA-G])(-?\d+)?$/);

/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
var Utils = {
  floorMod: (x, y) => {
    return (x % y + y) % y;
  }
};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
/* eslint-disable no-console */





new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("#G").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C"));
console.log(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("#G").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("#C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("G")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("bC")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("#C")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("bB")).toString());
console.log(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("#A")).toString());
var n = new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"](1);
console.log(n.toString());
var p = new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("##F0");
console.log(p.add("A4").toString() + " " + p.offset);
var f = 440;
console.log(_Frequency__WEBPACK_IMPORTED_MODULE_3__["Frequency"].toPitch(f).offset);
var c = new _Chord__WEBPACK_IMPORTED_MODULE_4__["Chord"](new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("C1"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("bC2"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("#C1"));
console.log(c.toString());
console.log(new _Interval__WEBPACK_IMPORTED_MODULE_1__["Interval"]("M3").reverse().toString());
console.log(c.notes.toString());
console.log(c.contains(new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("#C1")));
var c1 = new _Chord__WEBPACK_IMPORTED_MODULE_4__["Chord"](new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("C1"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("E1"), new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"]("G1"));
console.log(c1.getEnumChord());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map