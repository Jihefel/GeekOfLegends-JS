// Mana possibles
export function randomMana() {
    let manaPossibles = [7,9,11]
    const random = Math.floor(Math.random()*(manaPossibles.length))
    let mana = manaPossibles[random]
}

// Nombre de flèches aléatoires
export function randomArrows(min, max) {
    return Math.random() * (max - min) + min;
}