<template>
<div class="dau">
    女兒:{{money}}
    <button @click="handler($parent)">爸爸給我10000</button>

</div>
    
</template>
<script setup lang="ts">
import { ref } from "vue";

let money =ref(99999);

const handler=($parent)=>{
money.value+=1000;
$parent.money-=10000;
}
</script>


<style scoped>
.dau{
    background-color: brown;
    width: 20vw;
    height: 500px;
}

</style>