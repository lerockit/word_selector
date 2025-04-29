import { Command } from "commander";
import { selectWordsCliActionFatory } from "../../factories/selectWordsCliActionFatory";
import { cliActionHandler } from "./actions/cliActionHandler";

const program = new Command()

program
    .name("Word Selector")
    .description("Select a list of words")

program
    .command("select-words")
    .action(async () => cliActionHandler(await selectWordsCliActionFatory()))

program.parse()