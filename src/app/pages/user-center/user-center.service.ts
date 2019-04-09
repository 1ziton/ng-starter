import { Injectable } from '@angular/core';
import { Body, POST, BaseUrl, RebirthHttp } from 'rebirth-http';
import { userURL } from 'app/config/config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@BaseUrl(userURL)
@Injectable()
export class UserCenterService extends RebirthHttp {

    constructor(http: HttpClient) {
        super(http);
    }

    @POST('/user/pageUser')
    qryOperUserList(@Body body): Observable<any> {
        return null;
    }
    @POST('/user/userEdit')
    userEdit(@Body body): Observable<any> {
        return null;
    }
    @POST('/user/userToDimission')
    userToDimission(@Body body): Observable<any> {
        return null;
    }
    @POST('/user/userResetPassword')
    _userResetPassword(@Body body): Observable<any> {
        return null;
    }
    userResetPassword(params): Observable<any> {
        return this._userResetPassword({
            ...params,
            password: '123456'
        });
    }
    
    //师傅管理
    @POST('/worker/pageWorker')
    pageWorker(@Body body): Observable<any> {
        return null;
    }
}

