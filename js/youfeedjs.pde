float px, py;
node n1, n2, n3, n4, n5;
void setup() {
  size(1366,500);
  stroke(0,255,0);
  strokeWeight(3);
  noFill();
  frameRate(30);
  n1 = new node(200, 50, 400, 250, 3, color(226,43,38), 200, true);
  n2 = new node(50, 200, 400, 250, 3, color(33,117,155), 200, true);
  n3 = new node(100, 300, 400, 250, 3, color(52,70,94), 200, true);
  n4 = new node(250, 400, 400, 250, 3, color(255,102,0), 200, true);
  n5 = new node(600, 250, 1000, 250, 12, color(35,195,18), 0, false);
}

void draw() {
  background(#300000);
  n1.render();
  n2.render();
  n3.render();
  n4.render();
  n5.render();
  noStroke();
  fill(255);
  rect(385, 225, 230, 50, 5);
}
class feed {
  float startx, starty, endx, endy;
  float x1, y1, x2, y2;
  float px, py;
  int age;
  int maxage;
  boolean debug = false;
  color col;
  
  public feed(float startx, float starty, float endx,
              float endy, color c) {
    this.startx = startx;
    this.starty = starty;
    this.endx = endx;
    this.endy = endy;
    x1 = random(startx, startx + ((endx - startx) / 2));
    x2 = random(startx + ((endx - startx) / 2), endx);
    y1 = random(starty - 200, starty + 200);
    y2 = random(endy - 100, endy + 100);
    col = c;
    age = 0;
    maxage = int(random(60,120));
  }
  
  public void render() {
    if (age < 0) return;
    stroke(col);
    if (debug) {
      noFill();
      strokeWeight(3);
      point(startx, starty);
      point(x1, y1);
      point(x2, y2);
      point(endx, endy);
      strokeWeight(1);
      bezier(startx, starty, x1, y1, x2, y2, endx, endy);
    }
//    fill(0);
    noFill();
    strokeWeight(3);
    px = bezierPoint(startx, x1, x2, endx, (age % maxage) / float(maxage));
    py = bezierPoint(starty, y1, y2, endy, (age % maxage) / float(maxage));
    ellipse(px,py,15,15);
  }
  
  public boolean update() {
    age++;
    return age >= maxage;
  }
}
class node {
  feed[] f;
  float startx, starty, endx, endy;
  float origx, origy;
  int feedCount;
  color col;
  int seed;
  int wiggle;
  boolean renderNode;
  
  public node(float x1, float y1, float x2, float y2, int feeds,
              color c, int w, boolean r) {
    startx = x1;
    starty = y1;
    origx = x1;
    origy = y1;
    endx = x2;
    endy = y2;
    col = c;
    wiggle = w;
    seed = int(random(600));
    feedCount = feeds;
    renderNode = r;
    f = new feed[feedCount];
    for (int i = 0; i < feedCount; i++) {
      f[i] = new feed(startx, starty, endx, endy, col);
      f[i].age = random(0,60);
    }
  }
  
  public void render() {
    startx = origx - wiggle/2 + (wiggle * noise(seed + (frameCount / 400.0)));
    starty = origy - wiggle/2 + (wiggle * noise(2*seed +(frameCount / 400.0)));
    for (int i = 0; i < feedCount; i++) {
      f[i].render();
      if (f[i].update()) {
        f[i] = new feed(startx, starty, endx, endy, col);
      }
    }
    if (renderNode) {
      noStroke();
      fill(col);
      ellipse(startx, starty, 70, 70);
    } else {
      noStroke();
      fill(col);
      ellipse(endx, endy, 100, 100);
    }
  }
}

