import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { MapsRoutingModule } from './maps-routing.module';


import * as mapboxgl from 'mapbox-gl';

mapboxgl.default.accessToken = 'pk.eyJ1IjoiZ2M1MzU1IiwiYSI6ImNsenU3czZzOTIzZmsya3B5ams1Y2lkMHAifQ.ZXILwr1JU6XGSSnTaGOdEQ';


@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    LayoutPageComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule                     // Para que ande el <router-outlet />
  ]
})
export class MapsModule { }
