import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconsRegister {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){}

  public register() {
    this.matIconRegistry.addSvgIcon(
      'food-grade',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/food-grade.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'weight',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/weight.svg')
    );
  }

}
