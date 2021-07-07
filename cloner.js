const { Octokit } = require('@octokit/core')
const { default: slugify } = require('slugify')
const Progress = require('cli-progress')
const os = require('os')
const fs = require('fs')
const chalk = require('chalk')
const { execSync } = require('child_process')
module.exports = class Cloner {
  /**
   *
   * @param {String} token
   */
  constructor(token) {
    this.client = new Octokit({ auth: token })
  }

  async listOrgs() {
    const orgs = await this.client.request('GET /user/orgs')
    return orgs.data.map((o) => o.login)
  }
  /**
   *
   * @param {String} org Target Org For PR's
   * @param {String} repo Target Repos To Clone
   */
  async getPrs(org, repo) {
    try {
      const res = await this.client.request('GET /repos/{owner}/{repo}/pulls', {
        owner: org,
        repo: repo,
        per_page: 100
      })
      return res.data
        .filter((d) => d.state === 'open')
        .map((d) => ({
          user: d.user.login,
          repo,
          folderName: slugify(d.title, { replacement: '_', lower: true })
        }))
    } catch (error) {
      console.error(chalk.red('Repo or Org is incorrect.'))
    }
  }
  /**
   *
   * @param {[{user:String,repo:String,folderName:String}]} repoParams
   * @param {{token:String,username:String} credentials}
   */
  async loadRepos(repoParams, credentials) {
    let repos = []
    let progress = 0
    let bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
    bar.start(repoParams.length)
    for (const params of repoParams) {
      progress++
      const res = await this.client.request('GET /repos/{owner}/{repo}', {
        repo: params.repo,
        owner: params.user
      })
      repos.push({
        cloneUrl: res.data.clone_url.replace(
          'https://',
          `https://${credentials.username}:${credentials.token}@`
        ),
        folderName: params.folderName
      })
      bar.update(progress)
    }
    bar.stop()
    return repos
  }
  /**
   *
   * @param {[{cloneUrl:String,folderName:String}]} repos
   * @param {String} org

   */
  cloneRepos(repo, repos, org, credentials) {
    let progress = 0
    let skipped = 0
    // Construct Target Directory
    let BASE_PATH = `${os.homedir}/${org}-homeworks`
    console.info(
      chalk.blue(`Checking For Existing Target Directory: ${BASE_PATH}`)
    )
    // Check if target directory exists
    if (!fs.existsSync(BASE_PATH)) {
      console.warn(chalk.yellow('Target Directory Does Not Exist, Creating...'))
      fs.mkdirSync(BASE_PATH)
      console.info(chalk.green(`Created Target Directory: ${BASE_PATH}`))
    } else {
      console.info(chalk.green(`Target Directory Exists: ${BASE_PATH}\n`))
    }

    const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
    if (!fs.existsSync(`${BASE_PATH}/${repo}`))
      execSync(`cd ${BASE_PATH} && mkdir ${repo}`)
    console.info(chalk.blue('Cloning Repos'))
    bar.start(repos.length, progress)
    for (const repoData of repos) {
      try {
        progress++
        // Execute clone and mute output
        execSync(
          `git clone ${repoData.cloneUrl}  > /dev/null 2>&1 ${BASE_PATH}/${repo}/${repoData.folderName}`
        )
      } catch (error) {
        if (!error.message.includes('git clone')) {
          console.log(error)
        }
        skipped++
        progress--
      }
      bar.update(progress)
    }
    bar.stop()
    console.info(
      chalk.green(
        progress < repos.length
          ? `Cloned ${progress} repos, skipped ${skipped}.`
          : `Cloned ${progress} Repos.`
      )
    )
    return `${BASE_PATH}/${repo}`
  }

  installDeps(folderPath) {
    let progress = 0
    const folders = fs.readdirSync(folderPath)
    console.info(chalk.yellow('Installing Dependencies'))
    const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
    bar.start(folders.length, progress)
    for (let folder of folders) {
      progress++
      let fullPath = `${folderPath}/${folder}`
      let files = fs.readdirSync(fullPath)
      if (files.includes('requirements.txt')) {
        console.info(
          chalk.blue(
            `Python Project Found, creating virtual env and installing packages.`
          )
        )
        execSync(
          `cd ${fullPath} && virtualenv venv && . venv/bin/activate && pip3 install -r requirements.txt`
        )
      }
      if (files.includes('package.json')) {
        console.info(chalk.blue('Node Project Found, installing packages'))
        execSync(`cd ${fullPath} && npm install`)
        if (
          fs.readdirSync(fullPath).includes('client') &&
          fs.readdirSync(`${fullPath}/client`).includes('package.json')
        ) {
          console.info(
            chalk.red('Nested Folder Found, installing dependencies')
          )
          execSync(`cd ${fullPath}/client && npm install`)
        }
      }
      bar.update(progress)
    }
    bar.stop()
  }
}
