import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';
import { MaterialModule } from 'src/app/utils/material.module';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    MaterialModule,
    RouterModule
  ]
})
export class ErrorModule { }
