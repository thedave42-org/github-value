import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { Survey } from '../../../../services/copilot-survey.service';
import { HighchartsService } from '../../../../services/highcharts.service';

@Component({
  selector: 'app-time-saved-chart',
  standalone: true,
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './time-saved-chart.component.html',
  styleUrl: './time-saved-chart.component.scss'
})
export class TimeSavedChartComponent implements OnInit, OnChanges {
  @Input() surveys?: Survey[];
  @Input() chartOptions?: Highcharts.Options;
  @Output() chartInstanceChange = new EventEmitter<Highcharts.Chart>();
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  _chartOptions: Highcharts.Options = {
    yAxis: {
      title: {
        text: 'Time Saved (%)'
      },
      min: 0,
      max: 100,
      labels: {
        format: '{value}%'
      },
      plotBands: [{
        from: 5,
        to: 15,
        color: 'var(--sys-surface-variant)',
        label: {
          text: 'Typical Range',
          style: {
            color: 'var(--sys-on-surface-variant)'
          }
        }
      }],
      plotLines: [{
        value: 10,
        color: 'var(--sys-primary)',
        dashStyle: 'Dash',
        width: 2,
        label: {
          text: 'Target Level',
          align: 'left',
          style: {
            color: 'var(--sys-primary)'
          }
        },
        zIndex: 2
      }]
    },
    tooltip: {
      headerFormat: '<b>{point.x:%b %d, %Y}</b><br/>',
      pointFormat: [
        '{series.name}: ',
        '<b>{point.y:.1f}%</b>'
      ].join(''),
      style: {
        fontSize: '14px'
      }
    },
    series: [{
      name: 'Time Saved',
      type: 'spline',
      data: []
    }, {
      type: 'scatter',
      name: 'Observations',
      data: []
    }],
    legend: {
      enabled: false
    }
  };

  constructor(
    private highchartsService: HighchartsService
  ) { }

  ngOnInit() {
    this._chartOptions = {
      ...this._chartOptions,
      ...this.chartOptions
    }
  }

  ngOnChanges() {
    if (this.surveys) {
      this._chartOptions = {
        ...this._chartOptions,
        ...this.highchartsService.transformSurveysToScatter(this.surveys)
      };
      this.updateFlag = true;
    }
  }

}
