// Je cree mon objet game, je decide de la resolution de ma fenetre
var game = new Phaser.Game(600, 850, Phaser.CANVAS, 'mastermind', {

// J'initialise mes fonctions de base
  preload: preload,
  create: create,
  update: update,
  render: render
});

//Je cree mes variables
var jouer_x;
var jouer_y;

var solution_x;
var solution_y;

var fruits = ['banane', 'fraise', 'pomme', 'cerise', 'pasteque', 'orange', 'raisin', 'citron'];

var solution = [];
var solutionJoueur = [];

function preload() {
  //Positions de départs du joueur
  jouer_x = 170;
  jouer_y = 600;

  //Positions de départs de la solution
  solution_x = 155;
  solution_y = 70;

  //Je cree ma combinaison aleatoire :
  //Boucle for : je mets dans les 4 boites de ma liste des nombres entre 1 et 8 inclus
  for (var i = 0; i < 4; i++) {
    solution[i] = fruits[Math.floor(Math.random()*7)];
  }
//J'affiche dans la console developpeur la variable solution
  console.log(solution);

  //Je load mes fonds
  game.load.image('frigo',   'images/frigo.png');
  game.load.image('palette', 'images/palette.png');

  //Fruits
  game.load.image('banane',   'images/banane.png');
  game.load.image('fraise',   'images/fraise.png');
  game.load.image('pomme',    'images/pomme.png');
  game.load.image('cerise',   'images/cerise.png');
  game.load.image('pasteque', 'images/pasteque.png');
  game.load.image('orange',   'images/orange.png');
  game.load.image('raisin',   'images/raisin.png');
  game.load.image('citron',   'images/citron.png');

  //Fruits solutions
  game.load.image('bananeco',   'images/bananeco.png');
  game.load.image('fraiseco',   'images/fraiseco.png');
  game.load.image('pommeco',    'images/pommeco.png');
  game.load.image('ceriseco',   'images/ceriseco.png');
  game.load.image('pastequeco', 'images/pastequeco.png');
  game.load.image('orangeco',   'images/orangeco.png');
  game.load.image('raisinco',   'images/raisinco.png');
  game.load.image('citronco',   'images/citronco.png');
}
//Mon sprite est un element que je peux deplacer sur l'ecran
function create() {
  game.add.tileSprite(0, 0, game.width, game.height, 'frigo');
  //Je colle sur la fenetre ma palette de 8 fruits
  var paletteSprite = game.add.tileSprite(408, 440, 150, 213, 'palette');
  paletteSprite.inputEnabled = true;
  //Quand je repere un clic, j'appelle la fonction checkFruit
  paletteSprite.events.onInputDown.add(checkFruit, this);
}

function update() {
}


function render() {
}

function checkFruit() {

  //Voici les variables des coordonnées de la souris
  var x = game.input.x;
  var y = game.input.y;

  //Je m'occupe de la colonne de fruits de gauche
  if (x > 442 && x < 475) {
    if (y > 457 && y < 488) {
      //J'appelle la fonction jouer qui me permet d'afficher le fruit
      jouer("pomme");
    } else if (y > 503 && y < 530) {
      jouer("raisin");
    } else if (y > 542 && y < 574) {
      jouer("banane");
    } else if (y > 584 && y < 619) {
      jouer("cerise");
    }
  //Je m'occupe de la colonne de fruits de droite
  } else if (x > 491 && x <523) {
    if (y > 457 && y < 488) {
      jouer("orange");
    } else if (y > 503 && y < 530) {
      jouer("pasteque");
    } else if (y > 542 && y < 574) {
      jouer("citron");
    } else if (y > 584 && y < 619) {
      jouer("fraise");
    }
  }
}

/*
Voici la fonction jouer qui permet d'afficher un fruit dans la combinaison
Du joueur en fonction du fruit choisit
Je positionne le fruit voulu aux coordonnées jouer_x, jouer_y avec la
Résolution de 40 par 40 pixels
La fonction jouer comprends aussi la vérificatin de la combinaison
*/

function jouer(fruit) {
  //Je colle donc mon fruit choisit dans la fenetre
  game.add.tileSprite(jouer_x, jouer_y, 40, 40, fruit);

  //Je complete la combinaison du joueur
  solutionJoueur[solutionJoueur.length] = fruit;

  console.log(solutionJoueur);
  //J'avance sur l'axe des abscisses
  jouer_x += 50;

  //Je vérifie la combinaison
  verification();

  //Je place mes pions de vérification (verts et oranges)
  indices();

  //Si jamais on a 4 fruits, alors on remets nos valeurs à 0
  if (solutionJoueur.length == 4) {
    //On remet valeur par défaut
    jouer_x = 170;
    //On remonte sur y
    jouer_y -= 50;
    //Je "vide" ma combinaison
    solutionJoueur = [];
  }
}

//Voici la fonction verification contenue notalment dans la fonction jouer
function verification() {
  //On vérifie si nos deux solutions sont égales à l'aide de notre méthode
  if (solutionJoueur.equals(solution)) {
    for (var i = 0; i < solution.length; i++) {
      var elem = solution[i]; // elem courant de la solution, on va itérer 4 fois
      //On rajoute le co pour les images gagnantes
      game.add.tileSprite(solution_x + i*50, solution_y, 65, 57, elem + "co");
    }
  }
}
//Fonction inachevée qui devait permettre de positionner les pions oranges et verts
function indices() {

}


/*
  this est un mot clé, qui signifie l'objet courant
  en gros sur cette fonction
  on appele par ex: monTableau.equals(solution)
  dans la fonction equals, this sera la valeur de monTableau
*/

Array.prototype.equals = function (tableau) {
  //Si jamais le tableau passé en paramètre est null alors on renvoie faux
  if (!tableau)
    return false;

  //Si jamais ils n'ont pas la même taille
  //On a pas besoin de comparer chacune de leur valeur, ils sont forcément pas égaux
  if (this.length != tableau.length)
    return false;

  for (var i = 0; i < this.length; i++) {
    if (this[i] != tableau[i]) {
      return false;
    }
  }

  return true;
};
