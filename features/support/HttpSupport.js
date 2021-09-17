const request = require("requestretry");
const {expect} = require("chai");

let Authorization = '';

module.exports = {
    set_auth: function set_auth(auth) {
        Authorization = auth;
    },
    get_auth: function get_auth() {
        return Authorization
    },
    get_request: function httpGet(url, rescode, world) {
        return new Promise((resolve, reject) => {
            let headers = {
                "Authorization": Authorization
            }
            console.log('请求方法：' + 'GET')
            console.log('请求Url：' + url)
            world.attach('请求方法：GET\r\n' + '请求Url：' + url)
            console.log('请求header：')
            world.attach('请求header：')
            console.log(headers)
            world.attach(JSON.stringify(headers).toString())
            request({
                url: url,
                method: "get",//如果是post就涉及到跨域的问题了
                json: true,
                headers: headers
            }, function (error, response, body) {
                console.log('``````````````````````' + error)
                try {
                    if (response.statusCode !== rescode) {
                        console.log(url)
                    }
                } catch (e) {
                    console.log(url)
                }
                console.log('请求返回码：' + response.statusCode)
                console.log('返回值：')
                console.log(body)
                world.attach('请求返回码：' + response.statusCode + '\r\n请求返回值：')
                if(typeof body !== 'undefined'){
                    world.attach(JSON.stringify(body).toString())
                }
                if (!error) {
                    resolve(body)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
                if (error) {
                    reject(error)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
            });
        });
    },
    post_request: function httpPost(url, body, rescode, world) {
        return new Promise((resolve, reject) => {
            let headers = {
                "Authorization": Authorization
            }
            console.log('请求方法：' + 'POST')
            console.log('请求Url：' + url)
            console.log('请求body：')
            world.attach('请求方法：POST\r\n' + '请求Url：' + url + '\r\n请求body：')
            console.log(body)
            // console.log(JSON.stringify(body))
            world.attach(JSON.stringify(body).toString())
            console.log('请求header：')
            world.attach('请求header：')
            console.log(headers)
            world.attach(JSON.stringify(headers).toString())
            request({
                url: url,
                method: "post",//如果是post就涉及到跨域的问题了
                json: true,
                headers: headers,
                body: body,
                maxAttempts: 3,
                // agentOptions: {
                //     secureProtocol: 'TLSv2_method'
                // },
                retryDelay: 1000
            }, function (error, response, body) {
                console.log('``````````````````````' + error)
                if (response.statusCode !== rescode) {
                    console.log(url)
                }
                console.log('请求返回码：' + response.statusCode)
                console.log('请求返回值：')
                console.log(body)
                world.attach('请求返回码：' + response.statusCode + '\r\n请求返回值：')
                if(typeof body !== 'undefined'){
                    world.attach(JSON.stringify(body).toString())
                }
                if (!error) {
                    resolve(body)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
                if (error) {
                    reject(error)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
            });
        });
    },
    delete_request: function httpDelete(url, body, rescode, world) {
        return new Promise((resolve, reject) => {
            let headers = {
                "Authorization": Authorization
            }
            console.log('请求方法：' + 'DELETE')
            console.log('请求Url：' + url)
            console.log('请求body：')
            world.attach('请求方法：DELETE\r\n' + '请求Url：' + url + '\r\n请求body：')
            console.log(body)
            world.attach(JSON.stringify(body).toString())
            console.log('请求header：')
            world.attach('请求header：')
            console.log(headers)
            world.attach(JSON.stringify(headers).toString())
            request({
                url: url,
                method: "delete",//如果是post就涉及到跨域的问题了
                json: true,
                headers: headers,
                body: body
            }, function (error, response, body) {
                if (response.statusCode !== rescode) {
                    console.log(url)
                }
                console.log('请求返回码：' + response.statusCode)
                console.log('请求返回值：')
                console.log(body)
                world.attach('请求返回码：' + response.statusCode + '\r\n请求返回值：')
                if(typeof body !== 'undefined'){
                    world.attach(JSON.stringify(body).toString())
                }

                if (!error && response.statusCode === rescode) {
                    resolve(body)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
                if (error) {
                    reject(error)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
            });
        });
    },
    put_request: function httpPut(url, body, rescode, world) {
        return new Promise((resolve, reject) => {
            let headers = {
                "Authorization": Authorization
            }
            console.log('请求方法：' + 'PUT')
            console.log('请求Url：' + url)
            console.log('请求body：')
            world.attach('请求方法：PUT\r\n' + '请求Url：' + url + '\r\n请求body：')
            console.log(body)
            world.attach(JSON.stringify(body).toString())
            console.log('请求header：')
            world.attach('请求header：')
            console.log(headers)
            world.attach(JSON.stringify(headers).toString())
            request({
                url: url,
                method: "put",//如果是post就涉及到跨域的问题了
                json: true,
                headers: headers,
                body: body
            }, function (error, response, body) {
                console.log('请求返回码：' + response.statusCode)
                console.log('请求返回值：')
                console.log(body)
                world.attach('请求返回码：' + response.statusCode + '\r\n请求返回值：')
                if(typeof body !== 'undefined'){
                    world.attach(JSON.stringify(body).toString())
                }

                if (!error) {
                    resolve(body)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
                if (error) {
                    reject(error)
                    if(rescode !== 1000){
                        expect(response.statusCode).to.equal(rescode);
                    }
                }
            });
        });
    }
};