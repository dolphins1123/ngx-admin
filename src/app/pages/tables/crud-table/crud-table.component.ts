import { Component , ngOnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { CrudService } from './crud.service';
@Component({
  selector: 'ngx-crud-table',
  // providers: [BasicExampleLoadService],
  templateUrl: './crud-table.component.html',
  //   template: `
  //   <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  // `,
  styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponent implements OnInit  {

   baseTableitems = [];
  pageSize: number = 10;
  pageNum: number = 1;
  searchModel: any = {'pageSize': 10 , 'pageNum': 1,'filters':''};

   source: LocalDataSource;
 // source: ServerDataSource;



ngOnInit() {
  this.source.onChanged().subscribe((change) => {
    if (change.action === 'page') {
      this.pageChange(change.paging.page);
    }
  });


}


  pageChange(pageIndex) {
  const loadedRecordCount = this.source.count();
  const lastRequestedRecordIndex = pageIndex * this.pageSize;

  if (loadedRecordCount <= lastRequestedRecordIndex) {
    let myFilter; // This is your filter.
    myFilter.startIndex = loadedRecordCount + 1;
    myFilter.recordCount = this.pageSize + 100; // extra 100 records improves UX.

    this.callList();
  }
  }

  selectedRows: any;

settings = {
  pager:
  {
    display: true,
    perPage: 100,
  },
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
      CustomerID: {
        title: 'ID',
         filter: false,
      },
      CompanyName: {
        title: 'CompanyName',
         filter: false,
      },
      ContactTitle: {
        title: 'ContactTitle',
         filter: false,
      },
      Address: {
        title: 'Address',
         filter: false,
      },
       City: {
        title: 'City',
         filter: false,
      },
        Phone: {
        title: 'Phone',
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

constructor(private crudService: CrudService , private dialogService: NbDialogService , http: HttpClient) {
 // this.source = new ServerDataSource(http, { endPoint: 'https://my.api.mockaroo.com/smarttable.json?key=416e4a40' });
  // this.source = new ServerDataSource(http, { endPoint: 'http://127.0.0.1/crud/api/Customer/GetList' });
  //this.source = new ServerDataSource(http, { endPoint: 'http://127.0.0.1/crud/GetJsonData' });
  this.source = new LocalDataSource();


  // this.callList();
  //  this.source.onChanged().subscribe((change) => {
  //   if (change.action === 'page') {
  //     this.pageChange(change.paging.page);
  //   }
  // });



   }


  pageChange(pageIndex) {
  const loadedRecordCount = this.source.count();
  const lastRequestedRecordIndex = pageIndex * this.pageSize;

  if (loadedRecordCount <= lastRequestedRecordIndex) {
    let myFilter; // This is your filter.
    myFilter.startIndex = loadedRecordCount + 1;
    myFilter.recordCount = this.pageSize + 100; // extra 100 records improves UX.


  }
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
    console.log('Delete Event In Console');
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log('Create Event In Console');
    console.log(event);

  }

  onSaveConfirm(event) {
    console.log('Edit Event In Console');
    console.log(event);
  }

  onEdit(event) {
    console.log('Edit Event In Console');
    console.log(event);
  }

  queryData() {
    console.log('queryData');
  }

  doEdit(editrow) {

    console.log('doedit=', editrow);

  }

  callList() {

  this.source.load(this.crudService.GetList(this.searchModel));
    console.log('this.source  data======');
    console.log(this.source);

  }

  callCreate() {
    this.crudService.CreateItem(this.searchModel);
}


}
