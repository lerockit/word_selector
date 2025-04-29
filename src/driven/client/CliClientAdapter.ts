import { checkbox, confirm, input } from "@inquirer/prompts";
import { CliClient } from "../../driver/ports/CliClient";

export class CliClientAdapter implements CliClient {
    public async ask(question: string): Promise<string> {
        return input({ message: question })
    }

    public async askOptions<T>(question: string, options: { label: string; value: T; }[]): Promise<T[]> {
        return checkbox<T>({
            message: question,
            choices: options.map(({ label, value }) => ({ name: label, value }))
        })
    }

    public async confirm(message: string): Promise<boolean> {
        return confirm({ message })
    }

    public log(message: string): void {
        console.log(message)
    }
}