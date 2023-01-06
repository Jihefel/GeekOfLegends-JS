import { defenseAction,attaqueAction } from "./functions.js";

export class Personnages {
    constructor(nom, pv, ad) {
        this.nom = nom;
        this.pv = pv;
        this.ad = ad;
    }
}

export class Boss extends Personnages {
    constructor(nom, pv, ad) {
        super(nom, pv, ad);
        this.enigme = () => {
            if (this.pv <= (this.pv*0.2)) {
                randomEnigme()
            }
        }
  }
}

export class Guerrier extends Personnages {
    constructor(nom, pv, ad, rage) {
        super(nom, pv, ad);
        this.rage = rage;
        this.defense = () => {defenseAction()}
        this.attaque = () => {attaqueAction()}
    }
}


export class Mage extends Personnages {
    constructor(nom, pv, ad, mana) {
        super(nom, pv, ad);
        this.mana = mana;
        this.defense = () => {defenseAction()}
        this.attaque = () => {attaqueAction()}
    }
}

export class Archer extends Personnages {
    constructor(nom, pv, ad, arrows) {
        super(nom, pv, ad);
        this.arrows = arrows;
        this.defense = () => {defenseAction()}
        this.attaque = () => {attaqueAction()}
    }
}