import {Chart, registerables, type ChartOptions} from "chart.js";

export class ChartViewModel {
  constructor(private _chartInstance: Chart | null = null) {
    Chart.register(...registerables);
  }

  public initChart(canvas: HTMLCanvasElement, tdhMaxData: Array<[number, number]> | null = null, tdhMinData: Array<[number, number]> | null = null) {
    if (!canvas) return;
    if (this._chartInstance) this.destroyChart();

    canvas.height = 400;
    canvas.width = 800;

    this._chartInstance = new Chart(canvas, {
      type: 'scatter',
      data: this.getChartData(tdhMaxData, tdhMinData),
      options: this.getChartOptions(),
      plugins: this.getCustomPlugins(),
    });
  }

  public updateChart(tdhMaxData: Array<[number, number]>, tdhMinData: Array<[number, number]>) {
    if (!this._chartInstance) return;
    this._chartInstance.data = this.getChartData(tdhMaxData, tdhMinData);
    this._chartInstance.update();
  }

  public destroyChart(): void {
    if (this._chartInstance) {
      this._chartInstance.destroy();
      this._chartInstance = null;
    }
  }

  private getChartData(tdhMaxData: Array<[number, number]> | null, tdhMinData: Array<[number, number]> | null) {
    if (!tdhMaxData || tdhMaxData.length === 0 || !tdhMinData || tdhMinData.length === 0) return {datasets: []};

    return {
      datasets: [
        {
          label: "TDH Max",
          data: tdhMaxData.map(([x, y]) => ({x, y})),
          backgroundColor: "blue",
          borderColor: "blue",
          showLine: true,
        },
        {
          label: "TDH Min",
          data: tdhMinData.map(([x, y]) => ({x, y})),
          backgroundColor: "green",
          borderColor: "green",
          showLine: true,
        },
      ],
    };
  }

  private getChartOptions(): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: "System TDH vs Flow Rate",
          color: "white",
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "Flow Rate",
            color: "white",
          },
          ticks: {
            color: "white",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Max TDH",
            color: "white",
          },
          ticks: {
            color: "white",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    };
  }

  private getCustomPlugins() {
    return [
      {
        id: "background-color",
        beforeDraw: (chart: Chart) => {
          const ctx = chart.canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#141e30"; // Midnight blue background
            ctx.fillRect(0, 0, chart.width, chart.height);
          }
        },
      },
    ];
  }

  get chartInstance(): Chart | null {
    return this._chartInstance;
  }

  set chartInstance(chartInstance: Chart | null) {
    this._chartInstance = chartInstance;
  }
}
