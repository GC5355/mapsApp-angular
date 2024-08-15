import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'


interface MarkerAndColor {
  color: string,
  marker: Marker
}

@Component({
  selector: 'maps-markers',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40)


  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento html no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });


    // ---  Para cambiar los estilos del marcador ---
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Tito Cardoso'

    // const  marker = new Marker({
    //   //color: 'red'
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo( this.map )
  }


  createMarker(){
    if( ! this.map) return

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));      // genera un color hexadecimal de forma aleatoria
    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color)

  }


  addMarker ( lngLat : LngLat, color : string){
    if ( ! this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat( lngLat )
    .addTo( this.map )

    this.markers.push({
      marker: marker,
      color: color
     });
  }

  deteleMarker( index: number) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }


}
