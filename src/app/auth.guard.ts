import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import {
  AlertService,
  UserSession,
  KeycloakService
} from "@internal-apps/hsdg-front-lib";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  userRoles: string[] = [];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userSession: UserSession
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.userSession.hasCurrentUser()) {
        this.alertService.print("User not found");
        this.navigateToError(state);
    }

    try {
      this.userRoles =
        KeycloakService.auth.authz.tokenParsed.resource_access[
          "booking-creation-guide"
        ].roles;
    } catch (e) {}

    const requiredRoles = route.data.roles;
    let granted = false;

    if (!requiredRoles || requiredRoles.length === 0) {
      granted = true;
    } else {
      for (const requiredRole of requiredRoles) {
        if (this.userRoles.indexOf(requiredRole) > -1) {
          granted = true;
          break;
        }
      }
    }

    if (granted === false) {
      this.navigateToError(state);
    }

    return granted;
  }

  navigateToError(state: RouterStateSnapshot) {
    this.router.navigate(["/error"], {
      queryParams: { returnUrl: state.url }
    });
  }
}
