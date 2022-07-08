---
oip: 1
title: Orchestrator Reward/Fee Cut Update (4%/75%)
author: Chase Adams (@0xcadams)
type: Standard Track
status: Review
created: 2022-07-06
discussions-to: https://github.com/0xcadams/livepeer-open-orchestrator/issues/9
---

## Abstract

The Livepeer Open Orchestrator project is looking to launch publicly on the Livepeer network to attract stake from delegators. In order to do this, the fee/reward cuts must be competitive compared to other orchestrators on the network. The proposed parameters will remain in effect until a new proposal is defined and passed, with input from delegators and the community.

The reward/fee cut are proposed to be changed to 4% and 75% respectively, with the changes committed on-chain on 2022-07-08.

## Specification

| Parameter    | Previous Value | New Value |
| ------------ | -------------- | --------- |
| `Reward Cut` | 5%             | 4%        |
| `Fee Cut`    | 99%            | 75%       |

`Reward Cut` is the percent which Open Orchestrator will earn on LPT rewards which are minted per round for orchestrator/delegator participation. The typical reward cut is around 1-5% for competitive orchestrators.

The `Fee Cut` is the percent the Open Orchestrator will share of ETH fees earned by transcoding. Since the orchestrator is looking to attract stake, this will remain competitively low for the foreseeable future.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
