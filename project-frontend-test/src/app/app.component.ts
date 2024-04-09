import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const firstChild = this.route.snapshot.firstChild;
        if (firstChild && firstChild.routeConfig) {
          const currentRoute = firstChild.routeConfig.path;
          const isAuthRequired = this.isAuthRequiredRoute(currentRoute);
          if (isAuthRequired && !this.isAuthLocalStoragePresent()) {
            this.router.navigate(['/login']);
          }
        }
      }
    });
  }

  isAuthRequiredRoute(route: string | undefined): boolean {
    const protectedRoutes: string[] = ['/dashboard'];
    return !!route && protectedRoutes.includes(route);
  }

  isAuthLocalStoragePresent(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
