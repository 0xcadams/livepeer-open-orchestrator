<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/0xcadams/livepeer-open-orchestrator/main/.github/logo-dark.svg">
    <img alt="livepeer-open-orchestrator logo" src="https://raw.githubusercontent.com/0xcadams/livepeer-open-orchestrator/main/.github/logo-light.svg" width="auto" height="60">
  </picture>
</p>

<h3>livepeer-open-orchestrator</h3>

Open infra-as-code for a globally distributed Livepeer orchestrator/transcoder, using k3s, Helm and EKS.

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

<h4>⚠️ Warning - this repository is not actively maintained and the orchestrator is no longer active.</h4>

See these orchestrators as great alternatives to stake with:

- [vires-in-numeris](https://explorer.livepeer.org/accounts/0x525419ff5707190389bfb5c87c375d710f5fcb0e/orchestrating)
- [pon-node.eth](https://explorer.livepeer.org/accounts/0xdc28f2842810d1a013ad51de174d02eaba192dc7/orchestrating)
- [titan-node](https://explorer.livepeer.org/accounts/0xbe8770603daf200b1fa136ad354ba854928e602b/orchestrating)
- [authority-null](https://explorer.livepeer.org/accounts/0x9d61ae5875e89036fbf6059f3116d01a22ace3c8/orchestrating)
- [solarfarm.papa-bear](https://explorer.livepeer.org/accounts/0x10742714f33f3d804e3fa489618b5c3ca12a6df7/orchestrating)
- [lptnode](https://explorer.livepeer.org/accounts/0x11b04d9a305abe978aeaddc67d9d09aaa4996090/orchestrating)
- [ftkuhnsman](https://explorer.livepeer.org/accounts/0x4a43b1d7e6227c8b0512e413f406555647ff7bdb/orchestrating)
- [nightnode](https://explorer.livepeer.org/accounts/0x47a907a0bd1627d71cd14430a721d1550d6d6f58/orchestrating)

## Features

- 🚀 Automated deployment to Kubernetes using Github Actions
- 📦 Easily integrate single-node `k3s` clusters with centralized Kubernetes providers
- 👟 Built on Helm for easy, portable deployment
- 🌀 Configured using a single `.env` file and minimal manual steps
- 🦄 Inspired by best practices from the top Livepeer orchestrators

## Delegators

The `open-orchestrator.eth` is looking to attract delegator stake in order to get more work on the network!

### Performance

There are a few resources for delegators to monitor the current performance for `open-orchestrator.eth`.

- The [`open-orchestrator.eth`](https://explorer.livepeer.org/accounts/0xfc9122f12b23d89a33f7e073072b9bf60aab3fa4/orchestrating) account on Livepeer's Explorer page shows current protocol-level metrics for the orchestrator.

- The [Grafana dashboards](https://grafana.livepeer.0xcadams.xyz/d/overview) are public and show more detailed off-chain metrics related to ongoing transcoding work and compute resources.

### Orchestrator Improvement Proposals

Whenever a protocol-level change is being considered, or significant change to the off-chain orchestrator parameters (e.g. price per pixel, max face value for tickets, etc), an Orchestrator Improvement Proposal (OIP) must be submitted by the maintainer(s) or by a delegator. This will consist of a PR similar to [OIP-1's](https://github.com/0xcadams/livepeer-open-orchestrator/pull/10) which outlines the proposed changes and the reasoning for the change.

**The community will be given seven (7) days to leave comments on the PR before it is merged and executed. If you are a delegator, please turn notifications on for PRs, so you can participate in these discussions.**

## Deploying

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

The `NODE_AWS_ACCESS_KEY_ID` and `NODE_AWS_SECRET_ACCESS_KEY` are generated by creating a new IAM user with programmatic access, with the roles defined in [custom-role.json](custom-role.json). **Be sure to change `livepeer-open-orchestrator` to the name of your project!**

Lastly, you will need to register for [ftkuhnsman's RPC endpoint](https://livepeer.ftkuhnsman.com/accounts/login/?next=/accounts/profile/) and use the API key provided in your `.env`. This will first require you to stake LPT and become an active orchestrator, which is not covered in these docs. Please see the Livepeer Discord for help with this.

The passwords used in the config should be unique, long, and randomly generated.

### Cluster Creation

#### k3s (Self-Hosted Kubernetes)

If you would like to create `k3s` clusters, continue with this section. You'll first need to install [k3s](https://rancher.com/docs/k3s/latest/en/quick-start/) on the node which you would like to use as your main server. You must configure `k3s` to use Docker in order to take advantage of the NVIDIA container runtime by following the [runtime installation guide](https://github.com/NVIDIA/nvidia-container-runtime#installation). You will need to make sure to add the `default-runtime` to `/etc/docker/daemon.json`. Once that is complete, you can use:

```bash
curl -sfL https://get.k3s.io | sh -s - --docker --disable traefik --node-external-ip xxx.xxx.xxx.xxx
# this copies the k3s config to override your global kubectl config!
cat /etc/rancher/k3s/k3s.yaml > ~/.kube/config
# this copies the kube config to the clipboard for use in github actions
cat ~/.kube/config | base64 | pbcopy
```

The node IP should be your external static IP for the node you are running. _Note: this may not be necessary depending on the environment you are running in._ The `--docker` flag ensures that the `k3s` pods run in Docker, which allows for the NVIDIA runtime.

The `/etc/rancher/k3s/k3s.yaml` config can be used to connect remotely (just be sure to open the 6443 port to the node).

You should be able to use this [kubeconfig](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) to connect to the node and deploy the Kubernetes charts!

You will also need to open up the ports for services running in the cluster - for the secondary clusters, you will need to open `8935`, `10901`. For the main cluster, you will also need `80` and `443`.

#### EKS (Managed Kubernetes)

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

After you create each cluster, you will have to handle some manual secret configuration. Run the following command:

```bash
kubectl create secret generic json-private-key --from-file=key.json=orchestrator.json
```

You will also need to create the `rpc-auth` secret in the **main cluster only**, which is used by NGINX to authenticate requests to the Arbitrum node.

```bash
htpasswd -c auth orchestrator
kubectl create secret generic rpc-auth --from-file=auth
```

These are the only secrets you need in manual configuration!

## Deployment

To deploy to a cluster, run the following command depending on your desired environment (more environments can be added easily, if you would like to customize the regions to deploy to):

```bash
yarn deploy:{{geolocation}}
```

The [CI configuration](.github/workflows/deploy.yml) provides a good example of how deployment works and the dependencies required (Skaffold, Helm, etc).

## Forking

If you're interested in forking this project, please consider submitting useful PRs back to this repo for improvements for the community!

## License

Licensed under the [Apache License](/LICENSE) - free to copy/modify/fork as desired.
