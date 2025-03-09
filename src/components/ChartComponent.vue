<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";
import {ChartViewModel} from "@/viewmodels/ChartViewModel.ts";

const props = defineProps<{
  tdhMaxData: Array<[number, number]>,
  tdhMinData: Array<[number, number]>
}>();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const chartVM = new ChartViewModel();

onMounted(() => {
  if (chartCanvas.value) chartVM.initChart(chartCanvas.value, props.tdhMaxData);
});

watch(() => [props.tdhMaxData, props.tdhMinData], ([newMaxData, newMinData]) => chartVM.updateChart(newMaxData, newMinData));

onUnmounted(() => {
  chartVM.destroyChart();
})
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 800px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  height: 100%;
  width: 100%;
}
</style>
