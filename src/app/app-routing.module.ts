import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard';
import { LayoutComponent } from './layouts/layout/layout.component';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {PatientsComponent} from "./component/patient/patients.component";


const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard]  },
      // { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard]  },
      {
        path: 'patients',
        loadChildren: () => import('./component/patient/patient.module').then(m => m.PatientModule),
        canActivate: [AuthGuard]
      }
    ]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
