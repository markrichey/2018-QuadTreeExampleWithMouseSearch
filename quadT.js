class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return(point.x > this.x - this.w &&
        point.x < this.x + this.w &&
        point.y > this.y - this.h &&
        point.y < this.y + this.h
        );
    }

    intersects(range){
        return !(range.x - range.w > this.x + this.w ||
        range.x + range.w < this.x - this.w ||
        range.y - range.h > this.y + this.h ||
        range.y + range.h < this.y - this.h
        );
    }
}

class QuadTree{
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.devided = false;
    }

    subdevide(){
        this.northWest = new QuadTree(new Rectangle(
            this.boundary.x - (this.boundary.w / 2),
            this.boundary.y - (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.northEast = new QuadTree(new Rectangle(
            this.boundary.x + (this.boundary.w / 2),
            this.boundary.y - (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.southWest = new QuadTree(new Rectangle(
            this.boundary.x - (this.boundary.w / 2),
            this.boundary.y + (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.southEast = new QuadTree(new Rectangle(
            this.boundary.x + (this.boundary.w / 2),
            this.boundary.y + (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.devided = true;
    }

    insert(point){
        if(!this.boundary.contains(point)){
            return;
        }

        if(!this.devided){
            if(this.points.length < this.capacity){
                this.points.push(point);
                return;
            }else{
                this.subdevide();
                for(let p of this.points){
                    this.insert(p);
                }
                this.points = [];
                this.insert(point);
            }
        }else{
            this.northEast.insert(point);
            this.northWest.insert(point);
            this.southEast.insert(point);
            this.southWest.insert(point);
        }
    }

    query(range,found){
        if(!found){
            found = [];
        }
        if(!this.boundary.intersects(range)){
            return;
        }else{
            // Check Points
            for(let p of this.points){
                if(range.contains(p)){
                    found.push(p);
                }
            }
        }
        // Recursion eeek
        if(this.devided){
            this.northEast.query(range,found);
            this.northWest.query(range,found);
            this.southEast.query(range,found);
            this.southWest.query(range,found);
        }
        // Return
        return found;
    }

    /* P5 Dependant */
    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        
        strokeWeight(4);
        for(let p of this.points){
            point(p.x,p.y);
        }

        if(this.devided){
            this.northEast.show();
            this.northWest.show();
            this.southEast.show();
            this.southWest.show();
        }

    }
}