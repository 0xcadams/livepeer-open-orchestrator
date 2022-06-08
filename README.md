<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/0xcadams/livepeer-open-orchestrator/main/.github/logo-dark.svg">
    <img alt="livepeer-open-orchestrator logo" src="https://raw.githubusercontent.com/0xcadams/livepeer-open-orchestrator/main/.github/logo-light.svg" width="auto" height="60">
  </picture>
</p>

<h3>livepeer-open-orchestrator</h3>

Open infra-as-code for a globally distributed Livepeer orchestrator/transcoder, using Helm and EKS.

<p>
  <a href="https://explorer.livepeer.org/accounts/0xfc9122f12b23d89a33f7e073072b9bf60aab3fa4/orchestrating">
    <img src="https://img.shields.io/static/v1?label=livepeer&message=open-orchestrator.eth&colorA=21262d&colorB=161b22&style=flat" alt="Version">
  </a>
  <a href="https://github.com/0xcadams/livepeer-open-orchestrator/releases">
    <img src="https://img.shields.io/github/v/release/0xcadams/livepeer-open-orchestrator?display_name=tag&colorA=21262d&colorB=161b22&style=flat" alt="Version">
  </a>
  <a href="/LICENSE">
    <img src="https://img.shields.io/github/license/0xcadams/livepeer-open-orchestrator?colorA=21262d&colorB=161b22&style=flat" alt="License">
  </a>
</p>

## Features

- 🚀 Automated deployment to Kubernetes using Github Actions
- 👟 Built on Helm for easy, portable deployment
- 📦 Easily migrate to alternative Kubernetes providers (or `minikube` for non-centralized providers)
- 🌀 Configured using a single `.env` file and minimal manual steps
- 🦄 Inspired by best practices from the top Livepeer orchestrators

## Shoutouts

Check out the Livepeer orchestrators who support the community and inspired many of the practices baked into this repo:

- [vires-in-numeris](https://explorer.livepeer.org/accounts/0x525419ff5707190389bfb5c87c375d710f5fcb0e/orchestrating)
- [titan-node](https://explorer.livepeer.org/accounts/0xbe8770603daf200b1fa136ad354ba854928e602b/orchestrating)
- [authority-null](https://explorer.livepeer.org/accounts/0x9d61ae5875e89036fbf6059f3116d01a22ace3c8/orchestrating)
- [solarfarm.papa-bear](https://explorer.livepeer.org/accounts/0x10742714f33f3d804e3fa489618b5c3ca12a6df7/orchestrating)
- [lptnode](https://explorer.livepeer.org/accounts/0x11b04d9a305abe978aeaddc67d9d09aaa4996090/orchestrating)
- [ftkuhnsman](https://explorer.livepeer.org/accounts/0x4a43b1d7e6227c8b0512e413f406555647ff7bdb/orchestrating)
- [nightnode](https://explorer.livepeer.org/accounts/0x47a907a0bd1627d71cd14430a721d1550d6d6f58/orchestrating)
- and more!

## Initial Setup

### Configuration

First, install the npm dependencies that are used in templating/deployment.

```bash
yarn install
```

Copy the `.env.example` to `.env` and modify the values. Many of the values are documented and/or straightforward. However, a few will need extra steps to configure.

The `DOMAIN` you configure will need to be imported into your AWS account to be managed in Route53. This domain will be used and subdomains will be created under it for the RPC endpoint and Grafana. To [create the hosted zone](https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md) in Route53, run:

```bash
aws route53 create-hosted-zone --name "domain.xyz." --caller-reference "external-dns-$(date +%s)"
```

The `ETH_ADDRESS` is the public address of your orchestrator - it will have to be generated from a private key. If you have already registered as an orchestrator before, you can use this public address. If not, use the following commands to generate a new public/private key:

```bash
> docker run -d --name "geth" ethereum/client-go
> docker exec -it geth geth account new

...
Path of the secret key file: /root/.ethereum/keystore/...
...

> docker exec -it geth cat /root/.ethereum/keystore/... > orchestrator.json
```

Note the password you used - you will need it to run the orchestrator reward node ([as documented in detail here](https://forum.livepeer.org/t/guide-the-most-secure-way-to-run-an-orchestrator-as-of-june-2022/1840)).

You will also need to run the above commands again to generate a "worker" public/private key, which is used on the actual transcoding machines to ensure that the main account keys are secure. Replace `orchestrator.json` above with `key.json`. Once you generate another JSON key with a different password, set the `JSON_KEY_PASSWORD` value in `.env` to this password.

Lastly, you will need to register for [ftkuhnsman's RPC endpoint](https://livepeer.ftkuhnsman.com/accounts/login/?next=/accounts/profile/) and use the API key provided in your `.env`. This will first require you to stake LPT and become an active orchestrator, which is not covered in these docs. Please see the Livepeer Discord for help with this.

The passwords used in the config should be unique, long, and randomly generated.

### Cluster Creation

If you would like to create EKS clusters (and not use another provider), continue with this section. You'll first need to install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [eksctl](https://eksctl.io/introduction/):

```bash
brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
```

Create the EKS cluster in the "main" region which you have defined (in this repo, we have defined `us-east-1` or Virginia as the main region).

```bash
aws configure
yarn create:eks:virginia
```

This will [set up AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html) locally and use `eksctl` to create an EKS cluster. You will be able to see the new cluster in `us-east-1` your [EKS dashboard](https://us-east-1.console.aws.amazon.com/eks/home?region=us-east-1#/clusters).

You will also need to create an S3 bucket to hold the Thanos historical metrics (which allows metrics to be shared between regional clusters).

```bash
aws s3api create-bucket --bucket $PROJECT_NAME --region us-east-1 --acl private
```

This will create an S3 bucket with the project name as the title, which is necessary for Thanos to use when querying/writing metrics to storage.

### Secret Creation

```bash
> kubectl create secret generic json-private-key --from-file=key.json=key.json
```

```bash
htpasswd -c auth orchestrator
kubectl create secret generic rpc-auth --from-file=auth
```

More docs coming soon...

## Deployment

Docs coming soon...

## Forking

If you're interested in forking this project, please consider submitting useful PRs back to this repo for improvements for the community!

## License

Licensed under the [Apache License](/LICENSE) - free to copy/modify/fork as desired.
