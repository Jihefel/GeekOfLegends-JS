import * as classes from "./classes.js";

import { randomMana, randomArrows } from "./functions.js";

// Instances de Boss
export let venom = new classes.Boss ("Venom", 5000, 80);
export let father = new classes.Boss ("Father", 7000, 30);
export let dio = new classes.Boss ("Dio", 3000, 80);

// Instance de Guerrier
export let guerrier = new classes.Guerrier ("", 0, 0, 0);
// Instance de Mage
export let mage = new classes.Mage ("", 0, 0, randomMana())
// Instance de Archers
export let archer = new classes.Archer ("", 0, 0, randomArrows(7,11))