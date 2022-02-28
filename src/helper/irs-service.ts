import * as axios from 'axios';

export const createTransaction = async (kode, tujuan) => {
  const codeTransaksi = generateRequestId();

  return axios.default
    .get(
      `http://h2h.elangpangarep.com/api/h2h?id=PT0005&pin=04JFGC&user=D10BD0&pass=6251F3&kodeproduk=${kode}&tujuan=${tujuan}&counter=1&idtrx=${codeTransaksi}`,
    )
    .then((response) => {
      return response.data;
    });
};

export const generateRequestId = () => {
  return `${new Date()
    .toLocaleString('en-us', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3$1$2')}${Math.random()
    .toPrecision(3)
    .replace('0.', '')}`;
};
