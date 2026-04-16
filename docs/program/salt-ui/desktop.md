# Desktop

Salt UI 在 Desktop 平台（Windows、macOS、Linux）提供了专门适配的窗口和工具组件。

## SaltWindow

`SaltWindow` 是 Desktop 平台专用的窗口组件，基于 Compose Multiplatform 的 `Window` 封装，提供了跨平台的自定义标题栏、窗口背景和缩放支持。

```kotlin
@Composable
fun App() {
    SaltWindow(
        onCloseRequest = ::exitApplication,
        title = "Salt App"
    ) {
        // Content
    }
}
```

## SaltDialogWindow

`SaltDialogWindow` 是 Desktop 平台专用的对话框组件，用法与 `SaltWindow` 类似，但表现为模态对话框。

## SaltWindowExceptionHandler

`SaltWindowExceptionHandler` 用于捕获 `SaltWindow` 和 `SaltDialogWindow` 内部抛出的未捕获异常。

### 问题背景

在旧版本中，`SaltWindow` 的异常处理会直接将异常重新抛出给 AWT。这会导致 AWT 的 `Component.dispatchEventImpl` 和 `EventQueue.dispatchEventImpl` 分别捕获到同一个异常，从而触发两次全局 `Thread.UncaughtExceptionHandler`，表现为：

- 异常日志打印两次
- 崩溃报告弹窗弹出两次
- `onClick` 中的异常看起来"被执行了两次"

### 解决方案

从 Salt UI 新版本开始，提供了 `SaltWindowExceptionHandler`，允许宿主应用显式接管窗口内部异常的处理：

```kotlin
import com.moriafly.salt.ui.window.internal.SaltWindowExceptionHandler

// 在应用启动时设置一次
SaltWindowExceptionHandler.onException = { throwable ->
    // 自定义日志记录或崩溃上报
    logger.error("Window exception", throwable)
}
```

### 默认行为

- 默认实现为 `{ throw it }`，保持与旧版本一致，不会破坏已有项目。
- 一旦宿主应用重写了 `onException`，异常将由该回调消费，不再传播到 AWT，从而彻底避免重复报告。
- 如果已有外置的全局异常处理（例如通过 `Thread.setDefaultUncaughtExceptionHandler` 接管 Compose 异常），且不希望 SaltWindow 默认的 `throw it` 行为影响，可以将其设为空实现 `{ }`：

```kotlin
SaltWindowExceptionHandler.onException = { }
```

### 使用建议

建议在 `main()` 或应用初始化阶段统一设置：

```kotlin
fun main() {
    // 其他初始化...

    SaltWindowExceptionHandler.onException = { throwable ->
        SwingUtilities.invokeLater {
            // 例如：打印日志、上报崩溃、显示错误提示
            throwable.printStackTrace()
        }
    }

    application {
        SaltWindow(
            onCloseRequest = ::exitApplication,
            title = "My App"
        ) {
            AppContent()
        }
    }
}
```

## HWND

`util.hwnd` 扩展属性可用于获取当前 ComposeWindow 的 Windows 原生窗口句柄（HWND）。

```kotlin
import com.moriafly.salt.ui.util.hwnd

val hwnd = window.hwnd
```

## SkiaLayer

`findSkiaLayer()` 扩展函数可用于获取窗口底层的 SkiaLayer，以进行更底层的渲染控制。

```kotlin
import com.moriafly.salt.ui.util.findSkiaLayer

window.findSkiaLayer()?.transparency = true
```
