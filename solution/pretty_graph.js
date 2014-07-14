var svg = document.getElementById('container3'),
     actually_width = 750,
     actually_height = 550,
     min_x = 50,
     max_x = actually_width,
     min_y = 50,
     max_y = actually_height,
     x_axis = 0,
     y_axis = 0,
     length = 0,
     max_latitude,
     max_longitude,
     max_density = 0,
     min_latitude,
     min_longitude,
     min_density = 0,
     cities;

 var convert_range = _.curry(function (old_min, old_max, new_min, new_max, val) {
    return ((val - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min;
 });

 function round_tenths_up (number) {
    return Math.ceil(number / 10) * 10;
 }

  function round_tenths_down (number) {
    return Math.floor(number / 10) * 10;
 }

 function draw_graph () {
    // Longitude / Y axis
    new Line()
    .x1(actually_width/2).y1(min_y).x2(actually_width/2).y2(max_y)
    .stroke('black').strokeWidth(1)
    .draw(svg);

    // Latitude / X Axis
    new Line()
    .x1(min_x).y1(actually_height/2).x2(max_x).y2(actually_height/2)
    .stroke('black').strokeWidth(1)
    .draw(svg);

    // min x
    new Text()
    .x(25).y(actually_height/2+25)
    .text('longitude ' + min_longitude)
    .fontsize('10px')
    .draw(svg);

    // max x
    new Text()
    .x(actually_width-25).y(actually_height/2+25)
    .text('longitude ' + max_longitude)
    .fontsize('10px')
    .draw(svg);

    // min y
    new Text()
    .x(actually_width/2-25).y(40)
    .text('latitude ' + max_latitude)
    .fontsize('10px')
    .draw(svg);

    // max y
    new Text()
    .x(actually_width/2-25).y(actually_height+25)
    .text('latitude ' + min_latitude)
    .fontsize('10px')
    .draw(svg);

    // Middle
    new Text()
    .x(actually_width/2-30).y(actually_height/2+15)
    .text('lat ' + y_axis + ', long ' + x_axis)
    .fontsize('10px')
    .draw(svg);
 };

 function draw_values () {
    var lat_range = convert_range(min_latitude, max_latitude, min_y, max_y),
        lon_rang = convert_range(min_longitude, max_longitude, min_x, max_y),
        curred_density = convert_range(0, max_density, 0, 20);

    for (var x = 0; x < cities.length; x++) {
      var lat = actually_height - lat_range(cities[x].lat),
          lon = lon_rang(cities[x].long),
          density = curred_density(cities[x].density);

     var c = new Circle()
       .center(lon, lat).width(density)
       .fill('red')
       .id(cities[x].city)
       .class('city')
       .draw(svg);

       var dom = document.getElementById(cities[x].city);
        dom.setAttribute('population', cities[x].population);
        dom.setAttribute('diameter', cities[x].diameter);
        //dom.setAttribute('Other', cities[x].lat + ", " + cities[x].long);
    }
 };

 // A lot of ugly hard coded values
 function prepare_data () {

    cities = _.merge(latlong, playfair);
    _.forEach(cities, function (val, index) {
      val.density = val.population / val.diameter;
      if (max_density < val.density) {
        max_density = val.density;
      }

      if (max_latitude === undefined || max_latitude < Number(val.lat)) {
        max_latitude = Number(val.lat);
      }
            
      if (min_latitude === undefined || min_latitude > Number(val.lat)) {
        min_latitude = Number(val.lat);
      }

      if (max_longitude === undefined || max_longitude < Number(val.long)) {
        max_longitude = Number(val.long);
      }

      if (min_longitude === undefined || min_longitude > Number(val.long)) {
        min_longitude = Number(val.long);
      }

    });

    if (max_latitude > 0 ) {
      max_latitude = round_tenths_up(max_latitude);
    } else {
      max_latitude = round_tenths_down(max_latitude);
    }

    min_latitude = round_tenths_down(min_latitude);

    if (max_longitude > 0 ) {
      max_longitude = round_tenths_up(max_longitude);
    } else {
      max_longitude = round_tenths_down(max_longitude);
    }

    min_longitude = round_tenths_down(min_longitude);

    y_axis = (max_latitude + min_latitude) / 2;
    x_axis = (max_longitude + min_longitude) / 2;


    length = cities.length;
 };



 prepare_data();
 draw_graph();
 draw_values();

var els = document.querySelectorAll(".city");
for (var i = 0, length = els.length; i < length; i++) {
  els[i].addEventListener("mouseover", mouse_over, false);
  els[i].addEventListener("mouseout", mouse_out, false);
}

// Would be better to retrieve elements 1 then reuse, im trying to get it done quick
function mouse_over (e) {
  document.getElementById('city_name').innerHTML =
    'City name: ' + e.currentTarget.id;
  document.getElementById('city_population').innerHTML = 
    'City population: ' + e.currentTarget.getAttribute('population');
  document.getElementById('city_diameter').innerHTML = 
    'City diameter: ' + e.currentTarget.getAttribute('diameter');

    /*
  document.getElementById('other').innerHTML = 
    'Other: ' + e.currentTarget.getAttribute('Other');
    */

}

function mouse_out (e) {
  document.getElementById('city_name').innerHTML = '';
  document.getElementById('city_population').innerHTML = '';
  document.getElementById('city_diameter').innerHTML = '';
  document.getElementById('other').innerHTML = '';
}
