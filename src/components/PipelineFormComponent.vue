<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
  pipeline: {
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
}>()

const emit = defineEmits(['submit-pipeline'])

const localPipeline = reactive({
  ...props.pipeline,
  sections: props.pipeline.sections.map((section) => ({
    ...section,
    kValues: [...section.kValues],
  })),
})

function onSubmit() {
  console.log("Inside pipeline componet on submit: ", localPipeline)
  emit('submit-pipeline', localPipeline)
}

function addSection() {
  localPipeline.sections.push({
    absoluteRoughness: 0,
    sectionLength: 0,
    diameter: 0,
    material: '',
    inletPressure: 0,
    outletPressure: 0,
    kValues: [],
  })
}

function removeSection(index: number): void {
  localPipeline.sections.splice(index, 1)
}
</script>

<template>
  <form class="grid gap-4 grid-cols-2" @submit.prevent="onSubmit">
    <label>
      Inlet Flow Rate ({{ localPipeline.isMetric ? 'm&#179;/s' : 'ft&#179;/s' }})
      <input
        v-model="localPipeline.startFlowRate"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Discharge Flow Rate ({{ localPipeline.isMetric ? 'm&#179;/s' : 'ft&#179;/s' }})
      <input
        v-model="localPipeline.endFlowRate"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Inlet Pressure ({{ localPipeline.isMetric ? 'kPa' : 'psi' }})
      <input
        v-model="localPipeline.startPressure"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Discharge Pressure ({{ localPipeline.isMetric ? 'kPa' : 'psi' }})
      <input
        v-model="localPipeline.endPressure"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Inlet Minimum Elevation ({{ localPipeline.isMetric ? 'm' : 'ft' }})
      <input
        v-model="localPipeline.startEleMin"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Discharge Minimum Elevation ({{ localPipeline.isMetric ? 'm' : 'ft' }})
      <input
        v-model="localPipeline.endEleMin"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Inlet Maximum Elevation ({{ localPipeline.isMetric ? 'm' : 'ft' }})
      <input
        v-model="localPipeline.startEleMax"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Discharge Maximum Elevation ({{ localPipeline.isMetric ? 'm' : 'ft' }})
      <input
        v-model="localPipeline.endEleMax"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label>
      Kinematic Viscosity ({{ localPipeline.isMetric ? 'm&#178;/s' : 'ft&#178;/s' }})
      <input
        v-model="localPipeline.kinematicViscosity"
        type="number"
        step="any"
        class="border-b border-b-blue-600 block w-full"
      />
    </label>

    <label class="flex items-center">
      <input v-model="localPipeline.isEndDayLighted" type="checkbox" class="mr-2" /> End Daylighted
    </label>

    <label class="flex items-center">
      <input v-model="localPipeline.isMetric" type="checkbox" class="mr-2" /> Metric Units
    </label>

    <h2 class="text-lg font-semibold mt-8 mb-4 col-span-2">Pipeline Sections</h2>

    <div
      v-for="(section, index) in localPipeline.sections"
      :key="index"
      class="p-4 border rounded-lg mb-4 col-span-2"
    >
      <h3 class="text-md font-medium">Section {{ index + 1 }}</h3>

      <div class="grid gap-4 grid-cols-2">
        <label>
          Absolute Roughness ({{ localPipeline.isMetric ? 'm' : 'ft' }})
          <input
            v-model="section.absoluteRoughness"
            type="number"
            step="any"
            class="border-b border-b-blue-600 block w-full"
          />
        </label>

        <label>
          Section Length ({{ localPipeline.isMetric ? 'm' : 'ft' }})
          <input
            v-model="section.sectionLength"
            type="number"
            step="any"
            class="border-b border-b-blue-600 block w-full"
          />
        </label>

        <label>
          Diameter ({{ localPipeline.isMetric ? 'm' : 'ft' }})
          <input
            v-model="section.diameter"
            type="number"
            step="any"
            class="border-b border-b-blue-600 block w-full"
          />
        </label>

        <label>
          Material
          <input
            v-model="section.material"
            type="text"
            class="border-b border-b-blue-600 block w-full"
          />
        </label>

        <div class="col-span-2">
          <h4 class="text-md font-medium mb-2">K-Values</h4>
          <div
            v-for="(kValue, kIndex) in section.kValues"
            :key="kIndex"
            class="flex items-center space-x-2 mb-2"
          >
            <input
              v-model="section.kValues[kIndex]"
              type="number"
              step="any"
              class="border-b border-b-blue-600 block w-full"
            />
            <button type="button" class="text-red-500" @click="section.kValues.splice(kIndex, 1)">
              Remove
            </button>
          </div>
          <button type="button" class="text-blue-600 underline" @click="section.kValues.push(0)">
            Add K-Value
          </button>
        </div>
      </div>

      <button type="button" class="text-red-500 mt-2" @click="removeSection(index)">
        Remove Section
      </button>
    </div>

    <button type="button" class="text-blue-600 underline mt-4 col-span-2" @click="addSection">
      Add Section
    </button>

    <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded mt-4 col-span-2">
      Submit Pipeline Data
    </button>
  </form>
</template>

<style scoped></style>
