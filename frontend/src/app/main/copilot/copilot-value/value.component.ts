import { Component } from '@angular/core';
import { AppModule } from '../../../app.module';
import { AdoptionChartComponent } from "./adoption-chart/adoption-chart.component";
import { ActivityResponse, SeatService } from '../../../services/seat.service';
import { DailyActivityChartComponent } from './daily-activity-chart/daily-activity-chart.component';
import { TimeSavedChartComponent } from './time-saved-chart/time-saved-chart.component';

@Component({
  selector: 'app-value',
  standalone: true,
  imports: [
    AppModule,
    AdoptionChartComponent,
    DailyActivityChartComponent,
    TimeSavedChartComponent
  ],
  templateUrl: './value.component.html',
  styleUrl: './value.component.scss'
})
export class CopilotValueComponent {
  activityData?: ActivityResponse;
  constructor(
    private seatService: SeatService,
  ) { }

  ngOnInit() {
    this.seatService.getActivity().subscribe(data => {
      this.activityData = data;
    });
  }
}
