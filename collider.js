var gameOptions = {
  height: 600,
  width: 900,
  nEnemies: 30,
  padding: 20
}

var gameStats = {
  score: 10,
  highScore: 0,
  startTime:+new Date
}

var enemyOptions = {
  rx: 10,
  ry: 15,
  angle: 0
}

var playerOptions = {
  size: 20,
  hitBox: 25
}

//playerOptions.hitBox = playerOptions.size/2 + enemyOptions.r/2;


//create main svg element
var svg = d3.select("body")
  .append("svg")
  .attr({
    width:gameOptions.width,
    height:gameOptions.height,
  })
  .style("background-color", "white");




// generating new ellipses
var enemies = svg.selectAll("ellipse")
  .data(d3.range(gameOptions.nEnemies));

//create and append enemies to the page.
enemies
  .enter()
  .append("ellipse")
  .attr({
   cx:function(d) { return Math.random() * gameOptions.width ; },
   cy:function(d) { return Math.random() * gameOptions.height ; },
    rx: enemyOptions.rx,
    ry: enemyOptions.ry,
    fill: "black"
  })
  .classed("enemies", true);

// first invocation: update the position for existing enemies
// subsequent invoation: update the position for one enemy
var update = function(element){
  element
    .transition()
    .delay(30)
    .duration(800)
    .attr({
      cx:function(d) { return Math.random() * gameOptions.width ; },
      cy:function(d) { return Math.random() * gameOptions.height ; },
      //transform: function(d){ return "rotate(" + d +","+ d+"," + d+")";}
    })
    .each('end', function(){
      update(d3.select(this))
    });

};

update(enemies);


setInterval(function(){
  (detectCollision()) ? console.log('touched') : console.log("bjhdsb");
  updateScore();
}, 100);



// sets up D3 drag listener.
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
      gameStats.highScore = Math.max(gameStats.score, gameStats.highScore);
      hasCollision = true;
      gameStats.score = 0;
      gameStats.startTime = +new Date;
    }
  });
  return hasCollision;
};

var updateScore = function(){
  var start = gameStats.startTime;
  // count time since game start
  var now = +new Date;
  // set score to time passed since...
  //gameOptions.lastTime = now - last;
  //console.log(Math.floor((now -last )/ 100));

  gameStats.score = Math.floor((now - start )/ 100);


  d3.select("#score")
    .text(gameStats.score);

  d3.select("#highScore")
    .text(gameStats.highScore);
};




makePlayer();
d3.selectAll(".player").call(drag);

//score increases every 1/10th second
//


// each time the enemies reset,
// if you aren't hit
  // increment keeps incrementing
// if you are hit,
  // player die;
  // compare current score to high score
  // if current score > high score
    // set high score to current score
  // score is reset to zero.









