export type pipeline = {
  startFlowRate: number | null
  endFlowRate: number | null
  startPressure: number | null
  endPressure: number | null
  startEleMin: number | null
  endEleMin: number | null
  startEleMax: number | null
  endEleMax: number | null
  kinematicViscosity: number | null
  isEndDayLighted: boolean
  isMetric: boolean
  sections: Array<{
    absoluteRoughness: number
    sectionLength: number
    diameter: number
    material: string
    inletPressure: number
    outletPressure: number
    kValues: number[]
  }>
}
