import { renderDataTable3, createDataTable3 } from './DataTable3Provider';
export { renderDataTable3, createDataTable3 };
export type { DataTable3Options, TableColumn3, TableRow3 } from './types/DataTable3Options';

// Para builds UMD
if (typeof window !== 'undefined') {
  (window as any).UBITSDataTable3 = {
    renderDataTable3,
    createDataTable3
  };
  (window as any).renderDataTable3 = renderDataTable3;
  (window as any).createDataTable3 = createDataTable3;
}

