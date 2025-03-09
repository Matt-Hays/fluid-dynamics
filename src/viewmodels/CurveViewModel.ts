// PipelineViewModel.ts
import {reactive, ref} from "vue";
import Pipeline from "@/models/Pipeline.ts";
import Section from "@/models/Section.ts";
import {calcTDH} from "@/models/bernoulli.ts";

export default class PipelineViewModel {
  // Reactive state for the pipeline input data
  public pipeline = reactive({
    startFlowRate: null as number | null,
    endFlowRate: null as number | null,
    startPressure: null as number | null,
    endPressure: null as number | null,
    startEleMin: null as number | null,
    endEleMin: null as number | null,
    startEleMax: null as number | null,
    endEleMax: null as number | null,
    isEndDayLighted: false,
    isMetric: false,
    sections: [] as Array<{
      absoluteRoughness: number;
      sectionLength: number;
      diameter: number;
      material: string;
      inletPressure: number;
      outletPressure: number;
      kValues: number[];
    }>
  });

  public tdhMaxData = ref<Array<[number, number]>>([]);
  public tdhMinData = ref<Array<[number, number]>>([]);

  constructor() {
  }

  // Add a new section
  public addSection(): void {
    this.pipeline.sections.push({
      absoluteRoughness: 0,
      sectionLength: 0,
      diameter: 0,
      material: "",
      inletPressure: 0,
      outletPressure: 0,
      kValues: [],
    });
  }

  // Remove a section by index
  public removeSection(index: number): void {
    this.pipeline.sections.splice(index, 1);
  }

  // Utility to generate an array of flow rates
  public generateFlowRateArray(flowRate: number | null, count: number = 20): number[] {
    if (flowRate === null || flowRate <= 0) {
      throw new Error("Invalid flow rate.");
    }
    const step = flowRate / Math.floor(count / 2);
    const values: number[] = [];
    for (let i = 0; i < count; i++) {
      values.push(i * step);
    }
    return values;
  }

  // Submit the form data, calculate TDH, and update tdhData
  public submitForm(): void {
    try {
      // Convert the form data into Section instances
      const sections = this.pipeline.sections.map(section =>
        new Section(
          section.absoluteRoughness,
          section.sectionLength,
          section.diameter,
          section.material,
          section.inletPressure,
          section.outletPressure,
          section.kValues
        )
      );

      // Ensure there is at least one section
      if (sections.length === 0) {
        throw new Error("Pipeline must have at least one section.");
      }

      // Create the Pipeline instance
      const pipe = new Pipeline(
        sections,
        this.pipeline.startEleMin!,
        this.pipeline.endEleMin!,
        this.pipeline.startEleMax!,
        this.pipeline.endEleMax!,
        this.pipeline.startPressure!,
        this.pipeline.endPressure!,
        this.pipeline.startFlowRate!,
        this.pipeline.endFlowRate!,
        this.pipeline.isEndDayLighted,
        this.pipeline.isMetric
      );

      // Use appropriate kinematic viscosity based on units
      const kinematicViscosity = this.pipeline.isMetric ? 1.003e-6 : 1.1e-5;
      const startFlowRates = this.generateFlowRateArray(this.pipeline.startFlowRate);
      const endFlowRates = this.generateFlowRateArray(this.pipeline.endFlowRate);

      // Calculate TDH using the provided Bernoulli-based function
      const [maxHeads, minHeads] = calcTDH(
        pipe,
        startFlowRates,
        endFlowRates,
        kinematicViscosity,
        this.pipeline.isMetric
      );

      // Map the flow rates and computed heads into tdhData for charting
      this.tdhMaxData.value = startFlowRates.map((flow, i) => [flow, maxHeads[i]]);
      this.tdhMinData.value = startFlowRates.map((flow, i) => [flow, minHeads[i]]);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
}
