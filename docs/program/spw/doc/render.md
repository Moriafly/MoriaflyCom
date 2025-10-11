# 渲染

SPW 支持选择 DirectX 或 OpenGL 加速渲染界面。

对于 Windows 10 默认使用 OpenGL 渲染，而对于 Windows 11 默认使用 DirectX 渲染。

## OpenGL 兼容性问题

在 Windows 11 上启用 OpenGL 并同时选择了亚克力、云母或云母 Alt 效果可能会导致窗口背景问题。

若使用 NVIDIA 显卡，检查是否启用了 DXGI 交换链模式，若使用 AMD 显卡，检查是否开启了显示器 HDR 功能。

原因在于 OpenGL 在特定驱动程序设置下与桌面窗口管理器（DWM）的交互。无论是 NVIDIA 的 DXGI 交换链 模式还是 AMD 的 HDR 功能，它们的共同点是强制将传统的 OpenGL 渲染结果通过 DirectX 的交换链（DXGI Swap Chain）来呈现到屏幕上，而这个由驱动程序在“后台”创建的交换链默认是不支持透明的，从而导致问题。