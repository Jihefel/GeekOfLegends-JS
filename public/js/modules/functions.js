import * as Instances from "./instances.js";

// Attribution des noms aux héros
export function namesHeroes() {
  // Nom du Guerrier
  let nomGuerrier = prompt(
    `Quel est le nom de votre ${"guerrier".toUpperCase()} ?`
  );
  // Tant que le prompt est vide ou que l'utilisateur essaye de l'esquiver :
  while (nomGuerrier == "" || nomGuerrier === null) {
    nomGuerrier = prompt(
      `Quel est le nom de votre ${"guerrier".toUpperCase()} ?`
    );
  }
  Instances.guerrier.nom =
    nomGuerrier.charAt(0).toUpperCase() +
    nomGuerrier.substring(1).toLowerCase();
  console.warn(`Le guerrier ${Instances.guerrier.nom} prend part au combat`);
  // Nom du Mage
  let nomMage = prompt(
    `Quel est le nom de votre ${"mage".toLocaleUpperCase()} ?`
  );
  while (nomMage == "" || nomMage === null) {
    nomMage = prompt(
      `Quel est le nom de votre ${"mage".toLocaleUpperCase()} ?`
    );
  }
  Instances.mage.nom =
    nomMage.charAt(0).toUpperCase() + nomMage.substring(1).toLowerCase();
  console.warn(`Le mage ${Instances.mage.nom} prend part au combat`);
  // Nom de l'archer
  let nomArcher = prompt(
    `Quel est le nom de votre ${"archer".toLocaleUpperCase()} ?`
  );
  while (nomArcher == "" || nomArcher === null) {
    nomArcher = prompt(
      `Quel est le nom de votre ${"archer".toLocaleUpperCase()} ?`
    );
  }
  Instances.archer.nom =
    nomArcher.charAt(0).toUpperCase() + nomArcher.substring(1).toLowerCase();
  console.warn(`L'archer ${Instances.archer.nom} prend part au combat`);
}

// Instructions de base + création balise pour message de dépassement du max des points attribuables
function insertHtml() {
  let h4 = document.createElement("h4");
  document.body.prepend(h4);
  h4.innerHTML = `Répartissez 500 points entre les PV et l'AD de vos persos`;
  // Message de dépassement
  let message = document.createElement("p");
  message.setAttribute("id", "message");
  document.body.appendChild(message);
}

// Attribution des pv et ad par l'utilisateur
export function combat(hero) {

  // Pour créer un input number dans l'HTML pour saisir les attributs
  let input_numberPV = document.createElement("input");
  let input_numberAD = document.createElement("input");
  let labelPV = document.createElement("label");
  let labelAD = document.createElement("label");
  let boutonContinue = document.createElement("button");

  function createElements(hero) {
    // Bouton continuer
    boutonContinue.innerText = `Valider les attributs pour ${hero.nom}`;
    boutonContinue.setAttribute("id", `boutonContinue-${hero.nom}`);
    boutonContinue.style.display = "none";
    document.body.appendChild(boutonContinue);

    // PV
    input_numberPV.setAttribute("type", "number");
    input_numberPV.setAttribute("id", `PV-${hero.nom}`);
    input_numberPV.setAttribute("name", `PV de ${hero.nom}`);
    input_numberPV.setAttribute("placeholder", `PV de ${hero.nom}`);
    input_numberPV.setAttribute("min", "10");
    input_numberPV.setAttribute("max", "490");
    input_numberPV.setAttribute("step", "10");
    input_numberPV.setAttribute("style", "width:8%;display:inline");
    labelPV.setAttribute("for", `PV de ${hero.nom}`);
    labelPV.setAttribute("id", `PV de ${hero.nom}`);
    labelPV.innerText = `      PV de ${hero.nom} : `;
    // AD
    input_numberAD.setAttribute("type", "number");
    input_numberAD.setAttribute("id", `AD-${hero.nom}`);
    input_numberAD.setAttribute("name", `AD de ${hero.nom}`);
    input_numberAD.setAttribute("placeholder", `AD de ${hero.nom}`);
    input_numberAD.setAttribute("min", "10");
    input_numberAD.setAttribute("max", "490");
    input_numberAD.setAttribute("step", "10");
    input_numberAD.setAttribute("style", "width:8%;display:inline");
    labelAD.setAttribute("for", `AD de ${hero.nom}`);
    labelAD.setAttribute("id", `AD de ${hero.nom}`);
    labelAD.innerText = `      AD de ${hero.nom} : `;
    // Ecriture des labels et inputs dans l'HTML
    document.getElementById("pv").appendChild(labelPV);
    document.getElementById("pv").appendChild(input_numberPV);
    document.getElementById("ad").appendChild(labelAD);
    document.getElementById("ad").appendChild(input_numberAD);
  }
  // Appel du début de la fonction pour établir un label et un input pour chaque classe de hero passée en paramètre
  createElements(hero);

  //  Le total des attributs ne doit jamais dépasser total_attributs, il commence à 0
  let total_attributs = 500;
  let total = 0;

  // Mise à jour du total
  function updateTotal() {
    // Total = AD + PV du perso
    total = Number(input_numberPV.value) + Number(input_numberAD.value);
    // Message d'erreur si le total dépasse les 500 max
    if (total > total_attributs) {
      message.innerText = `Le total des attributs de ${hero.nom} ne doit pas dépasser ${total_attributs}.`;
      // Si dépasse 500, la valeur des PV agit sur la valeur de l'AD, empêchant de dépasser
      input_numberAD.value = total_attributs - Number(input_numberPV.value);
    } else if (total * 3 === total_attributs * 3) {
      boutonContinue.style.display = "block";
    } else if (total * 3 < total_attributs * 3) {
      // Si pas de dépassement, ne rien afficher dans la balise p du message
      message.innerText = "";
      boutonContinue.style.display = "none";
    } else {
      // Si pas de dépassement, ne rien afficher dans la balise p du message
      message.innerText = "";
      boutonContinue.style.display = "none";
    }
  }

  // Lecture de la valeur de l'input des PV et met à jour les valeurs pour la vérification du dépassement
  input_numberPV.addEventListener("input", function () {
    updateTotal();
  });

  // Lecture de la valeur de l'input de l'AD et met à jour les valeurs pour la vérification du dépassement
  input_numberAD.addEventListener("input", function () {
    updateTotal();
  });

  function updateHeroAttribute(event) {
    // Récupération de l'ID de l'input et du nom de l'héro
    const inputId = event.target.id;
    // Récupération de la partie de l'ID de l'input avant le - => soit PV soit AD
    const attribut = inputId.split("-")[0];

    // Mise à jour de l'ad ou des pv en fonction de l'attribut
    switch (attribut) {
      case "PV":
        hero.pv = event.target.value;
        break;
      case "AD":
        hero.ad = event.target.value;
        break;
    }
  }
  // Le montant de l'input est mis à jour à chaque modification
  input_numberPV.addEventListener("change", updateHeroAttribute);
  input_numberAD.addEventListener("change", updateHeroAttribute);

  function prepCombat() {
    // Lors du clic des boutons, l'attribution disparait et si le dernier est cliqué, le combat commence
    let bouton1 = document.getElementById(
      `boutonContinue-${Instances.guerrier.nom}`
    );
    let bouton2 = document.getElementById(
      `boutonContinue-${Instances.mage.nom}`
    );
    let bouton3 = document.getElementById(
      `boutonContinue-${Instances.archer.nom}`
    );
    let bouton1Clicked = false;
    let bouton2Clicked = false;
    let bouton3Clicked = false;
    // Bouton pour guerrier
    if (bouton1) {
      bouton1.addEventListener("click", () => {
        document.getElementById(`PV-${Instances.guerrier.nom}`).style.display =
          "none";
        document.getElementById(`AD-${Instances.guerrier.nom}`).style.display =
          "none";
        document.getElementById(
          `PV de ${Instances.guerrier.nom}`
        ).style.display = "none";
        document.getElementById(
          `AD de ${Instances.guerrier.nom}`
        ).style.display = "none";
        bouton1.style.display = "none";
        bouton1Clicked = true;
        if (
          bouton1Clicked == true &&
          bouton2Clicked == true &&
          bouton3Clicked == true
        ) {
          console.log(
            `${Instances.guerrier.nom} : PV:${Instances.guerrier.pv}, AD:${Instances.guerrier.ad}, Rage:${Instances.guerrier.rage}`
          );
          console.log(
            `${Instances.mage.nom} : PV:${Instances.mage.pv}, AD:${Instances.mage.ad}, Mana:${Instances.mage.mana}`
          );
          console.log(
            `${Instances.archer.nom} : PV:${Instances.archer.pv}, AD: ${Instances.archer.ad}, Flèches:${Instances.archer.arrows}`
          );
          document.body.style.display = "none";
          // COMBAT
          affrontement();
        }
      });
    }
    if (bouton2) {
      // Bouton pour mage
      bouton2.addEventListener("click", () => {
        document.getElementById(`PV-${Instances.mage.nom}`).style.display =
          "none";
        document.getElementById(`AD-${Instances.mage.nom}`).style.display =
          "none";
        document.getElementById(`PV de ${Instances.mage.nom}`).style.display =
          "none";
        document.getElementById(`AD de ${Instances.mage.nom}`).style.display =
          "none";
        bouton2.style.display = "none";
        bouton2Clicked = true;
        if (
          bouton1Clicked == true &&
          bouton2Clicked == true &&
          bouton3Clicked == true
        ) {
          console.log(
            `${Instances.guerrier.nom} : PV:${Instances.guerrier.pv}, AD:${Instances.guerrier.ad}, Rage:${Instances.guerrier.rage}`
          );
          console.log(
            `${Instances.mage.nom} : PV:${Instances.mage.pv}, AD:${Instances.mage.ad}, Mana:${Instances.mage.mana}`
          );
          console.log(
            `${Instances.archer.nom} : PV:${Instances.archer.pv}, AD: ${Instances.archer.ad}, Flèches:${Instances.archer.arrows}`
          );
          document.body.style.display = "none";
          // COMBAT
          affrontement();
        }
      });
    }
    if (bouton3) {
      // Bouton pour archer
      bouton3.addEventListener("click", () => {
        document.getElementById(`PV-${Instances.archer.nom}`).style.display =
          "none";
        document.getElementById(`AD-${Instances.archer.nom}`).style.display =
          "none";
        document.getElementById(`PV de ${Instances.archer.nom}`).style.display =
          "none";
        document.getElementById(`AD de ${Instances.archer.nom}`).style.display =
          "none";
        bouton3.style.display = "none";
        bouton3Clicked = true;
        // Si les 3 boutons ont été cliqué, afficher la suite
        if (
          bouton1Clicked == true &&
          bouton2Clicked == true &&
          bouton3Clicked == true
        ) {
          console.log(
            `${Instances.guerrier.nom} : PV:${Instances.guerrier.pv}, AD:${Instances.guerrier.ad}, Rage:${Instances.guerrier.rage}`
          );
          console.log(
            `${Instances.mage.nom} : PV:${Instances.mage.pv}, AD:${Instances.mage.ad}, Mana:${Instances.mage.mana}`
          );
          console.log(
            `${Instances.archer.nom} : PV:${Instances.archer.pv}, AD: ${Instances.archer.ad}, Flèches:${Instances.archer.arrows}`
          );
          document.body.style.display = "none";
          // COMBAT
          affrontement();
        }
      });
    }
  }
  prepCombat();
}

export function affrontement() {
  confirm("Bienvenue dans la faille de l'invocateur");
  randomBoss();
}

export function postureGuerrier(hero) {
  
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

let random = Math.floor(Math.random() * 3);
// 3 = boss.length ou manaPossibles.length
let randomQuestion = Math.floor(Math.random() * 5);
// 5 = enigmesPrompts.length

// Boss random
export function randomBoss() {
  let boss = [Instances.venom, Instances.father, Instances.dio];
  let bossChoisi = boss[random];
  console.warn(
    `Le boss ${bossChoisi.nom} arrive dans l'arène ! PV:${bossChoisi.pv}, AD:${bossChoisi.ad}. Préparez-vous au combat !`
  );
  return bossChoisi;
}

// Mana possibles
export function randomMana() {
  let manaPossibles = [7, 9, 11];
  let mana = manaPossibles[random];
  return mana;
}

// Nombre de flèches aléatoires
export function randomArrows(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Enigmes aléatoires
export function randomEnigme(bossChoisi) {
  // Boss en dessous de 20% de pv
  if (bossChoisi.pv <= bossChoisi.pv * 0.2) {
    // Enigmes possibles
    let enigmesPrompt = [
      `Que vaut le résultat des index 2,5,3,8,7 du mot "refluates"`,
      `Je transforme une plante en une planète. Qui suis-je ?`,
      `Un père et son fils ont 36 ans à eux deux. Le père a 30 ans de plus que son fils. Quel est l'âge du père ?`,
      `Quand je suis frais, je suis chaud. Qui suis-je ?`,
      `Que signifie "avoir 192 poule?" ${`Attention, il n'y pas de "s" à poule`.toUpperCase()}`,
    ];
    // Réponses aux énigmes
    let enigmesReponse = ["false", "è", 33, "pain", "oeuf"];
    // Enigme random demandée
    let enigmeAsked = enigmesPrompt[randomQuestion];
    // Boucle de réponse
    let nbFoisQuestion = 0;
    while (nbFoisQuestion < 3) {
      let reponseUser = prompt(enigmeAsked) /*Bonus =>*/
        .toLocaleLowerCase()
        .replace(/\s/g, "")
        .trim();
      console.log(reponseUser);
      if (
        reponseUser ===
          enigmesReponse[enigmesPrompt.indexOf(enigmeAsked)] /*Bonus 2 =>*/ ||
        reponseUser.includes(
          enigmesReponse[enigmesPrompt.indexOf(enigmeAsked)]
        ) === true
      ) {
        // Mort du boss
        bossChoisi.pv = 0;
        console.log(`Vous avez réussi à tuer ${bossChoisi.nom} !`);
        break;
      } else {
        // Faux, encore "x" essais
        nbFoisQuestion++;
        if (nbFoisQuestion < 2) {
          console.log(`Faux. Il vous reste ${3 - nbFoisQuestion} essais`);
        } else if (nbFoisQuestion == 2) {
          console.log(`Faux. Il vous reste ${3 - nbFoisQuestion} essai`);
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

/* ****** DEROULEMENT DU COMBAT ********* */
export function deroulement() {
  // Nom des héros
  namesHeroes();
  // Insertion balises HTML
  insertHtml();
  // PV et AD des héros
  combat(Instances.guerrier);
  combat(Instances.mage);
  combat(Instances.archer);
}
