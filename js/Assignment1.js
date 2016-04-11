var outerWidth=1400;
var outerHeight=600;
var barPadding= 0.2;
var margin={left:90, top:30, right:90, bottom:150};
var xAxisLabel="Country Name";
var src,yAxisLabel="";
var innerWidth= outerWidth -margin.left - margin.right;
var innerHeight= outerHeight -margin.top - margin.bottom;

var svg= d3.select("body").append("svg")
      .attr("width",outerWidth)
      .attr("height",outerHeight);

var g= svg.append("g")
  .attr("transform", "translate(" +margin.left + "," + margin.top + ")");

var xAxisG =g.append("g")
  .attr("transform", "translate(0," +innerHeight+")");
var yAxisG = g.append("g");
var xScale= d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
var yScale= d3.scale.linear().range([innerHeight, 0]);

var xAxis= d3.svg.axis().scale(xScale).orient("bottom");
var yAxis= d3.svg.axis().scale(yScale).orient("left");

function render(data){

  xScale.domain(       data.map( function(d){
    for (var key in d){
        return key;
    }
   }));

  yScale.domain([0, d3.max(data, function(d){
      for (var key in d){
        return d[key];
      }
   })]);//to get max value of yColumn

  xAxisG.call(xAxis);
  xAxisG.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)" );

  yAxisG.call(yAxis);
  yAxisG.append("text").text(yAxisLabel)
    .attr("transform", "translate(" +(-(margin.left-20)) + "," + (innerHeight-90) + ") rotate(270)");

  xAxisG.append("text").text(xAxisLabel)
      .attr("transform", "translate(" +((innerWidth)-150 ) + "," + (outerHeight-innerHeight-30) + ")");

  var bars= g.selectAll("rect").data(data);

  bars.enter().append("rect")
    .attr("width", xScale.rangeBand());
  bars
    .attr("x", function(d){
      for (var key in  d){
        return xScale(key);
      }
      ;})
    .attr("y", function(d){
      for (var key in  d){
        return yScale(d[key]);
      }
    })
    .attr("height", function(d){
      for (var key in  d){
        return innerHeight - yScale(d[key]);
      }

    });
  bars.exit().remove();
}// end render


function getGraph(sourceFile, yLabel)
{
  localStorage.setItem("src",sourceFile);
  localStorage.setItem("yAxisLabel",yLabel);
}

function showGraph(){
  src=localStorage.getItem("src");
  yAxisLabel=localStorage.getItem("yAxisLabel");

  d3.json(src,function(data){
    data.forEach(function(data){
      for (var key in data){
        data[key]= +data[key];
      }
    });
    render(data);

  });
}
