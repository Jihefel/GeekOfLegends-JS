import * as Instances from "./instances.js";

// Attribution des noms aux héros
export function namesHeroes() {
    // Nom du Guerrier
    let nomGuerrier = prompt(`Quel est le nom de votre ${"guerrier".toUpperCase()} ?`)
    // Tant que le prompt est vide ou que l'utilisateur essaye de l'esquiver :
    while (nomGuerrier == "" || nomGuerrier === null) {
        nomGuerrier = prompt(`Quel est le nom de votre ${"guerrier".toUpperCase()} ?`)
    }
    Instances.guerrier.nom = (nomGuerrier.charAt(0).toUpperCase() + nomGuerrier.substring(1));
    // Nom du Mage
    let nomMage = prompt(`Quel est le nom de votre ${"mage".toLocaleUpperCase()} ?`)
    while (nomMage == "" || nomMage === null) {
        nomMage = prompt(`Quel est le nom de votre ${"mage".toLocaleUpperCase()} ?`)
    }
    Instances.mage.nom = (nomMage.charAt(0).toUpperCase() + nomMage.substring(1));
    // Nom de l'archer
    let nomArcher = prompt(`Quel est le nom de votre ${"archer".toLocaleUpperCase()} ?`);
    while (nomArcher == "" || nomArcher === null) {
        nomArcher = prompt(`Quel est le nom de votre ${"archer".toLocaleUpperCase()} ?`);
    }
    Instances.archer.nom = (nomArcher.charAt(0).toUpperCase() + nomArcher.substring(1));
}

// Methode defense des héros
export function defenseAction() {
    this.ad *= 0.5;
    this.pv *= 2.5;
    // Chances d'être attaqué *2 
}

// Méthode attaque des héros
export function attaqueAction() {
    this.ad *= 1.4;
    this.pv *= 0.75;
}

let random = Math.floor(Math.random()*3)
// 3 = boss.length ou manaPossibles.length
let randomQuestion = Math.floor(Math.random()*5)
// 5 = enigmesPrompts.length

// Boss random
export function randomBoss() {
    let boss = [Instances.venom, Instances.father, Instances.dio];
    let bossChoisi = boss[random]
    return bossChoisi
}

// Mana possibles
export function randomMana() {
    let manaPossibles = [7,9,11]
    let mana = manaPossibles[random]
    return mana
}

// Nombre de flèches aléatoires
export function randomArrows(min, max) {
    return Math.random() * (max - min) + min;
}

// Enigmes aléatoires
export function randomEnigme(bossChoisi) {
    // Boss en dessous de 20% de pv
    // if (bossChoisi.pv <= (bossChoisi.pv)*0.2) {
        // Enigmes possibles
        let enigmesPrompt = [`Que vaut le résultat des index 2,5,3,8,7 du mot "refluates"`, `Je transforme une plante en une planète. Qui suis-je ?`, `Un père et son fils ont 36 ans à eux deux. Le père a 30 ans de plus que son fils. Quel est l'âge du père ?`, `Quand je suis frais, je suis chaud. Qui suis-je ?`, `Que signifie "avoir 192 poule?" ${`Attention, il n'y pas de "s" à poule`.toUpperCase()}`]
        // Réponses aux énigmes
        let enigmesReponse = ["false", "è", 33, "pain", "oeuf"]
        // Enigme random demandée
        let enigmeAsked = enigmesPrompt[randomQuestion]
        // Boucle de réponse
        let nbFoisQuestion = 0
        while (nbFoisQuestion < 3) {
            let reponseUser = prompt(enigmeAsked)/*Bonus =>*/.toLocaleLowerCase().replace(/\s/g, '').trim();
            console.log(reponseUser);
            if (reponseUser === enigmesReponse[enigmesPrompt.indexOf(enigmeAsked)] /*Bonus 2 =>*/|| reponseUser.includes(enigmesReponse[enigmesPrompt.indexOf(enigmeAsked)]) === true) {
                // Mort du boss
                bossChoisi.pv = 0;
                console.log(`Vous avez réussi à tuer ${bossChoisi.nom} !`);
                break;
            } else {
                // Faux, encore "x" essais
                nbFoisQuestion++;
                if (nbFoisQuestion < 2) {
                    console.log(`Faux. Il vous reste ${(3 - nbFoisQuestion)} essais`);
                } else if (nbFoisQuestion == 2) {
                    console.log(`Faux. Il vous reste ${(3 - nbFoisQuestion)} essai`);
                }
            }
        }
        if (nbFoisQuestion === 3) {
            // Mort des héros
            Instances.guerrier.pv = 0;
            Instances.mage.pv = 0;
            Instances.archer.pv = 0;
            console.log("Vous avez échoué. Tous vos héros sont morts");
        }
    }
// }