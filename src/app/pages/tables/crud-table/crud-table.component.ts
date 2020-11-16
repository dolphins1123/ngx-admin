import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';
import { LocalDataSource } from "ng2-smart-table";

import { BasicExampleLoadService } from './basic-example-load.service';

@Component({
  selector: 'ngx-crud-table',
  // providers: [BasicExampleLoadService],
  templateUrl: './crud-table.component.html',
  //   template: `
  //   <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  // `,
  styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponent implements OnInit {

  //source: LocalDataSource;
 source: ServerDataSource;
// settings = {
//     add: {
//       addButtonContent: '<i class="nb-plus"></i>',
//       createButtonContent: '<i class="nb-checkmark"></i>',
//       cancelButtonContent: '<i class="nb-close"></i>',
//     },
//     edit: {
//       editButtonContent: '<i class="nb-edit"></i>',
//       saveButtonContent: '<i class="nb-checkmark"></i>',
//       cancelButtonContent: '<i class="nb-close"></i>',
//     },
//     delete: {
//       deleteButtonContent: '<i class="nb-trash"></i>',
//       confirmDelete: true,
//     },
//     columns: {
//       id: {
//         title: "ID",
//         type: "number",
//         filter: true,
//       },
//       firstName: {
//         title: "First Name",
//         type: "string",
//         filter: false,
//       },
//       lastName: {
//         title: "Last Name",
//         type: "string",
//         filter: false,
//       },
//       username: {
//         title: "Username",
//         type: "string",
//         filter: false,

//       },
//       email: {
//         title: "E-mail",
//         type: "string",
//         filter: false,
//       },
//       age: {
//         title: "Age",
//         type: "number",
//         filter: true,
//       },

//       //or something
//       Actions: {
//         title: "Detail",
//         type: "html",
//         valuePrepareFunction: (cell, row) => {
//           return `<a title="詳細" href="Your api key or something/${row.Id}"> <i class="fa fa-eye"></i></a>`;
//         },
//         filter: false,
//       },
//     },
//   };

  settings = {
         add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
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

   constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
   }



  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }



}
