<script setup lang="ts">
import CurveViewModel from '@/viewmodels/CurveViewModel'
import ChartComponent from '@/components/ChartComponent.vue'
import PipelineFormComponent from '@/components/PipelineFormComponent.vue'
import type { pipeline } from '@/customTypes.ts'

const curveVM = new CurveViewModel()

function onSubmitPipeline(newData: pipeline) {
  Object.assign(curveVM.pipeline, newData)
  curveVM.submitForm()
}
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

    <PipelineFormComponent :pipeline="curveVM.pipeline" @submit-pipeline="onSubmitPipeline" />
  </div>
</template>
