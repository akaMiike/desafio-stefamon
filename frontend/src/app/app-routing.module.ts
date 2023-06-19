import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatalhaComponent } from './modules/batalha/batalha.component';
import { HomeComponent } from './modules/home/home.component';
import { LojaComponent } from './modules/loja/loja.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'batalha', component: BatalhaComponent, canActivate: [AuthGuard]},
  { path: 'loja', component: LojaComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
