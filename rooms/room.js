
'use strict';

class Character {
    constructor(cat, name, lifePoints, immunity, weapon) {
        this.elm = document.createElement('h6');
        this.elm.classList += cat;
        this.elm.id = cat;
        this.name = name;
        this.lifePoints = lifePoints;
        this.immunity = immunity || undefined;
        this.weapon = weapon || new Knife();
        this.elm.innerHTML = name;
        document.getElementById('arena').appendChild(this.elm);
        this.elm.addEventListener('click', evt => this.displayStats(evt));
    }

    attack(Target) {
        Target.getHit(this.weapon);
        changeTurn();
    }

    getHit(weapon) {
        if (this.immunity === weapon.name) {
            console.log(`${this.name} is immune to ${weapon.name}`);
        } else {
            this.lifePoints -= weapon.attackPoints;
            if (this.lifePoints <= 0) this.lifePoints = 0;
            console.log(`${this.name} is hit and looses ${weapon.attackPoints}`);
        }
    }

    displayStats() {
        let stats = `${this.name}<br>Life: ${this.lifePoints}<br>Weapon: ${this.weapon.name}`;
        console.log(stats);
    }

    die() {
        console.log(`${this.name} dies.`);
    }
};

class Player extends Character {
    constructor(cat, name) {
        super(cat, name, 20);
    }

    pickObject(object) {
        this.weapon = object;
        console.log(`${this.name} picks up ${object.name}`);
    }
}

class Goblin extends Character {
    constructor(cat, name) {
        super(cat, name, 15, 'knife');
        this.categorie = 'goblin';
    }

    selectAction(player) {
        let randJesus = Math.floor((Math.random() * 2));
        console.log(randJesus);
        if (randJesus > 0) {
            this.attack(player);
        } else {
            this.grawl();
        }
    }

    grawl() {
        console.log('The Goblin utters a Grawl that freezes you blood.');
        changeTurn();
    }
}

class Weapon {
    constructor(name, attackPoints) {
        this.name = name;
        this.attackPoints = attackPoints;
    }
}

class Knife extends Weapon {
    constructor() {
        super('knife', 2);
    }
}

let playerName = prompt('Name your doomed character!');
let turn = 0;
let player = new Player('player', playerName);
let goblin = new Goblin('enemy', 'Noghul');
let sword = new Weapon('sword', 10);

function gameLoop() {
    //console.log('One loop')
    if (player.lifePoints > 0 && goblin.lifePoints > 0) {
        if (turn === 1) {
            goblin.selectAction(player);
            turn = 0;
        }
        setTimeout(gameLoop, 3000);
    } else {
        if (player.lifePoints <= 0) player.die();
        if (goblin.lifePoints <= 0) goblin.die();
    }
}

gameLoop();

function changeTurn() {
    if (turn == 0) turn = 1;
    else turn = 0
}