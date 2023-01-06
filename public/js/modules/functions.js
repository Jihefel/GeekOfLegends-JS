import * as Instances from "./instances.js";
// console.log(venom);

let random = Math.floor(Math.random()*3) /* 3 = boss.length ou manaPossibles.length ou enigmesPrompt.length*/

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
    if (bossChoisi.pv <= (bossChoisi.pv)*0.2) {
        // Enigmes possibles
        let enigmesPrompt = [`Que vaut le résultat des index 2,5,3,8,7 du mot "refluates"`, `Je transforme une plante en une planète. Qui suis-je ?`, `Un père et son fils ont 36 ans à eux deux. Le père a 30 ans de plus que son fils. Quel est l'âge du père ?`]
        // Réponses aux énigmes
        let enigmesReponse = ["false", "è", 33]
        // Enigme random demandée
        let enigmeAsked = enigmesPrompt[random]
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
}