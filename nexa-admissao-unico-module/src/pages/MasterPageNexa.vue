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
        <v-container class="mt-12">
        <v-data-table :headers="headers" :items="items" :loading="loading" />
        </v-container>      
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
import { getTableDataEmpresas } from "../api";
import EmpresasListView from "../pages/EmpresasListView.vue";
import CandidatosListView from "../pages/CandidatosListView.vue";

export default {
  name: "MasterPage",
  components: {
    EmpresasListView
  },
  created() {
    this.loadItems();
  },
  data() {
    return {
      loading: false,
      items: [],
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
      ]
    };
  },    
  methods: {
    async loadItems() {
      try {
          this.loading = true;
          this.items = await getTableData();
          console.log("async loadItems...");
      } finally {
          this.loading = false;
      }
      
    }
  }
}

</script>
