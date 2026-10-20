# Navigation 模块

`salt-ui-navigation` 提供基于 [Navigation 3](https://developer.android.com/develop/ui/compose/navigation3) 的导航栈管理，属于非稳定 API，使用时需要标注 `@OptIn(UnstableSaltUiApi::class)`。

```kotlin
implementation("io.github.moriafly:salt-ui-navigation:<TAG>")
```

## SaltNavigator {#saltnavigator}

`SaltNavigator` 是一个有状态的导航器，维护两个协作的栈：

- **Back stack（返回栈）**：主历史记录，最后一个元素代表当前可见的页面。
- **Forward stack（前进栈）**：曾被弹出页面的次级历史记录，支持浏览器式的前进导航。

导航到 `topLevelRoutes` 中的路由时，返回栈会收缩为单个元素并替换根路由，与底部栏或侧边栏导航的行为一致。前进栈的所有变更对 Compose 可观察，UI 可以据此响应前进操作的可用性（例如显示或隐藏前进按钮）。

### 导航行为 {#navigate}

`navigate(route)`：

- 若 `route` 与返回栈顶部相同，调用为空操作。
- 若 `route` 属于 `topLevelRoutes`，返回栈清空（仅保留根）并替换根路由，同时清空前进栈。
- 否则 `route` 压入返回栈，并清空前进栈。

`back()` 将当前路由从返回栈弹出并压入前进栈；返回栈仅剩根路由时无效果。

`forward()` 将最近的前进栈路由弹回返回栈；前进栈为空时无效果。

## rememberSaltNavigator {#remembersaltnavigator}

创建并记住一个可在配置变更后存活的 `SaltNavigator`。返回栈通过 `rememberNavBackStack` 自动保存和恢复，前进栈通过 `rememberSaveable` 配合自定义 `Saver` 持久化。

```kotlin
@Composable
fun rememberSaltNavigator(
    configuration: SavedStateConfiguration,
    initRoute: NavKey,
    topLevelRoutes: Set<NavKey>
): SaltNavigator
```

- `configuration`：用于返回栈与前进栈序列化的 `SavedStateConfiguration`，必须包含所有会被压入两个栈的 `NavKey` 实现的多态序列化器。
- `initRoute`：初始路由，必须存在于 `topLevelRoutes` 中，否则抛出 `IllegalArgumentException`。

### 使用示例 {#example}

```kotlin
@OptIn(UnstableSaltUiApi::class)
@Composable
fun App() {
    val navigator = rememberSaltNavigator(
        configuration = SavedStateConfiguration {
            polymorphic(NavKey::class) { subclass(Home::class) }
        },
        initRoute = Home,
        topLevelRoutes = setOf(Home, Library, Settings)
    )
    // ...
}
```
