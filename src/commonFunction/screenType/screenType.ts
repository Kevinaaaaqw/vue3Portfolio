import { ref } from "vue";

export const getScreenType = () => {
    const screenType = ref('')
    if (window.innerWidth <= 430) {
        screenType.value = 'mobile'
    } else if (window.innerWidth <= 4000) {
        screenType.value = 'computer'
    }
    return screenType.value
} 
