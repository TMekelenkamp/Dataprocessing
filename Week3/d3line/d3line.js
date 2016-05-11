// Thom Mekelenkamp

d3.json("data1.json", function(data1){

var data1 = data1.data1;
console.log(data1);
console.log(data1.date);
console.log(data1[0].gem);


var margin = {top: 50, right: 30, bottom: 100, left: 100};
var width = 700,
    height = 400,
    padding = 0;

var temp1;
var temp2;
var temps = [];
for (var i = 0; i < data1.length; i++)
{
  temp = data1[i].gem;
  temps[i] = temp;
}
console.log(temps);

var gemMin = Math.min.apply(Math,temps);
var gemMax = Math.max.apply(Math,temps);
console.log(gemMin);
console.log(gemMax);

// set the bounds of the chart in width
// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, width]);

// console.log(data1.data1.date);
// console.log(temps);
var formatTime = d3.time.format("%Y/%m/%d");

// var y = d3.scale.linear()
//     .range([height, 0]);

var mindate = formatTime.parse("2015/5/1"),
    maxdate = formatTime.parse("2016/5/1");

var xScale = d3.time.scale()
  .domain([mindate, maxdate])
  .range([padding, width]);

// set the bounds of the chart in height
var yScale = d3.scale.linear()
      .domain([gemMin, gemMax])
      .range([height, 0]);

// position the X axis
var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

// position the Y axis
var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");


var line = d3.svg.line()
    .x(function(d) { return xScale(formatTime.parse(d.date)); })
    .y(function(d) { return yScale(d.gem); });


var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("path")
    .datum(data1)
    .attr("class", "line")
    .attr("d", line);

// append the X axis with data from x.domain
chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

// append the Y axis with data from y.domain
chart.append("g")
      .attr("class", "yScale axis")
      .call(yAxis)

chart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ ((padding - 75)/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Temperatuur in 0,1 Celsius");

chart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (width/2) +","+(height-((padding - 125)/3))+")")  // centre below axis
      .text("Datum");
});
