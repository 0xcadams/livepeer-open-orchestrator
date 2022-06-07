FROM nvidia/cuda:10.1-base-ubuntu16.04

COPY exporter.go /exporter.go
RUN apt-get update && apt-get install -y golang-go && go build /exporter.go && apt-get remove -y golang-go

EXPOSE 9102:9102

ENTRYPOINT ["/exporter"]
