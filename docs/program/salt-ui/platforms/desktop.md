# Desktop

完成[安装与接入](/program/salt-ui/getting-started/installation)后，按需配置原生窗口；跨平台的背景材质见[材质](/program/salt-ui/foundations/material)。

Salt UI 为 Windows、macOS 和 Linux 提供窗口、自定义标题栏、窗口背景和缩放支持。这些 API 位于 `salt-ui` 模块的 Desktop 源集中，通常需要标注 `@OptIn(UnstableSaltUiApi::class)`。

## SaltWindow {#saltwindow}

`SaltWindow` 基于 Compose Multiplatform 的窗口 API 封装。进入组合时创建平台窗口，离开组合时关闭并释放窗口。使用 `onCloseRequest` 响应关闭请求：退出整个应用可以调用 `exitApplication()`，关闭某个子窗口则应更新控制其是否进入组合的状态。

窗口、标题栏布局和命中检测分别由不同的 API 负责：

| API | 职责 |
|:--|:--|
| `SaltWindow` / `SaltDialogWindow` | 创建平台窗口，安装 Salt UI 的窗口处理逻辑 |
| `DesktopCaptionBar` | 布局自定义标题栏内容，并避让系统窗口按钮 |
| `CaptionBarHitTest` | 配置当前 Salt UI 窗口的标题栏命中区域 |
| `SaltWindowProperties` | 配置窗口移动、标题栏高度、背景和缩放等行为 |
| `LocalSaltWindowInfo` | 读取当前窗口的标题栏尺寸和系统按钮占位信息 |

### 自定义标题栏示例 {#caption-bar}

下面的例子可以放在 Desktop 入口文件中。主内容先为标题栏留出高度，然后依次放置命中检测区域和标题栏控件。点击“设置”只切换内容，不会开始拖动窗口。

```kotlin
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.application
import com.moriafly.salt.ui.SaltTheme
import com.moriafly.salt.ui.Text
import com.moriafly.salt.ui.UnstableSaltUiApi
import com.moriafly.salt.ui.window.CaptionBarHitTest
import com.moriafly.salt.ui.window.DesktopCaptionBar
import com.moriafly.salt.ui.window.LocalSaltWindowInfo
import com.moriafly.salt.ui.window.SaltWindow

@OptIn(ExperimentalComposeUiApi::class, UnstableSaltUiApi::class)
fun main() = application {
    var showSettings by remember { mutableStateOf(false) }

    SaltTheme {
        SaltWindow(
            onCloseRequest = ::exitApplication,
            title = "Salt App"
        ) {
            val captionBarHeight = LocalSaltWindowInfo.current.captionBarHeight

            Box(Modifier.fillMaxSize()) {
                // 1. 主内容：避让自定义标题栏。
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(top = captionBarHeight)
                ) {
                    Text(if (showSettings) "设置内容" else "主窗口内容")
                }

                // 2. 命中检测：每个窗口只配置一次。
                CaptionBarHitTest()

                // 3. 标题栏控件：位于命中检测区域上方，保留自身的点击行为。
                DesktopCaptionBar {
                    Row(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(horizontal = 12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Salt App", modifier = Modifier.weight(1f))
                        Text(
                            text = "设置",
                            modifier = Modifier
                                .clickable { showSettings = !showSettings }
                                .padding(8.dp)
                        )
                    }
                }
            }
        }
    }
}
```

这里的顺序指同一 `Box` 中的绘制层级：**主内容 → 命中检测区域 → 可交互的标题栏控件**。不要用 `CaptionBarHitTest` 覆盖需要接收点击的按钮、输入框或菜单入口。

## DesktopCaptionBar {#desktopcaptionbar}

`DesktopCaptionBar` 是标题栏的布局容器。它读取 `LocalSaltWindowInfo`，将高度设为 `captionBarHeight`，并根据 `captionButtonsAlign` 和 `captionButtonsFullWidth` 在系统窗口按钮所在的一侧留出空间。其内容作用域是 `BoxScope`，可以使用 `Modifier.align()`。

它不自动添加 `CaptionBarHitTest`。标题栏内的 `Row`、文字和按钮由应用自行布局；是否将空白区域交给窗口处理层，应在窗口级别配置一次。

## CaptionBarHitTest {#captionbarhittest}

::: warning 仅用于 Salt UI 窗口的命中检测
`CaptionBarHitTest` 是 `SaltWindow` / `SaltDialogWindow` 的辅助配置，本身不提供移动窗体的功能。实际移动由 Salt UI 安装的平台窗口处理逻辑完成，并受 `SaltWindowProperties.moveable` 控制。不要把它当作可以添加到任意 Compose `Window` 的通用拖拽组件。
:::

它创建一个不可见的命中检测区域，默认填满宽度，高度取自当前窗口的 `captionBarHeight`。将它放在主内容上方、可交互的标题栏控件下方，让窗口处理层区分标题栏空白和普通控件。

### 每个窗口允许零个或一个 {#captionbarhittest-scope}

数量限制按窗口计算，不按页面、布局分支或整个应用计算：

| 场景 | 用法 |
|:--|:--|
| 一个 `SaltWindow` 不需要自定义标题栏命中区域 | 可以不声明 |
| 一个 `SaltWindow` 或 `SaltDialogWindow` 需要该区域 | 声明一个 |
| 同一窗口的不同 `Box`、页面或布局分支各声明一个 | 不允许；这些声明共用同一个窗口的注册名额 |
| 页面过渡期间，新旧动画分支各声明一个 | 不允许；退出动画未完成时，旧分支仍占用注册名额 |
| 父窗口和子 `SaltWindow` / `SaltDialogWindow` | 各自独立，每个窗口都可以声明一个 |
| Compose `Popup`、`Dialog`、`DialogWindow` 或普通 `Window` 的内容 | 不应声明；这些子窗口和覆盖层不会建立 Salt UI 窗口作用域 |

重复注册会抛出 `IllegalStateException`。普通重组不会重复占用名额；组件离开组合后会释放注册并清理悬停状态，因此可以通过条件分支移除、替换或重新添加。建议在窗口根布局中统一配置，页面切换时只替换页面内容。

`AnimatedContent`、`Crossfade` 和相互重叠的 `AnimatedVisibility` 会在过渡期间同时保留退出与进入的内容。如果两个分支各自包含 `CaptionBarHitTest`，仍会触发重复注册检查。将 `CaptionBarHitTest` 提升到动画外的窗口根布局，只对主内容或标题栏控件执行动画。

只有 `SaltWindow` 和 `SaltDialogWindow` 会建立独立的注册作用域。Compose `Popup`、`Dialog`、`DialogWindow` 和普通 `Window` 的子窗口或覆盖层组合会继承父组合的注册，不应在其内容中声明 `CaptionBarHitTest`。这不影响普通布局中的子组合：只要属于同一个 Salt UI 窗口，就共同遵守最多一个的约束。

Popup 是否由独立的原生窗口承载，取决于 Compose 的 layer 配置；即便创建了独立原生窗口，也不会因此获得 Salt UI 的窗口处理能力和独立注册。需要有自身标题栏的子窗口时，使用 `SaltWindow` 或 `SaltDialogWindow`。

::: info 版本说明
重复注册的自动检查由 [SaltUI #63](https://github.com/Moriafly/SaltUI/pull/63) 引入，请确认使用的版本包含该改动。旧版本即使没有主动抛出异常，也应遵守每个窗口最多一个的用法。
:::

## SaltDialogWindow {#saltdialogwindow}

`SaltDialogWindow` 用法与 `SaltWindow` 类似，默认以模态对话框的方式阻止对所属窗口的操作。需要非模态子窗口时，可以设置 `modalityType = DialogModalityType.Modeless`。

下面的片段放在 `application` 和 `SaltTheme` 的组合中。`showDialog` 决定子窗口是否存在；父窗口与子窗口各自的 `CaptionBarHitTest` 不会占用对方的名额。

```kotlin
var showDialog by remember { mutableStateOf(false) }

SaltWindow(
    onCloseRequest = ::exitApplication,
    title = "主窗口"
) {
    Box(Modifier.fillMaxSize()) {
        CaptionBarHitTest()
        DesktopCaptionBar {
            Text(
                text = "打开子窗口",
                modifier = Modifier
                    .clickable { showDialog = true }
                    .padding(8.dp)
            )
        }
    }

    if (showDialog) {
        SaltDialogWindow(
            onCloseRequest = { showDialog = false },
            title = "子窗口"
        ) {
            Box(Modifier.fillMaxSize()) {
                CaptionBarHitTest()
                DesktopCaptionBar {
                    Text("子窗口")
                }
            }
        }
    }
}
```

该片段还需导入 `com.moriafly.salt.ui.window.SaltDialogWindow`。子窗口离开组合时会释放自己的注册，父窗口的配置继续保留。

## SaltWindowProperties {#saltwindowproperties}

通过 `SaltWindowProperties.default(...)` 基于默认值修改配置，再传给窗口的 `properties` 参数：

```kotlin
SaltWindow(
    onCloseRequest = ::exitApplication,
    properties = SaltWindowProperties.default(
        moveable = false,
        captionBarHeight = 48.dp,
        captionButtonHeight = 40.dp
    )
) {
    // 窗口内容
}
```

此处需导入 `com.moriafly.salt.ui.window.SaltWindowProperties`。`moveable = false` 会禁用 Salt UI 标题栏处理逻辑的窗口移动；即使已经放置 `CaptionBarHitTest`，也不会因此重新启用移动。

| 属性 | 用途 |
|:--|:--|
| `moveable` | 是否允许通过 Salt UI 标题栏处理逻辑移动窗口 |
| `captionBarHeight` | 自定义标题栏高度，也是 `DesktopCaptionBar` 和 `CaptionBarHitTest` 使用的默认高度 |
| `captionButtonHeight` | 窗口按钮高度，必须小于或等于 `captionBarHeight` |
| `captionButtonsVisible` | 是否显示窗口按钮 |
| `backgroundType` | 窗口背景类型；选用前通过 `isSupported()` 判断当前平台是否支持 |
| `extraDisplayScale` / `extraFontScale` | 在当前显示缩放和字体缩放基础上额外应用的倍率 |
| `onVisibleChange` | 接收窗口显示或隐藏的通知 |

## LocalSaltWindowInfo {#localsaltwindowinfo}

`LocalSaltWindowInfo.current` 提供当前窗口的 `captionBarHeight`、`captionButtonsAlign` 和 `captionButtonsFullWidth`。在窗口内部读取这些值来布局内容，避免写死高度或假定窗口按钮总在右侧。

`DesktopCaptionBar` 只为自己的内容避让窗口按钮，不会为主内容预留标题栏高度。主内容的避让方式见上面的[自定义标题栏示例](#caption-bar)。

## SaltWindowExceptionHandler {#saltwindowexceptionhandler}

`SaltWindowExceptionHandler` 用于捕获 `SaltWindow` 和 `SaltDialogWindow` 内部抛出的未捕获异常。

默认的 `onException` 实现会重新抛出异常。应用已有统一的日志或崩溃报告入口时，可以在创建窗口前设置一次回调：

```kotlin
import com.moriafly.salt.ui.SaltUiFlags
import com.moriafly.salt.ui.window.internal.SaltWindowExceptionHandler

// 在应用启动时、创建窗口前配置。
SaltUiFlags.isDisableDefaultWindowExceptionHandler = true
SaltWindowExceptionHandler.onException = { throwable ->
    throwable.printStackTrace()
    // 在这里接入应用的异常报告入口。
}
```

当前实现中，`isDisableDefaultWindowExceptionHandler` 默认为 `true`，窗口使用 Salt UI 的异常处理回调；设为 `false` 时，会沿用外层的 Compose `LocalWindowExceptionHandlerFactory`，仅修改 `onException` 不会替换外层处理器。

回调在 AWT 事件线程上同步调用。回调正常返回后，经由此处理器捕获的异常不会再被它重新抛出；回调再次抛出异常则会继续传播。接管报告并不代表失败的组合或窗口状态已经恢复，例如重复声明 `CaptionBarHitTest` 仍应修正配置。

## HWND {#hwnd}

`hwnd` 扩展属性可用于获取 `ComposeWindow` 或 `ComposeDialog` 的 Windows 原生窗口句柄。只在 Windows 平台调用，例如在 `SaltWindow` 的内容作用域中：

```kotlin
import com.moriafly.salt.core.os.OS
import com.moriafly.salt.ui.util.hwnd

if (OS.isWindows()) {
    val hwnd = window.hwnd
    // 使用 Windows 原生窗口句柄。
}
```

## SkiaLayer {#skialayer}

`findSkiaLayer()` 扩展函数用于查找窗口底层的 SkiaLayer，供确实需要底层渲染控制的场景使用。查找结果可能为空，应使用安全调用。

```kotlin
import com.moriafly.salt.ui.util.findSkiaLayer

window.findSkiaLayer()?.transparency = true
```
