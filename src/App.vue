<template>
  <div class="container">
    <h1 class="mb-5">Data KPU 2024</h1>
    <h3 class="mb-3">Chart</h3>
    <hr />
    <canvas ref="myChart"></canvas>
    <p><b>Suara Masuk : </b>{{ suara }} %</p>
    <h3 class="mb-3">Status</h3>
    <hr />
    <div class="progress mb-3" role="progressbar" aria-label="Example with label" aria-valuenow="50000" aria-valuemin="0" aria-valuemax="80000">
      <div class="progress-bar" :style="'width: ' + persen + '%;'">{{ persen.toFixed(2) + "% - " + "( " + respon?.progres?.progres + "/" + respon?.progres?.total + " )" }}</div>
    </div>
    <h3 class="mb-3">Tabel Data</h3>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">100025</th>
          <th scope="col">100026</th>
          <th scope="col">100027</th>
          <th scope="col">PSU</th>
          <th scope="col">Persen</th>
          <th scope="col">Progress</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, title) in data">
          <th scope="row">{{ title }}</th>
          <td>{{ item["100025"] ?? "-" }}</td>
          <td>{{ item["100026"] ?? "-" }}</td>
          <td>{{ item["100027"] ?? "-" }}</td>
          <td>{{ item["psu"] }}</td>
          <td>{{ item["persen"] + "%" }}</td>
          <td>{{ item["status_progress"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

const myChart = ref(null);
const data = ref([]);
const persen = ref(0);
const respon = ref({});
const suara = ref(0);
onMounted(() => {
  axios
    .get("https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json")
    .then((resp) => {
      // data.value = Object.keys(resp.data?.table);
      data.value = resp.data?.table;
      persen.value = (resp.data?.progres?.progres / resp.data?.progres?.total) * 100;
      respon.value = resp.data;
      suara.value = resp.data?.chart?.persen;
      // Create chart
      const ctx = myChart.value.getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["100025", "100026", "100027"],
          datasets: [
            {
              label: "Statistik Data",
              data: [resp.data?.chart["100025"], resp.data?.chart["100026"], resp.data?.chart["100027"]],
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>
