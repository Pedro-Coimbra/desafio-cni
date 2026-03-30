import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chamados'
  },
  {
    path: 'chamados',
    loadComponent: () =>
      import('./chamados/pages/chamados-lista-page/chamados-lista-page.component').then(
        (module) => module.ChamadosListaPageComponent
      )
  },
  {
    path: 'chamados/novo',
    loadComponent: () =>
      import('./chamados/pages/novo-chamado-page/novo-chamado-page.component').then(
        (module) => module.NovoChamadoPageComponent
      )
  },
  {
    path: 'chamados/:id/editar',
    loadComponent: () =>
      import('./chamados/pages/novo-chamado-page/novo-chamado-page.component').then(
        (module) => module.NovoChamadoPageComponent
      )
  },
  {
    path: '**',
    redirectTo: 'chamados'
  }
];
