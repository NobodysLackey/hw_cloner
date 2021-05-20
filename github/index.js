const { Octokit } = require('@octokit/core')
const { execSync, exec } = require('child_process')
const fs = require('fs')
const Progress = require('cli-progress')
const chalk = require('chalk')

module.exports = class Github {
  constructor(token, org, repo) {
    this.token = token
    this.org = org
    this.repo = repo
    this.authUsername = 'anpato'
    this.client = null
    this.storage = null
    this.folders = []
  }

  authenticate() {
    this.client = new Octokit({ auth: this.token })
  }
  async searchRepos(q) {
    const res = await this.client.request('GET /search/repositories', {
      q: `${q} org:${this.org}`
    })
    console.log(res)
  }
  clone(repos) {
    console.log(chalk.green('Cloning Repos'))
    let basePath = `${process.cwd()}/repos`
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath)
    }
    if (!fs.existsSync(`${basePath}/${this.repo}`)) {
      fs.mkdirSync(`${basePath}/${this.repo}`)
    }
    const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
    let progress = 0

    bar.start(repos.length, progress)
    for (let repo of repos) {
      this.storage = `${basePath}/${this.repo}/${repo.folderName}`
      if (!fs.existsSync(this.storage)) {
        fs.mkdirSync(this.storage)
      }

      progress++
      console.log(this.storage)
      execSync(
        `cd ${basePath} && git -C ${this.storage} clone ${repo.cloneUrl} -q`
      )
      execSync(`cd ${this.storage}/${this.repo} && mv * ../ `)
      execSync(`cd ${this.storage}/ && rm -rf ${this.repo}`)
      this.folders.push(`${this.storage}`)
      bar.update(progress)
    }
    bar.stop()
    console.log(chalk.green(`Repos Cloned To ${this.storage}`))
    this.checkNeedsInstall()
  }

  checkNeedsInstall() {
    console.log(chalk.green('Checking for package.json in folders'))
    const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
    let progress = 0
    bar.start(this.folders.length, progress)
    for (let folder of this.folders) {
      progress++
      if (fs.readdirSync(folder).includes('package.json')) {
        console.log(chalk.yellow('Installing Dependencies'))
        execSync(`cd ${folder} && npm install`)
      }
      bar.update(progress)
    }
    bar.stop()
    console.log(chalk.green('Finished checking for package.json!'))
  }

  async retrieveRepos(nextReqParams) {
    let repos = []
    let progress = 0
    console.log(chalk.green('Retrieving Repos'))
    const bar = new Progress.SingleBar({}, Progress.Presets.shades_classic)
    bar.start(nextReqParams.length, progress)
    for (let rq of nextReqParams) {
      progress++
      const repo = await this.client.request('GET /repos/{owner}/{repo}', {
        owner: rq.user,
        repo: rq.repo
      })
      repos.push({
        cloneUrl: repo.data.clone_url.replace(
          'https://',
          `https://${this.authUsername}:${this.token}@`
        ),
        folderName: rq.folderName
          .toLowerCase()
          .split(' ')
          .join('_')
          .replace(/["']/g, '')
      })
      bar.update(progress)
    }
    bar.stop()
    console.log(chalk.green('Repos Retrieved!'))
    return repos
  }

  async listPulls() {
    const data = await this.client.request('GET /repos/{owner}/{repo}/pulls', {
      owner: this.org,
      repo: this.repo,
      per_page: 100
    })

    let nextReqParams = data.data
      .filter((d) => d.state === 'open')
      .map((e) => ({
        user: e.user.login,
        repo: this.repo,
        folderName: e.title
      }))
    return nextReqParams
  }
}
