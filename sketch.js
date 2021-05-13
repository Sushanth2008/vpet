var database;
var dog;
var foodStock;
var foodLeft;
var feedHour, fedHour;
var feedMinute, fedMinute;

function preload() {
  dogImg = loadImage("images/dog.png")
  doghappyImg = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  feedHour = database.ref('feedHour');
  feedHour.on("value", function (data) {
    fedHour = data.val();
  });

  feedMinute = database.ref('feedMinute');
  feedMinute.on("value", function (data) {
    fedMinute = data.val();
  });

  foodObj = new Food();

  dog = createSprite(900, 250, 10, 10)
  dog.addImage(dogImg, "dog")
  dog.scale = 0.2;

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  feedButton = createButton("Feed The Dog")
  feedButton.position(600, 55)
  feedButton.mousePressed(feedDog)

  addFoodButton = createButton("Add Food")
  addFoodButton.position(500, 55)
  addFoodButton.mousePressed(addFood)

}


function draw() {

  background(46, 139, 87)

  foodObj.display()

  drawSprites();

  textSize(15)
  fill("white")

  if (fedHour >= 12) {
    text("Last Fed : " + fedHour % 12 + ":" +fedMinute + " PM", 160, 17.5);
  }
  else if (fedHour == 0) {
    text("Last Fed : 12:00 AM", 160, 17.5);
  }
  else {
    text("Last Fed : " + fedHour +":"+ fedMinute + " AM", 160, 17.5);
  }

  text("Minimum Food Limit is 1     Max Food Limit is 40", 525, 17.5)

}

function readStock(data) {
  foodLeft = data.val();
  foodObj.updateFoodStock(foodLeft)
}

function feedDog() {

  if (foodLeft > 1) {
    foodLeft = foodLeft - 1
    dog.addImage(doghappyImg, "doghappy")

    database.ref('/').update({
      Food: foodLeft,
      feedHour: hour(),
      feedMinute: minute()
    })
    
  }


}

function addFood() {

  if (foodLeft < 40)
    foodLeft = foodLeft + 1

  database.ref('/').update({
    Food: foodLeft
  })
}



