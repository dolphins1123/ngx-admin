import { Component , OnInit } from '@angular/core';
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
export class CrudTableComponent  implements OnInit {

ngOnInit()
{

}


  // source: LocalDataSource;
 source: ServerDataSource;


  selectedRows: any;

  settings = {
     selectMode: 'multi', // 多選
    // add: {
    //   confirmCreate: true,
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    actions: {

      add: false,
      edit: false,
      delete: true,
      // custom: [
      //   { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
      //   { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-edit"></i>' },
      // ],
      position: 'right',
      valuePrepareFunction: (cell, row) => {
          return `
          <a href="javascript:void(0);"  onclick="dotest()" >test</a>
          <a title="詳細" href="Your api key or something/${row.Id}"> <i class="fa fa-eye"></i></a>`;
        },



    },
    // edit: {
    //   confirmSave: true,
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'No data found',
    columns: {
      id: {
        title: 'ID',
         filter: false,
      },
      firstName: {
        title: 'firstName',
         filter: false,
      },
      lastName: {
        title: 'lastName',
         filter: false,
      },
      username: {
        title: 'username',
         filter: false,
      },
       email: {
        title: 'email',
         filter: false,
      },
        age: {
        title: 'age',
         filter: false,
      },
      // Actions: {
      //   title: "",
      //   type: "html",
      //   valuePrepareFunction: (cell, row) => {
      //     return `
      //     <a href="javascript:void(0);"  onclick="dotest()" >test</a>
      //     <a title="詳細" href="Your api key or something/${row.Id}"> <i class="fa fa-eye"></i></a>`;
      //   },
      //   filter: false,
      // },

    },
  };

   constructor(private dialogService: NbDialogService , http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://my.api.mockaroo.com/smarttable.json?key=416e4a40' });
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
    // 多選
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

  queryData()
  {
    console.log('queryData')
  }

  doEdit(editrow) {

    console.log('doedit=',editrow)

  }

  dotest() {
    alert('test');
  }




}
