---
date: 2025-05-21
title: "wanglib 使用超简略文档"
category: 项目文档
tags:
  - python
  - wanglib
  - doc
description: wanglib 的使用文档！
---

# wanglib 超超超简单 <span class="heimu">简陋</span> 使用文档

> wanglib 是一个 Python 模块，封装了机器狗写的项目里经常用到的各类工具，方便在不同项目中复用。

> Github 仓库：https://github.com/machinacanis/wanglib <br>
> PyPI 主页：https://pypi.org/project/wanglib/

::: tip

这篇文档适用于 `wanglib` v1.0.4 版本！

如果仓库里更新了新版本但是这里还没有更新，请踹我一脚让我过来写文档。

:::

算了，我也懒得废话了 XD，你可以直接按照大纲找到对应的模块查看里面有什么东西，如果这个库可以帮到你那么我实在是倍感荣幸汪。

## 安装

::: code-group

```bash [pip]
pip install wanglib
```

```bash [pdm]
pdm add wanglib
```

```bash [poetry]
poetry add wanglib
```

```bash [uv]
uv add wanglib
```

:::

## **Cache 缓存模块**

### `CacheManager` 缓存管理器

```python
class CacheManager:
    def __init__(self, tag: str = "cache", max_size=1024) -> None:
        pass

    def set(self, key: str, value: Any):
        pass

    def get(self, key: str):
        pass

    def delete(self, key: str):
        pass

    def clear(self):
        pass
```

CacheManager 是一个非常简单的 LRU (Last Recently Used) 缓存管理器，用起来也很简单：

```python
from wanglib.cache import CacheManager

cache = CacheManager(tag="my_cache", max_size=1024) # 初始化一个缓存管理器，tag是缓存的标签，max_size是缓存的条目数量，默认为1024
cache.set("key", "value") # 设置缓存
cache.get("key") # 获取缓存
cache.delete("key") # 删除缓存
cache.clear() # 清空缓存
```

这个模块是 `cachetools` 的一个简化封装，如果有需要，你可以直接访问 `CacheManager().cache` 来获取 cachetools 的 LRU 缓存对象。

## **File 文件模块**

### `ensure_dir()` 确认目录存在

```python
def ensure_dir(dir_path: os.PathLike) -> bool:
    ...
```

这个函数用于确认给定的目录路径是否存在，如果不存在，则会创建该目录并返回 `True`，否则返回 `False`。

它可以配合其他需要操作目录的方法使用，避免出现路径问题，例如：

```python
import asyncio
from wanglib.file import ensure_dir, download

async def main():
    target_dir = "./data/"
    # 确保目录存在
    ensure_dir(target_dir)
    # 下载文件到指定目录
    await download("https://example.com/file.txt", target_dir, "file.txt")

if __name__ == "__main__":
    asyncio.run(main())

```

### `download()` & `unsafe_download()`

```python
async def download(url: str, target_path: os.PathLike, filename: str) -> bool:
    ...

async def unsafe_download(url: str, target_path: os.PathLike, filename: str) -> bool:
    ...

```

这两个函数都是对 `httpx` 的异步客户端的封装，用于下载文件到指定目录。

使用上两个函数没有差别，区别在于 `unsafe_download()` 函数的 SSL 安全验证等级很低，用于一些特定的下载需求。

<Heimu>比如从 tx 那堆活全家的玩意整出来的抽象服务器上下载聊天记录里的图片</Heimu>

## **Log 日志模块**

### `LoggerManager` 日志管理器

```python
class LoggerManager:
    """
    日志管理器，用于快速构建美观好用的loguru日志
    """

    def __init__(self) -> None:
        ...

    # 获取loguru日志记录器
    def get_logger(self) -> loguru.Logger:
        ...

    # 添加终端日志记录器
    def add_terminal_logger(
        self,
        level: str = "INFO",
        target: TextIO | Any = sys.stdout,
        is_output_name: bool = False,
        is_output_function: bool = False,
        enqueue=True,
    ) -> "LoggerManager":
        ...

    # 添加jsonl日志记录器
    def add_jsonl_logger(
        self,
        log_dir: os.PathLike = Path("./logs/"),
        level: str = "INFO",
        enqueue=True,
        rotation="100 MB",
        retention="10 days",
    ) -> "LoggerManager":
        ...

    # 添加文件日志记录器
    def add_file_logger(
        self,
        log_dir: os.PathLike = Path("./logs/"),
        level: str = "INFO",
        enqueue=True,
        rotation="100 MB",
        retention="10 days",
    ) -> "LoggerManager":
        ...

    # 移除终端日志记录器
    def remove_terminal_logger(self) -> "LoggerManager":
        ...

    # 移除JSONL日志记录器
    def remove_jsonl_logger(self) -> "LoggerManager":
        ...

    # 移除文件日志记录器
    def remove_file_logger(self) -> "LoggerManager":
        ...
```

这是一个基于 `loguru` 的快速日志管理工具，可以轻松配置多种日志输出方式。

#### 使用

```python
from wanglib.log import LoggerManager

# 初始化日志管理器
logger = LoggerManager().add_terminal_logger().add_jsonl_logger("./logs").get_logger()
# 使用
logger.info("这是一条普通日志")
logger.warning("这是一条警告")
logger.error("这是一条错误")
```

直接通过链式调用来创建日志管理器即可。

::: details 如果你在使用 Nonebot ？

```python [bot.py]
# 在 Nonebot 初始化之前替换掉日志管理器
lm = LoggerManager().add_terminal_logger(level=log_level).add_file_logger(level=log_level)
# 再初始化 Nonebot
nonebot.init()
```

虽然 Nonebot 没有直接提供替换内置的 `logger` 的方法，但是由于都用了 loguru 作为日志库，而 loguru 是默认全局单例的，所以只需要在 Nonebot 初始化之前通过 `LoggerManager` 替换掉 loguru 实例中的配置即可......

:::

## **Message 消息模块**

### `message_deduplication()` 消息去重

```python
def message_deduplication(message_id: int | str) -> bool:
    ...
```

通过缓存检查消息是否重复，返回 True 表示新消息，False 表示重复消息。

它被设计用于在单个 Nonebot 实例连接多个客户端的场景下，避免重复处理消息。缓存直接使用 `CacheManager` 实现，缓存 512 条消息 ID，自动 LRU 淘汰模式。

#### 使用示例

```python
from wanglib.message import message_deduplication

@xxx.handle()
async def _(bot: Bot, event: GroupMessageEvent | PrivateMessageEvent):
    if message_deduplication(event.message_id):
        # 检查消息是否为重复消息
        # 检测传入的消息id是否重复，如果重复则跳过这次处理。
        await xxx.finish(...)
```

如果希望修改消息去重使用的缓存的大小，可以直接从这个包中引入`message_cache`，然后使用 `CacheManager` 实例对其进行赋值替换。

---
