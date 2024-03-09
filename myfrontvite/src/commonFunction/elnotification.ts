import { ElNotification } from 'element-plus'

export const sendElNotification = (ty: 'error' | 'success' | 'warning', ms: string) => {
    ElNotification[ty]({
        message: ms,
        position: 'bottom-right'
    })
}