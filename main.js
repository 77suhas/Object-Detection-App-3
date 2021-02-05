img = "";
status = "";
object = "";
function preload() {
  img = loadImage("dog_cat.jpg")
  img_1 = loadImage("img_1.png")
  img_2 = loadImage("img_2.jpg")
  img_3 = loadImage("img_3.png")
}
function setup() {
  canvas = createCanvas(600, 500)
  canvas.center()
  
  objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}
function modelLoaded() {
  console.log("model is loaded")
  status = true;
  objectDetector.detect(img_3, gotResults)
}
function gotResults(error, results) {
  if (error) {
    console.log(error)
  }
  else {
    console.log(results)
    object = results
  }
}
function draw() {
  image(img_3, 0, 0, 600, 500)  

  if (status != "") {
    for (i  = 0; i < object.length; i++) {
      document.getElementById("status").innerHTML = "object detected"

      accuracy = floor(object[i].confidence * 100)+"%"
      fill("#FF0000")
      text(object[i].label +" " + accuracy, object[i].x, object[i].y)
      noFill()
      stroke("#FF0000")
      rect(object[i].x, object[i].y, object[i].width, object[i].height)
    }
  }
}