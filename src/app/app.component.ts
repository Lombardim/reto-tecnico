import {Component, OnInit} from '@angular/core';
import {IconsInterface} from "./shared/types/icons.interface";
import {ScreenChangesListenerService} from "./shared/services/screen-changes-listener.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reto-tecnico';
  private lastVH: number = -1;
  private lastVW: number = -1;
  private _icons: IconsInterface[] = [
    {
      name: 'visibility-on',
      path: '../assets/svg/visibility_on.svg'
    },
    {
      name: 'visibility-off',
      path: '../assets/svg/visibility_off.svg'
    },
    {
      name: 'dashboard',
      path: '../assets/svg/dashboard.svg'
    },
    {
      name: 'home',
      path: '../assets/svg/home.svg'
    },
    {
      name: 'search',
      path: '../assets/svg/search.svg'
    },
    {
      name: 'filter',
      path: '../assets/svg/filter.svg'
    },
    {
      name: 'menu',
      path: '../assets/svg/menu.svg'
    },
    {
      name: 'log-out',
      path: '../assets/svg/log-out.svg'
    }
  ];

  constructor(
    private screenChangesListenerService: ScreenChangesListenerService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this._icons.forEach((icon) =>
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      )
    );
  }

  ngOnInit(){
    /**
     *capture the size of the viewport height
     *calculate the equivalence to 1vh and
     *save the value creating a css variable
     */
    const calculateViewport = () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      let vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--vw', `${vw}px`);
      this.screenChangesListenerService.screenSize.next(vw);
      this.screenChangesListenerService.globalScreenSize.next(vw);
      this.screenChangesListenerService.screenHeight.next(vh);
      return {vh, vw};
    };
    window.addEventListener('resize', calculateViewport);
    let eventFired = false;
    window.addEventListener('orientationchange', () => {
      if(eventFired){ return; }
      eventFired = true;
      let running = true;
      for(const delay of [50, 100, 200, 300, 500, 800, 1000]){
        setTimeout(() => {
          if(running){
            const {vh,vw} = calculateViewport();
            if(vh !== this.lastVH || vw !== this.lastVW){
              this.lastVH = vh;
              this.lastVW = vw;
              running = false;
            }
          }
        }, delay);
      }
      eventFired = false;
    });
    const {vh,vw} = calculateViewport();
    this.lastVH = vh;
    this.lastVW = vw;
  }
}
