import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService, MobileQueryService, HsdgMenuComponent } from '@internal-apps/hsdg-front-lib';
import { IconsRegister } from './configs/icon-register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.scss'],
})
export class AppComponent implements OnInit {

  isMobile = false;

  @HostBinding('class') componentCssClass;

  @Input()
  menu: HsdgMenuComponent;


  constructor(
    private mobileQueryService: MobileQueryService,
    private themeService: ThemeService,
    private iconsRegister: IconsRegister
  ) { }

  ngOnInit() {
    this.iconsRegister.register();

    this.mobileQueryService.getObservable().subscribe(result => {
      this.isMobile = result.matches;
    });

    this.themeService.getObservable().subscribe(
      theme => {
        this.componentCssClass = theme;
      }
    );

  }


}
