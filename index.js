#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const Github = require('./github')
require('dotenv').config()

const orgPrompt = {
  name: 'org',
  type: 'input',
  message: chalk.green('Which github organization are you working with today?')
}

const tokenPrompt = {
  name: 'token',
  type: 'input',
  message: chalk.magenta('Enter your github personal access token:')
}

const saveTokenPrompt = {
  name: 'save_token',
  type: 'confirm',
  message: chalk.red('Would you like to save your token for another time?')
}
const authUserPrompt = {
  name: 'auth_user',
  type: 'input',
  message: chalk.red('Enter your github username:')
}
const saveUserPrompt = {
  name: 'save_user',
  type: 'confirm',
  message: chalk.red('Would you like to save your username for another time?')
}
const saveOrgPrompt = {
  name: 'save_org',
  type: 'confirm',
  message: chalk.red(
    'Would you like to save your organization for another time?'
  )
}

const prompt = {
  name: 'repo',
  type: 'input',
  message: chalk.green('Which homework are you checking today:')
}

const checkSaveSettings = (answers) => {
  let entry = ''
  switch (true) {
    case answers.save_org && answers.save_token:
      entry = `GH_TOKEN=${answers.token}\nORG_NAME=${answers.org}`
      break
    case answers.save_org && !answers.save_token:
      entry = `ORG_NAME=${answers.org}`
      break
    case !answers.save_org && answers.save_token:
      entry = `GH_TOKEN=${answers.token}\n`
      break
    default:
      break
  }
  if (entry) {
    fs.writeFileSync(`${process.cwd()}/.env`, entry)
  }
  return entry
}

const startPrompts = () => {
  console.log(chalk.green("Start Cloning Hw's"))
  let confirmedPrompts = []
  const { ORG_NAME, GH_TOKEN } = process.env
  if (!ORG_NAME && !GH_TOKEN) {
    confirmedPrompts = [
      orgPrompt,
      tokenPrompt,
      saveTokenPrompt,
      saveOrgPrompt,
      prompt
    ]
  } else if (GH_TOKEN && !ORG_NAME) {
    confirmedPrompts = [orgPrompt, saveOrgPrompt, prompt]
  } else {
    confirmedPrompts = [prompt]
  }
  inquirer.prompt(confirmedPrompts).then(async (answers) => {
    const config = {
      token: GH_TOKEN || answers.token,
      org: ORG_NAME || answers.org,
      repo: answers.repo
    }
    checkSaveSettings(answers)
    const github = new Github(config.token, config.org, config.repo)
    github.authenticate()
    const rqs = await github.listPulls()
    const repos = await github.retrieveRepos(rqs)
    await github.clone(repos)
    console.log(chalk.green('All Done!'))
  })
}

startPrompts()
