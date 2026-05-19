---
date: 2026.05.14
title: Experiments and Data Driven Decisions
tags: [SYSTEMS, TYPESCRIPT]
---

At a previous company, Monday mornings were spent dissecting analytics dashboards. 400 people clicked “Learn More,” but only a handful booked demos. We’d pitch solutions: should pricing be tier-based? Should we expose a customer preview endpoint? Each tweak produced a new set of numbers, and the cycle repeated the next week.

We wanted to make data driven product decisions, but we didn’t have the traffic volume needed for confidence in traditional A/B testing. Google Analytics would tell us *something* happened, but not enough to confidently declare a winner.

Ultimately, decisions were made mostly on instinct while we pretended they were backed by data.

To make this more concrete, consider our scenario.  
  
Say a landing page converts at 2%, and you want to detect whether a change improves conversions by 3% relative.  Importantly, this is not a jump from 2% to 5%. It is a 3% *relative* improvement.
  
That sounds substantial at first glance, but it means your conversion rate only moved from:  
  
2.00% → 2.06%  
  
An increase of six one-hundredths of a percent.  
  
Now imagine trying to separate that tiny signal from the normal randomness of user behavior:  
- weekday traffic vs weekend traffic  
- one unusually large customer  
- seasonal behavior  
- ad campaign fluctuations  
- random variance in user intent 
- bots
  
This is why A/B testing platforms often require enormous sample sizes. As the effect you are trying to measure gets smaller, the amount of data required grows dramatically because random variance begins to overwhelm the signal.  
  
In simplified terms, sample size grows roughly like this:

$$
n \propto \frac{1}{(\text{effect size})^2}
$$
  
Waiting for perfectly powered experiments often means never learning anything at all.

_Absolutely Butter_ approaches this problem with a multi-armed bandit model.
  
The core idea is simple: most products are not operating at Google scale, but they still need to make decisions.

Instead of splitting traffic evenly until an experiment reaches statistical significance, _Absolutely Butter_ continuously updates its confidence in each variant as new impressions and conversions arrive.

Instead of splitting traffic evenly until an experiment reaches statistical significance, the system continuously updates its confidence in each variant as new impressions and conversions arrive. 

At the center of this is Thompson sampling.

Each arm of the experiment is modeled as a probability distribution rather than a fixed conversion rate. If the control has 1,000 impressions and 20 conversions, we do not simply say “the control converts at 2%.” We say “based on what we have seen, the control’s conversion rate likely exists somewhere within this range of possibilities.”

Each time a user enters the experiment, the system samples from the control distribution and the variant distribution:

```ts
const samples = arms.map(a =>
  sampleBeta(1 + a.conversions, 1 + (a.impressions - a.conversions)),
)
```
  
Whichever arm samples higher receives the next impression.

That means the system naturally balances exploration and exploitation.

Early on, when both variants are uncertain, traffic is distributed more evenly. As one variant begins to look better, it receives more traffic. But the weaker arm is not abandoned immediately, because uncertainty still matters.

This is the key difference from traditional A/B testing. The goal is not to wait until the end of the experiment and declare a winner. The goal is to make better decisions throughout the life of the experiment.

Absolutely Butter also computes a few human-readable signals:

```ts
probVariantWins
expectedLoss
relativeLift
credibleIntervals
```

The most important of these is expected loss.

Expected loss asks: “If we choose this arm and we are wrong, how much conversion rate are we likely giving up?”

That is a much more practical question for small teams than “have we crossed a strict significance threshold?”

A variant might not be statistically significant in the traditional sense, but if it has an 85% chance of being better and the expected downside is tiny, that may be enough to ship — especially if the change is reversible.

This is the philosophical core of the project:

Not every decision needs perfect certainty. Most product teams need a structured way to reduce uncertainty, understand risk, and keep moving.

I do not think multi-armed bandits eliminate uncertainty. Nothing does.

But they do acknowledge an important reality: most product teams operate under incomplete information, limited traffic, and constant time pressure. In that environment, the ability to learn continuously is often more valuable than the ability to prove something perfectly.

_Absolutely Butter_ is my attempt to build experimentation tooling for that reality.
