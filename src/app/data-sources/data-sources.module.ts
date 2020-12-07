import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataSourceTemplateComponent } from './data-source-template/data-source-template.component';
import { CrifComponent } from './crif/crif.component';
import { MaterialModule } from '../utils/material.module';
import { FreeTimeDetentionComponent } from './free-time-detention/free-time-detention.component';


@NgModule({
  declarations: [
    DataSourceTemplateComponent,
    CrifComponent,
    FreeTimeDetentionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DataSourceTemplateComponent,
    CrifComponent,
    FreeTimeDetentionComponent
  ]
})
export class DataSourcesModule { }
