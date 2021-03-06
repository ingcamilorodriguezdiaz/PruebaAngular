
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Util } from '../utils/util';

export class OperacionService {
  leido$ = new BehaviorSubject<number>(0);
  list$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(public http: HttpClient) {
  }

  getList$() {
    return this.list$.asObservable();
  }
  addAll$(datas: any){
    this.list$.next(datas);
  }

  getPage(
    url: string,
    page: number,
    buscar: any,
    data: any,
  ): Observable<any> {
    const params = new HttpParams({
      fromString:
        page > -1
          ? 'page=' + page + '&buscar=' + buscar + '&data=' + data
          : 'buscar=' + buscar + '&data=' + data,
    });
    return this.http
      .get<any[]>(Util.apiUrl + url, {
        params,
        responseType: 'json',
      });
  }


  delete(
    url: string,
  ): Observable<any> {
    return this.http
      .delete<any[]>(Util.apiUrl + url, {
        responseType: 'json',
      });
  }

  addLeido$(cantidad: number) {
    this.leido$.next(cantidad);
  }
  getLeido$(): Observable<number> {

    return this.leido$.asObservable();
  }

  registrarMultimedia(data: any, url: string): Observable<any> {
    const req = new HttpRequest('POST',Util.apiUrl + url, data, {
      reportProgress: true,
      headers: new HttpHeaders({
        Accept: 'application/json',
      })
    });
    return this.http.request(req);
  }



  post(url: string,data: any): Observable<any> {
    const httpOptionsPost:any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',             
      }),     
      responseType: 'xml' as 'json',
    };   
    return  this.http
    .post<any>(url,Util.tranformar(data),httpOptionsPost);
   
  }

  request(url: string,data: any): Observable<any> {
    const req = new HttpRequest('POST', url, Util.tranformar(data), {
      reportProgress: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Response-Type': 'xml',
      })
    });


    return this.http.request(req);
  }

  put(url: string,data: any): Observable<any> {
    return this.http
    .put<any>(Util.apiUrl + url,  data,Util.getHttpOptionsSinToken()
    );
  }

  get(
    url: string
  ): Observable<any> {
    const params = new HttpParams({
      fromString:''
    });
    return this.http
      .get<any[]>(url, {
        params,
        responseType: 'json',
      });
  }
}
