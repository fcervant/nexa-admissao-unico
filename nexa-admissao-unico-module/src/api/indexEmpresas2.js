import axios from "axios";

//const baseURL = "Northwind_full_url/";
const apiEmpresas = "https://api-dev.apimanagement.br10.hana.ondemand.com:443/cpi-I40087/http/vsa/getEmpresasVSA";

const instance = axios.create({
  // baseURL,
  apiEmpresas,
});

export const getTableDataEmpresas = async (params = { }) => {
  const { data } = await instance.get("", {
    params,
  });
  console.log("indexEmpresas.js...");
  console.log(data);
  return data.d?.results || data.d || data.value;
};