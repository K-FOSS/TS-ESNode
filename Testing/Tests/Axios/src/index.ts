// Axios/src/index.ts
import axios, { AxiosStatic } from 'axios';

export async function getAxios(): Promise<AxiosStatic> {
  return axios;
}

export async function getAxiosDynamic(): Promise<AxiosStatic> {
  const { default: axiosDynamic } = await import('axios');

  return axiosDynamic;
}
