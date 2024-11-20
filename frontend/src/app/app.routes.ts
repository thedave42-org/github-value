import { Routes } from '@angular/router';
import { NewCopilotSurveyComponent } from './main/copilot/copilot-surveys/new-copilot-survey/new-copilot-survey.component';
import { CopilotSurveysComponent } from './main/copilot/copilot-surveys/copilot-surveys.component';
import { SettingsComponent } from './main/settings/settings.component';
import { InstallComponent } from './install/install.component';
import { SetupGuard } from './guards/setup.guard';
import { MainComponent } from './main/main.component';
import { CopilotDashboardComponent } from './main/copilot/copilot-dashboard/dashboard.component';
import { CopilotValueComponent } from './main/copilot/copilot-value/value.component';
import { CopilotMetricsComponent } from './main/copilot/copilot-metrics/copilot-metrics.component';
import { CopilotSeatsComponent } from './main/copilot/copilot-seats/copilot-seats.component';
import { CopilotCalculatorComponent } from './main/copilot/copilot-calculator/copilot-calculator.component';
import { DbLoadingComponent } from './install/db-loading/db-loading.component';
import { CopilotSurveyComponent } from './main/copilot/copilot-surveys/copilot-survey-details/copilot-survey.component';
import { CopilotSeatComponent } from './main/copilot/copilot-seats/copilot-seat/copilot-seat.component';

export const routes: Routes = [
  { path: 'setup', component: InstallComponent },
  { path: 'setup/loading', component: DbLoadingComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [SetupGuard],
    canActivateChild: [SetupGuard],
    children: [
      { path: 'copilot', component: CopilotDashboardComponent, title: 'Dashboard' },
      { path: 'copilot/value', component: CopilotValueComponent, title: 'Value' },
      { path: 'copilot/metrics', component: CopilotMetricsComponent, title: 'Metrics' },
      { path: 'copilot/seats', component: CopilotSeatsComponent, title: 'Seats' },
      { path: 'copilot/seats/:id', component: CopilotSeatComponent, title: 'Seat' },
      { path: 'copilot/calculator', component: CopilotCalculatorComponent, title: 'Calculator' },
      { path: 'copilot/surveys', component: CopilotSurveysComponent, title: 'Surveys' },
      { path: 'copilot/surveys/new', component: NewCopilotSurveyComponent, title: 'New Survey' },
      { path: 'copilot/surveys/:id', component: CopilotSurveyComponent, title: 'Survey' },
      { path: 'settings', component: SettingsComponent, title: 'Settings' },
      { path: '', redirectTo: 'copilot', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];