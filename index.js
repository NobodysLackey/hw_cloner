#!/usr/bin/env node

const { program } = require('commander')

const chalk = require('chalk')
const fs = require('fs')
const genCredentials = require('./utils/genCredentials')

// Load Current Version From Package.json
const VERSION_NUMBER = require('./package.json').version
const Cloner = require('./cloner')
const { initPrompts } = require('./utils/prompts')

program.version(VERSION_NUMBER)

// Check if credentials exist
let credentialsInstalled = fs.existsSync('credentials.json')

const startProcess = async () => {
  const credentials = require('./credentials.json')
  const cloner = new Cloner(credentials.token)
  const orgs = await cloner.listOrgs()
  const { org, repo } = await initPrompts(orgs)
  const repos = await cloner.getPrs(org, repo)
  const preparedRepoData = await cloner.loadRepos(repos, credentials)

  let installedPath = cloner.cloneRepos(
    repo,
    preparedRepoData,
    org,
    credentials
  )
  cloner.installDeps(installedPath)
  console.log(
    chalk.green(
      `All Repos Cloned! Folders can be found in  ${installedPath}/${repo}`
    )
  )
}

program
  .option('-h, --help', 'List Help')
  .option('-s, --setup', 'Setup Credentials')
  .option('-r, --run', 'Start Cloning Process')
  .parse()

const { setup, run } = program.opts()

if (setup) {
  genCredentials()
}

if (run && credentialsInstalled) {
  startProcess()
} else {
  // Rerun setup if no credentials found
  console.warn(
    chalk.yellow('No Credentials Found...\nStarting setup process...\n')
  )
  genCredentials().then(() => startProcess())
}
