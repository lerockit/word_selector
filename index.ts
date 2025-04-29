import { CommandLineInterfaceAdapter } from './src/adapters/CommandLineInterfaceAdapter'
import { CLIRoutes } from './src/driver/cli'

const cliAdapter = new CommandLineInterfaceAdapter()
const routes = new CLIRoutes(cliAdapter)

routes.chooseWord()
