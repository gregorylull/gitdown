// svg.attr({width: window.innerWidth / 2, height: window.innerHeight / 2});

var createCircle = function (r, x, y) {
  r = r || 25;
  x = x || window.innerWidth / 2;
  y = y || window.innerHeight / 2;
  return svg.append('circle').attr('class', 'node')
    .attr({r: r, cx: x, cy: y});
};

var createLine = function (start, end, strokeWidth, color) {
  color = color || 'black';
  strokeWidth = strokeWidth || 5;
  return svg.append('line').attr('class', 'nodeLine')
    .attr({x1: start.x, y1: start.y, x2: end.x, y2: end.y})
    .attr({stroke: color, 'stroke-width': strokeWidth});
};

var createGrid = function (spread, strokeWidth, color) {
  spread = spread || 50;
  strokeWidth = strokeWidth || 2;
  color = color || d3.rgb(211,211,211);

  // vertical
  for (var i = 0; i < window.innerWidth; i += spread) {
    var start = {x: i, y: 0};
    var end =  {x: i, y: window.innerHeight};
    createLine(start, end, strokeWidth, color);

    // add labels
    var text = 'x: ' + i;
    start.y += 10;         // adjusting y so that labels will show below line
    start.x -= 10;
    createText(text, start);
  }

  // horizontal
  for (var j = 0; j < window.innerHeight; j += spread) {
    var start = {x: 0, y: j};
    var end = {x: window.innerWidth, y: j};
    createLine(start, end, strokeWidth, color);

    // add labels
    var text = 'y: ' + j;
    start.y -= 2;  // adjusting y so that labels will show above line
    createText(text, start);
  }
};

var createText = function (text, position, size, color, font) {
  text = text || 'NA';
  position = position || {x: window.innerWidth /2, y: window.innerHeight /2};
  size = size || '10px';
  color = color || 'black';
  font = font || 'sans-serif';

  return svg.append('text')
    .attr({x: position.x, y: position.y, 'font-size': size})
    .attr({'font-family': font, fill: color})
    .text(text);
};