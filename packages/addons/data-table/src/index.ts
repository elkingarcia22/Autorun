import { renderDataTable, createDataTable } from './DataTableProvider';
export { renderDataTable, createDataTable };
export type { DataTableOptions, TableColumn, TableRow } from './types/DataTableOptions';

// Para builds UMD
if (typeof window !== 'undefined') {
  (window as any).UBITSDataTable = {
    renderDataTable,
    createDataTable
  };
  (window as any).renderDataTable = renderDataTable;
  (window as any).createDataTable = createDataTable;
}

