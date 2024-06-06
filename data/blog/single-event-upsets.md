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

---

## Introduction

In the intricate world of modern technology, the reliability of microchips and electronic components, particularly Integrated Circuits (ICs), is paramount. These components can falter due to a myriad of reasons, ranging from environmental influences to flaws in engineering design. However, one of the most intriguing and least predictable causes of malfunction are _single-event effects_ **(SEEs)** — disruptions caused by cosmic events.

_Single-event effects_ **(SEE)** have been studied extensively since the 1970s. When a high-energy particle travels through a semiconductor, it leaves an ionized track behind. This ionization may cause a highly localized effect similar to the transient dose one - a benign glitch in output, a less benign bit flip in _memory_ or a _register_ or, especially in _high-power transistors_, a **destructive** latchup and burnout. Single event effects have importance for electronics in satellites, aircraft, and other civilian and military aerospace applications. Sometimes, in circuits not involving latches, it is helpful to introduce **RC time constant** circuits that slow down the circuit's reaction time beyond the duration of an SEE.

---

## Types of Single-event effects

There are multiple types of Single-event effects that can occur, some of the effects can be benign and some of them are irreversible and destructive. The table below will describe each type of Single-event

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

There are recorded incidents where **SEE's** affected the normal functioning of Microchips that lead to weird and unexpected glitches of software. One of the incidents was actually very close to a disaster due to these types of cosmic influences.

### Qantas Flight 72

**Qantas Flight 72** (**QF72**) was a scheduled flight from _Singapore Changi Airport_ to _Perth Airport_ by an **Airbus A330**. On 7 October 2008, the flight made an emergency landing at Learmonth Airport near the town of Exmouth, Western Australia, following an inflight accident that included a pair of sudden, uncommanded pitch-down manoeuvres that caused severe injuries — including fractures, lacerations and spinal injuries — to several of the passengers and crew. At Learmonth, the plane was met by the Royal Flying Doctor Service of Australia and CareFlight. Fourteen people were airlifted to Perth for hospitalisation, with thirty-nine others also attending hospital. In all, one crew member and eleven passengers suffered serious injuries, while eight crew and ninety-nine passengers suffered minor injuries. The Australian Transport Safety Bureau (ATSB) investigation found a fault with one of the aircraft's three air data inertial reference units (ADIRUs) and a previously unknown software design limitation of the Airbus A330's fly-by-wire flight control primary computer (FCPC).

**_First signs of trouble_**

The pilots experienced **MASTER WARN** and **MASTER CAUT** errors triggered in the cockpit which indicated the following:

- <ins>**MASTER WARN (Warning) Light**</ins>: This light is typically red and indicates a critical problem that demands immediate action from the flight crew. It is associated with conditions that could seriously affect the aircraft's safety.
- <ins>**MASTER CAUT (Caution) Light**</ins>: This light is usually amber and signals less critical alerts than the warning light but still indicates issues that need to be addressed by the crew to ensure continued safe operation.

Nothing interesting happened for a short ammount of time, until two more errors appear on the **Electronic Centralized Aircraft Monitor (ECAM)**:

- <ins>**STALL**</ins>: Due to **_Angle of Attack (AoA)_** having extreme negative values, which would lead to loss of velocity and stalling
- <ins>**OVERSPEED**</ins>: Due to Velocity data outputted by **_ADIRU_** (I'll come back to this later)

These to errors that the crew encountered, were a case of impossibility and this is because of what each error actually reflect. The airplane, as what the **ECAM** suggested with these 2 errors, was _stalling_ and _overspeeding_ at the same time.
