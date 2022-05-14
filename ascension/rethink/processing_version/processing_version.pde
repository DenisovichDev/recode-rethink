int len = 30;
int initX = 50;
int initY = 150;
int cols, rows;

int margin = 5;
ArrayList<Integer> randYSpace = new ArrayList<Integer>(); 
ArrayList<Float> randXOffset = new ArrayList<Float>();
float yOff = 0;

NoiseLoop noiseY = new NoiseLoop(1, 0, 10);

int totalFrames = 250;
float percent;

int counter = 0;
boolean record = false;

void setup() {
  size(1000, 600);
  background(230);
  cols = floor((width - 2 * initX) / len);
  rows = floor((height - (initY + initX)) / len);

  for (int j = 0; j < cols; j++) {
    randYSpace.add(floor(random(0, margin)));
    randXOffset.add(random(0, 10));
  }
}

void draw() {
  background(230);

  noStroke();
  fill(205, 35, 6, 200);

  PVector currentPos = new PVector();
  float xOff= 0;
  
  percent = float(frameCount % totalFrames) / totalFrames;
  

  for (int j = 0; j < rows; j ++) {
    currentPos.y = randYSpace.get(j) + initY + j * len;
    yOff = 0;
    for (int i = 0; i < cols; i ++) {
      
      currentPos.x = initX + randXOffset.get(j) + i * len;
      currentPos.y -= noiseY.value(percent * TWO_PI + xOff + yOff);//map(noise(xOff), 0, 1, -3, 10);
      rect(currentPos.x, currentPos.y, len - margin, len - margin);
      yOff += PI / 24;
    }
    xOff += 100;
  }
  
  
  
 // float percent = float(frameCount % totalFrames) / totalFrames;


  //loadPixels();
  //int d = displayDensity();
  //int halfImage = (width * d) * (height * d);
  //for (int i = 0; i < halfImage; i += 1) {
  //  if (!(pixels[i] == color(230))) {
  //      float grainAmount = random(-50, 50);
  //      color gA = color(grainAmount, 200);
  //      pixels[i] += gA;
        
  //  }
  //}
  //updatePixels();
  
  //noLoop();
  
   if (record) {
    saveFrame("output/gif-"+nf(counter, 3)+".png");
    if (counter == totalFrames-1) {
      exit();
    }
  }
  counter++;
}
