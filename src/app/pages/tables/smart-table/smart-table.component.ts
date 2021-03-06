import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../@core/data/smart-table";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
})
export class SmartTableComponent {
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
        title: "ID",
        type: "number",
        filter: true,
      },
      firstName: {
        title: "First Name",
        type: "string",
        filter: false,
      },
      lastName: {
        title: "Last Name",
        type: "string",
        filter: false,
      },
      username: {
        title: "Username",
        type: "string",
        filter: false,

      },
      email: {
        title: "E-mail",
        type: "string",
        filter: false,
      },
      age: {
        title: "Age",
        type: "number",
        filter: true,
      },

      //or something
      Actions: {
        title: "Detail",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return `<a title="詳細" href="Your api key or something/${row.Id}"> <i class="fa fa-eye"></i></a>`;
        },
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
  //  const data = this.service.getData();
  //   this.source.load(data);

    this.queryData();
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // query data
   queryData(): void{
  fetch(
      "https://my.api.mockaroo.com/smarttable.json?key=416e4a40"
    )
      .then((res) => {
        res.json().then((jsondata) => {
         // foo =  jsondata;
          console.log('jsondata=',jsondata)
         this.source.load(jsondata);
        //  return jsondata;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
