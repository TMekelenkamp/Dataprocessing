// Thom Mekelenkamp

  // set margins of the chart
  var margin = {top: 50, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the bounds of the chart in width
  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  // set the bounds of the chart in height
  var y = d3.scale.linear()
        .range([height, 0]);

  // position the X axis
  var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

  // position the Y axis
  var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");


  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // create the tooltip
  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>regen(mm):</strong> <span style='color:steelblue'>" + d.value + "</span>";
      })

  // append the chart as svg
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  // extract data from tsv file and store them in x and y data
  d3.tsv("data.tsv", type, function(data) {
    console.log(data);
    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { console.log(d.value); return d.value; })]);

  // append the X axis with data from x.domain
  chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

  // append the Y axis with data from y.domain
  chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

  // append the bars with the right data and set the trigger for the mouseover
  chart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x.rangeBand())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
  });

  function type(d) {
    d.value = +d.value;
    return d;
  }
