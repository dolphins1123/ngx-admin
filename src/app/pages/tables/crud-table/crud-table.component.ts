import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { EditModalComponent } from './edit-modal/edit-modal.component'

@Component({
  selector: 'ngx-crud-table',
  // providers: [BasicExampleLoadService],
  templateUrl: './crud-table.component.html',
  //   template: `
  //   <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  // `,
  styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponent  {

  // source: LocalDataSource;
 source: ServerDataSource;


  selectedRows: any;

  settings = {
     selectMode: 'multi', // 多選
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
      },
      url: {
        title: 'Url',
      },
    },
  };

   constructor(private dialogService: NbDialogService , http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
   }


  openDialog() {
    this.dialogService.open(EditModalComponent, {
      context: {
        title: '新增資料', // 傳TITLE參數
      },
    });
  }

  // UserRowSelected Event handler
  onRowSelect(event) {
    this.selectedRows = event.selected;
  }
onClick() {
    // It will console all the selected rows
    console.log(this.selectedRows);
  }

  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    console.log(event);

  }

  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    console.log(event);
  }

onEdit(event) {
    console.log("Edit Event In Console")
    console.log(event);
  }




}
