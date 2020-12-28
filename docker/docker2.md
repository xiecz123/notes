[docker 学习](https://yeasy.gitbook.io/docker_practice/container)

`docker --help` 可以查看具体指令

Run `docker COMMAND --help` for more information on a command.

ex: docker run --help

> 容器是 Docker 又一核心概念。
> 简单的说，容器是独立运行的一个或一组应用，以及它们的运行态环境。对应的，虚拟机可以理解为模拟运行的一整套操作系统（提供了运行态环境和其他系统环境）和跑在上面的应用。
> 本章将具体介绍如何来管理一个容器，包括创建、启动和停止等。

### 二、操作容器

1. 启动容器

启动容器有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态（stopped）的容器重新启动。

1.1 新建并启动
`docker run`

例如启动一个 bash 终端，允许用户进行交互:
`docker run -t -i ubuntu /bin/bash`

其中，-t 选项让 Docker 分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， -i 则让容器的标准输入保持打开。

当利用 `docker run` 来创建容器时，Docker 在后台运行的标准操作包括：

- 检查本地是否存在指定的镜像，不存在就从公有仓库下载
- 利用镜像创建并启动一个容器
- 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
- 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
- 从地址池配置一个 ip 地址给容器
- 执行用户指定的应用程序
- 执行完毕后容器被终止

  1.2 启动已终止容器
  `docker container start`

2. 守护态运行

> 更多的时候，需要让 Docker 在后台运行而不是直接把执行命令的结果输出在当前宿主机下。此时，可以通过添加 -d 参数来实现。

> 注： 容器是否会长久运行，是和 docker run 指定的命令有关，和 -d 参数无关。

要获取容器的输出信息，可以通过 `docker container logs` 或者 `docker logs` 命令。
`docker container logs [container ID or NAMES]`

3. 终止容器
   `docker container stop`

可以使用 `docker container stop` 来终止一个运行中的容器。
终止状态的容器可以用 `docker container ls -a` 命令看到

4. 进入容器
   在使用 -d 参数时，容器启动后会进入后台。

某些时候需要进入容器进行操作，包括使用 `docker attach` 命令或 `docker exec` 命令，推荐使用 `docker exec` 命令

如果从 `docker exec` 命令产生的 stdin 中 exit，不会导致容器的停止

5. 导出和导入容器

5.1 导出容器
docker export 命令
example: `docker export 7691a814370e > ubuntu.tar`
这样将导出容器快照到本地文件。

5.2 导入容器快照
可以使用 `docker import` 从容器快照文件中再导入为镜像，例如
`cat ubuntu.tar | docker import - test/ubuntu:v1.0`
此外，也可以通过指定 URL 或者某个目录来导入，例如
`docker import http://example.com/exampleimage.tgz example/imagerepo`

用户既可以使用 docker load 来导入镜像存储文件到本地镜像库，也可以使用 docker import 来导入一个容器快照到本地镜像库。

6. 删除容器

可以使用 `docker container rm` 来删除一个处于终止状态的容器。例如
`docker container rm trusting_newton`

`docker rm -fv <容器 ID>`
这样可以停止、删除容器，并清除数据。

清理所有处于终止状态的容器
`docker container prune`
