# WSD机器人基本框架

## 1. 基本数据结构

### 1.1 listenStatus
```
{
    msgid:消息号
    status: 0:说话开始 1：倾听中 2:识别中 3:识别成功 4:识别失败
    sayMessage: 检测到说的文字
    errorMsg: 错误信息
    startTime: new Date()
    endTime:new Date()
    resultID: 结果ID
}
```

### 1.2 aiResult
```
{
    listenID:音源ID
    status:状态码
    talkMessage:将要说的话
    appendData:附加数据结构
    errorMsg:错误信息
}
```

## 有用的命令

### 执行测试
```
meteor test --driver-package practicalmeteor:mocha
```