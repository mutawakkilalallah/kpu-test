import axios from "axios";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data_store", {
  state: () => ({
    tabel: [],
    chartData: [],
    response: {},
    params: {
      prov: "",
      kab: "",
      kec: "",
      desa: "",
    },
  }),
  actions: {
    async getData() {
      try {
        var url = `https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp${this.params.prov ? "/" + this.params.prov : ""}${this.params.kab ? "/" + this.params.kab : ""}${this.params.kec ? "/" + this.params.kec : ""}${
          this.params.desa ? "/" + this.params.desa : ""
        }.json`;
        const resp = await axios.get(url);
        this.response = resp.data;
        this.tabel = resp.data.table;
        this.chartData = [resp.data.chart["100025"], resp.data.chart["100026"], resp.data.chart["100027"]];
      } catch (error) {
        console.log(error);
      }
    },
  },
});
