import Papa from 'papaparse';

import { AppDispatch } from "../store";

export const loadCsvData = <T extends (payload: any) => any>(
  csvFile: string,
  dispatch: AppDispatch,
  setData: T,
) => {
  fetch(csvFile)
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          dispatch(setData(result.data));
        }
      })
    });
};
