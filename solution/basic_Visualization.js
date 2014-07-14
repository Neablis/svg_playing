var svg = document.getElementById('container2'),
     max_level = _.max(co2, function(val) { return val.level; }),
     min_level = _.min(co2, function(val) { return val.level; }),
     actually_width = 760-60,
     actually_height = 530-20,
     length = co2.length;

 function parseDate(input) {
   var parts = input.split('-');
   // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
   return parts[0] + '/' + parts[1] + '/' + parts[2].substring(0,2); // Note: months are 0-based
 }

 var convert_range = _.curry(function (old_min, old_max, new_min, new_max, val) {
    return ((val - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min;
 });

 function draw_graph () {
    // Y label
    new Text()
    .x(10).y(300)
    .text("Level")
    .style("writing-mode: tb; glyph-orientation-vertical: 90;")
    .draw(svg);

    // Max Y
    new Text()
    .x(10).y(20)
    .text(max_level.level)
    .draw(svg);

    // Min Y
    new Text()
    .x(10).y(530)
    .text(min_level.level)
    .draw(svg);

    // X Label
    new Text()
    .x(400).y(580)
    .text("Date")
    .draw(svg);

    // Max X
    new Text()
    .x(60).y(535)
    .style("writing-mode: tb; glyph-orientation-vertical: 90;")
    .text(parseDate(co2[0].date))
    .fontsize('10px')
    .draw(svg);

    // Min X
    new Text()
    .x(760).y(535)
    .style("writing-mode: tb; glyph-orientation-vertical: 90;")
    .text(parseDate(co2[co2.length-1].date))
    .fontsize('10px')
    .draw(svg);

    // Y axis
    new Line()
    .x1(60).y1(20).x2(60).y2(530)
    .stroke('black').strokeWidth(1)
    .draw(svg);

    // X Axis
    new Line()
    .x1(60).y1(530).x2(760).y2(530)
    .stroke('black').strokeWidth(1)
    .draw(svg);
 };

 function draw_values () {
    var curred_height = convert_range(min_level.level, max_level.level, 20, actually_height),
        increment = actually_width / co2.length;

    for (var x = 0; x < co2.length-1; x++) {
       var val1 = actually_height - curred_height(co2[x].level),
           val2 = actually_height - curred_height(co2[x+1].level);

       new Line()
          .x1((x*increment)+60).y1(val1).x2(((x + 1)*increment)+60).y2(val2)
          .stroke('black').strokeWidth(1)
          .draw(svg);
    }
 };

 draw_graph();
 draw_values();