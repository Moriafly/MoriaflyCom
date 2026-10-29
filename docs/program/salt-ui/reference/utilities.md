# 修饰符与工具

本页整理 UI 模块的辅助能力。组件选型见[基础组件](/program/salt-ui/components/primitives)，操作系统信息见 [Core 模块](/program/salt-ui/core)。

## 条件修饰符 {#modifier}

`Modifier.thenIf` 用于根据条件追加修饰符，适合保持链式布局清晰：

```kotlin
Modifier
    .fillMaxWidth()
    .thenIf(showBackground) {
        background(SaltTheme.colors.subBackground)
    }
```

先用具名变量表达复杂条件，再组合修饰符。顺序仍然决定尺寸、裁剪、背景与交互区域，不应为了缩短代码而改变绘制语义。

`Modifier.onPointerEventCompat` 提供跨平台指针事件适配；自定义交互应同时考虑触摸、鼠标与键盘操作，优先复用现有控件的行为。

## 内容边距 {#padding}

`Modifier.innerPadding()` 使用主题的内容边距。Item 已包含内部布局，通常不需要再加一次。页面标题栏和系统栏的边距使用 BasicScreen 的 `contentPadding`，见[页面内容区域](/program/salt-ui/screen#content-area)。

## 窗口安全区域 {#windowinsets}

UI 模块提供 `WindowInsets.safeMain`、`safeMainIgnoringVisibility` 和 `safeMainCompat` 等安全区域适配。优先使用容器已经提供的边距；仅在自行实现页面布局时处理这些值，避免重复避让。

## 交互与颜色 {#others}

| API | 用途 |
| --- | --- |
| `AlphaIndication` | 默认透明度交互反馈，可通过 SaltConfigs 配置 |
| Clickable 相关扩展 | 与库内反馈和交互约定配合的点击处理 |
| `Edge` | 表达边缘方向，例如按边缘配置越界滚动 |
| `SaltPalette` | 预置颜色；业务组件优先读取 SaltTheme 的语义颜色 |
| `UnstableSaltUiApi` | 标记未稳定的 UI API，使用方式见[安装与接入](/program/salt-ui/getting-started/installation#unstable-api) |

具体签名与平台可用性见 [UI 模块源码](https://github.com/Moriafly/SaltUI/tree/main/ui2/src)。
