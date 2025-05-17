---
date: 2025-05-17
title: "[机器狗自翻] McJty的Mod入门教程 1.20 - EP0 | 概念"
category: 翻译
tags:
  - minecraft
  - mod
  - forge
  - tutorial
description: 这篇文章全面梳理了 Minecraft Forge Mod 开发中的核心概念，按字母顺序详细解释了从 Baked Model 到 Waterlogging 的各种重要术语。文章包含烘焙模型、方块实体、能力系统、事件总线、渲染类型等关键概念的定义与用途说明，为 Minecraft Mod 开发者提供了一份完整的概念参考指南，是 McJty 的 Minecraft 1.20 Forge Mod 开发教程系列的基础知识总结。
---

# McJty 的 Mod 入门教程 1.20 - EP0 | 概念

::: info
原文地址：[https://www.mcjty.eu/docs/1.20/concepts](https://www.mcjty.eu/docs/1.20/concepts)

原作者：[McJty](https://www.mcjty.eu/)

翻译：[Kyoku](/pages/about)
:::

::: tip
这系列的教程翻译并不是完全逐行按原文翻译的，实际上是我在学习过程中按照自己的理解进行的转写以及补充。

你可以从这里的超链接快速跳到后续的章节：
:::

Every concept we talk about in this tutorial series will be summarized here in alphabetical
order with links to the tutorials where they are discussed.

- **Baked Model:** a baked model is a model that is defined in code. It's is static in the sense that it's geometry is baked into the chunk geometry.
- **Block:** a Block is the basic building block in Minecraft. Every type of block has just one instance.
- **BlockEntity:** a BlockEntity is a class that is associated with a Block. It is used to store data for a Block and often also logic.
- **BlockEntityType:** a BlockEntityType is a type of BlockEntity. For example, a furnace has a BlockEntityType. It's also a singleton object.
- **BlockState:** a BlockState is a combination of a Block and a set of properties. Every blockstate (every block/property combination) exists only once.
- **Capability:** a Capability is a way to attach data to an object. For example, a BlockEntity can have a Capability that stores the energy of that BlockEntity. Capabilities can also be attached to itemstacks, entities, chunks, ...
- **Client:** the client is the part of Minecraft that controls the visual part of the game.
- **Container:** a container is the object responsible for the GUI on both the client and the server.
- **Dynamic Rendering:** dynamic rendering is usually done using a `BlockEntityRenderer`. It can be used if you need to animate something.
- **Event:** an Event is a way to hook into the Minecraft code. For example, there is an event that is called when a player logs in. There are two types of events: forge bus and mod bus.
- **Event Bus:** there are two event busses in Forge: the forge bus and the mod bus. The forge bus is used for events that happen during the game (like breaking a block). The mod bus is used for events that are related to lifecycle and setup (like registration).
- **Gradle:** Gradle is a build system. It is used to build your mod.
- **Item:** an Item is an item in the game. Every type of item has just one instance.
- **Item Handler:** an Item Handler is the Forge way to access the items in an inventory. It's implemented as a capability.
- **ItemStack:** an ItemStack is an instance of an Item. It can have a size (how many items are in the stack) and it can have NBT data.
- **JSON:** JSON is a format to store data. It is used in Minecraft for recipes, loot tables, blockstates, and more.
- **LazyOptional:** a LazyOptional is a way to delay creation of an object until needed. It's often used in combination with capabilities.
- **Loot table:** a loot table is a way to define what items are dropped when a block is broken or an entity is killed.
- **Mappings:** mappings are readable names for the obfuscated names that Minecraft uses internally.
- **Model:** a model is a way to define how a block or item looks.
- **Model Property:** a model property is a property that can be used by a baked model.
- **NBT:** NBT is used by Minecraft to persist data. Block entities, itemstacks, entities, and more use NBT to save their data to the savefile. NBT is also used for syncing data between client and server.
- **Packet:** a packet is a way to send data between client and server.
- **PoseStack:** a PoseStack is a way to store transformations (for example, to transform the object space to camera space). It's used in the rendering code.
- **Property:** a Property is a property of a BlockState. For example, a BlockState can have a property "facing" which can be north, south, east, or west.
- **Quad:** a quad is a rectangular polygon. It's used in the rendering code. A block is made up of quads.
- **Registration:** the act of registering something in the game. For example, registering a block means that the block is now known to the game.
- **Registry:** a Registry is a collection of registry objects. For example, the Block registry contains all blocks.
- **RenderType:** a RenderType is a way to define how a block is rendered. It defines various graphical operations relevant for that render type. For example, a block can be rendered as a solid block or as a cutout block.
- **ResourceLocation:** a ResourceLocation is a unique identifier for a registry object or a resource on disk (like a texture file). For example, `minecraft:stone` is the ResourceLocation for the stone block.
- **Screen:** a Screen is the client side representation for a Gui in Minecraft.
- **Server:** the server is the part of Minecraft that controls the game logic. In single player there is an integrated server. In multiplayer there is a dedicated server.
- **Static Model:** a static model is a model that is defined in a JSON file or with a baked model. It's is static in the sense that it's geometry is baked into the chunk geometry.
- **Tag:** a tag defines a group of registry objects. Tags are often used for items and blocks but can be used for any registry object. Common uses for tags are recipes but there are also tags that specify if a block can be mined with a certain type of tool.
- **Texture Atlas:** a texture atlas is a texture that contains multiple textures. It's used to reduce the number of textures that need to be loaded on the graphics card.
- **TextureAtlasSprite:** a TextureAtlasSprite is a texture that is part of a texture atlas.
- **Tick:** a tick is a unit of time in Minecraft. The game runs at 20 ticks per second.
- **Waterlogging:** waterlogging is a way to specify if a block can be waterlogged (put in water).
