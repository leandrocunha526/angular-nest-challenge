import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DeviceRegisterComponent } from './device-register/device-register.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { DevicesDetailComponent } from './devices-detail/devices-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: UserRegisterComponent },
  {
    path: 'register',
    component: DeviceRegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update/:id',
    component: UpdateDeviceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DevicesDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
