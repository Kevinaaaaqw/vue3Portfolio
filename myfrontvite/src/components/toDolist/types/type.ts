export interface postIt {
    title: string,
    isDone: boolean,
    isImportant: boolean,
    isEdit: boolean,
    status: 'add' | 'edit',
    deadLineDate: string,
    deadLineTime: {
        hours: number,
        minutes: number,
        seconds: number
    } | null,
    comment: string,
    file: any | { file: any | null, name: string, date: Date | string }
}

export interface editInput {
    isTitle: boolean
}