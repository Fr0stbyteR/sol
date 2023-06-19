// Generated by dts-bundle-generator v6.12.0

import { GuidoFactoryAdapter } from '@shren/guidolib';

export interface IArticulation {
	name?: string;
	velocity: number;
	length: number;
}
declare class EnumArticulation {
	static get STACCATISSIMO(): Articulation;
	static get STACCATO(): Articulation;
	static get MEZZO_STACCATO(): Articulation;
	static get LEGATO(): Articulation;
	static get TENUTO(): Articulation;
	static get SOSTENUTO(): Articulation;
	static get ACCENT(): Articulation;
	static get MARCATO(): Articulation;
	static get PIZZICATO(): Articulation;
	static get MUTED(): Articulation;
}
export declare class Articulation implements IArticulation, IClonable<Articulation> {
	static readonly isArticulation: (x: any) => x is IArticulation;
	static readonly EnumArticulation: typeof EnumArticulation;
	name?: string;
	velocity: number;
	length: number;
	constructor(articulationIn: IArticulation);
	constructor(name?: string, velocityIn?: number, lengthIn?: number);
	become(p1?: IArticulation | string, velocityIn?: number, lengthIn?: number): this;
	clone(): Articulation;
	toString(): string;
}
declare class Enum {
	protected static indexes: string[];
	static values<T extends Enum>(): T[];
	static valueOf<T extends Enum>(key: string): T;
	protected constructor();
	get className(): string;
	name(): string;
	ordinal(): number;
	toString(): string;
}
export interface IInterval {
	degree: number;
	onset: number;
	octave: number;
}
export declare type TIntervalOffset = 0 | 2 | 4 | 5 | 7 | 9 | 11;
export declare type TIntervalProperty = "P" | "M" | "m" | "A" | "d";
export declare type TIntervalPropertyValue = "PERFECT" | "MAJOR" | "MINOR" | "AUGMENTED" | "DIMINISHED";
declare class EnumIntervalProperty extends Enum {
	protected static indexes: string[];
	private static abbMap;
	static get PERFECT(): EnumIntervalProperty;
	static get MAJOR(): EnumIntervalProperty;
	static get MINOR(): EnumIntervalProperty;
	static get AUGMENTED(): EnumIntervalProperty;
	static get DIMINISHED(): EnumIntervalProperty;
	static byAbb(abbIn: string): EnumIntervalProperty;
	abb: TIntervalProperty;
	private constructor();
	get className(): "EnumIntervalProperty";
	name(): TIntervalPropertyValue;
	toString(): TIntervalPropertyValue;
	equals(propertyIn: object): boolean;
}
export declare class Interval implements IInterval, IClonable<Interval>, IComputable<Interval> {
	private static readonly REGEX;
	static readonly DEGREE_TO_OFFSET: number[];
	static readonly isInterval: (x: any) => x is IInterval;
	static readonly isIntervalArray: (x: any) => x is IInterval[];
	static readonly EnumIntervalProperty: typeof EnumIntervalProperty;
	degree: number;
	onset: number;
	octave: number;
	static getOffsetFromProperty(propertyIn: EnumIntervalProperty, degreeIn: number): 1 | -1 | 0 | -2;
	static getPropertyFromOffset(onsetIn: number, degreeIn: number): EnumIntervalProperty;
	static getOffsetFromDegree(degreeIn: number): number;
	constructor();
	constructor(intervalIn: IInterval);
	constructor(intervalIn: string);
	constructor(degreeIn: number, onset?: number, octave?: number);
	become(p1?: IInterval | string | number, p2?: number, p3?: number): this;
	protected fromInterval(degreeIn: number, onsetIn?: number, octaveIn?: number): void;
	static fromString(nameIn: string): IInterval;
	protected fromString(nameIn: string): this;
	static fromOffset(offsetIn: number): IInterval;
	protected fromOffset(offsetIn: number): this;
	static fromRatio(ratioIn: number): Interval;
	add(iIn: Interval): this;
	static add(a: Interval, b: Interval): Interval;
	sub(iIn: Interval): this;
	static sub(a: Interval, b: Interval): Interval;
	equals(intervalIn: object): boolean;
	compareTo(iIn: Interval): number;
	static compare(x: Interval, y: Interval): number;
	reverse(): this;
	octaveReverse(): this;
	get offset(): number;
	get ratio(): number;
	get fraction(): number[];
	get reciprocal(): number[];
	get property(): EnumIntervalProperty;
	static fromArray(arrayIn: (string | IInterval)[]): Interval[];
	toString(): string;
	clone(): Interval;
}
export interface IEnumNote {
	className: "EnumNote";
	offset: TIntervalOffset;
}
export declare type TEnumNoteValue = "C" | "D" | "E" | "F" | "G" | "A" | "B";
declare class EnumNote extends Enum {
	protected static indexes: TEnumNoteValue[];
	private static offsetMap;
	static get C(): EnumNote;
	static get D(): EnumNote;
	static get E(): EnumNote;
	static get F(): EnumNote;
	static get G(): EnumNote;
	static get A(): EnumNote;
	static get B(): EnumNote;
	static c: EnumNote;
	static d: EnumNote;
	static e: EnumNote;
	static f: EnumNote;
	static g: EnumNote;
	static a: EnumNote;
	static b: EnumNote;
	readonly offset: TIntervalOffset;
	private constructor();
	static from(that: IEnumNote): EnumNote;
	static byOffset(offsetIn: number): EnumNote;
	static byIndex(indexIn: number): EnumNote;
	get className(): "EnumNote";
	name(): TEnumNoteValue;
	get index(): number;
	ordinal(): number;
	equals(noteIn: object): boolean;
}
export interface ITimeCode {
	beats: number;
	beatDuration: number;
	bpm: number;
}
export declare class TimeCode implements ITimeCode {
	static readonly DEFAULT: TimeCode;
	static readonly isTimeCode: (x: any) => x is ITimeCode;
	beats: number;
	beatDuration: number;
	bpm: number;
	constructor(beatsIn?: number, beatDurationIn?: number, bpmIn?: number);
	constructor(timeCodeIn: ITimeCode);
	getSecondsFromBeats(beatsIn?: number): number;
	getBeatsFromSeconds(secondsIn?: number): number;
	toString(): string;
	clone(): TimeCode;
}
export declare class Random {
	private prng;
	constructor(seedIn?: string);
	quick(): number;
	int32(): number;
	double(): number;
	state(): object;
	randint(minimum: number, maximum: number): number;
}
export declare type TDurationAbbreviation = `${1 | 2 | 4 | 8 | 16 | 32 | 64 | 128}${"n" | "nd" | "nt"}` | "0";
export interface IDuration {
	isAbsolute: boolean;
	numerator: number;
	denominator: number;
	seconds: number;
}
export declare class Duration implements IDuration, IComputable<Duration>, IClonable<Duration> {
	static readonly isDuration: (x: any) => x is IDuration;
	static readonly isDuractionAbbreviation: (x: any) => x is TDurationAbbreviation;
	static fromArray(arrayIn: IDuration[]): Duration[];
	isAbsolute: boolean;
	numerator: number;
	denominator: number;
	seconds: number;
	constructor(secondsIn: number);
	constructor(numeratorIn: number, denominatorIn: number);
	constructor(durationIn: IDuration);
	constructor(durationString: TDurationAbbreviation);
	become(p1: number | IDuration | TDurationAbbreviation, p2?: number): this;
	private get value();
	get isRelative(): boolean;
	getBeats(): number;
	getBeats(timeCodeIn: TimeCode): number;
	getBeats(bpmIn: number): number;
	getTicks(p1?: Parameters<this["getBeats"]>[0]): number;
	toAbsolute(bpmIn: number): this;
	toAbsolute(timeCodeIn: TimeCode): this;
	toRelative(bpmIn: number): this;
	toRelative(timeCodeIn: TimeCode): this;
	add(durationIn: Duration): this;
	static add(a: Duration, b: Duration): Duration;
	sub(durationIn: Duration): this;
	static sub(a: Duration, b: Duration): Duration;
	mul(f: number): this;
	static mul(a: Duration, b: number): Duration;
	div(f: number): this;
	div(durationIn: Duration): number;
	static div(a: Duration, b: number): Duration;
	static div(a: Duration, b: Duration): number;
	equals(durationIn: object): boolean;
	compareTo(that: IDuration): number;
	static compare(x: IDuration, y: IDuration): number;
	private simplify;
	clone(): Duration;
	static random(randomIn: Random, min: Duration, max: Duration, step: Duration): Duration;
	toString(): string;
}
export interface INote {
	enumNote: IEnumNote;
	alteration: number;
}
export declare class Note implements INote, IClonable<Note> {
	static readonly REGEX: RegExp;
	static readonly isNote: (x: any) => x is INote;
	static readonly isNoteArray: (x: any) => x is INote[];
	static readonly EnumNote: typeof EnumNote;
	enumNote: EnumNote;
	alteration: number;
	constructor();
	constructor(noteIn: EnumNote, alteration?: number);
	constructor(noteIn: INote);
	constructor(noteIn: string);
	constructor(offset: number, alteration?: number);
	become(p1?: EnumNote | INote | string | number, p2?: number): this;
	static fromString(nameIn: string): {
		enumNote: EnumNote;
		alteration: number;
	};
	protected fromString(nameIn: string): this;
	static fromOffset(offsetIn: number, alterationIn?: number): {
		enumNote: EnumNote;
		alteration: number;
	};
	protected fromOffset(offsetIn: number, alterationIn?: number): this;
	static ratioToOffset(ratio: number): number;
	static offsetToRatio(offset: number): number;
	add(semitones: number): Note;
	add(interval: string | Interval): Note;
	static add(a: Note, b: number | string | Interval): Note;
	sub(semitones: number): Note;
	sub(interval: string | Interval): Note;
	sub(noteIn: Note): number;
	static sub(a: Note, b: number): Note;
	static sub(a: Note, b: string | Interval): Note;
	static sub(a: Note, b: Note): number;
	mul(fIn: number): Note;
	static mul(a: Note, b: number): Note;
	div(fIn: number): Note;
	div(noteIn: Note): number;
	static div(a: Note, b: number): Note;
	static div(a: Note, b: Note): number;
	equals(noteIn: any): boolean;
	compareTo(that: Note): number;
	static compare(x: Note, y: Note): number;
	getInterval(noteIn: INote): Interval;
	getDistance(that: Note): number;
	get offset(): number;
	static fromArray(arrayIn: (string | number | INote)[]): Note[];
	toString(): string;
	clone(): Note;
	openGuidoEvent(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>, durationIn?: Duration, close?: boolean, octaveIn?: number): Promise<void>;
	toGuidoAR(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>): Promise<import("@shren/guidolib").ARHandler>;
	getTendancy(that: Note): number;
	getStability(that: Note): number;
}
export interface IPitch extends INote {
	octave: number;
}
export declare class Pitch extends Note implements IPitch, IClonable<Pitch> {
	static readonly REGEX: RegExp;
	static fromFrequency(f: number): Pitch;
	static readonly MINIMUM: Pitch;
	static readonly MAXIMUM: Pitch;
	static readonly isPitch: (x: any) => x is IPitch;
	static readonly isPitchArray: (x: any) => x is IPitch[];
	octave: number;
	constructor();
	constructor(pitchIn: IPitch);
	constructor(noteIn: EnumNote | INote, octaveIn?: number);
	constructor(pitchIn: string);
	constructor(pitchIn: number);
	become(p1?: IPitch | EnumNote | INote | string | number, p2?: number): this;
	get frequency(): number;
	static fromString(nameIn: string): {
		octave: number;
		enumNote: EnumNote;
		alteration: number;
	};
	protected fromString(nameIn: string): this;
	static fromOffset(offsetIn: number): {
		octave: number;
		enumNote: EnumNote;
		alteration: number;
	};
	protected fromOffset(offsetIn: number): this;
	add(semitones: number): Pitch;
	add(interval: string | Interval): Pitch;
	static add(a: Pitch, b: number): Pitch;
	static add(a: Pitch, b: string | Interval): Pitch;
	sub(semitones: number): Pitch;
	sub(interval: string | Interval): Pitch;
	sub(pitchIn: Pitch): number;
	static sub(a: Pitch, b: number): Pitch;
	static sub(a: Pitch, b: string | Interval): Pitch;
	static sub(a: Pitch, b: Pitch): number;
	mul(fIn: number): Pitch;
	static mul(a: Pitch, b: number): Pitch;
	div(pitchIn: Pitch): number;
	div(fIn: number): Pitch;
	static div(a: Pitch, b: number): Pitch;
	static div(a: Pitch, b: Pitch): number;
	equals(pitchIn: any): boolean;
	compareTo(pitchIn: Pitch): number;
	static compare(x: Pitch, y: Pitch): number;
	getInterval(pitchIn: INote): Interval;
	getDistance(that: Pitch): number;
	get offset(): number;
	static fromArray(arrayIn: (string | number | IPitch)[]): Pitch[];
	toString(): string;
	clone(): Pitch;
	openGuidoEvent(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>, durationIn?: Duration, close?: boolean): Promise<void>;
	getTendancy(that: Pitch): number;
	getStability(that: Pitch): number;
}
export interface IEnumChord {
	className: "EnumChord";
	intervals: IInterval[];
}
export declare type TEnumChordName = "MAJ" | "MIN" | "AUG" | "DIM" | "SUS2" | "SUS" | "SUS4" | "DOM7" | "MAJ7" | "MINMAJ7" | "MIN7" | "AUGMAJ7" | "AUG7" | "DIMMIN7" | "DIM7" | "DOM7DIM5";
declare class EnumChord extends Enum {
	protected static indexes: TEnumChordName[];
	static get MAJ(): EnumChord;
	static get MIN(): EnumChord;
	static get AUG(): EnumChord;
	static get DIM(): EnumChord;
	static get SUS2(): EnumChord;
	static get SUS(): EnumChord;
	static get SUS4(): EnumChord;
	static get DOM7(): EnumChord;
	static get MAJ7(): EnumChord;
	static get MINMAJ7(): EnumChord;
	static get MIN7(): EnumChord;
	static get AUGMAJ7(): EnumChord;
	static get AUG7(): EnumChord;
	static get DIMMIN7(): EnumChord;
	static get DIM7(): EnumChord;
	static get DOM7DIM5(): EnumChord;
	_name: string;
	intervals: Interval[];
	private constructor();
	private constructor();
	static from(that: IChord | IEnumChord): EnumChord;
	static byChord(chordIn: IChord | IEnumChord): EnumChord;
	static byName(chordIn: TEnumChordName): EnumChord;
	get className(): "EnumChord";
	toChord(base: Note | Pitch | string): Chord;
	name(): string;
	equals(chordIn: any): boolean;
	clone(): EnumChord;
}
export interface IChord {
	base: INote | IPitch;
	intervals: IInterval[];
}
export declare class Chord implements IChord, Iterable<Note>, IComputable<Chord>, IClonable<Chord> {
	static readonly isChord: (x: any) => x is IChord;
	static readonly isChordArray: (x: any) => x is IChord[];
	static readonly EnumChord: typeof EnumChord;
	base: Note | Pitch;
	intervals: Interval[];
	constructor(chordIn: IChord);
	constructor(base: Note | Pitch | string | number, ...notes: Note[] | Pitch[] | number[]);
	constructor(chordIn: Note[] | Pitch[] | string[] | number[]);
	constructor(base: Note | Pitch | string, ...intervals: Interval[] | string[]);
	become(p1: IChord | Note | Pitch | string | number | Note[] | Pitch[] | string[] | number[], ...arrayIn: Note[] | Pitch[] | number[] | Interval[] | string[]): this;
	get size(): number;
	get notes(): Note[] | Pitch[];
	set notes(notesIn: Note[] | Pitch[]);
	get isAbsolute(): boolean;
	toAbsolute(octaveIn?: number): this;
	get ratio(): number[];
	get reciprocal(): number[];
	removeDup(): void;
	reorder(): void;
	contains(noteIn: Note | Pitch): boolean;
	inverseUp(): this;
	inverseDown(): this;
	inverse(inversion: number): this;
	get enumChord(): EnumChord;
	get phantomBase(): Note;
	get phantomTop(): Note;
	add(chordIn: Chord): Chord;
	add(noteIn: INote | Note[]): Chord;
	add(pitchIn: IPitch | Pitch[]): Chord;
	add(intervalIn: Interval): Chord;
	static add(a: Chord, b: Chord): Chord;
	sub(chordIn: Chord): Chord;
	sub(noteIn: INote | Note[]): Chord;
	sub(pitchIn: IPitch | Pitch[]): Chord;
	sub(intervalIn: Interval): Chord;
	static sub(a: Chord, b: Chord): Chord;
	compareTo(that: Chord): number;
	static compare(x: Chord, y: Chord): number;
	equals(chordIn: any): boolean;
	toString(): string;
	clone(): Chord;
	toGuidoAR(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>): Promise<import("@shren/guidolib").ARHandler>;
	[Symbol.iterator](): Iterator<Note | Pitch>;
	getTendancy(that: Chord): number;
	getStability(that: Chord): number;
}
export interface IColor {
	t: number;
	s: number;
	d: number;
	major: number;
}
export declare class Color implements IColor {
	static readonly isColor: (x: any) => x is IColor;
	t: number;
	s: number;
	d: number;
	major: number;
	constructor();
	constructor(t?: number, s?: number, d?: number, major?: number);
	constructor(color: number[]);
	constructor(colorIn: Color);
	toArray(): number[];
	fromArray(color: number[]): this;
	equals(colorIn: object): boolean;
	toString(): string;
	clone(): Color;
}
export declare class Frequency {
	static A440: number;
	static SEMITONE: number;
	static THRES_AUDIT: number;
	static getRatio: (d: number) => number;
}
export interface IParam {
	path: string;
	name?: string;
	min: number;
	max: number;
	step: number;
	value: number;
}
export declare class Param implements IParam {
	static readonly isParam: (x: any) => x is IParam;
	readonly path: string;
	name?: string;
	private _min;
	private _max;
	step: number;
	private _value;
	constructor(optionsIn: IParam);
	get value(): number;
	set value(valueIn: number);
	get min(): number;
	set min(minIn: number);
	get max(): number;
	set max(maxIn: number);
	setRange(minIn: number, maxIn: number): void;
	clone(): Param;
}
declare class EnumScale {
	static get MAJOR(): Scale;
	static get MINOR(): Scale;
	static get PENTA(): Scale;
	static get IONIAN(): Scale;
	static get DORIAN(): Scale;
	static get PHRYGIAN(): Scale;
	static get LYDIAN(): Scale;
	static get MIXOLYDIAN(): Scale;
	static get AEOLIAN(): Scale;
	static get LOCRIAN(): Scale;
	static get ASCENDING_MELODIC_MINOR(): Scale;
	static get PHRYGIAN_MAJ6(): Scale;
	static get LYDIAN_AUG(): Scale;
	static get LYDIAN_DOM(): Scale;
	static get MIXOLYDIAN_MIN6(): Scale;
	static get LOCRIAN_MAJ2(): Scale;
	static get SUPER_LOCRIAN(): Scale;
}
export interface IScale {
	scaleName?: string;
	intervals: IInterval[];
	degreeNames: string[];
}
export declare class Scale implements Iterable<Interval>, IScale, IClonable<Scale> {
	static readonly isScale: (x: any) => x is IScale;
	static readonly EnumScale: typeof EnumScale;
	scaleName?: string;
	intervals: Interval[];
	degreeNames: string[];
	constructor(nameIn: string, ...degreesIn: string[]);
	constructor(scaleIn: IScale);
	become(p1: string | IScale, ...degreesIn: string[]): this;
	get size(): number;
	addNote(noteIn: string): this;
	getIntervalFromIndex(index: number): Interval;
	getIntervalFromDegree(degreeIn: number): Interval;
	get degrees(): number[];
	equals(scaleIn: object): boolean;
	getName(): string;
	toNotes(from?: Pitch): Pitch[];
	toGuidoAR(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>): Promise<import("@shren/guidolib").ARHandler>;
	toString(): string;
	clone(): Scale;
	[Symbol.iterator](): Iterator<Interval>;
}
export interface ITonality {
	note: INote;
	scale: IScale;
}
export declare class Tonality implements Iterable<Note>, ITonality, IClonable<Tonality> {
	static readonly isTonality: (x: any) => x is ITonality;
	note: Note;
	scale: Scale;
	constructor(tonalityIn: ITonality);
	constructor(tonalityIn: string);
	constructor(noteIn: Note, scaleIn: Scale);
	become(p1: ITonality | string | Note, p2?: Scale): this;
	add(intervalIn: Interval): this;
	sub(intervalIn: Interval): this;
	get notes(): Note[];
	getNoteFromDegree(degreeIn: number): Note;
	getTriad(degreeIn: number): Chord;
	getTriads(): Chord[];
	get triads(): Chord[];
	toRelative(): this;
	get relative(): Tonality;
	toNext(): this;
	get next(): Tonality;
	toPrev(): this;
	get prev(): Tonality;
	toString(): string;
	clone(): Tonality;
	[Symbol.iterator](): Iterator<Note>;
}
export interface ITonalChord {
	alteration: number;
	degree: number;
	chord: EnumChord;
}
export declare class TonalChord implements ITonalChord {
	static readonly REGEX1: RegExp;
	static readonly REGEX2: RegExp;
	static readonly isTonalChord: (x: any) => x is ITonalChord;
	static readonly isTonalChordArray: (x: any) => x is TonalChord[];
	alteration: number;
	degree: number;
	chord: EnumChord;
	constructor(nameIn: string);
	constructor(chordIn: ITonalChord);
	getChord(tonalityIn: Tonality): Chord;
	equals(chordIn: object): boolean;
	toString(): string;
	clone(): TonalChord;
}
export interface IVelocity {
	velocity: number;
}
declare class EnumVelocity {
	static get SILENT(): Velocity;
	static get PPP(): Velocity;
	static get PP(): Velocity;
	static get PIANISSIMO(): Velocity;
	static get P(): Velocity;
	static get MP(): Velocity;
	static get MEZZO_PIANO(): Velocity;
	static get MF(): Velocity;
	static get MEZZO_FORTE(): Velocity;
	static get F(): Velocity;
	static get FORTE(): Velocity;
	static get FF(): Velocity;
	static get FORTISSIMO(): Velocity;
	static get FFF(): Velocity;
}
export declare class Velocity implements IVelocity, IComputable<Velocity>, IClonable<Velocity> {
	static readonly isVelocity: (x: any) => x is IVelocity;
	static readonly EnumVelocity: typeof EnumVelocity;
	private _velocity;
	constructor(velocityIn: number);
	constructor(velocityIn: IVelocity);
	become(velocityIn: number | IVelocity): this;
	get velocity(): number;
	set velocity(value: number);
	add(that: Velocity): Velocity;
	sub(that: Velocity): Velocity;
	mul(fIn: number): Velocity;
	div(fIn: number): this;
	div(that: Velocity): number;
	equals(that: object): boolean;
	compareTo(that: Velocity): number;
	normalize(): number;
	clone(): Velocity;
	toString(): string;
}
export declare const Utils: {
	precisionFactor: (x: number, e?: number) => number;
	gcd: (a: number, b: number) => number;
	lcm: (a: number, b: number) => number;
	floorMod: (x: number, y: number) => number;
	isStringArray: (x: any) => x is string[];
	isNumberArray: (x: any) => x is number[];
	isObjectArray: <T>(x: any, typeGuard: (e: any) => e is T) => x is T[];
	isObjectInstanceArray: <T_1>(x: any, Type: new (...args: any[]) => T_1) => x is T_1[];
	isObjectArrayLike: <T_2>(x: any, typeGuard: (e: any) => e is T_2) => x is ArrayLike<T_2>;
	isObjectInstanceArrayLike: <T_3>(x: any, Type: new (...args: any[]) => T_3) => x is ArrayLike<T_3>;
	isObjectIterable: <T_4>(x: any, typeGuard: (e: any) => e is T_4) => x is Iterable<T_4>;
	isObjectInstanceIterable: <T_5>(x: any, Type: new (...args: any[]) => T_5) => x is Iterable<T_5>;
	parseRoman: (stringIn: string) => number;
	toRoman: (nIn: number) => string;
	getValueFromCurve: (t0: number, t1: number, t: number, exp: number) => number;
	nearestFraction: (v: number, approxIn?: number) => number[];
	nearestFractions: (ratio: number[], approxIn?: number) => number[];
	nearestReciprocal: (ratio: number, approxIn?: number) => number[];
	nearestReciprocals: (ratio: number[], approxIn?: number) => number[];
	permutations: <T_6 = any>(array: T_6[]) => T_6[][];
	permute: <T_7 = any>(array: T_7[], random?: Random) => T_7[];
	combinations: <T_8 = any>(array: T_8[]) => T_8[][];
	randomCombination: <T_9 = any>(array: T_9[], random?: Random) => T_9[];
};
export declare const Series: {
	x2dx: (array: number[]) => number[];
	dx2x: (array: number[], start?: number) => number[];
	arithSer: (begin?: number, end?: number, step?: number, nummax?: number) => number[];
	fiboSer: (seed1?: number, seed2?: number, limit?: number) => number[];
	geometricSer: (seed?: number, factor?: number, limit?: number, nummax?: number) => number[];
	isPrime: (num: number) => boolean;
	primeSer: (max?: number, nummax?: number) => number[];
	inharmSer: (begin?: number, dist?: number, npart?: number) => number[];
};
export interface ITrackNote {
	pitch: IPitch;
	velocity: IVelocity;
}
export declare class TrackNote implements ITrackNote, IClonable<TrackNote> {
	static readonly isTrackNote: (x: any) => x is ITrackNote;
	static readonly isTrackNoteArray: (x: any) => x is ITrackNote[];
	static fromArray(notesIn: (ITrackNote | INote | number | string)[], velocitiesIn?: (Velocity | number)[]): TrackNote[];
	pitch: Pitch;
	velocity: Velocity;
	constructor(trackNoteIn: ITrackNote);
	constructor(noteIn: INote | number | string, velocityIn?: Velocity | number);
	become(p1: ITrackNote | INote | number | string, velocityIn?: Velocity | number): this;
	clone(): TrackNote;
}
export interface ITrackChord {
	duration: IDuration;
	offset: IDuration;
	trackNotes?: ITrackNote[];
	articulation?: IArticulation;
}
export declare class TrackChord implements ITrackChord, IClonable<TrackChord>, Iterable<TrackNote> {
	static readonly isTrackChord: (x: any) => x is ITrackChord;
	static readonly isTrackChordArray: (x: any) => x is ITrackChord[];
	static readonly isTrackChordInstanceArrayLike: (x: any) => x is ArrayLike<TrackChord>;
	static readonly isTrackChordInstanceIterable: (x: any) => x is Iterable<TrackChord>;
	static fromArray(arrayIn: ITrackChord[]): TrackChord[];
	duration: Duration;
	offset: Duration;
	trackNotes?: TrackNote[];
	articulation?: Articulation;
	constructor(trackChord: ITrackChord);
	constructor(note?: number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord, durationIn?: IDuration | number[] | number | TDurationAbbreviation, offsetIn?: IDuration | number[] | number | TDurationAbbreviation, articulationIn?: IArticulation);
	become(p1?: ITrackChord | number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord, durationIn?: IDuration | number[] | number | TDurationAbbreviation, offsetIn?: IDuration | number[] | number | TDurationAbbreviation, articulationIn?: IArticulation): this;
	getChord(): Chord;
	setChord(chordIn?: Chord, velocitiesIn?: Velocity[] | number[]): void;
	setVelocities(velocitiesIn?: IVelocity | number | IVelocity[] | number[]): void;
	clone(): TrackChord;
	toMidi({ bpm, beats, beatDuration }?: ITimeCode): Uint8Array;
	openGuidoEvent(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>, durationIn?: Duration, close?: boolean): Promise<void>;
	[Symbol.iterator](): Iterator<TrackNote>;
	toString(): string;
}
export interface IAutomationPoint {
	value: number;
	offset: IDuration;
	exponent: number;
}
declare class AutomationPoint implements IAutomationPoint, IClonable<AutomationPoint> {
	static readonly isAutomationPoint: (x: any) => x is IAutomationPoint;
	static readonly isAutomationPointArray: (x: any) => x is IAutomationPoint[];
	static fromArray(arrayIn: IAutomationPoint[]): AutomationPoint[];
	value: number;
	offset: Duration;
	exponent: number;
	constructor(value: number, offset: Duration, exponent?: number);
	constructor(pointIn: IAutomationPoint);
	become(p1: number | IAutomationPoint, offset?: Duration, exponent?: number): this;
	clone(): AutomationPoint;
}
export interface IAutomation {
	path: string;
	points: IAutomationPoint[];
}
declare class Automation implements IAutomation {
	static readonly isAutomation: (x: any) => x is IAutomation;
	static readonly isAutomationArray: (x: any) => x is IAutomation[];
	static fromArray(automationsIn: IAutomation[]): Automation[];
	path: string;
	points: AutomationPoint[];
	constructor(path: string, points?: AutomationPoint[]);
	constructor(automationIn: IAutomation);
	getValueAtTime(time: Duration): number;
	addPointAtTime(time: Duration): void;
	sort(): void;
	forward(duration: Duration): void;
	rewind(duration: Duration): void;
	toString(): string;
	clone(): Automation;
}
export interface ISequence extends Array<TrackChord> {
}
export declare class Sequence extends Array<TrackChord> {
	static readonly isSequence: (x: any) => x is ISequence;
	static readonly isSequenceArray: (x: any) => x is ISequence[];
	static readonly isSequenceInstanceArrayLike: (x: any) => x is ArrayLike<Sequence>;
	static readonly isSequenceInstanceIterable: (x: any) => x is Iterable<Sequence>;
	static from<T extends TrackChord>(arrayLike: Iterable<T> | ArrayLike<T>): Sequence;
	static from<T extends TrackChord, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
	static of<T>(...items: T[]): T[];
	static fromArray(arrayIn: ISequence[]): Sequence[];
	static fromArrays(chordsIn: (number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord | ITrackChord)[], durationsIn?: (number | TDurationAbbreviation | Duration)[], velocitiesIn?: (number | number[] | IVelocity | IVelocity[])[], articulationsIn?: IArticulation[]): Sequence;
	constructor(arrayLength?: number);
	constructor(...items: ITrackChord[]);
	push(...itemsIn: ITrackChord[]): number;
	concat(...itemsIn: (ITrackChord | ConcatArray<ITrackChord>)[]): TrackChord[];
	unshift(...itemsIn: TrackChord[]): number;
	fill(value: ITrackChord, start?: number, end?: number): this;
	toMidi({ bpm, beats, beatDuration }?: ITimeCode): Uint8Array;
	toGuidoAR(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>): Promise<import("@shren/guidolib").ARHandler>;
}
export interface ISegment {
	trackChords: ITrackChord[];
	automations: IAutomation[];
	duration: IDuration;
}
export declare class Segment implements ISegment {
	static readonly isSegment: (x: any) => x is ISegment;
	static readonly isSegmentArray: (x: any) => x is ISegment[];
	trackChords: Sequence;
	automations: Automation[];
	duration: Duration;
	constructor(optionsIn: ISegment);
	getChords(): Chord[];
	setChords(chordsIn: Chord[], velocitiesIn?: Velocity[][] | number[][]): void;
	get noteDurations(): Duration[];
	set noteDurations(durationsIn: Duration[]);
	get noteOffsets(): Duration[];
	set noteOffsets(offsetsIn: Duration[]);
	clone(): Segment;
	toMidi({ bpm, beats, beatDuration }?: ITimeCode): Uint8Array;
}
export interface ISequences extends Array<Sequence> {
}
export declare class Sequences extends Array<Sequence> {
	static readonly isSequences: (x: any) => x is ISequences;
	static from<T extends Sequence>(arrayLike: Iterable<T> | ArrayLike<T>): Sequence;
	static from<T extends Sequence, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
	static of<T>(...items: T[]): T[];
	constructor(arrayLength?: number);
	constructor(...items: ISequence[]);
	push(...itemsIn: ISequence[]): number;
	concat(...itemsIn: (ISequence | ConcatArray<ISequence>)[]): Sequence[];
	unshift(...itemsIn: Sequence[]): number;
	fill(value: ISequence, start?: number, end?: number): this;
	toMidi({ bpm, beats, beatDuration }?: ITimeCode): Uint8Array;
	toGuidoAR(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>): Promise<import("@shren/guidolib").ARHandler>;
}
export declare class Roll extends Array<TrackChord> {
	static readonly isRoll: (x: any) => x is ITrackChord[];
	static from<T extends TrackChord>(arrayLike: Iterable<T> | ArrayLike<T>): Roll;
	static from<T extends TrackChord, U>(arrayLike: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
	static of<T>(...items: T[]): T[];
	static fromArrays(chordsIn: (number | number[] | string | string[] | INote[] | INote | ITrackNote | ITrackNote[] | IChord | ITrackChord)[], offsetsIn?: (number | TDurationAbbreviation | Duration)[], durationsIn?: (number | TDurationAbbreviation | Duration)[], velocitiesIn?: (number | number[] | IVelocity | IVelocity[])[], articulationsIn?: IArticulation[]): Roll;
	constructor(arrayLength?: number);
	constructor(...items: ITrackChord[]);
	push(...itemsIn: ITrackChord[]): number;
	concat(...itemsIn: (ITrackChord | ConcatArray<ITrackChord>)[]): TrackChord[];
	unshift(...itemsIn: TrackChord[]): number;
	fill(value: ITrackChord, start?: number, end?: number): this;
	toMidi({ bpm, beats, beatDuration }?: ITimeCode): Uint8Array;
	toGuidoAR(factory: PromisifiedFunctionMap<GuidoFactoryAdapter>, spaceFactor?: number): Promise<import("@shren/guidolib").ARHandler>;
}
export interface IComputable<T> {
	add(x: T): T;
	sub(x: T): T;
	mul?(x: number): T;
	div?(x: T): number;
	div?(x: number): T;
	equals(x: object): boolean;
	compareTo(x: T): number;
}
export interface IClonable<T> {
	become(...args: any[]): T;
	clone(): T;
}
export type PromisifiedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => ReturnType<F> extends Promise<any> ? ReturnType<F> : Promise<ReturnType<F>>;
export type PromisifiedFunctionMap<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? PromisifiedFunction<T[K]> : T[K];
};

export {};
