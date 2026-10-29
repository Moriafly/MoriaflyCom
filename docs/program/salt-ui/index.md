# Salt UI

清新、简单、用户友好的 Compose Multiplatform 组件库。

Salt UI 提供统一主题、设置元项、页面骨架、模态面板和背景材质，并为 Android、iOS 与 Desktop 提供相应适配。按下方任务进入文档，不必先了解源码模块划分。

## 开始使用 {#getting-started}

<span id="开始使用"></span>
<span id="先决条件"></span>

1. [安装与接入](/program/salt-ui/getting-started/installation)：选择版本、添加依赖，运行第一个 Salt UI 界面。
2. [主题](/program/salt-ui/foundations/theme)：配置明暗、颜色、文字、间距和圆角。
3. [构建页面](/program/salt-ui/screen)：组合 BasicScreen、ScreenCard 与标题栏操作。

## 按任务查找 {#guides}

<span id="简介"></span>
<span id="模块"></span>

| 想做什么 | 阅读 |
| --- | --- |
| 创建设置、输入和选择列表 | [Item 元项](/program/salt-ui/components/items) |
| 选择按钮、文字、卡片等基础组件 | [基础组件](/program/salt-ui/components/primitives) |
| 使用玻璃、亚克力、云母或静态背景缓存 | [材质](/program/salt-ui/foundations/material) |
| 显示菜单、对话框或任务面板 | [弹层与对话框](/program/salt-ui/components/overlays)、[Sheet](/program/salt-ui/sheet) |
| 管理返回栈与前进栈 | [导航](/program/salt-ui/navigation) |
| 组织长列表、分页和滑动吸附 | [滚动与列表](/program/salt-ui/guides/scrolling) |
| 配置 Android 入口与系统栏 | [Android](/program/salt-ui/platforms/android) |
| 配置桌面原生窗口与自定义标题栏 | [Desktop](/program/salt-ui/desktop) |
| 根据窗口大小调整界面 | [自适应窗口](/program/salt-ui/adaptive-window) |
| 查找平台判断、修饰符和工具 | [Core](/program/salt-ui/core)、[修饰符与工具](/program/salt-ui/reference/utilities) |

## 文档与版本 {#versions}

<span id="兼容性"></span>

文档以当前开发实现为基础，包含标记为非稳定的 API。使用前先对照选用版本的 [Compose 兼容性表](https://github.com/Moriafly/SaltUI#compatibility)和[发布说明](https://github.com/Moriafly/SaltUI/releases)。新增的静态材质缓存等接口可能尚未包含在已发布版本中。

依赖坐标与模块选择见[安装与接入](/program/salt-ui/getting-started/installation#modules)，UI 能力总览见 [UI 模块索引](/program/salt-ui/ui)。

## 示例与源码 {#resources}

- [共享 Sample](https://github.com/Moriafly/SaltUI/tree/main/shared)：查看完整页面和交互用法。
- [Android 启动工程](https://github.com/Moriafly/SaltUI/tree/main/androidApp)与 [Desktop 启动工程](https://github.com/Moriafly/SaltUI/tree/main/desktopApp)：运行平台示例。
- [GitHub 源码](https://github.com/Moriafly/SaltUI)：查看当前 API 实现与贡献方式。
- [文本描述与翻译规范](/standards/tdts)：保持界面文案一致。
