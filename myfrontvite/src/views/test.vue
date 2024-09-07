<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import SubMenu from "@/components/sub-menu.vue";
import HorizontalMenu from "@/components/horizontalMenu.vue";

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


const menuHandle = ref(false)
const handleUpdateShow = (newValue: boolean) => {
    menuHandle.value = newValue;
}

</script>
<template>
    <div class="h-100vh w-100vw relative">
        <div class="absolute" :style="{ top: `${position.y}px`, left: `${position.x}px` }" @mousedown="startDrag">
            <SubMenu :show="menuHandle" @update:show="handleUpdateShow">
                <template #title>
                    第一層
                </template>
                <HorizontalMenu>
                    <template #title>
                        第二層第二層
                    </template>
                    第三層第三層第三層
                </HorizontalMenu>
            </SubMenu>

        </div>
        <button @click="menuHandle = true">open</button>
        <button @click="menuHandle = false">close</button>
    </div>
</template>
