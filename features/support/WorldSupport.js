const {setWorldConstructor} = require("@cucumber/cucumber");

//指定测试环境test或者uat
const env = 'test'

function CustomWorld({attach}) {
    this.env = env
    this.attach = attach;
    this.mysqlpool = {

    }
    this.swaggerPerStoreUrl = 'https://petstore.swagger.io'
}

setWorldConstructor(CustomWorld);