// Code for part 1
var svg = document.getElementById('container');

var l = new Line()
   .x1(200).y1(50).x2(300).y2(100)
   .stroke('purple').strokeWidth(10)
   .draw(svg);

var s = new Square()
   .center(100, 100).width(100)
   .fill('yellow')
   .draw(svg);

var c = new Circle()
   .center(100, 100).width(100)
   .fill('red')
   .draw(svg);

var r = new Rectangle()
   .center(200, 200).width(20).height(50)
   .fill('blue')
   .draw(svg);

new Text()
   .x(400).y(50)
   .text("Line " + l.x1() + "," + l.y1() + " > " + l.x2() + "," + l.y2() + " " + l.stroke())
   .draw(svg);

new Text()
   .x(400).y(70)
   .text("Square " + s.cx() + "," + s.cy() + " width " + s.width() + " " + s.fill())
   .draw(svg);