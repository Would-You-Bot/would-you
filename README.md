# Would-You Bot

Would-You bot is an open-source discord bot that includes activities and questions to keep your server active!

## Resources

- [Documentation](https://slekup.github.io/would-you-bot/)
- [Website](https://wouldyoubot.com)
- [Support Server](https://wouldyoubot.gg/discord)
- [Bot Invite](https://wouldyoubot.gg/invite)
- [Vote](https://top.gg/bot/981649513427111957/vote)
- [Terms of Service](https://wouldyoubot.gg/terms)
- [Privacy Policy](https://wouldyoubot.gg/privacy)

# Getting Started

## Starting the Development Environment

The development environment does not currently use Docker, so you will need to install the dependencies manually.

1. Install [Node.js](https://nodejs.org/en/) (version 18 or higher).
2. Install [MongoDB](https://www.mongodb.com/try/download/community) (version 4.4 or higher).
3. Install dependencies by running `npm install`
4. Create a `.env` file in the root directory of the project, copy the contents of `.env.example` into `.env`, then fill in the values with your own values.
5. Run `npm run dev` to start the development environment

### Linting

Before committing, make sure to run `npm run lint` to lint the code. This will also be run automatically when you commit, but it is better to run it manually to make sure you don't commit code that doesn't pass linting.

## Starting the Production Environment

These instructions are for the `ubuntu` operating system. If you are using a different operating system, you will need to modify the commands to work with your operating system.

1. Install Docker. [Instructions](https://docs.docker.com/engine/install/ubuntu/)
2. Install Docker Compose. [Instructions](https://docs.docker.com/compose/install/)
3. Install Git. [Instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. Clone the repository by running `git clone https://github.com/Would-You-Bot/client`.
5. Create a `.env` file in the root directory of the project, copy the contents of `.env.example` into `.env`, then fill in the values with your own values.
6. Add a docker user group and add your user to it. See [here](https://docs.docker.com/engine/install/linux-postinstall/) for more information.
   ```bash
   # 1. Create the docker group.
   $ sudo groupadd docker
   # 2. Add your user to the docker group.
   $ sudo usermod -aG docker $USER
   # 3. Log out and log back in so that your group membership is re-evaluated.
   $ newgrp docker
   # 4. Verify that you can run docker commands without sudo.
   $ docker run hello-world
   ```
7. Run `docker-compose up --build -d` to start the production environment.

### Updating the Production Environment

You can run `./update.sh` file in the root directory. This will pull the latest changes from the repository, rebuild the images and restart the containers.

If you would like to update an individual service, you can run `./update <service>`.

### Viewing Logs

To view the logs on the server-side, type `docker-compose logs -t -f ` in the root directory. This will show the logs for all of the services. If you would like to view the logs for a specific service, you can run `docker-compose logs -t -f <service>`.

## Logging and Debugging

**Console Logs**

Logs are always outputted to the console. Debug logs are only outputted to the console in development, and if the `DEBUG` environment variable is set to `'true'`.

**Logs folder**: `tmp/logs`

For each instance of the main process, a new folder will be created in the `tmp/logs` folder. This folder will contain the logs for that instance. The logs will be split into multiple files, each file represents a different level of logging. the levels are `error`, `warn`, `info`, and `debug`. The logs will be split into multiple files because it makes it easier to find the logs you are looking for.

For each cluster, a further sub-folder may be made with a new set of log files just for that cluster. For example, the mentioned log level files would be in the directory: `tmp/logs/cluster-0/`.

**Discord logs**

Logs are also sent to discord to allow for easier and more accessible debugging, as not everyone will have access to the host system, especially in production. The channels for the different log levels are defined in the `.env` file.

## Using VS Code

### Highly Recommended Extensions

| Extension                                                                                         | Description                                                                             |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)              | Integrates ESLint into VS Code.                                                         |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)            | Code formatter.                                                                         |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) | Brings new color styles to comments, better comments prefixes are used in this project. |

### Optionally Recommended Extensions

| Extension                                                                                                | Description                                                                                                              |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Complete JSDoc Tags](https://marketplace.visualstudio.com/items?itemName=HookyQR.JSDocTagComplete)      | Provides code completion for JS Doc tags, only within JS Doc comment blocks so it doesn't get in the way of your coding. |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)                   | Shows errors and warnings inline in the editor.                                                                          |
| [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) | Makes TypeScript errors easier to read.                                                                                  |

### VS Code Snippets

In the `.vscode` folder, there are `*.code-snippets` files. These file contains snippets that can be used in VS Code. Type `$` followed by the name of the snippet to use it. This saves time writing boilerplate code and makes it easier to follow the conventions.

# Protocols and Conventions

## Documentation

For documentation, we use [TSdoc](https://tsdoc.org/). This is a standard for documenting TypeScript code. It is similar to JSDoc, but it is more strict and has more features. In VS Code, if you type `/**` above a class or function, it will automatically generate a template for you to fill out.

Run `npm run docs` to generate the documentation. The documentation will be generated in the `docs` folder. This will be available on the [documentation website](https://slekup.github.io/would-you-bot/) via GitHub Pages.

## Other

- When defining class functions, use `public` and `private` to indicate whether the function is meant to be used outside of the class or not.

# Technical Details

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Discord.js](https://discord.js.org/#/)

## Configuration

### Private configuration

Private configuration is done using environment variables. The environment variables are defined in the `.env.example` file. To use them, create a `.env` file in the root directory of the project, copy the contents of `.env.example` into `.env`, then fill in the values with your own values.

### Public configuration

Public configuration is done using the `config` folder. The `config` folder contains yaml files that contain configuration values. These values are loaded into the `Config` class in the `src/config.ts` file. The initialized `config` class is then used throughout the project to access the configuration values and custom functions. You can see what is expected in the yaml file by looking at `src/config.ts` and `src/typings/config.ts`.

The `emojis.yaml` file expects emoji values with the full discord emoji string. For example:

```yaml
# emojis.yaml
yes: <:yes:123456789012345678>
no: <:no:123456789012345678>
```

The config file will convert each emoji string into an emoji object which contains the id and full values.

## Project Structure

```
.
├── .git
├── .github
├── .vscode
│   ├── settings.json
│   └── *.code-snippets
├── config
├── dist
├── docs
├── node_modules
├── src
│   ├── constants
│   │   ├── fonts
│   │   ├── images
│   │   ├── languages
│   │   └── *.json
│   ├── events
│   ├── interactions
│   │   ├── buttons
│   │   └── commands
│   ├── interfaces
│   ├── models
│   ├── typings
│   ├── utils
│   │   ├── classes
│   │   ├── client
│   │   ├── functions
│   │   └── start
│   ├── app.ts
│   ├── client.ts
│   ├── cluster.ts
│   └── config.ts
├── .dockerignore
├── .env
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── .CODE_OF_CONDUCT.md
├── docker-compose.yml
├── Dockerfile
├── environment.d.ts
├── LICENSE
├── package-lock.json
├── package.json
├── prettier.config.js
├── README.md
├── register.cjs
├── tsconfig.json
└── update.sh
```

# Project Details

## Contributing

If you would like to contribute to the project, please read the [contributing guidelines](/CODE_OF_CONDUCT.md). If you have any questions, feel free to ask in the [support server](https://wouldyoubot.gg/discord).

## License

This project is licensed under a [Custom License](/LICENSE).
