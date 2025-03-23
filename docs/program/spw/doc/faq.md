# FAQ

## 无法启动安装程序？

检查是否将安装程序（EXE 文件）的属性设置了安全锁定，见下图：

![安装程序属性](install-property.png)

尝试勾选“解除锁定”应用后重新运行安装程序。

## 安装缓慢？

安装包会请求 UAC，也可能是因为存在 Windows 安全中心云端检查信誉，参考来源：https://bbs.pcbeta.com/viewthread-2018233-1-1.html。

## 蓝屏 0x116_IMAGE_nvlddmkm.sys？

由 ​NVIDIA 显卡驱动（nvlddmkm.sys）引发的 ​VIDEO_TDR_FAILURE (116) 错误，属于显卡驱动与系统交互失败导致的保护性崩溃，尝试更新显卡驱动。