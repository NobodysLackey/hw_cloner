# Homework Cloning Tool

## Getting Started

Generate a personal access token on [github](https://github.com/settings/tokens) with the following permissions:

- `repo`
- `admin:org`

npm:

```sh
npm i -g hw-cloner
```

Yarn:

```sh
yarn add global hw-cloner
```

## Usage

```sh
hw-cloner
```

| Command | Flag | Use                               |
| ------- | ---- | --------------------------------- |
| --debug | -d   | Reset credential file             |
| --setup | -s   | Start the setup process           |
| --init  | -i   | Start The cloning process         |
| --org   | -o   | Target org to select a repository |
| --repo  | -r   | Target repo to view pull requests |
| --help  | -h   | Lists available commands          |

A folder will be created in your home directory under the name of the Organization that you selected. All repositories will be cloned into a folder named after the selected respository and will contain folders with the students name for all open pull requests.

The tool will also install dependencies for Python or Javascript packages.

**Ruby support coming soon.**

## How are credentials stored?

Your Github personal access token and username will be stored in a `.hw-cloner` folder within your home directory. None of these credentials get exposed externally and will remain local to your machine.
