/**
 * Created by hekk on 2017/5/28.
 */
import 'babel-polyfill';
import axios from 'axios';
import * as config from './config';
let serverUrl = config.devUrl;
let nodeUrl = config.nodeTestApi;
let sysUrl = config.sysDev;
if (process.env.kingold == 'test') {
    serverUrl = config.testUrl;
    sysUrl = config.sysTest;
}
if (process.env.kingold == 'production') {
    serverUrl = config.productionUrl;
    nodeUrl = config.nodeProductionApi;
    sysUrl = config.sysProduction;
}
let $query = (data) => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(data[key])));
            }
        }
    }
    return str.join('&');
};
let get = (path, data = {}) => {
    data.callSystemID = '1004';
    data.t = new Date().getTime();
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;

    } else {
        url = `${serverUrl + path}`
    }
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data,
        withCredentials: true
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
    }).catch(err => {
        console.log('err--->')
    })

};
let getNode = (path, data = {}) => {
    let url = `${nodeUrl + path}`
    return get(url, data);
};
let getSys = (path, data = {}) => {
    let url = `${sysUrl + path}`
    return get(url, data);
};
import  {logout} from './operation';
let post = (path, data = {}) => {
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;
    } else {
        url = `${serverUrl + path}`;
    }

    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime(),
            callSystemID:'1004'

        },
        withCredentials: true,
        dataType:'json',
        data: $query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        } else {
            return {};
        }
    }).then(data => {
        if (data.code == 401) {
            logout();
        }
        return data;
    }).catch(err => {
        console.log('err--->')
    })

};
let postNode = (path, data = {}) => {
    let url = `${nodeUrl + path}`;
    return post(url, data);
};
let postSys = (path, data = {}) => {
    let url = `${sysUrl + path}`;
    return post(url, data);
};
const $api = {
    get,
    post,
    getNode,
    postNode,
    getSys,
    postSys,
    serverUrl
};
export default $api;
