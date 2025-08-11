<template>
    <div class="content">
        <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
        <div class="top-row">
            <div class="top part">
                <div class="robot-name">{{ selectedRobot.head.title }}
                    <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
                </div>
                <img :src="selectedRobot.head.imageUrl" alt="head" />
                <button class="prev-selector" @click="selectPreviousHead">&#9668;</button>
                <button class="next-selector" @click="selectNextHead">&#9658;</button>
            </div>
        </div>
        <div class="middle-row">
            <div class="left part">
                <img :src="selectedRobot.leftArm.imageUrl" alt="left arm" />
                <button class="prev-selector" @click="selectPreviousLeftArm">&#9650;</button>
                <button class="next-selector" @click="selectNextLeftArm">&#9660;</button>
            </div>
            <div class="center part">
                <img :src="selectedRobot.torso.imageUrl" alt="torso" />
                <button class="prev-selector" @click="selectNextTorso">&#9668;</button>
                <button class="next-selector" @click="selectPreviousTorso">&#9658;</button>
            </div>
            <div class="right part">
                <img :src="selectedRobot.rightArm.imageUrl" alt="right arm" />
                <button class="prev-selector" @click="selectNextRightArm">&#9650;</button>
                <button class="next-selector" @click="selectPreviousRightArm">&#9660;</button>
            </div>
        </div>
        <div class="bottom-row">
            <div class="bottom part">
                <img :src="selectedRobot.base.imageUrl" alt="base" />
                <button class="prev-selector" @click="selectNextBase">&#9668;</button>
                <button class="next-selector" @click="selectPreviousBase">&#9658;</button>
            </div>
        </div>
    </div>
    <div>
        <h1>Cart</h1>
        <table>
            <thead>
                <tr>
                    <th>Robot</th>
                    <th class="cost">Cost</th>
                </tr>
            </thead>
            <tr v-for="(robot, index) in cart" :key="index">
                <td>{{ robot.head.title }}</td>
                <td class="cost">{{ toCurrency(robot.cost) }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { toCurrency } from '@/shared/formatters';
import { computed } from 'vue';
import parts from '../data/parts';

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

const availableParts = parts;
let headIndex = 0;
let leftArmIndex = 0;
let torsoIndex = 0;
let rightArmIndex = 0;
let baseIndex = 0;
const cart = [];

const selectedRobot = computed(() => ({
  head: availableParts.heads[headIndex],
  leftArm: availableParts.arms[leftArmIndex],
  torso: availableParts.torsos[torsoIndex],
  rightArm: availableParts.arms[rightArmIndex],
  base: availableParts.bases[baseIndex],
}));

const addToCart = () => {
  const robot = selectedRobot;
  const cost = robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;
  cart.push({ ...robot, cost });
  console.log(cart.length);
};

// #region Part Selector Methods

const selectNextHead = () => {
  headIndex = getNextValidIndex(
    headIndex,
    availableParts.heads.length,
  );
};

const selectPreviousHead = () => {
  headIndex = getPreviousValidIndex(
    headIndex,
    availableParts.heads.length,
  );
};

const selectNextLeftArm = () => {
  leftArmIndex = getNextValidIndex(
    leftArmIndex,
    availableParts.arms.length,
  );
};

const selectPreviousLeftArm = () => {
  leftArmIndex = getPreviousValidIndex(
    leftArmIndex,
    availableParts.arms.length,
  );
};

const selectNextTorso = () => {
  torsoIndex = getNextValidIndex(
    torsoIndex,
    availableParts.torsos.length,
  );
};

const selectPreviousTorso = () => {
  torsoIndex = getPreviousValidIndex(
    torsoIndex,
    availableParts.torsos.length,
  );
};

const selectNextRightArm = () => {
  rightArmIndex = getNextValidIndex(
    rightArmIndex,
    availableParts.arms.length,
  );
};

const selectPreviousRightArm = () => {
  rightArmIndex = getPreviousValidIndex(
    rightArmIndex,
    availableParts.arms.length,
  );
};

const selectNextBase = () => {
  baseIndex = getNextValidIndex(
    baseIndex,
    availableParts.bases.length,
  );
};

const selectPreviousBase = () => {
  baseIndex = getPreviousValidIndex(
    baseIndex,
    availableParts.bases.length,
  );
};

// #endregion

</script>

<style>
.part {
    position: relative;
    width: 200px;
    height: 200px;
    border: 3px solid #aaa;
}

.part img {
    width: 200px;
}

.top-row {
    display: flex;
    justify-content: space-around;
}

.middle-row {
    display: flex;
    justify-content: center;
}

.bottom-row {
    display: flex;
    justify-content: space-around;
    border-top: none;
}

.top {
    border-bottom: none;
}

.left {
    border-right: none;
}

.right {
    border-left: none;
}

.left img {
    transform: rotate(-90deg);
}

.right img {
    transform: rotate(90deg);
}

.bottom {
    border-top: none;
}

.prev-selector {
    position: absolute;
    z-index: 1;
    top: -3px;
    left: -28px;
    width: 25px;
    height: 206px;
}

.next-selector {
    position: absolute;
    z-index: 1;
    top: -3px;
    right: -28px;
    width: 25px;
    height: 206px;
}

.center .prev-selector,
.center .next-selector {
    opacity: 0.8;
}

.left .prev-selector {
    top: -28px;
    left: -3px;
    width: 179px;
    height: 25px;
}

.left .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 179px;
    height: 25px;
}

.right .prev-selector {
    top: -28px;
    left: 24px;
    width: 179px;
    height: 25px;
}

.right .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 179px;
    height: 25px;
}

.right .next-selector {
    right: -3px;
}

.robot-name {
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
}

.sale {
    color: red;
}

.content {
    position: relative;
}

.add-to-cart {
    position: absolute;
    right: 30px;
    width: 220px;
    padding: 3px;
    font-size: 16px;
}

td,
th {
    text-align: left;
    padding: 5px;
    padding-right: 20px;
}

.cost {
    text-align: right;
}
</style>
