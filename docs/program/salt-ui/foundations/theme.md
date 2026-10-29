# 主题

`SaltTheme` 为子树提供颜色、文字样式、间距、形状和交互反馈。把它放在应用或独立窗口的入口，再让组件从 `SaltTheme` 读取设计值。

## 基础配置 {#theme}

```kotlin
SaltTheme(
    configs = SaltConfigs.default(isDarkTheme = isDarkTheme),
    dynamicColors = SaltDynamicColors(
        light = SaltColors.defaultLight(),
        dark = SaltColors.defaultDark()
    )
) {
    // 应用内容。
}
```

这里的 `isDarkTheme` 由应用设置或系统状态提供。`SaltConfigs.default()` 默认使用浅色；跟随系统需要显式传入系统明暗值。新代码优先使用 `SaltConfigs.default()`、`SaltColors.defaultLight()` 和 `SaltColors.defaultDark()`，旧的 `saltConfigs()` 等工厂已弃用。

| 配置 | 作用 |
| --- | --- |
| `configs` | 深浅色模式与交互反馈 |
| `dynamicColors` | 浅色和深色两组颜色 |
| `textStyles` | 文字层级，不含文字颜色 |
| `dimens` | 组件尺寸与间距 |
| `shapes` | 形状与圆角 |
| `material` | 背景材质类型，非稳定 API |
| `basicScreenStyle` | 页面骨架的默认外观，非稳定 API |

## 明暗模式与反馈 {#saltconfigs}

`SaltConfigs` 包含 `isDarkTheme` 和 `indication`。通过 `copy` 修改已有配置，可以保留应用设置的交互反馈：

```kotlin
SaltTheme(
    configs = SaltTheme.configs.copy(isDarkTheme = true)
) {
    Text(text = "深色内容")
}
```

在组合中读取 `SaltTheme.configs.isDarkTheme`。默认交互反馈为 `AlphaIndication`；如果项目已经使用其他 `Indication`，可通过 `SaltConfigs.default(indication = ...)` 传入。

嵌套主题适合隔离预览或独立的界面区域。使用材质时，每次 `SaltTheme` 调用都会拥有独立的背景源作用域；只想调整局部明暗且保持现有材质源时，可使用标记为非稳定 API 的 `ChangeSaltThemeIsDark(isDarkTheme = ...) { ... }`。作用域规则见[材质](/program/salt-ui/foundations/material#scope)。

## 颜色 {#saltdynamiccolors}

`SaltDynamicColors` 同时保存 `light` 和 `dark` 两组 `SaltColors`。组件通过 `SaltTheme.colors` 读取当前明暗模式对应的一组。

### SaltColors {#saltcolors}

| 属性 | 用途 |
| --- | --- |
| `highlight` | 强调色、主要操作 |
| `onHighlight` | 强调色上的文字与图标 |
| `text` | 主要文本与图标 |
| `subText` | 次要文本 |
| `background` | 页面主背景 |
| `subBackground` | 卡片、分组等次背景 |
| `popup` | 弹出界面背景 |
| `stroke` | 描边与边界 |
| `success` | 成功状态 |
| `warning` | 警告状态 |
| `error` | 错误状态 |

优先基于默认配色修改需要的字段，保留其余平台默认值：

```kotlin
SaltTheme(
    dynamicColors = SaltDynamicColors(
        light = SaltColors.defaultLight(highlight = Color(0xFF006C4C)),
        dark = SaltColors.defaultDark(highlight = Color(0xFF70DBAF))
    )
) {
    // 使用自定义强调色。
}
```

### 从 Material 3 映射颜色 {#material3-colors}

项目已经有 `ColorScheme` 时，可以在应用层定义映射。下面假设项目已有 Material 3 依赖，Salt UI 本身不要求为此额外引入它：

```kotlin
fun ColorScheme.toSaltColors(): SaltColors = SaltColors.defaultLight(
    highlight = primary,
    onHighlight = onPrimary,
    text = onSurface,
    subText = onSurfaceVariant,
    background = background,
    subBackground = surface,
    popup = surfaceContainer,
    stroke = outline,
    error = error
)
```

这是映射示例，不是内置转换 API。成功与警告色可继续按产品配色补全；为深色方案映射时，以 `SaltColors.defaultDark(...)` 为基底保留相应的未映射默认色。

## 文字样式 {#salttextstyles}

`SaltTheme.textStyles` 提供不含颜色的文字样式。常用层级如下：

| 属性 | 用途 |
| --- | --- |
| `main` | 主文本 |
| `sub` | 次要文本 |
| `paragraph` | 段落正文 |

```kotlin
Text(
    text = "补充说明",
    style = SaltTheme.textStyles.sub,
    color = SaltTheme.colors.subText
)
```

## 尺寸与间距 {#saltdimens}

| 属性 | 用途 |
| --- | --- |
| `item` | Item 的最小高度 |
| `itemIcon` | Item 图标尺寸 |
| `padding` | 主要边距 |
| `subPadding` | 次要边距 |

使用 `SaltTheme.dimens` 与 `Modifier.innerPadding()` 保持内容节奏。`Card` 本身不添加内容内边距；Item 已有自己的内容边距，不要在整组 Item 外重复叠加。页面分区的外边距由 `ScreenCard` 等容器处理。

旧的 `SaltDimens.corner`、`dialogCorner` 已弃用，圆角改由形状配置负责。

## 形状 {#saltshapes}

`SaltTheme.shapes` 提供 `small`、`medium`、`large`。自定义容器可使用同一形状裁剪和描边；裁剪背景材质时，应先 `clip` 再应用材质 Modifier。

```kotlin
Box(
    modifier = Modifier
        .clip(SaltTheme.shapes.medium)
        .background(SaltTheme.colors.subBackground)
        .innerPadding()
) {
    Text(text = "自定义容器")
}
```

材质配置见[材质](/program/salt-ui/foundations/material)，页面默认外观见[构建页面](/program/salt-ui/screen#title-bar-backdrop)。
