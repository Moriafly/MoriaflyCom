# 滚动与列表

先根据内容规模选择容器，再按需要调整吸附和越界滚动。页面标题栏与安全区域的处理见[构建页面](/program/salt-ui/screen#content-area)。

## 普通滚动与 Lazy 布局 {#lazy}

少量且固定的设置分区可放在 `Column` 配合 `verticalScroll` 中；较多或动态增长的内容优先使用 Lazy 容器，避免一次组合全部内容。

Salt UI 在 `com.moriafly.salt.ui.lazy`、`lazy.grid`、`lazy.staggeredgrid` 和 `pager` 中提供了 Lazy 列表、网格、瀑布流和分页实现。它们基于 Compose 的布局模型调整，不应仅凭同名 API 假定所有参数与官方版本完全一致。

```kotlin
import com.moriafly.salt.ui.lazy.LazyColumn
import com.moriafly.salt.ui.lazy.items

LazyColumn(
    contentPadding = contentPadding
) {
    items(
        items = songs,
        key = { it.id }
    ) { song ->
        Text(text = song.title)
    }
}
```

示例中的 `songs` 由业务提供，`id` 是稳定且唯一的条目标识；`contentPadding` 可以直接使用 BasicScreen 提供的值。不要给每一项使用同一个 key，也不要每次重排后使用不稳定的临时标识。

## 滑动吸附 {#snapping}

`com.moriafly.salt.ui.gestures.snapping` 提供 `SnapFlingBehavior` 及相应布局信息适配器：

| 布局 | 信息提供器 |
| --- | --- |
| Lazy 列表 | `LazyListSnapLayoutInfoProvider` |
| Lazy 网格 | `LazyGridSnapLayoutInfoProvider` |
| Pager | `PagerSnapLayoutInfoProvider` |

吸附适合分页或需要对齐的浏览，不必给普通设置列表强行加入。接口以[滑动吸附源码](https://github.com/Moriafly/SaltUI/tree/main/ui2/src/commonMain/kotlin/com/moriafly/salt/ui/gestures/snapping)为准。

## Cupertino 滚动 {#cupertino-scroll}

Salt UI 提供橡皮筋越界回弹与惯性滚动。全局和单容器的配置见[Cupertino 过渡滚动](/program/salt-ui/screen#cupertino-scroll)。嵌套的横向或纵向滚动区域应按边缘选择越界行为，避免手势争抢。

## 材质面板与滚动 {#material}

前景列表滚动不等于背景源变化。壁纸不变时，静态源可以继续使用同一个 key；如果被采样的内容本身就是滚动背景，则应该使用 Dynamic，或在其像素变化时更新 key。

消费者移出背景源的覆盖范围或发生相对缩放、旋转时，当前材质实现会选择动态绘制。不要为了保持缓存而改变正确的布局行为。更多规则见[材质](/program/salt-ui/foundations/material#cache)。
