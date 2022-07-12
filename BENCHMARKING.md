# Benchmarks for GPUs

## Guide

In order to benchmark a new GPU type, it is recommended to run `livepeer_bench` first to understand the performance of the node. You can either start a new node which is not being used by an active orchestrator, or stop an existing orchestrator to run the benchmarking on it.

You'll first need to [enable GPU support](https://github.com/NVIDIA/k8s-device-plugin#enabling-gpu-support-in-kubernetes) in Kubernetes with a similar command to (see the link for an updated command):

```bash
kubectl create -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.12.2/nvidia-device-plugin.yml
```

Then, you can run the following command to start a pod with Livepeer on it:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: gpu-pod
spec:
  restartPolicy: Never
  containers:
    - name: lp
      image: livepeer/go-livepeer:0.5.32
      command:
        - "sleep"
        - "604800"
      resources:
        limits:
          nvidia.com/gpu: 1 # requesting 1 GPU
  tolerations:
  - key: nvidia.com/gpu
    operator: Exists
    effect: NoSchedule
EOF
```

This pod will hang for about a day, which should give enough time to run benchmarking tests on it. Exec onto the pod by running:

```bash
kubectl exec -it gpu-pod -- bash
```

Then, follow the steps to download the artifacts needed for [Livepeer benchmarking](https://docs.livepeer.org/video-miners/guides/benchmarking). Create a script with the following contents:

```bash
#!/bin/bash
for i in {5..30}
do
  echo "#$i"
  livepeer_bench \
      -in bbb/source.m3u8 \
      -transcodingOptions transcodingOptions.json \
      -nvidia all \
      -concurrentSessions $i |& grep "Duration Ratio" >> bench.log
done
```

Then, run this script - it will run for a while and test 1 to 20 concurrent sessions, to see how the GPU performs with each. This should give you enough information to [choose a session limit](https://docs.livepeer.org/video-miners/guides/session-limits) for that GPU type.

## Results

### NVIDIA Tesla T4

Output from benchmarking:

| Concurrent Sessions | Real-Time Duration Ratio |
| ------------------- | ------------------------ |
| 10                  | 0.1066                   |
| 11                  | 0.1159                   |
| 12                  | 0.1287                   |
| 13                  | 0.2422                   |
| **14**              | **0.8229**               |
| 15                  | 0.9847                   |
| 16                  | 1.102                    |
| 17                  | 1.191                    |
| 18                  | 1.27                     |
| 19                  | 1.345                    |
| 20                  | 1.417                    |

The ideal session limit is around 14.

### NVIDIA GeForce GTX 1070

Output from benchmarking:

| Concurrent Sessions | Real-Time Duration Ratio |
| ------------------- | ------------------------ |
| 15                  | 0.04647                  |
| 16                  | 0.04742                  |
| 17                  | 0.04848                  |
| 18                  | 0.04982                  |
| 19                  | 0.05117                  |
| 20                  | 0.05285                  |
| 21                  | 0.1219                   |
| 22                  | 0.5394                   |
| **23**              | **0.7764**               |
| 24                  | 0.867                    |
| 25                  | 0.9471                   |
| 26                  | 1.016                    |
| 27                  | 1.074                    |
| 28                  | 1.127                    |
| 29                  | 1.176                    |
| 30                  | 1.223                    |

The ideal session limit is around 23.
