/******/ var __webpack_modules__ = ({

/***/ "./node_modules/@tonejs/midi/dist/BinarySearch.js":
/*!********************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/BinarySearch.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Return the index of the element at or before the given property
 * @hidden
 */
function search(array, value, prop) {
    if (prop === void 0) { prop = "ticks"; }
    var beginning = 0;
    var len = array.length;
    var end = len;
    if (len > 0 && array[len - 1][prop] <= value) {
        return len - 1;
    }
    while (beginning < end) {
        // calculate the midpoint for roughly equal partition
        var midPoint = Math.floor(beginning + (end - beginning) / 2);
        var event_1 = array[midPoint];
        var nextEvent = array[midPoint + 1];
        if (event_1[prop] === value) {
            // choose the last one that has the same value
            for (var i = midPoint; i < array.length; i++) {
                var testEvent = array[i];
                if (testEvent[prop] === value) {
                    midPoint = i;
                }
            }
            return midPoint;
        }
        else if (event_1[prop] < value && nextEvent[prop] > value) {
            return midPoint;
        }
        else if (event_1[prop] > value) {
            // search lower
            end = midPoint;
        }
        else if (event_1[prop] < value) {
            // search upper
            beginning = midPoint + 1;
        }
    }
    return -1;
}
exports.search = search;
/**
 * Does a binary search to insert the note
 * in the correct spot in the array
 * @hidden
 */
function insert(array, event, prop) {
    if (prop === void 0) { prop = "ticks"; }
    if (array.length) {
        var index = search(array, event[prop], prop);
        array.splice(index + 1, 0, event);
    }
    else {
        array.push(event);
    }
}
exports.insert = insert;
//# sourceMappingURL=BinarySearch.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/ControlChange.js":
/*!*********************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/ControlChange.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * A map of values to control change names
 * @hidden
 */
exports.controlChangeNames = {
    1: "modulationWheel",
    2: "breath",
    4: "footController",
    5: "portamentoTime",
    7: "volume",
    8: "balance",
    10: "pan",
    64: "sustain",
    65: "portamentoTime",
    66: "sostenuto",
    67: "softPedal",
    68: "legatoFootswitch",
    84: "portamentoControl",
};
/**
 * swap the keys and values
 * @hidden
 */
exports.controlChangeIds = Object.keys(exports.controlChangeNames).reduce(function (obj, key) {
    obj[exports.controlChangeNames[key]] = key;
    return obj;
}, {});
var privateHeaderMap = new WeakMap();
var privateCCNumberMap = new WeakMap();
/**
 * Represents a control change event
 */
var ControlChange = /** @class */ (function () {
    /**
     * @param event
     * @param header
     */
    function ControlChange(event, header) {
        privateHeaderMap.set(this, header);
        privateCCNumberMap.set(this, event.controllerType);
        this.ticks = event.absoluteTime;
        this.value = event.value;
    }
    Object.defineProperty(ControlChange.prototype, "number", {
        /**
         * The controller number
         */
        get: function () {
            return privateCCNumberMap.get(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlChange.prototype, "name", {
        /**
         * return the common name of the control number if it exists
         */
        get: function () {
            if (exports.controlChangeNames[this.number]) {
                return exports.controlChangeNames[this.number];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlChange.prototype, "time", {
        /**
         * The time of the event in seconds
         */
        get: function () {
            var header = privateHeaderMap.get(this);
            return header.ticksToSeconds(this.ticks);
        },
        set: function (t) {
            var header = privateHeaderMap.get(this);
            this.ticks = header.secondsToTicks(t);
        },
        enumerable: true,
        configurable: true
    });
    ControlChange.prototype.toJSON = function () {
        return {
            number: this.number,
            ticks: this.ticks,
            time: this.time,
            value: this.value,
        };
    };
    return ControlChange;
}());
exports.ControlChange = ControlChange;
//# sourceMappingURL=ControlChange.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/ControlChanges.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/ControlChanges.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var ControlChange_1 = __webpack_require__(/*! ./ControlChange */ "./node_modules/@tonejs/midi/dist/ControlChange.js");
/**
 * Automatically creates an alias for named control values using Proxies
 * @hidden
 */
function createControlChanges() {
    return new Proxy({}, {
        // tslint:disable-next-line: typedef
        get: function (target, handler) {
            if (target[handler]) {
                return target[handler];
            }
            else if (ControlChange_1.controlChangeIds.hasOwnProperty(handler)) {
                return target[ControlChange_1.controlChangeIds[handler]];
            }
        },
        // tslint:disable-next-line: typedef
        set: function (target, handler, value) {
            if (ControlChange_1.controlChangeIds.hasOwnProperty(handler)) {
                target[ControlChange_1.controlChangeIds[handler]] = value;
            }
            else {
                target[handler] = value;
            }
            return true;
        },
    });
}
exports.createControlChanges = createControlChanges;
//# sourceMappingURL=ControlChanges.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/Encode.js":
/*!**************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/Encode.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var midi_file_1 = __webpack_require__(/*! midi-file */ "./node_modules/midi-file/index.js");
var Header_1 = __webpack_require__(/*! ./Header */ "./node_modules/@tonejs/midi/dist/Header.js");
var array_flatten_1 = __importDefault(__webpack_require__(/*! array-flatten */ "./node_modules/array-flatten/array-flatten.js"));
function encodeNote(note, channel) {
    return [{
            absoluteTime: note.ticks,
            channel: channel,
            deltaTime: 0,
            noteNumber: note.midi,
            type: "noteOn",
            velocity: Math.floor(note.velocity * 127),
        },
        {
            absoluteTime: note.ticks + note.durationTicks,
            channel: channel,
            deltaTime: 0,
            noteNumber: note.midi,
            type: "noteOff",
            velocity: Math.floor(note.noteOffVelocity * 127),
        }];
}
function encodeNotes(track) {
    return array_flatten_1.default(track.notes.map(function (note) { return encodeNote(note, track.channel); }));
}
function encodeControlChange(cc, channel) {
    return {
        absoluteTime: cc.ticks,
        channel: channel,
        controllerType: cc.number,
        deltaTime: 0,
        type: "controller",
        value: Math.floor(cc.value * 127),
    };
}
function encodeControlChanges(track) {
    var controlChanges = [];
    for (var i = 0; i < 127; i++) {
        if (track.controlChanges.hasOwnProperty(i)) {
            track.controlChanges[i].forEach(function (cc) {
                controlChanges.push(encodeControlChange(cc, track.channel));
            });
        }
    }
    return controlChanges;
}
function encodePitchBend(pb, channel) {
    return {
        absoluteTime: pb.ticks,
        channel: channel,
        deltaTime: 0,
        type: "pitchBend",
        value: pb.value,
    };
}
function encodePitchBends(track) {
    var pitchBends = [];
    track.pitchBends.forEach(function (pb) {
        pitchBends.push(encodePitchBend(pb, track.channel));
    });
    return pitchBends;
}
function encodeInstrument(track) {
    return {
        absoluteTime: 0,
        channel: track.channel,
        deltaTime: 0,
        programNumber: track.instrument.number,
        type: "programChange",
    };
}
function encodeTrackName(name) {
    return {
        absoluteTime: 0,
        deltaTime: 0,
        meta: true,
        text: name,
        type: "trackName",
    };
}
function encodeTempo(tempo) {
    return {
        absoluteTime: tempo.ticks,
        deltaTime: 0,
        meta: true,
        microsecondsPerBeat: Math.floor(60000000 / tempo.bpm),
        type: "setTempo",
    };
}
function encodeTimeSignature(timeSig) {
    return {
        absoluteTime: timeSig.ticks,
        deltaTime: 0,
        denominator: timeSig.timeSignature[1],
        meta: true,
        metronome: 24,
        numerator: timeSig.timeSignature[0],
        thirtyseconds: 8,
        type: "timeSignature",
    };
}
// function encodeMeta(event: )
function encodeKeySignature(keySig) {
    var keyIndex = Header_1.keySignatureKeys.indexOf(keySig.key);
    return {
        absoluteTime: keySig.ticks,
        deltaTime: 0,
        key: keyIndex + 7,
        meta: true,
        scale: keySig.scale === "major" ? 0 : 1,
        type: "keySignature",
    };
}
function encodeText(textEvent) {
    return {
        absoluteTime: textEvent.ticks,
        deltaTime: 0,
        meta: true,
        text: textEvent.text,
        type: textEvent.type,
    };
}
/**
 * Convert the midi object to an array
 */
function encode(midi) {
    var midiData = {
        header: {
            format: 1,
            numTracks: midi.tracks.length + 1,
            ticksPerBeat: midi.header.ppq,
        },
        tracks: __spreadArrays([
            __spreadArrays([
                // the name data
                {
                    absoluteTime: 0,
                    deltaTime: 0,
                    meta: true,
                    text: midi.header.name,
                    type: "trackName",
                }
            ], midi.header.keySignatures.map(function (keySig) { return encodeKeySignature(keySig); }), midi.header.meta.map(function (e) { return encodeText(e); }), midi.header.tempos.map(function (tempo) { return encodeTempo(tempo); }), midi.header.timeSignatures.map(function (timeSig) { return encodeTimeSignature(timeSig); }))
        ], midi.tracks.map(function (track) {
            return __spreadArrays([
                // add the name
                encodeTrackName(track.name),
                // the instrument
                encodeInstrument(track)
            ], encodeNotes(track), encodeControlChanges(track), encodePitchBends(track));
        })),
    };
    // sort and set deltaTime of all of the tracks
    midiData.tracks = midiData.tracks.map(function (track) {
        track = track.sort(function (a, b) { return a.absoluteTime - b.absoluteTime; });
        var lastTime = 0;
        track.forEach(function (note) {
            note.deltaTime = note.absoluteTime - lastTime;
            lastTime = note.absoluteTime;
            delete note.absoluteTime;
        });
        // end of track
        track.push({
            deltaTime: 0,
            meta: true,
            type: "endOfTrack",
        });
        return track;
    });
    // return midiData
    return new Uint8Array(midi_file_1.writeMidi(midiData));
}
exports.encode = encode;
//# sourceMappingURL=Encode.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/Header.js":
/*!**************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/Header.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var BinarySearch_1 = __webpack_require__(/*! ./BinarySearch */ "./node_modules/@tonejs/midi/dist/BinarySearch.js");
var privatePPQMap = new WeakMap();
/**
 * @hidden
 */
exports.keySignatureKeys = [
    "Cb",
    "Gb",
    "Db",
    "Ab",
    "Eb",
    "Bb",
    "F",
    "C",
    "G",
    "D",
    "A",
    "E",
    "B",
    "F#",
    "C#",
];
/** The parsed midi file header */
var Header = /** @class */ (function () {
    function Header(midiData) {
        // look through all the tracks for tempo changes
        var _this = this;
        /**
         * The array of all the tempo events
         */
        this.tempos = [];
        /**
         * The time signatures
         */
        this.timeSignatures = [];
        /**
         * The time signatures
         */
        this.keySignatures = [];
        /**
         * Additional meta events
         */
        this.meta = [];
        /**
         * The name of the midi file
         */
        this.name = "";
        privatePPQMap.set(this, 480);
        if (midiData) {
            privatePPQMap.set(this, midiData.header.ticksPerBeat);
            // check time signature and tempo events from all of the tracks
            midiData.tracks.forEach(function (track) {
                return track.forEach(function (event) {
                    if (event.meta) {
                        if (event.type === "timeSignature") {
                            _this.timeSignatures.push({
                                ticks: event.absoluteTime,
                                timeSignature: [
                                    event.numerator,
                                    event.denominator,
                                ],
                            });
                        }
                        else if (event.type === "setTempo") {
                            _this.tempos.push({
                                bpm: 60000000 / event.microsecondsPerBeat,
                                ticks: event.absoluteTime,
                            });
                        }
                        else if (event.type === "keySignature") {
                            _this.keySignatures.push({
                                key: exports.keySignatureKeys[event.key + 7],
                                scale: event.scale === 0 ? "major" : "minor",
                                ticks: event.absoluteTime,
                            });
                        }
                    }
                });
            });
            // check the first track for other relevant data
            midiData.tracks[0].forEach(function (event) {
                if (event.meta) {
                    if (event.type === "trackName") {
                        _this.name = event.text;
                    }
                    else if (event.type === "text" ||
                        event.type === "cuePoint" ||
                        event.type === "marker" ||
                        event.type === "lyrics") {
                        _this.meta.push({
                            text: event.text,
                            ticks: event.absoluteTime,
                            type: event.type,
                        });
                    }
                }
            });
            this.update();
        }
    }
    /**
     * This must be invoked after any changes are made to the tempo array
     * or the timeSignature array for the updated values to be reflected.
     */
    Header.prototype.update = function () {
        var _this = this;
        var currentTime = 0;
        var lastEventBeats = 0;
        // make sure it's sorted
        this.tempos.sort(function (a, b) { return a.ticks - b.ticks; });
        this.tempos.forEach(function (event, index) {
            var lastBPM = index > 0 ? _this.tempos[index - 1].bpm : _this.tempos[0].bpm;
            var beats = event.ticks / _this.ppq - lastEventBeats;
            var elapsedSeconds = (60 / lastBPM) * beats;
            event.time = elapsedSeconds + currentTime;
            currentTime = event.time;
            lastEventBeats += beats;
        });
        this.timeSignatures.sort(function (a, b) { return a.ticks - b.ticks; });
        this.timeSignatures.forEach(function (event, index) {
            var lastEvent = index > 0
                ? _this.timeSignatures[index - 1]
                : _this.timeSignatures[0];
            var elapsedBeats = (event.ticks - lastEvent.ticks) / _this.ppq;
            var elapsedMeasures = elapsedBeats /
                lastEvent.timeSignature[0] /
                (lastEvent.timeSignature[1] / 4);
            lastEvent.measures = lastEvent.measures || 0;
            event.measures = elapsedMeasures + lastEvent.measures;
        });
    };
    /**
     * Convert ticks into seconds based on the tempo changes
     */
    Header.prototype.ticksToSeconds = function (ticks) {
        // find the relevant position
        var index = BinarySearch_1.search(this.tempos, ticks);
        if (index !== -1) {
            var tempo = this.tempos[index];
            var tempoTime = tempo.time;
            var elapsedBeats = (ticks - tempo.ticks) / this.ppq;
            return tempoTime + (60 / tempo.bpm) * elapsedBeats;
        }
        else {
            // assume 120
            var beats = ticks / this.ppq;
            return (60 / 120) * beats;
        }
    };
    /**
     * Convert ticks into measures based off of the time signatures
     */
    Header.prototype.ticksToMeasures = function (ticks) {
        var index = BinarySearch_1.search(this.timeSignatures, ticks);
        if (index !== -1) {
            var timeSigEvent = this.timeSignatures[index];
            var elapsedBeats = (ticks - timeSigEvent.ticks) / this.ppq;
            return (timeSigEvent.measures +
                elapsedBeats /
                    (timeSigEvent.timeSignature[0] /
                        timeSigEvent.timeSignature[1]) /
                    4);
        }
        else {
            return ticks / this.ppq / 4;
        }
    };
    Object.defineProperty(Header.prototype, "ppq", {
        /**
         * The number of ticks per quarter note
         */
        get: function () {
            return privatePPQMap.get(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Convert seconds to ticks based on the tempo events
     */
    Header.prototype.secondsToTicks = function (seconds) {
        // find the relevant position
        var index = BinarySearch_1.search(this.tempos, seconds, "time");
        if (index !== -1) {
            var tempo = this.tempos[index];
            var tempoTime = tempo.time;
            var elapsedTime = seconds - tempoTime;
            var elapsedBeats = elapsedTime / (60 / tempo.bpm);
            return Math.round(tempo.ticks + elapsedBeats * this.ppq);
        }
        else {
            // assume 120
            var beats = seconds / (60 / 120);
            return Math.round(beats * this.ppq);
        }
    };
    /**
     * Convert the header into an object.
     */
    Header.prototype.toJSON = function () {
        return {
            keySignatures: this.keySignatures,
            meta: this.meta,
            name: this.name,
            ppq: this.ppq,
            tempos: this.tempos.map(function (t) {
                return {
                    bpm: t.bpm,
                    ticks: t.ticks,
                };
            }),
            timeSignatures: this.timeSignatures,
        };
    };
    /**
     * parse a header json object.
     */
    Header.prototype.fromJSON = function (json) {
        this.name = json.name;
        // clone all the attributes
        this.tempos = json.tempos.map(function (t) { return Object.assign({}, t); });
        this.timeSignatures = json.timeSignatures.map(function (t) {
            return Object.assign({}, t);
        });
        this.keySignatures = json.keySignatures.map(function (t) {
            return Object.assign({}, t);
        });
        this.meta = json.meta.map(function (t) { return Object.assign({}, t); });
        privatePPQMap.set(this, json.ppq);
        this.update();
    };
    /**
     * Update the tempo of the midi to a single tempo. Will remove and replace
     * any other tempos currently set and update all of the event timing.
     * @param bpm The tempo in beats per second
     */
    Header.prototype.setTempo = function (bpm) {
        this.tempos = [
            {
                bpm: bpm,
                ticks: 0,
            },
        ];
        this.update();
    };
    return Header;
}());
exports.Header = Header;
//# sourceMappingURL=Header.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/Instrument.js":
/*!******************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/Instrument.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var InstrumentMaps_1 = __webpack_require__(/*! ./InstrumentMaps */ "./node_modules/@tonejs/midi/dist/InstrumentMaps.js");
/**
 * @hidden
 */
var privateTrackMap = new WeakMap();
/**
 * Describes the midi instrument of a track
 */
var Instrument = /** @class */ (function () {
    /**
     * @param trackData
     * @param track
     */
    function Instrument(trackData, track) {
        /**
         * The instrument number
         */
        this.number = 0;
        privateTrackMap.set(this, track);
        this.number = 0;
        if (trackData) {
            var programChange = trackData.find(function (e) { return e.type === "programChange"; });
            if (programChange) {
                this.number = programChange.programNumber;
            }
        }
    }
    Object.defineProperty(Instrument.prototype, "name", {
        /**
         * The common name of the instrument
         */
        get: function () {
            if (this.percussion) {
                return InstrumentMaps_1.DrumKitByPatchID[this.number];
            }
            else {
                return InstrumentMaps_1.instrumentByPatchID[this.number];
            }
        },
        set: function (n) {
            var patchNumber = InstrumentMaps_1.instrumentByPatchID.indexOf(n);
            if (patchNumber !== -1) {
                this.number = patchNumber;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instrument.prototype, "family", {
        /**
         * The instrument family, e.g. "piano".
         */
        get: function () {
            if (this.percussion) {
                return "drums";
            }
            else {
                return InstrumentMaps_1.InstrumentFamilyByID[Math.floor(this.number / 8)];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instrument.prototype, "percussion", {
        /**
         * If the instrument is a percussion instrument
         */
        get: function () {
            var track = privateTrackMap.get(this);
            return track.channel === 9;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Convert it to JSON form
     */
    Instrument.prototype.toJSON = function () {
        return {
            family: this.family,
            name: this.name,
            number: this.number,
        };
    };
    /**
     * Convert from JSON form
     */
    Instrument.prototype.fromJSON = function (json) {
        this.number = json.number;
    };
    return Instrument;
}());
exports.Instrument = Instrument;
//# sourceMappingURL=Instrument.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/InstrumentMaps.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/InstrumentMaps.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.instrumentByPatchID = [
    "acoustic grand piano",
    "bright acoustic piano",
    "electric grand piano",
    "honky-tonk piano",
    "electric piano 1",
    "electric piano 2",
    "harpsichord",
    "clavi",
    "celesta",
    "glockenspiel",
    "music box",
    "vibraphone",
    "marimba",
    "xylophone",
    "tubular bells",
    "dulcimer",
    "drawbar organ",
    "percussive organ",
    "rock organ",
    "church organ",
    "reed organ",
    "accordion",
    "harmonica",
    "tango accordion",
    "acoustic guitar (nylon)",
    "acoustic guitar (steel)",
    "electric guitar (jazz)",
    "electric guitar (clean)",
    "electric guitar (muted)",
    "overdriven guitar",
    "distortion guitar",
    "guitar harmonics",
    "acoustic bass",
    "electric bass (finger)",
    "electric bass (pick)",
    "fretless bass",
    "slap bass 1",
    "slap bass 2",
    "synth bass 1",
    "synth bass 2",
    "violin",
    "viola",
    "cello",
    "contrabass",
    "tremolo strings",
    "pizzicato strings",
    "orchestral harp",
    "timpani",
    "string ensemble 1",
    "string ensemble 2",
    "synthstrings 1",
    "synthstrings 2",
    "choir aahs",
    "voice oohs",
    "synth voice",
    "orchestra hit",
    "trumpet",
    "trombone",
    "tuba",
    "muted trumpet",
    "french horn",
    "brass section",
    "synthbrass 1",
    "synthbrass 2",
    "soprano sax",
    "alto sax",
    "tenor sax",
    "baritone sax",
    "oboe",
    "english horn",
    "bassoon",
    "clarinet",
    "piccolo",
    "flute",
    "recorder",
    "pan flute",
    "blown bottle",
    "shakuhachi",
    "whistle",
    "ocarina",
    "lead 1 (square)",
    "lead 2 (sawtooth)",
    "lead 3 (calliope)",
    "lead 4 (chiff)",
    "lead 5 (charang)",
    "lead 6 (voice)",
    "lead 7 (fifths)",
    "lead 8 (bass + lead)",
    "pad 1 (new age)",
    "pad 2 (warm)",
    "pad 3 (polysynth)",
    "pad 4 (choir)",
    "pad 5 (bowed)",
    "pad 6 (metallic)",
    "pad 7 (halo)",
    "pad 8 (sweep)",
    "fx 1 (rain)",
    "fx 2 (soundtrack)",
    "fx 3 (crystal)",
    "fx 4 (atmosphere)",
    "fx 5 (brightness)",
    "fx 6 (goblins)",
    "fx 7 (echoes)",
    "fx 8 (sci-fi)",
    "sitar",
    "banjo",
    "shamisen",
    "koto",
    "kalimba",
    "bag pipe",
    "fiddle",
    "shanai",
    "tinkle bell",
    "agogo",
    "steel drums",
    "woodblock",
    "taiko drum",
    "melodic tom",
    "synth drum",
    "reverse cymbal",
    "guitar fret noise",
    "breath noise",
    "seashore",
    "bird tweet",
    "telephone ring",
    "helicopter",
    "applause",
    "gunshot",
];
exports.InstrumentFamilyByID = [
    "piano",
    "chromatic percussion",
    "organ",
    "guitar",
    "bass",
    "strings",
    "ensemble",
    "brass",
    "reed",
    "pipe",
    "synth lead",
    "synth pad",
    "synth effects",
    "world",
    "percussive",
    "sound effects",
];
exports.DrumKitByPatchID = {
    0: "standard kit",
    8: "room kit",
    16: "power kit",
    24: "electronic kit",
    25: "tr-808 kit",
    32: "jazz kit",
    40: "brush kit",
    48: "orchestra kit",
    56: "sound fx kit",
};
//# sourceMappingURL=InstrumentMaps.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/Midi.js":
/*!************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/Midi.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var midi_file_1 = __webpack_require__(/*! midi-file */ "./node_modules/midi-file/index.js");
var Encode_1 = __webpack_require__(/*! ./Encode */ "./node_modules/@tonejs/midi/dist/Encode.js");
var Header_1 = __webpack_require__(/*! ./Header */ "./node_modules/@tonejs/midi/dist/Header.js");
var Track_1 = __webpack_require__(/*! ./Track */ "./node_modules/@tonejs/midi/dist/Track.js");
/**
 * The main midi parsing class
 */
var Midi = /** @class */ (function () {
    /**
     * Parse the midi data
     */
    function Midi(midiArray) {
        var _this = this;
        // parse the midi data if there is any
        var midiData = null;
        if (midiArray) {
            if (midiArray instanceof ArrayBuffer) {
                midiArray = new Uint8Array(midiArray);
            }
            midiData = midi_file_1.parseMidi(midiArray);
            // add the absolute times to each of the tracks
            midiData.tracks.forEach(function (track) {
                var currentTicks = 0;
                track.forEach(function (event) {
                    currentTicks += event.deltaTime;
                    event.absoluteTime = currentTicks;
                });
            });
            // ensure at most one instrument per track
            midiData.tracks = splitTracks(midiData.tracks);
        }
        this.header = new Header_1.Header(midiData);
        this.tracks = [];
        // parse the midi data
        if (midiArray) {
            // format 0, everything is on the same track
            this.tracks = midiData.tracks.map(function (trackData) { return new Track_1.Track(trackData, _this.header); });
            // if it's format 1 and there are no notes on the first track, remove it
            if (midiData.header.format === 1 && this.tracks[0].duration === 0) {
                this.tracks.shift();
            }
        }
    }
    /**
     * Download and parse the MIDI file. Returns a promise
     * which resolves to the generated midi file
     * @param url The url to fetch
     */
    Midi.fromUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, arrayBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        arrayBuffer = _a.sent();
                        return [2 /*return*/, new Midi(arrayBuffer)];
                    case 3: throw new Error("could not load " + url);
                }
            });
        });
    };
    Object.defineProperty(Midi.prototype, "name", {
        /**
         * The name of the midi file, taken from the first track
         */
        get: function () {
            return this.header.name;
        },
        set: function (n) {
            this.header.name = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Midi.prototype, "duration", {
        /**
         * The total length of the file in seconds
         */
        get: function () {
            // get the max of the last note of all the tracks
            var durations = this.tracks.map(function (t) { return t.duration; });
            return Math.max.apply(Math, durations);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Midi.prototype, "durationTicks", {
        /**
         * The total length of the file in ticks
         */
        get: function () {
            // get the max of the last note of all the tracks
            var durationTicks = this.tracks.map(function (t) { return t.durationTicks; });
            return Math.max.apply(Math, durationTicks);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a track to the midi file
     */
    Midi.prototype.addTrack = function () {
        var track = new Track_1.Track(undefined, this.header);
        this.tracks.push(track);
        return track;
    };
    /**
     * Encode the midi as a Uint8Array.
     */
    Midi.prototype.toArray = function () {
        return Encode_1.encode(this);
    };
    /**
     * Convert the midi object to JSON.
     */
    Midi.prototype.toJSON = function () {
        return {
            header: this.header.toJSON(),
            tracks: this.tracks.map(function (track) { return track.toJSON(); }),
        };
    };
    /**
     * Parse a JSON representation of the object. Will overwrite the current
     * tracks and header.
     */
    Midi.prototype.fromJSON = function (json) {
        var _this = this;
        this.header = new Header_1.Header();
        this.header.fromJSON(json.header);
        this.tracks = json.tracks.map(function (trackJSON) {
            var track = new Track_1.Track(undefined, _this.header);
            track.fromJSON(trackJSON);
            return track;
        });
    };
    /**
     * Clone the entire object midi object
     */
    Midi.prototype.clone = function () {
        var midi = new Midi();
        midi.fromJSON(this.toJSON());
        return midi;
    };
    return Midi;
}());
exports.Midi = Midi;
var Track_2 = __webpack_require__(/*! ./Track */ "./node_modules/@tonejs/midi/dist/Track.js");
exports.Track = Track_2.Track;
var Header_2 = __webpack_require__(/*! ./Header */ "./node_modules/@tonejs/midi/dist/Header.js");
exports.Header = Header_2.Header;
/**
 * Given a list of MIDI tracks, make sure that each channel corresponds to at
 * most one channel and at most one instrument. This means splitting up tracks
 * that contain more than one channel or instrument.
 */
function splitTracks(tracks) {
    var newTracks = [];
    for (var i = 0; i < tracks.length; i++) {
        var defaultTrack = newTracks.length;
        // a map from [program, channel] tuples to new track numbers
        var trackMap = new Map();
        // a map from channel numbers to current program numbers
        var currentProgram = Array(16).fill(0);
        for (var _i = 0, _a = tracks[i]; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            var targetTrack = defaultTrack;
            // If the event has a channel, we need to find that channel's current
            // program number and the appropriate track for this [program, channel]
            // pair.
            var channel = event_1.channel;
            if (channel !== undefined) {
                if (event_1.type === "programChange") {
                    currentProgram[channel] = event_1.programNumber;
                }
                var program = currentProgram[channel];
                var trackKey = program + " " + channel;
                if (trackMap.has(trackKey)) {
                    targetTrack = trackMap.get(trackKey);
                }
                else {
                    targetTrack = defaultTrack + trackMap.size;
                    trackMap.set(trackKey, targetTrack);
                }
            }
            if (!newTracks[targetTrack]) {
                newTracks.push([]);
            }
            newTracks[targetTrack].push(event_1);
        }
    }
    return newTracks;
}
//# sourceMappingURL=Midi.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/Note.js":
/*!************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/Note.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Convert a midi note into a pitch
 */
function midiToPitch(midi) {
    var octave = Math.floor(midi / 12) - 1;
    return midiToPitchClass(midi) + octave.toString();
}
/**
 * Convert a midi note to a pitch class (just the pitch no octave)
 */
function midiToPitchClass(midi) {
    var scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var note = midi % 12;
    return scaleIndexToNote[note];
}
/**
 * Convert a pitch class to a MIDI note
 */
function pitchClassToMidi(pitch) {
    var scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return scaleIndexToNote.indexOf(pitch);
}
/**
 * Convert a pitch to a midi number
 */
// tslint:disable-next-line: only-arrow-functions typedef
var pitchToMidi = (function () {
    var regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i;
    var noteToScaleIndex = {
        // tslint:disable-next-line: object-literal-sort-keys
        cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2,
        dbb: 0, db: 1, d: 2, "d#": 3, dx: 4,
        ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6,
        fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7,
        gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9,
        abb: 7, ab: 8, a: 9, "a#": 10, ax: 11,
        bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13,
    };
    return function (note) {
        var split = regexp.exec(note);
        var pitch = split[1];
        var octave = split[2];
        var index = noteToScaleIndex[pitch.toLowerCase()];
        return index + (parseInt(octave, 10) + 1) * 12;
    };
}());
var privateHeaderMap = new WeakMap();
/**
 * A Note consists of a noteOn and noteOff event
 */
var Note = /** @class */ (function () {
    function Note(noteOn, noteOff, header) {
        privateHeaderMap.set(this, header);
        this.midi = noteOn.midi;
        this.velocity = noteOn.velocity;
        this.noteOffVelocity = noteOff.velocity;
        this.ticks = noteOn.ticks;
        this.durationTicks = noteOff.ticks - noteOn.ticks;
    }
    Object.defineProperty(Note.prototype, "name", {
        /**
         * The note name and octave in scientific pitch notation, e.g. "C4"
         */
        get: function () {
            return midiToPitch(this.midi);
        },
        set: function (n) {
            this.midi = pitchToMidi(n);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "octave", {
        /**
         * The notes octave number
         */
        get: function () {
            return Math.floor(this.midi / 12) - 1;
        },
        set: function (o) {
            var diff = o - this.octave;
            this.midi += diff * 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "pitch", {
        /**
         * The pitch class name. e.g. "A"
         */
        get: function () {
            return midiToPitchClass(this.midi);
        },
        set: function (p) {
            this.midi = 12 * (this.octave + 1) + pitchClassToMidi(p);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "duration", {
        /**
         * The duration of the segment in seconds
         */
        get: function () {
            var header = privateHeaderMap.get(this);
            return header.ticksToSeconds(this.ticks + this.durationTicks) - header.ticksToSeconds(this.ticks);
        },
        set: function (d) {
            var header = privateHeaderMap.get(this);
            var noteEndTicks = header.secondsToTicks(this.time + d);
            this.durationTicks = noteEndTicks - this.ticks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "time", {
        /**
         * The time of the event in seconds
         */
        get: function () {
            var header = privateHeaderMap.get(this);
            return header.ticksToSeconds(this.ticks);
        },
        set: function (t) {
            var header = privateHeaderMap.get(this);
            this.ticks = header.secondsToTicks(t);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "bars", {
        /**
         * The number of measures (and partial measures) to this beat.
         * Takes into account time signature changes
         * @readonly
         */
        get: function () {
            var header = privateHeaderMap.get(this);
            return header.ticksToMeasures(this.ticks);
        },
        enumerable: true,
        configurable: true
    });
    Note.prototype.toJSON = function () {
        return {
            duration: this.duration,
            durationTicks: this.durationTicks,
            midi: this.midi,
            name: this.name,
            ticks: this.ticks,
            time: this.time,
            velocity: this.velocity,
        };
    };
    return Note;
}());
exports.Note = Note;
//# sourceMappingURL=Note.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/PitchBend.js":
/*!*****************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/PitchBend.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var privateHeaderMap = new WeakMap();
/**
 * Represents a pitch bend event
 */
var PitchBend = /** @class */ (function () {
    /**
     * @param event
     * @param header
     */
    function PitchBend(event, header) {
        privateHeaderMap.set(this, header);
        this.ticks = event.absoluteTime;
        this.value = event.value;
    }
    Object.defineProperty(PitchBend.prototype, "time", {
        /**
         * The time of the event in seconds
         */
        get: function () {
            var header = privateHeaderMap.get(this);
            return header.ticksToSeconds(this.ticks);
        },
        set: function (t) {
            var header = privateHeaderMap.get(this);
            this.ticks = header.secondsToTicks(t);
        },
        enumerable: true,
        configurable: true
    });
    PitchBend.prototype.toJSON = function () {
        return {
            ticks: this.ticks,
            time: this.time,
            value: this.value,
        };
    };
    return PitchBend;
}());
exports.PitchBend = PitchBend;
//# sourceMappingURL=PitchBend.js.map

/***/ }),

/***/ "./node_modules/@tonejs/midi/dist/Track.js":
/*!*************************************************!*\
  !*** ./node_modules/@tonejs/midi/dist/Track.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var BinarySearch_1 = __webpack_require__(/*! ./BinarySearch */ "./node_modules/@tonejs/midi/dist/BinarySearch.js");
var ControlChange_1 = __webpack_require__(/*! ./ControlChange */ "./node_modules/@tonejs/midi/dist/ControlChange.js");
var ControlChanges_1 = __webpack_require__(/*! ./ControlChanges */ "./node_modules/@tonejs/midi/dist/ControlChanges.js");
var PitchBend_1 = __webpack_require__(/*! ./PitchBend */ "./node_modules/@tonejs/midi/dist/PitchBend.js");
var Instrument_1 = __webpack_require__(/*! ./Instrument */ "./node_modules/@tonejs/midi/dist/Instrument.js");
var Note_1 = __webpack_require__(/*! ./Note */ "./node_modules/@tonejs/midi/dist/Note.js");
var privateHeaderMap = new WeakMap();
/**
 * A Track is a collection of notes and controlChanges
 */
var Track = /** @class */ (function () {
    function Track(trackData, header) {
        var _this = this;
        /**
         * The name of the track
         */
        this.name = "";
        /**
         * The track's note events
         */
        this.notes = [];
        /**
         * The control change events
         */
        this.controlChanges = ControlChanges_1.createControlChanges();
        /**
         * The pitch bend events
         */
        this.pitchBends = [];
        privateHeaderMap.set(this, header);
        if (trackData) {
            var nameEvent = trackData.find(function (e) { return e.type === "trackName"; });
            this.name = nameEvent ? nameEvent.text : "";
        }
        this.instrument = new Instrument_1.Instrument(trackData, this);
        // defaults to 0
        this.channel = 0;
        if (trackData) {
            var noteOns = trackData.filter(function (event) { return event.type === "noteOn"; });
            var noteOffs = trackData.filter(function (event) { return event.type === "noteOff"; });
            var _loop_1 = function () {
                var currentNote = noteOns.shift();
                // set the channel based on the note
                this_1.channel = currentNote.channel;
                // find the corresponding note off
                var offIndex = noteOffs.findIndex(function (note) {
                    return note.noteNumber === currentNote.noteNumber &&
                        note.absoluteTime >= currentNote.absoluteTime;
                });
                if (offIndex !== -1) {
                    // once it's got the note off, add it
                    var noteOff = noteOffs.splice(offIndex, 1)[0];
                    this_1.addNote({
                        durationTicks: noteOff.absoluteTime - currentNote.absoluteTime,
                        midi: currentNote.noteNumber,
                        noteOffVelocity: noteOff.velocity / 127,
                        ticks: currentNote.absoluteTime,
                        velocity: currentNote.velocity / 127,
                    });
                }
            };
            var this_1 = this;
            while (noteOns.length) {
                _loop_1();
            }
            var controlChanges = trackData.filter(function (event) { return event.type === "controller"; });
            controlChanges.forEach(function (event) {
                _this.addCC({
                    number: event.controllerType,
                    ticks: event.absoluteTime,
                    value: event.value / 127,
                });
            });
            var pitchBends = trackData.filter(function (event) { return event.type === "pitchBend"; });
            pitchBends.forEach(function (event) {
                _this.addPitchBend({
                    ticks: event.absoluteTime,
                    // scale the value between -2^13 to 2^13 to -2 to 2
                    value: event.value / Math.pow(2, 13),
                });
            });
            var endOfTrackEvent = trackData.find(function (event) {
                return event.type === "endOfTrack";
            });
            this.endOfTrackTicks =
                endOfTrackEvent !== undefined
                    ? endOfTrackEvent.absoluteTime
                    : undefined;
        }
    }
    /**
     * Add a note to the notes array
     * @param props The note properties to add
     */
    Track.prototype.addNote = function (props) {
        var header = privateHeaderMap.get(this);
        var note = new Note_1.Note({
            midi: 0,
            ticks: 0,
            velocity: 1,
        }, {
            ticks: 0,
            velocity: 0,
        }, header);
        Object.assign(note, props);
        BinarySearch_1.insert(this.notes, note, "ticks");
        return this;
    };
    /**
     * Add a control change to the track
     * @param props
     */
    Track.prototype.addCC = function (props) {
        var header = privateHeaderMap.get(this);
        var cc = new ControlChange_1.ControlChange({
            controllerType: props.number,
        }, header);
        delete props.number;
        Object.assign(cc, props);
        if (!Array.isArray(this.controlChanges[cc.number])) {
            this.controlChanges[cc.number] = [];
        }
        BinarySearch_1.insert(this.controlChanges[cc.number], cc, "ticks");
        return this;
    };
    /**
     * Add a control change to the track
     */
    Track.prototype.addPitchBend = function (props) {
        var header = privateHeaderMap.get(this);
        var pb = new PitchBend_1.PitchBend({}, header);
        Object.assign(pb, props);
        BinarySearch_1.insert(this.pitchBends, pb, "ticks");
        return this;
    };
    Object.defineProperty(Track.prototype, "duration", {
        /**
         * The end time of the last event in the track
         */
        get: function () {
            if (!this.notes.length) {
                return 0;
            }
            var maxDuration = this.notes[this.notes.length - 1].time +
                this.notes[this.notes.length - 1].duration;
            for (var i = 0; i < this.notes.length - 1; i++) {
                var duration = this.notes[i].time + this.notes[i].duration;
                if (maxDuration < duration) {
                    maxDuration = duration;
                }
            }
            return maxDuration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "durationTicks", {
        /**
         * The end time of the last event in the track in ticks
         */
        get: function () {
            if (!this.notes.length) {
                return 0;
            }
            var maxDuration = this.notes[this.notes.length - 1].ticks +
                this.notes[this.notes.length - 1].durationTicks;
            for (var i = 0; i < this.notes.length - 1; i++) {
                var duration = this.notes[i].ticks + this.notes[i].durationTicks;
                if (maxDuration < duration) {
                    maxDuration = duration;
                }
            }
            return maxDuration;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Assign the json values to this track
     */
    Track.prototype.fromJSON = function (json) {
        var _this = this;
        this.name = json.name;
        this.channel = json.channel;
        this.instrument = new Instrument_1.Instrument(undefined, this);
        this.instrument.fromJSON(json.instrument);
        if (json.endOfTrackTicks !== undefined) {
            this.endOfTrackTicks = json.endOfTrackTicks;
        }
        for (var number in json.controlChanges) {
            if (json.controlChanges[number]) {
                json.controlChanges[number].forEach(function (cc) {
                    _this.addCC({
                        number: cc.number,
                        ticks: cc.ticks,
                        value: cc.value,
                    });
                });
            }
        }
        json.notes.forEach(function (n) {
            _this.addNote({
                durationTicks: n.durationTicks,
                midi: n.midi,
                ticks: n.ticks,
                velocity: n.velocity,
            });
        });
    };
    /**
     * Convert the track into a JSON format
     */
    Track.prototype.toJSON = function () {
        // convert all the CCs to JSON
        var controlChanges = {};
        for (var i = 0; i < 127; i++) {
            if (this.controlChanges.hasOwnProperty(i)) {
                controlChanges[i] = this.controlChanges[i].map(function (c) {
                    return c.toJSON();
                });
            }
        }
        var json = {
            channel: this.channel,
            controlChanges: controlChanges,
            pitchBends: this.pitchBends.map(function (pb) { return pb.toJSON(); }),
            instrument: this.instrument.toJSON(),
            name: this.name,
            notes: this.notes.map(function (n) { return n.toJSON(); }),
        };
        if (this.endOfTrackTicks !== undefined) {
            json.endOfTrackTicks = this.endOfTrackTicks;
        }
        return json;
    };
    return Track;
}());
exports.Track = Track;
//# sourceMappingURL=Track.js.map

/***/ }),

/***/ "./node_modules/array-flatten/array-flatten.js":
/*!*****************************************************!*\
  !*** ./node_modules/array-flatten/array-flatten.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Expose `arrayFlatten`.
 */
module.exports = flatten
module.exports.from = flattenFrom
module.exports.depth = flattenDepth
module.exports.fromDepth = flattenFromDepth

/**
 * Flatten an array.
 *
 * @param  {Array} array
 * @return {Array}
 */
function flatten (array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected value to be an array')
  }

  return flattenFrom(array)
}

/**
 * Flatten an array-like structure.
 *
 * @param  {Array} array
 * @return {Array}
 */
function flattenFrom (array) {
  return flattenDown(array, [])
}

/**
 * Flatten an array-like structure with depth.
 *
 * @param  {Array}  array
 * @param  {number} depth
 * @return {Array}
 */
function flattenDepth (array, depth) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected value to be an array')
  }

  return flattenFromDepth(array, depth)
}

/**
 * Flatten an array-like structure with depth.
 *
 * @param  {Array}  array
 * @param  {number} depth
 * @return {Array}
 */
function flattenFromDepth (array, depth) {
  if (typeof depth !== 'number') {
    throw new TypeError('Expected the depth to be a number')
  }

  return flattenDownDepth(array, [], depth)
}

/**
 * Flatten an array indefinitely.
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
function flattenDown (array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (Array.isArray(value)) {
      flattenDown(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Flatten an array with depth.
 *
 * @param  {Array}  array
 * @param  {Array}  result
 * @param  {number} depth
 * @return {Array}
 */
function flattenDownDepth (array, result, depth) {
  depth--

  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (depth > -1 && Array.isArray(value)) {
      flattenDownDepth(value, result, depth)
    } else {
      result.push(value)
    }
  }

  return result
}


/***/ }),

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
  return x instanceof Articulation || typeof x === "object" && x !== null && (typeof x.name === "undefined" || typeof x.name === "string") && typeof x.velocity === "number" && typeof x.length === "number";
};
class EnumArticulation {
  static get STACCATISSIMO() {
    return new Articulation("staccatissimo", 1, 0.25);
  }

  static get STACCATO() {
    return new Articulation("staccato", 1, 0.4);
  }

  static get MEZZO_STACCATO() {
    return new Articulation("mezzo staccato", 1, 0.75);
  }

  static get LEGATO() {
    return new Articulation("legato", 1, 0.95);
  }

  static get TENUTO() {
    return new Articulation("tenuto", 1, 1);
  }

  static get SOSTENUTO() {
    return new Articulation("sostenuto", 1, 1.2);
  }

  static get ACCENT() {
    return new Articulation("accent", 1.2, 1);
  }

  static get MARCATO() {
    return new Articulation("marcato", 1.5, 1);
  }

  static get PIZZICATO() {
    return new Articulation("pizzicato", 1, 1);
  }

  static get MUTED() {
    return new Articulation("muted", 1, 1);
  }

}
class Articulation {
  constructor(p1) {
    var velocityIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var lengthIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "velocity", void 0);

    _defineProperty(this, "length", void 0);

    this.become(p1, velocityIn, lengthIn);
  }

  become(p1) {
    var velocityIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var lengthIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (isArticulation(p1)) {
      this.name = p1.name;
      this.velocity = p1.velocity;
      this.length = p1.length;
    } else {
      this.name = p1;
      this.velocity = velocityIn;
      this.length = lengthIn;
    }

    return this;
  }

  clone() {
    return new Articulation(this);
  }

  toString() {
    return "Art: ".concat(this.name, " [Vel: ").concat(this.velocity, " Len: ").concat(this.length, "]");
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
/* harmony export */   "isChord": () => (/* binding */ isChord),
/* harmony export */   "isChordArray": () => (/* binding */ isChordArray),
/* harmony export */   "Chord": () => (/* binding */ Chord),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pitch */ "./src/Pitch.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _EnumChord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EnumChord */ "./src/EnumChord.ts");
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






var isChord = x => {
  return x instanceof Chord || typeof x === "object" && x !== null && (0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(x.base) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
};
var isChordArray = x => {
  return Array.isArray(x) && x.every(e => isChord(e));
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

    for (var _len = arguments.length, arrayIn = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arrayIn[_key - 1] = arguments[_key];
    }

    this.become(p1, ...arrayIn);
  }

  become(p1) {
    if (isChord(p1)) {
      var _isNote = (0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(p1);

      if (_isNote) this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(p1.base);else this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(p1.base);
      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(p1.intervals);
    } else if (typeof p1 === "string") {
      var _isNote2 = _Note__WEBPACK_IMPORTED_MODULE_1__.default.REGEX.exec(p1);

      if (_isNote2) this.base = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(p1);else this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(p1);
    } else if (typeof p1 === "number") {
      this.base = new _Pitch__WEBPACK_IMPORTED_MODULE_2__.default(p1);
    } else {
      this.base = p1;
    }

    for (var _len2 = arguments.length, arrayIn = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      arrayIn[_key2 - 1] = arguments[_key2];
    }

    if ((0,_Pitch__WEBPACK_IMPORTED_MODULE_2__.isPitchArray)(arrayIn)) {
      this.intervals = arrayIn.sort(_Pitch__WEBPACK_IMPORTED_MODULE_2__.default.compare).map(pitch => this.base.getInterval(pitch));
    } else if ((0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNoteArray)(arrayIn)) {
      this.intervals = arrayIn.map(note => this.base.getInterval(note));
    } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isNumberArray)(arrayIn)) {
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
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.nearestFractions)([1, ...this.intervals.map(i => i.ratio)]);
  }

  get reciprocal() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.nearestReciprocals)([1, ...this.intervals.map(i => i.ratio)]);
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
    return _EnumChord__WEBPACK_IMPORTED_MODULE_4__.EnumChord.byChord(this);
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
    return isChord(chordIn) && this.base.equals(chordIn.base) && chordIn.intervals.length === this.intervals.length && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
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
              factory.openMusic();
              factory.openVoice();
              factory.openChord();
              _iterator3 = _createForOfIteratorHelper(_this.notes);

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  note = _step3.value;
                  note.openGuidoEvent(factory);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              factory.closeChord();
              factory.closeVoice();
              return _context.abrupt("return", factory.closeMusic());

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
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

    return m.map(r => Math.max(...r)).reduce((s, e) => s + e, 0) / m.length;
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

    return m.map(r => Math.max(...r)).reduce((s, e) => s + e, 0) / m.length;
  }

}

_defineProperty(Chord, "isChord", isChord);

_defineProperty(Chord, "isChordArray", isChordArray);

_defineProperty(Chord, "EnumChord", _EnumChord__WEBPACK_IMPORTED_MODULE_4__.EnumChord);

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
  return x instanceof Color || typeof x === "object" && x !== null && typeof x.t === "number" && typeof x.s === "number" && typeof x.d === "number" && x.major === "number";
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
  return typeof x === "string" && (x === "0" || !!x.match(/^\d+n(t|d)?$/) && new Array(8).fill(null).map((v, i) => Math.pow(2, i)).indexOf(parseInt(x)) !== -1);
};
var isDuration = x => {
  return x instanceof Duration || typeof x === "object" && x !== null && typeof x.isAbsolute === "boolean" && (x.isAbsolute ? typeof x.seconds === "number" : typeof x.numerator === "number" && typeof x.denominator === "number");
};
class Duration {
  static fromArray(arrayIn) {
    return arrayIn.map(e => new Duration(e));
  }
  /**
   * Absolute mode (use seconds or numerator/denominator)
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

  get className() {
    return "Enum";
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Enum);

/***/ }),

/***/ "./src/EnumChord.ts":
/*!**************************!*\
  !*** ./src/EnumChord.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEnumChord": () => (/* binding */ isEnumChord),
/* harmony export */   "EnumChord": () => (/* binding */ EnumChord)
/* harmony export */ });
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chord */ "./src/Chord.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isEnumChord = x => {
  return x instanceof EnumChord || typeof x === "object" && x !== null && x.className === "EnumChord" && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
};
class EnumChord extends _Enum__WEBPACK_IMPORTED_MODULE_1__.default {
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

  static from(that) {
    return this.byChord(that);
  }

  static byChord(chordIn) {
    return this.values().find(enumChord => {
      return enumChord.intervals.length === chordIn.intervals.length && enumChord.intervals.every((interval, i) => interval.equals(chordIn.intervals[i]));
    }) || null;
  }

  static byName(chordIn) {
    return EnumChord[chordIn];
  }

  get className() {
    return "EnumChord";
  }

  toChord(base) {
    return new _Chord__WEBPACK_IMPORTED_MODULE_2__.Chord(base, ...this.intervals);
  }

  name() {
    return this._name;
  }

  equals(chordIn) {
    return ((0,_Chord__WEBPACK_IMPORTED_MODULE_2__.isChord)(chordIn) || isEnumChord(chordIn)) && chordIn.intervals.length === this.intervals.length && chordIn.intervals.every((e, i) => this.intervals[i].equals(e));
  }

  clone() {
    return new EnumChord(this);
  }

}

_defineProperty(EnumChord, "indexes", ["MAJ", "MIN", "AUG", "DIM", "SUS2", "SUS", "SUS4", "DOM7", "MAJ7", "MINMAJ7", "MIN7", "AUGMAJ7", "AUG7", "DIMMIN7", "DIM7", "DOM7DIM5"]);

/***/ }),

/***/ "./src/EnumNote.ts":
/*!*************************!*\
  !*** ./src/EnumNote.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEnumNote": () => (/* binding */ isEnumNote),
/* harmony export */   "EnumNote": () => (/* binding */ EnumNote)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var isEnumNote = x => {
  return x instanceof EnumNote || typeof x === "object" && x !== null && x.className === "EnumNote" && _Interval__WEBPACK_IMPORTED_MODULE_1__.DEGREE_TO_OFFSET.indexOf(x.offset) !== -1;
};
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

  static from(that) {
    return this.byOffset(that.offset);
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

  get className() {
    return "EnumNote";
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
/* harmony export */   "DEGREE_TO_OFFSET": () => (/* binding */ DEGREE_TO_OFFSET),
/* harmony export */   "isInterval": () => (/* binding */ isInterval),
/* harmony export */   "isIntervalArray": () => (/* binding */ isIntervalArray),
/* harmony export */   "Interval": () => (/* binding */ Interval),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enum */ "./src/Enum.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var DEGREE_TO_OFFSET = [0, 2, 4, 5, 7, 9, 11];
var isInterval = x => {
  return x instanceof Interval || typeof x === "object" && x !== null && typeof x.degree === "number" && typeof x.onset === "number" && typeof x.octave === "number";
};
var isIntervalArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObjectArray)(x, isInterval);
};

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

  get className() {
    return "EnumIntervalProperty";
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
/* harmony export */   "isNote": () => (/* binding */ isNote),
/* harmony export */   "isNoteArray": () => (/* binding */ isNoteArray),
/* harmony export */   "Note": () => (/* binding */ Note),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
/* harmony import */ var _EnumNote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EnumNote */ "./src/EnumNote.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var isNote = x => {
  return x instanceof Note || typeof x === "object" && x !== null && (0,_EnumNote__WEBPACK_IMPORTED_MODULE_3__.isEnumNote)(x.enumNote) && typeof x.alteration === "number";
};
var isNoteArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObjectArray)(x, isNote);
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

    this.enumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote.C;
    this.alteration = 0;
    this.become(p1, p2);
  }

  become(p1, p2) {
    if (p1 instanceof _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote) {
      this.enumNote = p1;
      if (p2) this.alteration = p2;
    } else if (isNote(p1)) {
      this.enumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote.from(p1.enumNote);
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
    var enumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote[matched[1]];
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

    var enumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote.byOffset(offset);
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
    return Math.round(Math.log(ratio) / Math.log(_Frequency__WEBPACK_IMPORTED_MODULE_2__.default.SEMITONE));
  }

  static offsetToRatio(offset) {
    return Math.pow(_Frequency__WEBPACK_IMPORTED_MODULE_2__.default.SEMITONE, offset);
  }

  add(p1) {
    if (typeof p1 === "number") return this.fromOffset(this.offset + p1);
    if (p1 instanceof Note) return this.become(p1);
    var i;
    if (typeof p1 === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_1__.default(p1);else if (p1 instanceof _Interval__WEBPACK_IMPORTED_MODULE_1__.default) i = p1;
    var newEnumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote.byIndex(this.enumNote.index + i.degree - 1);
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
    var newEnumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote.byIndex(this.enumNote.index - i.degree + 1);
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

  openGuidoEvent(factory, durationIn) {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var close, octaveIn, alteration, accidentals, alterDetune;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              close = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : true;
              octaveIn = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : 3;
              alteration = _this.alteration;
              accidentals = Math.max(-2, Math.min(2, ~~alteration));
              alterDetune = alteration - accidentals;

              if (alterDetune) {
                factory.openRangeTag("alter", 0);
                factory.addTagParameterFloat(alterDetune);
                factory.setParameterName("detune");
              }

              factory.openEvent(_this.enumNote.name());
              factory.setEventAccidentals(_this.alteration);
              factory.setOctave(octaveIn - 3);
              if (durationIn) factory.setDuration(durationIn.numerator, durationIn.denominator);

              if (close) {
                factory.closeEvent();

                if (alterDetune) {
                  factory.closeTag();
                  factory.endTag();
                }
              }

            case 11:
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
              factory.openMusic();
              factory.openVoice();

              _this2.openGuidoEvent(factory);

              factory.closeVoice();
              return _context2.abrupt("return", factory.closeMusic());

            case 5:
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

_defineProperty(Note, "EnumNote", _EnumNote__WEBPACK_IMPORTED_MODULE_3__.EnumNote);

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
  return x instanceof Param || typeof x === "object" && x !== null && typeof x.path === "string" && (typeof x.name === "undefined" || x.name === "string") && typeof x.min === "number" && typeof x.max === "number" && typeof x.step === "number" && typeof x.value === "number" && typeof x.init === "number";
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
/* harmony import */ var _EnumNote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnumNote */ "./src/EnumNote.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
/* harmony import */ var _Frequency__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frequency */ "./src/Frequency.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var isPitch = x => {
  return x instanceof Pitch || typeof x === "object" && x !== null && (0,_EnumNote__WEBPACK_IMPORTED_MODULE_1__.isEnumNote)(x.enumNote) && typeof x.alteration === "number" && typeof x.octave === "number";
};
var isPitchArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isObjectArray)(x, isPitchArray);
};
class Pitch extends _Note__WEBPACK_IMPORTED_MODULE_0__.default {
  static fromFrequency(f) {
    return new Pitch(69 + 12 * (Math.log(f / _Frequency__WEBPACK_IMPORTED_MODULE_3__.default.A440) / Math.log(2)));
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
    } else if (p1 instanceof _EnumNote__WEBPACK_IMPORTED_MODULE_1__.EnumNote) {
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
    return _Frequency__WEBPACK_IMPORTED_MODULE_3__.default.A440 * Math.pow(2, (this.offset - 69) / 12);
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

    this.enumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_1__.EnumNote.from(enumNote);
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

    this.enumNote = _EnumNote__WEBPACK_IMPORTED_MODULE_1__.EnumNote.from(enumNote);
    this.alteration = alteration;
    this.octave = octave;
    return this;
  }

  add(iIn) {
    if (typeof iIn === "number") return this.fromOffset(this.offset + iIn);
    if (iIn instanceof Pitch) return this.mul(1 + iIn.frequency / this.frequency);
    var i;
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_2__.default(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_2__.default) i = iIn;
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
    if (typeof iIn === "string") i = new _Interval__WEBPACK_IMPORTED_MODULE_2__.default(iIn);else if (iIn instanceof _Interval__WEBPACK_IMPORTED_MODULE_2__.default) i = iIn;
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
    var onset = that.offset - this.offset - _Interval__WEBPACK_IMPORTED_MODULE_2__.default.getOffsetFromDegree(degree);
    var octave = 0;
    return new _Interval__WEBPACK_IMPORTED_MODULE_2__.default(degree, onset, octave);
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

  openGuidoEvent(factory, durationIn) {
    var _arguments = arguments,
        _superprop_getOpenGuidoEvent = () => super.openGuidoEvent,
        _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var close;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              close = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : true;

              _superprop_getOpenGuidoEvent().call(_this, factory, durationIn, close, _this.octave);

            case 2:
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
  return x instanceof Scale || typeof x === "object" && x !== null && (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isStringArray)(x.degreeNames) && (0,_Interval__WEBPACK_IMPORTED_MODULE_0__.isIntervalArray)(x.intervals);
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
      this.intervals = _Interval__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(p1.intervals);
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
/* harmony import */ var _EnumChord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EnumChord */ "./src/EnumChord.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _Interval__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Interval */ "./src/Interval.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var isTonalChord = x => {
  return x instanceof TonalChord || typeof x.alteration === "number" && typeof x.degree === "number" && x.chord instanceof _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord;
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
        var p = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.parseRoman)(s);
        if (p !== 0 && p > 7 && p < -7) throw new Error("Roman number too large for degree.");
        this.degree = Math.abs(p);
        s = matched[3];
        this.chord = s.length === 0 ? p > 0 ? _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MAJ : _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MIN : s === "+" ? _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.AUG : _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.DIM;
      } else {
        matched = TonalChord.REGEX2.exec(p1);

        if (matched) {
          var _s = matched[1];
          this.alteration = _s === "#" ? 1 : _s === "b" ? -1 : 0;
          _s = matched[2];
          this.degree = +_s;
          _s = matched[3];
          this.chord = _s.length === 0 ? null : _s === "M" ? _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MAJ : _s === "m" ? _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MAJ : _s === "+" ? _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.AUG : _EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.DIM;
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
    if (this.alteration === 1) chord.base.add(new _Interval__WEBPACK_IMPORTED_MODULE_3__.default("A1"));else if (this.alteration === -1) chord.base.sub(new _Interval__WEBPACK_IMPORTED_MODULE_3__.default("A1"));
    return chord;
  }

  equals(chordIn) {
    return isTonalChord(chordIn) && chordIn.alteration === this.alteration && chordIn.degree === this.degree && chordIn.chord.equals(this.chord);
  }

  toString() {
    var s = "";
    if (this.alteration === 1) s = "#";else if (this.alteration === -1) s = "b";
    if (!this.chord) return s + this.degree;
    s += (0,_utils__WEBPACK_IMPORTED_MODULE_2__.toRoman)(this.degree * (this.chord.equals(_EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MIN) ? -1 : 1));

    if (!this.chord.equals(_EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MAJ) && !this.chord.equals(_EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.MIN)) {
      if (this.chord.equals(_EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.AUG)) s += "+";else if (this.chord.equals(_EnumChord__WEBPACK_IMPORTED_MODULE_1__.EnumChord.AUG)) s += "-";else s += this.chord.name().toLowerCase();
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
  return x instanceof Tonality || typeof x === "object" && x !== null && (0,_Note__WEBPACK_IMPORTED_MODULE_1__.isNote)(x.note) && (0,_Scale__WEBPACK_IMPORTED_MODULE_0__.isScale)(x.scale);
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
      this.note = new _Note__WEBPACK_IMPORTED_MODULE_1__.default(p1.note);
      this.scale = new _Scale__WEBPACK_IMPORTED_MODULE_0__.default(p1.scale);
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
  return x instanceof Velocity || typeof x === "object" && x !== null && typeof x.velocity === "number";
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

    this.become(velocityIn);
  }

  become(velocityIn) {
    if (typeof velocityIn === "undefined") this.velocity = 85;else if (typeof velocityIn === "number") this.velocity = velocityIn;else this.velocity = velocityIn.velocity;
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

_defineProperty(Velocity, "isVelocity", isVelocity);

_defineProperty(Velocity, "EnumVelocity", EnumVelocity);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Velocity);

/***/ }),

/***/ "./src/effect/Automation.ts":
/*!**********************************!*\
  !*** ./src/effect/Automation.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAutomation": () => (/* binding */ isAutomation),
/* harmony export */   "isAutomationArray": () => (/* binding */ isAutomationArray),
/* harmony export */   "Automation": () => (/* binding */ Automation),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AutomationPoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutomationPoint */ "./src/effect/AutomationPoint.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isAutomation = x => {
  return x instanceof Automation || typeof x.path === "string" && (0,_AutomationPoint__WEBPACK_IMPORTED_MODULE_0__.isAutomationPointArray)(x.points);
};
var isAutomationArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isObjectArray)(x, isAutomation);
};
class Automation {
  static fromArray(automationsIn) {
    return automationsIn.map(e => new Automation(e));
  }

  constructor(p1, points) {
    _defineProperty(this, "path", void 0);

    _defineProperty(this, "points", void 0);

    if (typeof p1 === "string") {
      this.path = p1;
      this.points = points ? points.map(e => e.clone()) : [];
    } else {
      this.path = p1.path;
      this.points = _AutomationPoint__WEBPACK_IMPORTED_MODULE_0__.default.fromArray(p1.points);
    }
  }

  getValueAtTime(time) {
    this.sort();
    var prev;
    var next;

    var _iterator = _createForOfIteratorHelper(this.points),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var p = _step.value;
        if (p.offset.compareTo(time) < 0) prev = p;

        if (p.offset.compareTo(time) > 0) {
          next = p;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (!prev) return next.value;
    if (!next) return prev.value;

    if (prev && next) {
      var duration = next.offset.clone().sub(prev.offset);
      var split = time.clone().sub(prev.offset);
      var ratio = split.div(duration);
      return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getValueFromCurve)(prev.value, next.value, ratio, prev.exponent);
    }

    throw new Error("No point in automation: ".concat(this.path));
  }

  addPointAtTime(time) {
    this.points.push(new _AutomationPoint__WEBPACK_IMPORTED_MODULE_0__.default(this.getValueAtTime(time), time, 0));
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

_defineProperty(Automation, "isAutomation", isAutomation);

_defineProperty(Automation, "isAutomationArray", isAutomationArray);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Automation);

/***/ }),

/***/ "./src/effect/AutomationPoint.ts":
/*!***************************************!*\
  !*** ./src/effect/AutomationPoint.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAutomationPoint": () => (/* binding */ isAutomationPoint),
/* harmony export */   "isAutomationPointArray": () => (/* binding */ isAutomationPointArray),
/* harmony export */   "AutomationPoint": () => (/* binding */ AutomationPoint),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Duration */ "./src/Duration.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var isAutomationPoint = x => {
  return x instanceof AutomationPoint || typeof x.value === "number" && (0,_Duration__WEBPACK_IMPORTED_MODULE_0__.isDuration)(x.offset) && typeof x.exponent === "number";
};
var isAutomationPointArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isObjectArray)(x, isAutomationPoint);
};
class AutomationPoint {
  static fromArray(arrayIn) {
    return arrayIn.map(e => new AutomationPoint(e));
  }

  constructor(p1, offset, exponent) {
    _defineProperty(this, "value", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "exponent", void 0);

    this.become(p1, offset, exponent);
  }

  become(p1, offset, exponent) {
    if (typeof p1 === "number") {
      this.value = p1;
      this.offset = offset.clone();
      this.exponent = exponent || 0;
    } else {
      this.value = p1.value;
      this.offset = new _Duration__WEBPACK_IMPORTED_MODULE_0__.default(p1.offset);
      this.exponent = p1.exponent;
    }

    return this;
  }

  clone() {
    return new AutomationPoint(this);
  }

}

_defineProperty(AutomationPoint, "isAutomationPoint", isAutomationPoint);

_defineProperty(AutomationPoint, "isAutomationPointArray", isAutomationPointArray);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutomationPoint);

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

/***/ "./src/track/Segment.ts":
/*!******************************!*\
  !*** ./src/track/Segment.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isSegment": () => (/* binding */ isSegment),
/* harmony export */   "isSegmentArray": () => (/* binding */ isSegmentArray),
/* harmony export */   "Segment": () => (/* binding */ Segment),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tonejs_midi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tonejs/midi */ "./node_modules/@tonejs/midi/dist/Midi.js");
/* harmony import */ var _tonejs_midi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tonejs_midi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TrackChord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TrackChord */ "./src/track/TrackChord.ts");
/* harmony import */ var _effect_Automation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../effect/Automation */ "./src/effect/Automation.ts");
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Duration */ "./src/Duration.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _TimeCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TimeCode */ "./src/TimeCode.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var isSegment = x => {
  return x instanceof Segment || typeof x === "object" && x !== null && (0,_TrackChord__WEBPACK_IMPORTED_MODULE_1__.isTrackChordArray)(x.trackChords) && (0,_effect_Automation__WEBPACK_IMPORTED_MODULE_2__.isAutomationArray)(x.automations) && (0,_Duration__WEBPACK_IMPORTED_MODULE_3__.isDuration)(x.duration);
};
var isSegmentArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isObjectArray)(x, isSegment);
};
class Segment {
  constructor(optionsIn) {
    _defineProperty(this, "trackChords", void 0);

    _defineProperty(this, "automations", void 0);

    _defineProperty(this, "duration", void 0);

    this.trackChords = _TrackChord__WEBPACK_IMPORTED_MODULE_1__.default.fromArray(optionsIn.trackChords);
    this.automations = _effect_Automation__WEBPACK_IMPORTED_MODULE_2__.default.fromArray(optionsIn.automations);
    this.duration = new _Duration__WEBPACK_IMPORTED_MODULE_3__.default(optionsIn.duration);
  }

  getChords() {
    return this.trackChords.map(trackChord => trackChord.getChord());
  }

  setChords(chordsIn, velocitiesIn) {
    chordsIn.forEach((e, i) => {
      var trackChord = this.trackChords[i];
      trackChord.setChord(e, velocitiesIn === null || velocitiesIn === void 0 ? void 0 : velocitiesIn[i]);
    });
  }

  get noteDurations() {
    return this.trackChords.map(note => note.duration);
  }

  set noteDurations(durationsIn) {
    durationsIn.forEach((e, i) => {
      var trackNote = this.trackChords[i];
      if (trackNote) trackNote.duration = e.clone();
    });
  }

  get noteOffsets() {
    return this.trackChords.map(note => note.offset);
  }

  set noteOffsets(offsetsIn) {
    offsetsIn.forEach((e, i) => {
      var trackNote = this.trackChords[i];
      if (trackNote) trackNote.offset = e.clone();
    });
  }

  clone() {
    return new Segment(this);
  }

  toMidi() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _TimeCode__WEBPACK_IMPORTED_MODULE_5__.default(4, 4, 60),
        bpm = _ref.bpm,
        beats = _ref.beats,
        beatDuration = _ref.beatDuration;

    var midi = new _tonejs_midi__WEBPACK_IMPORTED_MODULE_0__.Midi();
    midi.header.setTempo(bpm);
    midi.header.timeSignatures.push({
      ticks: 0,
      measures: 0,
      timeSignature: [beats, beatDuration]
    });
    midi.header.update();
    var track = midi.addTrack();
    this.trackChords.forEach(trackChord => {
      var ticks = trackChord.offset.getTicks(bpm);
      var durationTicks = trackChord.duration.getTicks(bpm);
      trackChord.trackNotes.forEach(trackNote => {
        track.addNote({
          midi: ~~trackNote.pitch.offset,
          ticks,
          durationTicks
        });
      });
    });
    return midi.toArray();
  }

}

_defineProperty(Segment, "isSegment", isSegment);

_defineProperty(Segment, "isSegmentArray", isSegmentArray);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Segment);

/***/ }),

/***/ "./src/track/Sequence.ts":
/*!*******************************!*\
  !*** ./src/track/Sequence.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isSequence": () => (/* binding */ isSequence),
/* harmony export */   "Sequence": () => (/* binding */ Sequence),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tonejs_midi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tonejs/midi */ "./node_modules/@tonejs/midi/dist/Midi.js");
/* harmony import */ var _tonejs_midi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tonejs_midi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Duration */ "./src/Duration.ts");
/* harmony import */ var _TimeCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TimeCode */ "./src/TimeCode.ts");
/* harmony import */ var _TrackChord__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TrackChord */ "./src/track/TrackChord.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var isSequence = _TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordArray;
class Sequence extends Array {
  static from(arrayLike, mapfn, thisArg) {
    if (!((0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordInstanceArrayLike)(arrayLike) || (0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordInstanceIterable)(arrayLike))) throw new TypeError("Items from are not TrackChords");
    if (mapfn) return super.from(arrayLike, mapfn, thisArg);
    return super.from(arrayLike);
  }

  static of() {
    for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    if (!(0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordArray)(items)) throw new TypeError("Items of are not TrackChords");
    return super.of(...items);
  }

  static fromArrays(chordsIn, durationsIn, velocitiesIn, articulationsIn) {
    var seq = new Sequence();
    var o = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(0, 4);

    for (var i = 0; i < Math.max(chordsIn.length, (durationsIn === null || durationsIn === void 0 ? void 0 : durationsIn.length) || 0); i++) {
      var tc = void 0;
      var cIn = chordsIn[i];
      var dIn = durationsIn === null || durationsIn === void 0 ? void 0 : durationsIn[i];
      var vIn = velocitiesIn === null || velocitiesIn === void 0 ? void 0 : velocitiesIn[i];
      var aIn = articulationsIn === null || articulationsIn === void 0 ? void 0 : articulationsIn[i];
      if ((0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChord)(cIn)) tc = new _TrackChord__WEBPACK_IMPORTED_MODULE_3__.default(cIn);else tc = new _TrackChord__WEBPACK_IMPORTED_MODULE_3__.default(cIn, dIn, o.clone(), aIn);
      tc.setVelocities(vIn);
      o.add(tc.duration);
      seq[i] = tc;
    }

    return seq;
  }

  constructor(p1) {
    if (typeof p1 === "number" || typeof p1 === "undefined") {
      super(p1);
    } else {
      for (var _len2 = arguments.length, arrayIn = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        arrayIn[_key2 - 1] = arguments[_key2];
      }

      super(arrayIn.length + 1);
      var trackChords = [p1, ...arrayIn];
      if (isSequence(trackChords)) this.push(...trackChords);
    }
  }

  push() {
    for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }

    if (!(0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordArray)(items)) throw new TypeError("Items to push are not TrackChords");
    return super.push(...items);
  }

  concat() {
    for (var _len4 = arguments.length, items = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      items[_key4] = arguments[_key4];
    }

    if (!(0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordArray)(items)) throw new TypeError("Items to concat are not TrackChords");
    return super.concat(...items);
  }

  unshift() {
    for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      items[_key5] = arguments[_key5];
    }

    if (!(0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChordArray)(items)) throw new TypeError("Items to unshift are not TrackChords");
    return super.unshift(...items);
  }

  fill(value, start, end) {
    if (!(0,_TrackChord__WEBPACK_IMPORTED_MODULE_3__.isTrackChord)(value)) throw new TypeError("Item to fill is not a TrackChord");
    return super.fill(value, start, end);
  }

  toMidi() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _TimeCode__WEBPACK_IMPORTED_MODULE_2__.default(4, 4, 60),
        bpm = _ref.bpm,
        beats = _ref.beats,
        beatDuration = _ref.beatDuration;

    var midi = new _tonejs_midi__WEBPACK_IMPORTED_MODULE_0__.Midi();
    midi.header.setTempo(bpm);
    midi.header.timeSignatures.push({
      ticks: 0,
      measures: 0,
      timeSignature: [beats, beatDuration]
    });
    midi.header.update();
    var track = midi.addTrack();
    this.forEach(trackChord => {
      var ticks = trackChord.offset.getTicks(bpm);
      var durationTicks = trackChord.duration.getTicks(bpm);
      trackChord.trackNotes.forEach(trackNote => {
        track.addNote({
          midi: ~~trackNote.pitch.offset,
          ticks,
          durationTicks
        });
      });
    });
    return midi.toArray();
  }

  toGuidoAR(factory) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iterator, _step, trackChord, _iterator2, _step2, trackNote;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              factory.openMusic();
              factory.openVoice();
              _iterator = _createForOfIteratorHelper(_this);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  trackChord = _step.value;
                  factory.openChord();

                  if (!trackChord.trackNotes.length) {
                    factory.openEvent("_");
                    factory.closeEvent();
                  } else {
                    _iterator2 = _createForOfIteratorHelper(trackChord);

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        trackNote = _step2.value;
                        trackNote.pitch.openGuidoEvent(factory, trackChord.duration);
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }

                  factory.closeChord();
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              factory.closeVoice();
              return _context.abrupt("return", factory.closeMusic());

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }

}

_defineProperty(Sequence, "isSequence", isSequence);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sequence);

/***/ }),

/***/ "./src/track/TrackChord.ts":
/*!*********************************!*\
  !*** ./src/track/TrackChord.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTrackChord": () => (/* binding */ isTrackChord),
/* harmony export */   "isTrackChordArray": () => (/* binding */ isTrackChordArray),
/* harmony export */   "isTrackChordInstanceArrayLike": () => (/* binding */ isTrackChordInstanceArrayLike),
/* harmony export */   "isTrackChordInstanceIterable": () => (/* binding */ isTrackChordInstanceIterable),
/* harmony export */   "TrackChord": () => (/* binding */ TrackChord),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tonejs_midi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tonejs/midi */ "./node_modules/@tonejs/midi/dist/Midi.js");
/* harmony import */ var _tonejs_midi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tonejs_midi__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Duration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Duration */ "./src/Duration.ts");
/* harmony import */ var _Articulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Articulation */ "./src/Articulation.ts");
/* harmony import */ var _TrackNote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TrackNote */ "./src/track/TrackNote.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _TimeCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TimeCode */ "./src/TimeCode.ts");
/* harmony import */ var _Chord__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Chord */ "./src/Chord.ts");
/* harmony import */ var _Velocity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Velocity */ "./src/Velocity.ts");
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Note */ "./src/Note.ts");
var _Symbol$iterator;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var isTrackChord = x => {
  return x instanceof TrackChord || typeof x === "object" && x !== null && (0,_Duration__WEBPACK_IMPORTED_MODULE_1__.isDuration)(x.duration) && (0,_Duration__WEBPACK_IMPORTED_MODULE_1__.isDuration)(x.offset) && (typeof x.trackNotes === "undefined" || (0,_TrackNote__WEBPACK_IMPORTED_MODULE_3__.isTrackNoteArray)(x.trackNotes)) && (typeof x.articulation === "undefined" || (0,_Articulation__WEBPACK_IMPORTED_MODULE_2__.isArticulation)(x.articulation));
};
var isTrackChordArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isObjectArray)(x, isTrackChord);
};
var isTrackChordInstanceArrayLike = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isObjectInstanceArrayLike)(x, TrackChord);
};
var isTrackChordInstanceIterable = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isObjectInstanceIterable)(x, TrackChord);
};
_Symbol$iterator = Symbol.iterator;
class TrackChord {
  static fromArray(arrayIn) {
    return arrayIn.map(e => new TrackChord(e));
  }

  constructor(p1) {
    var durationIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "4n";
    var offsetIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
    var articulationIn = arguments.length > 3 ? arguments[3] : undefined;

    _defineProperty(this, "duration", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "trackNotes", void 0);

    _defineProperty(this, "articulation", void 0);

    this.become(p1, durationIn, offsetIn, articulationIn);
  }

  become(p1) {
    var durationIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "4n";
    var offsetIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
    var articulationIn = arguments.length > 3 ? arguments[3] : undefined;

    if (isTrackChord(p1)) {
      this.duration = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(p1.duration);
      this.offset = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(p1.offset);
      if (p1.trackNotes) this.trackNotes = _TrackNote__WEBPACK_IMPORTED_MODULE_3__.default.fromArray(p1.trackNotes);
      if (p1.articulation) this.articulation = new _Articulation__WEBPACK_IMPORTED_MODULE_2__.default(p1.articulation);
    } else {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_4__.isNumberArray)(p1) || (0,_utils__WEBPACK_IMPORTED_MODULE_4__.isStringArray)(p1) || (0,_Note__WEBPACK_IMPORTED_MODULE_8__.isNoteArray)(p1) || (0,_TrackNote__WEBPACK_IMPORTED_MODULE_3__.isTrackNoteArray)(p1)) this.trackNotes = _TrackNote__WEBPACK_IMPORTED_MODULE_3__.default.fromArray(p1);else if ((0,_Chord__WEBPACK_IMPORTED_MODULE_6__.isChord)(p1)) this.trackNotes = _TrackNote__WEBPACK_IMPORTED_MODULE_3__.default.fromArray(new _Chord__WEBPACK_IMPORTED_MODULE_6__.default(p1).notes);else this.trackNotes = _TrackNote__WEBPACK_IMPORTED_MODULE_3__.default.fromArray([p1]);
      if ((0,_Duration__WEBPACK_IMPORTED_MODULE_1__.isDuration)(durationIn)) this.duration = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(durationIn);else if ((0,_Duration__WEBPACK_IMPORTED_MODULE_1__.isDurationAbbreviation)(durationIn)) this.duration = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(durationIn);else if (typeof durationIn === "number") this.duration = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(durationIn, 4);else this.duration = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(durationIn[0], durationIn[1]);
      if ((0,_Duration__WEBPACK_IMPORTED_MODULE_1__.isDuration)(offsetIn)) this.offset = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(offsetIn);else if ((0,_Duration__WEBPACK_IMPORTED_MODULE_1__.isDurationAbbreviation)(offsetIn)) this.offset = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(offsetIn);else if (typeof offsetIn === "number") this.offset = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(offsetIn, 4);else this.offset = new _Duration__WEBPACK_IMPORTED_MODULE_1__.default(offsetIn[0], offsetIn[1]);
      this.articulation = new _Articulation__WEBPACK_IMPORTED_MODULE_2__.default(articulationIn);
    }

    return this;
  }

  getChord() {
    if (this.trackNotes.length === 0) return null;
    return new _Chord__WEBPACK_IMPORTED_MODULE_6__.default(...this.trackNotes.map(tn => tn.pitch));
  }

  setChord(chordIn, velocitiesIn) {
    if (chordIn) {
      this.trackNotes = undefined;
      return;
    }

    this.trackNotes = chordIn.notes.map((n, i) => {
      return new _TrackNote__WEBPACK_IMPORTED_MODULE_3__.default(n, velocitiesIn === null || velocitiesIn === void 0 ? void 0 : velocitiesIn[i]);
    });
  }

  setVelocities(velocitiesIn) {
    this.trackNotes.forEach((tn, i) => {
      var v = Array.isArray(velocitiesIn) ? velocitiesIn[i] : velocitiesIn;
      tn.velocity = typeof v === "number" ? new _Velocity__WEBPACK_IMPORTED_MODULE_7__.default(v) : new _Velocity__WEBPACK_IMPORTED_MODULE_7__.default(v);
    });
  }

  clone() {
    return new TrackChord(this);
  }

  toMidi() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _TimeCode__WEBPACK_IMPORTED_MODULE_5__.default(4, 4, 60),
        bpm = _ref.bpm,
        beats = _ref.beats,
        beatDuration = _ref.beatDuration;

    var midi = new _tonejs_midi__WEBPACK_IMPORTED_MODULE_0__.Midi();
    midi.header.setTempo(bpm);
    midi.header.timeSignatures.push({
      ticks: 0,
      measures: 0,
      timeSignature: [beats, beatDuration]
    });
    midi.header.update();
    var track = midi.addTrack();
    var ticks = this.offset.getTicks(bpm);
    var durationTicks = this.duration.getTicks(bpm);
    this.trackNotes.forEach(trackNote => {
      track.addNote({
        midi: ~~trackNote.pitch.offset,
        ticks,
        durationTicks
      });
    });
    return midi.toArray();
  }

  [_Symbol$iterator]() {
    var _this = this;

    return /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iterator, _step, trackNote;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(_this.trackNotes);
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }

              trackNote = _step.value;
              _context.next = 7;
              return trackNote;

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

  toString() {
    return "".concat(this.offset, " -> ").concat(this.trackNotes ? this.trackNotes.toString() : "*", " ").concat(this.duration);
  }

}

_defineProperty(TrackChord, "isTrackChord", isTrackChord);

_defineProperty(TrackChord, "isTrackChordArray", isTrackChordArray);

_defineProperty(TrackChord, "isTrackChordInstanceArrayLike", isTrackChordInstanceArrayLike);

_defineProperty(TrackChord, "isTrackChordInstanceIterable", isTrackChordInstanceIterable);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrackChord);

/***/ }),

/***/ "./src/track/TrackNote.ts":
/*!********************************!*\
  !*** ./src/track/TrackNote.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isTrackNote": () => (/* binding */ isTrackNote),
/* harmony export */   "isTrackNoteArray": () => (/* binding */ isTrackNoteArray),
/* harmony export */   "default": () => (/* binding */ TrackNote)
/* harmony export */ });
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Note */ "./src/Note.ts");
/* harmony import */ var _Pitch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pitch */ "./src/Pitch.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _Velocity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Velocity */ "./src/Velocity.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var isTrackNote = x => {
  return x instanceof TrackNote || typeof x === "object" && x !== null && (0,_Pitch__WEBPACK_IMPORTED_MODULE_1__.isPitch)(x.pitch) && (0,_Velocity__WEBPACK_IMPORTED_MODULE_3__.isVelocity)(x.velocity);
};
var isTrackNoteArray = x => {
  return (0,_utils__WEBPACK_IMPORTED_MODULE_2__.isObjectArray)(x, isTrackNote);
};
class TrackNote {
  static fromArray(notesIn) {
    var velocitiesIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return notesIn.map((e, i) => {
      var velocity = velocitiesIn[i];
      if (isTrackNote(e)) return new TrackNote(e);
      return new TrackNote(e, velocity);
    });
  }

  constructor(p1, velocityIn) {
    _defineProperty(this, "pitch", void 0);

    _defineProperty(this, "velocity", void 0);

    this.become(p1, velocityIn);
  }

  become(p1, velocityIn) {
    if (isTrackNote(p1)) {
      var pitch = p1.pitch,
          velocity = p1.velocity;
      this.pitch = new _Pitch__WEBPACK_IMPORTED_MODULE_1__.default(pitch);
      this.velocity = new _Velocity__WEBPACK_IMPORTED_MODULE_3__.default(velocity);
    } else {
      if (typeof p1 === "number") this.pitch = new _Pitch__WEBPACK_IMPORTED_MODULE_1__.default(p1);else if (typeof p1 === "string") this.pitch = new _Pitch__WEBPACK_IMPORTED_MODULE_1__.default(p1);else if ((0,_Note__WEBPACK_IMPORTED_MODULE_0__.isNote)(p1)) this.pitch = new _Pitch__WEBPACK_IMPORTED_MODULE_1__.default(p1);
      if (velocityIn instanceof _Velocity__WEBPACK_IMPORTED_MODULE_3__.default) this.velocity = velocityIn.clone();else if (typeof velocityIn === "number") this.velocity = new _Velocity__WEBPACK_IMPORTED_MODULE_3__.default(velocityIn);else this.velocity = new _Velocity__WEBPACK_IMPORTED_MODULE_3__.default(85);
    }

    return this;
  }

  clone() {
    return new TrackNote(this);
  }

}

_defineProperty(TrackNote, "isTrackNote", isTrackNote);

_defineProperty(TrackNote, "isTrackNoteArray", isTrackNoteArray);

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
/* harmony export */   "isObjectArray": () => (/* binding */ isObjectArray),
/* harmony export */   "isObjectInstanceArray": () => (/* binding */ isObjectInstanceArray),
/* harmony export */   "isObjectArrayLike": () => (/* binding */ isObjectArrayLike),
/* harmony export */   "isObjectInstanceArrayLike": () => (/* binding */ isObjectInstanceArrayLike),
/* harmony export */   "isObjectIterable": () => (/* binding */ isObjectIterable),
/* harmony export */   "isObjectInstanceIterable": () => (/* binding */ isObjectInstanceIterable),
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
var isObjectArray = (x, typeGuard) => {
  return Array.isArray(x) && x.every(typeGuard);
};
var isObjectInstanceArray = (x, Type) => {
  return Array.isArray(x) && x.every(e => e instanceof Type);
};
var isObjectArrayLike = (x, typeGuard) => {
  if (x === null || typeof x !== "object" || typeof x.length !== "number") return false;

  for (var i = 0; i < x.length; i++) {
    if (typeGuard(x[i])) continue;else return false;
  }

  return true;
};
var isObjectInstanceArrayLike = (x, Type) => {
  if (x === null || typeof x !== "object" || typeof x.length !== "number") return false;

  for (var i = 0; i < x.length; i++) {
    if (x[i] instanceof Type) continue;else return false;
  }

  return true;
};
var isObjectIterable = (x, typeGuard) => {
  if (typeof x !== "object" || x === null) return false;
  if (typeof x[Symbol.iterator] !== "function") return false;
  return Array.from(x).every(typeGuard);
};
var isObjectInstanceIterable = (x, Type) => {
  if (typeof x !== "object" || x === null) return false;
  if (typeof x[Symbol.iterator] !== "function") return false;
  return Array.from(x).every(e => e instanceof Type);
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
};
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
};
var permute = (array, random) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = random ? random.randint(0, i + 1) : ~~(Math.random() * (i + 1));
    var _ref3 = [array[j], array[i]];
    array[i] = _ref3[0];
    array[j] = _ref3[1];
  }

  return array;
};
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
};
var randomCombination = (array, random) => {
  return array.filter(() => random ? !!random.randint(0, 1) : Math.random() < 0.5);
};

/***/ }),

/***/ "./node_modules/midi-file/index.js":
/*!*****************************************!*\
  !*** ./node_modules/midi-file/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.parseMidi = __webpack_require__(/*! ./lib/midi-parser */ "./node_modules/midi-file/lib/midi-parser.js")
exports.writeMidi = __webpack_require__(/*! ./lib/midi-writer */ "./node_modules/midi-file/lib/midi-writer.js")


/***/ }),

/***/ "./node_modules/midi-file/lib/midi-parser.js":
/*!***************************************************!*\
  !*** ./node_modules/midi-file/lib/midi-parser.js ***!
  \***************************************************/
/***/ ((module) => {

// data can be any array-like object.  It just needs to support .length, .slice, and an element getter []

function parseMidi(data) {
  var p = new Parser(data)

  var headerChunk = p.readChunk()
  if (headerChunk.id != 'MThd')
    throw "Bad MIDI file.  Expected 'MHdr', got: '" + headerChunk.id + "'"
  var header = parseHeader(headerChunk.data)

  var tracks = []
  for (var i=0; !p.eof() && i < header.numTracks; i++) {
    var trackChunk = p.readChunk()
    if (trackChunk.id != 'MTrk')
      throw "Bad MIDI file.  Expected 'MTrk', got: '" + trackChunk.id + "'"
    var track = parseTrack(trackChunk.data)
    tracks.push(track)
  }

  return {
    header: header,
    tracks: tracks
  }
}


function parseHeader(data) {
  var p = new Parser(data)

  var format = p.readUInt16()
  var numTracks = p.readUInt16()

  var result = {
    format: format,
    numTracks: numTracks
  }

  var timeDivision = p.readUInt16()
  if (timeDivision & 0x8000) {
    result.framesPerSecond = 0x100 - (timeDivision >> 8)
    result.ticksPerFrame = timeDivision & 0xFF
  } else {
    result.ticksPerBeat = timeDivision
  }

  return result
}

function parseTrack(data) {
  var p = new Parser(data)

  var events = []
  while (!p.eof()) {
    var event = readEvent()
    events.push(event)
  }

  return events

  var lastEventTypeByte = null

  function readEvent() {
    var event = {}
    event.deltaTime = p.readVarInt()

    var eventTypeByte = p.readUInt8()

    if ((eventTypeByte & 0xf0) === 0xf0) {
      // system / meta event
      if (eventTypeByte === 0xff) {
        // meta event
        event.meta = true
        var metatypeByte = p.readUInt8()
        var length = p.readVarInt()
        switch (metatypeByte) {
          case 0x00:
            event.type = 'sequenceNumber'
            if (length !== 2) throw "Expected length for sequenceNumber event is 2, got " + length
            event.number = p.readUInt16()
            return event
          case 0x01:
            event.type = 'text'
            event.text = p.readString(length)
            return event
          case 0x02:
            event.type = 'copyrightNotice'
            event.text = p.readString(length)
            return event
          case 0x03:
            event.type = 'trackName'
            event.text = p.readString(length)
            return event
          case 0x04:
            event.type = 'instrumentName'
            event.text = p.readString(length)
            return event
          case 0x05:
            event.type = 'lyrics'
            event.text = p.readString(length)
            return event
          case 0x06:
            event.type = 'marker'
            event.text = p.readString(length)
            return event
          case 0x07:
            event.type = 'cuePoint'
            event.text = p.readString(length)
            return event
          case 0x20:
            event.type = 'channelPrefix'
            if (length != 1) throw "Expected length for channelPrefix event is 1, got " + length
            event.channel = p.readUInt8()
            return event
          case 0x21:
            event.type = 'portPrefix'
            if (length != 1) throw "Expected length for portPrefix event is 1, got " + length
            event.port = p.readUInt8()
            return event
          case 0x2f:
            event.type = 'endOfTrack'
            if (length != 0) throw "Expected length for endOfTrack event is 0, got " + length
            return event
          case 0x51:
            event.type = 'setTempo';
            if (length != 3) throw "Expected length for setTempo event is 3, got " + length
            event.microsecondsPerBeat = p.readUInt24()
            return event
          case 0x54:
            event.type = 'smpteOffset';
            if (length != 5) throw "Expected length for smpteOffset event is 5, got " + length
            var hourByte = p.readUInt8()
            var FRAME_RATES = { 0x00: 24, 0x20: 25, 0x40: 29, 0x60: 30 }
            event.frameRate = FRAME_RATES[hourByte & 0x60]
            event.hour = hourByte & 0x1f
            event.min = p.readUInt8()
            event.sec = p.readUInt8()
            event.frame = p.readUInt8()
            event.subFrame = p.readUInt8()
            return event
          case 0x58:
            event.type = 'timeSignature'
            if (length != 4) throw "Expected length for timeSignature event is 4, got " + length
            event.numerator = p.readUInt8()
            event.denominator = (1 << p.readUInt8())
            event.metronome = p.readUInt8()
            event.thirtyseconds = p.readUInt8()
            return event
          case 0x59:
            event.type = 'keySignature'
            if (length != 2) throw "Expected length for keySignature event is 2, got " + length
            event.key = p.readInt8()
            event.scale = p.readUInt8()
            return event
          case 0x7f:
            event.type = 'sequencerSpecific'
            event.data = p.readBytes(length)
            return event
          default:
            event.type = 'unknownMeta'
            event.data = p.readBytes(length)
            event.metatypeByte = metatypeByte
            return event
        }
      } else if (eventTypeByte == 0xf0) {
        event.type = 'sysEx'
        var length = p.readVarInt()
        event.data = p.readBytes(length)
        return event
      } else if (eventTypeByte == 0xf7) {
        event.type = 'endSysEx'
        var length = p.readVarInt()
        event.data = p.readBytes(length)
        return event
      } else {
        throw "Unrecognised MIDI event type byte: " + eventTypeByte
      }
    } else {
      // channel event
      var param1
      if ((eventTypeByte & 0x80) === 0) {
        // running status - reuse lastEventTypeByte as the event type.
        // eventTypeByte is actually the first parameter
        if (lastEventTypeByte === null)
          throw "Running status byte encountered before status byte"
        param1 = eventTypeByte
        eventTypeByte = lastEventTypeByte
        event.running = true
      } else {
        param1 = p.readUInt8()
        lastEventTypeByte = eventTypeByte
      }
      var eventType = eventTypeByte >> 4
      event.channel = eventTypeByte & 0x0f
      switch (eventType) {
        case 0x08:
          event.type = 'noteOff'
          event.noteNumber = param1
          event.velocity = p.readUInt8()
          return event
        case 0x09:
          var velocity = p.readUInt8()
          event.type = velocity === 0 ? 'noteOff' : 'noteOn'
          event.noteNumber = param1
          event.velocity = velocity
          if (velocity === 0) event.byte9 = true
          return event
        case 0x0a:
          event.type = 'noteAftertouch'
          event.noteNumber = param1
          event.amount = p.readUInt8()
          return event
        case 0x0b:
          event.type = 'controller'
          event.controllerType = param1
          event.value = p.readUInt8()
          return event
        case 0x0c:
          event.type = 'programChange'
          event.programNumber = param1
          return event
        case 0x0d:
          event.type = 'channelAftertouch'
          event.amount = param1
          return event
        case 0x0e:
          event.type = 'pitchBend'
          event.value = (param1 + (p.readUInt8() << 7)) - 0x2000
          return event
        default:
          throw "Unrecognised MIDI event type: " + eventType
      }
    }
  }
}

function Parser(data) {
  this.buffer = data
  this.bufferLen = this.buffer.length
  this.pos = 0
}

Parser.prototype.eof = function() {
  return this.pos >= this.bufferLen
}

Parser.prototype.readUInt8 = function() {
  var result = this.buffer[this.pos]
  this.pos += 1
  return result
}

Parser.prototype.readInt8 = function() {
  var u = this.readUInt8()
  if (u & 0x80)
    return u - 0x100
  else
    return u
}

Parser.prototype.readUInt16 = function() {
  var b0 = this.readUInt8(),
      b1 = this.readUInt8()

    return (b0 << 8) + b1
}

Parser.prototype.readInt16 = function() {
  var u = this.readUInt16()
  if (u & 0x8000)
    return u - 0x10000
  else
    return u
}

Parser.prototype.readUInt24 = function() {
  var b0 = this.readUInt8(),
      b1 = this.readUInt8(),
      b2 = this.readUInt8()

    return (b0 << 16) + (b1 << 8) + b2
}

Parser.prototype.readInt24 = function() {
  var u = this.readUInt24()
  if (u & 0x800000)
    return u - 0x1000000
  else
    return u
}

Parser.prototype.readUInt32 = function() {
  var b0 = this.readUInt8(),
      b1 = this.readUInt8(),
      b2 = this.readUInt8(),
      b3 = this.readUInt8()

    return (b0 << 24) + (b1 << 16) + (b2 << 8) + b3
}

Parser.prototype.readBytes = function(len) {
  var bytes = this.buffer.slice(this.pos, this.pos + len)
  this.pos += len
  return bytes
}

Parser.prototype.readString = function(len) {
  var bytes = this.readBytes(len)
  return String.fromCharCode.apply(null, bytes)
}

Parser.prototype.readVarInt = function() {
  var result = 0
  while (!this.eof()) {
    var b = this.readUInt8()
    if (b & 0x80) {
      result += (b & 0x7f)
      result <<= 7
    } else {
      // b is last byte
      return result + b
    }
  }
  // premature eof
  return result
}

Parser.prototype.readChunk = function() {
  var id = this.readString(4)
  var length = this.readUInt32()
  var data = this.readBytes(length)
  return {
    id: id,
    length: length,
    data: data
  }
}

module.exports = parseMidi


/***/ }),

/***/ "./node_modules/midi-file/lib/midi-writer.js":
/*!***************************************************!*\
  !*** ./node_modules/midi-file/lib/midi-writer.js ***!
  \***************************************************/
/***/ ((module) => {

// data should be the same type of format returned by parseMidi
// for maximum compatibililty, returns an array of byte values, suitable for conversion to Buffer, Uint8Array, etc.

// opts:
// - running              reuse previous eventTypeByte when possible, to compress file
// - useByte9ForNoteOff   use 0x09 for noteOff when velocity is zero

function writeMidi(data, opts) {
  if (typeof data !== 'object')
    throw 'Invalid MIDI data'

  opts = opts || {}

  var header = data.header || {}
  var tracks = data.tracks || []
  var i, len = tracks.length

  var w = new Writer()
  writeHeader(w, header, len)

  for (i=0; i < len; i++) {
    writeTrack(w, tracks[i], opts)
  }

  return w.buffer
}

function writeHeader(w, header, numTracks) {
  var format = header.format == null ? 1 : header.format

  var timeDivision = 128
  if (header.timeDivision) {
    timeDivision = header.timeDivision
  } else if (header.ticksPerFrame && header.framesPerSecond) {
    timeDivision = (-(header.framesPerSecond & 0xFF) << 8) | (header.ticksPerFrame & 0xFF)
  } else if (header.ticksPerBeat) {
    timeDivision = header.ticksPerBeat & 0x7FFF
  }

  var h = new Writer()
  h.writeUInt16(format)
  h.writeUInt16(numTracks)
  h.writeUInt16(timeDivision)

  w.writeChunk('MThd', h.buffer)
}

function writeTrack(w, track, opts) {
  var t = new Writer()
  var i, len = track.length
  var eventTypeByte = null
  for (i=0; i < len; i++) {
    // Reuse last eventTypeByte when opts.running is set, or event.running is explicitly set on it.
    // parseMidi will set event.running for each event, so that we can get an exact copy by default.
    // Explicitly set opts.running to false, to override event.running and never reuse last eventTypeByte.
    if (opts.running === false || !opts.running && !track[i].running) eventTypeByte = null

    eventTypeByte = writeEvent(t, track[i], eventTypeByte, opts.useByte9ForNoteOff)
  }
  w.writeChunk('MTrk', t.buffer)
}

function writeEvent(w, event, lastEventTypeByte, useByte9ForNoteOff) {
  var type = event.type
  var deltaTime = event.deltaTime
  var text = event.text || ''
  var data = event.data || []
  var eventTypeByte = null
  w.writeVarInt(deltaTime)

  switch (type) {
    // meta events
    case 'sequenceNumber':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x00)
      w.writeVarInt(2)
      w.writeUInt16(event.number)
      break;

    case 'text':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x01)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'copyrightNotice':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x02)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'trackName':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x03)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'instrumentName':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x04)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'lyrics':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x05)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'marker':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x06)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'cuePoint':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x07)
      w.writeVarInt(text.length)
      w.writeString(text)
      break;

    case 'channelPrefix':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x20)
      w.writeVarInt(1)
      w.writeUInt8(event.channel)
      break;

    case 'portPrefix':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x21)
      w.writeVarInt(1)
      w.writeUInt8(event.port)
      break;

    case 'endOfTrack':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x2F)
      w.writeVarInt(0)
      break;

    case 'setTempo':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x51)
      w.writeVarInt(3)
      w.writeUInt24(event.microsecondsPerBeat)
      break;

    case 'smpteOffset':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x54)
      w.writeVarInt(5)
      var FRAME_RATES = { 24: 0x00, 25: 0x20, 29: 0x40, 30: 0x60 }
      var hourByte = (event.hour & 0x1F) | FRAME_RATES[event.frameRate]
      w.writeUInt8(hourByte)
      w.writeUInt8(event.min)
      w.writeUInt8(event.sec)
      w.writeUInt8(event.frame)
      w.writeUInt8(event.subFrame)
      break;

    case 'timeSignature':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x58)
      w.writeVarInt(4)
      w.writeUInt8(event.numerator)
      var denominator = Math.floor((Math.log(event.denominator) / Math.LN2)) & 0xFF
      w.writeUInt8(denominator)
      w.writeUInt8(event.metronome)
      w.writeUInt8(event.thirtyseconds || 8)
      break;

    case 'keySignature':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x59)
      w.writeVarInt(2)
      w.writeInt8(event.key)
      w.writeUInt8(event.scale)
      break;

    case 'sequencerSpecific':
      w.writeUInt8(0xFF)
      w.writeUInt8(0x7F)
      w.writeVarInt(data.length)
      w.writeBytes(data)
      break;

    case 'unknownMeta':
      if (event.metatypeByte != null) {
        w.writeUInt8(0xFF)
        w.writeUInt8(event.metatypeByte)
        w.writeVarInt(data.length)
        w.writeBytes(data)
      }
      break;

    // system-exclusive
    case 'sysEx':
      w.writeUInt8(0xF0)
      w.writeVarInt(data.length)
      w.writeBytes(data)
      break;

    case 'endSysEx':
      w.writeUInt8(0xF7)
      w.writeVarInt(data.length)
      w.writeBytes(data)
      break;

    // channel events
    case 'noteOff':
      // Use 0x90 when opts.useByte9ForNoteOff is set and velocity is zero, or when event.byte9 is explicitly set on it.
      // parseMidi will set event.byte9 for each event, so that we can get an exact copy by default.
      // Explicitly set opts.useByte9ForNoteOff to false, to override event.byte9 and always use 0x80 for noteOff events.
      var noteByte = ((useByte9ForNoteOff !== false && event.byte9) || (useByte9ForNoteOff && event.velocity == 0)) ? 0x90 : 0x80

      eventTypeByte = noteByte | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      w.writeUInt8(event.noteNumber)
      w.writeUInt8(event.velocity)
      break;

    case 'noteOn':
      eventTypeByte = 0x90 | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      w.writeUInt8(event.noteNumber)
      w.writeUInt8(event.velocity)
      break;

    case 'noteAftertouch':
      eventTypeByte = 0xA0 | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      w.writeUInt8(event.noteNumber)
      w.writeUInt8(event.amount)
      break;

    case 'controller':
      eventTypeByte = 0xB0 | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      w.writeUInt8(event.controllerType)
      w.writeUInt8(event.value)
      break;

    case 'programChange':
      eventTypeByte = 0xC0 | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      w.writeUInt8(event.programNumber)
      break;

    case 'channelAftertouch':
      eventTypeByte = 0xD0 | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      w.writeUInt8(event.amount)
      break;

    case 'pitchBend':
      eventTypeByte = 0xE0 | event.channel
      if (eventTypeByte !== lastEventTypeByte) w.writeUInt8(eventTypeByte)
      var value14 = 0x2000 + event.value
      var lsb14 = (value14 & 0x7F)
      var msb14 = (value14 >> 7) & 0x7F
      w.writeUInt8(lsb14)
      w.writeUInt8(msb14)
    break;

    default:
      throw 'Unrecognized event type: ' + type
  }
  return eventTypeByte
}


function Writer() {
  this.buffer = []
}

Writer.prototype.writeUInt8 = function(v) {
  this.buffer.push(v & 0xFF)
}
Writer.prototype.writeInt8 = Writer.prototype.writeUInt8

Writer.prototype.writeUInt16 = function(v) {
  var b0 = (v >> 8) & 0xFF,
      b1 = v & 0xFF

  this.writeUInt8(b0)
  this.writeUInt8(b1)
}
Writer.prototype.writeInt16 = Writer.prototype.writeUInt16

Writer.prototype.writeUInt24 = function(v) {
  var b0 = (v >> 16) & 0xFF,
      b1 = (v >> 8) & 0xFF,
      b2 = v & 0xFF

  this.writeUInt8(b0)
  this.writeUInt8(b1)
  this.writeUInt8(b2)
}
Writer.prototype.writeInt24 = Writer.prototype.writeUInt24

Writer.prototype.writeUInt32 = function(v) {
  var b0 = (v >> 24) & 0xFF,
      b1 = (v >> 16) & 0xFF,
      b2 = (v >> 8) & 0xFF,
      b3 = v & 0xFF

  this.writeUInt8(b0)
  this.writeUInt8(b1)
  this.writeUInt8(b2)
  this.writeUInt8(b3)
}
Writer.prototype.writeInt32 = Writer.prototype.writeUInt32


Writer.prototype.writeBytes = function(arr) {
  this.buffer = this.buffer.concat(Array.prototype.slice.call(arr, 0))
}

Writer.prototype.writeString = function(str) {
  var i, len = str.length, arr = []
  for (i=0; i < len; i++) {
    arr.push(str.codePointAt(i))
  }
  this.writeBytes(arr)
}

Writer.prototype.writeVarInt = function(v) {
  if (v < 0) throw "Cannot write negative variable-length integer"

  if (v <= 0x7F) {
    this.writeUInt8(v)
  } else {
    var i = v
    var bytes = []
    bytes.push(i & 0x7F)
    i >>= 7
    while (i) {
      var b = i & 0x7F | 0x80
      bytes.push(b)
      i >>= 7
    }
    this.writeBytes(bytes.reverse())
  }
}

Writer.prototype.writeChunk = function(id, data) {
  this.writeString(id)
  this.writeUInt32(data.length)
  this.writeBytes(data)
}

module.exports = writeMidi


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
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/amd define */
/******/ (() => {
/******/ 	__webpack_require__.amdD = function () {
/******/ 		throw new Error('define cannot be used indirect');
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/amd options */
/******/ (() => {
/******/ 	__webpack_require__.amdO = {};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
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
/******/ /* webpack/runtime/node module decorator */
/******/ (() => {
/******/ 	__webpack_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ })();
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
/* harmony export */   "TrackNote": () => (/* reexport safe */ _track_TrackNote__WEBPACK_IMPORTED_MODULE_19__.default),
/* harmony export */   "TrackChord": () => (/* reexport safe */ _track_TrackChord__WEBPACK_IMPORTED_MODULE_18__.default),
/* harmony export */   "Sequence": () => (/* reexport safe */ _track_Sequence__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "Segment": () => (/* reexport safe */ _track_Segment__WEBPACK_IMPORTED_MODULE_16__.default),
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
/* harmony import */ var _track_Segment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./track/Segment */ "./src/track/Segment.ts");
/* harmony import */ var _track_Sequence__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./track/Sequence */ "./src/track/Sequence.ts");
/* harmony import */ var _track_TrackChord__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./track/TrackChord */ "./src/track/TrackChord.ts");
/* harmony import */ var _track_TrackNote__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./track/TrackNote */ "./src/track/TrackNote.ts");




















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

var __webpack_exports__Articulation = __webpack_exports__.Articulation;
var __webpack_exports__Chord = __webpack_exports__.Chord;
var __webpack_exports__Color = __webpack_exports__.Color;
var __webpack_exports__Duration = __webpack_exports__.Duration;
var __webpack_exports__Frequency = __webpack_exports__.Frequency;
var __webpack_exports__Interval = __webpack_exports__.Interval;
var __webpack_exports__Note = __webpack_exports__.Note;
var __webpack_exports__Param = __webpack_exports__.Param;
var __webpack_exports__Pitch = __webpack_exports__.Pitch;
var __webpack_exports__Random = __webpack_exports__.Random;
var __webpack_exports__Scale = __webpack_exports__.Scale;
var __webpack_exports__Segment = __webpack_exports__.Segment;
var __webpack_exports__Sequence = __webpack_exports__.Sequence;
var __webpack_exports__TimeCode = __webpack_exports__.TimeCode;
var __webpack_exports__TonalChord = __webpack_exports__.TonalChord;
var __webpack_exports__Tonality = __webpack_exports__.Tonality;
var __webpack_exports__TrackChord = __webpack_exports__.TrackChord;
var __webpack_exports__TrackNote = __webpack_exports__.TrackNote;
var __webpack_exports__Utils = __webpack_exports__.Utils;
var __webpack_exports__Velocity = __webpack_exports__.Velocity;
export { __webpack_exports__Articulation as Articulation, __webpack_exports__Chord as Chord, __webpack_exports__Color as Color, __webpack_exports__Duration as Duration, __webpack_exports__Frequency as Frequency, __webpack_exports__Interval as Interval, __webpack_exports__Note as Note, __webpack_exports__Param as Param, __webpack_exports__Pitch as Pitch, __webpack_exports__Random as Random, __webpack_exports__Scale as Scale, __webpack_exports__Segment as Segment, __webpack_exports__Sequence as Sequence, __webpack_exports__TimeCode as TimeCode, __webpack_exports__TonalChord as TonalChord, __webpack_exports__Tonality as Tonality, __webpack_exports__TrackChord as TrackChord, __webpack_exports__TrackNote as TrackNote, __webpack_exports__Utils as Utils, __webpack_exports__Velocity as Velocity };

//# sourceMappingURL=index.js.map