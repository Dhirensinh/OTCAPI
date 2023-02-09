import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class ClientMasterService {
    
    constructor(private http: HttpClient) {

    }

    public async getAllClientMaster() {
        return await this.http.get<any>(`${API.GET_ALL_CLIENT_MASTER}`).toPromise();
    }
    
    public async getClientMasterForDropdown() {
        return await this.http.get<any>(`${API.GET_CLIENT_MASTER_FOR_DROPDOWN}`).toPromise();
    }

    public async saveClientMaster(keyObj:any) {
        return await this.http.post<any>(`${API.SAVE_CLIENT_MASTER}`, keyObj).toPromise();
    }

    public async getClientMasterById(id:any) {
        return await this.http.get<any>(`${API.GET_CLIENT_MASTER_BY_ID}/${id}`).toPromise();
    }
    public async deleteClientMasterById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_CLIENT_MASTER_BY_ID}/${id}`).toPromise();
    }
}