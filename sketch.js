//Create variables here
var dog, happyDog, database, foodS, foodStock

var DOG;

var food;

function preload() {

  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database()
  // food = database.ref('value')


  createCanvas(500, 500);

  DOG = createSprite(250, 250, 20, 20)
  DOG.addImage(dog)
  DOG.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock)



}


function draw() {
  background(46, 139, 87)

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    DOG.addImage(happyDog)
  }

  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 0,20)

  textSize(20)
  text("Amount of food left:" +foodS, 150,100)

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1
  }
  database.ref('/').update({

    food: x
  })
}

