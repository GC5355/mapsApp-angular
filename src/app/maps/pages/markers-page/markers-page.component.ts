import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'


interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlainMarker {
  color: string,
  lngLat: number[]
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

    this.readFromLocalStorage()


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

     this.saveToLocalStorage();

     marker.on('dragend' , () => {                  // Para guardar la ubicacion del marker cuando lo muevo haciendo drag & drop
      this.saveToLocalStorage();
     });

  }

  deteleMarker( index: number) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }


  flyTo( marker: Marker ){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })

  }



  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    console.log(plainMarkersString);

    const plainMarkers : PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color,lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    })

  }



}
