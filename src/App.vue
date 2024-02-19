<template>
  <nav class="navbar" style="background-color: #791515">
    <div class="container">
      <a class="navbar-brand fw-bold text-white" href="#">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/KPU_Logo.svg/1849px-KPU_Logo.svg.png" alt="Logo" width="28" class="d-inline-block align-text-top" />
        Komisi Pemilihan Umum
      </a>
    </div>
  </nav>
  <div class="container">
    <div class="card my-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <select class="form-select" v-model="store.params.prov" @change="loadDataChart()">
              <option value="" selected>-- Pilih Provinsi --</option>
              <option value="35">XXX</option>
              <option value="36">XXX</option>
              <option value="37">XXX</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="store.params.kab" @change="loadDataChart()">
              <option value="" selected>-- Pilih Kabupaten/Kota --</option>
              <option value="3501">XXX</option>
              <option value="3601">XXX</option>
              <option value="3701">XXX</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="store.params.kec" @change="loadDataChart()">
              <option value="" selected>-- Pilih Kecamatan --</option>
              <option value="35">XXX</option>
              <option value="36">XXX</option>
              <option value="37">XXX</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="store.params.desa" @change="loadDataChart()">
              <option value="" selected>-- Pilih Desa/Kelurahan --</option>
              <option value="35">XXX</option>
              <option value="36">XXX</option>
              <option value="37">XXX</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-dark text-white text-center">Hasil Rekapitulasi Suara Pemilu 2024</div>
    </div>
    <canvas id="myChart"></canvas>
    <div class="text-center my-3">
      <p class="badge bg-success">Versi : {{ `${store?.response?.ts} (${store?.response?.progres?.progres}/${store?.response?.progres?.total}) (${store?.response?.chart?.persen}%)` }}</p>
    </div>
    <table class="table">
      <thead>
        <tr class="table-dark">
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
        <tr v-for="(item, title) in store.tabel">
          <th scope="row">{{ title }}</th>
          <td>{{ item["100025"] ?? "-" }}</td>
          <td>{{ item["100026"] ?? "-" }}</td>
          <td>{{ item["100027"] ?? "-" }}</td>
          <td>{{ item["psu"] }}</td>
          <td>{{ item["persen"] + "%" }}</td>
          <td>
            <small class="badge bg-success" :class="item['status_progress'] ? 'bg-success' : 'bg-danger'">{{ item["status_progress"] }}</small>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "./store";
import Chart from "chart.js/auto";

const store = useDataStore();

const loadDataChart = () => {
  store.getData().then(() => {
    const data = {
      labels: ["100025", "100026", "100027"],
      datasets: [
        {
          label: "Total Suara   ",
          data: store.chartData,
          backgroundColor: ["#357353", "#3AC4F1", "#E9443E"],
          hoverOffset: 4,
        },
      ],
    };
    const config = {
      type: "pie",
      data: data,
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  });
};

onMounted(() => {
  loadDataChart();
});
</script>
