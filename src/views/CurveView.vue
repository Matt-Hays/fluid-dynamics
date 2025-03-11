<script setup lang="ts">
import CurveViewModel from '@/viewmodels/CurveViewModel'
import ChartComponent from '@/components/ChartComponent.vue'

const curveVM = new CurveViewModel()
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-center py-8">
      <ChartComponent
        :tdhMaxData="curveVM.tdhMaxData.value"
        :tdhMinData="curveVM.tdhMinData.value"
      />
    </div>
    <h2 class="text-lg font-semibold mb-4">Pipeline Information</h2>

    <form class="grid gap-4 grid-cols-2" @submit.prevent="curveVM.submitForm">
      <label>
        Inlet Flow Rate
        <input
          v-model="curveVM.pipeline.startFlowRate"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Discharge Flow Rate
        <input
          v-model="curveVM.pipeline.endFlowRate"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Inlet Pressure
        <input
          v-model="curveVM.pipeline.startPressure"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Discharge Pressure
        <input
          v-model="curveVM.pipeline.endPressure"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Inlet Minimum Elevation
        <input
          v-model="curveVM.pipeline.startEleMin"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Discharge Minimum Elevation
        <input
          v-model="curveVM.pipeline.endEleMin"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Inlet Maximum Elevation
        <input
          v-model="curveVM.pipeline.startEleMax"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Discharge Maximum Elevation
        <input
          v-model="curveVM.pipeline.endEleMax"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label>
        Kinematic Viscosity
        <input
          v-model="curveVM.pipeline.kinematicViscosity"
          type="number"
          step="any"
          class="border-b border-b-blue-600 block w-full"
        />
      </label>

      <label class="flex items-center">
        <input v-model="curveVM.pipeline.isEndDayLighted" type="checkbox" class="mr-2" /> End
        Daylighted
      </label>

      <label class="flex items-center">
        <input v-model="curveVM.pipeline.isMetric" type="checkbox" class="mr-2" /> Metric Units
      </label>

      <h2 class="text-lg font-semibold mt-8 mb-4 col-span-2">Pipeline Sections</h2>

      <div
        v-for="(section, index) in curveVM.pipeline.sections"
        :key="index"
        class="p-4 border rounded-lg mb-4 col-span-2"
      >
        <h3 class="text-md font-medium">Section {{ index + 1 }}</h3>

        <div class="grid gap-4 grid-cols-2">
          <label>
            Absolute Roughness
            <input
              v-model="section.absoluteRoughness"
              type="number"
              step="any"
              class="border-b border-b-blue-600 block w-full"
            />
          </label>

          <label>
            Section Length
            <input
              v-model="section.sectionLength"
              type="number"
              step="any"
              class="border-b border-b-blue-600 block w-full"
            />
          </label>

          <label>
            Diameter
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

        <button type="button" class="text-red-500 mt-2" @click="curveVM.removeSection(index)">
          Remove Section
        </button>
      </div>

      <button
        type="button"
        class="text-blue-600 underline mt-4 col-span-2"
        @click="curveVM.addSection"
      >
        Add Section
      </button>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded mt-4 col-span-2">
        Submit Pipeline Data
      </button>
    </form>
  </div>
</template>
