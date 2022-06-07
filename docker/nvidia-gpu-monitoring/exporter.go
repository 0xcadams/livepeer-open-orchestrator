package main

import (
	"bytes"
	"encoding/csv"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
)

// name, index, temperature.gpu, utilization.gpu,
// utilization.memory, memory.total, memory.free, memory.used

func metrics(response http.ResponseWriter, request *http.Request) {
	out, err := exec.Command(
		"nvidia-smi",
		"--query-gpu=name,index,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.free,memory.used,encoder.stats.sessionCount,encoder.stats.averageFps,encoder.stats.averageLatency",
		"--format=csv,noheader,nounits").Output()

	if err != nil {
		fmt.Printf("%s\n", err)
		return
	}

	csvReader := csv.NewReader(bytes.NewReader(out))
	csvReader.TrimLeadingSpace = true
	records, err := csvReader.ReadAll()

	if err != nil {
		fmt.Printf("%s\n", err)
		return
	}

	metricList := []string{
		"temperature.gpu", "utilization.gpu",
		"utilization.memory", "memory.total", "memory.free", "memory.used",
		"encoder.stats.sessionCount", "encoder.stats.averageFps", "encoder.stats.averageLatency"}

	result := ""
	for _, row := range records {
		name := fmt.Sprintf("%s[%s]", row[0], row[1])
		for idx, value := range row[2:] {
			result = fmt.Sprintf(
				"%s%s{gpu=\"%s\"} %s\n", result,
				metricList[idx], name, value)
		}
	}

	fmt.Fprintf(response, strings.Replace(result, ".", "_", -1))
}

func main() {
	addr := ":9102"
	if len(os.Args) > 1 {
		addr = ":" + os.Args[1]
	}

	http.HandleFunc("/metrics", metrics)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
