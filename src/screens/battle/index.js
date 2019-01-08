const monsters = {
  duck: [29, 167, 268, 247],
  zigzag: [389, 129, 275, 286],
  deer: [786, 138, 166, 281],
  crab: [1067, 30, 239, 389],
  toad: [1347, 95, 325, 326],
  drop: [39, 498, 136, 116],
  stub: [209, 483, 107, 141],
  shandar: [376, 435, 122, 236],
  flower: [570, 440, 84, 223],
  spiders: [731, 516, 142, 159],
  backpack: [933, 537, 78, 137],
  caterpillar: [1073, 466, 236, 328],
  dragon: [1320, 518, 365, 279],
  explosion: [12, 810, 324, 399],
  giraffe: [708, 697, 344, 505],
  brain: [1125, 851, 140, 354],
  slurry: [1325, 1071, 353, 137],
};


// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line func-names
const requestAnimationFrame = (function () {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    // eslint-disable-next-line func-names
    || function (callback) {
      window.setTimeout(callback, 1000 / 20);
    };
}());

let imageResouces;
let canvas;
let canvasAnimation;
let gameLogic;

class Monster {
  constructor(imageMaps, sprite) {
    this.imageMaps = imageMaps;
    this.sprite = sprite;
    this.hpMonster = 100;
    this.directionX = 1;
    this.directionY = 1;
    this.scale = 1;
    this.position = { x: null, y: null };
    [, , this.width, this.height] = sprite;
  }

  // eslint-disable-next-line class-methods-use-this
  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  normalizePositions(itsCanvas) {
    let { xNormalize, yNormalize } = { xNormalize: false, yNormalize: false };
    if (this.position.x < 0) {
      this.position.x = 0;
      xNormalize = true;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      yNormalize = true;
    }
    if (this.position.x + this.width * this.scale > itsCanvas.width) {
      this.position.x = itsCanvas.width - this.width * this.scale;
      xNormalize = true;
    }
    if (this.position.y + this.height * this.scale > itsCanvas.height) {
      this.position.y = itsCanvas.height - this.height * this.scale;
      yNormalize = true;
    }
    return { xNormalize, yNormalize };
  }

  set hp(hp) {
    this.hpMonster = hp;
  }

  get hp() {
    return this.hpMonster;
  }

  update(itsCanvas) {
    let { x, y } = this.position;
    if (x === null) x = this.randomNumber(itsCanvas.width);
    if (y === null) y = this.randomNumber(itsCanvas.height);

    this.position.x = x + this.directionX * this.randomNumber(this.hp);
    this.position.y = y + this.directionY * this.randomNumber(this.hp);
    const { xNormalize, yNormalize } = this.normalizePositions(itsCanvas);
    if (xNormalize) {
      this.directionX = -this.directionX;
    }
    if (yNormalize) {
      this.directionY = -this.directionY;
    }
  }

  drawWithAlfa(drawContext, imageMap, alpha) {
    const context = drawContext;
    context.globalAlpha = alpha;
    drawContext.drawImage(imageMap, ...this.sprite,
      this.position.x, this.position.y,
      this.width * this.scale, this.height * this.scale);
    context.globalAlpha = 1;
  }

  draw(drawContext) {
    if (this.hp < 18) {
      this.drawWithAlfa(drawContext, this.imageMaps.dead, (this.hp + 72) / 100);
    }
    if (this.hp < 66) {
      this.drawWithAlfa(drawContext, this.imageMaps.sick, (this.hp + 33) / 100);
    }
    if (this.hp > 0) {
      this.drawWithAlfa(drawContext, this.imageMaps.power, (this.hp / 100));
    }
  }
}

function emitMonster(resouces) {
  const randomMonster = monsters[Object.keys(monsters)[
    Math.floor(Math.random() * Object.keys(monsters).length)
  ]];
  return new Monster(resouces.images, randomMonster);
}

function check() {
  requestAnimationFrame(check);
  const now = Date.now();
  if (now - canvasAnimation.before >= canvasAnimation.interval) {
    canvasAnimation.before = now;
    canvasAnimation.animate();
  }
}

class GameLogic {
  constructor(options) {
    this.options = options;
    this.sceneObjects = [];
  }

  update(itsCanvas) {
    for (let i = 0; i < this.sceneObjects.length; i += 1) {
      this.sceneObjects[i].update(itsCanvas);
    }
  }
}

class Resouces {
  constructor(imageMapSources) {
    this.countLoaded = 0;
    this.imageMapSources = imageMapSources;
    this.count = Object.keys(this.imageMapSources).length;
    this.images = {};
  }

  loadResources() {
    let incrementCountLoaded;
    const counter = new Promise((response) => {
      incrementCountLoaded = () => {
        this.countLoaded += 1;
        if (this.countLoaded === this.count) {
          response('loaded');
        }
      };
    });

    Object.keys(this.imageMapSources).forEach((key) => {
      this.images[key] = new Image();
      this.images[key].onload = () => { incrementCountLoaded(); };
      this.images[key].src = this.imageMapSources[key];
    });
    return counter;
  }
}


class CanvasAnimation {
  constructor(cnv, fps, logic) {
    this.logic = logic;
    this.fps = 100;
    this.interval = 1000 / fps;
    this.before = Date.now();
    this.canvas = cnv;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  update() {
    this.logic.update(this.canvas);
  }

  render() {
    this.resizeCanvas();
    for (let i = 0; i < this.logic.sceneObjects.length; i += 1) {
      this.logic.sceneObjects[i].draw(this.ctx);
    }
  }

  animate() {
    this.update();
    this.render();
  }
}


const run = (cnv) => {
  imageResouces = new Resouces(
    {
      power: './images/color_map.png',
      sick: './images/white_map.png',
      dead: './images/brushes_map.png',
    },
  );

  canvas = cnv;
  return imageResouces.loadResources()
    .then(() => {
      gameLogic = new GameLogic();
      for (let i = 0; i < 1; i += 1) {
        gameLogic.sceneObjects.push(emitMonster(imageResouces));
      }
      canvasAnimation = new CanvasAnimation(canvas, 10, gameLogic);
      check();
      return canvasAnimation;
    }).catch((error) => {
      window.console.log(error);
    });
};

function createMonster() {
  gameLogic.sceneObjects.push(emitMonster(imageResouces));
}

function setMonsterHp(hp) {
  gameLogic.sceneObjects[gameLogic.sceneObjects.length - 1].hp = hp;
  if (hp === 0) {
    createMonster();
  }
}


export default {
  run, setMonsterHp,
};
