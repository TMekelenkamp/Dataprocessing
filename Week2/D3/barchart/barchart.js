// Thom Mekelenkamp

// console.log("hallo");
// d3.json("file.json", function(json){
    // console.log(json);
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data.tsv", type, function(data) {
      console.log(data);
      x.domain(data.map(function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) { console.log(d.value); return d.value; })]);

      chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      chart.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.date); })
          .attr("y", function(d) { return y(d.value); })
          .attr("height", function(d) { return height - y(d.value); })
          .attr("width", x.rangeBand());
    });

    function type(d) {
      d.value = +d.value; // coerce to number
      return d;
    }

    // console.log(json.data[0].date);
    // console.log(json.data[0].rain);

    // var data;
    // data = JSON.parse(json.data);
    // console.log(data);
    // console.log(data.length);
  //   var data = [4, 8, 15, 16, 23, 42];
  //
  //
  //   var width = 411,
  //     barHeight = 15;
  //
  //   var x = d3.scale.linear()
  //     .range([0, width]);
  //
  //   var chart = d3.select(".chart")
  //     .attr("width", width);
  //
  //   // d3.tsv("data.tsv", type, function(error, data) {
  //   //   x.domain([0, d3.max(data, function(d) { return d.value; })]);
  //
  //   chart.attr("height", barHeight * data.value);
  //
  //   var bar = chart.selectAll("g")
  //       .data(data)
  //       .enter().append("g")
  //       .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
  //
  //   bar.append("rect")
  //       .attr("width", function(d) { return x(d.value); })
  //       .attr("height", barHeight - 1);
  //
  //   bar.append("text")
  //       .attr("x", function(d) { return x(d.value) - 3; })
  //       .attr("y", barHeight / 2)
  //       .attr("dy", ".35em")
  //       .text(function(d) { return d.rain; });
  // });
// var data = [4, 8, 15, 16, 23, 42];

// var data = [];
// var i;
// for (i = 0; i < 31; i++)
// {
//   if (i == 30){
//     data += json.data[i].rain;
//   }
//   else{
//     data += json.data[i].rain + ", ";
//   }
// }
// console.log(data);
//
//
// var width = 960,
//     height = 500;
//
// var y = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([height, 0]);
//
// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", height);
//
// var barWidth = width / data.length;
//
// var bar = chart.selectAll("g")
//     .data(data)
//   .enter().append("g")
//     .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
//
// bar.append("rect")
//   .attr("y", function(d) { console.log(y(data)); return y(data); })
//   .attr("height", function(d) { return height - y(data); })
//   .attr("width", barWidth - 1);
//
// bar.append("text")
//     .attr("x", barWidth / 2)
//     .attr("y", function(d) { return y(data) + 3; })
//     .attr("dy", ".75em")
//     .text(function(d) { return data; });
  // function type(d) {
  //   d.value = +d.value; // coerce to number
  //   return d;
  // });
//   function type(d) {
//   d.rain = +d.rain; // coerce to number
//   return d;
// }
