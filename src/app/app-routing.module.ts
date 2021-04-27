import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileGaurd } from './pages/profile/profile.guard';

const routes: Routes = [
  // ===== Uncomment if Path.Home is different from empty =====
  // { path: '', redirectTo: Path.Home, pathMatch: 'full' },

  // Public
  {
    path: '',
    loadChildren: () =>
      import('@pages/login/login.module').then((m) => m.LoginModule),
  },

  // Auth
  {
    path: 'profile',
    canActivate: [ProfileGaurd],
    loadChildren: () =>
      import('@pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  // Not found page (must go at the bottom)
  {
    path: '**',
    loadChildren: () =>
      import('@pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
