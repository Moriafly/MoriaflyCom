# 构建页面

Salt UI 提供了一组相互配合的页面构建组件。使用 [BasicScreen](#basicscreen) 搭建页面骨架，使用 [ScreenCard](#screencard) 组织内容分区，使用 [TitleBarButton](#titlebarbutton) 放置标题栏操作，再用 [Cupertino 过渡滚动](#cupertino-scroll)为整个页面带来 iOS 风格的滚动手感。

这些组件属于非稳定 API，使用时需要标注 `@OptIn(UnstableSaltUiApi::class)`。

## BasicScreen {#basicscreen}

BasicScreen 是页面的骨架：一条标题栏，一层会随内容模糊的背景，以及一块完整留给你的内容区域。

使用 BasicScreen 创建一个带标题栏和返回按钮的页面，只需要一个返回回调：

```kotlin
BasicScreen(
    onBack = { },
    title = "设置"
) { contentPadding ->
    // 页面内容
}
```

标题栏的布局、系统状态栏等安全区域的避让、标题栏背后的模糊效果，Salt UI 都会处理好。在移动平台上，标题遵循各平台的原生字重（iOS 上为 Semibold）；在桌面上，标题与副标题横向排列，呈现桌面应用的习惯。

### 内容区域 {#content-area}

content 会接收一组 `contentPadding`。它已经包含了标题栏的高度和窗口安全区域，你的职责只是把它应用到滚动容器的首尾：

```kotlin
BasicScreen(
    onBack = { },
    title = "设置"
) { contentPadding ->
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(Modifier.height(contentPadding.calculateTopPadding()))

        // 页面内容

        Spacer(Modifier.height(contentPadding.calculateBottomPadding()))
    }
}
```

不要把内容直接写在标题栏的高度之内，也不要自行叠加状态栏高度——默认的 `BasicScreenDefaults.ContentPadding` 已经基于安全区域计算完毕。系统还会自动修正 bring-into-view 行为：当列表项或获得焦点的元素需要滚动进入视野时，Salt UI 会让它停在标题栏下方，而不是被标题栏遮住。

### 自定义标题栏前导操作 {#action-button}

onBack 是一个便捷重载，内部使用默认返回按钮。若需要替换它（例如改为关闭按钮）或干脆去掉，请使用 actionButton 重载：

```kotlin
BasicScreen(
    actionButton = {
        BasicScreenDefaults.BackButton(onBack = { })
    },
    title = "设置"
) { contentPadding ->
    // 页面内容
}
```

将 actionButton 置为 `null` 可以移除前导操作，标题随之靠左对齐。

### 添加工具栏按钮 {#tool-buttons}

toolButtons 位于标题栏末端，适合放置数量有限的页面级操作：

```kotlin
BasicScreen(
    onBack = { },
    title = "设置",
    toolButtons = {
        TitleBarButton(onClick = { /* ... */ }) {
            Icon(
                painter = rememberVectorPainter(SaltIcons.Check),
                contentDescription = null
            )
        }
    }
) { contentPadding ->
    // 页面内容
}
```

### 标题栏背景 {#title-bar-backdrop}

标题栏背后有三档视觉强度，由 `BasicScreenStyle.TitleBarBackdropType` 控制：

| 类型 | 效果 | 平台要求 |
|:--|:--|:--|
| `Progressive` | 渐进模糊，向下逐渐淡出，与内容自然衔接 | iOS；Android 13+ |
| `Mask` | 均匀模糊，向下渐隐遮罩 | 桌面平台；Android 12+ |
| `None` | 无背景效果 | 全平台 |

系统会根据运行平台自动选择该平台上效果最好的类型，并在不支持时逐级降级，因此通常无需手动指定。`isSupported()` 与 `supportedEntries()` 可用于自建设置界面时只展示当前平台真正可用的选项。要为某个页面单独指定，传入 style 参数；要全局调整，自定义 `SaltTheme` 的 `basicScreenStyle`。

### 最佳实践

- 让 BasicScreen 决定页面结构。不要在内容区再嵌套一层自定义标题栏。
- 通过 contentPadding 让内容从标题栏下方开始，而不是把 padding 写死为固定值。
- 标题保持简短。标题栏不会换行，过长的标题会被截断。
- 工具栏按钮放最常用的操作，数量以两三个为宜；低频操作交给页面内容本身。

## TitleBarButton {#titlebarbutton}

TitleBarButton 是放置在标题栏中的图标按钮。它以固定尺寸呈现——桌面平台为 36dp，触屏平台为 40dp——从而保证命中区域在各平台上都足够可靠。

```kotlin
TitleBarButton(
    onClick = { },
    icon = {
        Icon(
            painter = rememberVectorPainter(SaltIcons.Check),
            contentDescription = null
        )
    }
)
```

按压时图标以透明度变化给出反馈，禁用时整体自动降低不透明度，无需额外处理。

BasicScreen 的标题栏提供了三种按钮位：actionButton（前导）、title/subtitle（标题与副标题）、toolButtons（末端）。TitleBarButton 可以出现在其中任意位置，BasicScreenDefaults.BackButton 就是一个内置的例子。

## ScreenCard {#screencard}

ScreenCard 将分区标题、卡片容器与说明文字组合为一个完整的页面分区。它是此前「RoundedColumn 手动拼装」这一模式的替代品：

```kotlin
ScreenCard(
    header = "播放",
    footer = "更改将在重启应用后生效。"
) {
    Item(
        text = "均衡器",
        onClick = { }
    )
    Item(
        text = "倍速播放",
        onClick = { }
    )
}
```

header 以分区标题（ItemOuterTitle）显示在卡片上方，footer 以说明文字（ItemOuterTip）显示在卡片下方，两者皆可省略。卡片的圆角、背景与描边继承自 CardDefaults，与主题保持一致。

ScreenCard 不消费 BasicScreen 的 contentPadding。将它放在应用了 contentPadding 的滚动容器中，分区便会自然地从标题栏下方开始排列：

```kotlin
BasicScreen(
    onBack = { },
    title = "设置"
) { contentPadding ->
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
    ) {
        Spacer(Modifier.height(contentPadding.calculateTopPadding()))

        ScreenCard(header = "播放") {
            // 设置项
        }
        ScreenCard(header = "关于") {
            // 设置项
        }

        Spacer(Modifier.height(contentPadding.calculateBottomPadding()))
    }
}
```

### 最佳实践

- 一个分区只回答一个主题。标题写名词（「播放」「外观」），说明文字写后果与限制，不要重复标题。
- 同一分区内的条目保持同类。类型不同的操作分属不同的卡片。
- footer 用来解释「为什么不可用」「何时生效」这类卡片本身表达不了的信息。

## Cupertino 过渡滚动 {#cupertino-scroll}

`com.moriafly.salt.ui.gestures.cupertino` 提供了 iOS 风格的滚动体验：内容到达边缘时以橡皮筋的方式随手指移动并回弹，松手后的惯性遵循 UIScrollView 的衰减曲线。该实现逆向自 iOS 16 的真实行为，而非近似模拟。

| 组件 | 职责 |
|:--|:--|
| `CupertinoOverscrollEffect` | 橡皮筋回弹效果 |
| `CupertinoFlingBehavior` | 惯性滚动，含低速截停阈值 |
| `CupertinoScrollDecayAnimationSpec` | 衰减曲线，衰减率与 UIScrollView 默认值一致（0.998） |

在 iOS 上，Salt UI 的滚动容器默认已经使用这套惯性曲线，无需任何配置。在其他平台上，你可以手动启用。

### 全局启用 {#cupertino-global}

在应用根部提供 `CupertinoOverscrollEffectFactory`，所有滚动容器的越界滚动都会变为橡皮筋效果：

```kotlin
import androidx.compose.foundation.LocalOverscrollFactory
import com.moriafly.salt.ui.gestures.cupertino.CupertinoOverscrollEffectFactory

CompositionLocalProvider(
    LocalOverscrollFactory provides CupertinoOverscrollEffectFactory()
) {
    // 应用内容
}
```

### 单个容器启用 {#cupertino-single}

只想让某个滚动容器具备橡皮筋效果时，创建一个效果实例并传给滚动修饰符：

```kotlin
import com.moriafly.salt.ui.gestures.cupertino.rememberCupertinoOverscrollEffect

val overscrollEffect = rememberCupertinoOverscrollEffect()

Column(
    modifier = Modifier
        .verticalScroll(
            state = rememberScrollState(),
            overscrollEffect = overscrollEffect
        )
) {
    // 内容
}
```

`rememberCupertinoOverscrollEffect` 与 `CupertinoOverscrollEffectFactory` 支持按边缘禁用越界滚动（`allowTopOverscroll`、`allowBottomOverscroll`、`allowStartOverscroll`、`allowEndOverscroll`），例如让横向分页容器只在末端回弹。

### 最佳实践

- 全应用统一手感。要么全局启用，要么不用，避免同一应用内两套滚动体验。
- 惯性曲线在 iOS 上已默认生效，不要重复为 iOS 配置。
- 嵌套滚动（如页面内横向轮播）按边缘禁用越界，防止手势冲突。

## 综合示例 {#example}

将以上组件组合，即是一个典型的设置页面：

```kotlin
@OptIn(UnstableSaltUiApi::class)
@Composable
fun SettingsScreen(onBack: () -> Unit) {
    BasicScreen(
        onBack = onBack,
        title = "设置",
        toolButtons = {
            TitleBarButton(onClick = { /* 完成 */ }) {
                Icon(
                    painter = rememberVectorPainter(SaltIcons.Check),
                    contentDescription = null
                )
            }
        }
    ) { contentPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
        ) {
            Spacer(Modifier.height(contentPadding.calculateTopPadding()))

            ScreenCard(
                header = "外观",
                footer = "跟随系统时，将随系统深浅色自动切换。"
            ) {
                Item(
                    text = "主题",
                    onClick = { }
                )
            }

            ScreenCard(header = "关于") {
                Item(
                    text = "版本",
                    onClick = { }
                )
            }

            Spacer(Modifier.height(contentPadding.calculateBottomPadding()))
        }
    }
}
```
