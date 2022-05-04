import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeComponent } from '../core/pages/home/home.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { StartComponent } from './pages/start-page/start.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  //  canActivate: [AuthGuard],
    children: [
      {
        path: 'start',
        component: StartComponent,
      },
      {
        path: 'search',
        component: SearchResultsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth-routing.module')
          .then(m => m.AuthRoutingModule),
      },
      {
        path: 'video/:id',
        component: ItemPageComponent,
        canActivate: [AuthGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule { }
