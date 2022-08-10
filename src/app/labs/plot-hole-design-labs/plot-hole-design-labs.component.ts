import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.pm';
import * as turf from '@turf/turf';


@Component({
  selector: 'app-plot-hole-design-labs',
  templateUrl: './plot-hole-design-labs.component.html',
  styleUrls: ['./plot-hole-design-labs.component.css']
})
export class PlotHoleDesignLabsComponent implements OnInit {
  public map;

  constructor() { }

  ngOnInit(): void {
    this.map = L.map('map').setView([16.742044977987174, 100.19485029705909], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.pm.addControls({
      position: 'topright',
      drawMarker: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: true,
      drawPolygon: true,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false
    });

  }

}
