---
title: Input 输入框
description: 用于单行文本信息输入。
spline: form
isComponent: true
---

## 引入

全局引入，在 miniprogram 根目录下的`app.json`中配置，局部引入，在需要引入的页面或组件的`index.json`中配置。

```json
"usingComponents": {
  "t-input": "tdesign-miniprogram/input/input"
}
```

## 代码演示

### 基础输入框

<img src="https://tdesign.gtimg.com/miniprogram/readme/input-1.png" width="375px" height="50%">

```html
<t-input name="标签文字" placeholder="请输入文字" />
```

## API

### Input Props

| 名称             | 类型            | 默认值 | 说明                                                                                                                                           | 必传     |
| ---------------- | --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| adjust-position  | Boolean         | true   | 键盘弹起时，是否自动上推页面                                                                                                                   | N        |
| align            | String          | left   | 文本内容位置，居左/居中/居右。可选项：left/center/right                                                                                        | N        |
| autofocus        | Boolean         | false  | 自动聚焦                                                                                                                                       | N        |
| clearable        | Boolean         | false  | 是否可清空                                                                                                                                     | N        |
| confirm-hold     | Boolean         | false  | 点击键盘右下角按钮时是否保持键盘不收起点                                                                                                       | N        |
| confirm-type     | String          | done   | 设置键盘右下角按钮的文字，仅在 type='text'时生效。可选项：send/search/next/go/done                                                             | N        |
| disabled         | Boolean         | false  | 是否禁用输入框                                                                                                                                 | N        |
| error-message    | String          | -      | 错误提示文本，值为空不显示                                                                                                                     | N        |
| external-classes | Array           | -      | 组件类名，用于设置组件外层元素、输入框、占位符、错误信息等元素类名。`['t-class', 't-class-input', 't-class-placeholder', 't-class-error-msg']` | N        |
| focus            | Boolean         | false  | 自动聚焦                                                                                                                                       | N        |
| maxcharacter     | Number          | -      | 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度                                                                                       | N        |
| maxlength        | Number          | -      | 用户最多可以输入的文本长度。值小于等于 0 的时候，则不限制输入长度                                                                              | N        |
| name             | String          | -      | 名称                                                                                                                                           | N        |
| placeholder      | String          | -      | 占位符                                                                                                                                         | N        |
| size             | String          | small  | 输入框尺寸。可选项：small/medium。TS 类型：`'medium'                                                                                           | 'small'` | N   |
| suffix           | String          | -      | 后置文本内容                                                                                                                                   | N        |
| suffix-icon      | String / Slot   | -      | 组件后置图标                                                                                                                                   | N        |
| type             | String          | text   | 输入框类型。可选项：text/number/idcard/digit/safe-password/password                                                                            | N        |
| value            | String / Number | -      | 输入框的值。TS 类型：`InputValue`。[详细类型定义](https://github.com/Tencent/tdesign-miniprogram/tree/develop/src/input/type.ts)          | N        |

### Input Events

| 名称   | 参数                                                 | 描述                   |
| ------ | ---------------------------------------------------- | ---------------------- |
| blur   | `(value: InputValue, context: { e: FocusEvent })`    | 失去焦点时触发         |
| change | `(value: InputValue`                                 | 输入框值发生变化时触发 |
| clear  | -                                                    | 清空按钮点击时触发     |
| enter  | `(value: InputValue, context: { e: KeyboardEvent })` | 回车键按下时触发       |
| focus  | `(value: InputValue, context: { e: FocusEvent })`    | 获得焦点时触发         |
