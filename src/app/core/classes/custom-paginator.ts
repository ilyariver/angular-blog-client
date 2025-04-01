import {MatPaginatorIntl} from '@angular/material/paginator';

export class CustomPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = 'Следущая страница';
    this.previousPageLabel = 'Предыдущая страница';
    this.itemsPerPageLabel = 'Элементов на странице';
  }
}
