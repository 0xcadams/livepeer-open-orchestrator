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

```bash
> docker run -d --name "geth" ethereum/client-go
> docker exec -it geth geth account new

...
Path of the secret key file: /root/.ethereum/keystore/...
...

> docker exec -it geth cat /root/.ethereum/keystore/... > key.json
> kubectl create secret generic json-private-key --from-file=key.json=key.json
```




helm repo add nvdp https://nvidia.github.io/k8s-device-plugin
helm repo add jetstack https://charts.jetstack.io
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx 

https://docs.aws.amazon.com/eks/latest/userguide/security_iam_id-based-policy-examples.html
AmazonEKSAdminPolicy

GH:
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY

https://aws.amazon.com/premiumsupport/knowledge-center/eks-api-server-unauthorized-error/


kubectl create secret generic json-private-key --from-file=key.json=UTC--2022-04-07T22-09-32.184230565Z--6ea5f8a6cb44dab35ab2c89cb52e5c1bc8b83e09

https://forum.livepeer.org/t/guide-the-most-secure-way-to-run-an-orchestrator-as-of-june-2022/1840
https://livepeer.ftkuhnsman.com/accounts/login/?next=/accounts/profile/


https://gist.github.com/papabear99/712754617d6a7fdb5438a5b621e1be89
https://www.google.com/maps/d/u/0/viewer?mid=1XzxUxgd59Dr3RSzPewGKBD8mt3M77s9C&ll=33.20949996250803%2C-93.65468425600724&z=5
https://aws.amazon.com/about-aws/global-infrastructure/localzones/locations/

https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html



https://dashboard.nightnode.net/d/Quad/multi-node-dash?orgId=1&refresh=30s
https://monitor.anlivepeer.com/ 
http://titan-node-orch.com:3000/d/Titan-World-Total/titan-node-all-orchs-total?orgId=1&refresh=1h
https://grafana.stronk.tech/d/71b6OZ0Gz/orchestrator-overview?orgId=1&refresh=5s&theme=dark


https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/TutorialTransitionToLBR.html



aws s3api create-bucket --bucket $PROJECT_NAME --region us-east-1 --acl private


kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml


basic auth:
htpasswd -c auth orchestrator
kubectl create secret generic rpc-auth --from-file=auth


