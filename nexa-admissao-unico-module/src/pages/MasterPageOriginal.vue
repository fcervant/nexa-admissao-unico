<template>
  <v-container class="mt-12">
    <v-data-table :headers="headers" :items="items" :loading="loading" />
  </v-container>
</template>

<script>

import { getTableData } from "../api";

export default {
  name: "MasterPage",
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
      } finally {
          this.loading = false;
      }
      
    }
  }
};
</script>
