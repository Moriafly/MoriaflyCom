# UI 模块

`salt-ui` 是 Salt UI 的主体模块，提供主题系统与各类 UI 组件。

```kotlin
implementation("io.github.moriafly:salt-ui:<TAG>")
```

## 主题 {#theme}

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

### SaltConfigs {#saltconfigs}

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

### SaltDynamicColors {#saltdynamiccolors}

`SaltDynamicColors` 是 Salt UI 里面用来配置颜色的，不同于 Material，Salt UI 需要同时指定一种颜色的 `light` 和 `dark` 配置。

```kotlin
SaltDynamicColors(
    light = // SaltColors,
    dark = // SaltColors
)
```

#### SaltColors {#saltcolors}

Salt UI 的颜色配置：

| 属性 | 用途 |
|:-- |:-- |
| highlight | 主题色 |
| text | 主要文本和图标颜色 |
| subText | 次要文本颜色 |
| background | 背景色（建议不带透明度） |
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

### SaltTextStyles {#salttextstyles}

Salt UI 的文本样式（不含颜色）配置：

| 属性 | 用途 |
|:-- |:-- |
| main | 主文本 |
| sub | 次要文本 |
| paragraph | 大型段落 |

### SaltDimens {#saltdimens}

Salt UI 的一些长度、大小定义：

| 属性 | 用途 |
|:-- |:-- |
| item | `元项` 的最小高度 |
| itemIcon | `元项` 图标的最小高度 |
| ~~corner~~ | （已废弃）圆角大小 |
| ~~dialogCorner~~ | （已废弃）对话框圆角大小 |
| padding | 主要边距 |
| subPadding | 次要边距 |

```
/**
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

### SaltShapes {#saltshapes}

Salt UI 的形状配置：

| 属性 | 用途 |
|:-- |:-- |
| small | 小 |
| medium | 中 |
| large | 大 |

## Item（元项） {#item}

Item（元项）是 Salt UI 中的重要概念，它多用于构建 UI 设置、配置界面。

以设置界面为例，它是一个滚动的页面，其实就由各种 `元项` 构成，这些 `元项` 又多放在同一个 `RoundedColumn` 聚类。类似：

```kotlin
// ItemOuter
RoundedColumn {
    // Item
}
```

其中以 `Item` 开头的组件多用于 `RoundedColumn` 内部，以 `ItemOuter` 开头的组件多用于外部。

### ItemArrow {#itemarrow}

`Item` 的右侧箭头，带样式，一般用不到，除了自定义 `Item`。

### ItemTip {#itemtip}

提示文本。

### Item {#item-1}

基础 `Item`，用于跳转页面或者打开网页。

### ItemSwitcher {#itemswitcher}

开关。

### ItemPopupArrow {#itempopuparrow}

弹出菜单箭头，一般不用。

### ItemCheck {#itemcheck}

多选。

### ItemValue {#itemvalue}

Key Value 属性文本，标题 - 内容文本。

### ItemEdit {#itemedit}

编辑框。

### ItemEditPassword {#itemeditpassword}

密码编辑框。

### ItemSlider {#itemslider}

滑块。

### ItemButton {#itembutton}

按钮。

### ItemSpacer {#itemspacer}

边距。

### ItemContainer {#itemcontainer}

容器，一般不用，用 `innerPadding` 代替。

### ItemDivider {#itemdivider}

分割。

### ItemInfo {#iteminfo}

带图标和颜色文本的提示。

### ItemDropdown {#itemdropdown}

弹出选择菜单。

### ItemOuterTitle {#itemoutertitle}

外部标题，用于给聚类 `RoundedColumn` 块的标题。

### ItemOuterTip {#itemoutertip}

外部提示文本。

### ItemOuterLargeTitle {#itemouterlargetitle}

外部大型标题，多用于移动平台。

### ItemOuterEdit {#itemouteredit}

外部编辑框。

### ItemOuterTextButton {#itemoutertextbutton}

外部文本按钮。

### ItemOuterSpacer {#itemouterspacer}

外部边距。

### ItemOuterHalfSpacer {#itemouterhalfspacer}

外部半高边距。

## 基础组件 {#components}

### Bar {#bar}

#### TitleBar {#titlebar}

标题栏。

#### BottomBar {#bottombar}

底部栏。

##### BottomBarItem {#bottombaritem}

底部栏项。

### Button {#button}

#### BasicButton {#basicbutton}

基础按钮。

#### PillButton {#pillbutton}

胶囊按钮。

### Icon {#icon}

图标。

#### SaltIcons {#salticons}

Salt UI 自带图标资源，一般不用。

### Text {#text}

文本。

### Switcher {#switcher}

开关。

### Slider {#slider}

滑块。

### Surface {#surface}

表面。

### RoundedColumn {#roundedcolumn}

构建聚类 `Item` 块，也可用于其他界面，此组件用处多。

### JustifiedRow {#justifiedrow}

自适应两端对齐布局，可设定内部间距。

### Modifier {#modifier}

#### Modifier.thenIf {#modifier-thenif}

#### Modifier.onPointerEventCompat {#modifier-onpointereventcompat}

### WindowInsets {#windowinsets}

#### safeMain {#safemain}

#### safeMainIgnoringVisibility {#safemainignoringvisibility}

#### safeMainCompat {#safemaincompat}

## 弹层与对话框 {#dialogs}

### Popup {#popup}

#### PopupMenu {#popupmenu}

#### PopupMenuItem {#popupmenuitem}

#### PopupState {#popupstate}

### Dialog {#dialog}

跨平台对话框，`AdaptiveDialog` 在移动平台表现为全屏页面，在桌面平台表现为对话框。

### BottomSheetScaffold {#bottomsheetscaffold}

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

### BottomSheetDialog {#bottomsheetdialog}

Android 平台专用的底部对话框。

## 材质 {#material}

`com.moriafly.salt.ui.material` 提供背景材质效果，基于 [Haze](https://github.com/chrisbanes/haze) 实现，属于非稳定 API，使用时需要标注 `@OptIn(UnstableSaltUiApi::class)`。

通过 `Modifier.material` / `Modifier.subMaterial` 应用，可选类型由 `MaterialType` 定义：

| 类型 | 效果 |
|:--|:--|
| `None` | 无材质 |
| `BlurryGlass` | 主题色染色的模糊玻璃效果 |
| `Acrylic` | Fluent Acrylic 亚克力效果 |
| `Mica` | Fluent Mica 云母效果 |
| `Premium` | 强模糊、分层混色效果 |

`SaltHazeStyles` 提供了预设的 `HazeBlurStyle`，也可配合 Haze 库在特定场景下实现自定义效果。

## 构建页面 {#screen}

BasicScreen、ScreenCard、TitleBarButton 等页面构建组件详见 [构建页面](/program/salt-ui/screen)。

## 手势 {#gestures}

### Cupertino 过渡滚动 {#cupertino-scroll}

详见 [构建页面](/program/salt-ui/screen#cupertino-scroll) 中的 Cupertino 过渡滚动章节。

### 滑动吸附 {#snapping}

`com.moriafly.salt.ui.gestures.snapping` 提供了 `SnapFlingBehavior` 及 `LazyListSnapLayoutInfoProvider`、`LazyGridSnapLayoutInfoProvider`、`PagerSnapLayoutInfoProvider` 等，用于实现滑动对齐到目标位置。

## Lazy 布局 {#lazy}

`com.moriafly.salt.ui.lazy` 提供了自研的 `LazyList`、`LazyGrid`（`lazy.grid`）、`LazyStaggeredGrid`（`lazy.staggeredgrid`）与 `Pager`（`pager`），行为对齐 Compose 官方 Lazy 系列并针对 Salt UI 的需求做了调整。

## 其他 {#others}

### AlphaIndication {#alphaindication}

### Clickable {#clickable}

### Edge {#edge}

### SaltPalette {#saltpalette}

一些颜色配置。

### UnstableSaltUiApi {#unstablesaltuiapi}

指示不稳定的 Salt UI 方法等。

## 特定 Android 平台 {#android}

### SaltApplication {#saltapplication}

Salt UI `2.8.0-alpha01` 版本新增，推荐使用 Salt UI 时使用继承自 SaltApplication，包含一些特殊处理。

```kotlin
class App: SaltApplication() {
}
```

### EdgeToEdge {#edgetoedge}

Salt UI 实现 Activity 边到边：

```kotlin

import com.moriafly.salt.ui.ext.edgeToEdge

// ...

override fun onCreate(savedInstanceState: Bundle?) {
    edgeToEdge()
    // Others before super.onCreate
    super.onCreate(savedInstanceState)
}
```

Sample of themes.xml:

```xml
<style name="Theme.SaltUI" parent="@android:style/Theme.Holo">
    <item name="android:windowBackground">@null</item>
</style>
```

### WebView {#webview}

详见 Accompanist 的 WebView 实现，Salt UI 对部分代码和参数进行了修改。

### RomUtil {#romutil}

### ScreenUtil {#screenutil}

### ThreadUtil {#threadutil}

#### runOnMainThread {#runonmainthread}

顶层函数，用于将内部代码运行在主线程：

```kotlin
runOnMainThread {
    // ...
}
```

### WindowUtil {#windowutil}

设置 Android `Window` 状态栏和导航栏前景色：

```kotlin
// 设置状态栏前景色白色
WindowUtil.setStatusBarForegroundColor(window, BarColor.White)
// 设置导航栏前景色黑色
WindowUtil.setNavigationBarForegroundColor(window, BarColor.Black)
```

## 特定 Desktop 平台 {#desktop}

窗口、自定义标题栏、窗口属性和原生窗口工具详见 [Desktop 文档](/program/salt-ui/desktop)。其中，`CaptionBarHitTest` 仅用于 Salt UI 窗口的命中检测，每个窗口最多配置一个，具体用法见 [CaptionBarHitTest](/program/salt-ui/desktop#captionbarhittest)。
