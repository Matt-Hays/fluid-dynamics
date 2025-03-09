<script setup lang="ts">
import CurveViewModel from "@/viewmodels/CurveViewModel";
import ChartComponent from "@/components/ChartComponent.vue";

const pipelineVM = new CurveViewModel();
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-center py-8">
      <ChartComponent :tdhMaxData="pipelineVM.tdhMaxData.value"
                      :tdhMinData="pipelineVM.tdhMinData.value"/>
    </div>
    <h2 class="text-lg font-semibold mb-4">Pipeline Information</h2>

    <form class="grid gap-4 grid-cols-2" @submit.prevent="pipelineVM.submitForm">
      <label>
        Inlet Flow Rate
        <input v-model="pipelineVM.pipeline.startFlowRate" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Discharge Flow Rate
        <input v-model="pipelineVM.pipeline.endFlowRate" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Inlet Pressure
        <input v-model="pipelineVM.pipeline.startPressure" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Discharge Pressure
        <input v-model="pipelineVM.pipeline.endPressure" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Inlet Minimum Elevation
        <input v-model="pipelineVM.pipeline.startEleMin" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Discharge Minimum Elevation
        <input v-model="pipelineVM.pipeline.endEleMin" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Inlet Maximum Elevation
        <input v-model="pipelineVM.pipeline.startEleMax" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label>
        Discharge Maximum Elevation
        <input v-model="pipelineVM.pipeline.endEleMax" type="number"
               class="border-b border-b-blue-600 block w-full">
      </label>

      <label class="flex items-center">
        <input v-model="pipelineVM.pipeline.isEndDayLighted" type="checkbox" class="mr-2"> End
        Daylighted
      </label>

      <label class="flex items-center">
        <input v-model="pipelineVM.pipeline.isMetric" type="checkbox" class="mr-2"> Metric Units
      </label>

      <h2 class="text-lg font-semibold mt-8 mb-4 col-span-2">Pipeline Sections</h2>

      <div v-for="(section, index) in pipelineVM.pipeline.sections" :key="index"
           class="p-4 border rounded-lg mb-4 col-span-2">
        <h3 class="text-md font-medium">Section {{ index + 1 }}</h3>

        <div class="grid gap-4 grid-cols-2">
          <label>
            Absolute Roughness
            <input v-model="section.absoluteRoughness" type="number"
                   class="border-b border-b-blue-600 block w-full">
          </label>

          <label>
            Section Length
            <input v-model="section.sectionLength" type="number"
                   class="border-b border-b-blue-600 block w-full">
          </label>

          <label>
            Diameter
            <input v-model="section.diameter" type="number"
                   class="border-b border-b-blue-600 block w-full">
          </label>

          <label>
            Material
            <input v-model="section.material" type="text"
                   class="border-b border-b-blue-600 block w-full">
          </label>

          <label>
            Inlet Pressure
            <input v-model="section.inletPressure" type="number"
                   class="border-b border-b-blue-600 block w-full">
          </label>

          <label>
            Outlet Pressure
            <input v-model="section.outletPressure" type="number"
                   class="border-b border-b-blue-600 block w-full">
          </label>

          <div class="col-span-2">
            <h4 class="text-md font-medium mb-2">K-Values</h4>
            <div v-for="(kValue, kIndex) in section.kValues" :key="kIndex"
                 class="flex items-center space-x-2 mb-2">
              <input v-model="section.kValues[kIndex]" type="number"
                     class="border-b border-b-blue-600 block w-full">
              <button type="button" class="text-red-500" @click="section.kValues.splice(kIndex, 1)">
                Remove
              </button>
            </div>
            <button type="button" class="text-blue-600 underline" @click="section.kValues.push(0)">
              Add K-Value
            </button>
          </div>
        </div>

        <button type="button" class="text-red-500 mt-2" @click="pipelineVM.removeSection(index)">
          Remove
          Section
        </button>
      </div>

      <button type="button" class="text-blue-600 underline mt-4 col-span-2"
              @click="pipelineVM.addSection">Add
        Section
      </button>

      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded mt-4 col-span-2">
        Submit Pipeline Data
      </button>
    </form>
  </div>
</template>
