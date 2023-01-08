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

// Methode defense des héros
export function defenseAction(hero) {
  hero.ad *= 0.5;
  hero.pv *= 2.5;
  // Chances d'être attaqué *2
}

// Méthode attaque des héros
export function attaqueAction(hero) {
  hero.ad *= 1.4;
  hero.pv *= 0.75;
}

let random = Math.floor(Math.random() * 3);
// 3 = boss.length ou manaPossibles.length
let randomQuestion = Math.floor(Math.random() * 5);
// 5 = enigmesPrompts.length

// Boss random
let bossChoisi;
export function randomBoss() {
  let boss = [Instances.venom, Instances.father, Instances.dio];
  bossChoisi = boss[random];
  console.warn(
    `Le boss ${bossChoisi.nom} arrive dans l'arène ! PV:${bossChoisi.pv}, AD:${bossChoisi.ad}. Préparez-vous au combat !`
  );
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

// Instructions de base + création balise pour message de dépassement du max des points attribuables
let h4 = document.createElement("h4");
let message = document.createElement("p");
message.setAttribute("id", "message");
function insertHtml() {
  document.body.prepend(h4);
  h4.innerHTML = `Répartissez 300 points entre les PV et l'AD de vos persos`;
  // Message de dépassement
  document.body.appendChild(message);
}

let pvHeros = [];
let adHeros = [];
export let pvBoss = []
// Attribution des pv et ad par l'utilisateur
export function combat(hero) {
  // Pour créer un input number dans l'HTML pour saisir les attributs
  let input_numberPV = document.createElement("input");
  let input_numberAD = document.createElement("input");
  let labelPV = document.createElement("label");
  let labelAD = document.createElement("label");
  let boutonContinue = document.createElement("button");

  // établir un label et un input pour chaque classe de hero passée en paramètre
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
  input_numberPV.setAttribute("max", "290");
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
  input_numberAD.setAttribute("max", "290");
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

  //  Le total des attributs ne doit jamais dépasser total_attributs, il commence à 0
  let total_attributs = 300;
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
        hero.pv = parseInt(event.target.value);
        break;
      case "AD":
        hero.ad = parseInt(event.target.value);
        break;
    }
  }
  // Le montant de l'input est mis à jour à chaque modification
  input_numberPV.addEventListener("change", updateHeroAttribute);
  input_numberAD.addEventListener("change", updateHeroAttribute);

  function prepCombat(hero) {
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
          h4.style.display = "none";
          message.style.display = "none";
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
          h4.style.display = "none";
          message.style.display = "none";
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
          console.log(Instances.guerrier);
          console.log(
            `${Instances.mage.nom} : PV:${Instances.mage.pv}, AD:${Instances.mage.ad}, Mana:${Instances.mage.mana}`
          );
          console.log(Instances.mage);
          console.log(
            `${Instances.archer.nom} : PV:${Instances.archer.pv}, AD: ${Instances.archer.ad}, Flèches:${Instances.archer.arrows}`
          );
          console.log(Instances.archer);
          h4.style.display = "none";
          message.style.display = "none";
          // Tableau des PV et AD établis par l'utilisateur
          pvHeros.push(
            document.getElementById(`PV-${Instances.guerrier.nom}`).value
          );
          adHeros.push(
            document.getElementById(`AD-${Instances.guerrier.nom}`).value
          );
          pvHeros.push(
            document.getElementById(`PV-${Instances.mage.nom}`).value
          );
          adHeros.push(
            document.getElementById(`AD-${Instances.mage.nom}`).value
          );
          pvHeros.push(
            document.getElementById(`PV-${Instances.archer.nom}`).value
          );
          adHeros.push(
            document.getElementById(`AD-${Instances.archer.nom}`).value
          );
          // COMBAT
          affrontement();
        }
      });
    }
  }
  prepCombat();
}

let tours = 1;
export function affrontement() {
  setTimeout(() => {
    alert(
      `Tuez ${bossChoisi.nom} pour remporter la partie ! Pour commencer, donnez une posture à vos héros.`
    );
  }, 10);
  randomBoss();
  postures();
}

export function postures() {
  // Guerrier
  document.getElementById("select").style.display = "block";
  document.getElementById(
    "label_posture_guerrier"
  ).innerText = `Posture de ${Instances.guerrier.nom}`;
  const selPostureGuerrier = document.getElementById("post_g");

  let postureChanged1 = false;
  selPostureGuerrier.addEventListener("change", (event) => {
    if (postureChanged1) {
      // ignore l'événement si la posture a déjà été changée
      return;
    }
    postureChanged1 = true;
    if (event.target.value == "attaque") {
      attaqueAction(Instances.guerrier);
      console.log(
        `${Instances.guerrier.nom} adopte la posture d'attaque pour le tour ${tours}. Ses stats deviennent PV:${Instances.guerrier.pv}, AD:${Instances.guerrier.ad}.`
      );
    } else if (event.target.value == "defense") {
      defenseAction(Instances.guerrier);
      console.log(
        `${Instances.guerrier.nom} adopte la posture défensive pour le tour ${tours}. Ses stats deviennent PV:${Instances.guerrier.pv}, AD:${Instances.guerrier.ad} et a deux fois plus de chance d'être attaqué par le boss.`
      );
    } else {
      console.log(
        `${Instances.guerrier.nom} n'adopte pas de posture pour le tour ${tours}. Ses stats restent inchangées.`
      );
    }
  });

  // Mage
  document.getElementById(
    "label_posture_mage"
  ).innerText = `Posture de ${Instances.mage.nom}`;
  const selPostureMage = document.getElementById("post_m");

  let postureChanged2 = false;
  selPostureMage.addEventListener("change", (event) => {
    if (postureChanged2) {
      // ignore l'événement si la posture a déjà été changée
      return;
    }
    postureChanged2 = true;
    if (event.target.value == "attaque") {
      attaqueAction(Instances.mage);
      console.log(
        `${Instances.mage.nom} adopte la posture d'attaque pour le tour ${tours}. Ses stats deviennent PV:${Instances.mage.pv}, AD:${Instances.mage.ad}.`
      );
    } else if (event.target.value == "defense") {
      defenseAction(Instances.mage);
      console.log(
        `${Instances.mage.nom} adopte la posture défensive pour le tour ${tours}. Ses stats deviennent PV:${Instances.mage.pv}, AD:${Instances.mage.ad} et a deux fois plus de chance d'être attaqué par le boss.`
      );
    } else {
      console.log(
        `${Instances.mage.nom} n'adopte pas de posture pour le tour ${tours}. Ses stats restent inchangées.`
      );
    }
  });

  // Archer
  document.getElementById(
    "label_posture_archer"
  ).innerText = `Posture de ${Instances.archer.nom}`;
  const selPostureArcher = document.getElementById("post_a");

  let postureChanged3 = false;
  selPostureArcher.addEventListener("change", (event) => {
    if (postureChanged3) {
      // ignore l'événement si la posture a déjà été changée
      return;
    }
    postureChanged3 = true;

    if (event.target.value == "attaque") {
      attaqueAction(Instances.archer);
      console.log(
        `${Instances.archer.nom} adopte la posture d'attaque pour le tour ${tours}. Ses stats deviennent PV:${Instances.archer.pv}, AD:${Instances.archer.ad}.`
      );
    } else if (event.target.value == "defense") {
      defenseAction(Instances.archer);
      console.log(
        `${Instances.archer.nom} adopte la posture défensive pour le tour ${tours}. Ses stats deviennent PV:${Instances.archer.pv}, AD:${Instances.archer.ad} et a deux fois plus de chance d'être attaqué par le boss.`
      );
    } else {
      console.log(
        `${Instances.archer.nom} n'adopte pas de posture pour le tour ${tours}. Ses stats restent inchangées.`
      );
    }
    document.getElementById("tour").style.display = "block";
  });
  document.getElementById("tour").addEventListener("click", () => {
    posturesOK();
  });
  // Si les 3 postures sont sélectionnées, continuer
  function posturesOK() {
    if (
      postureChanged1 === true &&
      postureChanged2 === true &&
      postureChanged3 === true
    ) {
      heroes = [Instances.guerrier, Instances.mage, Instances.archer];
      // Si posture "défense", 2x plus de chance d'être attaqué par le boss => apparaît 2x dans le tableau des persos que le boss va choisir aléatoirement pour attaquer
      if (selPostureGuerrier.value === "defense") {
        heroes.push(Instances.guerrier);
      }
      if (selPostureMage.value === "defense") {
        heroes.push(Instances.mage);
      }
      if (selPostureArcher.value === "defense") {
        heroes.push(Instances.archer);
      }
      // Les postures sont modifiables pour le prochain tour
      postureChanged1 = false;
      postureChanged2 = false;
      postureChanged3 = false;
      selPostureGuerrier.value = "";
      selPostureMage.value = "";
      selPostureArcher.value = "";
      // FONCTION DE POKE CHACUN SON TOUR
      bagarre();
    }
  }
}

let heroes = [];

// Enigmes aléatoires
export function randomEnigme() {
  let pv_du_boss_choisi;
  if (bossChoisi.nom == "Venom") {
    pv_du_boss_choisi = pvBoss[0]
  } else if (bossChoisi.nom == "Father") {
    pv_du_boss_choisi = pvBoss[1]
  } else if (bossChoisi.nom == "Dio") {
    pv_du_boss_choisi = pvBoss[2]
  }
  // Enigmes possibles
  if (bossChoisi.pv <= (pv_du_boss_choisi * 0.20)) {
    alert(`${bossChoisi.nom} est sur le point de mourir. Il va vous poser une enigme à laquelle vous devez répondre en max 3 essais. Si vous trouvez la réponse à son énigme, vous le terrasserez définitivement, sinon vous mourrez ! Bonne chance.`);
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
      console.log(`Votre réponse est : ${reponseUser}`);
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
        alert(`Vous avez réussi à tuer ${bossChoisi.nom} !`);
        window.location.reload();
        break;
      } else {
        // Faux, encore "x" essais
        nbFoisQuestion++;
        if (nbFoisQuestion < 2) {
          console.log(
            `"${reponseUser}" est faux. Il vous reste ${
              3 - nbFoisQuestion
            } essais.`
          );
        } else if (nbFoisQuestion == 2) {
          console.log(
            `"${reponseUser}" est faux. Il vous reste ${
              3 - nbFoisQuestion
            } essai.`
          );
        }
      }
    }
    while (nbFoisQuestion === 3) {
      // Mort des héros
      Instances.guerrier.pv = 0;
      Instances.mage.pv = 0;
      Instances.archer.pv = 0;
      console.log(Instances.guerrier);
      console.log(Instances.mage);
      console.log(Instances.archer);
      sleep(100);
      alert("Vous avez échoué. Tous vos héros sont morts...");
      window.location.reload();
      break;
    }
  }
}


export function attGuerrier() {
  // Attaque du guerrier
  if (Instances.guerrier.rage > 4) {
    Instances.guerrier.rage = 0;
    Instances.guerrier.ad = adHeros[0];
    console.log(
      `La rage de ${Instances.guerrier.nom} est retombée à ${Instances.guerrier.rage}.`
    );
  }
  if (Instances.guerrier.rage == 4) {
    Instances.guerrier.rage = 4;
    Instances.guerrier.ad += Instances.guerrier.ad * 0.25;
    console.log(
      `${Instances.guerrier.nom} est empli de rage (${
        Instances.guerrier.rage
      }) ! Son attaque passe à ${Instances.guerrier.ad} pour le tour ${
        tours - 1
      }.`
    );
    Instances.guerrier.rage += 1;
  }

  console.log(
    `${Instances.guerrier.nom} attaque ${bossChoisi.nom}. Il lui inflige ${Instances.guerrier.ad} points de dégats.`
  );
  bossChoisi.pv -= Instances.guerrier.ad;

  if (Instances.guerrier.rage < 4) {
    Instances.guerrier.rage += 1;
    console.log(
      `La rage de ${Instances.guerrier.nom} augmente d'1 unité. Elle est maintenant évaluée à ${Instances.guerrier.rage}.`
    );
  }
  console.log(`${bossChoisi.nom} n'a plus que ${bossChoisi.pv} PV`);
  Instances.guerrier.pv = pvHeros[0];
  Instances.guerrier.ad = adHeros[0];
}

export function attMage() {
  // Attaque du mage
  if (Instances.mage.mana < 2) {
    console.log(
      `${Instances.mage.nom} n'a pas assez de mana (${Instances.mage.mana}) pour attaquer ${bossChoisi.nom}. Il passe son tour.`
    );
    Instances.mage.mana += 7;
    Instances.mage.pv = pvHeros[1];
    Instances.mage.ad = adHeros[1];
    return;
  }
  console.log(
    `${Instances.mage.nom} attaque ${bossChoisi.nom}. Il lui inflige ${Instances.mage.ad} points de dégats.`
  );
  bossChoisi.pv -= Instances.mage.ad;
  Instances.mage.mana -= 2;
  console.log(
    `${Instances.mage.nom} a utilisé 2 unités de mana. Il ne lui en reste plus que ${Instances.mage.mana} désormais.`
  );
  console.log(`${bossChoisi.nom} n'a plus que ${bossChoisi.pv} PV.`);
  Instances.mage.pv = pvHeros[1];
  Instances.mage.ad = adHeros[1];
}

export function attArcher() {
  // Attaque de l'archer
  if (Instances.archer.arrows < 2) {
    console.log(
      `${Instances.archer.nom} n'a plus assez de flèches dans son carquois (${Instances.archer.arrows}) pour attaquer ${bossChoisi.nom}. Il passe son tour.`
    );
    Instances.archer.arrows += 6;
    Instances.archer.pv = pvHeros[2];
    Instances.archer.ad = adHeros[2];
    return;
  }
  console.log(
    `${Instances.archer.nom} attaque ${bossChoisi.nom}. Il lui inflige ${Instances.archer.ad} points de dégats.`
  );
  bossChoisi.pv -= Instances.archer.ad;
  Instances.archer.arrows -= 2;
  console.log(
    `${Instances.archer.nom} a utilisé 2 flèches. Il ne lui en reste plus que ${Instances.archer.arrows} désormais.`
  );
  console.log(`${bossChoisi.nom} n'a plus que ${bossChoisi.pv} PV.`);
  Instances.archer.pv = pvHeros[2];
  Instances.archer.ad = adHeros[2];
}

export function attaqueHeros() {
  attGuerrier()
  sleep(1000);
  
  attMage()
  sleep(1000);

  attArcher()
  // Boss en dessous de 20% de pv
  randomEnigme();
}

// Fonction semblable à un setTimeout mais plus claire à utiliser
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// Fonction de l'attaque des persos pour chaque tour
export function bagarre() {
  console.warn(`Début du tour ${tours}`);
  h4.innerText = "Sélectionnez les postures de vos héros";
  h4.style.display = "block";
  tours += 1;
  sleep(500);
  attaqueHeros();
  // attaqueboss()
}

/* ****** DEROULEMENT DU COMBAT ********* */
export function deroulement() {
  // Nom des héros
  namesHeroes();
  // Insertion balises HTML
  insertHtml();
  // PV et AD des héros puis combat
  combat(Instances.guerrier);
  combat(Instances.mage);
  combat(Instances.archer);
}
