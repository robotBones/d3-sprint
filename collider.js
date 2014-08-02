var gameOptions = {
  height: 900,
  width: 600,
  nEnemies: 30,
  padding: 20
}

var gameStats = {
  score: 0,
  bestScore: 0
}

var genEnemies = function(){
  var list = [];
  for(var i = 0; i < gameOptions.nEnemies; i++){
    list.push(Math.floor(Math.random() * gameOptions.width));
  }
  return list;
}
//create main svg element
var svg = d3.select("body")
  .append("svg")
  .attr({
    width:gameOptions.width,
    height:gameOptions.height,
  })
  .style("background-color", "white");


// generating new circles
var update = function(){
  var newData = genEnemies();
  var enemies = svg.selectAll("circle").data(newData);

  //first time update is run, it will create and append circles.
  // subsequent runs, this chain will be skipped because
  // enter() will not return any item.
  enemies
    .enter()
    .append("circle")
    .attr({
      cx:function(d) { return d * Math.random()},
      cy:function(d) { return d * Math.random()},
      r:10,
      fill: "black"
    })
    .classed("enemies", true);

  // changing positions of each circle
  enemies
    .attr({
        cx:function(d) { return d * Math.random()},
        cy:function(d) { return d * Math.random()},
    });
}



update();

setInterval(function(){
  // console.log((new Date).getSeconds());
  update();
}, 1000);





























