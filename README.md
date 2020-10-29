# CreepJS

[https://abrahamjuliot.github.io/creepjs](https://abrahamjuliot.github.io/creepjs)

The purpose of this project is to shed light on weaknesses and privacy leaks among modern anti-fingerprinting extensions and browsers.

1. Detect and ignore API tampering (API lies)
2. Fingerprint lie types
3. Fingerprint extension code
4. Fingerprint browser privacy settings
5. Employ large-scale validation, but allow possible inconsistencies
6. Feature detect and fingerprint [new APIs](https://www.javascripture.com/) that reveal high entropy
7. Rely only on APIs that are the most difficult to spoof when generating a pure fingerprint

Tested:
- Firefox (RFP)
- Brave Browser (Standard/Strict)
- uBlock Origin (aopr)
- Privacy Badger
- Privacy Possom
- Random User-Agent
- User Agent Switcher and Manager
- CanvasBlocker
- Trace
- CyDec
- Chameleon
- ScriptSafe
- Windscribe

## Rules
### Data
- data collected: encrypted fingerprints and booleans
- data retention: auto deletes 30 days after last visit
- visit tracking: limited to data retention and new feature scaling

### New feature scaling
- scaling occurs no more than once per week
- new features will render fingerprints anew
- [History](https://github.com/abrahamjuliot/creepjs/commits/master/docs/creep.js)

## Formulas
### Trust Score
A failing trust score is unique and can be used to connect fingerprints.

- start at `100%`
- less than 2 loose fingerprints: subtract `0`
- less than 11 loose fingerprints: subtract `total*1`
- 11+ loose fingerprints: subtract `total*5`
- trash: subtract `total*15.5`
- lies: subtract `total*31`
- errors: subtract `total*5.2`

### Bot Detection
Bots leak unusual behavior and can be denied service.
- 10 loose fingerprints within 48 hours

## Definitions
### Trash Definition
- unusual results
- forgivable lies

### Lies Definition
- prototype tampering
- failed math calculations

### Errors 
- invalid results
- blocked features

### Loose Fingerprint
- collects as much entropy as possible

### Fingerprint
- adapts to browsers and distrusts known noise vectors
- aims to ignore entropy unique to a browser version release
- gathers compressed and static entropy