import { guerrier } from "./modules/instances.js";
import * as functions from "./modules/functions.js"

console.log(functions.randomBoss())
console.log(functions.randomBoss().pv);
functions.randomEnigme(functions.randomBoss(),guerrier);