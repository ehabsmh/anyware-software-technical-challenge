import chalk from "chalk";

const log = {
  info: (msg: string) => console.log(chalk.blue(`ℹ️ ${msg}`)),
  success: (msg: string) => console.log(chalk.green(`✅ ${msg}`)),
  error: (msg: string) => console.log(chalk.red(`❌ ${msg}`)),
  warn: (msg: string) => console.log(chalk.yellow(`⚠️ ${msg}`)),
};

export default log;
