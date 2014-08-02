var gameOptions = {
  height: 600,
  width: 900,
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
        //transform: function(d){"translate ("+ d * Math.random()+ ',' + d* Math.random() + ")"},
        cx:function(d) { return d * Math.random()},
        cy:function(d) { return d * Math.random()},
    });
}
// .attr 'transform',
//       "translate(#{@getX()},#{@getY()})"


update();

setInterval(function(){
  // console.log((new Date).getSeconds());
  update();
}, 1000);




// sets up D3 drag listener. Don't really how.
var drag = d3.behavior.drag()
    .on("drag", function(){
      d3.select(this)
        .attr({
          x: d3.event.x,
          y: d3.event.y
        });
    });


var makePlayer = function(){

    var w = 80;
    var h = 30;
    svg
      .append("rect")
      .attr({
        fill: "#ff0000",
        stroke: "#110404",
        "stroke-width": 5,
        width: w,
        height: h,
        x: gameOptions.width/2 -w/2,
        y: gameOptions.height/2 - h/2
      })
      .classed("player", true);
};
//Player.init(gameOptions.width/2, gameOptions.height/2);

makePlayer();
d3.selectAll(".player").call(drag);














