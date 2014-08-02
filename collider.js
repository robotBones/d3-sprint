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

var enemyOptions = {
  r: 10
}

var playerOptions = {
  size: 20,
  hitBox: 25
}

//playerOptions.hitBox = playerOptions.size/2 + enemyOptions.r/2;



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
      r: enemyOptions.r,
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
  update();
}, 1000);

setInterval(function(){
  (detectCollision()) ? console.log('touched') : console.log("bjhdsb");
}, 100);



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

    var w = 20;
    var h = 20;
    svg
      .append("rect")
      .attr({
        fill: "#ff0000",
        stroke: "#110404",
        "stroke-width": 5,
        width: playerOptions.size,
        height: playerOptions.size,
        x: 0,//gameOptions.width/2 -w/2,
        y: gameOptions.height/2 - h/2
      })
      .classed("player", true);
};
//Player.init(gameOptions.width/2, gameOptions.height/2);
//

var detectCollision = function(){
  var enemies = d3.selectAll(".enemies");
  var enemy;
  var player = d3.select(".player");
  var pX = player.attr("x");
  var pY = player.attr("y");

  var hasCollision = false;

  enemies.each( function(d, i){
    enemy = d3.select(this);
    var eX = enemy.attr("cx");
    var eY = enemy.attr("cy");

    var mX = Math.pow(Math.abs(eX - pX),2);
    var mY = Math.pow(Math.abs(eY - pY),2);

    var distance = Math.sqrt(mX + mY);

    if(distance < playerOptions.hitBox){
      hasCollision = true;
    }
  });
  return hasCollision;
};

makePlayer();
d3.selectAll(".player").call(drag);














