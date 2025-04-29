type Option<T> = {
    label: string,
    value: T
}

export interface CliClient {
    ask(question: string): Promise<string>
    askOptions<T>(question: string, options: Option<T>[]): Promise<T[]>
    confirm(message: string): Promise<boolean>
    log(message: string): void
}