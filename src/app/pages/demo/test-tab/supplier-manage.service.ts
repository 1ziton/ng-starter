import { Injectable } from '@angular/core';
import { RebirthHttp, POST, Body, BaseUrl } from 'rebirth-http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { supplierManageURL } from 'app/config/config';

@Injectable({
    providedIn: 'root'
})
@BaseUrl(supplierManageURL)
export class SupplierManageService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }
    //供应商列表查询
    @POST('/supplier/pageSupplier')
    pageSupplier(@Body params): Observable<any> {
        return null;
    }
    //供应商删除
    @POST('/supplier/deleteSupplier')
    deleteSupplier(@Body params): Observable<any> {
        return null;
    }
    //供应商新增
    @POST('/supplier/addOrUpdateSupplier')
    addOrUpdateSupplier(@Body params): Observable<any> {
        return null;
    }
}
