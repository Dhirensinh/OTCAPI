import { environment } from './environment';
export const API = {
    GET_ALL_API_CONFIG: `${environment.API_SERVER}/api_config/getAllApiKeys`,
    SAVE_API_CONFIG: `${environment.API_SERVER}/api_config/saveApiConfig`,
    GET_API_CONFIG_BY_ID: `${environment.API_SERVER}/api_config/getApiConfigById`,
    DELETE_API_CONFIG_BY_ID: `${environment.API_SERVER}/api_config/deleteApiConfigById`,

    GET_ALL_CURRENCY: `${environment.API_SERVER}/currency_config/getAllCurrency`,
    SAVE_CURRENCY_CONFIG: `${environment.API_SERVER}/currency_config/saveCurrencyConfig`,
    GET_CURRENCY_CONFIG_BY_ID: `${environment.API_SERVER}/currency_config/getCurrencyConfigById`,
    GET_CURRENCY_FOR_DROPDOWN: `${environment.API_SERVER}/currency_config/getCurrencyForDropdown`,
    DELETE_CURRENCY_CONFIG_BY_ID: `${environment.API_SERVER}/currency_config/deleteCurrencyConfigById`,

    GET_ALL_EXCHANGE: `${environment.API_SERVER}/exchange_config/getAllExchangeConfig`,
    SAVE_EXCHANGE_CONFIG: `${environment.API_SERVER}/exchange_config/saveExchangeConfig`,
    GET_EXCHANGE_CONFIG_BY_ID: `${environment.API_SERVER}/exchange_config/getExchangeConfigById`,
    GET_EXCHANGE_FOR_DROPDOWN: `${environment.API_SERVER}/exchange_config/getExchangeForDropdown`,
    DELETE_EXCHANGE_CONFIG_BY_ID: `${environment.API_SERVER}/exchange_config/deleteExchangeConfigById`,

    GET_ALL_INTERNAL_PAIR: `${environment.API_SERVER}/internal_pair_config/getAllInternalPair`,
    SAVE_INTERNAL_PAIR_CONFIG: `${environment.API_SERVER}/internal_pair_config/saveInternalPairConfig`,
    GET_INTERNAL_PAIR_CONFIG_BY_ID: `${environment.API_SERVER}/internal_pair_config/getInternalPairConfigById`,
    GET_INTERNAL_PAIR_FOR_DROPDOWN: `${environment.API_SERVER}/internal_pair_config/getInternalPairForDropdown`,
    DELETE_INTERNAL_PAIR_CONFIG_BY_ID: `${environment.API_SERVER}/internal_pair_config/deleteInternalPairConfigById`,

    GET_ALL_EXCHANGE_PAIR: `${environment.API_SERVER}/exchange_pair_config/getAllExchangePair`,
    SAVE_EXCHANGE_PAIR_CONFIG: `${environment.API_SERVER}/exchange_pair_config/saveExchangePairConfig`,
    GET_EXCHANGE_PAIR_CONFIG_BY_ID: `${environment.API_SERVER}/exchange_pair_config/getExchangePairConfigById`,
    GET_EXCHANGE_PAIR_FOR_DROPDOWN: `${environment.API_SERVER}/exchange_pair_config/getExchangePairForDropdown`,
    DELETE_EXCHANGE_PAIR_CONFIG_BY_ID: `${environment.API_SERVER}/exchange_pair_config/deleteExchangePairConfigById`,

    GET_ALL_INBOUND_CHANNEL: `${environment.API_SERVER}/channel_config/getAllInboundChannel`,
    SAVE_INBOUND_CHANNEL_CONFIG: `${environment.API_SERVER}/channel_config/saveInboundChannelConfig`,
    GET_INBOUND_CHANNEL_CONFIG_BY_ID: `${environment.API_SERVER}/channel_config/getInboundChannelConfigById`,
    GET_INBOUND_CHANNEL_FOR_DROPDOWN: `${environment.API_SERVER}/channel_config/getInboundChannelForDropdown`,
    DELETE_INBOUND_CHANNEL_CONFIG_BY_ID: `${environment.API_SERVER}/channel_config/deleteInboundChannelConfigById`,
    GET_ALL_OUTBOUND_CHANNEL: `${environment.API_SERVER}/channel_config/getAllOutboundChannel`,
    SAVE_OUTBOUND_CHANNEL_CONFIG: `${environment.API_SERVER}/channel_config/saveOutboundChannelConfig`,
    GET_OUTBOUND_CHANNEL_CONFIG_BY_ID: `${environment.API_SERVER}/channel_config/getOutboundChannelConfigById`,
    GET_OUTBOUND_CHANNEL_FOR_DROPDOWN: `${environment.API_SERVER}/channel_config/getOutboundChannelForDropdown`,
    DELETE_OUTBOUND_CHANNEL_CONFIG_BY_ID: `${environment.API_SERVER}/channel_config/deleteOutboundChannelConfigById`,

    GET_ALL_ALGO_MASTER: `${environment.API_SERVER}/algo_master/getAllAlgoMaster`,
    SAVE_ALGO_MASTER: `${environment.API_SERVER}/algo_master/saveAlgoMaster`,
    GET_ALGO_MASTER_BY_ID: `${environment.API_SERVER}/algo_master/getAlgoMasterById`,
    GET_ALGO_MASTER_FOR_DROPDOWN: `${environment.API_SERVER}/algo_master/getAlgoMasterForDropdown`,
    DELETE_ALGO_MASTER_BY_ID: `${environment.API_SERVER}/algo_master/deleteAlgoMasterById`,

    GET_ALL_CLIENT_MASTER: `${environment.API_SERVER}/client_master/getAllClientMaster`,
    SAVE_CLIENT_MASTER: `${environment.API_SERVER}/client_master/saveClientMaster`,
    GET_CLIENT_MASTER_BY_ID: `${environment.API_SERVER}/client_master/getClientMasterById`,
    GET_CLIENT_MASTER_FOR_DROPDOWN: `${environment.API_SERVER}/client_master/getClientMasterForDropdown`,
    DELETE_CLIENT_MASTER_BY_ID: `${environment.API_SERVER}/client_master/deleteClientMasterById`,


    GET_EXCHANGE_TRADES: `${environment.API_SERVER}/getExchangeTrades`,
    GET_ALL_PAIR_CONFIG: `${environment.API_SERVER}/getPairConfig`,
    SAVE_PAIR_CONFIG: `${environment.API_SERVER}/savePairConfig`,
    GET_POSITION_BOOKS: `${environment.API_SERVER}/getPositionBooks`,
    GET_TRADE_REPORTS: `${environment.API_SERVER}/getTradeReports`,
};
