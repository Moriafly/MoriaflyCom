# Adaptive Window 模块

`salt-adaptive-window` 提供设备形态与窗口宽度的自适应状态，属于非稳定 API，使用时需要标注 `@OptIn(UnstableSaltAdaptiveWindowApi::class)`。

```kotlin
implementation("io.github.moriafly:salt-adaptive-window:<TAG>")
```

## 设计原则 {#design}

`DeviceFormFactor` 描述设备硬件与平台特征，而非应用可用空间——分屏模式下的平板窗口仍可能是 `WindowSizeClass.Compact`。因此布局断点必须依据 `SaltAdaptiveWindow.sizeClass` 判断，`DeviceFormFactor` 仅用于真正依赖硬件的决策（如选择触控或指针交互）。

## DeviceFormFactor {#deviceformfactor}

设备物理形态：

| 值 | 说明 |
|:--|:--|
| `Phone` | 手持手机 |
| `Tablet` | 平板 |
| `Foldable` | 折叠屏设备 |
| `Desktop` | 桌面或笔记本电脑 |
| `Car` | 车载信息娱乐系统 |
| `Unknown` | 无法确定形态 |

## WindowSizeClass {#windowsizeclass}

窗口宽度分级，遵循 Material 3 断点：

| 值 | 宽度 | 典型场景 |
|:--|:--|:--|
| `Compact` | < 600 dp | 竖屏手机 |
| `Medium` | 600 – 840 dp | 竖屏平板、展开的折叠屏 |
| `Expanded` | ≥ 840 dp | 横屏平板、桌面窗口 |

## SaltAdaptiveWindow {#saltadaptivewindow}

包含 `formFactor` 与 `sizeClass` 的数据类，通过 `LocalSaltAdaptiveWindow` 在组合中读取。`LocalSaltAdaptiveWindow` 没有默认值，未提供时读取会直接抛错，以避免静默回退到错误的设备形态。

## currentSaltAdaptiveWindow {#currentsaltadaptivewindow}

从平台读取当前自适应窗口状态。每次重组都会重新计算，底层窗口尺寸与配置变化（调整大小、旋转、跨显示器移动）时会使读取方失效。

在组合根部提供一次：

```kotlin
CompositionLocalProvider(
    LocalSaltAdaptiveWindow provides currentSaltAdaptiveWindow()
) {
    App()
}
```
