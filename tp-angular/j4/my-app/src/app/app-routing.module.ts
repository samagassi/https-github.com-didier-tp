import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDeviseComponent } from './admin-devise/admin-devise.component';
import { BasicComponent } from './basic/basic.component';
import { GardienAuth } from './common/gard/gardiens';
import { ConversionComponent } from './conversion/conversion.component';
import { DemoComponent } from './demo/demo.component';
import { DeviseComponent } from './devise/devise.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'ngr-welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
  { path: 'ngr-login', component: LoginComponent },
  { path: 'ngr-basic', component: BasicComponent },
  { path: 'ngr-devise', component: DeviseComponent },
  { path: 'ngr-admin-devise', component: AdminDeviseComponent , canActivate : [GardienAuth] },
  { path: 'ngr-conversion', component: ConversionComponent },
  { path: 'ngr-demo', component: DemoComponent },
  { path : "ngr-not-authorized" , component : NotAuthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
