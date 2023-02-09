import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class ExchangeConfigService {
    
    constructor(private http: HttpClient) {

    }

    public async getAllExchangeConfigs() {
        return await this.http.get<any>(`${API.GET_ALL_EXCHANGE}`).toPromise();
    }

    public async getExchangeForDropdown() {
        return await this.http.get<any>(`${API.GET_EXCHANGE_FOR_DROPDOWN}`).toPromise();
    }

    public async saveExchangeConfig(keyObj:any) {
        return await this.http.post<any>(`${API.SAVE_EXCHANGE_CONFIG}`, keyObj).toPromise();
    }

    public async getExchangeConfigById(id:any) {
        return await this.http.get<any>(`${API.GET_EXCHANGE_CONFIG_BY_ID}/${id}`).toPromise();
    }
    public async deleteExchangeConfigById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_EXCHANGE_CONFIG_BY_ID}/${id}`).toPromise();
    }
}