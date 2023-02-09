import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../environments/apis';

@Injectable()
export class ChannelConfigService {

    constructor(private http: HttpClient) {

    }

    public async getAllInboundChannel() {
        return await this.http.get<any>(`${API.GET_ALL_INBOUND_CHANNEL}`).toPromise();
    }
    public async getAllOutboundChannel() {
        return await this.http.get<any>(`${API.GET_ALL_OUTBOUND_CHANNEL}`).toPromise();
    }


    public async getInboundChannelForDropdown() {
        return await this.http.get<any>(`${API.GET_INBOUND_CHANNEL_FOR_DROPDOWN}`).toPromise();
    }
    
    public async getOutboundChannelForDropdown() {
        return await this.http.get<any>(`${API.GET_OUTBOUND_CHANNEL_FOR_DROPDOWN}`).toPromise();
    }


    public async saveInboundChannel(keyObj: any) {
        return await this.http.post<any>(`${API.SAVE_INBOUND_CHANNEL_CONFIG}`, keyObj).toPromise();
    }

    public async saveOutboundChannel(keyObj: any) {
        return await this.http.post<any>(`${API.SAVE_OUTBOUND_CHANNEL_CONFIG}`, keyObj).toPromise();
    }

    public async getInboundChannelById(id: any) {
        return await this.http.get<any>(`${API.GET_INBOUND_CHANNEL_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async getOutboundChannelById(id: any) {
        return await this.http.get<any>(`${API.GET_OUTBOUND_CHANNEL_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async deleteInboundChannelById(id: any) {
        return await this.http.delete<any>(`${API.DELETE_INBOUND_CHANNEL_CONFIG_BY_ID}/${id}`).toPromise();
    }

    public async deleteOutboundChannelById(id: any) {
        return await this.http.delete<any>(`${API.DELETE_OUTBOUND_CHANNEL_CONFIG_BY_ID}/${id}`).toPromise();
    }
}