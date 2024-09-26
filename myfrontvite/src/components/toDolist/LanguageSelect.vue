<script setup lang="ts">
import { languageStore } from '@/stores/toDoList/languageStore'
import { storeToRefs } from 'pinia'

const language = languageStore()

const { lang } = storeToRefs(languageStore())

</script>
<template>
    <select v-model="lang">
        <option v-for="(i, index) in language.allLang" :key="index" :value="i">{{ i.language }}</option>
    </select>
</template>