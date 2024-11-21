import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { Seat } from '../../../../../services/seat.service';

@Component({
  selector: 'app-active-users-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  template: `<highcharts-chart 
    [Highcharts]="Highcharts"
    [options]="_chartOptions"
    [(update)]="updateFlag"
    style="width: 200px; height: 200px;">
  </highcharts-chart>`
})
export class ActiveUsersChartComponent {
  @Input() data?: Record<string, number>;
  @Input() allSeats?: Seat[];
  @Input() chartOptions?: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  _chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: { text: undefined },
    legend: { enabled: false },
    xAxis: {
      crosshair: false,
      visible: false,
    },
    series: [{
      name: 'Activity',
      type: 'bar',
      data: this.data ? Object.values(this.data) : [],
      colorByPoint: true,
      borderWidth: 0,
    }],
    tooltip: {
      pointFormat: '<span style="padding:0">{point.y: .1f} hours</span>',
      headerFormat: '',
      formatter: function () {
        console.log(this);
        const hours = (this.y || 0) / (1000 * 60 * 60); // Convert ms to hours
        return `<span style="padding:0">@${this.key}</span><br>
        <span style="padding:0">${hours.toFixed(1)} hours</span>`;
      },
      outside: false,
      distance: 30
    },
    plotOptions: {
      bar: {
        dataLabels: [{
          enabled: true,
          formatter: function () {
            return `<div style="width: 20px; height: 20px; overflow: hidden; border-radius: 50%; margin-right: -25px">
            <img src="https://github.com/${this.key}.png" style="width: 30px; margin-left: -5px; margin-top: -2px"> 
          </div>`
          },
          useHTML: true,
          align: 'left'
        }]
      }
    }
  }

  ngOnChanges() {
    this._chartOptions = Object.assign({}, this.chartOptions, this._chartOptions);
    if (this._chartOptions?.series && this.data) {
      (this._chartOptions?.series as Highcharts.SeriesBarOptions[])[0].data = Object.values(this.data);
      this.updateFlag = true;
    }
  }
}