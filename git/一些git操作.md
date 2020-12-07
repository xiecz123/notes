`git init // 把当前目录变成 Git 可以管理的仓库`

`git branch -a // 查看分支`

`git log / git log --pretty=oneline // 查看 git 记录`

`git reflog // 查看之前的命令`

`git reset --hard HEAD^ / git reset --hard <name> 退回到上一版本/退回到某一个版本`

`git diff HEAD -- 文件名 // 比较文件区别`

`use "git restore --staged <file>..." to unstage`

`use "git restore <file>..." to discard changes in working directory`

`git rm <file>...`

> 创建 dev 分支，然后切换到 dev 分支

1. 方法一

```shell
# 等于先 git branch <name> 再 git checkout <name>
$ git checkout -b <name>

# 创建远程 origin 的 dev 分支到本地
$ git checkout -b dev origin/dev
```

2. 方法二

```shell
# 等于先 git branch <name> 再 git switch <name>
$ git switch -c <name>
```

```shell
# 在 main 分支上合并 dev 分支的内容
$ git merge dev
```

```shell
# 删除 dev 分支
$ git branch -d dev
```

```shell
# 让我们能复制一个特定的提交到当前分支
$ git cherry-pick <commit>
```

```shell
# （设置 dev 和 origin/dev 的链接）
$ git branch --set-upstream-to=origin/dev dev
```

`git stash // 暂存工作区的内容`

`git stash list // 查看暂存列表`

`git stash apply / git stash apply stash@{0} // 把暂存区的内容恢复到工作区`

`git stash drop // 删除暂存区内容`

`git stash pop // 恢复并删除暂存区`

`git remote // 查看远程库的信息`

`git remote -v // 远程库更详细的信息`

`git push origin master // 推送分支`

> 如果你在创建.gitignore 文件之前就已经 push 项目了，那么即时你在.gitignore 文件中写入新的规则，这些规则也不会起作用。
> 原因是.gitignore 只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore 是无效的。
> 那么解决方法就是先把本地缓存删除（改变成未 track 状态），然后再提交：

```shell
$ git rm -r --cached .
$ git add .
$ git commit -m 'update .gitignore'
```

> create a new repository on the command line

```shell
$ echo "# learngit" >> README.md
$ git init
$ git add README.md
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin https://github.com/xiecz123/learngit.git
$ git push -u origin main
```

> …or push an existing repository from the command line

```shell
# 关联远程库
$ git remote add origin https://github.com/xiecz123/learngit.git 
# 更改分支名称为 main
$ git branch -M main
$ git push -u origin main
```

> 由于远程库是空的，我们第一次推送 master 分支时，加上了-u 参数，Git 不但会把本地的 master 分支内容推送的远程新的 master 分支还会把本地的 master 分支和远程的 master 分支关联起来，在以后的推送或者拉取时就可以简化命令。
