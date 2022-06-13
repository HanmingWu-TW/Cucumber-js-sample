pipeline {
    agent any
    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    parameters {
        choice(name: 'env', choices: ['dev', 'test', 'uat'], description: '测试环境')
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/HanmingWu-TW/Cucumber-js-sample.git']]])
            }
        }

        stage("Make Config") {
            steps {
                nodejs(nodeJSInstallationName: 'node') {
                    sh 'npm i'
                }
            }
        }

        stage("User Testing") {
            steps {
                catchError (buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    nodejs(nodeJSInstallationName: 'node') {
                        sh './node_modules/.bin/cucumber-js --tags "@test_all" -f json:report.json --require ./features'
                    }
                }
            }
        }

        stage("Publish Report") {
            steps {
                nodejs(nodeJSInstallationName: 'node') {
                    sh 'node index.js'
                }
                publishHTML (
                    target : [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '.',
                        reportFiles: 'report.html',
                        reportName: '测试报告',
                        reportTitles: '测试报告'
                    ]
                )
                cucumber buildStatus: 'UNSTABLE',
                         fileIncludePattern: 'report.json'
            }
        }
    }
}