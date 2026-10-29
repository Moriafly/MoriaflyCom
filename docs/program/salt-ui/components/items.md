# Item 元项

Item 用来组合设置、配置和信息列表。页面级分组优先使用 `ScreenCard`；需要自己控制外部标题和间距时，使用 `RoundedColumn` 配合 `ItemOuter…` 组件。

## 一个设置分区 {#example}

```kotlin
@OptIn(UnstableSaltUiApi::class)
@Composable
fun PlaybackSettings(
    onOpenEqualizer: () -> Unit
) {
    var enabled by rememberSaveable { mutableStateOf(false) }

    ScreenCard(
        header = "播放",
        footer = "关闭后将使用默认播放行为。"
    ) {
        ItemSwitcher(
            state = enabled,
            onChange = { enabled = it },
            text = "启用播放增强"
        )
        Item(
            onClick = onOpenEqualizer,
            text = "均衡器"
        )
    }
}
```

示例的开关状态属于调用页面。需要跨页面共享或持久保存时，将状态与回调提升到业务层；组件本身不负责保存应用设置。

## 选择组件 {#item}

| 需求 | 组件 | 使用说明 |
| --- | --- | --- |
| 页面跳转或打开操作 | `Item` | 通过 `onClick` 交给调用方处理 |
| 布尔设置 | `ItemSwitcher` | 使用 `state` 和 `onChange`，整行具备开关交互 |
| 勾选项 | `ItemCheck` | 用于选择状态，避免再给外层叠加第二套点击逻辑 |
| 标题与值 | `ItemValue` | 展示属性，不需要用输入框模拟只读信息 |
| 单行编辑 | `ItemEdit` | 编辑状态与提交行为由页面控制 |
| 密码编辑 | `ItemEditPassword` | 密码输入场景 |
| 连续数值 | `ItemSlider` | 同时向用户表达数值或单位 |
| 操作按钮 | `ItemButton` | 立即执行操作；跳转到下一级优先使用 Item |
| 弹出选择 | `ItemDropdown` | 展示当前值，内容中放置菜单选项 |
| 提示信息 | `ItemTip`、`ItemInfo` | 补充解释，后者支持带图标与颜色的信息 |
| 分隔与间距 | `ItemDivider`、`ItemSpacer` | 仅在确实存在内容分组时使用 |

完整的参数声明以[当前 Item 源码](https://github.com/Moriafly/SaltUI/blob/main/ui2/src/commonMain/kotlin/com/moriafly/salt/ui/Item.kt)和 [ItemDropdown 源码](https://github.com/Moriafly/SaltUI/blob/main/ui2/src/commonMain/kotlin/com/moriafly/salt/ui/ItemDropdown.kt)为准。

## 外部标题与说明 {#outer}

`ItemOuter…` 放在分组容器外面，不要放进卡片正文来模拟分区标题。

| 组件 | 作用 |
| --- | --- |
| `ItemOuterTitle` | 分组标题 |
| `ItemOuterTip` | 分组外的补充说明 |
| `ItemOuterLargeTitle` | 大标题 |
| `ItemOuterEdit` | 独立编辑区域 |
| `ItemOuterTextButton` | 分组外文本操作 |
| `ItemOuterSpacer`、`ItemOuterHalfSpacer` | 外部完整 / 半高间距 |

```kotlin
ItemOuterTitle(text = "播放")
RoundedColumn {
    Item(
        onClick = onOpenEqualizer,
        text = "均衡器"
    )
}
ItemOuterTip(text = "调整音频输出效果。")
```

需要同样结构的页面分区时，直接使用 `ScreenCard(header = ..., footer = ...)`，详见[构建页面](/program/salt-ui/screen#screencard)。

## 自定义元项 {#custom}

`ItemArrow` 和 `ItemPopupArrow` 是构建自定义条目时的视觉辅助组件。一般业务界面使用完整的 Item 或 ItemDropdown，即可同时复用布局与交互。

`ItemContainer` 是旧的内容边距容器；新建自定义内容优先使用 `Modifier.innerPadding()`。不要给已有 Item 再叠加同样的内边距。

背景方面，`RoundedColumn` 和 `ScreenCard` 已集成次级材质。添加背景源后，它们会使用当前主题的材质设置；无材质时使用容器颜色。见[材质与现有容器](/program/salt-ui/foundations/material#containers)。
