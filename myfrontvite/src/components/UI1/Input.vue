<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const model = defineModel()
const props = defineProps<{ title?: string; placeholder?: string; name: string; password?: boolean; id: string | number; class?: string; keydownEnter?: Function }>()
const id = ref<string>(props.id.toString())
const labelCss = computed(() => {
  if (model.value || props.placeholder) {
    return 'account-text-span1'
  } else {
    return 'account-text-span'
  }
})
const color = computed(() => {
  if (model.value) {
    return 'rgb(0, 174, 255)'
  } else {
    return 'black'
  }
})
const inputType = computed(() => {
  return props.password ? 'password' : 'text'
})

</script>
<template>
  <input v-for="i in 2" class="w-0 absolute opacity-0" type="password" />
  <div :class="'d-flex w-full position-relative align-items-center' + ' ' + props.class">
    <input @keydown.enter="() => { props.keydownEnter && props.keydownEnter() }" :id="id" :name="props.name"
      class="w-full input pt-3 pb-3 ps-2 pe-2" :type="inputType" :placeholder="props.placeholder" v-model="model" />
    <label :for="id" :class="labelCss">
      <div style="width: 100%; overflow-y: hidden">
        <slot name="default">{{ props.title }}</slot>
      </div>
    </label>
  </div>
</template>
<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 0s 600000s, color 0s 600000s !important;
}

:-webkit-autofill {
  animation-name: onAutoFillStart;
}

:not(:-webkit-autofill) {
  animation-name: onAutoFillCancel;
}

@keyframes onAutoFillCancel {
  from {}

  to {}
}

.d-flex {
  display: flex;
}

.w-full {
  width: 100%;
}

.position-relative {
  position: relative;
}

.align-items-center {
  align-items: center;
}

.border-radious {
  border-radius: 10%;
}

.pt-2 {
  padding-top: 0.5rem;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.ps-1 {
  padding-left: 0.25rem;
}

.pe-1 {
  padding-right: 0.25rem;
}

.pt-3 {
  padding-top: 0.75rem;
}

.pb-3 {
  padding-bottom: 0.75rem;
}

.ps-2 {
  padding-left: 0.5rem;
}

.pe-2 {
  padding-right: 0.5rem;
}

.input {
  outline: none;
  border: 1px solid #d6dde9;
  border-radius: 8px;
  background-color: white;
}

.account-text-span {
  position: absolute;
  background-color: white;
  top: 50%;
  left: 0.75rem;
  transform: translate(0%, -50%);
  transition: 0.2s ease-in-out;
  font-size: 16px;
}

.account-text-span1 {
  position: absolute;
  background-color: white;
  top: -8px;
  left: 5px;
  transition: 0.2s ease-in-out;
  font-size: 12px;
}

input:focus~.account-text-span {
  transform: translate(0%, 0%);
  background-color: white;
  font-size: 12px;
  left: 5px;
  top: -8px;
  transition: 0.2s ease-in-out;
  color: rgb(0, 174, 255);
}

input:focus~.account-text-span1 {
  background-color: white;
  font-size: 12px;
  top: -8px;
  transition: 0.2s ease-in-out;
  color: rgb(0, 174, 255);
}

input:focus {
  border: 1px solid rgb(0, 174, 255);
  border-radius: 8px;
}

/* 
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #000000;
  -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0) inset;
  transition: background-color 5000s ease-in-out 0s;
} */
</style>
