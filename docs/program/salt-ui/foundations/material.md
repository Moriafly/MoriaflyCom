# 材质

Material 让页面或面板采样背景，再绘制模糊、染色与噪点效果。它由 `SaltTheme` 选择样式，由 `MaterialSource` 提供背景像素，由 `Modifier.material()` 和 `Modifier.subMaterial()` 绘制结果。

这里的 Material 指 Salt UI 的背景材质，不是 Compose Material / Material 3 组件库，也不是操作系统桌面背板。实现基于 [Haze](https://github.com/chrisbanes/haze)，API 位于 `com.moriafly.salt.ui.material`，需要 `@OptIn(UnstableSaltUiApi::class)`。

::: info 版本范围
本文按当前开发实现编写。`MaterialSourceMode` 是新增 API；如果依赖版本尚未提供 `mode` 参数，需要使用包含该 API 的版本。已有版本的基础材质仍可通过 `MaterialSource` 和两个材质 Modifier 接入。
:::

## 完整示例 {#quick-start}

下面是一个背景壁纸、主材质区域和次级材质面板组成的页面。`wallpaperKey` 由调用方提供，在壁纸像素变化时更新。

```kotlin
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import com.moriafly.salt.ui.Button
import com.moriafly.salt.ui.SaltMaterial
import com.moriafly.salt.ui.SaltTheme
import com.moriafly.salt.ui.Text
import com.moriafly.salt.ui.UnstableSaltUiApi
import com.moriafly.salt.ui.innerPadding
import com.moriafly.salt.ui.material.MaterialSource
import com.moriafly.salt.ui.material.MaterialSourceMode
import com.moriafly.salt.ui.material.MaterialType
import com.moriafly.salt.ui.material.material
import com.moriafly.salt.ui.material.subMaterial

@OptIn(UnstableSaltUiApi::class)
@Composable
fun WallpaperPage(
    wallpaper: Painter,
    wallpaperKey: Any,
    modifier: Modifier = Modifier
) {
    var clicks by rememberSaveable { mutableIntStateOf(0) }

    SaltTheme(
        material = SaltMaterial(type = MaterialType.Mica)
    ) {
        Box(
            modifier = modifier.fillMaxSize()
        ) {
            MaterialSource(
                modifier = Modifier.fillMaxSize(),
                materialSelf = false,
                mode = MaterialSourceMode.Static(key = wallpaperKey)
            ) {
                Image(
                    painter = wallpaper,
                    contentDescription = null,
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )
            }

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .material(fallback = SaltTheme.colors.background)
                    .innerPadding()
            ) {
                Text(text = "材质页面")

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(SaltTheme.shapes.medium)
                        .subMaterial(fallback = SaltTheme.colors.subBackground)
                        .innerPadding()
                ) {
                    Button(
                        onClick = { clicks++ },
                        text = "点击次数：$clicks"
                    )
                }
            }
        }
    }
}
```

这个例子显式关闭了 `materialSelf`，再由前景容器绘制主材质。这样壁纸、材质与交互内容各自的职责比较清楚。按钮计数不属于背景源，点击不会要求壁纸重新烘焙。

## 选择材质 {#types}

通过 `SaltTheme(material = SaltMaterial(type = ...))` 选择当前作用域的材质。默认值是 `MaterialType.None`。

| 类型 | 视觉效果 |
| --- | --- |
| `None` | 关闭材质，材质 Modifier 使用各自的 `fallback` |
| `BlurryGlass` | 模糊玻璃、随明暗主题变化的染色与细微噪点 |
| `Acrylic` | Fluent Acrylic 风格，主背景和次背景使用不同样式 |
| `Mica` | Fluent Mica 风格，主背景和次背景使用不同样式 |
| `Premium` | 较强模糊与分层混色，次背景包含细微噪点 |

`Mica` 是对 `MaterialSource` 的采样效果，不会自动读取系统壁纸。要显示某张壁纸，需要在源内容中实际绘制它。

## 背景源与绘制顺序 {#source}

`MaterialSource` 的内容只放需要被采样的背景，例如壁纸、渐变或视频。把使用材质的前景组件放在它后面，通常是同一 `Box` 中的后续兄弟节点。

```text
SaltTheme
└─ Box
   ├─ MaterialSource → 壁纸 / 背景画面
   └─ 页面内容
      ├─ material() → 主背景
      └─ subMaterial() → 卡片 / 面板
```

不要在 `MaterialSource` 的 `content` 中使用 `material()` 或 `subMaterial()`，否则背景采样与材质消费会混在一起。源和消费者都需要有实际布局尺寸；示例同时给源和 `Image` 使用 `fillMaxSize()`。

### materialSelf {#material-self}

`materialSelf` 默认是 `true`：绘制背景源后，组件会在同一范围叠加一层主材质。

| 场景 | 建议 |
| --- | --- |
| 壁纸上需要一整层材质底色 | 使用默认 `materialSelf = true` |
| 壁纸保持清晰，仅局部面板需要效果 | 设置 `materialSelf = false` |
| 前景页面容器已经使用 `material()` | 设置 `materialSelf = false`，避免重复覆盖 |

## 主背景与次背景 {#layers}

`material()` 对应 `MaterialLayer.Background`，适合页面底层；`subMaterial()` 对应 `MaterialLayer.SubBackground`，适合其上的卡片和面板。它们选择不同的样式，但都采样注册的原始背景源。嵌套的次背景不会再次模糊父容器已经绘制的主材质结果。

裁剪形状时，先 `clip`，再应用材质，最后添加内容边距：

```kotlin
Modifier
    .clip(SaltTheme.shapes.medium)
    .subMaterial(fallback = SaltTheme.colors.subBackground)
    .innerPadding()
```

### 配合现有容器 {#containers}

`Card`、`RoundedColumn` 和 `ScreenCard` 在指定背景颜色时已经使用次级材质，不需要再加一次 `subMaterial()`。

```kotlin
ScreenCard(
    header = "播放"
) {
    ItemButton(
        onClick = onOpenEqualizer,
        text = "均衡器"
    )
}
```

这类容器的 `color` 作为没有材质作用域时的背景色。传入 `Color.Unspecified` 会省略容器自身的材质与背景；描边等其他行为由对应组件参数控制。布局与分区见[构建页面](/program/salt-ui/screen)。

## 动态源与静态源 {#source-mode}

`MaterialSourceMode` 描述背景内容是否变化，不控制前景组件是否重组，也不冻结背景 Composable。

| 模式 | 适用内容 | 行为 |
| --- | --- | --- |
| `Dynamic` | 视频、动画、持续变化的背景 | 默认模式，按动态绘制路径采样 |
| `Static(key)` | 壁纸、已经加载完成且不再变化的图片或渐变 | 允许缓存材质结果，依赖变化时重新生成 |

```kotlin
MaterialSource(
    modifier = Modifier.fillMaxSize(),
    materialSelf = false,
    mode = MaterialSourceMode.Dynamic
) {
    // 视频或动画背景。
}
```

静态模式支持 `BlurryGlass`、`Acrylic`、`Mica` 和 `Premium`，不限于 Mica。选择 Static 是允许缓存的声明，不保证任何布局都使用缓存。

### 如何选择 key {#key}

`Static.key` 是必填、非空的 `Any`，通过 `equals` 比较。使用不可变且相等性稳定的值；同样的背景保持同样的 key，背景像素需要更新时才更换。

| 背景变化 | key 的处理 |
| --- | --- |
| 前景按钮点击、计数或列表滚动 | 源像素未变时，不必更换 |
| 切换壁纸文件或图片内容版本 | 使用新的内容版本 |
| 同一 URL 的图片从占位图加载为最终图片 | 完成加载时更新版本，或加载期间使用 Dynamic |
| 背景颜色、裁剪方式或背景内容中的业务状态变化 | 如果改变源像素，需要更新 |
| 完全固定的背景，没有外部变化 | 可以使用 `Unit` |

```kotlin
val sourceMode = if (wallpaperReady) {
    MaterialSourceMode.Static(key = wallpaperVersion)
} else {
    MaterialSourceMode.Dynamic
}
```

这里的 `wallpaperReady` 和 `wallpaperVersion` 由图片加载状态提供。只用 URL 作为 key，无法表达同一 URL 从占位图到最终图片的变化。不要在每次重组时生成随机 key 或当前时间，那会持续使缓存失效。

源尺寸、密度、布局方向、主题明暗和材质样式等渲染依赖由内部跟踪；业务引起的源像素变化仍由调用方通过 key 表达。相等的 `Static(key)` 值不会仅因重新创建对象而使内容缓存失效。

## 主题与作用域 {#scope}

每次调用 `SaltTheme` 都创建自己的材质作用域。背景源和消费者必须处在同一个作用域，内层 `SaltTheme` 不会自动沿用外层注册的背景源。不要给每张卡片单独套一层 `SaltTheme`，再期望它采样外层壁纸。

深色页面通过 `SaltTheme(configs = SaltConfigs.default(isDarkTheme = true), ...)` 配置。`material(isDarkTheme = ...)` 和 `subMaterial(isDarkTheme = ...)` 只调整该效果的明暗样式，不会同时切换文字、图标和页面配色。完整主题配置见[主题](/program/salt-ui/foundations/theme)。

## 禁用与回退 {#fallback}

`DisableMaterial` 为子内容关闭材质作用域，常用于不适合采样页面背景的弹层。配合显式 `fallback` 使用：

```kotlin
DisableMaterial {
    Box(
        modifier = Modifier
            .clip(SaltTheme.shapes.medium)
            .subMaterial(fallback = SaltTheme.colors.popup)
            .innerPadding()
    ) {
        Text(text = "独立面板")
    }
}
```

`MaterialType.None` 或 `DisableMaterial` 下，材质 Modifier 绘制 `fallback`，默认 `Color.Unspecified` 不提供背景。缓存不适用或读回失败时，组件回到动态材质管线，并不是改为绘制 `fallback`。缺少背景源也不等同于关闭材质，接入时应先检查源的作用域和布局。

## 缓存条件与成本 {#cache}

当前缓存适用于同一主题作用域内只有一个源、消费者完全位于源范围内、相对变换只有平移的情况。多个源、消费者越界、相对缩放或旋转、继承自定义 `LocalHazeBlurStyle` 时使用动态管线。内存预算不足、平台读回不支持或分配失败时也保留动态效果。

初始帧使用动态绘制。尺寸稳定经过两帧加 80 ms 后才开始准备烘焙；这不是缓存必定在 80 ms 内完成的承诺。切换 key、环境或尺寸后会重新生成；同一样式的消费者共享一份结果，不同样式可能分别占用缓存。

### 内存 {#memory}

当前实现以源宽、高各一半的尺寸存储 ARGB 位图，保留透明度和颜色精度，再缩放绘制。因此静态结果和动态渲染的目标风格一致，但不承诺逐像素完全相同。

| 原始源尺寸（物理像素） | 缓存尺寸 | 每份样式位图 | 两份样式位图 |
| --- | --- | --- | --- |
| 1080 × 2280 | 540 × 1140 | 约 2.35 MiB | 约 4.70 MiB |
| 1440 × 3040 | 720 × 1520 | 约 4.17 MiB | 约 8.35 MiB |

位图成本约为 `缓存宽 × 缓存高 × 4 字节`。主、次背景若使用不同样式，可能各占一份；同样式的多个面板则共享。每个源最多预留 16 MiB 位图预算，预算不包括临时捕获资源、GPU 纹理和驱动副本，也不等于进程总内存上限。

动态绘制已有的显示结果不等于可复用的静态缓存。静态模式额外保留处理后的背景像素，以减少后续模糊计算。所有消费者离开后，当前实现最多保留一份已完成且暂时不用的位图供再次进入使用；失效或需要容纳其他样式时可淘汰它。释放引用也不代表进程内存指标立即下降。

### 性能 {#performance}

缓存烘焙覆盖整个源，而不是只覆盖小面板。大面积或共享材质可以减少重复效果计算；只有一个小面板时，整张源的烘焙和额外内存未必值得。优先保持默认 Dynamic，再针对目标页面测量决定。

不要把单个模拟器的 GPU 耗时当作所有设备的帧率提升。评估时同时比较稳定阶段的帧耗时、烘焙期间最长帧、缓存完成时间、位图分配和进程内存。SaltUI 源码仓库提供 Android 12+ 的测量脚本：

```powershell
./scripts/benchmark-material-cache.ps1 -Device <adb-device-serial>
```

报告生成在源码仓库的 `androidApp/build/reports/material-cache-performance` 下，包含动态与静态的重复对照。使用方法和统计范围见[源码 README 的静态材质说明](https://github.com/Moriafly/SaltUI#static-material-backgrounds)。

## 自定义 Haze 样式 {#haze-styles}

`SaltHazeStyles` 提供 `blurryGlass`、`acrylic`、`mica`、`premium`，按 `MaterialLayer` 和明暗模式返回预设 `HazeBlurStyle`。可以配合自己管理的 Haze 背景源使用；这样使用预设不等于接入了 `MaterialSource` 的缓存管理。

## 常见问题 {#faq}

| 现象 | 检查方向 |
| --- | --- |
| 没有效果或没有预期的壁纸 | 确认类型不为 None、源有尺寸、源实际绘制了内容，且与消费者在同一 SaltTheme 中 |
| 前景清晰但背景变更后材质仍旧 | 检查 Static.key 是否表达了新的源像素，包括异步图片加载完成 |
| Static 后仍然使用动态效果 | 检查多源、越界、相对变换、自定义 Haze 样式、预算和读回条件 |
| 整页材质过重 | 检查 materialSelf 是否与前景 material() 重复叠加 |
| 卡片重复叠加效果 | Card、RoundedColumn、ScreenCard 已提供次级材质，省略额外 subMaterial() |
| 只有局部材质想深色，但文字不协调 | 在主题层统一明暗配置，而不是只改材质 Modifier 的 isDarkTheme |

实际体验可在 Sample 中进入「Material → Material cache test」，切换类型、动态 / 静态、面板布局和背景版本。Sample 是交互与视觉检查入口，性能结论仍以独立测量为准。
