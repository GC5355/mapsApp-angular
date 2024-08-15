import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat } from 'mapbox-gl';
import { Map } from 'mapbox-gl'

@Component({
  selector: 'maps-zoom-range',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40)


  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento html no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }


                                                                // Listeners del map
  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {                            // Para establecer un limite de zoom a 18
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18)
    })

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
    })

  }
                                                              // Para limpiar los listeners
  ngOnDestroy(): void {
    this.map?.remove();
  }



  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

}
