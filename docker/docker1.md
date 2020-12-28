[docker 学习](https://yeasy.gitbook.io/docker_practice/image)

`docker --help` 可以查看具体指令
Run 'docker COMMAND --help' for more information on a command.
ex: docker run --help

### 一、使用镜像

1. 获取镜像
   docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]

2. 列出镜像
   docker image ls

3. 删除本地镜像
   docker image rm [选项] <镜像 1> [<镜像 2> ...]
   其中，<镜像> 可以是 镜像短 ID、镜像长 ID、镜像名 或者 镜像摘要。

4. 利用 commit 理解镜像构成
   docker commit [选项] <容器 ID 或容器名> [<仓库名>[:<标签>]]
   不推荐使用 docker commit 生成镜像

运行镜像
命令：`docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`

- `-d`是`--detach`的缩写,Run container in background and print container ID
- `-p`是`--publish list`的缩写,Publish a container's port(s) to the host
- `--name string`,Assign a name to the container
- `-i`是`--interactive`的缩写,Keep STDIN open even if not attached,交互式操作
- `-t`是`--tty`的缩写,Allocate a pseudo-TTY，分配一个 pseudo-TTY，终端
  80 端口可能会被占用

```
docker run --name web2 -d -p 81:80 nginx:v2
docker run -d -p 80:80 --name webserver nginx
docker run -t -i ubuntu /bin/bash
```

ubuntu 镜像默认的 CMD 是 /bin/bash，如果我们直接 docker run -it ubuntu 的话，会直接进入 bash。

#### 5. [使用 Dockerfile 定制镜像](https://yeasy.gitbook.io/docker_practice/image/build)

Dockerfile 是一个文本文件，其内包含了一条条的 指令(Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

5.1 FROM 指定基础镜像，FROM 是必备的指令，并且必须是第一条指令

5.2 RUN 执行命令,

两种格式:

- `shell`格式:`RUN <命令>`

- `exec`格式:`RUN ["可执行文件", "参数1", "参数2"]`

Dockerfile 中每一个指令都会建立一层，RUN 也不例外。每一个 RUN 的行为，就和刚才我们手工建立镜像的过程一样：新建立一层，在其上执行这些命令，执行结束后，commit 这一层的修改，构成新的镜像。

5.3 构建镜像
命令:`docker build [选项] <上下文路径/URL/->` `docker build [选项] <PATH/URL/->`

> The PATH is a directory on your local filesystem. The URL is a Git repository location.

- `-t`是`--tag list`的缩写,Name and optionally a tag in the 'name:tag' format

example: `docker build -t nginx:v3 .`。

5.4 镜像构建上下文（Context）

> `.`表示当前目录，Docker 在运行时分为 Docker 引擎（也就是服务端守护进程）和客户端工具。虽然表面上我们好像是在本机执行各种 docker 功能，但实际上，一切都是使用的远程调用形式在服务端（Docker 引擎）完成。而 docker build 命令构建镜像，其实并非在本地构建，而是在服务端，也就是 Docker 引擎中构建的。那么在这种客户端/服务端的架构中，如何才能让服务端获得本地文件呢？这就引入了上下文的概念。当构建的时候，用户会指定构建镜像上下文的路径，docker build 命令得知这个路径后，会将路径下的所有内容打包，然后上传给 Docker 引擎。这样 Docker 引擎收到这个上下文包后，展开就会获得构建镜像所需的一切文件。

> 如果观察 docker build 输出，我们其实已经看到了这个发送上下文的过程: Sending build context to Docker daemon <bound size>

> 可以用 .gitignore 一样的语法写一个 .dockerignore，该文件是用于剔除不需要作为上下文传递给 Docker 引擎的。

> 如果在 Dockerfile 中这么写：`COPY ./package.json /app/`。这并不是要复制执行 docker build 命令所在的目录下的 package.json，也不是复制 Dockerfile 所在目录下的 package.json，而是复制 上下文（context） 目录下的 package.json。

> 因此，COPY 这类指令中的源文件的路径都是相对路径。

5.5 其它 docker build 的用法

- 直接用 Git repo 进行构建
  example： `docker build -t hello-world https://github.com/docker-library/hello-world.git#master:amd64/hello-world`

  > 这行命令指定了构建所需的 Git repo，并且指定分支为 master，构建目录为 /amd64/hello-world/，然后 Docker 就会自己去 git clone 这个项目、切换到指定分支、并进入到指定目录后开始构建。

- 用给定的 tar 压缩包构建
  example: `$ docker build http://server/context.tar.gz`

  > 如果所给出的 URL 不是个 Git repo，而是个 tar 压缩包，那么 Docker 引擎会下载这个包，并自动解压缩，以其作为上下文，开始构建。

- 从标准输入中读取 Dockerfile 进行构建

- 从标准输入中读取上下文压缩包进行构建

6. Dockerfile 指令详解

### [COPY](https://docs.docker.com/engine/reference/builder/#copy)

格式：

```
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<源路径>",... "<目标路径>"]
```

> `--chown` 特性只支持 Linux 容器，在 Windows 容器中将不会工作。

`COPY` 指令将从构建上下文目录中 `<源路径>` 的文件/目录复制到新的一层的镜像内的 `<目标路径>` 位置[originaltext]。

[originaltext]: <> (The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>)

### [WORKDIR](https://docs.docker.com/engine/reference/builder/#workdir)

格式为
`WORKDIR <工作目录路径>`

- 使用 `WORKDIR` 指令可以来指定工作目录（或者称为当前目录），以后各层的当前目录就被改为指定的目录，如该目录不存在，`WORKDIR` 会帮你建立目录。

- 如果你的 `WORKDIR` 指令使用的相对路径，那么所切换的路径与之前的 `WORKDIR` 有关
