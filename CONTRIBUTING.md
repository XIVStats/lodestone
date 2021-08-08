# Contributing to this package

Thanks for your interest ❤️ in helping us out.

We highly value community contributions. We want to recognize all your hard work by getting your code merged as quickly as we can, so please read the guidance here carefully to make sure the review process goes smoothly.

This project is released under the [MIT license](https://choosealicense.com/licenses/mit/). Any code you submit will be released under that license.

This document describes how to set up a development environment and submit your changes. Please let us know if it's not up-to-date (even better, submit a PR with your corrections ;-)).

- [Getting Started](#getting-started)
- [Pull Requests](#pull-requests)
	- [Step 1: Find something to work on](#step-1-find-something-to-work-on)
	- [Step 2: Design (optional)](#step-2-design-optional)
	- [Step 3: Work your Magic](#step-3-work-your-magic)
	- [Step 4: Pull Request](#step-5-pull-request)
	- [Step 5: Merge](#step-5-merge)
- [Versioning and Release](#versioning-and-release)

## Getting Started

The following steps describe to set up this project on your local machine.

### Setup

The following tools need to be installed on your system prior to install the project:

* [Node.js > 14](https://nodejs.org/download/release/latest-v14.x/)
	* We recommend using a version in [Active LTS](https://nodejs.org/en/about/releases/)
	* On MacOS, unix, Linux and Windows WSL we recommend using [nvm](https://github.com/nvm-sh/nvm) to install and manage your Node.js versions
* [npm > 6](https://www.npmjs.com/package/npm?activeTab=versions)
	* Most Node.js installations will automatically install npm for you.

First fork the repository, and then run the following commands to clone the repository locally.

```shell
$ git clone https://github.com/{your-account}/lodestone.git
$ cd lodestone
$ npm install
```

You can use an editor of your choice to work with this project, [Visual Studio Code](https://code.visualstudio.com/) should work fine.

We use `eslint` and `prettier` to keep our code consistent in terms of style and reducing defects. We recommend installing the eslint ([link for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)) and prettier ([link for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) plugins for any IDE or editor you use.

### Repo Layout

This project is a [NPM](https://www.npmjs.com/about) project written in [typescript](https://www.typescriptlang.org/). If you're unfamiliar with any of these technologies, it is useful to learn about them and will make understanding the codebase easier but strictly not necessary for simple contributions.

The repo contains `src/` directory that contains the source code.

Tests are contained within `__tests__` directories in the `src` directory, alongside their respective test targets. The tests themselves are written using [Jest](https://jestjs.io/). `

### Build

To build the TypeScript Classes that make up this project, execute the below:

```shell
$ npm run build
```

The build will produce a `dist` directory containing the `.js.` and header (`.d.ts`) files, that are used for the module published module.

Do not commit, or import anything in the `dist` directory.

### Test

To execute the [Jest](https://jestjs.io/) tests, execute the below:

```shell
$ npm run test
```

### Lint

We use [Eslint] to find issues in our code, and keep our code consistent (e.g. including a `;` at the end of a line).

To execute the lint task you can execute the below

```shell
$ npm run lint
```

This will output a list of issues to fix.

Alternatively you can use the below command to automatically fix as many of these issues as possible.

```shell
$ npm run lint:fix
```

### Format

We use [Prettier](https://prettier.io/) to keep the formatting of our code consistent, you can execute the below to format your code.

```shell
$ npm run format
```

## Pull Requests

### Step 1: Find something to work on

If you want to contribute a specific feature or fix you have in mind, look at active [pull
requests](https://github.com/xivstats/lodestone/pulls) to see if someone else is already working on it. If not, you can start
contributing your changes.

On the other hand, if you are here looking for an issue to work on, explore our [backlog of
issues](https://github.com/xivstats/lodestone/issues) and find something that piques your interest. We have labeled all of our
issues for easy searching.

If you are looking for your first contribution, the ['good first issue'
label](https://github.com/xivstsats/lodestone/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) will be of help.

It's a good idea to keep the priority of issues in mind when deciding what to
work on. If we have labelled an issue as `P2`, it means it's something we won't
get to soon, and we're waiting on more feedback from the community (in the form
of +1s and comments) to give it a higher priority. A PR for a `P2` issue may
take us some time to review, especially if it involves a complex
implementation. `P1` issues impact a significant number of customers, so we are
much more likely to give a PR for those issues prompt attention.

### Step 2: Design

In some cases, it is useful to seek feedback by iterating on a design document. This is useful
when you plan a big change or feature, or you want advice on what would be the best path forward.

In many cases, the GitHub issue is sufficient for such discussions, and can be
sufficient to get clarity on what you plan to do.


### Step 3: Work your Magic

Work your magic. Here are some guidelines:

* Coding style.
	* We have a number of linters that run during pre-commit hooks that will enforce coding consistency and correctness.
	  Watch out for their error messages and adjust your code accordingly.
* Every change requires a unit test
* If you change APIs, make sure to update the

### Step 4: Pull Request

* Create a commit with your changes and push them to a
  [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
  > Note: xivstats core members can push to a branch on the repo (naming convention: `<user>/<feature-bug-name>`).

* Create a [pull request on
  Github](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

* Pull request title and message (and PR title and description) must adhere to
  [conventionalcommits](https://www.conventionalcommits.org).
	* The title must begin with `feat(component): title`, `fix(component): title`, `refactor(component): title` or
	  `chore(module): title`.
	* Title should be lowercase.
	* No period at the end of the title.

* Pull request message should describe _motivation_. Think about your code reviewers and what information they need in
  order to understand what you did. If it's a big commit (hopefully not), try to provide some good entry points so
  it will be easier to follow.

* Pull request message should indicate which issues are fixed: `fixes #<issue>` or `closes #<issue>`.

* Shout out to collaborators.

* If not obvious (i.e. from unit tests), describe how you verified that your change works.

* If this PR includes breaking changes, they must be listed at the end in the following format
  (notice how multiple breaking changes should be formatted):

  ```
  BREAKING CHANGE: Description of what broke and how to achieve this behavior now
  * **module-name:** Another breaking change
  * **module-name:** Yet another breaking change
  ```

* Once the pull request is submitted, a reviewer will be assigned by the maintainers.

* Discuss review comments and iterate until you get at least one "Approve". When iterating, push new commits to the
  same branch. Usually all these are going to be squashed when you merge to master. The commit messages should be hints
  for you when you finalize your merge commit message.

* Make sure to update the PR title/description if things change. The PR title/description are going to be used as the
  commit title/message and will appear in the CHANGELOG, so maintain them all the way throughout the process.

### Step 5: Merge

* Make sure your PR builds successfully (we have CodeBuild setup to automatically build all PRs).
* Once approved and tested, one of our bots will squash-merge to master and will use your PR title/description as the
  commit message.

## Versioning and Release

See [release.md](./docs/release.md) for details on how versions are maintained and how
to trigger a new release
