# livepeer-open-orchestrator

Open infra-as-code for a Livepeer orchestrator, using Terraform/Kubernetes



https://eksctl.io/

Copy `.env.example` to `.env` and update the values according to your 


```
brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
brew install fluxcd/tap/flux
```

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

```

```

https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md

https://fluxcd.io/docs/installation/



```
aws configure
eksctl create cluster --config-file=eksctl.yaml
```

https://eu-west-2.console.aws.amazon.com/eks/home?region=eu-west-2#/clusters


https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md
https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html

```
aws route53 create-hosted-zone --name "domain.xyz." --caller-reference "external-dns-$(date +%s)"
```


eksctl utils associate-iam-oidc-provider --region=ap-southeast-1 --cluster=livepeer-open-orchestrator --approve


helm repo add nvdp https://nvidia.github.io/k8s-device-plugin
helm repo add jetstack https://charts.jetstack.io
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx 

GH:
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY

Only EksAllAccess policy

kubectl create secret generic json-private-key --from-file=key.json

