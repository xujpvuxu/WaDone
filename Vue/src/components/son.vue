<template>
  <div class="son">
    <div>我是兒子:{{ money }}</div>
    <div>{{ car }}</div>
    <div>{{infoStore.count}}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";

import useInfoStore from "../store/modulses/info"
let infoStore = useInfoStore();
console.log(infoStore)
let money = ref(666);

let car = inject("token");

defineExpose({ money });
</script>

<style scoped>
.son {
  width: 20vw;
  height: 500px;
  background-color: bisque;
}
</style>