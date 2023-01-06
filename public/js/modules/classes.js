
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

export class Guerriers extends Personnages {
    constructor(nom, pv, ad, rage) {
        super(nom, pv, ad);
        this.rage = rage;
        this.defense = () => {}
        this.attaque = () => {}
    }
}


export class Mages extends Personnages {
    constructor(nom, pv, ad, mana) {
        super(nom, pv, ad);
        this.mana = mana;
        this.defense = () => {}
        this.attaque = () => {}
    }
}

export class Archers extends Personnages {
    constructor(nom, pv, ad, arrows) {
        super(nom, pv, ad);
        this.arrows = arrows;
        this.defense = () => {}
        this.attaque = () => {}
    }
}
