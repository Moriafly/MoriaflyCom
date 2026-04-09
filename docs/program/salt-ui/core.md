# Core

Salt Core 是 Salt UI 的基础核心模块，提供了跨平台的基础工具类和 API。

## OS

`OS` 是一个密封类（sealed class），用于表示操作系统平台及其版本信息。通过 `OS.current` 可以获取当前运行的平台。

### 平台类型

| 平台 | 说明 | 版本信息 |
|:--|:--|:--|
| `OS.Android` | Android 平台 | `versionSdk`: API level（如 35 表示 Android 15） |
| `OS.Windows` | Windows 平台 | `windowsBuild`: 构建号（如 22631 表示 Windows 11 23H2） |
| `OS.MacOS` | macOS 平台 | `version`: 版本字符串，`build`: 构建号 |
| `OS.Linux` | Linux 平台 | - |
| `OS.IOS` | iOS 平台 | - |
| `OS.Unknown` | 未知平台 | - |

### 获取当前平台

```kotlin
import com.moriafly.salt.core.os.OS

val currentOS = OS.current

// 或使用 when 表达式处理不同平台
when (val os = OS.current) {
    is OS.Android -> println("Android API ${os.versionSdk}")
    is OS.Windows -> println("Windows Build ${os.windowsBuild}")
    is OS.MacOS -> println("macOS ${os.version} (${os.build})")
    is OS.Linux -> println("Linux")
    is OS.IOS -> println("iOS")
    is OS.Unknown -> println("Unknown platform")
}
```

### 平台判断方法

```kotlin
// 基础判断
OS.isAndroid()  // 是否为 Android
OS.isWindows()  // 是否为 Windows
OS.isMacOS()    // 是否为 macOS
OS.isLinux()    // 是否为 Linux
OS.isIOS()      // 是否为 iOS
OS.isUnknown()  // 是否为未知平台

// 是否为桌面平台（Windows/macOS/Linux）
OS.isDesktop()
```

### 条件执行

```kotlin
// 仅在特定平台执行代码
val isAndroid12OrAbove = OS.ifAndroid { it.versionSdk >= OS.Android.ANDROID_12 }

val isWindows11 = OS.ifWindows { it.isAtLeastWindows11() }

// 自定义条件
OS.ifMacOS { it.version >= "14.0" }
```

### Android 版本常量

```kotlin
OS.Android.ANDROID_6      // API 23
OS.Android.ANDROID_7      // API 24
OS.Android.ANDROID_7_1    // API 25
OS.Android.ANDROID_8      // API 26
OS.Android.ANDROID_8_1    // API 27
OS.Android.ANDROID_9      // API 28
OS.Android.ANDROID_10     // API 29
OS.Android.ANDROID_11     // API 30
OS.Android.ANDROID_12     // API 31
OS.Android.ANDROID_12_V2  // API 32
OS.Android.ANDROID_13     // API 33
OS.Android.ANDROID_14     // API 34
OS.Android.ANDROID_15     // API 35
OS.Android.ANDROID_16     // API 36
```

### Windows 版本常量

```kotlin
// Windows 10 版本
OS.Windows.WINDOWS_10_1607   // Build 14393
OS.Windows.WINDOWS_10_1703   // Build 15063
OS.Windows.WINDOWS_10_1709   // Build 16299
OS.Windows.WINDOWS_10_1803   // Build 17134
OS.Windows.WINDOWS_10_1809   // Build 17763
OS.Windows.WINDOWS_10_1903   // Build 18362
OS.Windows.WINDOWS_10_1909   // Build 18363
OS.Windows.WINDOWS_10_2004   // Build 19041
OS.Windows.WINDOWS_10_20H2   // Build 19042
OS.Windows.WINDOWS_10_21H1   // Build 19043
OS.Windows.WINDOWS_10_21H2   // Build 19044
OS.Windows.WINDOWS_10_22H2   // Build 19045

// Windows 11 版本
OS.Windows.WINDOWS_11_21H2   // Build 22000
OS.Windows.WINDOWS_11_22H2   // Build 22621
OS.Windows.WINDOWS_11_23H2   // Build 22631
OS.Windows.WINDOWS_11_24H2   // Build 26100
OS.Windows.WINDOWS_11_25H2   // Build 26200

// Windows Server
OS.Windows.WINDOWS_SERVER_2016    // Build 14393
OS.Windows.WINDOWS_SERVER_2019    // Build 17763
OS.Windows.WINDOWS_SERVER_2022    // Build 20348
```

### Windows 版本检查

```kotlin
val windowsOS = OS.current as OS.Windows

// 检查是否为 Windows 11 或更高版本
if (windowsOS.isAtLeastWindows11()) {
    // 使用 Windows 11 特有功能，如云母效果
}

// 检查特定构建版本
if (windowsOS.windowsBuild >= OS.Windows.WINDOWS_11_23H2) {
    // Windows 11 23H2 或更高版本
}
```

### 实际应用示例

```kotlin
@Composable
fun PlatformAdaptiveUI() {
    when {
        OS.isAndroid() -> {
            // Android 特定 UI
            AndroidMaterialUI()
        }
        OS.isDesktop() -> {
            // Desktop 平台（Windows/macOS/Linux）
            DesktopNativeUI()
        }
        OS.isIOS() -> {
            // iOS 特定 UI
            IOSCupertinoUI()
        }
    }
}

// 根据 Android 版本适配功能
@Composable
fun NotificationSettings() {
    val supportsNotificationChannels = OS.ifAndroid { 
        it.versionSdk >= OS.Android.ANDROID_8 
    }
    
    if (supportsNotificationChannels) {
        // 显示通知渠道设置（Android 8.0+）
        NotificationChannelSettings()
    }
}
```

## UnstableSaltCoreApi

```kotlin
@UnstableSaltCoreApi
```

用于标记尚未稳定的 Salt Core API。这些 API 可能会在未来版本中进行更改或移除。

::: warning 警告
标记为 `@UnstableSaltCoreApi` 的 API 不建议在生产环境中使用，它们可能会在不遵循语义化版本控制的情况下进行破坏性更改。
:::

### 使用示例

```kotlin
@UnstableSaltCoreApi
fun experimentalFeature() {
    // 实验性功能实现
}

// 使用时需要显式选择加入
@OptIn(UnstableSaltCoreApi::class)
fun myFunction() {
    experimentalFeature()
}
```

## 依赖引入

```kotlin
// 仅使用 Core 模块
implementation("io.github.moriafly:salt-core:<TAG>")

// Desktop 平台
implementation("io.github.moriafly:salt-core-desktop:<TAG>")

// Android 平台
implementation("io.github.moriafly:salt-core-android:<TAG>")
```
