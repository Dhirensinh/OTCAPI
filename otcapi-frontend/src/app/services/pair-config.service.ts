import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class PairConfigService {

    constructor(private http: HttpClient) {

    }

    public async getAllInternalPair() {
        return await this.http.get<any>(`${API.GET_ALL_INTERNAL_PAIR}`).toPromise();
    }

    public async getInternalPairForDropdown() {
        return await this.http.get<any>(`${API.GET_INTERNAL_PAIR_FOR_DROPDOWN}`).toPromise();
    }

    public async saveInternalPair(keyObj: any) {
        return await this.http.post<any>(`${API.SAVE_INTERNAL_PAIR_CONFIG}`, keyObj).toPromise();
    }

    public async getInternalPairById(id: any) {
        return await this.http.get<any>(`${API.GET_INTERNAL_PAIR_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async getAllExchangePair() {
        return await this.http.get<any>(`${API.GET_ALL_EXCHANGE_PAIR}`).toPromise();
    }

    public async getExchangePairForDropdown() {
        return await this.http.get<any>(`${API.GET_EXCHANGE_PAIR_FOR_DROPDOWN}`).toPromise();
    }

    public async saveExchangePair(keyObj: any) {
        return await this.http.post<any>(`${API.SAVE_EXCHANGE_PAIR_CONFIG}`, keyObj).toPromise();
    }

    public async getExchangePairById(id: any) {
        return await this.http.get<any>(`${API.GET_EXCHANGE_PAIR_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async deleteInternalPairById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_INTERNAL_PAIR_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async deleteExchangePairById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_EXCHANGE_PAIR_CONFIG_BY_ID}/${id}`).toPromise();
    }

}