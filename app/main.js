import { level1 } from "./levels.js";
let map = level1;

let inventory = {
    leafs: 0,
    tree: 0,
    rock: 0,
    ground: 0,
    grass: 0,
};

let isAxe = false;
let isPickaxe = false;
let isShovel = false;
let isLeaf = false;
let isTree = false;
let isRock = false;
let isGround = false;
let isGrass = false;

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

draw();
let blocks = document.querySelectorAll(`.block`);

blocks.forEach((el) => {
    el.addEventListener(`click`, function (e) {
        if (el.classList.contains(`leafs`) && removeCheck(el) && isAxe) {
            el.classList.remove(`leafs`);
            el.classList.add(`sky`);
            inventory.leafs += 1;
            updateInventory();
        }
        if (el.classList.contains(`tree`) && removeCheck(el) && isAxe) {
            el.classList.remove(`tree`);
            el.classList.add(`sky`);
            inventory.tree += 1;
            updateInventory();
        }
        if (el.classList.contains(`rock`) && removeCheck(el) && isPickaxe) {
            el.classList.remove(`rock`);
            el.classList.add(`sky`);
            inventory.rock += 1;
            updateInventory();
        }
        if (el.classList.contains(`ground`) && removeCheck(el) && isShovel) {
            el.classList.remove(`ground`);
            el.classList.add(`sky`);
            inventory.ground += 1;
            updateInventory();
        }
        if (el.classList.contains(`grass`) && removeCheck(el) && isShovel) {
            el.classList.remove(`grass`);
            el.classList.add(`sky`);
            inventory.grass += 1;
            updateInventory();
        }
        if (el.classList.contains(`sky`)) {
            const i = el.style.gridRowStart - 1;
            const j = el.style.gridColumnStart - 1;
            if (isLeaf && inventory.leafs > 0) {
                map[i][j] = 2;
                el.classList.remove(`sky`);
                el.classList.add(`leafs`);
                inventory.leafs -= 1;
                updateInventory();
            }
            if (isTree && inventory.tree > 0) {
                map[i][j] = 3;
                el.classList.remove(`sky`);
                el.classList.add(`tree`);
                inventory.tree -= 1;
                updateInventory();
            }
            if (isRock && inventory.rock > 0) {
                map[i][j] = 4;
                el.classList.remove(`sky`);
                el.classList.add(`rock`);
                inventory.rock -= 1;
                updateInventory();
            }
            if (isGrass && inventory.grass > 0) {
                map[i][j] = 6;
                el.classList.remove(`sky`);
                el.classList.add(`grass`);
                inventory.grass -= 1;
                updateInventory();
            }
            if (isGround && inventory.ground > 0) {
                map[i][j] = 5;
                el.classList.remove(`sky`);
                el.classList.add(`ground`);
                inventory.ground -= 1;
                updateInventory();
            }
        }
    });
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
        map[i][j] = 0;
        return true;
    }
}

function updateInventory() {
    leafInv.textContent = `${inventory.leafs}`;
    treeInv.textContent = `${inventory.tree}`;
    rockInv.textContent = `${inventory.rock}`;
    groundInv.textContent = `${inventory.ground}`;
    grassInv.textContent = `${inventory.grass}`;
}

axe.addEventListener(`click`, (e) => {
    if (isAxe) {
        isAxe = false;
    } else {
        isAxe = true;
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
    } else {
        isAxe = false;
        isPickaxe = true;
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
    } else {
        isAxe = false;
        isPickaxe = false;
        isShovel = true;
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
    } else {
        isLeaf = true;
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
    } else {
        isTree = true;
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
    } else {
        isRock = true;
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
    } else {
        isGround = true;
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
    } else {
        isGrass = true;
        isAxe = false;
        isPickaxe = false;
        isShovel = false;
        isLeaf = false;
        isTree = false;
        isRock = false;
        isGround = false;
    }
});

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

function refresh() {
    map = level1;
    draw();
    blocks = document.querySelectorAll(`.block`);
}
