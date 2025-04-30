# Salt UI

Light, simple, and user-friendly.

## Introduction

Salt UI is UI components based on [Compose Multiplatform](https://github.com/JetBrains/compose-multiplatform). The 1.0 version is derived from some UI components of [Salt Player](https://github.com/Moriafly/SaltPlayerSource). Currently, Salt UI is used in Salt Player, Emo Scroll, Qinalt and other App to serve hundreds of thousands of users.

## Compatibility

See [Compatibility](https://github.com/Moriafly/SaltUI?tab=readme-ov-file#compatibility).

## Get started

Salt UI is now available on Maven Central. Click the badge below to visit its distribution page, which displays the latest release version.

[![Maven Central](https://img.shields.io/maven-central/v/io.github.moriafly/salt-ui)](https://search.maven.org/search?q=g:io.github.moriafly)

Then add dependency in your project:

```kotlin
// Replace <TAG> with the latest version
// e.g. implementation("io.github.moriafly:salt-ui:2.4.0-alpha03")
implementation("io.github.moriafly:salt-ui:<TAG>")
```

Simple start:

```kotlin
@Composable
fun App() {
    SaltTheme(
        configs = saltConfigs()
    ) {
        // ...
    }
}
```

See demo: [composeApp](https://github.com/Moriafly/SaltUI/tree/main/composeApp).

## Docs

Once you've added the Salt UI dependency and synced your project, you're ready to use Salt UI.

### Prerequisites

If you're using ​Compose Material or ​Material3, note that ​Salt UI is not a full replacement. However, if you need to use them together, you may need to replace some foundational components:

```kotlin
import androidx.compose.material.Text // [!code --]
import androidx.compose.material3.Text // [!code --]
import com.moriafly.salt.ui.Text // [!code ++]
```

```kotlin
import androidx.compose.material.Icon // [!code --]
import androidx.compose.material3.Icon // [!code --]
import com.moriafly.salt.ui.Icon // [!code ++]
```

### Theme

Theme is a key part of Salt UI. You can apply `SaltTheme` where needed, similar to how you'd use `MaterialTheme`.

But it also differs in many ways. Below is the function declaration for `SaltTheme`:

```kotlin
@Composable
fun SaltTheme(
    configs: SaltConfigs,
    dynamicColors: SaltDynamicColors = SaltDynamicColors(
        light = lightSaltColors(),
        dark = darkSaltColors()
    ),
    textStyles: SaltTextStyles = SaltTheme.textStyles,
    dimens: SaltDimens = SaltTheme.dimens,
    shapes: SaltShapes = SaltTheme.shapes,
    content: @Composable () -> Unit
)
```

### saltConfigs

In `SaltTheme`, the `configs` parameter is required, like this:

```kotlin
SaltTheme(
    configs = SaltConfigs(
        isDarkTheme = false,
        indication = AlphaIndication
    )
)
```

The `isDarkTheme` parameter specifies whether dark mode is enabled. Therefore, other parts of your code can check `SaltTheme.configs.isDarkTheme` to determine if dark mode is active.

```kotlin
if (SaltTheme.config.isDarkTheme) {
    // Do somethings.
}
```

The `indication` handles press feedback. By default, Salt UI uses its built-in `AlphaIndication` effect. To use Android's Material ripple effect instead, specify `ripple()`.

### dynamicColors


### 