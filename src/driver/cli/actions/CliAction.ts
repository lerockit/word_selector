export interface CliAction {
    execute(): Promise<void>
}