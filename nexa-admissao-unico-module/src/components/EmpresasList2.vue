<template>
    <div>
        <h4>Filtro Empresa 2</h4>
        <v-select v-model="selectedEmpresa" @update:modelValue="onValueChange" label="Filtro de Empresa" :items="chaves" outlined item-title="Descricao" item-value="Company" single-line>
        </v-select>
        <v-card width="100%" max-width="800px" :loading="loading">        
          <div> 
            <p>..</p>
            <h3>Candidatos Vuetify v-data-table</h3>
            <p>..</p>
            <p>Empresa: {{ company }}</p>
            <hr>
          </div>  
        </v-card>     
    </div>
</template>

<script>

import axios from 'axios';
import { getTableDataEmpresas } from "../api/indexEmpresas.js";

// odata de empresas...
const apiEmpresas = "https://api-dev.apimanagement.br10.hana.ondemand.com:443/cpi-I40087/http/vsa/getEmpresasVSA";

// dados api Unico...
const hostApiDev = "https://api-dev.apimanagement.br10.hana.ondemand.com:443/";

// autorização via apikey...
const apiKeyDev = "GQ3MEWWAIrACQx9V6uouZ4tepph99wqV";

// Atenção: para o endereço da api de employees dava erro CORS...
// foi necessário um ajuste no package.json - proxy, não funcionou...
// Artigo: https://pt.stackoverflow.com/questions/349565/requisi%c3%a7%c3%a3o-com-axios-e-react-bloqueada-por-pol%c3%adtica-cors
// const apiEmployees = "https://cors-anywhere.herokuapp.com/http://dummy.restapiexample.com/api/v1/employees";
// const apiEmployees = "http://dummy.restapiexample.com/api/v1/employees";
// const apiEmployees = "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001";
// esta chamada de exemplo não provoca erro CORS...
// const apiSample = 'https://jsonplaceholder.typicode.com/albums';

/* uma outra abordagem...
let apiSampleConfig = axios.create ({
    headers: {
        get: {

        }
    }
});
*/

const apiParams = {'HTTP_CONTENT_LANGUAGE': self.language}
const apiHeaders = {'Accept': '*/*', 'Connection':'keep-alive', 'Accept-Encoding':'gzip, deflate, br', 'Apikey':''}

export default {
    name:"EmpresasList",
    data: () => ({
      loading: false,
      itemsEmpresa: [],
      optionsData: ['one','two','three'],
      selectedData: '',
      listCandidatos:undefined,
      listEmpresas:undefined,      
      search: "",
      chaves: [],
      company: "1001",
      selectedEmpresa: "1001",
      category: null,
      value: 0,
      loading: true,
      headersCandidatos: [
          { title: 'Foto', align: 'left', value: 'foto' },          
          { title: 'Nome', align: 'left', filterable: true, value: 'nome' },
          { title: 'Cargo', value: 'cargo' },
          { title: 'Data Admissao', value: 'dataadm' },
          { title: 'Posição', value: 'position' },
          { title: 'Position number', value: 'position_number'},
          { title: 'Ação', value: null}
        ],
      uuidCandidato: null,
        headers: [
          {
            title: 'Title',
            value: 'title',
            align: 'left',
            sortable: false
          },
          { title: 'Premiere', value: 'premiere' },
          { title: 'Rating', value: 'rating' }
        ],
        lazy: `https://goo.gl/jbJWmK`,
        imageBytes: 
"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",
    }),

    created () {
      console.log("EmpresasList2.vue created...");
      // const empresas = this.loadItemsEmpresas();
      // const listEmpresas2 = empresas.then(this.itemsEmpresa,"Erro");
      // this.itemsEmpresa = 
      // console.log(empresas);
      // this.ajustaItemsEmpresas();
    },

    computed: {},

    mounted() {
      //this.buscadadosEmpresa(),
      this.buscaDadosCandidatos("1001"),
      console.log("EmpresasList2.vue mounted...");
      console.log(this.itemsEmpresa);      
    },

    methods: {

      async loadItemsEmpresas() {
         try {
            this.loading = true;
            this.itemsEmpresa = await getTableDataEmpresas();
            console.log("EmpresasList2.vue async loadItemsEmpresas...");
            console.log(this.itemsEmpresa);
          } finally {
            this.loading = false;
          }
      },

      ajustaItemsEmpresas() {
        console.log("EmpresasList2.vue ajustaItemsEmpresas...");
        console.log(this.itemsEmpresa);
        let array = this.itemsEmpresa;
        if (array.length > 0) {
          array.forEach((empresa) => {
          let values = [];
            values.Company = empresa.Company;
            values.Descricao = empresa.Company + " - " + empresa.Description;
            this.listEmpresas.push(values);
            this.chaves.push(values);
          });
        }
        console.log(this.chaves);
        console.log(this.listEmpresas);
      },
      
      buscadadosEmpresa() {
        axios.get(apiEmpresas, { 'headers': { apiHeaders } })  
        // axios.get(apiSample, { 'headers': { apiHeaders } })  
        .then((response) => {
            this.listEmpresas = response.data;
            console.log("methods...buscadadosEmpresa...");
            console.log(response.data);
            // this.responseData = response.data
            let array = response.data;
            if (array.length > 0) {
              array.forEach((empresa) => {
                let values = [];
                values.Company = empresa.Company;
                values.Descricao = empresa.Company + " - " + empresa.Description;
                this.chaves.push(values);
              });

          }
      })
        .catch((error)=>{
            console.log(error)
        })   
        console.log("buscadadosEmpresa 1a execucao...");
        console.log(this.chaves);     
      },

      buscaDadosCandidatos(companyCode)     {
        let apiCandidatos = hostApiDev + "cpi-I40087/http/vsa/buscaCandidatosConcluidos" + "?" + "companyCode=" + companyCode;
        axios.get(apiCandidatos, { 'headers': { apiHeaders } })  
        // axios.get(apiSample, { 'headers': { apiHeaders } })  
        .then((response) => {
            this.listCandidatos = response.data;
            //var table = document.getElementById("myTable");
            //var row = table.insertRow(0);
            //var cell1 = row.insertCell(0);
            //cell1.innerHTML = "Teste";
            console.log("Carreguei candidatos..." + this.listCandidatos);
            this.loading = false;
        })
        .catch((error)=>{
            console.log(error)
        })
        console.log("2 - CandidatosList Component mounted...");
        console.log("3 - buscaDadosCandidatos " + companyCode);
        console.log("4 - listaEmpresas " + this.listaEmpresas);
      },

      //async onchange() {
      //  this.info = await axios
      //    .post("http://local/api/sd/model/get", { id: selectedEmpresa })
      //    .then(response => { response.data.data.items });
      //    this.selectedModel = this.info.length ? this.info[0].id : null;
      //    console.log("Change: = " + this.selectedEmpresa);
      //},
      
      onValueChange: function(v) {
            // alert("A new value was selected " + v);
            this.loading = true;
            this.company = v;
            this.buscaDadosCandidatos(this.company);
            console.log("headers: ", this.headers);
      },

      onButtonClick: function(n,u) {
        console.log("n,u: " + n + " " + u);  
        this.nome = n;
        this.uuidCandidato = u;

        // prepara payload para envio para a Unico...
        var payload = {
          position: this.uuidCandidato,
          position_number: '',
          name: this.nome
        };
        // alert("payload: " + payload);
        // chama api para contratação de candidato...
        let apiContrataCandidato = hostApiDev + "cpi-I40087/http/vsa/contrataCandidato";
        axios.post(apiContrataCandidato, payload, { 'headers': { apiHeaders } } )  
          .then((response) => {
            // console.log(response.data.status + " - " + response.data.msg);
            alert(response.data.status + " - " + response.data.msg);
            //var table = document.getElementById("myTable");
            //var row = table.insertRow(0);
            //var cell1 = row.insertCell(0);
            //cell1.innerHTML = "Teste";
        //    console.log( this.listCandidatos);
        })
          .catch((error)=>{
            console.log("Error..." + error)
        })

        // console.log("contrataCandidato: " + data);
        // alert("contrataCandidato: " + response.data);
        //console.log("contrataCandidato: " + response.data);

      },

      format (date) {
        date = new Date(date)
        const day = `${date.getUTCDate()}`.padStart(2, '0')
        const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
      }
    },
    watch: {}
}

/*    
    {
        axios.get(apiEmpresas, { 'headers': { apiHeaders } })  
        // axios.get(apiSample, { 'headers': { apiHeaders } })  
        .then((response) => {
            // this.responseData = response.data
            this.list = response.data;
            // console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
        console.log("EmpresasList Component mounted...")
    }
*/
</script>