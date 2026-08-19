---
title: "VLA: Teaching Robots to Understand Plain Language"
urlname: vla-robot-language-models
description: Bringing the recipe behind language models into the physical world — how VLA lets robots handle objects and instructions they have never seen before.
date: 2026-08-19
audiences:
  - application
  - developer
  - researcher
author: Da-An Li
affiliation: Department of Computer Science, National Tsing Hua University
tags:
  - VLA
  - VLM
  - Robotics
featured: false
draft: false
---

## What is VLA

VLA stands for Vision-Language-Action. It takes a camera image plus a natural-language instruction — for example, "put the ketchup in the basket" — and outputs what the robot should do next: joint angles for the arm, and whether the gripper opens or closes.

Traditionally, each robot task meant an engineer hand-writing a program, or training a task-specific model that had to be redone whenever the setting changed. VLA aims for "one model, many tasks, many robots" — a general-purpose brain for robotics.

## Why build on a VLM backbone

It comes down to data. The web offers trillions of words and billions of images, but robot manipulation data has to be recorded one episode at a time by a human teleoperating a mechanical arm — several orders of magnitude less. Trained from scratch, a model simply memorises the demonstrations it was shown, and fails the moment it meets an unfamiliar cup.

Vision-language models (VLMs), by contrast, have already learned from web-scale data what ketchup looks like, that the red ball is on the left, and that a mug is grasped by its handle — visual common sense and language understanding. VLA takes that brain as-is and attaches an "action expert" behind it, treating actions as just another language to be generated.

The result is that a robot's ability to generalise is inherited from web data rather than squeezed out of scarce robot data. Only then does it stand a chance with objects it has never seen and phrasings it has never heard.

## Recent developments

RT-2 first showed the approach was viable in 2023, and the open-source release of OpenVLA in 2024 put it within reach of academic labs. From 2025 onward the work turned toward products: Physical Intelligence's π0 / π0.5 use flow matching to generate continuous, high-frequency motion, while NVIDIA GR00T and Google Gemini Robotics adopt a dual-system design — a slow VLM for understanding and planning, and a fast action expert for real-time control.

Several threads define 2026. **Efficiency**: inference on a seven-billion-parameter model is still an order of magnitude away from real-time control, driving a wave of distillation, quantisation, and token-pruning work. **Reasoning**: letting the model "think a step" before it acts. **Data scaling**: pre-training on tens of thousands of hours of first-person human video, with early evidence that dexterity follows a scaling law of its own. And **world models**: having the model predict what happens next while it decides how to move.

VLA has not solved everything — generalisation remains brittle, and evaluation on real hardware is still expensive. But the direction is clear: take the recipe that worked for language models, and carry it into the physical world.
