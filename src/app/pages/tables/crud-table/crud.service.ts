import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }




  Items: any[];

  constructor() { }



  GetList(searchModel: any): any[] {
    let items: any[];
    console.log('searchModel=', searchModel);

    let offset = searchModel.pageNum * searchModel.pageSize - searchModel.pageSize

    let _url = `http://127.0.0.1/crud/api/Customer/GetList?offset=${offset}&limit=${searchModel.pageSize
      }`;
      //&filters=${JSON.stringify(searchModel.filters)}



    this.http.get<any>(_url).subscribe(data => {
      items = data.result;
     return items;
    });



  }

  CreateItem(item: any):boolean {
     alert('CreateItem');
    console.log('call api to create' ,item);
     return true;
  }

  DeleteItem(id: string): boolean {
    console.log('call api to delete');
    return true;
  }

  UpdateItem(item: any): boolean {
  console.log('call api to update');
    return true;
}

}
