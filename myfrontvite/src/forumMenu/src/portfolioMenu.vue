<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import DropDownList from "@/components/dropDownList/dropDownList.vue";

const position = ref({ x: 0, y: 0 });
const dragging = ref(false);

const startDrag = (event) => {
    dragging.value = true;
    const startX = event.clientX - position.value.x;
    const startY = event.clientY - position.value.y;

    const onMouseMove = (moveEvent) => {
        if (dragging.value) {
            position.value.x = moveEvent.clientX - startX;
            position.value.y = moveEvent.clientY - startY;
        }
    };

    const stopDrag = () => {
        dragging.value = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
};

</script>
<template>
    <div class="h-100vh w-100vw relative">
        <div class="absolute" :style="{ top: `${position.y}px`, left: `${position.x}px` }" @mousedown="startDrag">
            <DropDownList />
        </div>
    </div>
</template>
