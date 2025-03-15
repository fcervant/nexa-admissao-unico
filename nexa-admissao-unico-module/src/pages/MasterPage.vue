<template>
  <div class="overflow-hidden d-flex justify-center">
    <div style="width: 100%">
      <!-- <v-app-bar color="#6FA1D6" dense dark scroll-target="#zcontent"> -->
      <!-- <v-app-bar color="light-blue" dense dark > -->
      <v-app-bar color="light-blue">
        <div style="width: 100%" class="d-flex justify-center">
          <div style="max-width: 1280px; width: 100%" class="d-flex">
            <img alt = "Nexa logo" class="acesso_logo" src="../assets/nexa.svg"/>
            <v-spacer></v-spacer>            
            <v-toolbar-title :elevation="8">Contratações pendentes</v-toolbar-title>
          </div>
          <v-spacer></v-spacer>
          <img alt="X" height="42px" src="../assets/unico-color.svg"/>
        </div>
      </v-app-bar>
      <div>
        <EmpresasListView />
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>

import { getTableData } from "../api";
import { getTableDataEmpresas } from "../api/indexEmpresas.js";
import EmpresasListView from "../pages/EmpresasListView.vue";
import CandidatosListView from "../pages/CandidatosListView.vue";

export default {
  name: "MasterPage",
  components: {
    EmpresasListView
  },
  created() {
    console.log("1 - MasterPage.vue - created...");
    this.loadItems();
    this.loadItemsEmpresas();
  },
  mounted() {
    console.log("? - MasterPage.vue - mounted...");
    console.log("? - MasterPage.vue - mounted..." + this.itemsEmpresa);
  },
  data() {
    return {
      loading: false,
      items: [],
      itemsEmpresa:[],
      headers: [
        {
          text: "CompanyName",
          value: "CompanyName",
          sortable: false
        },
        {
          text: "ContactName",
          value: "ContactName",
          sortable: false
        },
        {
          text: "City",
          value: "City",
          sortable: false
        }
      ],
      artists: [
        { name: "Davido", genre: "afrobeats", country: "Nigeria" },
        { name: "Burna Boy", genre: "afrobeats", country: "Nigeria" },
        { name: "AKA", genre: "hiphop", country: "South-Africa" },
        { name: "Sarkodie", genre: "hiphop", country: "Ghana" },
        { name: "Stormzy", genre: "hiphop", country: "United Kingdom" },
        { name: "Lil Nas", genre: "Country", country: "United States" },
        { name: "Nasty C", genre: "hiphop", country: "South-Africa" },
        { name: "Shatta-walle", genre: "Reagae", country: "Ghana" },
        { name: "Khalid", genre: "pop", country: "United States" },
        { name: "Ed Sheeran", genre: "pop", country: "United Kingdom" },
      ],
    };
  },
  methods: {    
    async loadItems() {
      try {
          this.loading = true;
          this.items = await getTableData();
          console.log("MasterPage.vue async loadItems...");
          console.log(this.items);
          console.log("---------------------------------");
          console.log(JSON.parse(this.items));
      } finally {
          this.loading = false;
      }
      
    },
    async loadItemsEmpresas() {
      try {
          this.loading = true;
          this.itemsEmpresa = await getTableDataEmpresas();
          console.log("MasterPage.vue async loadItemsEmpresas...");
          console.log("MasterPage.vue" + this.itemsEmpresa);
      } finally {
          this.loading = false;
      }
      
    }
  }
}

</script>
