# 音频格式支持

## WAV-DTS <Badge type="tip" text="预计 1.14 版本支持" />

WAV 容器封装的 DTS 编码音频。

### 概述

WAV-DTS 是一种将 DTS（Digital Theater Systems）压缩音频位流封装于标准 WAV 文件容器中的特殊格式。此类文件使用 `.wav` 扩展名，但内部数据采用 DTS 压缩编码替代常规 PCM 数据。

WAV-DTS 与标准 WAV 文件的主要区别在于音频数据的编码方式。标准 WAV 文件通常包含 PCM 未压缩音频，而 WAV-DTS 文件的音频数据经过 DTS 压缩编码，在同等采样率下可显著减少文件体积，同时支持多声道环绕声。

WAV-DTS 常见于 DVD 音频提取及多声道音频发行场景。SPW 支持自动识别并播放 WAV-DTS 文件，无需手动配置。

### 支持格式

SPW 支持以下 DTS 变体的播放：

| 格式 | 说明 |
|:---|:---|
| DTS Core | 标准 DTS Coherent Acoustics 核心编码，支持最高 5.1 声道，是最常见的 DTS 格式。 |
| DTS-HD | 高分辨率扩展格式，包含 Extension Sub-Stream，支持更高采样率和更多声道。 |
| DTS 14-bit | 14-bit 位深变体，常见于部分 DVD 音频流。 |
| S/PDIF 封装 DTS | 符合 IEC 61937 标准的突发模式封装，常见于数字音频传输场景。 |

### 文件要求

- 仅支持扩展名为 `.wav` 的 WAV-DTS 文件。
- 不支持扩展名为 `.dts` 的裸 DTS 位流文件。

### 使用

将 WAV-DTS 文件加入音乐库后，SPW 会自动完成格式识别并正常播放。
