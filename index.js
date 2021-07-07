#!/usr/bin/env node

const { program, Option } = require('commander')
const os = require('os')
const chalk = require('chalk')
const fs = require('fs')
const genCredentials = require('./utils/genCredentials')

// Load Current Version From Package.json
const VERSION_NUMBER = require('./package.json').version
const Cloner = require('./cloner')
const { initPrompts } = require('./utils/prompts')
const inquirer = require('inquirer')

program.version(VERSION_NUMBER)
let credPath = `${os.homedir}/.hw_cloner`
// Check if credentials exist
let credentialsInstalled = fs.existsSync(`${credPath}/credentials.json`)

const startProcess = async (repo, org) => {
  const credentials = require(`${credPath}/credentials.json`)
  const cloner = new Cloner(credentials.token)
  if (!repo || !org) {
    const orgs = await cloner.listOrgs()
    const prompts = await initPrompts(orgs)
    repo = prompts.repo
    org = prompts.org
  }
  const repos = await cloner.getPrs(org, repo)
  console.log(repos)
  const preparedRepoData = await cloner.loadRepos(repos, credentials)

  let installedPath = cloner.cloneRepos(
    repo,
    preparedRepoData,
    org,
    credentials
  )
  cloner.installDeps(installedPath)
  console.log(
    chalk.green(`All Repos Cloned! Folders can be found in  ${installedPath}`)
  )
  return
}

program
  .option('-s, --setup', 'Setup Credentials')
  .option('-i, --init', 'Start Cloning Process')
  .option('-r , --repo <name>', 'Repo To Clone')
  .option('-o , --org <name>', 'Org To Find')
  .option('-d, --debug', 'Reset Credential File')

program.addHelpCommand()

program.parse(process.argv)

const { setup, init, repo, org, debug } = program.opts()

if (init && credentialsInstalled) {
  startProcess()
  return
}

if (init && !credentialsInstalled) {
  // Rerun setup if no credentials found
  console.warn(
    chalk.yellow('No Credentials Found...\nStarting setup process...\n')
  )
  genCredentials().then(() => startProcess())
  return
}

if (setup) {
  if (credentialsInstalled) {
    console.warn(chalk.red('Credentials Already Installed.'))
  }
  genCredentials()
  return
}

if (debug) {
  inquirer
    .prompt({
      type: 'confirm',
      message:
        "Are you sure you want to delete the credential file? You'll need to re-run the setup process.",
      name: 'reset'
    })
    .then((answer) =>
      answer ? fs.unlinkSync(`${credPath}/credentials.json`) : null
    )
  return
}

if (org && repo && credentialsInstalled) {
  startProcess(repo, org)
  return
}

if (!setup || !init || !debug) {
  program.help()
}
