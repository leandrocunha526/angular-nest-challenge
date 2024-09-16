import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { DeviceRegisterComponent } from './device-register/device-register.component';
import { DevicesDetailComponent } from './devices-detail/devices-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        UserRegisterComponent,
        DashboardComponent,
        DeviceRegisterComponent,
        DevicesDetailComponent,
        UserProfileComponent,
        UpdateDeviceComponent,
        ConfirmationModalComponent,
        UpdateUserComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule], providers: [AuthGuard, AuthService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
