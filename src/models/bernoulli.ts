// Calculate friction factor
import type Pipeline from '@/models/Pipeline.ts'
import type Section from '@/models/Section.ts'

function calcSerghidesApproximation(
  relativeRoughness: number,
  flowRate: number,
  hydraulicDiameter: number,
  kinematicViscosity: number,
): number {
  if (flowRate === 0) return 0
  const reynoldsNum = calcReynoldsNumber(flowRate, hydraulicDiameter, kinematicViscosity)
  if (reynoldsNum < 2300) return 64 / reynoldsNum

  const roughnessTerm = relativeRoughness / 3.7
  const calcTerm = (prev: number | null = null): number => {
    const reynoldsTerm = prev ? (2.51 * prev) / reynoldsNum : 12 / reynoldsNum
    return -2 * Math.log10(roughnessTerm + reynoldsTerm)
  }
  const a = calcTerm(null)
  const b = calcTerm(a)
  const c = calcTerm(b)

  return Math.pow(a - Math.pow(b - a, 2) / (c - 2 * b + a), -2)
}

// Calculate Reynold's number
function calcReynoldsNumber(
  flowRate: number,
  hydraulicDiameter: number,
  kinematicViscosity: number,
): number {
  return (getVelocity(flowRate, hydraulicDiameter) * hydraulicDiameter) / kinematicViscosity
}

// Calculate relative roughness
function calcRelativeRoughness(absoluteRoughness: number, hydraulicDiameter: number): number {
  return absoluteRoughness / hydraulicDiameter
}

// Calculate static head
function calcStaticHead(initialElevation: number, finalElevation: number): number {
  return finalElevation - initialElevation
}

// Calculate pressure head
function calcPressureHead(
  initialPressure: number,
  finalPressure: number,
  isMetric: boolean,
): number {
  return (finalPressure - initialPressure) * getPressureToFeetCorrection(isMetric)
}

// Calculate velocity head
function calcVelocityHead(
  initialVelocity: number,
  finalVelocity: number,
  isMetric: boolean,
): number {
  return (
    (Math.pow(finalVelocity, 2) - Math.pow(initialVelocity, 2)) / (2 * getGravityConstant(isMetric))
  )
}

// Calculate major head losses
function calcMajorLosses(
  sectionLength: number,
  hydraulicDiameter: number,
  flowRate: number,
  absoluteRoughness: number,
  kinematicViscosity: number,
  isMetric: boolean,
): number {
  return (
    calcSerghidesApproximation(
      calcRelativeRoughness(absoluteRoughness, hydraulicDiameter),
      flowRate,
      hydraulicDiameter,
      kinematicViscosity,
    ) *
    (sectionLength / hydraulicDiameter) *
    getAvgVelocityHead(flowRate, hydraulicDiameter, isMetric)
  )
}

// Calculate minor head losses
function calcMinorLosses(
  kValues: Array<number>,
  flowRate: number,
  hydraulicDiameter: number,
  isMetric: boolean,
): number {
  return (
    kValues.reduce((acc, k) => acc + k, 0) *
    getAvgVelocityHead(flowRate, hydraulicDiameter, isMetric)
  )
}

// Calculate TDH
export function calcTDH(
  pipeline: Pipeline,
  startFlowRates: Array<number>,
  endFlowRates: Array<number>,
  kinematicViscosity: number,
  isMetric: boolean,
): [Array<number>, Array<number>] {
  if (startFlowRates.length != endFlowRates.length) throw new Error('Invalid flow rate sets.')
  const headsMax: Array<number> = []
  const headsMin: Array<number> = []
  const pressureHead = calcPressureHead(pipeline.startPressure, pipeline.endPressure, isMetric)
  for (let i = 0; i < startFlowRates.length; i++) {
    const tdhWithoutStaticHead =
      pressureHead +
      getDayLightedVelocityHead(
        startFlowRates[i],
        endFlowRates[i],
        isMetric,
        pipeline.isEndDayLighted,
      ) +
      pipeline.sections.reduce<number>(
        (acc: number, section: Section) =>
          acc +
          calcMajorLosses(
            section.sectionLength,
            section.diameter,
            endFlowRates[i],
            section.absoluteRoughness,
            kinematicViscosity,
            isMetric,
          ) +
          calcMinorLosses(section.kValues, endFlowRates[i], section.diameter, isMetric),
        0,
      )

    headsMax.push(calcStaticHead(pipeline.startEleMin, pipeline.endEleMax) + tdhWithoutStaticHead)

    headsMin.push(calcStaticHead(pipeline.startEleMax, pipeline.endEleMin) + tdhWithoutStaticHead)
  }
  return [headsMax, headsMin]
}

function getGravityConstant(isMetric: boolean): number {
  return isMetric ? 9.81 : 32.17
}

function getArea(diameter: number): number {
  return (Math.PI * Math.pow(diameter, 2)) / 4
}

function getVelocity(flowRate: number, diameter: number): number {
  return flowRate / getArea(diameter)
}

function getPressureToFeetCorrection(isMetric: boolean): number {
  return isMetric ? 10.2 : 2.31
}

function getAvgVelocityHead(
  flowRate: number,
  hydraulicDiameter: number,
  isMetric: boolean,
): number {
  return Math.pow(getVelocity(flowRate, hydraulicDiameter), 2) / (2 * getGravityConstant(isMetric))
}

function getDayLightedVelocityHead(
  startFlowRate: number,
  endFlowRate: number,
  isMetric: boolean,
  isDayLighted: boolean,
): number {
  return isDayLighted ? calcVelocityHead(startFlowRate, endFlowRate, isMetric) : 0
}
