<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from "@/components/menu-item.vue";
import SubMenu from "@/components/sub-menu.vue";
import HorizontalMenu from "@/components/horizontalMenu.vue";
import Menu from "@/components/menu.vue";

</script>
<template>
    <Menu class="p-10px">
        <template #logo>
        </template>
        <MenuItem>
        <router-link :to="{ name: 'portfolioSelf' }">
            首頁
        </router-link>
        </MenuItem>
        <MenuItem>
        <router-link :to="{ name: 'portfolioWorkExperience' }">
            工作經歷
        </router-link>
        </MenuItem>
        <MenuItem>
        <router-link :to="{ name: 'projects' }">
            作品集
        </router-link>
        </MenuItem>
        <MenuItem>
        <!-- <router-link to="/AboutMe">
            個人介紹
        </router-link> -->
        </MenuItem>

    </Menu>
</template>
