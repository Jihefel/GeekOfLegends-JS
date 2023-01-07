import * as classes from "./classes.js";
import { randomMana, randomArrows } from "./functions.js";

// Instances de Boss
export let venom = new classes.Boss ("Venom", 800, 40);
export let father = new classes.Boss ("Father", 1000, 30);
export let dio = new classes.Boss ("Dio", 1500, 20);

// Instance de Guerrier
export let guerrier = new classes.Guerrier ("", 0, 0, 0);
// Instance de Mage
export let mage = new classes.Mage ("", 0, 0, randomMana())
// Instance de Archers
export let archer = new classes.Archer ("", 0, 0, randomArrows(7,11))