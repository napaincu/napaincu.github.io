---
title: 'Dyna: A Model That Teaches Robots to Act via "Video Prediction"'
urlname: dyna-world-action-model-video-prediction
description: Dyna represents a World-Action Model approach that leverages video diffusion models to simultaneously predict future frame evolutions and robot actions from vast human egocentric videos, learning physical world dynamics to overcome traditional teleoperation data bottlenecks and achieve highly robust, cross-platform robot manipulation with minimal fine-tuning.
date: 2026-09-14
updatedAt: 2026-09-14
audiences:
  - application
  - researcher
  - developer
author: Wan-Chi Chang
affiliation: Department of Computer Science, National Tsing Hua University
tags:
  - dyna
  - world-action model
  - video prediction
featured: false
draft: false
---

**What is Dyna?** Dyna is a leading representative of the World-Action Model (WAM) approach. Unlike VLA (Vision-Language-Action) models, which "understand language and then generate actions," Dyna uses a video diffusion model to simultaneously predict "how the next frame will change" and "how the robot should move in the next step." Action generation is merely a shallow branch connected next to the video backbone.

**Why Train Alongside Videos?** Dyna's logic is that what robots lack is not linguistic common sense, but rather an intuition for how the physical world evolves—what happens when a hand touches an object, or how a rope gets knotted. This kind of knowledge cannot be learned from language models, but it is abundant in human first-person (egocentric) videos. Furthermore, such video data is practically unlimited and vastly cheaper than collecting demonstrations via teleoperated robotic arms. The researchers extract hand poses from videos to use as pseudo-action labels for training.

Experimental findings show that models trained solely on actions without generating video struggle to transfer to unseen robotic platforms. However, once "simultaneous future video prediction" is added, zero-shot performance significantly outperforms pure action training. Even simply feeding unlabelled human videos—used purely to learn video generation—continuously improves robot task performance. The videos themselves become a new source of data augmentation.

**Recent Developments** In April 2025, [_Unified World Models_](https://arxiv.org/abs/2504.02792), and in early 2026, [_DreamZero_](https://arxiv.org/abs/2602.15922), integrated world models with action synthesis into a single architecture. In August 2026, Dyna Robotics released [**Dyna-2**](https://www.dyna.co/dyna-2), pushing the pre-training scale to millions of hours of human egocentric video. This work validated for the first time that scaling human data yields power-law improvements and revealed a **"Human-to-Robot Transfer Scaling Law"**: even without seeing any robot data, expanding human video data alone leads to a simultaneous drop in offline prediction error for robot tasks. On physical robots, with just a few hours of robot demonstrations for post-training, the million-hour pre-trained model achieved top performance across dual-arm, dexterous hand, and semi-humanoid platforms. It even learned to open bottle caps with only ten minutes of teleoperated data, demonstrating high robustness against lighting changes, visual occlusions, and persistent disturbances.

The Dyna approach is currently explored by only a few teams due to its higher training costs, and whether it can continuously scale to tens of millions of hours remains unknown. Nevertheless, it offers a distinct alternative to VLA: rather than borrowing linguistic common sense, it allows the model to directly learn how the world changes.

Most intriguing is a counterintuitive detail: feeding more pure video data consistently helps robot tasks, but has almost no effect—or even slightly degrades performance—when predicting human actions themselves. The same batch of data works for "crossing over to another body," but is ineffective for "staying in the original body." This suggests that video prediction learns not "how to move," but rather "how the world changes." Although human hands and robot grippers look completely different, physical rules—such as a pushed cup rolling or a pulled rope tightening—apply universally. If this path proves viable, the data bottleneck for robotics shifts from _"how many people are willing to teleoperate arms"_ to _"how many people's lives are recorded."_ And that brings up a much harder question: _whose lives, and with whose consent?_

🔗 **Further Reading**

**Featured Work**

- [**Dyna-2 Technical Report**](https://www.dyna.co/dyna-2) | Dyna Robotics, 2026

**World Models × Action**

- [**Unified World Models**](https://arxiv.org/abs/2504.02792) | Coupled Pre-training of Video and Action Diffusion
- [**DreamZero**](https://arxiv.org/abs/2602.15922) | World Action Models are Zero-shot Policies
- [**EgoScale**](https://arxiv.org/abs/2602.16710) | Scaling Dexterous Manipulation with Egocentric Human Videos

**Comparison: The VLA Approach**

- [**RT-2**](https://arxiv.org/abs/2307.15818) | The Pioneer of the VLA Route
- [**OpenVLA**](https://arxiv.org/abs/2406.09246) | Open-source Implementation, Ideal for Beginners
- [**π0**](https://arxiv.org/abs/2410.24164) | Continuous Action Generation via Flow Matching
- [**GR00T N1**](https://arxiv.org/abs/2503.14734) | NVIDIA's Humanoid Robot Foundation Model

**Technical Foundations**

- [**Flow Matching**](https://arxiv.org/abs/2210.02747) | The Generative Method Currently Used by Both Approaches
