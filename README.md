# Cloud189Checkin

天翼网盘自动签到，通过 GitHub Actions 每日自动执行，无需服务器。

## 重要说明

- **请勿**将账号密码直接写入 `.env` 并提交到仓库，源码仓库是公开的，他人可以看到你的账号密码
- 所有敏感信息必须通过 GitHub Secrets 或 Environment Variables 配置
- 因错误使用本仓库导致账号密码泄漏，本人概不负责
- 如果遇到设备 ID 不存在，需要二次设备校验，请先参考 [#165](https://github.com/wes-lin/Cloud189Checkin/issues/165) 关闭设备锁

## 目录

- [部署教程](#部署教程)
  - [第一步：Fork 仓库](#第一步fork-仓库)
  - [第二步：设置工作流权限](#第二步设置工作流权限)
  - [第三步：创建环境](#第三步创建环境)
  - [第四步：配置账号](#第四步配置账号)
  - [第五步：启用 Actions](#第五步启用-actions)
  - [第六步：手动运行测试](#第六步手动运行测试)
  - [查看运行结果](#查看运行结果)
- [设置推送通知](#设置推送通知)
- [常见问题](#常见问题)
- [本地运行](#本地运行)

---

## 部署教程

### 第一步：Fork 仓库

1. 点击页面右上角的 **Fork** 按钮
2. 选择你的 GitHub 账户，点击 **Create fork**
3. 等待 Fork 完成，你将获得一个属于自己的仓库副本

### 第二步：设置工作流权限

1. 进入你 Fork 后的仓库
2. 点击 **Settings** → **Actions** → **General**
3. 找到 **Workflow permissions**，选择 **Read and write permissions**
4. 点击 **Save** 保存

> 这一步是必需的，因为 workflow 中的 "Keep Running" 步骤需要向仓库推送空提交来保持 Actions 活跃。

### 第三步：创建环境

1. 进入仓库 **Settings** → **Environments**
2. 点击 **New environment**
3. 名称输入 `user`，点击 **Configure environment**
4. 环境创建完成，后续在此环境中添加变量

### 第四步：配置账号

进入刚创建的 `user` 环境，点击 **Add variable** 添加账号信息。

**方式一：JSON 格式（推荐单账号或少量账号）**

| 变量名 | 值 |
|---|---|
| `TY_ACCOUNTS` | `[{"userName":"你的手机号","password":"你的密码"}]` |

多个账号示例：
```json
[{"userName":"13800000001","password":"密码1"},{"userName":"13800000002","password":"密码2"}]
```

> 如果密码中包含 `#`、`$` 等特殊字符导致 [SyntaxError](https://github.com/wes-lin/Cloud189Checkin/issues/76)，请将整个 JSON 用单引号包裹：
> `[{"userName":"1234567890","password":"pass#$word"}]`

**方式二：逐个配置（推荐多账号且变动频繁）**

在 `user` 环境中逐个添加变量：

| 变量名 | 值 |
|---|---|
| `TY_USERNAME_1` | 第一个账号的手机号 |
| `TY_PASSWORD_1` | 第一个账号的密码 |
| `TY_USERNAME_2` | 第二个账号的手机号 |
| `TY_PASSWORD_2` | 第二个账号的密码 |
| ... | 以此类推 |

### 第五步：启用 Actions

1. 进入仓库的 **Actions** 页面
2. 如果提示 **I understand my workflows, go ahead and enable them**，点击启用
3. workflow 已配置为每天 UTC 02:35（北京时间 10:35）自动执行

### 第六步：手动运行测试

1. 进入 **Actions** 页面
2. 点击左侧 **Cloud check in action**
3. 点击右侧 **Run workflow** → **Run workflow**
4. 等待运行完成，查看日志确认签到成功

### 查看运行结果

1. 进入 **Actions** 页面
2. 点击最近的一次 workflow 运行记录
3. 展开 **Run** 步骤查看签到日志

---

## 设置推送通知

在 `user` 环境中添加对应的变量即可启用推送，不配置则不推送。

### Server 酱

| 变量名 | 说明 |
|---|---|
| `SENDKEY` | Server 酱 SendKey，获取地址：[sct.ftqq.com](https://sct.ftqq.com/) |

### Telegram Bot

| 变量名 | 说明 |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot Token，通过 [@BotFather](https://t.me/BotFather) 创建 |
| `TELEGRAM_CHAT_ID` | 接收消息的会话 ID，可通过 [@userinfobot](https://t.me/userinfobot) 获取 |

### 企业微信群机器人

| 变量名 | 说明 |
|---|---|
| `WECOM_BOT_KEY` | 群机器人 Webhook Key，[配置说明](https://developer.work.weixin.qq.com/document/path/91770) |
| `WECOM_BOT_TELPHONE` | 接收推送的手机号 |

### WxPusher

| 变量名 | 说明 |
|---|---|
| `WX_PUSHER_APP_TOKEN` | WxPusher App Token，默认使用公共 Token |
| `WX_PUSHER_UID` | 接收推送的 UID，获取地址：[wxpusher.zjiecode.com](https://wxpusher.zjiecode.com/) |

### PushPlus

| 变量名 | 说明 |
|---|---|
| `PUSH_PLUS_TOKEN` | PushPlus Token，获取地址：[pushplus.plus](https://www.pushplus.plus/uc.html)，免费用户每天 200 条 |

### Bark（仅 iOS / macOS Apple Silicon）

| 变量名 | 说明 |
|---|---|
| `BARK_KEY` | Bark Key，安装 [Bark App](https://bark.day.app/) 后获取 |
| `BARK_SERVER` | （可选）自定义服务器地址，默认 `https://api.day.app` |

### ShowDoc

| 变量名 | 说明 |
|---|---|
| `SHOWDOC_KEY` | ShowDoc 推送 Key，获取地址：[push.showdoc.com.cn](https://push.showdoc.com.cn) |

---

## 常见问题

### Q: Actions 没有自动运行？

- 确认已在 Actions 页面启用 workflow
- 新 Fork 的仓库默认关闭 Actions，需要手动启用
- 公共仓库的定时任务（schedule）在 60 天无提交后会自动禁用，workflow 中的 "Keep Running" 步骤会自动提交以保持活跃

### Q: 报错 `SyntaxError: Unexpected token` ？

- `TY_ACCOUNTS` 的值必须是合法的 JSON 格式
- 检查是否有遗漏的引号、逗号或多余的空格
- 可以在 [jsonlint.com](https://jsonlint.com) 验证你的 JSON

### Q: 报错 `设备ID不存在` 或需要二次验证？

- 参考 [#165](https://github.com/wes-lin/Cloud189Checkin/issues/165) 关闭设备锁

### Q: 如何修改执行时间？

- 编辑 `.github/workflows/run.yml` 中的 `cron` 表达式
- 当前：`35 2 * * *`（UTC 02:35，北京时间 10:35）
- cron 使用 UTC 时间，北京时间需要减 8 小时

### Q: 如何查看历史运行记录？

- 进入 **Actions** 页面，点击左侧的 workflow 名称即可查看所有历史运行

---

## 本地运行

### 环境要求

- Node.js 18+

### 步骤

```bash
# 克隆项目
git clone https://github.com/wes-lin/Cloud189Checkin.git
cd Cloud189Checkin

# 安装依赖
npm install

# 创建 .env 文件，填入账号信息
# 方式一：
echo 'TY_ACCOUNTS=[{"userName":"手机号","password":"密码"}]' > .env

# 方式二（可选，配置推送）：
# echo 'TELEGRAM_BOT_TOKEN=xxx' >> .env
# echo 'TELEGRAM_CHAT_ID=xxx' >> .env

# 运行
npm start
```

---

## 其他

- 天翼网盘 API 已集成到 [cloud189-sdk](https://github.com/wes-lin/cloud189-sdk)，可自行集成到其他环境
- [更新日志](https://github.com/wes-lin/Cloud189Checkin/wiki/更新内容)
