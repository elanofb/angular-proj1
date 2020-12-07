import { Component, HostBinding, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService, AlertService, KeycloakService } from '@internal-apps/hsdg-front-lib';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css']
})
export class NotificationFormComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  form: FormGroup;
  userRoles: string[] = [];

  showServiceCenter: string;

  constructor(protected dialogRef: MatDialogRef<NotificationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private alertService: AlertService) { }

  displayFn(element?) {
    return element ? element.name : undefined;
  }

  ngOnInit() {
    this.showItemsByRoles();
    this.themeService.getObservable().subscribe(
      theme => {
        this.componentCssClass = theme;
      }
    );

    if (this.data) {
      this.form = this.formBuilder.group({
        id: [this.data.id],
        serviceCenter: [this.data.serviceCenter, Validators.required],
        pol: [this.data.pol, Validators.required],
        pod: [this.data.pod, Validators.required],
        trade: [this.data.trade],
        message: [this.data.message, Validators.required]
      });
    } else {
      this.form = this.formBuilder.group({
        id: [""],
        serviceCenter: ["", Validators.required],
        pol: ["", Validators.required],
        pod: ["", Validators.required],
        trade: [""],
        message: ["", Validators.required]
      });
    }
  }

  showItemsByRoles() {
    try {
      this.userRoles =
        KeycloakService.auth.authz.tokenParsed.resource_access[
          "booking-creation-guide"
        ].roles;
    } catch (e) { }

    if (this.userRoles.includes('BRASIL')) {
      this.showServiceCenter = 'BRASIL';
    }

    if (this.userRoles.includes('PLATE')) {
      this.showServiceCenter = 'PLATE';
    }

    if (this.userRoles.includes('ALL_ACCESS_COUNTRY')) {
      this.showServiceCenter = 'ALL_ACCESS_COUNTRY';
    }
  }

}
