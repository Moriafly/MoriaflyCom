# 安装与接入

Salt UI 基于 Compose Multiplatform。先在已有的 Compose 项目中添加依赖，再使用 `SaltTheme` 包裹界面。组件、主题和材质均从这个入口继续接入。

## 添加依赖 {#dependencies}

在项目仓库中启用 `mavenCentral()`，然后在共享模块中添加：

```kotlin
commonMain.dependencies {
    implementation("io.github.moriafly:salt-ui:<TAG>")
}
```

Android 单平台项目也可以在对应模块的 `dependencies` 中添加同一依赖。将 `<TAG>` 替换为选用版本；先检查该版本的 [Compose 兼容性表](https://github.com/Moriafly/SaltUI#compatibility)，不要仅按版本号猜测兼容范围。

版本列表见 [Maven Central](https://central.sonatype.com/artifact/io.github.moriafly/salt-ui) 和 [GitHub Releases](https://github.com/Moriafly/SaltUI/releases)。本文档包含当前开发中的 API，具体可用接口以所选版本为准。

### 可选模块 {#modules}

| 模块 | 依赖坐标 | 何时添加 |
| --- | --- | --- |
| UI | `io.github.moriafly:salt-ui:<TAG>` | 使用主题和 UI 组件时 |
| Navigation | `io.github.moriafly:salt-ui-navigation:<TAG>` | 需要 SaltNavigator 的返回 / 前进栈时 |
| Core | `io.github.moriafly:salt-core:<TAG>` | 只使用跨平台基础工具时，可单独引入 |
| Adaptive Window | `io.github.moriafly:salt-adaptive-window:<TAG>` | 只使用窗口信息时，可单独引入；UI 已通过 API 依赖提供 |

模块版本保持一致。Android 的 UI 模块要求 `minSdk 23`，可选 Navigation 模块要求 `minSdk 24`。Android 入口配置见 [Android 平台](/program/salt-ui/platforms/android)。

## 第一个界面 {#first-screen}

```kotlin
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.moriafly.salt.ui.SaltConfigs
import com.moriafly.salt.ui.SaltTheme
import com.moriafly.salt.ui.Text

@Composable
fun App() {
    SaltTheme(
        configs = SaltConfigs.default(isDarkTheme = false)
    ) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "你好，Salt UI")
        }
    }
}
```

示例显式使用浅色主题。若需要跟随系统，可将 `isSystemInDarkTheme()` 的结果传给 `SaltConfigs.default(isDarkTheme = ...)`。颜色、文字与形状的配置见[主题](/program/salt-ui/foundations/theme)。

## 与 Material / Material 3 共存 {#compose-material}

Salt UI 可以与其他 Compose 组件库共存，但各自的主题并不自动互通。在 Salt UI 界面中，使用 Salt UI 的 `Text` 和 `Icon`，使基础内容读取 SaltTheme 的颜色与样式：

```kotlin
import com.moriafly.salt.ui.Icon
import com.moriafly.salt.ui.Text
```

若混用 Material 3 组件，为它们提供相应的 `MaterialTheme`，并按需显式映射配色；不要依赖导入同名组件来自动切换主题。

## 非稳定 API {#unstable-api}

标有 `@UnstableSaltUiApi` 的组件或参数需要显式选择使用：

```kotlin
import com.moriafly.salt.ui.UnstableSaltUiApi

@OptIn(UnstableSaltUiApi::class)
@Composable
fun SettingsPage() {
    // 使用带有 UnstableSaltUiApi 标记的页面、材质或组件 API。
}
```

Core 和 Adaptive Window 各有对应的非稳定 API 标记，见各自文档。升级这些 API 时应对照所选版本的源码和发布说明。

## 下一步 {#next}

- [主题](/program/salt-ui/foundations/theme)：统一明暗模式、颜色、文字、间距和圆角。
- [构建页面](/program/salt-ui/screen)：用 BasicScreen 和 ScreenCard 搭建页面。
- [Item 元项](/program/salt-ui/components/items)：构建设置、输入与选择界面。
- [材质](/program/salt-ui/foundations/material)：接入壁纸、玻璃、亚克力与静态缓存。
- [Sample 源码](https://github.com/Moriafly/SaltUI/tree/main/shared)：查看可运行的共享示例；Android 和 Desktop 启动工程分别位于仓库的 `androidApp` 和 `desktopApp`。
