import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class CurrencyConfigService {
    
    constructor(private http: HttpClient) {

    }

    public async getAllCurrencyConfig() {
        return await this.http.get<any>(`${API.GET_ALL_CURRENCY}`).toPromise();
    }
    
    public async getCurrencyForDropdown() {
        return await this.http.get<any>(`${API.GET_CURRENCY_FOR_DROPDOWN}`).toPromise();
    }

    public async saveCurrencyConfig(keyObj:any) {
        return await this.http.post<any>(`${API.SAVE_CURRENCY_CONFIG}`, keyObj).toPromise();
    }

    public async getCurrencyConfigById(id:any) {
        return await this.http.get<any>(`${API.GET_CURRENCY_CONFIG_BY_ID}/${id}`).toPromise();
    }
    public async deleteCurrencyConfigById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_CURRENCY_CONFIG_BY_ID}/${id}`).toPromise();
    }
}