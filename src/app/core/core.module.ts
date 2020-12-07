import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConfirmActionComponent } from './confirm-action/confirm-action.component';
import { DefaultTableComponent } from './default-table/default-table.component';
import { MaterialModule } from '../utils/material.module';

@NgModule({
    declarations: [
        ConfirmActionComponent,
        DefaultTableComponent
    ],
    exports: [
        ConfirmActionComponent,
        DefaultTableComponent
    ],
    imports: [
        MaterialModule,
        RouterModule,
        FormsModule
    ]
})
export class CoreModule {}
