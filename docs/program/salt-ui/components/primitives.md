# 基础组件

本页按界面职责选择基础组件。设置列表见 [Item 元项](/program/salt-ui/components/items)，完整页面见[构建页面](/program/salt-ui/screen)，模态交互见[弹层与对话框](/program/salt-ui/components/overlays)。

## 文本与图标 {#content}

| 组件 | 用途 |
| --- | --- |
| `Text` | 读取 SaltTheme 文字样式与内容颜色 |
| `Icon` | 使用统一的图标着色；有交互含义的图标应提供描述 |
| `SaltIcons` | 库内提供的图标资源，可用于标题栏等通用操作 |

```kotlin
Text(
    text = "补充说明",
    style = SaltTheme.textStyles.sub,
    color = SaltTheme.colors.subText
)
```

注意导入 `com.moriafly.salt.ui.Text` 和 `com.moriafly.salt.ui.Icon`。与其他组件库混用时，详见[安装与接入](/program/salt-ui/getting-started/installation#compose-material)。

## 按钮与数值控制 {#controls}

| 组件 | 用途 |
| --- | --- |
| `Button` | 常规操作按钮 |
| `BasicButton` | 更底层的按钮内容与样式组合 |
| `PillButton` | 胶囊形或圆形按钮 |
| `Switcher` | 独立布尔开关 |
| `Slider` | 独立连续数值输入 |

```kotlin
Button(
    onClick = onSave,
    text = "保存"
)
```

在设置分组内需要标题、说明和整行交互时，优先使用 `ItemSwitcher`、`ItemSlider` 或 `ItemButton`。状态与操作交给调用方，避免在基础控件外额外叠加相同的点击行为。

## 内容容器 {#containers}

| 组件 | 选择方式 |
| --- | --- |
| `Card` | 圆角、裁剪、背景和可选描边；内容垂直排列，不自动添加正文内边距 |
| `RoundedColumn` | 带页面外边距的分组容器，适合已有 Item 组合 |
| `ScreenCard` | 页面分区，由标题、Card 和说明组成，见[页面指南](/program/salt-ui/screen#screencard) |
| `Surface` | 提供容器语义与输入处理；背景由调用方的 Modifier 明确设置 |
| `JustifiedRow` | 两端对齐的横向排列，可配置内容间距 |

```kotlin
@OptIn(UnstableSaltUiApi::class)
@Composable
fun InfoCard() {
    Card {
        Text(
            text = "卡片内容",
            modifier = Modifier.innerPadding()
        )
    }
}
```

`Card`、`RoundedColumn` 与 `ScreenCard` 已提供次级材质，不要再手动重复添加 `subMaterial()`。传 `color = Color.Unspecified` 会省略相应背景材质，其他参数独立生效。详见[材质](/program/salt-ui/foundations/material#containers)。

## 页面栏 {#bars}

| 组件 | 用途 |
| --- | --- |
| `TitleBar` | 需要自行组合页面时使用的标题栏 |
| `BottomBar`、`BottomBarItem` | 底部导航栏及其条目 |
| `TitleBarButton` | 标题栏操作，见[构建页面](/program/salt-ui/screen#titlebarbutton) |

如果没有自定义页面骨架的需求，先使用 `BasicScreen`，由它统一处理标题栏与内容安全区域。Desktop 原生窗口标题栏另见 [Desktop](/program/salt-ui/desktop)。
