const reporter = require('cucumber-html-reporter');
const fs = require('fs')
const json2xls = require('json2xls')
require('date-utils');

const options_test = {
    theme: 'bootstrap',
    jsonFile: 'report.json',
    output: 'report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true
};

reporter.generate(options_test);

toXlsx('report')

function toXlsx (report_json) {
    let report_list = []
    let report = require(`./${report_json}.json`)
    for (let i in report) {
        for (let j in report[i].elements) {
            for (let k in report[i].elements[j].steps) {
                let report_dict = {}
                if (+j === 0 && +k === 0) {
                    report_dict.模块 = report[i].name
                }
                if (+k === 0) {
                    report_dict.场景 = report[i].elements[j].name
                }
                report_dict.序号 = `${+i+1}-${+j+1}-${+k+1}`
                report_dict.测试步骤 = report[i].elements[j].steps[k].name
                report_dict.测试结果 = report[i].elements[j].steps[k].result.status === 'passed' ? '测试通过' : '测试失败'
                report_dict.执行日期 = new Date().toFormat('YYYY/MM/DD')
                report_dict.测试请求 = ''
                if (typeof report[i].elements[j].steps[k].embeddings !== 'undefined') {
                    for (let m in report[i].elements[j].steps[k].embeddings) {
                        report_dict.测试请求 = report_dict.测试请求 + report[i].elements[j].steps[k].embeddings[m].data + '\r\n'
                    }
                }
                report_list.push(report_dict)
            }
        }
    }
    let xls = json2xls(report_list)
    fs.writeFileSync(`${report_json}.xlsx`, xls, 'binary')
}