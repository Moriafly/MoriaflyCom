# Salt UI

清新、简单、用户友好。

## 简介

Salt UI 是基于 [Compose Multiplatform](https://github.com/JetBrains/compose-multiplatform) 的 UI 组件库，于 2023 年 8 月开源。1.0 版本派生自 Salt Player 的一些 UI 组件。目前，Salt UI 已在 Salt Player、Emo Scroll、Qinalt 等 App 中使用，服务超百万用户。

## 模块

Salt UI 由多个模块组成，可按需引入：

| 模块 | 依赖坐标 | 说明 |
|:--|:--|:--|
| UI | `io.github.moriafly:salt-ui` | UI 组件主体：主题、元项（Item）、弹层、手势、懒加载、页面构建等，[查看文档](/program/salt-ui/ui) |
| Core | `io.github.moriafly:salt-core` | 跨平台基础能力（如 `OS` 平台信息），[查看文档](/program/salt-ui/core) |
| Navigation | `io.github.moriafly:salt-ui-navigation` | 基于 Navigation 3 的双向导航栈，[查看文档](/program/salt-ui/navigation) |
| Adaptive Window | `io.github.moriafly:salt-adaptive-window` | 设备形态与窗口宽度分级，[查看文档](/program/salt-ui/adaptive-window) |

## 兼容性

[Compatibility](https://github.com/Moriafly/SaltUI?tab=readme-ov-file#compatibility)

## 开始使用

Salt UI 现已在 Maven Central 上提供。单击下面的徽章以访问其分发页面，其中显示最新版本。

[![Maven Central](https://img.shields.io/maven-central/v/io.github.moriafly/salt-ui)](https://search.maven.org/search?q=g:io.github.moriafly)

然后在项目中添加依赖项：

```kotlin
// Replace <TAG> with the latest version
// e.g. implementation("io.github.moriafly:salt-ui:2.6.0-alpha03")
implementation("io.github.moriafly:salt-ui:<TAG>")
```

简易开始:

```kotlin
@Composable
fun App() {
    SaltTheme(
        configs = saltConfigs()
    ) {
        // ...
    }
}
```

DEMO：[androidApp](https://github.com/Moriafly/SaltUI/tree/main/androidApp) / [desktopApp](https://github.com/Moriafly/SaltUI/tree/main/desktopApp)

## 先决条件

添加 Salt UI 依赖项并同步项目后，您就可以使用 Salt UI。

如果您使用的是 Compose Material 或 Material3，请注意 Salt UI 不是完全替代品。但是，如果您需要将它们一起使用，则可能需要更换一些基础组件：

```kotlin
import androidx.compose.material.Text // [!code --]
import androidx.compose.material3.Text // [!code --]
import com.moriafly.salt.ui.Text // [!code ++]
```

```kotlin
import androidx.compose.material.Icon // [!code --]
import androidx.compose.material3.Icon // [!code --]
import com.moriafly.salt.ui.Icon // [!code ++]
```
