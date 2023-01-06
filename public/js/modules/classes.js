

export class Boss {
  constructor(nom, pv, ad) {
    this.nom = nom;
    this.pv = pv;
    this.ad = ad;
    this.enigme = () => {
        if (this.pv <= (this.pv*0.2)) {

        }
    }
  }
}
