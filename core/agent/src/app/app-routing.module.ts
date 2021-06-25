import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'agent',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'agent',
    loadChildren: () =>
      import('./pages/about/about.module').then(
        (m) => m.AboutModule
      ),
  },
  {
    path: 'agent',
    loadChildren: () =>
      import('./pages/embed/embed.module').then(
        (m) => m.EmbedModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
