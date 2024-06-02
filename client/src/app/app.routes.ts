import { Routes } from '@angular/router';
import { TrackerComponent } from './tracker/tracker.component';
import { DriverComponent } from './driver/driver.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: 'tracker', component: TrackerComponent },
  { path: 'driver', component: DriverComponent },
  { path: 'admin', component: AdminComponent },
];
