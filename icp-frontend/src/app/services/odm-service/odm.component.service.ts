
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { error } from 'util';
import { Provider } from '../../provider/provider';
import 'rxjs/Rx';

@Injectable()
export class OdmService {
    public constructor(public http: Http, public provider:Provider) {
    }

    public getODM(srcAirport,dstAirport,date,customerTier,customerName,milesBalance): Observable<any> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const link = this.provider.apiUrl.setODM
        const bodyObject = {
            flightBooking:{
                srcAirport,
                dstAirport,
                date,
                customerTier,
                customerName,
                milesBalance,
                offers:[],
                messages:[]
            }
        }
        const bodyString = JSON.stringify(bodyObject); // Stringify payload
        return this.http.post(link, bodyObject, options) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }
}