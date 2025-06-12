<p align="center">
  <img src="assets/api_basket-banner.svg" alt="api_basket-banner" width="800">
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/keylian15/API_Basket?style=flat&logo=opensourceinitiative&logoColor=white&color=00fffb" alt="license">
	<img src="https://img.shields.io/github/last-commit/keylian15/API_Basket?style=flat&logo=git&logoColor=white&color=00fffb" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/keylian15/API_Basket?style=flat&color=00fffb" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/keylian15/API_Basket?style=flat&color=00fffb" alt="repo-language-count">
</p>
<p align="center">Built with the tools and technologies:</p>
<p align="center">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<br>
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
</p>
<br>

## Table of Contents

- [ Overview](#overview)
- [ Features](#features)
- [ Project Structure](#project-structure)
- [ Getting Started](#getting-started)
  - [ Prerequisites](#prerequisites)
  - [ Installation](#installation)
  - [ Usage](#usage)
  - [ Testing](#testing)
- [ Contributing](#contributing)
- [ Acknowledgments](#acknowledgments)

---

## Overview

`Api_basket` is a comprehensive basketball API project that provides access to a full database of basketball teams, players, and historical matches. The main goal of the project is to offer not only static data but also predictions based on past game results and team performance. It serves as a backend solution for accessing and analyzing basketball-related data from the very beginning of recorded matches.

Full API documentation is available at: [http://62.72.18.63:11042/api-docs/](http://62.72.18.63:11042/api-docs/)

---

## Features

- **Teams & Players**  
  Access detailed information about all basketball teams and their rosters.

- **Historical Matches**  
  Retrieve past match data with scores, dates, teams involved, and player performance.

- **Predictions**  
  Generate match predictions based on historical statistics, win/loss ratios, and team comparisons.

- **Complete API Structure**  
  A fully RESTful API architecture designed to be scalable and easily integrated into frontend or data analytics tools.

---

## Project Structure

```sh
└── API_Basket/
    ├── README.md
    ├── commitlint.config.js
    ├── coverage
    │   ├── clover.xml
    │   ├── coverage-final.json
    │   ├── lcov-report
    │   │   ├── base.css
    │   │   ├── block-navigation.js
    │   │   ├── favicon.png
    │   │   ├── index.html
    │   │   ├── prettify.css
    │   │   ├── prettify.js
    │   │   ├── sort-arrow-sprite.png
    │   │   ├── sorter.js
    │   │   └── src
    │   │       ├── index.html
    │   │       ├── index.ts.html
    │   │       ├── players
    │   │       │   ├── index.html
    │   │       │   ├── players.controller.ts.html
    │   │       │   └── players.router.ts.html
    │   │       └── teams
    │   │           ├── index.html
    │   │           ├── teams.controller.ts.html
    │   │           └── teams.router.ts.html
    │   └── lcov.info
    ├── jest.config.ts
    ├── package-lock.json
    ├── package.json
    ├── prisma
    │   └── schema.prisma
    ├── src
    │   ├── aba
    │   │   ├── aba.controller.ts
    │   │   └── aba.router.ts
    │   ├── advanced
    │   │   ├── advanced.controller.ts
    │   │   └── advanced.router.ts
    │   ├── classement
    │   │   ├── classement.controller.ts
    │   │   └── classement.router.ts
    │   ├── client.ts
    │   ├── commun
    │   │   └── commun.middleware .ts
    │   ├── index.ts
    │   ├── matchs
    │   │   ├── matchs.controller.ts
    │   │   └── matchs.router.ts
    │   ├── nba
    │   │   ├── nab.controller.ts
    │   │   └── nba.router.ts
    │   ├── opponentStatsParMatch
    │   │   ├── opponentStatsParMatch.controller.ts
    │   │   └── opponentStatsParMatch.router.ts
    │   ├── players
    │   │   ├── players.controller.ts
    │   │   └── players.router.ts
    │   ├── playersDirectory
    │   │   ├── playersDirectory.controller.ts
    │   │   └── playersDirectory.router.ts
    │   ├── playersParMatch
    │   │   ├── playersParMatch.controller.ts
    │   │   └── playersParMatch.router.ts
    │   ├── predictions
    │   │   ├── predictions.controller.ts
    │   │   └── predictions.router.ts
    │   ├── swagger.yaml
    │   ├── teams
    │   │   ├── teams.controller.ts
    │   │   └── teams.router.ts
    │   ├── teamsStatsParMatch
    │   │   ├── teamsStatsParMatch.controller.ts
    │   │   └── teamsStatsParMatch.router.ts
    │   └── users
    │       ├── users.controller.ts
    │       └── users.router.ts
    ├── tests
    │   ├── jest.setup.ts
    │   ├── player.test.ts
    │   └── teams.test.ts
    └── tsconfig.json
```
---

## Getting Started

### Prerequisites

Before getting started with API_Basket, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

### Installation

Install API_Basket using one of the following methods:

**Build from source:**

1. Clone the API_Basket repository:

```sh
❯ git clone https://github.com/keylian15/API_Basket
```

2. Navigate to the project directory:

```sh
❯ cd API_Basket
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

### Usage

Run API_Basket using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```

### Testing

Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```

---

## Contributing

- **💬 [Join the Discussions](https://github.com/keylian15/API_Basket/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/keylian15/API_Basket/issues)**: Submit bugs found or log feature requests for the `API_Basket` project.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/keylian15/API_Basket
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/keylian15/API_Basket/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=keylian15/API_Basket">
   </a>
</p>
</details>

---

## Acknowledgments

<a href="https://github.com{/keylian15/API_Basket/}graphs/contributors">
	<img src="https://contrib.rocks/image?repo=keylian15/API_Basket">
</a>

---

_This documentation was generated using [readme-ai](https://readme-ai.streamlit.app)._
