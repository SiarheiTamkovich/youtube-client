import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../core/pages/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: 'search', component: SearchResultsComponent},
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth-routing.module')
          .then(m => m.AuthRoutingModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule { }
