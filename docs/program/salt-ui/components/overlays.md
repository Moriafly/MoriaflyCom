# 弹层与对话框

根据任务的范围选择弹层：就地操作使用菜单，需要确认的短任务使用对话框，较完整的临时任务使用 Sheet。需要新的桌面原生窗口时，使用 Desktop 的窗口组件。

## 选择组件 {#dialogs}

| 场景 | 组件 | 说明 |
| --- | --- | --- |
| 锚点附近的菜单 | `PopupMenu`、`PopupMenuItem` | 通过 PopupState 管理菜单状态 |
| 设置项的弹出选择 | `ItemDropdown` | 复用设置项布局与当前值展示 |
| 通用弹出内容 | `Popup` | 自定义内容与锚点布局 |
| 模态确认或简短任务 | `Dialog` | 使用库内跨平台对话框 |
| 移动页面 / 桌面对话框适配 | `AdaptiveDialog` | 随平台使用不同承载形式 |
| 临时面板、选择或表单 | `Sheet` | 显隐、关闭方式、停靠高度与状态保留见 [Sheet](/program/salt-ui/sheet) |
| Android 底部对话框 | `BottomSheetDialog` | Android 平台专用 |
| 独立桌面窗口 | `SaltDialogWindow` | 见 [Desktop](/program/salt-ui/desktop#saltdialogwindow) |

## 菜单状态 {#popup}

使用 `rememberPopupState()` 创建菜单状态，再把同一个 state 传给触发入口和菜单。对于常见的设置选项，优先让 `ItemDropdown` 组织这部分结构，避免重复处理条目布局。

具体接口见 [Popup 源码目录](https://github.com/Moriafly/SaltUI/tree/main/ui2/src/commonMain/kotlin/com/moriafly/salt/ui/popup)。

## Sheet 与 Scaffold {#bottomsheetscaffold}

`Sheet` 是独立的模态任务面板；`BottomSheetScaffold` 用于把底部面板放进页面骨架。二者的状态模型和使用场景不同。

```kotlin
BottomSheetScaffold(
    sheetContent = {
        Text(text = "面板内容")
    }
) {
    Text(text = "页面内容")
}
```

`BottomSheetScaffold` 提供 `nestedScrollConnection` 参数，供需要控制面板与正文嵌套滚动的场景使用。新建模态面板先阅读 [Sheet 使用说明](/program/salt-ui/sheet)，不要直接套用 Scaffold 的状态逻辑。

## 背景材质 {#material}

弹层可能使用不同的原生承载和坐标空间，不应默认依赖页面壁纸的采样。需要独立背景时，通过 `DisableMaterial` 包裹内容，并提供明确的背景色。材质源、作用域与回退的区别见[材质](/program/salt-ui/foundations/material#fallback)。
