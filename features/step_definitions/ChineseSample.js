const { Given, When } = require('@cucumber/cucumber');
const httpSupport = require('../support/HttpSupport');

When(/^测试开始$/, async function () {
    console.log('测试开始！')
});
Given(/^查询处于"([^"]*)"状态的宠物$/, async function (status) {
    await httpSupport.get_request(this.swaggerPerStoreUrl + `/v2/pet/findByStatus?status=${status}`, 200, this)
});