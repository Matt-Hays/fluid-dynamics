/**
 * An individual pipeline section. <br/>
 * A pipeline is intended to be unique in its parameters. <br/>
 * Provides the following attributes:
 * <ul>
 *   <li>absoluteRoughness: The absolute roughness of the pipe section.</li>
 *   <li>sectionLength: The overall length of the pipe section.</li>
 *   <li>diameter: The inside diameter of the pipe section.</li>
 *   <li>kValues: The k-values that exist within the pipe section boundaries.</li>
 * </ul>
 */
export default class Section {

  constructor(
    private _absoluteRoughness: number,
    private _sectionLength: number,
    private _diameter: number,
    private _material: String,
    private _inletPressure: number,
    private _outletPressure: number,
    private _kValues: Array<number>,
  ) {
    if (_absoluteRoughness === null || _absoluteRoughness < 0)
      throw new Error('Absolute roughness must be a non-negative value.');
    if (_sectionLength === null || _sectionLength <= 0) throw new Error('Length must be a non-negative number.');
    if (_diameter === null || _diameter <= 0) throw new Error('Diameter must be a non-negative number.');
    if (_material === null) throw new Error('Material must be defined.')
    if (_kValues === null) throw new Error('K-values must be given.');
  }

  get absoluteRoughness(): number {
    return this._absoluteRoughness;
  }

  get sectionLength(): number {
    return this._sectionLength;
  }

  get diameter(): number {
    return this._diameter;
  }

  get material(): String {
    return this._material;
  }

  get inletPressure(): number {
    return this._inletPressure;
  }

  get outletPressure(): number {
    return this._outletPressure;
  }

  get kValues(): Array<number> {
    return this._kValues;
  }

  set absoluteRoughness(value: number) {
    this._absoluteRoughness = value;
  }

  set sectionLength(value: number) {
    this._sectionLength = value;
  }

  set diameter(value: number) {
    this._diameter = value;
  }

  set material(value: String) {
    this._material = value;
  }

  set inletPressure(value: number) {
    this._inletPressure = value;
  }

  set outletPressure(value: number) {
    this._outletPressure = value;
  }

  set kValues(value: number) {
    this._kValues.push(value);
  }
}
