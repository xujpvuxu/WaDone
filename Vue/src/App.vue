
<template>
  <div class="container">
    <h1>我是你爸:{{ money }}</h1>
    <button @click="handler">跟兒子借10元</button>
    <div style="display: flex">
      <Son ref="soan"></Son>
      <Daughter> </Daughter>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import Son from "./components/son.vue";
import Daughter from "./components/daughter.vue";

let money = ref(100000);
let soan = ref();
let car = ref("法拉利");
provide('token',car)

defineExpose({ money });
const handler = () => {
  money.value += 10;
  soan.value.money -= 10;
};
</script>

<style scoped>
.container {
  background-color: aqua;
  height: 800px;
  width: 1500px;
}
</style>
