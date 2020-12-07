import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '@internal-apps/hsdg-front-lib';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css']
})
export class ConfirmActionComponent implements OnInit {

  @HostBinding('class') componentCssClass;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmActionComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private themeService: ThemeService
  ) { }


  ngOnInit(){
    this.message = this.data.message;

    this.themeService.getObservable().subscribe(
      theme => {
        this.componentCssClass = theme;
      }
    );
  }

}
