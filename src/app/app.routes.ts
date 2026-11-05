import { Routes } from '@angular/router';
import { DemoList } from './demos/demo-list/demo-list';
import { DemoDetail } from './demos/demo-detail/demo-detail';
export const routes: Routes = [
  { path: '', component: DemoList },
  { path: 'demos/:id', component: DemoDetail }
];
