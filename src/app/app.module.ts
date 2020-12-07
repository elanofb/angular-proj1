import { OverlayModule } from "@angular/cdk/overlay";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  AlertService,
  TesteFrontConfig,
  KeycloakService,
  MobileQueryService,
  ThemeService,
  UserSession
} from "@internal-apps/hsdg-front-lib";
import { CookieService } from "ngx-cookie-service";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { AuthGuard } from "./auth.guard";
import {
  CommodityRestrictionsComponent,
  DeleteRestrictionDialog,
  NewRestrictionDialog
} from "./commodity-restrictions/commodity-restrictions.component";
import { frontLibConfigs } from "./configs/TesteFrontConfig";
...
import { ChangeBooleanToYNPipe } from './...';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ...
    ChangeBooleanToYNPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ErrorModule,
    DataSourcesModule,
    MaterialModule,
    TesteFrontModule,
    HsdgFrontLibModule.forRoot(frontLibConfigs),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    NewRestrictionDialog,
	...
    NotificationFormComponent
],
  providers: [
    HttpClientModule,
    AuthGuard,
    AlertService,
    ThemeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    UserSession,
    MobileQueryService,
    KeycloakService,
    ThemeService,
    CookieService,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" }, // sets date format to DD/MM/YYYY
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
