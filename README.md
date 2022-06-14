# Cucumber-js-sample
A sample for cucumber-js

## 目录结构 ##
features （主要代码）
- features （场景文件，包含主要的测试场景）
- conf （测试使用的配置文件）
- step_definitions （步骤定义文件）
- support （支持的工具类）

## 安装依赖 ##
```
npm i
```

## 测试执行 ##
```
./node_modules/.bin/cucumber-js --tags "@test_all" -f json:report.json --require ./features
```

## 测试报告生成 ##
```
node index.js
```