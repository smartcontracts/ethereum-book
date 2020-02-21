---
path: "/chapters/blockchains/fork-choice-rules"
title: "Fork Choice Rules"
status: "0"
---

## Outline
- Reiterate problem statement
    - User sees multiple blocks or chains at the same time
    - Not possible to tell which came first, must use some other metric
    - Tool used to determine a chain to follow is fork choice rule
- Fork choice properties
    - Should be easy to compute 
    - Should reinforce economics of chain itself
    - Should be deterministic so clients can converge
- LCR
    - Simple, effective
    - Protocol explanation
- GHOST
    - More complex, accounts for more information when latency:block ratio is high (ommers)
    - Protocol explanation
    - Not actually used in Eth1 even though everyone thinks it is
- Others exist but not as frequently used
