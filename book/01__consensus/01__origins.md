---
title: "The Origins of Consensus"
---

# {{ $frontmatter.title }}

## When computers became networks

The origins of modern blockchain systems can be traced back to decades-old research in the field of computer science. This history begins with the advent of networked computing in the second half of the 20th century. Prior to the integration of long-distance communication lines into computing hardware, software systems were effectively limited to individual machines or, in rare circumstances, small local clusters of machines. These systems could rely on the tight proximity of various hardware components to reduce any form of communication latency to a mostly insignificant minimum.

The historic ARPANET program, established in 1969, would quickly go on to demonstrate both the viability and utility of large-scale computer networks. Computers connected via ARPANET could communicate with one another at previously unimaginable distances and speeds. It would soon be, in an interesting twist of fate, that a pair of computer worms would make apparent the possibility of not only communication but also collaboration between machines on these networks. The Creeper and Reaper worms, quite possibly the very first computer viruses, jumped between various computers connected to ARPANET and automatically duplicated themselves along the way. Although these worms did no damage to their hosts, they sparked the imagination of researchers interested in making use of idle processing power of machines connected to the ARPANET system.

## From distributed computing to fault tolerance

In 1988, the DEC System Research Center launched the first distributed computing project to be coordinated over the internet. Participants received computing tasks from DEC via email and would return their results to DEC upon completion. Other initiatives, including the famous SETI@HOME project of the University of California at Berkeley, soon followed suit and further simplified the process of communicating tasks and results. With access to the computational resources of an extraordinary number of machines, these efforts massively advanced the state of several key fields of mathematics and computer science.

Simultaneously, other researchers of the time saw potential applications of these networks beyond the pooling of computational resources. Relatively early on in the history of computing, organizations recognized the need for particularly robust computers for use in certain high-value systems. Machines operating in space, for instance, needed to function properly for extended periods of time without any possibility of manual on-board maintenance in the event of an error. Starting in the 1950s, organizations began to develop and utilize so-called "fault-tolerant" computers that had the ability to recover cleanly from significant software and hardware failures.

Fault-tolerant computing quickly saw wide-spread adoption in critical systems around the world. NASA's CCS fault-tolerant computer found its way into the Voyager spacecraft where, more than forty years later, it continues to operate in the harsh environment of deep space. Military operations, nuclear power plants, and digital financial systems all became natural homes for these error-resistant machines. Fault-tolerant computing was, and continues to be, the foundation of countless computer-based services familiar to us even in the 21st century.

## The principle of replication

At the heart of fault-tolerant computing sits the principle of replication. When some component of a computer fails, it becomes unable to perform its assigned tasks. If, for example, a memory module crashes, then the data stored on that module becomes inaccessible to other components. A computer could recover from such a failure if the information on the module happens to be duplicated somewhere else within the system. Fault-tolerant computers are able to fix or bypass errors in individual components by replicating the functionality of these components onto redundant hardware.

## Redundancy at scale

In his seminal 1978 paper, "Time, Clocks, and the Ordering of Events in a Distributed System," Leslie Lamport, at the time a researcher at Massachusetts Computer Associates, laid the groundwork for an entirely new model of fault-tolerant computing. Instead of redundant hardware within a single computer, Lamport proposed a form of redundancy produced via communication between many different computers connected to a network.

Lamport demonstrated that this model could be used to accurately replicate "transactional databases" across different machines. Within these databases, each database update is represented as an individual event, or "transaction." The final state of a transactional database is then computed as the result of executing each of these transactions in order. If several computers could come to agreement about the ordering of transactions within such a system, Lamport argued, each computer could accurately reconstruct the final system for itself.

Lamport further envisioned the possibility that entire computers be replicated the same way. Under the "state machine" model, computers can be represented, in an abstract sense, as entities that store some past information in memory (the "state") and may modify this information according to a given set of operations. Just as with a transactional database, a state machine could be reconstructed if the list of operations it executed were recorded and played back in exactly the same order. Perhaps, therefore, a failure on one computer could be circumvented if execution could seamlessly continue on another.

## Some basic design assumptions

Research into this state machine model of fault tolerance had to be carried out under some set of assumptions about the system itself. Early work was often restricted to systems in which computers were expected to only experience so-called "crash-faults," sometimes also known as "fail-stop faults." Within this framework, computers would either perfectly follow some prescribed protocol or cease to function entirely. Computers on the network would only behave "benevolently" and would not, for instance, attempt to forge messages from other machines.

Designs operating under this assumption could, as we'll shortly discuss, take advantage of some convenient simplifications. However, this mental framework not only reduced the problem space for researchers, but also generally reflected the needs of many real-world applications. Organizations making use of such systems internally, perhaps to maintain backups of some important database or computing process, could typically ignore the possibility of actively malicious behavior from their own machines. As a result, this approach quickly grew in popularity and has held traction well into the 21st century.
