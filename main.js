x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
draw_apple = "";
speak_data = "";
apple = "";
to_number = "";

function preload(){
 apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "The system is listening, please speak.";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

    to_number = Number(content);

    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = to_number + " apples are being drawn.";

      draw_apple = "set";
    }
    else{
      document.getElementById("status").innerHTML = "The speech has not recognised a whole number.";
    }
}

function setup() {
  screen_width = window.innerWidth;
screen_height = window.innerHeight;

canvas = createCanvas(screen_width, screen_height-150);
canvas.position(0,150);
}

function draw() {
  if(draw_apple == "set")
  {
    for (i = 0; i < to_number; i++) {
     x = Math.floor(Math.random()*(screen_width-80));
     y = Math.floor(Math.random()*(screen_height-200));
image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " apples have been drawn";
      speak_data = to_number + " apples have been drawn";
    speak();
    draw_apple = "";    
  }
}

function speak(){
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);
}



