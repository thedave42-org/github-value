import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppModule } from '../../../app.module';
import { CopilotSurveyService, Survey } from '../../../services/copilot-survey.service';
import { ColumnOptions } from '../../../shared/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copilot-surveys',
  standalone: true,
  imports: [
    AppModule,
    MaterialModule
  ],
  templateUrl: './copilot-surveys.component.html',
  styleUrl: './copilot-surveys.component.scss'
})
export class CopilotSurveysComponent implements OnInit {
  surveys?: Survey[];
  surveysColumns: ColumnOptions[] = [
    { columnDef: 'id', header: 'ID', cell: (element: Survey) => `${element.id}` },
    { columnDef: 'userId', header: 'Author', cell: (element: Survey) => `${element.userId}`, link: (element: Survey) => `https://github.com/${element.userId}` },
    { columnDef: 'usedCopilot', header: 'Used Copilot', cell: (element: Survey) => `${element.usedCopilot}` },
    { columnDef: 'percentTimeSaved', header: 'Time Saved', cell: (element: Survey) => `${element.percentTimeSaved}%` },
    { columnDef: 'timeUsedFor', header: 'Time Used For', cell: (element: Survey) => this.formatTimeUsedFor(element.timeUsedFor) },
    { columnDef: 'prNumber', header: 'PR', cell: (element: Survey) => `${element.repo}#${element.prNumber}`, link: (element: Survey) => `https://github.com/${element.owner}/${element.repo}/pull/${element.prNumber}` },
    { columnDef: 'dateTime', header: 'Date Time', cell: (element: Survey) => new Date(element.dateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) },
    // { columnDef: 'reason', header: 'Reason', cell: (element: Survey) => element.reason || '-' },
  ];

  constructor(
    private copilotSurveyService: CopilotSurveyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.copilotSurveyService.getAllSurveys().subscribe((surveys) => {
      this.surveys = surveys;
    });
  }

  formatTimeUsedFor(s: string) {
    switch (s) {
      case 'fasterPRs':
        return "Faster PRs";
      case 'fasterReleases':
        return 'Faster Releases';
      case 'repoHousekeeping':
        return 'Housekeeping';
      case 'techDebt':
        return 'Tech Debt';
      case 'experimentLearn':
        return 'Experiment or Learn';
      case 'other':
        return 'Other';
      default:
        return 'Unknown';
    }
  }

  onSurveyClick(survey: Survey) {
    this.router.navigate(['/copilot/surveys', survey.id]);
  }
}
