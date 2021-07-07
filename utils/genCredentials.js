const inquirer = require('inquirer')
const fs = require('fs')
module.exports = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      message:
        'Enter Your Github Personal Access Token. You can create one here: https://github.com/settings/tokens\nEnable the following scopes:\n- read:org\n- repo (Full Control)\n',
      name: 'token'
    },
    {
      type: 'input',
      message: 'Enter your github username: ',
      name: 'username'
    }
  ])
  fs.writeFileSync(
    'credentials.json',
    JSON.stringify({
      token: answers.token,
      dateCreated: new Date(),
      password: answers.password,
      username: answers.username
    })
  )
}
