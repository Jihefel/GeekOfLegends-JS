import { randomMana, randomArrows } from "./functions.js";


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

            }
        }
  }
}

export class Guerriers extends Personnages {
    constructor(nom, pv, ad) {
        super(nom, pv, ad);
        this.rage = 0;
        this.defense = () => {}
        this.attaque = () => {}
    }
}


export class Mages extends Personnages {
    constructor(nom, pv, ad) {
        super(nom, pv, ad);
        this.mana = randomMana();
        this.defense = () => {}
        this.attaque = () => {}
    }
}

export class Archers extends Personnages {
    constructor(nom, pv, ad) {
        super(nom, pv, ad);
        this.arrows = randomArrows(7,11);
        this.defense = () => {}
        this.attaque = () => {}
    }
}
