const inquirer = require('inquirer')

const initPrompts = async (orgs) =>
  await inquirer.prompt([
    {
      type: 'list',
      message: 'Select An Org:',
      choices: orgs,
      name: 'org'
    },
    {
      type: 'input',
      message: 'Enter the repo name:',
      name: 'repo'
    }
  ])

module.exports = {
  initPrompts
}
