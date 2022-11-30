import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginator extends MatPaginatorIntl {
  public override itemsPerPageLabel = 'Ítems por página: ';
  public override nextPageLabel = 'Siguiente página';
  public override previousPageLabel = 'Página anterior';
  public override lastPageLabel = 'Página final';
  public override firstPageLabel = 'Página inicial';

  public override getRangeLabel = function (
    page: number,
    pageSize: number,
    length: number
  ) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return 'Ítems [' + (startIndex + 1) + ' - ' + endIndex + '] de ' + length;
  };
}
