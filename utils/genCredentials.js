const inquirer = require('inquirer')
const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
module.exports = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      message:
        'Enter Your Github Personal Access Token. You can create one here: https://github.com/settings/tokens\nEnable the following scopes:\n- read:org\n- repo (Full Control)\nPersonal Access Token:',
      name: 'token'
    },
    {
      type: 'input',
      message: 'Enter your github username:',
      name: 'username'
    }
  ])
  let path = `${os.homedir}/.hw_cloner`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  if (!answers.token && !answers.username) {
    console.error(chalk.red('Empty Inputs, Aborting Setup.'))
    process.exit()
  }
  fs.writeFileSync(
    `${os.homedir}/.hw_cloner/credentials.json`,
    JSON.stringify({
      token: answers.token,
      dateCreated: new Date(),
      password: answers.password,
      username: answers.username
    })
  )
}
