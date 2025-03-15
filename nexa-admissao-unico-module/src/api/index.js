import axios from "axios";

const baseURL = "Northwind_full_url/";

const instance = axios.create({
  baseURL,
});

export const getTableData = async (params = { $top: 20, $skip: 0 }) => {
  const { data } = await instance.get("/Customers", {
    params,
  });

  console.log("index.js...");
  console.log(data);
  return data.d?.results || data.d || data.value;
};
