import { useRouter } from 'vue-router'


export const toPage = (url: string) => {
    const router = useRouter()
    router.push(url)
}