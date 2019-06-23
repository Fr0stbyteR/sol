(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sol"] = factory();
	else
		root["sol"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/*! exports provided: Chord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chord", function() { return Chord; });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var _Symbol$iterator = Symbol.iterator;
class Chord {
  // Intervals from base
  constructor(baseIn) {
    _defineProperty(this, "base", void 0);

    _defineProperty(this, "intervals", void 0);

    _defineProperty(this, "isAbsolute", void 0);

    this.base = null;
    this.intervals = [];
    this.isAbsolute = false;

    if (typeof baseIn === "string") {
      var isPitch = _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"].REGEX.exec(baseIn);
      if (isPitch) this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__["Pitch"](baseIn);else this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__["Note"](baseIn);
    } else {
      this.base = baseIn;
    }

    this.isAbsolute = true;

    for (var _len = arguments.length, arrayIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arrayIn[_key - 1] = arguments[_key];
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

  toString() {
    return this.base.toString() + ":" + this.intervals.toString();
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var isInterval = x => {
  return typeof x === "object" && typeof x.degree === "number" && typeof x.onset === "number" && typeof x.octave === "number";
};
var isIntervalArray = x => {
  if (!Array.isArray(x)) return false;
  return x.every(el => el instanceof Interval);
};
var DEGREE_TO_OFFSET = [0, 2, 4, 5, 7, 9, 11];

class EnumIntervalProperty {
  static byAbb(abbIn) {
    var name = this.abbMap[abbIn];
    if (name) return EnumIntervalProperty[name];
    throw new SyntaxError("No such interval property with abbreviation ".concat(abbIn, "."));
  }

  constructor(propertyIn) {
    _defineProperty(this, "property", void 0);

    this.property = propertyIn;
  }

  get value() {
    return EnumIntervalProperty.abbMap[this.property];
  }

}

_defineProperty(EnumIntervalProperty, "abbMap", {
  P: "PERFECT",
  M: "MAJOR",
  m: "MINOR",
  A: "AUGMENTED",
  d: "DIMINISHED"
});

_defineProperty(EnumIntervalProperty, "PERFECT", new EnumIntervalProperty("P"));

_defineProperty(EnumIntervalProperty, "MAJOR", new EnumIntervalProperty("M"));

_defineProperty(EnumIntervalProperty, "MINOR", new EnumIntervalProperty("m"));

_defineProperty(EnumIntervalProperty, "AUGMENTED", new EnumIntervalProperty("A"));

_defineProperty(EnumIntervalProperty, "DIMINISHED", new EnumIntervalProperty("d"));

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

  toString() {
    var sOnset = this.property ? this.property.property : (this.onset > 0 ? "+" : "") + this.onset.toString() + "_";
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class EnumNote {
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
    var name = EnumNote.indexMap[_Utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].floorMod(indexIn, 7)];
    if (name) return EnumNote[name];
    throw new SyntaxError("No such note with index ".concat(indexIn, "."));
  }

  get name() {
    return EnumNote.offsetMap[this.offset];
  }

  get index() {
    return _Interval__WEBPACK_IMPORTED_MODULE_1__["DEGREE_TO_OFFSET"].indexOf(this.offset);
  }

  toString() {
    return this.name;
  }

}

_defineProperty(EnumNote, "offsetMap", {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B"
});

_defineProperty(EnumNote, "indexMap", ["C", "D", "E", "F", "G", "A", "B"]);

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
    return (this.alteration > 0 ? "#" : "b").repeat(Math.abs(this.alteration)) + this.enumNote.name;
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





var i = new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("#G").getInterval(new _Note__WEBPACK_IMPORTED_MODULE_0__["Note"]("C"));
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

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zb2wvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NvbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zb2wvLi9zcmMvQ2hvcmQudHMiLCJ3ZWJwYWNrOi8vc29sLy4vc3JjL0ZyZXF1ZW5jeS50cyIsIndlYnBhY2s6Ly9zb2wvLi9zcmMvSW50ZXJ2YWwudHMiLCJ3ZWJwYWNrOi8vc29sLy4vc3JjL05vdGUudHMiLCJ3ZWJwYWNrOi8vc29sLy4vc3JjL1BpdGNoLnRzIiwid2VicGFjazovL3NvbC8uL3NyYy9VdGlscy50cyIsIndlYnBhY2s6Ly9zb2wvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOlsiU3ltYm9sIiwiaXRlcmF0b3IiLCJDaG9yZCIsImNvbnN0cnVjdG9yIiwiYmFzZUluIiwiYmFzZSIsImludGVydmFscyIsImlzQWJzb2x1dGUiLCJpc1BpdGNoIiwiUGl0Y2giLCJSRUdFWCIsImV4ZWMiLCJOb3RlIiwiYXJyYXlJbiIsImZpbmQiLCJlIiwiaXNQaXRjaEFycmF5Iiwic29ydCIsImNvbXBhcmUiLCJtYXAiLCJwaXRjaCIsImdldEludGVydmFsIiwiaXNOb3RlQXJyYXkiLCJub3RlIiwiaXNJbnRlcnZhbEFycmF5IiwiSW50ZXJ2YWwiLCJmcm9tQXJyYXkiLCJ0b1N0cmluZyIsIm8iLCJpIiwibmV4dCIsInZhbHVlIiwiZG9uZSIsImxlbmd0aCIsImNsb25lIiwiYWRkIiwiRnJlcXVlbmN5IiwidG9QaXRjaCIsImYiLCJNYXRoIiwibG9nIiwiQTQ0MCIsImlzSW50ZXJ2YWwiLCJ4IiwiZGVncmVlIiwib25zZXQiLCJvY3RhdmUiLCJBcnJheSIsImlzQXJyYXkiLCJldmVyeSIsImVsIiwiREVHUkVFX1RPX09GRlNFVCIsIkVudW1JbnRlcnZhbFByb3BlcnR5IiwiYnlBYmIiLCJhYmJJbiIsIm5hbWUiLCJhYmJNYXAiLCJTeW50YXhFcnJvciIsInByb3BlcnR5SW4iLCJwcm9wZXJ0eSIsIlAiLCJNIiwibSIsIkEiLCJkIiwiZ2V0T2Zmc2V0RnJvbVByb3BlcnR5IiwiZGVncmVlSW4iLCJVdGlscyIsImZsb29yTW9kIiwiUEVSRkVDVCIsIkFVR01FTlRFRCIsIkRJTUlOSVNIRUQiLCJNQUpPUiIsIk1JTk9SIiwiZ2V0UHJvcGVydHlGcm9tT2Zmc2V0Iiwib25zZXRJbiIsImdldE9mZnNldEZyb21EZWdyZWUiLCJmbG9vciIsImZpcnN0Iiwic2Vjb25kIiwidGhpcmQiLCJmcm9tU3RyaW5nIiwibmFtZUluIiwibWF0Y2hlZCIsInBhcnNlSW50IiwiZnJvbU9mZnNldCIsIm9mZnNldEluIiwiaUluIiwib2Zmc2V0Iiwic3ViIiwicmV2ZXJzZSIsInNPbnNldCIsInNPY3RhdmUiLCJ5IiwiRW51bU5vdGUiLCJDIiwiRCIsIkUiLCJGIiwiRyIsIkIiLCJieU9mZnNldCIsIm9mZnNldE1hcCIsImJ5SW5kZXgiLCJpbmRleEluIiwiaW5kZXhNYXAiLCJpbmRleCIsImluZGV4T2YiLCJpc05vdGUiLCJlbnVtTm90ZSIsImFsdGVyYXRpb24iLCJzcGxpdCIsImZvckVhY2giLCJjIiwiYWx0ZXJhdGlvbkluIiwibmV3RW51bU5vdGUiLCJub3RlSW4iLCJUeXBlRXJyb3IiLCJ0aGF0IiwicmVwZWF0IiwiYWJzIiwicGl0Y2hJbiIsImNvbnNvbGUiLCJuIiwicCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0Es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aW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzb2xcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic29sXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IEludGVydmFsLCBpc0ludGVydmFsQXJyYXkgfSBmcm9tIFwiLi9JbnRlcnZhbFwiO1xuaW1wb3J0IHsgTm90ZSwgaXNOb3RlQXJyYXkgfSBmcm9tIFwiLi9Ob3RlXCI7XG5pbXBvcnQgeyBQaXRjaCwgaXNQaXRjaEFycmF5IH0gZnJvbSBcIi4vUGl0Y2hcIjtcblxuZXhwb3J0IHR5cGUgVENob3JkID0geyBiYXNlOiBOb3RlIHwgUGl0Y2g7IGludGVydmFsczogSW50ZXJ2YWxbXTsgaXNBYnNvbHV0ZTogYm9vbGVhbiB9O1xuXG5leHBvcnQgY2xhc3MgQ2hvcmQgaW1wbGVtZW50cyBJdGVyYWJsZTxOb3RlPiB7XG4gICAgYmFzZTogTm90ZSB8IFBpdGNoO1xuICAgIGludGVydmFsczogSW50ZXJ2YWxbXTsgLy8gSW50ZXJ2YWxzIGZyb20gYmFzZVxuICAgIGlzQWJzb2x1dGU6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IoYmFzZUluOiBOb3RlIHwgUGl0Y2ggfCBzdHJpbmcsIC4uLmFycmF5SW46IE5vdGVbXSB8IFBpdGNoW10gfCBJbnRlcnZhbFtdIHwgc3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5iYXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHMgPSBbXTtcbiAgICAgICAgdGhpcy5pc0Fic29sdXRlID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgYmFzZUluID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCBpc1BpdGNoID0gUGl0Y2guUkVHRVguZXhlYyhiYXNlSW4pO1xuICAgICAgICAgICAgaWYgKGlzUGl0Y2gpIHRoaXMuYmFzZSA9IG5ldyBQaXRjaChiYXNlSW4pO1xuICAgICAgICAgICAgZWxzZSB0aGlzLmJhc2UgPSBuZXcgTm90ZShiYXNlSW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gYmFzZUluO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNBYnNvbHV0ZSA9IHRydWU7XG4gICAgICAgIGlmICgoYXJyYXlJbiBhcyAoUGl0Y2ggfCBOb3RlIHwgSW50ZXJ2YWwgfCBzdHJpbmcpW10pLmZpbmQoZSA9PiBlIGluc3RhbmNlb2YgTm90ZSAmJiAhKGUgaW5zdGFuY2VvZiBQaXRjaCkpKSB0aGlzLmlzQWJzb2x1dGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzQWJzb2x1dGUpIHRoaXMuYmFzZSA9IG5ldyBOb3RlKHRoaXMuYmFzZSk7XG4gICAgICAgIGlmIChpc1BpdGNoQXJyYXkoYXJyYXlJbikgJiYgdGhpcy5pc0Fic29sdXRlKSB7XG4gICAgICAgICAgICB0aGlzLmludGVydmFscyA9IGFycmF5SW4uc29ydChQaXRjaC5jb21wYXJlKS5tYXAocGl0Y2ggPT4gdGhpcy5iYXNlLmdldEludGVydmFsKHBpdGNoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOb3RlQXJyYXkoYXJyYXlJbikpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxzID0gKGFycmF5SW4gYXMgTm90ZVtdKS5tYXAobm90ZSA9PiAodGhpcy5iYXNlIGFzIE5vdGUpLmdldEludGVydmFsKG5vdGUpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0ludGVydmFsQXJyYXkoYXJyYXlJbikpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxzID0gYXJyYXlJbi5zb3J0KEludGVydmFsLmNvbXBhcmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbHMgPSBJbnRlcnZhbC5mcm9tQXJyYXkoLi4uYXJyYXlJbikuc29ydChJbnRlcnZhbC5jb21wYXJlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2UudG9TdHJpbmcoKSArIFwiOlwiICsgdGhpcy5pbnRlcnZhbHMudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxOb3RlIHwgUGl0Y2g+IHtcbiAgICAgICAgY29uc3QgbyA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gLTE7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0KCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogTm90ZSB8IFBpdGNoO1xuICAgICAgICAgICAgICAgIGxldCBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IG8uaW50ZXJ2YWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGkgPT09IC0xID8gby5iYXNlIDogby5iYXNlLmNsb25lKCkuYWRkKG8uaW50ZXJ2YWxzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICBkb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlLCBkb25lIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUGl0Y2ggfSBmcm9tIFwiLi9QaXRjaFwiO1xuXG5leHBvcnQgY2xhc3MgRnJlcXVlbmN5IHtcbiAgICBzdGF0aWMgQTQ0MCA9IDQ0MDtcbiAgICBzdGF0aWMgU0VNSVRPTkUgPSAyICoqICgxIC8gMTIpO1xuICAgIHN0YXRpYyBUSFJFU19BVURJVCA9IDIgKiogKDEgLyAzNik7XG4gICAgc3RhdGljIHRvUGl0Y2goZjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUGl0Y2goNjkgKyAxMiAqIChNYXRoLmxvZyhmIC8gRnJlcXVlbmN5LkE0NDApIC8gTWF0aC5sb2coMikpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XG5cbmV4cG9ydCB0eXBlIFRJbnRlcnZhbCA9IHsgZGVncmVlOiBudW1iZXI7IG9uc2V0OiBudW1iZXI7IG9jdGF2ZTogbnVtYmVyIH07XG5leHBvcnQgdHlwZSBUSW50ZXJ2YWxPZmZzZXQgPSAwIHwgMiB8IDQgfCA1IHwgNyB8IDkgfCAxMTtcbmV4cG9ydCBjb25zdCBpc0ludGVydmFsID0gKHg6IGFueSk6IHggaXMgVEludGVydmFsIHwgSW50ZXJ2YWwgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIlxuICAgICAgICAmJiB0eXBlb2YgeC5kZWdyZWUgPT09IFwibnVtYmVyXCJcbiAgICAgICAgJiYgdHlwZW9mIHgub25zZXQgPT09IFwibnVtYmVyXCJcbiAgICAgICAgJiYgdHlwZW9mIHgub2N0YXZlID09PSBcIm51bWJlclwiO1xufTtcbmV4cG9ydCBjb25zdCBpc0ludGVydmFsQXJyYXkgPSAoeDogYW55KTogeCBpcyBJbnRlcnZhbFtdID0+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoeCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4geC5ldmVyeShlbCA9PiBlbCBpbnN0YW5jZW9mIEludGVydmFsKTtcbn07XG50eXBlIFRJbnRlcnZhbFByb3BlcnR5ID0gXCJQXCIgfCBcIk1cIiB8IFwibVwiIHwgXCJBXCIgfCBcImRcIjtcbnR5cGUgVEludGVydmFsUHJvcGVydHlWYWx1ZSA9IFwiUEVSRkVDVFwiIHwgXCJNSU5PUlwiIHwgXCJNQUpPUlwiIHwgXCJBVUdNRU5URURcIiB8IFwiRElNSU5JU0hFRFwiO1xuZXhwb3J0IGNvbnN0IERFR1JFRV9UT19PRkZTRVQgPSBbMCwgMiwgNCwgNSwgNywgOSwgMTFdO1xuY2xhc3MgRW51bUludGVydmFsUHJvcGVydHkge1xuICAgIHByaXZhdGUgc3RhdGljIGFiYk1hcDogeyBba2V5OiBzdHJpbmddOiBUSW50ZXJ2YWxQcm9wZXJ0eVZhbHVlIH0gPSB7IFA6IFwiUEVSRkVDVFwiLCBNOiBcIk1BSk9SXCIsIG06IFwiTUlOT1JcIiwgQTogXCJBVUdNRU5URURcIiwgZDogXCJESU1JTklTSEVEXCIgfTtcbiAgICBzdGF0aWMgUEVSRkVDVCA9IG5ldyBFbnVtSW50ZXJ2YWxQcm9wZXJ0eShcIlBcIik7XG4gICAgc3RhdGljIE1BSk9SID0gbmV3IEVudW1JbnRlcnZhbFByb3BlcnR5KFwiTVwiKTtcbiAgICBzdGF0aWMgTUlOT1IgPSBuZXcgRW51bUludGVydmFsUHJvcGVydHkoXCJtXCIpO1xuICAgIHN0YXRpYyBBVUdNRU5URUQgPSBuZXcgRW51bUludGVydmFsUHJvcGVydHkoXCJBXCIpO1xuICAgIHN0YXRpYyBESU1JTklTSEVEID0gbmV3IEVudW1JbnRlcnZhbFByb3BlcnR5KFwiZFwiKTtcbiAgICBzdGF0aWMgYnlBYmIoYWJiSW46IHN0cmluZykge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5hYmJNYXBbYWJiSW5dO1xuICAgICAgICBpZiAobmFtZSkgcmV0dXJuIEVudW1JbnRlcnZhbFByb3BlcnR5W25hbWVdO1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYE5vIHN1Y2ggaW50ZXJ2YWwgcHJvcGVydHkgd2l0aCBhYmJyZXZpYXRpb24gJHthYmJJbn0uYCk7XG4gICAgfVxuICAgIHByb3BlcnR5OiBUSW50ZXJ2YWxQcm9wZXJ0eTtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0eUluOiBUSW50ZXJ2YWxQcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHlJbjtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gRW51bUludGVydmFsUHJvcGVydHkuYWJiTWFwW3RoaXMucHJvcGVydHldO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVydmFsIHtcbiAgICBwcml2YXRlIHN0YXRpYyBSRUdFWCA9IC9eKFtQTW1BZF0pKFswLTldKykoKFxcK3wtKVxcZCspPyQvO1xuICAgIGRlZ3JlZTogbnVtYmVyO1xuICAgIG9uc2V0OiBudW1iZXI7XG4gICAgb2N0YXZlOiBudW1iZXI7XG4gICAgc3RhdGljIGdldE9mZnNldEZyb21Qcm9wZXJ0eShwcm9wZXJ0eUluOiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eSwgZGVncmVlSW46IG51bWJlcikge1xuICAgICAgICBjb25zdCBkZWdyZWUgPSB0eXBlb2YgZGVncmVlSW4gPT09IFwibnVtYmVyXCIgPyBVdGlscy5mbG9vck1vZChkZWdyZWVJbiAtIDEsIDcpICsgMSA6IDE7XG4gICAgICAgIGlmIChkZWdyZWUgPT09IDEgfHwgZGVncmVlID09PSA0IHx8IGRlZ3JlZSA9PT0gNSkge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5SW4gPT09IEVudW1JbnRlcnZhbFByb3BlcnR5LlBFUkZFQ1QpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5SW4gPT09IEVudW1JbnRlcnZhbFByb3BlcnR5LkFVR01FTlRFRCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlJbiA9PT0gRW51bUludGVydmFsUHJvcGVydHkuRElNSU5JU0hFRCkgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5SW4gPT09IEVudW1JbnRlcnZhbFByb3BlcnR5Lk1BSk9SKSByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eUluID09PSBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5NSU5PUikgcmV0dXJuIC0xO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5SW4gPT09IEVudW1JbnRlcnZhbFByb3BlcnR5LkFVR01FTlRFRCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlJbiA9PT0gRW51bUludGVydmFsUHJvcGVydHkuRElNSU5JU0hFRCkgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0UHJvcGVydHlGcm9tT2Zmc2V0KG9uc2V0SW46IG51bWJlciwgZGVncmVlSW46IG51bWJlcikge1xuICAgICAgICBjb25zdCBkZWdyZWUgPSB0eXBlb2YgZGVncmVlSW4gPT09IFwibnVtYmVyXCIgPyBVdGlscy5mbG9vck1vZChkZWdyZWVJbiAtIDEsIDcpICsgMSA6IDE7XG4gICAgICAgIGlmIChkZWdyZWUgPT09IDEgfHwgZGVncmVlID09PSA0IHx8IGRlZ3JlZSA9PT0gNSkge1xuICAgICAgICAgICAgaWYgKG9uc2V0SW4gPT09IDApIHJldHVybiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5QRVJGRUNUO1xuICAgICAgICAgICAgaWYgKG9uc2V0SW4gPT09IDEpIHJldHVybiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5BVUdNRU5URUQ7XG4gICAgICAgICAgICBpZiAob25zZXRJbiA9PT0gLTEpIHJldHVybiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5ESU1JTklTSEVEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9uc2V0SW4gPT09IDApIHJldHVybiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5NQUpPUjtcbiAgICAgICAgICAgIGlmIChvbnNldEluID09PSAtMSkgcmV0dXJuIEVudW1JbnRlcnZhbFByb3BlcnR5Lk1JTk9SO1xuICAgICAgICAgICAgaWYgKG9uc2V0SW4gPT09IDEpIHJldHVybiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5BVUdNRU5URUQ7XG4gICAgICAgICAgICBpZiAob25zZXRJbiA9PT0gLTIpIHJldHVybiBFbnVtSW50ZXJ2YWxQcm9wZXJ0eS5ESU1JTklTSEVEO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0T2Zmc2V0RnJvbURlZ3JlZShkZWdyZWVJbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGVncmVlSW4gPT09IFwibnVtYmVyXCIgPyBERUdSRUVfVE9fT0ZGU0VUW1V0aWxzLmZsb29yTW9kKGRlZ3JlZUluIC0gMSwgNyldICsgMTIgKiBNYXRoLmZsb29yKChkZWdyZWVJbiAtIDEpIC8gNykgOiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIFVuaXNvblxuICAgICAqIEBtZW1iZXJvZiBJbnRlcnZhbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgLyoqXG4gICAgICogR2l2ZXMgYSBuZXcgSW50ZXJ2YWwgaW5zdGFuY2UgKGNsb25lKVxuICAgICAqIEBwYXJhbSB7KEludGVydmFsIHwgVEludGVydmFsKX0gaW50ZXJ2YWxJblxuICAgICAqIEBtZW1iZXJvZiBJbnRlcnZhbFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGludGVydmFsSW46IEludGVydmFsIHwgVEludGVydmFsKTtcbiAgICAvKipcbiAgICAgKiBQYXJzZSBpbnRlcnZhbCBzdHJpbmdcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5ldyBJbnRlcnZhbChcImQ2XCIpO1xuICAgICAqIEB0aHJvd3Mge1N5bnRheEVycm9yfSB3aGVuIHBhcnNlIGZhaWxlZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnRlcnZhbEluXG4gICAgICogQG1lbWJlcm9mIEludGVydmFsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW50ZXJ2YWxJbjogc3RyaW5nKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEludGVydmFsLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWdyZWVJblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb25zZXRdXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtvY3RhdmVdXG4gICAgICogQG1lbWJlcm9mIEludGVydmFsXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVncmVlSW46IG51bWJlciwgb25zZXQ/OiBudW1iZXIsIG9jdGF2ZT86IG51bWJlcik7XG4gICAgY29uc3RydWN0b3IoZmlyc3Q/OiBJbnRlcnZhbCB8IFRJbnRlcnZhbCB8IHN0cmluZyB8IG51bWJlciwgc2Vjb25kPzogbnVtYmVyLCB0aGlyZD86IG51bWJlcikge1xuICAgICAgICB0aGlzLmRlZ3JlZSA9IDA7XG4gICAgICAgIHRoaXMub25zZXQgPSAwO1xuICAgICAgICB0aGlzLm9jdGF2ZSA9IDA7XG4gICAgICAgIGlmIChpc0ludGVydmFsKGZpcnN0KSkge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvcihmaXJzdC5kZWdyZWUsIGZpcnN0Lm9uc2V0LCBmaXJzdC5vY3RhdmUpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5mcm9tU3RyaW5nKGZpcnN0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3QgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVncmVlID0gVXRpbHMuZmxvb3JNb2QoZmlyc3QgLSAxLCA3KSArIDE7XG4gICAgICAgICAgICB0aGlzLm9uc2V0ID0gc2Vjb25kIHx8IDA7XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IE1hdGguZmxvb3IoKGZpcnN0IC0gMSkgLyA3KSArICh0aGlyZCB8fCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3RhdGljIGZyb21TdHJpbmcobmFtZUluOiBzdHJpbmcpOiBUSW50ZXJ2YWwge1xuICAgICAgICBjb25zdCBtYXRjaGVkID0gSW50ZXJ2YWwuUkVHRVguZXhlYyhuYW1lSW4pO1xuICAgICAgICBpZiAobWF0Y2hlZCA9PT0gbnVsbCkgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBObyBzdWNoIGludGVydmFsICR7bmFtZUlufS5gKTtcbiAgICAgICAgY29uc3QgZGVncmVlID0gcGFyc2VJbnQobWF0Y2hlZFsyXSk7XG4gICAgICAgIGNvbnN0IG9uc2V0ID0gSW50ZXJ2YWwuZ2V0T2Zmc2V0RnJvbVByb3BlcnR5KEVudW1JbnRlcnZhbFByb3BlcnR5LmJ5QWJiKG1hdGNoZWRbMV0pLCBkZWdyZWUpO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSBwYXJzZUludChtYXRjaGVkWzNdKSB8fCAwO1xuICAgICAgICByZXR1cm4geyBkZWdyZWUsIG9uc2V0LCBvY3RhdmUgfTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGZyb21TdHJpbmcobmFtZUluOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgeyBkZWdyZWUsIG9uc2V0LCBvY3RhdmUgfSA9IEludGVydmFsLmZyb21TdHJpbmcobmFtZUluKTtcbiAgICAgICAgdGhpcy5kZWdyZWUgPSBkZWdyZWU7XG4gICAgICAgIHRoaXMub25zZXQgPSBvbnNldDtcbiAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbU9mZnNldChvZmZzZXRJbjogbnVtYmVyKTogVEludGVydmFsIHtcbiAgICAgICAgbGV0IGRlZ3JlZSA9IDA7XG4gICAgICAgIGxldCBvbnNldCA9IDA7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IE1hdGguZmxvb3Iob2Zmc2V0SW4gLyAxMik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgREVHUkVFX1RPX09GRlNFVC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKERFR1JFRV9UT19PRkZTRVRbaV0gPT09IFV0aWxzLmZsb29yTW9kKG9mZnNldEluLCAxMikpIHtcbiAgICAgICAgICAgICAgICBkZWdyZWUgPSBpICsgMTtcbiAgICAgICAgICAgICAgICBvbnNldCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKERFR1JFRV9UT19PRkZTRVRbaV0gPT09IFV0aWxzLmZsb29yTW9kKG9mZnNldEluLCAxMikgKyAxKSB7XG4gICAgICAgICAgICAgICAgZGVncmVlID0gaSArIDE7XG4gICAgICAgICAgICAgICAgb25zZXQgPSAtMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkZWdyZWUsIG9uc2V0LCBvY3RhdmUgfTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGZyb21PZmZzZXQob2Zmc2V0SW46IG51bWJlcikge1xuICAgICAgICBjb25zdCB7IGRlZ3JlZSwgb25zZXQsIG9jdGF2ZSB9ID0gSW50ZXJ2YWwuZnJvbU9mZnNldChvZmZzZXRJbik7XG4gICAgICAgIHRoaXMuZGVncmVlID0gZGVncmVlO1xuICAgICAgICB0aGlzLm9uc2V0ID0gb25zZXQ7XG4gICAgICAgIHRoaXMub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkKGlJbjogSW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3QgaSA9IHsgZGVncmVlOiAwLCBvbnNldDogMCwgb2N0YXZlOiAwIH07XG4gICAgICAgIGkuZGVncmVlID0gVXRpbHMuZmxvb3JNb2QodGhpcy5kZWdyZWUgKyBpSW4uZGVncmVlIC0gMSAtIDEsIDcpICsgMTtcbiAgICAgICAgaS5vbnNldCA9IHRoaXMub2Zmc2V0IC0gMTIgKiB0aGlzLm9jdGF2ZSArIGlJbi5vZmZzZXQgLSAxMiAqIGlJbi5vY3RhdmUgLSBJbnRlcnZhbC5nZXRPZmZzZXRGcm9tRGVncmVlKHRoaXMuZGVncmVlICsgaUluLmRlZ3JlZSAtIDEpO1xuICAgICAgICBpLm9jdGF2ZSA9IHRoaXMub2N0YXZlICsgaUluLm9jdGF2ZSArICh0aGlzLmRlZ3JlZSArIGlJbi5kZWdyZWUgLSAxIC0gMSkgLyA3O1xuICAgICAgICB0aGlzLmRlZ3JlZSA9IGkuZGVncmVlO1xuICAgICAgICB0aGlzLm9uc2V0ID0gaS5vbnNldDtcbiAgICAgICAgdGhpcy5vY3RhdmUgPSBpLm9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN1YihpSW46IEludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IGkgPSB7IGRlZ3JlZTogMCwgb25zZXQ6IDAsIG9jdGF2ZTogMCB9O1xuICAgICAgICBpLmRlZ3JlZSA9IFV0aWxzLmZsb29yTW9kKHRoaXMuZGVncmVlIC0gaUluLmRlZ3JlZSArIDEgLSAxLCA3KSArIDE7XG4gICAgICAgIGkub25zZXQgPSAodGhpcy5vZmZzZXQgLSAxMiAqIHRoaXMub2N0YXZlKSAtIChpSW4ub2Zmc2V0IC0gMTIgKiBpSW4ub2N0YXZlKSAtIEludGVydmFsLmdldE9mZnNldEZyb21EZWdyZWUodGhpcy5kZWdyZWUgLSBpSW4uZGVncmVlICsgMSk7XG4gICAgICAgIGkub2N0YXZlID0gdGhpcy5vY3RhdmUgLSBpSW4ub2N0YXZlICsgTWF0aC5mbG9vcigodGhpcy5kZWdyZWUgLSBpSW4uZGVncmVlICsgMSAtIDEpIC8gNyk7XG4gICAgICAgIHRoaXMuZGVncmVlID0gaS5kZWdyZWU7XG4gICAgICAgIHRoaXMub25zZXQgPSBpLm9uc2V0O1xuICAgICAgICB0aGlzLm9jdGF2ZSA9IGkub2N0YXZlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV2ZXJzZSgpIHtcbiAgICAgICAgY29uc3QgaSA9IHsgZGVncmVlOiAwLCBvbnNldDogMCwgb2N0YXZlOiAwIH07XG4gICAgICAgIGkuZGVncmVlID0gVXRpbHMuZmxvb3JNb2QoMSAtIHRoaXMuZGVncmVlLCA3KSArIDE7XG4gICAgICAgIGkub25zZXQgPSAwIC0gKHRoaXMub2Zmc2V0IC0gMTIgKiB0aGlzLm9jdGF2ZSkgLSBJbnRlcnZhbC5nZXRPZmZzZXRGcm9tRGVncmVlKDEgLSB0aGlzLmRlZ3JlZSArIDEpO1xuICAgICAgICBpLm9jdGF2ZSA9IDAgLSB0aGlzLm9jdGF2ZSArIE1hdGguZmxvb3IoKDEgLSB0aGlzLmRlZ3JlZSArIDEgLSAxKSAvIDcpO1xuICAgICAgICB0aGlzLmRlZ3JlZSA9IGkuZGVncmVlO1xuICAgICAgICB0aGlzLm9uc2V0ID0gaS5vbnNldDtcbiAgICAgICAgdGhpcy5vY3RhdmUgPSBpLm9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBvZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiBERUdSRUVfVE9fT0ZGU0VUW1V0aWxzLmZsb29yTW9kKHRoaXMuZGVncmVlIC0gMSwgNyldICsgMTIgKiBNYXRoLmZsb29yKCh0aGlzLmRlZ3JlZSAtIDEpIC8gNykgKyB0aGlzLm9uc2V0ICsgMTIgKiB0aGlzLm9jdGF2ZTtcbiAgICB9XG4gICAgZ2V0IHByb3BlcnR5KCkge1xuICAgICAgICByZXR1cm4gSW50ZXJ2YWwuZ2V0UHJvcGVydHlGcm9tT2Zmc2V0KHRoaXMub25zZXQsIHRoaXMuZGVncmVlKTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21BcnJheSguLi5hcnJheUluOiAoc3RyaW5nIHwgVEludGVydmFsKVtdKSB7XG4gICAgICAgIHJldHVybiBhcnJheUluLm1hcChlID0+IG5ldyBJbnRlcnZhbChlIGFzIGFueSkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3Qgc09uc2V0ID0gdGhpcy5wcm9wZXJ0eSA/IHRoaXMucHJvcGVydHkucHJvcGVydHkgOiAodGhpcy5vbnNldCA+IDAgPyBcIitcIiA6IFwiXCIpICsgdGhpcy5vbnNldC50b1N0cmluZygpICsgXCJfXCI7XG4gICAgICAgIGNvbnN0IHNPY3RhdmUgPSB0aGlzLm9jdGF2ZSA+IDAgPyAoXCIrXCIgKyB0aGlzLm9jdGF2ZSkgOiB0aGlzLm9jdGF2ZSA8IDAgPyB0aGlzLm9jdGF2ZSA6IFwiXCI7XG4gICAgICAgIHJldHVybiBzT25zZXQgKyB0aGlzLmRlZ3JlZSArIHNPY3RhdmU7XG4gICAgfVxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IEludGVydmFsKHRoaXMpO1xuICAgIH1cbiAgICBzdGF0aWMgY29tcGFyZSh4OiBJbnRlcnZhbCwgeTogSW50ZXJ2YWwpIHtcbiAgICAgICAgcmV0dXJuIHgub2Zmc2V0IC0geS5vZmZzZXQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xuaW1wb3J0IHsgSW50ZXJ2YWwsIFRJbnRlcnZhbE9mZnNldCwgREVHUkVFX1RPX09GRlNFVCB9IGZyb20gXCIuL0ludGVydmFsXCI7XG5cbmV4cG9ydCBjbGFzcyBFbnVtTm90ZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgb2Zmc2V0TWFwOiB7IFtrZXk6IG51bWJlcl06IFRFbnVtTm90ZVZhbHVlIH0gPSB7IDA6IFwiQ1wiLCAyOiBcIkRcIiwgNDogXCJFXCIsIDU6IFwiRlwiLCA3OiBcIkdcIiwgOTogXCJBXCIsIDExOiBcIkJcIiB9O1xuICAgIHByaXZhdGUgc3RhdGljIGluZGV4TWFwID0gW1wiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJBXCIsIFwiQlwiXSBhcyBURW51bU5vdGVWYWx1ZVtdO1xuICAgIHN0YXRpYyBnZXQgQygpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSgwKTsgfVxuICAgIHN0YXRpYyBnZXQgRCgpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSgyKTsgfVxuICAgIHN0YXRpYyBnZXQgRSgpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSg0KTsgfVxuICAgIHN0YXRpYyBnZXQgRigpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSg1KTsgfVxuICAgIHN0YXRpYyBnZXQgRygpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSg3KTsgfVxuICAgIHN0YXRpYyBnZXQgQSgpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSg5KTsgfVxuICAgIHN0YXRpYyBnZXQgQigpIHsgcmV0dXJuIG5ldyBFbnVtTm90ZSgxMSk7IH1cbiAgICBzdGF0aWMgYyA9IEVudW1Ob3RlLkM7XG4gICAgc3RhdGljIGQgPSBFbnVtTm90ZS5EO1xuICAgIHN0YXRpYyBlID0gRW51bU5vdGUuRTtcbiAgICBzdGF0aWMgZiA9IEVudW1Ob3RlLkY7XG4gICAgc3RhdGljIGcgPSBFbnVtTm90ZS5HO1xuICAgIHN0YXRpYyBhID0gRW51bU5vdGUuQTtcbiAgICBzdGF0aWMgYiA9IEVudW1Ob3RlLkI7XG4gICAgcmVhZG9ubHkgb2Zmc2V0OiBUSW50ZXJ2YWxPZmZzZXQ7XG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihvZmZzZXRJbjogVEludGVydmFsT2Zmc2V0KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0SW47XG4gICAgfVxuICAgIHN0YXRpYyBieU9mZnNldChvZmZzZXRJbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0SW4gIT09IFwibnVtYmVyXCIpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBuYW1lID0gRW51bU5vdGUub2Zmc2V0TWFwW1V0aWxzLmZsb29yTW9kKG9mZnNldEluLCAxMildO1xuICAgICAgICBpZiAobmFtZSkgcmV0dXJuIEVudW1Ob3RlW25hbWVdO1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYE5vIHN1Y2ggbm90ZSB3aXRoIG9mZnNldCAke29mZnNldElufS5gKTtcbiAgICB9XG4gICAgc3RhdGljIGJ5SW5kZXgoaW5kZXhJbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXhJbiAhPT0gXCJudW1iZXJcIikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBFbnVtTm90ZS5pbmRleE1hcFtVdGlscy5mbG9vck1vZChpbmRleEluLCA3KV07XG4gICAgICAgIGlmIChuYW1lKSByZXR1cm4gRW51bU5vdGVbbmFtZV07XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgTm8gc3VjaCBub3RlIHdpdGggaW5kZXggJHtpbmRleElufS5gKTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7IHJldHVybiBFbnVtTm90ZS5vZmZzZXRNYXBbdGhpcy5vZmZzZXRdOyB9XG4gICAgZ2V0IGluZGV4KCkgeyByZXR1cm4gREVHUkVFX1RPX09GRlNFVC5pbmRleE9mKHRoaXMub2Zmc2V0KTsgfVxuICAgIHRvU3RyaW5nKCkgeyByZXR1cm4gdGhpcy5uYW1lOyB9XG59XG5leHBvcnQgdHlwZSBUTm90ZSA9IHsgZW51bU5vdGU6IEVudW1Ob3RlOyBhbHRlcmF0aW9uOiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBpc05vdGUgPSAoeDogYW55KTogeCBpcyBUTm90ZSB8IE5vdGUgPT4ge1xuICAgIHJldHVybiB4IGluc3RhbmNlb2YgTm90ZVxuICAgICAgICB8fCAodHlwZW9mIHggPT09IFwib2JqZWN0XCJcbiAgICAgICAgICAgICYmIHguZW51bU5vdGUgaW5zdGFuY2VvZiBFbnVtTm90ZVxuICAgICAgICAgICAgJiYgdHlwZW9mIHguYWx0ZXJhdGlvbiA9PT0gXCJudW1iZXJcIik7XG59O1xuZXhwb3J0IGNvbnN0IGlzTm90ZUFycmF5ID0gKHg6IGFueSk6IHggaXMgTm90ZVtdID0+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoeCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4geC5ldmVyeShlbCA9PiBlbCBpbnN0YW5jZW9mIE5vdGUpO1xufTtcbnR5cGUgVEVudW1Ob3RlVmFsdWUgPSBcIkNcIiB8IFwiRFwiIHwgXCJFXCIgfCBcIkZcIiB8IFwiR1wiIHwgXCJBXCIgfCBcIkJcIjtcbmV4cG9ydCBjbGFzcyBOb3RlIHtcbiAgICBzdGF0aWMgUkVHRVggPSAvXihbYiNdKikoW2EtZ0EtR10pJC87XG4gICAgZW51bU5vdGU6IEVudW1Ob3RlO1xuICAgIGFsdGVyYXRpb246IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIENcbiAgICAgKiBAbWVtYmVyb2YgTm90ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICAvKipcbiAgICAgKiBOZXcgbm90ZVxuICAgICAqIEBwYXJhbSB7KEVudW1Ob3RlKX0gbm90ZUluXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFthbHRlcmF0aW9uXVxuICAgICAqIEBtZW1iZXJvZiBOb3RlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iobm90ZUluOiBFbnVtTm90ZSwgYWx0ZXJhdGlvbj86IG51bWJlcilcbiAgICAvKipcbiAgICAgKiBHaXZlcyBhIG5ldyBOb3RlIGluc3RhbmNlIChjbG9uZSlcbiAgICAgKiBAcGFyYW0geyhOb3RlIHwgVE5vdGUgfCBzdHJpbmcpfSBub3RlSW5cbiAgICAgKiBAbWVtYmVyb2YgTm90ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vdGVJbjogTm90ZSB8IEVudW1Ob3RlIHwgVE5vdGUpXG4gICAgLyoqXG4gICAgICogUGFyc2VzIG5vdGUgc3RyaW5nLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbmV3IE5vdGUoXCIjI0VcIik7XG4gICAgICogQHRocm93cyB7U3ludGF4RXJyb3J9IHdoZW4gcGFyc2UgZmFpbGVkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5vdGVJblxuICAgICAqIEBtZW1iZXJvZiBOb3RlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iobm90ZUluOiBzdHJpbmcpXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBOb3RlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2FsdGVyYXRpb25dXG4gICAgICogQG1lbWJlcm9mIE5vdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvZmZzZXQ6IG51bWJlciwgYWx0ZXJhdGlvbj86IG51bWJlcilcbiAgICBjb25zdHJ1Y3RvcihmaXJzdD86IE5vdGUgfCBFbnVtTm90ZSB8IFROb3RlIHwgc3RyaW5nIHwgbnVtYmVyLCBzZWNvbmQ/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lbnVtTm90ZSA9IEVudW1Ob3RlLkM7XG4gICAgICAgIHRoaXMuYWx0ZXJhdGlvbiA9IDA7XG4gICAgICAgIGlmIChmaXJzdCBpbnN0YW5jZW9mIEVudW1Ob3RlKSB7XG4gICAgICAgICAgICB0aGlzLmVudW1Ob3RlID0gZmlyc3Q7XG4gICAgICAgICAgICBpZiAoc2Vjb25kKSB0aGlzLmFsdGVyYXRpb24gPSBzZWNvbmQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOb3RlKGZpcnN0KSkge1xuICAgICAgICAgICAgdGhpcy5lbnVtTm90ZSA9IGZpcnN0LmVudW1Ob3RlO1xuICAgICAgICAgICAgdGhpcy5hbHRlcmF0aW9uID0gZmlyc3QuYWx0ZXJhdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3QgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbVN0cmluZyhmaXJzdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmZyb21PZmZzZXQoZmlyc3QsIHNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tU3RyaW5nKG5hbWVJbjogc3RyaW5nKTogVE5vdGUge1xuICAgICAgICBjb25zdCBtYXRjaGVkID0gTm90ZS5SRUdFWC5leGVjKG5hbWVJbik7XG4gICAgICAgIGlmIChtYXRjaGVkID09PSBudWxsKSB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYE5vIHN1Y2ggbm90ZSAke25hbWVJbn0uYCk7XG4gICAgICAgIGNvbnN0IGVudW1Ob3RlID0gRW51bU5vdGVbbWF0Y2hlZFsyXSBhcyBURW51bU5vdGVWYWx1ZV07XG4gICAgICAgIGxldCBhbHRlcmF0aW9uID0gMDtcbiAgICAgICAgbWF0Y2hlZFsxXS5zcGxpdChcIlwiKS5mb3JFYWNoKGMgPT4gYWx0ZXJhdGlvbiArPSBjID09PSBcIiNcIiA/IDEgOiAtMSk7XG4gICAgICAgIHJldHVybiB7IGVudW1Ob3RlLCBhbHRlcmF0aW9uIH07XG4gICAgfVxuICAgIHByb3RlY3RlZCBmcm9tU3RyaW5nKG5hbWVJbjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgZW51bU5vdGUsIGFsdGVyYXRpb24gfSA9IE5vdGUuZnJvbVN0cmluZyhuYW1lSW4pO1xuICAgICAgICB0aGlzLmVudW1Ob3RlID0gZW51bU5vdGU7XG4gICAgICAgIHRoaXMuYWx0ZXJhdGlvbiA9IGFsdGVyYXRpb247XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbU9mZnNldChvZmZzZXRJbjogbnVtYmVyLCBhbHRlcmF0aW9uSW4/OiBudW1iZXIpOiBUTm90ZSB7XG4gICAgICAgIGNvbnN0IG5vdGUgPSBVdGlscy5mbG9vck1vZChvZmZzZXRJbiwgMTIpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMTE7XG4gICAgICAgIGZvciAobGV0IGkgPSBERUdSRUVfVE9fT0ZGU0VULmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IERFR1JFRV9UT19PRkZTRVRbaV07XG4gICAgICAgICAgICBpZiAoZWwgPD0gbm90ZSkge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IGVsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVudW1Ob3RlID0gRW51bU5vdGUuYnlPZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgbGV0IGFsdGVyYXRpb24gPSBub3RlIC0gb2Zmc2V0O1xuICAgICAgICBpZiAoYWx0ZXJhdGlvbkluKSBhbHRlcmF0aW9uICs9IGFsdGVyYXRpb25JbjtcbiAgICAgICAgcmV0dXJuIHsgZW51bU5vdGUsIGFsdGVyYXRpb24gfTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGZyb21PZmZzZXQob2Zmc2V0SW46IG51bWJlciwgYWx0ZXJhdGlvbkluPzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHsgZW51bU5vdGUsIGFsdGVyYXRpb24gfSA9IE5vdGUuZnJvbU9mZnNldChvZmZzZXRJbiwgYWx0ZXJhdGlvbkluKTtcbiAgICAgICAgdGhpcy5lbnVtTm90ZSA9IGVudW1Ob3RlO1xuICAgICAgICB0aGlzLmFsdGVyYXRpb24gPSBhbHRlcmF0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkKGlJbjogbnVtYmVyIHwgc3RyaW5nIHwgSW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpSW4gPT09IFwibnVtYmVyXCIpIHJldHVybiB0aGlzLmZyb21PZmZzZXQodGhpcy5vZmZzZXQgKyBpSW4pO1xuICAgICAgICBsZXQgaTogSW50ZXJ2YWw7XG4gICAgICAgIGlmICh0eXBlb2YgaUluID09PSBcInN0cmluZ1wiKSBpID0gbmV3IEludGVydmFsKGlJbik7XG4gICAgICAgIGVsc2UgaWYgKGlJbiBpbnN0YW5jZW9mIEludGVydmFsKSBpID0gaUluO1xuICAgICAgICBjb25zdCBuZXdFbnVtTm90ZSA9IEVudW1Ob3RlLmJ5SW5kZXgodGhpcy5lbnVtTm90ZS5pbmRleCArIGkuZGVncmVlIC0gMSk7XG4gICAgICAgIHRoaXMuYWx0ZXJhdGlvbiArPSBpLm9mZnNldCAtIDEyICogaS5vY3RhdmUgLSBVdGlscy5mbG9vck1vZChuZXdFbnVtTm90ZS5vZmZzZXQgLSB0aGlzLmVudW1Ob3RlLm9mZnNldCwgMTIpO1xuICAgICAgICB0aGlzLmVudW1Ob3RlID0gbmV3RW51bU5vdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzdWIoaUluOiBudW1iZXIgfCBzdHJpbmcgfCBJbnRlcnZhbCkge1xuICAgICAgICBpZiAodHlwZW9mIGlJbiA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHRoaXMuZnJvbU9mZnNldCh0aGlzLm9mZnNldCAtIGlJbik7XG4gICAgICAgIGxldCBpOiBJbnRlcnZhbDtcbiAgICAgICAgaWYgKHR5cGVvZiBpSW4gPT09IFwic3RyaW5nXCIpIGkgPSBuZXcgSW50ZXJ2YWwoaUluKTtcbiAgICAgICAgZWxzZSBpZiAoaUluIGluc3RhbmNlb2YgSW50ZXJ2YWwpIGkgPSBpSW47XG4gICAgICAgIGNvbnN0IG5ld0VudW1Ob3RlID0gRW51bU5vdGUuYnlJbmRleCh0aGlzLmVudW1Ob3RlLmluZGV4IC0gaS5kZWdyZWUgKyAxKTtcbiAgICAgICAgdGhpcy5hbHRlcmF0aW9uICs9IGkub2Zmc2V0IC0gMTIgKiBpLm9jdGF2ZSAtIFV0aWxzLmZsb29yTW9kKHRoaXMuZW51bU5vdGUub2Zmc2V0IC0gbmV3RW51bU5vdGUub2Zmc2V0LCAxMik7XG4gICAgICAgIHRoaXMuZW51bU5vdGUgPSBuZXdFbnVtTm90ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldEludGVydmFsKG5vdGVJbjogVE5vdGUpIHtcbiAgICAgICAgaWYgKCFpc05vdGUobm90ZUluKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBnZXQgSW50ZXJ2YWwgd2l0aCBvdGhlciBvYmplY3QgdGhhbiBOb3RlXCIpO1xuICAgICAgICBjb25zdCB0aGF0ID0gbm90ZUluIGluc3RhbmNlb2YgTm90ZSA/IG5vdGVJbiA6IG5ldyBOb3RlKG5vdGVJbik7XG4gICAgICAgIGNvbnN0IGRlZ3JlZSA9IHRoYXQuZW51bU5vdGUuaW5kZXggLSB0aGlzLmVudW1Ob3RlLmluZGV4ICsgMTtcbiAgICAgICAgY29uc3Qgb25zZXQgPSB0aGF0Lm9mZnNldCAtIHRoaXMub2Zmc2V0IC0gSW50ZXJ2YWwuZ2V0T2Zmc2V0RnJvbURlZ3JlZShkZWdyZWUpO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSAwO1xuICAgICAgICByZXR1cm4gbmV3IEludGVydmFsKGRlZ3JlZSwgb25zZXQsIG9jdGF2ZSk7XG4gICAgfVxuICAgIGdldCBvZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudW1Ob3RlLm9mZnNldCArIHRoaXMuYWx0ZXJhdGlvbjtcbiAgICB9XG4gICAgc3RhdGljIGZyb21BcnJheSguLi5hcnJheUluOiAoc3RyaW5nIHwgbnVtYmVyIHwgVE5vdGUpW10pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5SW4ubWFwKGUgPT4gbmV3IE5vdGUoZSBhcyBhbnkpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5hbHRlcmF0aW9uID4gMCA/IFwiI1wiIDogXCJiXCIpLnJlcGVhdChNYXRoLmFicyh0aGlzLmFsdGVyYXRpb24pKSArIHRoaXMuZW51bU5vdGUubmFtZTtcbiAgICB9XG4gICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90ZSh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOb3RlLCBFbnVtTm90ZSwgVE5vdGUsIGlzTm90ZSB9IGZyb20gXCIuL05vdGVcIjtcbmltcG9ydCB7IEludGVydmFsIH0gZnJvbSBcIi4vSW50ZXJ2YWxcIjtcblxuZXhwb3J0IHR5cGUgVFBpdGNoID0geyBlbnVtTm90ZTogRW51bU5vdGU7IGFsdGVyYXRpb246IG51bWJlcjsgb2N0YXZlOiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBpc1BpdGNoID0gKHg6IGFueSk6IHggaXMgVFBpdGNoIHwgUGl0Y2ggPT4ge1xuICAgIHJldHVybiB4IGluc3RhbmNlb2YgUGl0Y2hcbiAgICAgICAgfHwgKHR5cGVvZiB4ID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICAmJiB4LmVudW1Ob3RlIGluc3RhbmNlb2YgRW51bU5vdGVcbiAgICAgICAgICAgICYmIHR5cGVvZiB4LmFsdGVyYXRpb24gPT09IFwibnVtYmVyXCJcbiAgICAgICAgICAgICYmIHR5cGVvZiB4Lm9jdGF2ZSA9PT0gXCJudW1iZXJcIik7XG59O1xuZXhwb3J0IGNvbnN0IGlzUGl0Y2hBcnJheSA9ICh4OiBhbnkpOiB4IGlzIFBpdGNoW10gPT4ge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh4KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB4LmV2ZXJ5KGVsID0+IGVsIGluc3RhbmNlb2YgUGl0Y2gpO1xufTtcbmV4cG9ydCBjbGFzcyBQaXRjaCBleHRlbmRzIE5vdGUge1xuICAgIHN0YXRpYyBSRUdFWCA9IC9eKFtiI10qW2EtZ0EtR10pKC0/XFxkKyk/JC87XG4gICAgb2N0YXZlOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIEMwXG4gICAgICogQG1lbWJlcm9mIFBpdGNoXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKTtcbiAgICAvKipcbiAgICAgKiBHaXZlcyBhIG5ldyBQaXRjaCBpbnN0YW5jZSAoY2xvbmUpXG4gICAgICogQHBhcmFtIHtQaXRjaCB8IFRQaXRjaH0gcGl0Y2hJblxuICAgICAqIEBtZW1iZXJvZiBQaXRjaFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBpdGNoSW46IFBpdGNoIHwgVFBpdGNoKTtcbiAgICAvKipcbiAgICAgKiBBZGQgb2N0YXZlIGluZm8gdG8gYSBub3RlXG4gICAgICogQHBhcmFtIHsoTm90ZSB8IEVudW1Ob3RlIHwgVE5vdGUpfSBub3RlSW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW29jdGF2ZUluXVxuICAgICAqIEBtZW1iZXJvZiBQaXRjaFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5vdGVJbjogTm90ZSB8IEVudW1Ob3RlIHwgVE5vdGUsIG9jdGF2ZUluPzogbnVtYmVyKTtcbiAgICAvKipcbiAgICAgKiBQYXJzZXMgcGl0Y2ggc3RyaW5nLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbmV3IFBpdGNoKFwiIyNFNVwiKTtcbiAgICAgKiBAdGhyb3dzIHtTeW50YXhFcnJvcn0gd2hlbiBwYXJzZSBmYWlsZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGl0Y2hJblxuICAgICAqIEBtZW1iZXJvZiBOb3RlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGl0Y2hJbjogc3RyaW5nKTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFBpdGNoIHdpdGggaW5kZXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGl0Y2hJblxuICAgICAqIEBtZW1iZXJvZiBQaXRjaFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBpdGNoSW46IG51bWJlcik7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQaXRjaCB3aXRoIGluZGV4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBpdGNoSW5cbiAgICAgKiBAbWVtYmVyb2YgUGl0Y2hcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaXJzdD86IFBpdGNoIHwgTm90ZSB8IEVudW1Ob3RlIHwgVFBpdGNoIHwgVE5vdGUgfCBzdHJpbmcgfCBudW1iZXIsIHNlY29uZD86IG51bWJlcikge1xuICAgICAgICBpZiAoaXNQaXRjaChmaXJzdCkpIHtcbiAgICAgICAgICAgIHN1cGVyKGZpcnN0KTtcbiAgICAgICAgICAgIHRoaXMub2N0YXZlID0gZmlyc3Qub2N0YXZlO1xuICAgICAgICB9IGVsc2UgaWYgKGZpcnN0IGluc3RhbmNlb2YgRW51bU5vdGUgfHwgaXNOb3RlKGZpcnN0KSkge1xuICAgICAgICAgICAgc3VwZXIoZmlyc3QpO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBzZWNvbmQgfHwgMDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3QgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmZyb21TdHJpbmcoZmlyc3QpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgc3VwZXIoZmlyc3QpO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBNYXRoLmZsb29yKGZpcnN0IC8gMTIgLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tU3RyaW5nKG5hbWVJbjogc3RyaW5nKTogVFBpdGNoIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlZCA9IFBpdGNoLlJFR0VYLmV4ZWMobmFtZUluKTtcbiAgICAgICAgaWYgKG1hdGNoZWQgPT09IG51bGwpIHRocm93IG5ldyBTeW50YXhFcnJvcihgTm8gc3VjaCBwaXRjaCAke25hbWVJbn0uYCk7XG4gICAgICAgIGNvbnN0IG9jdGF2ZSA9IHBhcnNlSW50KG1hdGNoZWRbMl0pIHx8IDA7XG4gICAgICAgIHJldHVybiB7IC4uLk5vdGUuZnJvbVN0cmluZyhtYXRjaGVkWzFdKSwgb2N0YXZlIH07XG4gICAgfVxuICAgIHByb3RlY3RlZCBmcm9tU3RyaW5nKG5hbWVJbjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgZW51bU5vdGUsIGFsdGVyYXRpb24sIG9jdGF2ZSB9ID0gUGl0Y2guZnJvbVN0cmluZyhuYW1lSW4pO1xuICAgICAgICB0aGlzLmVudW1Ob3RlID0gZW51bU5vdGU7XG4gICAgICAgIHRoaXMuYWx0ZXJhdGlvbiA9IGFsdGVyYXRpb247XG4gICAgICAgIHRoaXMub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3RhdGljIGZyb21PZmZzZXQob2Zmc2V0SW46IG51bWJlcik6IFRQaXRjaCB7XG4gICAgICAgIHJldHVybiB7IC4uLnN1cGVyLmZyb21PZmZzZXQob2Zmc2V0SW4pLCBvY3RhdmU6IE1hdGguZmxvb3Iob2Zmc2V0SW4gLyAxMiAtIDEpIH07XG4gICAgfVxuICAgIHByb3RlY3RlZCBmcm9tT2Zmc2V0KG9mZnNldEluOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgeyBlbnVtTm90ZSwgYWx0ZXJhdGlvbiwgb2N0YXZlIH0gPSBQaXRjaC5mcm9tT2Zmc2V0KG9mZnNldEluKTtcbiAgICAgICAgdGhpcy5lbnVtTm90ZSA9IGVudW1Ob3RlO1xuICAgICAgICB0aGlzLmFsdGVyYXRpb24gPSBhbHRlcmF0aW9uO1xuICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZChpSW46IG51bWJlciB8IHN0cmluZyB8IEludGVydmFsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaUluID09PSBcIm51bWJlclwiKSByZXR1cm4gdGhpcy5mcm9tT2Zmc2V0KHRoaXMub2Zmc2V0ICsgaUluKTtcbiAgICAgICAgbGV0IGk6IEludGVydmFsO1xuICAgICAgICBpZiAodHlwZW9mIGlJbiA9PT0gXCJzdHJpbmdcIikgaSA9IG5ldyBJbnRlcnZhbChpSW4pO1xuICAgICAgICBlbHNlIGlmIChpSW4gaW5zdGFuY2VvZiBJbnRlcnZhbCkgaSA9IGlJbjtcbiAgICAgICAgdGhpcy5vY3RhdmUgKz0gTWF0aC5mbG9vcigodGhpcy5lbnVtTm90ZS5pbmRleCArIGkuZGVncmVlIC0gMSkgLyA3KSArIGkub2N0YXZlO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGkpO1xuICAgIH1cbiAgICBzdWIoaUluOiBudW1iZXIgfCBzdHJpbmcgfCBJbnRlcnZhbCkge1xuICAgICAgICBpZiAodHlwZW9mIGlJbiA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHRoaXMuZnJvbU9mZnNldCh0aGlzLm9mZnNldCAtIGlJbik7XG4gICAgICAgIGxldCBpOiBJbnRlcnZhbDtcbiAgICAgICAgaWYgKHR5cGVvZiBpSW4gPT09IFwic3RyaW5nXCIpIGkgPSBuZXcgSW50ZXJ2YWwoaUluKTtcbiAgICAgICAgZWxzZSBpZiAoaUluIGluc3RhbmNlb2YgSW50ZXJ2YWwpIGkgPSBpSW47XG4gICAgICAgIHRoaXMub2N0YXZlICs9IE1hdGguZmxvb3IoKHRoaXMuZW51bU5vdGUuaW5kZXggLSBpLmRlZ3JlZSArIDEpIC8gNykgLSBpLm9jdGF2ZTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN1YihpKTtcbiAgICB9XG4gICAgZ2V0SW50ZXJ2YWwocGl0Y2hJbjogVFBpdGNoKSB7XG4gICAgICAgIGlmICghaXNQaXRjaChwaXRjaEluKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBnZXQgSW50ZXJ2YWwgd2l0aCBvdGhlciBvYmplY3QgdGhhbiBQaXRjaFwiKTtcbiAgICAgICAgY29uc3QgdGhhdCA9IHBpdGNoSW4gaW5zdGFuY2VvZiBQaXRjaCA/IHBpdGNoSW4gOiBuZXcgUGl0Y2gocGl0Y2hJbik7XG4gICAgICAgIGNvbnN0IGRlZ3JlZSA9IHRoYXQuZW51bU5vdGUuaW5kZXggLSB0aGlzLmVudW1Ob3RlLmluZGV4ICsgMSArIChwaXRjaEluLm9jdGF2ZSAtIHRoaXMub2N0YXZlKSAqIDc7XG4gICAgICAgIGNvbnN0IG9uc2V0ID0gdGhhdC5vZmZzZXQgLSB0aGlzLm9mZnNldCAtIEludGVydmFsLmdldE9mZnNldEZyb21EZWdyZWUoZGVncmVlKTtcbiAgICAgICAgY29uc3Qgb2N0YXZlID0gMDtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnZhbChkZWdyZWUsIG9uc2V0LCBvY3RhdmUpO1xuICAgIH1cbiAgICBnZXQgb2Zmc2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnVtTm90ZS5vZmZzZXQgKyB0aGlzLmFsdGVyYXRpb24gKyAxMiAqICh0aGlzLm9jdGF2ZSArIDEpO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbUFycmF5KC4uLmFycmF5SW46IChzdHJpbmcgfCBudW1iZXIgfCBUUGl0Y2gpW10pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5SW4ubWFwKGUgPT4gbmV3IFBpdGNoKGUgYXMgYW55KSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gc3VwZXIudG9TdHJpbmcoKSArIHRoaXMub2N0YXZlO1xuICAgIH1cbiAgICBjbG9uZSgpOiBQaXRjaCB7XG4gICAgICAgIHJldHVybiBuZXcgUGl0Y2godGhpcyk7XG4gICAgfVxuICAgIHN0YXRpYyBjb21wYXJlKHg6IFBpdGNoLCB5OiBQaXRjaCkge1xuICAgICAgICByZXR1cm4geC5vZmZzZXQgLSB5Lm9mZnNldDtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgVXRpbHMgPSB7XHJcbiAgICBmbG9vck1vZDogKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgoeCAlIHkpICsgeSkgJSB5O1xyXG4gICAgfVxyXG59O1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgeyBOb3RlIH0gZnJvbSBcIi4vTm90ZVwiO1xuaW1wb3J0IHsgSW50ZXJ2YWwgfSBmcm9tIFwiLi9JbnRlcnZhbFwiO1xuaW1wb3J0IHsgUGl0Y2ggfSBmcm9tIFwiLi9QaXRjaFwiO1xuaW1wb3J0IHsgRnJlcXVlbmN5IH0gZnJvbSBcIi4vRnJlcXVlbmN5XCI7XG5pbXBvcnQgeyBDaG9yZCB9IGZyb20gXCIuL0Nob3JkXCI7XG5cbmNvbnN0IGkgPSBuZXcgTm90ZShcIiNHXCIpLmdldEludGVydmFsKG5ldyBOb3RlKFwiQ1wiKSk7XG5jb25zb2xlLmxvZyhuZXcgTm90ZShcIiNHXCIpLmdldEludGVydmFsKG5ldyBOb3RlKFwiQ1wiKSkudG9TdHJpbmcoKSk7XG5jb25zb2xlLmxvZyhuZXcgTm90ZShcIiNDXCIpLmdldEludGVydmFsKG5ldyBOb3RlKFwiR1wiKSkudG9TdHJpbmcoKSk7XG5jb25zb2xlLmxvZyhuZXcgTm90ZShcIkNcIikuZ2V0SW50ZXJ2YWwobmV3IE5vdGUoXCJiQ1wiKSkudG9TdHJpbmcoKSk7XG5jb25zb2xlLmxvZyhuZXcgTm90ZShcIkNcIikuZ2V0SW50ZXJ2YWwobmV3IE5vdGUoXCIjQ1wiKSkudG9TdHJpbmcoKSk7XG5jb25zb2xlLmxvZyhuZXcgTm90ZShcIkNcIikuZ2V0SW50ZXJ2YWwobmV3IE5vdGUoXCJiQlwiKSkudG9TdHJpbmcoKSk7XG5jb25zb2xlLmxvZyhuZXcgTm90ZShcIkNcIikuZ2V0SW50ZXJ2YWwobmV3IE5vdGUoXCIjQVwiKSkudG9TdHJpbmcoKSk7XG5cbmNvbnN0IG4gPSBuZXcgTm90ZSgxKTtcbmNvbnNvbGUubG9nKG4udG9TdHJpbmcoKSk7XG5cbmNvbnN0IHAgPSBuZXcgUGl0Y2goXCIjI0YwXCIpO1xuY29uc29sZS5sb2cocC5hZGQoXCJBNFwiKS50b1N0cmluZygpICsgXCIgXCIgKyBwLm9mZnNldCk7XG5cbmNvbnN0IGYgPSA0NDA7XG5jb25zb2xlLmxvZyhGcmVxdWVuY3kudG9QaXRjaChmKS5vZmZzZXQpO1xuXG5jb25zdCBjID0gbmV3IENob3JkKG5ldyBQaXRjaChcIkMxXCIpLCBuZXcgUGl0Y2goXCJiQzJcIiksIG5ldyBQaXRjaChcIiNDMVwiKSk7XG5cbmNvbnNvbGUubG9nKGMudG9TdHJpbmcoKSk7XG5cbmNvbnNvbGUubG9nKG5ldyBJbnRlcnZhbChcIk0zXCIpLnJldmVyc2UoKS50b1N0cmluZygpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=