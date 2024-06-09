---
title: 'Beyond Earth: The Impact of Cosmic Events on Technology'
date: '2024-06-2'
tags: ['engineering', 'science', 'astrophysics']
draft: false
summary: How phenomena from the cosmos, such as solar flares and cosmic rays, can affect our digital infrastructure. From the mysterious malfunctions in satellites to unexpected errors in microchips, this blog post delves into the science behind single-event upsets and their significant, often overlooked impact on modern technology.
layout: PostLayout
---

## TL;DR

How phenomena from the cosmos, such as solar flares and cosmic rays, can affect our digital infrastructure. From the mysterious malfunctions in satellites to unexpected errors in microchips, this blog post delves into the science behind single-event upsets and their significant, often overlooked impact on modern technology.

![alt text](/static/images/single-event-effects/cosmic-rays.jpg)

---

## Introduction

In the intricate world of modern technology, the reliability of microchips and electronic components, particularly Integrated Circuits (ICs), is paramount. These components can falter due to a myriad of reasons, ranging from environmental influences to flaws in engineering design. However, one of the most intriguing and least predictable causes of malfunction are _single-event effects_ **(SEEs)** — disruptions caused by cosmic events.

_Single-event effects_ **(SEE)** have been studied extensively since the 1970s. When a high-energy particle travels through a semiconductor, it leaves an ionized track behind. This ionization may cause a highly localized effect similar to the transient dose one - a benign glitch in output, a less benign bit flip in _memory_ or a _register_ or, especially in _high-power transistors_, a **destructive** latchup and burnout. Single event effects have importance for electronics in satellites, aircraft, and other civilian and military aerospace applications. Sometimes, in circuits not involving latches, it is helpful to introduce **RC time constant** circuits that slow down the circuit's reaction time beyond the duration of an SEE.

---

## Types of Single-event effects

There are multiple types of **Single-event effects** that can occur, some of the effects can be benign and some of them are _irreversible_ and _destructive_. The table below will describe each type of Single-event

| <div style={{ width:`160px` }}>TYPE OF SINGLE-EVENT</div> | <div style={{ textAlign: `center` }}>DESCRIPTION</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | DESTRUCTIVE |
| :-------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
|                      **_Transient_**                      | SET happens when the charge collected from an ionization event discharges in the form of a spurious signal traveling through the circuit. This is de facto the effect of an electrostatic discharge. Soft error, reversible.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |   **No**    |
|                        **_Upset_**                        | **Single-event upsets** (SEU) or **transient radiation effects in electronics** are state changes of memory or register bits caused by a single ion interacting with the chip. They do not cause lasting damage to the device, but may cause lasting problems to a system which cannot recover from such an error. Soft error, reversible. In very sensitive devices, a single ion can cause a multiple-bit upset (MBU) in several adjacent memory cells. SEUs can become **Single-event functional interrupts (SEFI)** when they upset control circuits, such as state machines, placing the device into an undefined state, a test mode, or a halt, which would then need a reset or a power cycle to recover. |   **No**    |
|                       **_Latchup_**                       | **Single-event Latchup** (SEL) can occur in any chip with a parasitic PNPN structure. A heavy ion or a high-energy proton passing through one of the two inner-transistor junctions can turn on the thyristor-like structure, which then stays "shorted" (an effect known as latch-up) until the device is power-cycled. As the effect can happen between the power source and substrate, destructively high current can be involved and the part may fail. Hard error, irreversible. Bulk CMOS devices are most susceptible.                                                                                                                                                                                    |   **Yes**   |
|                      **_Snapback_**                       | **Single-event snapback** is similar to SEL but not requiring the **PNPN** structure, can be induced in N-channel MOS transistors switching large currents, when an ion hits near the drain junction and causes avalanche multiplication of the charge carriers. The transistor then opens and stays opened, a hard error, which is **irreversible**.                                                                                                                                                                                                                                                                                                                                                            |   **Yes**   |
|                   **_Induced Burnout_**                   | **Single-event Burnout** (SEB) may occur in power **MOSFETs** when the substrate right under the source region gets forward-biased and the drain-source voltage is higher than the breakdown voltage of the parasitic structures. The resulting high current and local overheating then may destroy the device. Hard error, **irreversible**.                                                                                                                                                                                                                                                                                                                                                                    |   **Yes**   |
|                    **_Gate Rupture_**                     | **Single-event Gate Rupture** (SEGR) was observed in power **MOSFETs** when a **heavy ion** hits the gate region while a high voltage is applied to the gate. A local breakdown then happens in the insulating layer of silicon dioxide, causing local overheat and destruction (looking like a microscopic explosion) of the gate region. It can occur even in EEPROM cells during write or erase, when the cells are subjected to a comparatively high voltage. Hard error, **irreversible**.                                                                                                                                                                                                                  |   **Yes**   |

---

## Incidents

There are recorded incidents where **SEE's** affected the normal functioning of Microchips that led to weird and unexpected glitches of software. One of the incidents was actually very close to a disaster due to these types of cosmic influences.

---

### 2003 Schaerbeek Elections

![](/static/images/single-event-effects/e-voting-machine.jpg)

<div class="source-text">
    <a href="https://www.flickr.com/photos/european_parliament/3604121362" target="_blank">Image Source</a>
</div>

In the _2003 elections_ in Brussels's municipality **Schaerbeek** (Belgium), an anomalous recorded number of votes triggered an investigation that concluded an SEU was responsible for giving a candidate named **Maria Vindevoghel** **_4,096 extra votes_**. The possibility of a **single-event upset** is suggested by the difference in votes being equivalent to a power of two, $2^{12}$

**_How did the SEU happen?_**

![](/static/images/single-event-effects/bitflip.jpg)

As shown in the previous image, while e-voting was taking place in Belgium, Schaerbeek, a _cosmic particle_ striked a **transistor** which provoked a **bit-flip** and changed it's binary state from **$0$** to **$1$**. This type of **Single-event effect** is not destructive, therefore can be reversed.

---

### Qantas Flight 72

![QF72](/static/images/single-event-effects/airplane.jpg)

<div class="source-text">
    <a href="https://en.wikipedia.org/wiki/File:Qantas_Airways,_Airbus_A330-300_VH-QPA_NRT_(34167383486).jpg" target="_blank">Image Source</a>
</div>

**Qantas Flight 72** (**QF72**) was a scheduled flight from _Singapore Changi Airport_ to _Perth Airport_ by an **Airbus A330**. On 7 October 2008, the flight made an emergency landing at Learmonth Airport near the town of Exmouth, Western Australia, following an inflight accident that included a pair of sudden, uncommanded pitch-down manoeuvres that caused severe injuries — including fractures, lacerations and spinal injuries — to several of the passengers and crew. At Learmonth, the plane was met by the Royal Flying Doctor Service of Australia and CareFlight. Fourteen people were airlifted to Perth for hospitalisation, with thirty-nine others also attending hospital. In all, one crew member and eleven passengers suffered serious injuries, while eight crew and ninety-nine passengers suffered minor injuries. The Australian Transport Safety Bureau (ATSB) investigation found a fault with one of the aircraft's three air data inertial reference units (ADIRUs) and a previously unknown software design limitation of the Airbus A330's fly-by-wire flight control primary computer (FCPC).

**_First signs of trouble_**

The pilots experienced **MASTER WARN** and **MASTER CAUT** errors triggered in the cockpit which indicated the following:

- <ins>**MASTER WARN (Warning) Light**</ins>: This light is typically red and indicates a critical problem that demands immediate action from the flight crew. It is associated with conditions that could seriously affect the aircraft's safety.
- <ins>**MASTER CAUT (Caution) Light**</ins>: This light is usually amber and signals less critical alerts than the warning light but still indicates issues that need to be addressed by the crew to ensure continued safe operation.

Nothing interesting happened for a short ammount of time, until two more errors appear on the **Electronic Centralized Aircraft Monitor (ECAM)**:

- <ins>**STALL**</ins>: Due to **_Angle of Attack (AoA)_** having extreme negative values, which would lead to loss of velocity and stalling
- <ins>**OVERSPEED**</ins>: Due to Velocity data outputted by **_ADIRU_**

These two errors that the crew encountered, were a case of impossibility and this is because of what each error actually reflect. The aircraft, as what the **ECAM** suggested with these 2 errors, was _stalling_ and _overspeeding_ at the same time.

**_Pitch-down Manoeuvres_**

Due to the extreme negative values of the **AoA** outputted by **ADIRU**, the Aircraft's **_Flight Control Primary Computer (FCPC)_** tried to calibrate the **AoA** values by pitching down. This resulted in loss of control of the Aircraft and everyone on-board experiencing **$-0.8G$** force.

The crew managed to gain control of the aircraft after the second pitch-down, this has been achieved after shutting down the **Auto Pilot (AP)** systems. Basically, the _Airbus A330_ was full manually controlled by the pilots.

**_Aftermath_**

<div class="flex-container" style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`, alignItems: `center` }}>
    <img src="/static/images/single-event-effects/Qantas_Flight_72_damage.png" alt="Qantas Flight 72 damage" style={{ width: `49%`, marginRight: `2%` }}/>
    <img src="/static/images/single-event-effects/Qantas_Flight_72_damage2.png" alt="Qantas Flight 72 secondary damage" style={{ width: `49%` }}/>
</div>

<div class="source-text">
    <a href="https://en.wikipedia.org/wiki/Qantas_Flight_72" target="_blank">Images Source</a>
</div>

It is fortunate that nobody perished on this incident. Due to the events that unfolded, the Airline company offered compensation to all passangers and announced it would refund the cost of all travel on their itineraries covering the accident flight, offer a voucher equivalent to a return trip to London applicable to their class of travel and pay for medical expenses arising from the accident.

**_What caused the incident?_**

The analysis of the Aircraft's computers showed that there was a case of **_Flight Control Primary Computer (FCPC)_** **faulty design**. But it does not explain what triggered the actual extreme value change in **AoA**. Given this, the incident was most probably triggered by an **SEE**, specifically a **Single-event upset**.

Given the nature of the incident, a _cosmic ray_ that broke down into <b style={{ color: `red` }}>neutrons</b>, <b style={{ color: `red` }}>muons</b>, <b style={{ color: `red` }}>pions</b> and <b style={{ color: `red` }}>protons</b>, triggered a **bit shift** in one of the **ADIRU** systems, which led to the value of the _AoA_ being drastically changed.

_AoA_ is a critically important flight parameter, and full-authority flight control systems, such as those equipping **A330/A340 aircraft**, require accurate _AoA_ data to function properly. The aircraft was fitted with three **ADIRU**s to provide redundancy for fault tolerance, and the **FCPC**s used the three independent _AoA_ values to check their consistency. In the usual case, when all three _AoA_ values were valid and consistent, the average value of _AoA 1_ and _AoA 2_ was used by the **FCPC**s for their computations. If either AOA 1 or AOA 2 significantly deviated from the other two values, the FCPCs used a memorised value for 1.2 seconds. The FCPC algorithm was very effective, but it could not correctly manage a scenario where multiple spikes occurred in either AOA 1 or AOA 2 that were 1.2 seconds apart—that is, if the 1.2-second period of use of the memorised value happened to end while another spike was happening.

**_What is Angle of Attack (AoA)_**

![a](/static/images/single-event-effects/AoA.jpg)

<div class="source-text">
    <a href="https://simpleflying.com/angle-of-attack-complete-guide/" target="_blank">Image Source</a>
</div>

The aircraft **angle of attack (AOA)** is defined as the angle of the oncoming wind **relative** to the _aircraft's reference line_. In other words, the angle that the oncoming air makes with the center of the fuselage or a designed average point on the wing is referred to as the aircraft AOA.

The angle of attack must not be confused with the aircraft's **pitching angle**, which relates to the aircraft's _angle with the horizon_. The altitude indicator or the artificial horizon display in the cockpit indicates aircraft's pitching angle. The aircraft AOA can sometimes be mistaken for the flight path angle, which is the angle of the flight path vector relative to the horizon.

---

## Mitigation

Mitigating SEEs involves several strategies, primarily focused on design, material choice, and shielding:

#### 1. **Technology Choice**

- **RHBD (Radiation-Hardened By Design) Chips**: Opt for semiconductor devices specifically designed to withstand radiation effects.
- **Process Selection**: SOI (Silicon On Insulator) and bulk CMOS technologies differ in their resilience to radiation; choosing the suitable technology based on the expected radiation environment is crucial.

#### 2. **Circuit Design Techniques**

- **Redundancy**: Use redundant circuits or systems (e.g., Triple Modular Redundancy) where multiple units perform the same function and a majority voting system determines the correct output.
- **Error Detection and Correction**: Implement error-correcting codes such as ECC memory, which can detect and fix errors that occur due to SEEs.
- **Latch-Up Protection**: Design circuits with current-limiting capabilities and watchdog timers to reset the system in case of latch-up conditions.

#### 3. **Shielding**

- **Physical Shielding**: Encasing sensitive components or whole devices in materials that absorb or deflect high-energy particles can reduce SEE occurrence. Common materials include lead or specialized plastics like polyethylene.
- **Magnetic Shielding**: For charged particles, magnetic fields can be used to deflect them away from sensitive areas.

#### 4. **System-Level Strategies**

- **Software Mitigation Techniques**: Software routines can check for anomalies indicating an SEE has occurred and initiate corrective actions such as resets or switching to backup systems.
- "**Graceful Degradation**": Instead of complete system failure when an SEE occurs, systems can be designed to continue operating at a reduced capability level.

#### 5. **Environmental Testing & Monitoring**

    -**Testing Under Radiation:** Exposing components to controlled radiation sources pre-deployment helps identify weak points and adjust designs accordingly.
    -**In-Field Monitoring:** Continuous monitoring for signs of SEE during normal operation helps adaptively manage risk through software adjustments or hardware recalibrations.

#### 6. **_Materials Engineering_**

    Choosing substrate materials with lower cross-sections for nuclear reactions within semiconductors also mitigates SEE risks.

---

## Conclusion

The phenomena of cosmic rays and solar flares represent a significant, albeit often overlooked, risk to our digital infrastructure. From the mysterious malfunctions of satellites to unexpected errors in microchips, the influence of these cosmic events on technology is profound and pervasive. The incidents at Schaerbeek during the 2003 elections and the dangerous malfunctions aboard Qantas Flight 72 illustrate just how disruptive single-event effects can be, not only to devices but also to human lives.

As we advance technologically, especially in fields like aerospace and other high-risk environments, understanding and mitigating Single-Event Effects becomes crucial. Modern mitigation strategies must incorporate robust design practices, from radiation-hardened components to sophisticated error-checking software systems that ensure reliability and safety under cosmic influence.

By integrating comprehensive protective measures across design, technology selection, system architecture, and operational protocols, we can safeguard our technology-dependent society against the unpredictable yet inevitable touch of cosmic events. This proactive approach will not only enhance system resilience but also secure critical functions that modern civilization relies upon. Whether it's navigating an aircraft or casting a vote in an election — ensuring these systems are impervious to cosmic disruptions is essential for both progress and protection in our increasingly tech-driven world.
