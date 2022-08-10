import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.pm';
import * as turf from '@turf/turf';


@Component({
  selector: 'app-plot-hole-design',
  templateUrl: './plot-hole-design.component.html',
  styleUrls: ['./plot-hole-design.component.css']
})
export class PlotHoleDesignComponent implements OnInit {
  public map;
  burden = 5
  spacing = 7


  constructor() {

  }

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

    this.map.on('pm:create', (e: any) => {
      var lyr = e.layer;
      var geom = (JSON.stringify(lyr.toGeoJSON().geometry));
      var nietos = [];
      var FeatureCo = {}
      var obj = {
        type: "Feature",
        properties: {
          type: ''
        },
        geometry: JSON.parse(geom)
      };
      FeatureCo["type"] = "FeatureCollection"
      FeatureCo["features"] = [obj]
      nietos.push(FeatureCo)

      this.get_point(nietos[0])


    })
  }

  //plan
  async get_point(data) {
    var explode = turf.explode(data);
    let point_use = []
    for (let i = 0; i < explode.features.length; i++) {
      explode.features[i]
      if (i + 1 == explode.features.length) {
        var distance = turf.distance(explode.features[0], explode.features[i]);
        point_use.push({
          pt1: explode.features[0],
          pt2: explode.features[i],
          distance: distance
        })
        break
      } else {
        var distance = turf.distance(explode.features[i], explode.features[i + 1]);
        point_use.push({
          pt1: explode.features[i],
          pt2: explode.features[i + 1],
          distance: distance
        })
      }
    }
    point_use.sort(function (a, b) {
      return b.distance - a.distance;
    });

    var bearing = turf.bearing(point_use[0].pt1, point_use[0].pt2);

    var st_pt1 = turf.rhumbDestination(point_use[0].pt1, 1, bearing);
    var st_pt2 = turf.rhumbDestination(point_use[0].pt2, 1, bearing - 180);

    let make_point = []

    for (let i = 1; i < ((point_use[0].distance * 1000) / this.burden) * 2; i++) {
      let destination1
      let destination2
      let burden_no = this.burden / 1000
      let spacing_no = ((this.spacing / 1000) * i)
      if (i % 2 == 0) {
        destination1 = turf.rhumbDestination(st_pt1, spacing_no, (bearing - 90));
        destination2 = turf.rhumbDestination(st_pt2, spacing_no, (bearing - 90));
      } else {
        let d_1 = turf.rhumbDestination(st_pt1, spacing_no, (bearing - 90));
        let d_2 = turf.rhumbDestination(st_pt2, spacing_no, (bearing - 90));
        destination1 = turf.rhumbDestination(d_1, burden_no / 2, bearing);
        destination2 = turf.rhumbDestination(d_2, burden_no / 2, bearing - 180);
      }

      var linestring1 = turf.lineString([[destination1.geometry.coordinates[0], destination1.geometry.coordinates[1]], [destination2.geometry.coordinates[0], destination2.geometry.coordinates[1]]]);
      var length1 = turf.length(linestring1);

      let count_point_in_line = (length1 * 1000) / this.spacing
      for (let i = 0; i < count_point_in_line; i++) {
        let burden = (this.burden / 1000) * i
        var along = turf.along(linestring1, burden);
        make_point.push(along)
      }
    }

    for (let i = 1; i < ((point_use[0].distance * 1000) / this.burden) * 2; i++) {
      let destination1
      let destination2
      let burden_no = this.burden / 1000
      let spacing_no = ((this.spacing / 1000) * i)
      if (i % 2 == 0) {
        destination1 = turf.rhumbDestination(st_pt1, spacing_no, (bearing - 90) - 180);
        destination2 = turf.rhumbDestination(st_pt2, spacing_no, (bearing - 90) - 180);
      } else {
        let d_1 = turf.rhumbDestination(st_pt1, spacing_no, (bearing - 90) - 180);
        let d_2 = turf.rhumbDestination(st_pt2, spacing_no, (bearing - 90) - 180);
        destination1 = turf.rhumbDestination(d_1, burden_no, bearing);
        destination2 = turf.rhumbDestination(d_2, burden_no, bearing - 180);
      }

      var linestring1 = turf.lineString([[destination1.geometry.coordinates[0], destination1.geometry.coordinates[1]], [destination2.geometry.coordinates[0], destination2.geometry.coordinates[1]]]);
      var length1 = turf.length(linestring1);

      let count_point_in_line = (length1 * 1000) / this.spacing
      for (let i = 0; i < count_point_in_line; i++) {
        let burden = (this.burden / 1000) * i
        var along = turf.along(linestring1, burden);
        make_point.push(along)
      }
    }

    var collection: any = turf.featureCollection(make_point);

    var ptsWithin = turf.pointsWithinPolygon(collection, data);
    let geo_test = L.geoJson(ptsWithin, {
      pointToLayer: function (f, latlng) {
        return L.circle(latlng, {
          color: '#eb1d25',
          fillColor: '#eb1d25',
          fillOpacity: 0.5,
          radius: 1
        });
      },
    })
      .addTo(this.map)


    data.features[0].properties.id_layer = Math.floor(Math.random() * 100000)
    // data.features[0].properties.hold_count = ptsWithin.features.length
    // data.features[0].properties.hold_count = 0
    // this.geojson_new_blast = data
  }

}
