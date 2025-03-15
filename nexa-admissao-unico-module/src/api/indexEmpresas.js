import axios from "axios";

const baseURL = "https://api-dev.apimanagement.br10.hana.ondemand.com:443/cpi-I40087/http/vsa/getEmpresasVSA";

const instance = axios.create({
  baseURL,
});

export const getTableDataEmpresas = async (params = { }) => {
  const { data } = await instance.get("", {
    params,
  });
  const jsonPayload = JSON.stringify(data);
  console.log("indexEmpresas.js...");
  console.log(data);
  //console.log(data.d?.results);
  //console.log(data.d);
  //console.log(data.value);
  console.log(jsonPayload);

  // return data.d[0];
  // return data.d?.results || data.d || data.value;
  // return jsonPayload;
  return data;
}