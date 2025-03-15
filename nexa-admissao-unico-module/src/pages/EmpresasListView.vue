<template>
  <div class="about">
    <!-- <h1>This is the EmpresasList page</h1> -->
    <EmpresasList />
    <!-- <HelloWorld /> -->
    <!-- <Footer /> -->
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

import EmpresasList from '../components/EmpresasList.vue';
import DataTable from '../components/DataTable.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "EmpresasListVue",
  props: ['artists'],
  components: {
    EmpresasList,
    DataTable,
    HelloWorld,
    Footer
  },
  data() {
    return {
    }
  },
    created() {
    console.log("? - EmpresasListVue.vue - created...");
  },
  mounted() {
    console.log("? - EmpresasListView.vue mounted...");
  }
}
</script>