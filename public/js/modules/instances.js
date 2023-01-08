import * as classes from "./classes.js";

import { randomMana, randomArrows, randomBoss } from "./functions.js";

// Instances de Boss
export let venom = new classes.Boss ("Venom", 500, 40);
export let father = new classes.Boss ("Father", 500, 30);
export let dio = new classes.Boss ("Dio", 500, 20);

// Instance de Guerrier
export let guerrier = new classes.Guerrier ("", 0, 0, 0);
// Instance de Mage
export let mage = new classes.Mage ("", 0, 0, randomMana())
// Instance de Archers
export let archer = new classes.Archer ("", 0, 0, randomArrows(7,11))