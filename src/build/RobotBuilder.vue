<template>
    <div>
        <div class="top-row">
            <div class="top part">
                <img v-bind:src="availableParts.heads[headIndex].imageUrl" alt="head" />
                <button class="prev-selector" v-on:click="selectPreviousHead">&#9668;</button>
                <button class="next-selector" v-on:click="selectNextHead">&#9658;</button>
            </div>
        </div>
        <div class="middle-row">
            <div class="left part">
                <img v-bind:src="availableParts.arms[leftArmIndex].imageUrl" alt="left arm" />
                <button class="prev-selector" v-on:click="selectPreviousLeftArm">&#9650;</button>
                <button class="next-selector" v-on:click="selectNextLeftArm">&#9660;</button>
            </div>
            <div class="center part">
                <img v-bind:src="availableParts.torsos[torsoIndex].imageUrl" alt="torso" />
                <button class="prev-selector" v-on:click="selectNextTorso">&#9668;</button>
                <button class="next-selector" v-on:click="selectPreviousTorso">&#9658;</button>
            </div>
            <div class="right part">
                <img v-bind:src="availableParts.arms[rightArmIndex].imageUrl" alt="right arm" />
                <button class="prev-selector" v-on:click="selectNextRightArm">&#9650;</button>
                <button class="next-selector" v-on:click="selectPreviousRightArm">&#9660;</button>
            </div>
        </div>
        <div class="bottom-row">
            <div class="bottom part">
                <img v-bind:src="availableParts.bases[baseIndex].imageUrl" alt="base" />
                <button class="prev-selector" v-on:click="selectNextBase">&#9668;</button>
                <button class="next-selector" v-on:click="selectPreviousBase">&#9658;</button>
            </div>
        </div>
    </div>
</template>

<script>
import parts from '../data/parts';

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

export default {

  name: 'RobotBuilder',
  data() {
    return {
      availableParts: parts,
      headIndex: 0,
      leftArmIndex: 0,
      torsoIndex: 0,
      rightArmIndex: 0,
      baseIndex: 0,
    };
  },
  methods: {
    selectNextHead() {
      this.headIndex = getNextValidIndex(
        this.headIndex,
        this.availableParts.heads.length,
      );
    },

    selectPreviousHead() {
      this.headIndex = getPreviousValidIndex(
        this.headIndex,
        this.availableParts.heads.length,
      );
    },

    selectNextLeftArm() {
      this.leftArmIndex = getNextValidIndex(
        this.leftArmIndex,
        this.availableParts.arms.length,
      );
    },

    selectPreviousLeftArm() {
      this.leftArmIndex = getPreviousValidIndex(
        this.leftArmIndex,
        this.availableParts.arms.length,
      );
    },

    selectNextTorso() {
      this.torsoIndex = getNextValidIndex(
        this.torsoIndex,
        this.availableParts.torsos.length,
      );
    },

    selectPreviousTorso() {
      this.torsoIndex = getPreviousValidIndex(
        this.torsoIndex,
        this.availableParts.torsos.length,
      );
    },

    selectNextRightArm() {
      this.rightArmIndex = getNextValidIndex(
        this.rightArmIndex,
        this.availableParts.arms.length,
      );
    },

    selectPreviousRightArm() {
      this.rightArmIndex = getPreviousValidIndex(
        this.rightArmIndex,
        this.availableParts.arms.length,
      );
    },

    selectNextBase() {
      this.baseIndex = getNextValidIndex(
        this.baseIndex,
        this.availableParts.bases.length,
      );
    },

    selectPreviousBase() {
      this.baseIndex = getPreviousValidIndex(
        this.baseIndex,
        this.availableParts.bases.length,
      );
    },

  },
};

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
</style>
