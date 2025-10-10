# Salt UI

清新、简单、用户友好。

## 简介

Salt UI 是基于 [Compose Multiplatform](https://github.com/JetBrains/compose-multiplatform) 的 UI 组件，于 2023 年 8 月开源。1.0 版本派生自 Salt Player 的一些 UI 组件。目前，Salt UI 已在 Salt Player、Emo Scroll、Qinalt 等 App 中使用，服务超百万用户。

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

DEMO：[composeApp](https://github.com/Moriafly/SaltUI/tree/main/composeApp)

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

## 主题

主题是 Salt UI 的关键部分。您可以根据需要应用 `SaltTheme`，类似于使用 `MaterialTheme` 的方式。

但它在很多方面也有所不同。以下是 `SaltTheme` 的函数声明：

```kotlin
@Composable
fun SaltTheme(
    configs: SaltConfigs,
    dynamicColors: SaltDynamicColors = SaltDynamicColors(
        light = lightSaltColors(),
        dark = darkSaltColors()
    ),
    textStyles: SaltTextStyles = SaltTheme.textStyles,
    dimens: SaltDimens = SaltTheme.dimens,
    shapes: SaltShapes = SaltTheme.shapes,
    content: @Composable () -> Unit
)
```

### SaltConfigs

在 `SaltTheme` 中， 需要 `configs` 参数，如下所示：

```kotlin
SaltTheme(
    configs = SaltConfigs(
        isDarkTheme = false,
        indication = AlphaIndication
    )
)
```

`isDarkTheme` 参数指定是否启用深色模式。因此，代码的其他部分可以检查 `SaltTheme.configs.isDarkTheme` 以确定暗模式是否处于活动状态。

```kotlin
if (SaltTheme.config.isDarkTheme) {
    // Do somethings.
}
```

`indication` 处理反馈。默认情况下，Salt UI 使用其内置的 `AlphaIndication` 效果。要改用 Android 的材质涟漪效果，请指定 `ripple()`。

### SaltDynamicColors

`SaltDynamicColors` 是 Salt UI 里面用来配置颜色的，不同于 Material，Salt UI 需要同时指定一种颜色的 `light` 和 `dark` 配置。

```kotlin
SaltDynamicColors(
    light = // SaltColors,
    dark = // SaltColors
)
```

#### SaltColors

Salt UI 的颜色配置：

| 属性 | 用途 |
|:-- |:-- |
| highlight | 主题色 |
| text | 主要文本和图标颜色 |
| subText | 次要文本颜色 |
| background | 背景色（简易不所以透明度） |
| subBackground | 次要背景色 |
| popup | 弹出界面背景色 |
| stroke | 边缘线条颜色 |
| onHighlight | 位于 highlight 上方的前景色 |

其中 Salt UI 使用分层设计，类似 `RoundedColumn` 中使用 `subBackground` 作为内容背景色。

::: tip
如果想要从您项目自有的 Material3 ColorScheme 或者其他颜色配色方案迁移到 `SaltColors` 并在项目中统一使用，可以使用下面的函数：

```kotlin
// 扩展函数：将 Material3 ColorScheme 转换为 SaltColors
@Composable
private fun ColorScheme.toSaltColors(): SaltColors =
    SaltColors(
        highlight = this.primary, // 使用 primary 作为高亮色
        text = this.onBackground, // 主要文字颜色
        subText = this.onSurfaceVariant, // 次要文字颜色
        background = this.background, // 主背景色
        subBackground = this.surface, // 次要背景色
        popup = this.surfaceContainer, // 弹窗背景色
        stroke = this.outline, // 描边颜色
        onHighlight = this.primary // 高亮色上的文字颜色
    )
```

其中的配色可以自行修改调整以符合您的产品主要配色方案需求。使用时只需要在您的项目的 Theme 中将您的配色方案带上 `.toSaltColors()` 即可转换为SaltColors方案。
:::

### SaltTextStyles

Salt UI 的文本样式（不含颜色）配置：

| 属性 | 用途 |
|:-- |:-- |
| main | 主文本 |
| sub | 次要文本 |
| paragraph | 大型段落 |

### SaltDimens

Salt UI 的一些长度、大小定义：

| 属性 | 用途 |
|:-- |:-- |
| item | `元项` 的最小高度 |
| itemIcon | `元项` 图标的最小高度 |
| ~~corner~~ | （已废弃）圆角大小 |
| ~~dialogCorner~~ | （已废弃）对话框圆角大小 |
| padding | 主要边距 |
| subPadding | 次要边距 |

```kotlin
 * Dimens for Salt UI.
 *
 *   ╭──────────────────────────────────────────────────╮
 *   │ ------------------[padding] * 0.5f               │
 *   │           ╭──────────────────────────╮           │
 *   │           │ ------[subPadding]       │           │
 *   │ [padding] │ [padding] Text [padding] │ [padding] │
 *   │           │ ------[subPadding]       │           │
 *   │           ╰──────────────────────────╯           │
 *   │ ------------------[padding] * 0.5f               │
 *   │ ------------------[padding] * 0.5f               │
 *   │           ╭──────────────────────────╮           │
 *   │           │ ------[subPadding]       │           │
 *   │ [padding] │ [padding] Text [padding] │ [padding] │
 *   │           │ ------[subPadding]       │           │
 *   │           ╰──────────────────────────╯           │
 *   │ ------------------[padding] * 0.5f               │
 *   ╰──────────────────────────────────────────────────╯
 */
```

### SaltShape

Salt UI 的形状配置：

| 属性 | 用途 |
|:-- |:-- |
| small | 小 |
| medium | 中 |
| large | 大 |

## Item（元项）

Item（元项）是 Salt UI 中的重要概念，它多用于构建 UI 设置、配置界面。

以设置界面为例，它是一个滚动的页面，其实就由各种 `元项` 构成，这些 `元项` 又多放在同一个 `RoundedColumn` 聚类。类似：

```kotlin
// ItemOuter
RoundedColumn {
    // Item
}
```

其中以 `Item` 开头的组件多用于 `RoundedColumn` 内部，以 `ItemOuter` 开头的组件多用于外部。

### ItemArrow

`Item` 的右侧箭头，带样式，一般用不到，除了自定义 `Item`。

### ItemTip

提示文本。

### Item

基础 `Item`，用于跳转页面或者打开网页。

### ItemSwitcher

开关。

### ItemPopupArrow

弹出菜单箭头，一般不用。

### ItemCheck

多选。

### ItemValue

Key Value 属性文本，标题 - 内容文本。

### ItemEdit

编辑框。

### ItemEditPassword

密码编辑框。

### ItemSlider

滑块。

### ItemButton

按钮。

### ItemSpacer

边距。

### ItemContainer

容器，一般不用，用 `innerPadding` 代替。

### ItemDivider

分割。

### ItemInfo

带图标和颜色文本的提示。

### ItemDropdown

弹出选择菜单。

### ItemOuterTitle

外部标题，用于给聚类 `RoundedColumn` 块的标题。

### ItemOuterTip

外部提示文本。

### ItemOuterLargeTitle

外部大型标题，多用于移动平台。

### ItemOuterEdit

外部编辑框。

### ItemOuterTextButton

外部文本按钮。

### ItemOuterSpacer

外部边距。

### ItemOuterHalfSpacer

外部半高边距。

## Bar

### TitleBar

标题栏。

### BottomBar

底部栏。

#### BottomBarItem

底部栏项。

## Button

### BasicButton

基础按钮。

## Icon

图标。

### Icons

Salt UI 自带图标资源，一般不用。

## JustifiedRow

自适应两端对齐布局，可设定内部间距。

## Modifier

### Modifier.thenIf

### Modifier.onPointerEventCompat

## Padding

## RoundedColumn

构建聚类 `Item` 块，也可用于其他界面，此组件用处多。

## SaltPalette

一些颜色配置。

## Slider

滑块。

## Surface

表面。

## Switcher

开关。

## Text

文本。

## BottomSheetScaffold

复刻自 Material 中的 BottomSheetScaffold，Salt UI 移除了一些配置并修复了一些 Bug，简易使用方法：

```kotlin
BottomSheetScaffold(
    sheetContent = {
        // Sheet
    }
} {
    // Content
}
```

其中 Salt UI 开放了 `nestedScrollConnection` 参数以控制 Sheet 内容的嵌套滚动（咨询过谷歌工程师，推荐这种做法）。

## UnstableSaltUiApi

指示不稳定的 Salt UI 方法等。

## WindowInsets

### safeMain

### safeMainIgnoringVisibility

### safeMainCompat

## Popup

### PopupMenu

### PopupMenuItem

### PopupState

## 其他

### AlphaIndication

### Clickable

### Edge

## 特定 Android 平台

### BottomSheetDialog

### EdgeToEdge

### WebView

详见 Accompanist 的 WebView 实现，Salt UI 对部分代码和参数进行了修改。

### RomUtil

### ScreenUtil

### ThreadUtil

#### runOnMainThread

顶层函数，用于将内部代码运行在主线程：

```kotlin
runOnMainThread {
    // ...
}
```

### WindowUtil

设置 Android `Window` 状态栏和导航栏前景色：

```kotlin
// 设置状态栏前景色白色
WindowUtil.setStatusBarForegroundColor(window, BarColor.White)
// 设置导航栏前景色黑色
WindowUtil.setNavigationBarForegroundColor(window, BarColor.Black)
```

## 特定 Desktop 平台

### Windows

#### HWND

### SkiaLayer

### SaltWindow

### SaltDialogWindow
