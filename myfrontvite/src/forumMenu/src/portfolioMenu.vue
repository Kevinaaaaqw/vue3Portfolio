<script setup lang="ts">
import { ref, inject, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from "@/components/menu-item.vue";
import SubMenu from "@/components/sub-menu.vue";
import HorizontalMenu from "@/components/horizontalMenu.vue";
import Menu from "@/components/menu.vue";

</script>
<template>
    <Menu class="p-1 sm-p-10px">
        <template #logo>
            <div class="h-50px mx-3% max-sm-w-[100px]">
                <img class="object-contain h-full w-full" src="@/components/icons/logo.png" alt="">
            </div>
        </template>
        <MenuItem>
        <router-link :to="{ name: 'homePortfolioSelf' }">
            首頁
        </router-link>
        </MenuItem>
        <MenuItem>
        <router-link :to="{ name: 'homePortfolioWorkExperience' }">
            工作經歷
        </router-link>
        </MenuItem>
        <MenuItem>
        <router-link :to="{ name: 'homeProjects' }">
            作品集
        </router-link>
        </MenuItem>
        <!-- <MenuItem>
        <router-link to="/AboutMe">
            個人介紹
        </router-link> 
        </MenuItem> -->

    </Menu>
</template>
