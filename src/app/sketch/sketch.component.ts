import { Component, OnInit } from '@angular/core';
import p5 from 'p5'; //  "allowSyntheticDefaultImports": true in tsconfig.json file

// https://medium.com/angular-in-depth/creating-a-sketchpad-with-angular-and-p5js-e2834cf5b1f1
@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit {
  canvas: any;

  speedX!: number;
  speedY!: number;

  circulo = {
    x: 50,
    y: 50,
    size: 50
  }

  r = 0;
  g = 0;
  b = 0;

  ancho!: number;

  constructor() { }

  ngOnInit() {
    // this sketch was modified from the original
    // https://editor.p5js.org/Janglee123/sketches/HJ2RnrQzN
    const sketch = (s: any) => {
      s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight)
        this.speedX = 10;
        this.speedY = 5;
        let canvas2 = s.createCanvas(s.windowWidth - 200, s.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');

      };
      s.draw = () => {
        //this.r = s.map(this.circulo.x, 0, s.windowWidth - 200, 0, 255);
        //this.g = s.map(this.circulo.y, 0, s.windowWidth - 200, 0, 255);

        s.background(this.r, this.g, this.b);
        s.fill(0, 0, 0, 230);
        s.noStroke();

        s.ellipse(this.circulo.x, this.circulo.y, this.circulo.size);


        this.move(s.windowWidth - 200, s.windowHeight - 200);
        this.ancho = s.windowHeight;
      };
      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
        let canvas2 = s.createCanvas(s.windowWidth - 200, s.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');
      }
    };
    this.canvas = new p5(sketch);
  }

  move(ancho: number, largo: number) {
    this.circulo.x += this.speedX;
    this.circulo.y += this.speedY;
    if (this.circulo.x > ancho - (this.circulo.size / 2) || this.circulo.x < this.circulo.size / 2) {
      this.speedX *= -1;
    }
    if (this.circulo.y > largo - (this.circulo.size / 2) || this.circulo.y < this.circulo.size / 2) {
      this.speedY *= -1;
    }
  }

  onBigger() {
    this.circulo.size *= 1.1;
  }
  onSmaller() {
    this.circulo.size -= (this.circulo.size * 0.1)
  }
  onBackground() {
    this.r = Math.round(Math.random() * 255);
    this.g = Math.round(Math.random() * 255);
    this.b = Math.round(Math.random() * 255);
  }

  onFaster() {

    if (this.speedX >= 0 && this.speedY >= 0) {
      this.speedX++;
      this.speedY++;
    }

  }

  onSlower() {


    if (this.speedX >= 0 && this.speedY >= 0) {
      this.speedX--;
      this.speedY--;
    }

  }

}
