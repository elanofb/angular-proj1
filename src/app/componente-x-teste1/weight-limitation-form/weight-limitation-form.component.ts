import { Component, OnInit, Inject, Optional, HostBinding } from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ThemeService, AlertService, KeycloakService } from '@internal-apps/hsdg-front-lib';
import { Observable, Subject, of } from 'rxjs';
import { startWith, map, debounceTime, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-weight-limitation-form',
  templateUrl: './weight-limitation-form.component.html',
  styleUrls: ['./weight-limitation-form.component.css']
})
export class WeightLimitationFormComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  form: FormGroup;
  userRoles;

  limitFilterDebounce = new Subject<string>();
  limitNotFound: boolean;
  loadingWeightLimitations: boolean;
  errorLoadingLimits: boolean;
  isLimitSelected = false;
  showShouldSelectMessage = false;

  constructor(
    protected dialogRef: MatDialogRef<WeightLimitationFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,    
    private alertService: AlertService
  ) { }

  displayFn(element?) {
    return element ? element.name : undefined;
  }

  ngOnInit() {
    this.themeService.getObservable().subscribe(
      theme => {
        this.componentCssClass = theme;
      }
    );

    if (this.data) {
      this.form = this.formBuilder.group({
        id: [this.data.id],
        stateDestination: [this.data.stateDestination],
        pod: [this.data.pod],
        country: [this.data.country],
        mode: [this.data.mode],
        limit: [this.data.limit],
      });
    } else {
      this.form = this.formBuilder.group({
        id: [""],
        stateDestination: [""],
        pod: [""],
        country: [""],
        mode: [""],
        limit: [""],
      });
    }

    this.limitFilterDebounce.pipe(debounceTime(250)).subscribe(filter => {
      this.findLimits(filter);
    });    
    
  }

  checkLimit() {
    if (!this.isLimitSelected && !this.limitNotFound) {
      this.showShouldSelectMessage = true;
    }
  }

  markLimitAsSelected() {
    this.isLimitSelected = true;
    this.showShouldSelectMessage = false;
  }

  clearLimitSelection() {
    this.isLimitSelected = false;
  }

  private findLimits(filter: string) {
    this.showShouldSelectMessage = false;
    this.limitNotFound = false;
    this.errorLoadingLimits = false;

    if (this.isLimitSelected || filter.length === 0) {      
      return;
    }
    this.loadingWeightLimitations = true;

  } 

}
