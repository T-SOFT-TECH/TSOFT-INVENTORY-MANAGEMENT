import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Chart} from 'chart.js/auto';

export type ChartType = 'line' | 'bar' | 'doughnut' | 'pie' | 'radar' | 'polarArea';


@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements AfterViewInit, OnChanges{

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() type: ChartType = 'bar';
  @Input() data: any = { labels: [], datasets: [] };
  @Input() options: any = {};
  @Input() height: string = '300px';
  @Input() colors: string[] = [
    '#4F46E5', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  private chart: Chart | null = null;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['data'] || changes['type'] || changes['options']) && this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }

  private createChart() {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Apply default colors to datasets if not specified
    if (this.data.datasets) {
      this.data.datasets.forEach((dataset: any, index: number) => {
        if (!dataset.backgroundColor) {
          const colorIndex = index % this.colors.length;

          if (this.type === 'line') {
            dataset.borderColor = this.colors[colorIndex];
            dataset.backgroundColor = 'transparent';
          } else if (this.type === 'bar') {
            dataset.backgroundColor = this.colors[colorIndex];
          } else {
            dataset.backgroundColor = this.data.datasets.length === 1
              ? this.colors
              : this.colors[colorIndex];
          }
        }
      });
    }

    // Default options based on chart type
    const defaultOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          padding: 10,
          cornerRadius: 4,
          caretSize: 6,
        }
      }
    };

    // Special options for different chart types
    if (this.type === 'line') {
      defaultOptions.elements = {
        line: {
          tension: 0.3,
        },
        point: {
          radius: 2,
          hoverRadius: 5,
        }
      };
    }

    // Merge default options with provided options
    const mergedOptions = {...defaultOptions, ...this.options};

    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: mergedOptions
    });
  }

  public updateChart(data: any, options?: any) {
    if (!this.chart) return;

    this.chart.data = data;
    if (options) {
      this.chart.options = {...this.chart.options, ...options};
    }
    this.chart.update();
  }

  public destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }


}
