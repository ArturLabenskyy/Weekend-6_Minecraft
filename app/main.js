import { level1 } from "./levels.js";

let inventory = {};
let map;

if (localStorage.getItem("map") === null) {
    localStorage.setItem("map", JSON.stringify(level1));
} else {
    map = JSON.parse(localStorage.getItem("map"));
}
if (localStorage.getItem("inventory") === null) {
    inventory = {
        leafs: 0,
        tree: 0,
        rock: 0,
        ground: 0,
        grass: 0,
    };
} else {
    inventory = JSON.parse(localStorage.getItem("inventory"));
    localStorage.setItem(`inventory`, JSON.stringify(inventory));
}

let isAxe = false;
let isPickaxe = false;
let isShovel = false;
let isLeaf = false;
let isTree = false;
let isRock = false;
let isGround = false;
let isGrass = false;

localStorage.setItem(`map`, JSON.stringify(map));
localStorage.setItem(`inventory`, JSON.stringify(inventory));

const gameBoard = document.querySelector(`.top-game`);
const leafInv = document.querySelector(`#inventory-leafs`);
const treeInv = document.querySelector(`#inventory-trees`);
const rockInv = document.querySelector(`#inventory-rocks`);
const groundInv = document.querySelector(`#inventory-ground`);
const grassInv = document.querySelector(`#inventory-grass`);
const axe = document.querySelector(`#axe`);
const pickaxe = document.querySelector(`#pickaxe`);
const shovel = document.querySelector(`#shovel`);
const leaf = document.querySelector(`#leafs`);
const tree = document.querySelector(`#tree`);
const rock = document.querySelector(`#rock`);
const ground = document.querySelector(`#ground`);
const gras = document.querySelector(`#grass`);
const body = document.querySelector(`body`);
const reset = document.querySelector(`.reset`);

draw();
let blocks = document.querySelectorAll(`.block`);
updateInventory();

blocks.forEach((el) => {
    const i = el.style.gridRowStart - 1;
    const j = el.style.gridColumnStart - 1;
    el.addEventListener(`click`, function (e) {
        if (el.classList.contains(`leafs`) && removeCheck(el) && isAxe) {
            el.classList.remove(`leafs`);
            el.classList.add(`sky`);
            map[i][j] = 0;
            localStorageUpdateMap(i, j, 0);
            inventory.leafs += 1;
            localStorageUpdateInventory(`leafs`, 1);
            updateInventory();
        }
        if (el.classList.contains(`tree`) && removeCheck(el) && isAxe) {
            el.classList.remove(`tree`);
            el.classList.add(`sky`);
            map[i][j] = 0;
            localStorageUpdateMap(i, j, 0);
            inventory.tree += 1;
            localStorageUpdateInventory(`tree`, 1);
            updateInventory();
        }
        if (el.classList.contains(`rock`) && removeCheck(el) && isPickaxe) {
            el.classList.remove(`rock`);
            el.classList.add(`sky`);
            map[i][j] = 0;
            localStorageUpdateMap(i, j, 0);
            inventory.rock += 1;
            localStorageUpdateInventory(`rock`, 1);
            updateInventory();
        }
        if (el.classList.contains(`ground`) && removeCheck(el) && isShovel) {
            el.classList.remove(`ground`);
            el.classList.add(`sky`);
            map[i][j] = 0;
            localStorageUpdateMap(i, j, 0);
            inventory.ground += 1;
            localStorageUpdateInventory(`ground`, 1);
            updateInventory();
        }
        if (el.classList.contains(`grass`) && removeCheck(el) && isShovel) {
            el.classList.remove(`grass`);
            el.classList.add(`sky`);
            map[i][j] = 0;
            localStorageUpdateMap(i, j, 0);
            inventory.grass += 1;
            localStorageUpdateInventory(`grass`, 1);
            updateInventory();
        }
        if (el.classList.contains(`sky`)) {
            if (isLeaf && inventory.leafs > 0) {
                map[i][j] = 2;
                localStorageUpdateMap(i, j, 2);
                el.classList.remove(`sky`);
                el.classList.add(`leafs`);
                inventory.leafs -= 1;
                localStorageUpdateInventory(`leafs`, -1);
                updateInventory();
            }
            if (isTree && inventory.tree > 0) {
                map[i][j] = 3;
                localStorageUpdateMap(i, j, 3);
                el.classList.remove(`sky`);
                el.classList.add(`tree`);
                inventory.tree -= 1;
                localStorageUpdateInventory(`tree`, -1);
                updateInventory();
            }
            if (isRock && inventory.rock > 0) {
                map[i][j] = 4;
                localStorageUpdateMap(i, j, 4);
                el.classList.remove(`sky`);
                el.classList.add(`rock`);
                inventory.rock -= 1;
                localStorageUpdateInventory(`rock`, -1);
                updateInventory();
            }
            if (isGrass && inventory.grass > 0) {
                map[i][j] = 6;
                localStorageUpdateMap(i, j, 6);
                el.classList.remove(`sky`);
                el.classList.add(`grass`);
                inventory.grass -= 1;
                localStorageUpdateInventory(`grass`, -1);
                updateInventory();
            }
            if (isGround && inventory.ground > 0) {
                map[i][j] = 5;
                localStorageUpdateMap(i, j, 5);
                el.classList.remove(`sky`);
                el.classList.add(`ground`);
                localStorageUpdateInventory(`ground`, -1);
                inventory.ground -= 1;
                updateInventory();
            }
        }
    });
});

axe.addEventListener(`click`, (e) => {
    if (isAxe) {
        isAxe = false;
        body.style.cursor = `grab`;
    } else {
        isAxe = true;
        body.style.cursor = `url('../assets/img/axe-cursor.png'), auto`;
        isPickaxe = false;
        isShovel = false;
        isLeaf = false;
        isTree = false;
        isRock = false;
        isGround = false;
        isGrass = false;
    }
});

pickaxe.addEventListener(`click`, (e) => {
    if (isPickaxe) {
        isPickaxe = false;
        body.style.cursor = `grab`;
    } else {
        isPickaxe = true;
        body.style.cursor = `url('../assets/img/pickaxe-cursor.png'), auto`;
        isAxe = false;
        isShovel = false;
        isLeaf = false;
        isTree = false;
        isRock = false;
        isGround = false;
        isGrass = false;
    }
});

shovel.addEventListener(`click`, (e) => {
    if (isShovel) {
        isShovel = false;
        body.style.cursor = `grab`;
    } else {
        isShovel = true;
        body.style.cursor = `url('../assets/img/shovel-cursor.png'), auto`;
        isAxe = false;
        isPickaxe = false;
        isLeaf = false;
        isTree = false;
        isRock = false;
        isGround = false;
        isGrass = false;
    }
});

leaf.addEventListener(`click`, (e) => {
    if (isLeaf) {
        isLeaf = false;
        body.style.cursor = `grab`;
    } else {
        isLeaf = true;
        body.style.cursor = `url('../assets/img/moss-cursor.png'), auto`;
        isAxe = false;
        isPickaxe = false;
        isShovel = false;
        isTree = false;
        isRock = false;
        isGround = false;
        isGrass = false;
    }
});

tree.addEventListener(`click`, (e) => {
    if (isTree) {
        isTree = false;
        body.style.cursor = `grab`;
    } else {
        isTree = true;
        body.style.cursor = `url('../assets/img/tree-cursor.png'), auto`;
        isAxe = false;
        isPickaxe = false;
        isShovel = false;
        isLeaf = false;
        isRock = false;
        isGround = false;
        isGrass = false;
    }
});

rock.addEventListener(`click`, (e) => {
    if (isRock) {
        isRock = false;
        body.style.cursor = `grab`;
    } else {
        isRock = true;
        body.style.cursor = `url('../assets/img/stone-cursor.png'), auto`;
        isAxe = false;
        isPickaxe = false;
        isShovel = false;
        isLeaf = false;
        isTree = false;
        isGround = false;
        isGrass = false;
    }
});

ground.addEventListener(`click`, (e) => {
    if (isGround) {
        isGround = false;
        body.style.cursor = `grab`;
    } else {
        isGround = true;
        body.style.cursor = `url('../assets/img/ground-cursor.png'), auto`;
        isAxe = false;
        isPickaxe = false;
        isShovel = false;
        isLeaf = false;
        isTree = false;
        isRock = false;
        isGrass = false;
    }
});

gras.addEventListener(`click`, (e) => {
    if (isGrass) {
        isGrass = false;
        body.style.cursor = `grab`;
    } else {
        isGrass = true;
        body.style.cursor = `url('../assets/img/grass-cursor.png'), auto`;
        isAxe = false;
        isPickaxe = false;
        isShovel = false;
        isLeaf = false;
        isTree = false;
        isRock = false;
        isGround = false;
    }
});

reset.addEventListener(`click`, (e) => {
    resetMap();
});

function removeCheck(block) {
    const i = block.style.gridRowStart - 1;
    const j = block.style.gridColumnStart - 1;
    if (map[i][j] <= 1) {
        return false;
    }
    if (
        map[i][j + 1] <= 1 ||
        map[i][j - 1] <= 1 ||
        map[i - 1][j] <= 1 ||
        map[i + 1][j] <= 1
    ) {
        return true;
    }
}

function updateInventory() {
    leafInv.textContent = `${
        JSON.parse(localStorage.getItem("inventory")).leafs
    }`;
    treeInv.textContent = `${
        JSON.parse(localStorage.getItem("inventory")).tree
    }`;
    rockInv.textContent = `${
        JSON.parse(localStorage.getItem("inventory")).rock
    }`;
    groundInv.textContent = `${
        JSON.parse(localStorage.getItem("inventory")).ground
    }`;
    grassInv.textContent = `${
        JSON.parse(localStorage.getItem("inventory")).grass
    }`;
}

function draw() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const block = document.createElement(`div`);
            block.style.gridRowStart = i + 1;
            block.style.gridColumnStart = j + 1;
            switch (map[i][j]) {
                case 0:
                    block.classList.add(`block`);
                    block.classList.add(`sky`);
                    break;
                case 1:
                    block.classList.add(`block`);
                    block.classList.add(`cloud`);
                    break;
                case 2:
                    block.classList.add(`block`);
                    block.classList.add(`leafs`);
                    break;
                case 3:
                    block.classList.add(`block`);
                    block.classList.add(`tree`);
                    break;
                case 4:
                    block.classList.add(`block`);
                    block.classList.add(`rock`);
                    break;
                case 5:
                    block.classList.add(`block`);
                    block.classList.add(`ground`);
                    break;
                case 6:
                    block.classList.add(`block`);
                    block.classList.add(`grass`);
                    break;
            }
            gameBoard.appendChild(block);
        }
    }
}

function resetMap() {
    inventory = {
        leafs: 0,
        tree: 0,
        rock: 0,
        ground: 0,
        grass: 0,
    };
    isAxe = false;
    isPickaxe = false;
    isShovel = false;
    isLeaf = false;
    isTree = false;
    isRock = false;
    isGround = false;
    isGrass = false;
    body.style.cursor = `grab`;
    map = level1.map((arr) => arr.slice());
    localStorage.setItem(`inventory`, JSON.stringify(inventory));
    localStorage.setItem(`map`, JSON.stringify(map));
    updateInventory();
    blocks.forEach((el) => {
        const i = el.style.gridRowStart - 1;
        const j = el.style.gridColumnStart - 1;
        switch (map[i][j]) {
            case 0:
                deleteAll(el);
                el.classList.add(`sky`);
                localStorageUpdateMap(i, j, 0);
                break;
            case 1:
                deleteAll(el);
                localStorageUpdateMap(i, j, 1);
                el.classList.add(`cloud`);
                break;
            case 2:
                deleteAll(el);
                localStorageUpdateMap(i, j, 2);
                el.classList.add(`leafs`);
                break;
            case 3:
                deleteAll(el);
                localStorageUpdateMap(i, j, 3);
                el.classList.add(`tree`);
                break;
            case 4:
                deleteAll(el);
                localStorageUpdateMap(i, j, 4);
                el.classList.add(`rock`);
                break;
            case 5:
                deleteAll(el);
                localStorageUpdateMap(i, j, 5);
                el.classList.add(`ground`);
                break;
            case 6:
                deleteAll(el);
                localStorageUpdateMap(i, j, 6);
                el.classList.add(`grass`);
                break;
        }
    });
}

function localStorageUpdateMap(i, j, value) {
    const localMap = localStorage.getItem("map");
    let updateMap = JSON.parse(localMap);
    updateMap[i][j] = value;
    localStorage.setItem(`map`, JSON.stringify(updateMap));
}

function localStorageUpdateInventory(key, value) {
    const localInv = localStorage.getItem("inventory");
    let updateInv = JSON.parse(localInv);
    updateInv[key] += value;
    localStorage.setItem(`inventory`, JSON.stringify(updateInv));
}

function deleteAll(block) {
    block.classList.remove(`sky`);
    block.classList.remove(`cloud`);
    block.classList.remove(`tree`);
    block.classList.remove(`rock`);
    block.classList.remove(`ground`);
    block.classList.remove(`grass`);
    block.classList.remove(`leafs`);
}
