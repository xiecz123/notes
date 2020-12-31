### [有 package-lock.json 文件 使用 npm install 为啥更新了 package-lock.json 文件](https://juejin.cn/post/6899594648717623303#heading-11)

5.1.x 之后的版本是这样，`npm install` 总是先检查是否有依赖更新，有的话，安装更新，写入 package-lock.json。
即使你的项目直接固定了版本，但是依赖的依赖无法固定，还是会出现这种现象。
如果只想使用 package-lock.json 来安装且不更新依赖，npm 使用 5.7.1 以上版本，使用 `npm ci`
