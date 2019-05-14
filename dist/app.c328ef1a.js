// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addScore = addScore;
exports.bestScore = exports.score = void 0;
var score = 0; //creation de la fonction de modification de la variable score
//A faire quand on a des export des variable car elle est immutable

exports.score = score;

function addScore() {
  exports.score = score = score + 1;
} //initialisation du best score trouvé dans 
//localStorage


var bestScore = window.localStorage.getItem('bestScore') || 0;
exports.bestScore = bestScore;
},{}],"components/Block.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("../app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Block =
/*#__PURE__*/
function () {
  function Block(col, row) {
    _classCallCheck(this, Block);

    this.col = col;
    this.row = row;
  } //création du block pour le snake


  _createClass(Block, [{
    key: "drawSquare",
    value: function drawSquare(color) {
      var x = this.col * _app.blockSize;
      var y = this.row * _app.blockSize;
      _app.ctx.fillStyle = color;

      _app.ctx.fillRect(x, y, _app.blockSize, _app.blockSize);
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(color) {
      var centerX = this.col * _app.blockSize + _app.blockSize / 2;
      var centerY = this.row * _app.blockSize + _app.blockSize / 2;
      _app.ctx.fillStyle = color;

      _app.ctx.beginPath();

      _app.ctx.arc(centerX, centerY, _app.blockSize / 2, 0, Math.PI * 2, false);

      _app.ctx.fill();
    }
  }, {
    key: "collide",
    value: function collide(block) {
      return this.col === block.col && this.row === block.row;
    }
  }]);

  return Block;
}();

var _default = Block;
exports.default = _default;
},{"../app":"app.js"}],"components/Snake.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("../app");

var _score = require("../score");

var _Block = _interopRequireDefault(require("./Block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Snake =
/*#__PURE__*/
function () {
  function Snake() {
    _classCallCheck(this, Snake);

    this.segments = [new _Block.default(7, 5), new _Block.default(6, 5), new _Block.default(5, 5)];
    this.direction = 'right';
  }

  _createClass(Snake, [{
    key: "draw",
    value: function draw() {
      this.segments.map(function (segment) {
        return segment.drawSquare('#BADA55');
      });
    }
  }, {
    key: "setDirection",
    value: function setDirection(newDirection) {
      this.direction = newDirection;
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(head) {
      //collision avec les murs ( renvoi true si le serpent touche un mur)
      var leftCollision = head.col === 0;
      var topCollision = head.row === 0;
      var rightCollision = head.col === _app.widthInBlock - 1;
      var bottomCollision = head.row === _app.heightInBlock - 1;
      var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
      var selfCollision = false;
      this.segments.map(function (segment) {
        if (head.collide(segment)) {
          selfCollision = true;
        }
      });
      return selfCollision || wallCollision;
    }
  }, {
    key: "move",
    value: function move() {
      var head = this.segments[0];
      var newHead;

      if (this.direction === 'right') {
        newHead = new _Block.default(head.col + 1, head.row);
      } else if (this.direction === 'left') {
        newHead = new _Block.default(head.col - 1, head.row);
      } else if (this.direction === 'up') {
        newHead = new _Block.default(head.col, head.row - 1);
      } else if (this.direction === 'down') {
        newHead = new _Block.default(head.col, head.row + 1);
      }

      if (this.checkCollision(newHead)) {
        (0, _app.gameOver)();
        return;
      } //unshift: rajoute un élément au début du tableau


      this.segments.unshift(newHead); //transforme la pomme à la collision en tête de serpent pour le faire grandir

      if (newHead.collide(_app.apple.position)) {
        (0, _score.addScore)();

        _app.apple.move();
      } else {
        this.segments.pop();
      } //pop: supprime le dernière élément d'un tableau

    }
  }]);

  return Snake;
}();

var _default = Snake;
exports.default = _default;
},{"../app":"app.js","../score":"score.js","./Block":"components/Block.js"}],"components/Apple.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("../app");

var _Block = _interopRequireDefault(require("./Block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Apple =
/*#__PURE__*/
function () {
  function Apple() {
    _classCallCheck(this, Apple);

    this.position = new _Block.default(Math.floor(Math.random() * (_app.widthInBlock - 2) + 1), Math.floor(Math.random() * (_app.heightInBlock - 2) + 1), _app.ctx, _app.blockSize);
  }

  _createClass(Apple, [{
    key: "draw",
    value: function draw() {
      this.position.drawCircle('#FB1');
    }
  }, {
    key: "move",
    value: function move() {
      var randomCol = Math.floor(Math.random() * (_app.widthInBlock - 2) + 1);
      var randomRow = Math.floor(Math.random() * (_app.widthInBlock - 2) + 1);
      this.position = new _Block.default(randomCol, randomRow, _app.ctx, _app.blockSize);
    }
  }]);

  return Apple;
}();

var _default = Apple;
exports.default = _default;
},{"../app":"app.js","./Block":"components/Block.js"}],"directions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = require("./app");

var directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};
/**
 * Events
 */

var move = function move() {
  return window.addEventListener('keydown', function (event) {
    if (_app.endGame) {
      window.location.reload();
    }

    var newDirection = directions[event.keyCode];

    if (newDirection !== undefined) {
      _app.snake.setDirection(newDirection);
    }
  });
};

var _default = move;
exports.default = _default;
},{"./app":"app.js"}],"helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBorder = drawBorder;
exports.drawScore = drawScore;
exports.drawBestScore = drawBestScore;
exports.saveBestScore = saveBestScore;
exports.setSpeed = setSpeed;

var _app = require("./app");

var _score = require("./score");

/**
 * Les fonctions
 */
//dessin du plateau
function drawBorder() {
  _app.ctx.fillStyle = 'rgba(0,0,0,0.2)';

  _app.ctx.fillRect(0, 0, _app.width, _app.blockSize);

  _app.ctx.fillRect(0, _app.height - _app.blockSize, _app.width, _app.blockSize);

  _app.ctx.fillRect(0, 0, _app.blockSize, _app.height);

  _app.ctx.fillRect(_app.width - _app.blockSize, 0, _app.blockSize, _app.height);
}

function drawScore() {
  _app.ctx.font = '18px Monospace';
  _app.ctx.fillStyle = '#1d1d1d';
  _app.ctx.textAlign = 'left';
  _app.ctx.textBaseline = 'top';

  _app.ctx.fillText("Score: ".concat(_score.score), _app.blockSize, _app.blockSize);
} //Meilleur score


function drawBestScore() {
  _app.ctx.font = '18px Monospace';
  _app.ctx.fillStyle = '#1d1d1d';
  _app.ctx.textAlign = 'left';
  _app.ctx.textBaseline = 'top';

  _app.ctx.fillText("Best: ".concat(_score.bestScore), _app.blockSize, _app.blockSize * 3);
} //Sauvegarde du meilleur score dans localStorage


function saveBestScore() {
  if (_score.score > _score.bestScore) {
    window.localStorage.setItem('bestScore', _score.score);
  }
} //speed


function setSpeed() {
  var start = 70;
  var end = 16;
  var maxScore = 15;
  var delay = Math.floor(Math.max(start - (start - end) * _score.score / maxScore, end));
  return delay;
}
},{"./app":"app.js","./score":"score.js"}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOver = gameOver;
exports.snake = exports.endGame = exports.apple = exports.heightInBlock = exports.widthInBlock = exports.blockSize = exports.height = exports.width = exports.ctx = void 0;

var _Snake = _interopRequireDefault(require("./components/Snake"));

var _Apple = _interopRequireDefault(require("./components/Apple"));

var _directions = _interopRequireDefault(require("./directions"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
exports.ctx = ctx;
var width = canvas.width;
exports.width = width;
var height = canvas.height; //definition de la grille

exports.height = height;
var blockSize = 10;
exports.blockSize = blockSize;
var widthInBlock = width / blockSize;
exports.widthInBlock = widthInBlock;
var heightInBlock = height / blockSize;
exports.heightInBlock = heightInBlock;
var endGame = false;
/**
 * Les blocks
 */

exports.endGame = endGame;
var snake = new _Snake.default();
exports.snake = snake;
var apple = new _Apple.default();
exports.apple = apple;
(0, _directions.default)();

function gameOver() {
  ctx.font = '60px Monospace';
  ctx.fillStyle = '#1d1d1d';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game Over', width / 2, height / 2);
  exports.endGame = endGame = true;
}

function interval() {
  if (endGame) {
    (0, _helpers.saveBestScore)();
    window.cancelAnimationFrame(play);
    return;
  }

  ctx.clearRect(0, 0, width, height);
  snake.move();
  snake.draw();
  apple.draw();
  (0, _helpers.drawScore)();
  (0, _helpers.drawBestScore)();
  (0, _helpers.drawBorder)();
  setTimeout(function () {
    return play = window.requestAnimationFrame(interval);
  }, (0, _helpers.setSpeed)());
} //Démarrer le jeu


var play = window.requestAnimationFrame(interval);

window.onload = function () {
  TweenMax.set('body', {
    opacity: 1
  });
  var tl1 = new TimelineMax();
  tl1.from('.title', 1.2, {
    delay: 0.1,
    scale: 0,
    top: "50%",
    left: "50%",
    opacity: 0,
    ease: Back.easeOut.config(1.7)
  });
};
},{"./components/Snake":"components/Snake.js","./components/Apple":"components/Apple.js","./directions":"directions.js","./helpers":"helpers.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59686" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map