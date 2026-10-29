# Android

完成[安装与接入](/program/salt-ui/getting-started/installation)后，在 Android 入口配置应用与窗口。跨平台页面、主题和组件仍使用相同的公共 API。

## SaltApplication {#saltapplication}

`SaltApplication` 包含库使用的 Android 初始化处理。采用此入口时，让应用的 Application 继承它，并在 Manifest 中注册实际类名：

```kotlin
import com.moriafly.salt.ui.app.SaltApplication

class App : SaltApplication()
```

```xml
<application
    android:name=".App">
    <!-- 保留项目已有的 Activity 和其他应用配置。 -->
</application>
```

`.App` 需要与项目的实际包名和类路径一致。如果已有自定义 Application，结合[入口源码](https://github.com/Moriafly/SaltUI/blob/main/ui2/src/androidMain/kotlin/com/moriafly/salt/ui/app/SaltApplication.kt)评估继承关系。

## 边到边布局 {#edgetoedge}

Salt UI 提供 `edgeToEdge()` Activity 扩展。按下列顺序在 `super.onCreate` 前调用，再设置 Compose 内容：

```kotlin
import com.moriafly.salt.ui.ext.edgeToEdge

override fun onCreate(savedInstanceState: Bundle?) {
    edgeToEdge()
    super.onCreate(savedInstanceState)
    // setContent { ... }
}
```

窗口主题可参考 Sample，下面是主题片段：

```xml
<style name="Theme.SaltUI" parent="@android:style/Theme.Holo">
    <item name="android:windowBackground">@null</item>
</style>
```

边到边会让内容延伸到系统栏区域；内容避让仍需由布局负责。使用 BasicScreen 时消费其 `contentPadding`，不要再重复叠加系统栏高度。见[构建页面](/program/salt-ui/screen#content-area)。

## 平台工具 {#tools}

| API | 用途 |
| --- | --- |
| WebView | 基于 Accompanist WebView 调整的封装，参数以 Salt UI 源码为准 |
| `RomUtil`、`ScreenUtil` | ROM 与屏幕相关的 Android 工具 |
| `ThreadUtil` / `runOnMainThread` | 主线程执行工具 |
| `WindowUtil` | Android Window 的系统栏前景配置 |

```kotlin
runOnMainThread {
    // 执行要求在主线程运行的操作。
}

WindowUtil.setStatusBarForegroundColor(window, BarColor.White)
WindowUtil.setNavigationBarForegroundColor(window, BarColor.Black)
```

这里只展示工具用途，项目应根据当前窗口背景选择有足够对比度的系统栏前景。

## 平台与版本要求 {#compatibility}

UI 模块最低 Android API 为 23，Navigation 模块为 24。需要根据版本选择系统行为时，使用 [Core 的 OS API](/program/salt-ui/core#os)；需要根据窗口空间选择布局时，使用[自适应窗口](/program/salt-ui/adaptive-window)，不要用设备型号代替窗口尺寸。

Android 发布配置与依赖注意事项见[源码 README](https://github.com/Moriafly/SaltUI#google-play)。
