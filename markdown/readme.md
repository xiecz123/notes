### markdown 的基础语法

**bold text**

_italic text_

> quote / block

`code code code`

```shell
# notes
$ git init
```

```javascript
// notes
import react
function add(a, b) {
  return a + b
}
```

[url name](url)

- bulleted list1

- bulleted list2

- bulleted list3

1. list1

2. list2

3. list2

- [ ] todo list
- [x] done list

@somebody

#issues number

---

~~delete text~~

<u>带下划线文本</u>

创建脚注格式类似这样 [name]。

[name]: 注脚注脚注脚

![picture name](url)

<img src="123.png" alt="picture name" width="50%">

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |

> 不在 Markdown 涵盖范围之内的标签，都可以直接在文档里面用 HTML 撰写。

> Markdown 支持以下这些符号前面加上反斜杠来帮助插入普通的符号：

\\

\+

```
\ 反斜线
` 反引号
- 星号
_ 下划线
{} 花括号
[] 方括号
() 小括号
# 井字号
+ 加号
- 减号
. 英文句点
! 感叹号
```

```diff
- this.startNewLabelCreation(data)
+ isTrue && this.startNewLabelCreation(data)
```
