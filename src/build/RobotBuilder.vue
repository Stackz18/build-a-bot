<template>
    <div class="content">
        <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
        <div class="top-row">
            <div class="robot-name">{{ selectedRobot.head.title }}
                <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
            </div>
            <PartSelector />
        </div>
        <div class="middle-row">
            <PartSelector />
            <PartSelector />
            <PartSelector />
        </div>
        <div class="bottom-row">
            <PartSelector />
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
import { computed, ref, onMounted } from 'vue';
import { toCurrency } from '@/shared/formatters';
import PartSelector from './PartSelector.vue';
// import parts from '../data/parts';

// const availableParts = parts;
const cart = ref([]);

onMounted(() => console.log('On Mounted'));

const selectedRobot = ref({
  head: {},
  leftArm: {},
  torso: {},
  rightArm: {},
  base: {},
});

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
