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
import { computed, ref, onMounted } from 'vue';
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
const headIndex = ref(0);
const leftArmIndex = ref(0);
const torsoIndex = ref(0);
const rightArmIndex = ref(0);
const baseIndex = ref(0);
const cart = ref([]);

onMounted(() => console.log('On Mounted'));

const selectedRobot = computed(() => ({
  head: availableParts.heads[headIndex.value],
  leftArm: availableParts.arms[leftArmIndex.value],
  torso: availableParts.torsos[torsoIndex.value],
  rightArm: availableParts.arms[rightArmIndex.value],
  base: availableParts.bases[baseIndex.value],
}));

const headBorderColor = computed(() => (selectedRobot.value.head.onSale ? 'red' : '#aaa'));

const addToCart = () => {
  const robot = selectedRobot.value;
  const cost = robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;
  cart.value.push({ ...robot, cost });
  console.log(cart.value.length);
};

// #region Part Selector Methods

const selectNextHead = () => {
  headIndex.value = getNextValidIndex(
    headIndex.value,
    availableParts.heads.length,
  );
};

const selectPreviousHead = () => {
  headIndex.value = getPreviousValidIndex(
    headIndex.value,
    availableParts.heads.length,
  );
};

const selectNextLeftArm = () => {
  leftArmIndex.value = getNextValidIndex(
    leftArmIndex.value,
    availableParts.arms.length,
  );
};

const selectPreviousLeftArm = () => {
  leftArmIndex.value = getPreviousValidIndex(
    leftArmIndex.value,
    availableParts.arms.length,
  );
};

const selectNextTorso = () => {
  torsoIndex.value = getNextValidIndex(
    torsoIndex.value,
    availableParts.torsos.length,
  );
};

const selectPreviousTorso = () => {
  torsoIndex.value = getPreviousValidIndex(
    torsoIndex.value,
    availableParts.torsos.length,
  );
};

const selectNextRightArm = () => {
  rightArmIndex.value = getNextValidIndex(
    rightArmIndex.value,
    availableParts.arms.length,
  );
};

const selectPreviousRightArm = () => {
  rightArmIndex.value = getPreviousValidIndex(
    rightArmIndex.value,
    availableParts.arms.length,
  );
};

const selectNextBase = () => {
  baseIndex.value = getNextValidIndex(
    baseIndex.value,
    availableParts.bases.length,
  );
};

const selectPreviousBase = () => {
  baseIndex.value = getPreviousValidIndex(
    baseIndex.value,
    availableParts.bases.length,
  );
};

// #endregion

</script>

<style lang="scss" scoped>
.part {
    position: relative;
    width: 200px;
    height: 200px;
    border: 3px solid #aaa;

    &.top {
        border: 3px solid v-bind(headBorderColor);
    }

    img {
        width: 200px;
    }
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

    .next-selector {
        top: auto;
        bottom: -28px;
        left: -3px;
        width: 179px;
        height: 25px;
    }

    .prev-selector {
        top: -28px;
        left: -3px;
        width: 179px;
        height: 25px;
    }

    img {
        transform: rotate(-90deg);
    }
}

.right {
    border-left: none;

    .prev-selector {
        top: -28px;
        left: 24px;
        width: 179px;
        height: 25px;
    }

    .next-selector {
        top: auto;
        bottom: -28px;
        left: 24px;
        width: 179px;
        height: 25px;
        right: -3px;
    }

    img {
        transform: rotate(90deg);
    }
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

.center {

    .prev-selector,
    .next-selector {
        opacity: 0.8;
    }
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
