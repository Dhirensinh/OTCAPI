import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class ApiKeyConfigService {
    
    constructor(private http: HttpClient) {

    }

    public async getAllKeys() {
        return await this.http.get<any>(`${API.GET_ALL_API_CONFIG}`).toPromise();
    }
    public async generateKey(keyObj:any) {
        return await this.http.post<any>(`${API.SAVE_API_CONFIG}`, keyObj).toPromise();
    }

    public async getApiConfigById(id:any) {
        return await this.http.get<any>(`${API.GET_API_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async deleteApiConfigById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_API_CONFIG_BY_ID}/${id}`).toPromise();
    }
}