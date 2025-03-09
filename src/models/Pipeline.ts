import Section from "@/models/Section.ts";

/**
 * The system overall pipeline. <br/>
 * Provides the following attributes:
 * <ul>
 *   <li>startEle: The starting elevation of the pipeline.</li>
 *   <li>endEle: The ending elevation of the pipeline.</li>
 *   <li>sections: A list of pipeline sections. Each section is intended to be uniquely distinct
 *   from other sections.</li>
 * </ul>
 */
export default class Pipeline {
  constructor(
    private _sections: Array<Section>,
    private _startEleMin: number,
    private _endEleMin: number,
    private _startEleMax: number,
    private _endEleMax: number,
    private _startPressure: number,
    private _endPressure: number,
    private _startFlowRate: number,
    private _endFlowRate: number,
    private _isEndDayLighted: boolean,
    private _isMetric: boolean
  ) {
    if (_sections.length <= 0)
      throw new Error('Pipeline must have at least one section.');
    if (_startEleMin === null || _startEleMax == null)
      throw new Error('Starting elevation must be set.');
    if (_endEleMin === null || _endEleMax == null)
      throw new Error('Ending elevation must be set.');
    if (_startEleMin < 0 || _endEleMin < 0 || _startEleMax < 0 || _endEleMax < 0)
      throw new Error('Elevations settings must be non-negative.');
    if (_isMetric === null)
      throw new Error('Units must be defined.');
  }

  get sections(): Array<Section> {
    return this._sections;
  }

  get startEleMin(): number {
    return this._startEleMin;
  }

  get endEleMin(): number {
    return this._endEleMin;
  }

  get startEleMax(): number {
    return this._startEleMax;
  }

  get endEleMax(): number {
    return this._endEleMax;
  }

  get startPressure(): number {
    return this._startPressure;
  }

  get endPressure(): number {
    return this._endPressure;
  }

  get startFlowRate(): number {
    return this._startFlowRate;
  }

  get endFlowRate(): number {
    return this._endFlowRate;
  }

  get isMetric(): boolean {
    return this._isMetric;
  }

  get isEndDayLighted(): boolean {
    return this._isEndDayLighted;
  }

  get pipelineLength(): number {
    return this._sections
      .reduce((totalLength, section) => totalLength + section.sectionLength, 0);
  }

  get materialList(): Array<String> {
    return this._sections.map(section => section.material);
  }

  set sections(section: Section) {
    this._sections.push(section);
  }

  set startEleMin(startEle: number) {
    this._startEleMin = startEle;
  }

  set endEleMin(endEle: number) {
    this._endEleMin = endEle;
  }

  set startEleMax(startEleMax: number) {
    this._startEleMax = startEleMax;
  }

  set endEleMax(endEleMax: number) {
    this._endEleMax = endEleMax;
  }

  set startPressure(startPressure: number) {
    this._startPressure = startPressure;
  }

  set endPressure(endPressure: number) {
    this._endPressure = endPressure;
  }

  set startFlowRate(flowRate: number) {
    this._startFlowRate = flowRate;
  }

  set endFlowRate(flowRate: number) {
    this._endFlowRate = flowRate;
  }

  set isMetric(isMetric: boolean) {
    this._isMetric = isMetric;
  }

  set isEndDayLighted(isEndDayLighted: boolean) {
    this._isEndDayLighted = isEndDayLighted;
  }
}
