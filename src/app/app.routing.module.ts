import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./core/error/error.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth.guard";
...
import { NotificationComponent } from "./notification/notification.component";
import { SchedulesComponent } from "./schedules/schedules.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ["USER"] }
  },
	...
  {
    path: "notifications",
    component: NotificationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        "NOTIFICATION_CREATE",
        "NOTIFICATION_UPDATE",
        "NOTIFICATION_DELETE"
      ]
    }
  },

  { path: "**", component: ErrorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
