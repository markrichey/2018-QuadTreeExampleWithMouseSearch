/* P5 Dependant */
function setup(){
    createCanvas(1024,768);
    let boundary = new Rectangle(width/2,height/2,width/2,height/2);
    qt = new QuadTree(boundary, 4);

    for(let i = 0; i < 1000; i++){
        let p = new Point(random(width),random(height));
        qt.insert(p);
    }
}

function draw(){
    background(0);
    qt.show();
    stroke(0,255,0);
    rectMode(CENTER);
    let range = new Rectangle(mouseX,mouseY,100,50);
    strokeWeight(2);
    rect(range.x,range.y,range.w*2,range.h*2);
    let searchPoints = qt.query(range);
    for(let p of searchPoints){
        strokeWeight(7);
        point(p.x,p.y);
    }
}