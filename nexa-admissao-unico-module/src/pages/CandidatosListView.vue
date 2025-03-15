<template>
  <div>
    <h1>Empresas List component</h1>
    <h4>This is the CandidatosListView page</h4>
    <p>CompanyCode = {{ companyCode }}</p>
    <v-select v-model="selectedEmpresa" @change="buscaDadosCandidatos($event)" label="Filtro de Empresa" :items="chaves" outlined item-title="Descricao" item-value="Company" single-line>
    </v-select>
    <pre>{{ selectedEmpresa }}</pre>  
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

// import CandidatosList from '@/components/CandidatosList.vue';
import axios from 'axios';
// import VueAxios from 'vue-axios';

const apiEmpresas = "https://api-dev.apimanagement.br10.hana.ondemand.com:443/cpi-I40087/http/vsa/getEmpresasVSA";
const apiHeaders = {'Accept': '*/*', 'Connection':'keep-alive', 'Accept-Encoding':'gzip, deflate, br', 'Apikey':''}

export default {
  name: "CandidatosListView",
  props: ['companyCode'],  
  components: {
    // CandidatosList
  },
  data: () => ({
    listCandidatos:undefined,
    listEmpresas:undefined,      
    search: "",
    chaves: [],
    company: "1001",
    selectedEmpresa: "8001",
    }),
    methods: {
      //filter() {
      //  this.$store.dispatch("filterCandidatos", this.search);
      //},
      buscadadosEmpresa() {
        axios.get(apiEmpresas, { 'headers': { apiHeaders } })  
        .then((response) => {
            this.listEmpresas = response.data;
            console.log(response);
            console.log(response.data);
            // this.responseData = response.data
            let array = response.data;
            if (array.length > 0) {
              array.forEach((empresa) => {
                let values = [];
                values.Company = empresa.Company;
                values.Descricao = empresa.Company + " - " + empresa.Description;
                //values = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'];
                this.chaves.push(values);
                console.log(values);
              });
            console.log("chaves>");
          }
          // console.log(response.data)
      })
        .catch((error)=>{
            console.log(error)
        })        
      },
      buscaDadosCandidatos(companyCode)     {
        let apiCandidatos = hostApiDev + "cpi-I40087//http/vsa/buscaCandidatosConcluidos" + "?" + "companyCode=" + companyCode;
        axios.get(apiCandidatos, { 'headers': { apiHeaders } })  
        // axios.get(apiSample, { 'headers': { apiHeaders } })  
        .then((response) => {
            this.listCandidatos = response.data;
            //console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        console.log("CandidatosListView.vue buscaDadosCandidatos...");
        console.log("buscaDadosCandadatos " + companyCode);
      },
    },

    mounted() {
      this.buscadadosEmpresa(),
      this.buscaDadosCandidatos("8001"),
      console.log("CandidatosListView.vue mounted...")
    }
}
</script>