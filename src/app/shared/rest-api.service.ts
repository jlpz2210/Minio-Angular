import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bucket } from '../shared/bucket';
import { Detail } from '../shared/detail';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
    ) {}

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'multipart/form-data'
  //   })
  // }

  

  getBuckets(): Observable<Bucket> {
    return this.http.get<Bucket>(this.apiURL + '/listBuckets')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getBucketDetail(name: string): Observable<Detail>{
    return this.http.get<Detail>(this.apiURL + '/bucketDetail/'+name)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  downloadFile(name:string,file:string): Observable<Blob>{
    return this.http.get(this.apiURL+"/bucketDetail/"+name+"/getFile/"+file,{responseType:'blob'})
  }

  deleteFile(name:string,file:string){
    return this.http.delete(this.apiURL+"/bucketDetail/"+name+"/deleteFile/"+file)
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
