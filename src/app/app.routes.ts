import { Routes } from '@angular/router';
import { DemoList } from './demos/demo-list/demo-list';
import { DemoDetail } from './demos/demo-detail/demo-detail';
import { DemoCreate} from './demos/demo-create/demo-create';
export const routes: Routes = [
  { path: '', component: DemoList },
  { path: 'demos/new', component: DemoCreate },
  { path: 'demos/:id', component: DemoDetail }
];
