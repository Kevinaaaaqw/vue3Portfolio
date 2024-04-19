<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject, ref, watch, unref, reactive, type Ref, onMounted } from 'vue'
import { UI1input, UI1checkbox, UI1button } from '@/components/UI1'
import { loginApi } from '@/api/forum/index'
import { useCookies } from 'vue3-cookies'


</script>
<template>
    <div class="bg-base/50 h-650px relative flex justify-center items-center text-center">
        <img class="absolute top-50% left-50% translate-x--50% translate-y--50%" src="@/components/icons/K.png"
            alt="404">

        <h1 class="text-white z-1 font-size-64px">積沙成塔<br>
            累積自我擺脫技術債 </h1>

    </div>
</template>
