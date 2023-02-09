import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class AlgoMasterService {
    
    constructor(private http: HttpClient) {

    }

    public async getAllAlgoMaster() {
        return await this.http.get<any>(`${API.GET_ALL_ALGO_MASTER}`).toPromise();
    }
    
    public async getAlgoMasterForDropdown() {
        return await this.http.get<any>(`${API.GET_ALGO_MASTER_FOR_DROPDOWN}`).toPromise();
    }

    public async saveAlgoMaster(keyObj:any) {
        return await this.http.post<any>(`${API.SAVE_ALGO_MASTER}`, keyObj).toPromise();
    }

    public async getAlgoMasterById(id:any) {
        return await this.http.get<any>(`${API.GET_ALGO_MASTER_BY_ID}/${id}`).toPromise();
    }
    public async deleteAlgoMasterById(id:any) {
        return await this.http.delete<any>(`${API.DELETE_ALGO_MASTER_BY_ID}/${id}`).toPromise();
    }
}