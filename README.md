<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/0xcadams/livepeer-open-orchestrator/main/.github/logo-dark.svg">
    <img alt="livepeer-open-orchestrator logo" src="https://raw.githubusercontent.com/0xcadams/livepeer-open-orchestrator/main/.github/logo-light.svg" width="auto" height="60">
  </picture>
</p>

<h3>livepeer-open-orchestrator</h3>

Open infra-as-code for a globally distributed Livepeer orchestrator/transcoder, using Helm and EKS.
	
<p>
  <a href="https://github.com/0xcadams/livepeer-open-orchestrator/releases">
    <img src="https://img.shields.io/github/v/release/0xcadams/livepeer-open-orchestrator?display_name=tag&colorA=21262d&colorB=161b22&style=flat" alt="Version">
  </a>
  <a href="/LICENSE">
    <img src="https://img.shields.io/github/license/0xcadams/livepeer-open-orchestrator?colorA=21262d&colorB=161b22&style=flat" alt="License">
  </a>
</p>

## Features

- 🚀 Automated deployment to EKS using Github Actions
- 👟 Built on Helm for easy, fast deployment
- 🌀 Configured using a single `.env` file and minimal manual steps
- 🦄 Uses best practices from the top Livepeer orchestrators

## Cluster Creation

Install the npm dependencies that are used in templating/deployment.

```bash
yarn install
```

Copy the `.env.example` to `.env` and modify the values.

Create the EKS cluster in the "main" region which you have defined (in this repo, we have defined `us-east-1` as the main region).

```bash
yarn create:eks:virginia
```

More docs coming soon...

## Deployment

Docs coming soon...

## Forking

If you're interested in forking this project, please consider submitting useful PRs back to this repo for improvements for the community!

## License

Licensed under the [Apache License](/LICENSE) - free to copy/modify/fork as desired.
