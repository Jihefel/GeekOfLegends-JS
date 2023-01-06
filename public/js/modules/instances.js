import * as classes from "./classes.js";
import { randomMana, randomArrows } from "./functions.js";

// Instances de Boss
export let venom = new classes.Boss ("Venom", 800, 200);
export let father = new classes.Boss ("Father", 1000, 350);
export let dio = new classes.Boss ("Dio", 1500, 500);

// Instance de Guerrier
export let guerrier = new classes.Guerriers ("", 0, 0, 0);
// Instance de Mage
export let mage = new classes.Mages ("", 0, 0, randomMana())
// Instance de Archers
export let archer = new classes.Archers ("", 0, 0, randomArrows(7,11))