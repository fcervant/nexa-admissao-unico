import axios from "axios";

const instance = axios.create({
  baseURL: "https://services.odata.org/V2/Northwind/Northwind.svc",
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'
  }  
});

export const getTableData2 = async (params = { $top: 20, $skip: 0 }) => {
  const { data } = await instance.get("/Customers", {
    params,
  });

  console.log("index2.js...");
  console.log(data);
  return data.d?.results || data.d || data.value;
};
