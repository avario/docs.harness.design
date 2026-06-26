# harness.design JSON Format Reference (v0.8)

This document describes **version 0.8** of the JSON format used by [harness.design](https://app.harness.design) to represent electrical wire harness designs. You can load a JSON file matching this format into the app via the **Open** menu to create a new harness.

---

## Views

The app has two canvas views:

- **Schematic** — a node-based logical wiring diagram. Electrical components are represented as rectangular nodes; wires and cable cores are edges connecting them.
- **Layout** — a node-based physical routing diagram. Components appear as nodes; bundles (groups of wires following a physical path) are edges between them.

Most components appear in both views. A few are exclusive to one view (e.g. Cables and TwistedWires are schematic-only; BranchPoints are layout-only).

---

## Top-Level Structure

A harness document is a JSON object with a `version` field and optional arrays of **components** and **parts**. All array fields are omitted when empty — only include arrays that contain data.

```json
{
  "version": 0.8,

  // Document settings (all optional — see defaults below)
  "currency": "$",
  "lengthUnit": "m",
  "gaugeUnit": "Metric",
  "readOnly": false,

  // Electrical components (all optional arrays)
  "wires": [],
  "connectors": [],
  "terminals": [],
  "cables": [],
  "twistedWires": [],
  "diodes": [],
  "resistors": [],
  "splices": [],
  "bundles": [],
  "branchPoints": [],
  "mates": [],
  "frames": [],
  "schematicNotes": [],
  "layoutNotes": [],

  // Manufacturing parts (all optional arrays)
  "wireParts": [],
  "connectorParts": [],
  "terminalParts": [],
  "spliceParts": [],
  "contactParts": [],
  "cableParts": [],
  "coveringParts": [],
  "diodeParts": [],
  "resistorParts": [],
  "frameParts": [],
  "lockParts": [],
  "dustCoverParts": [],
  "backshellParts": [],
  "bootParts": [],
  "cavitySealParts": []
}
```

**Defaults** — these fields can be omitted if you want the default value:

| Field        | Default    | Omit when                |
| ------------ | ---------- | ------------------------ |
| `version`    | —          | Never omit; always `0.8` |
| `currency`   | `"$"`      | Using US dollars         |
| `lengthUnit` | `"m"`      | Using meters             |
| `gaugeUnit`  | `"Metric"` | Using metric gauge       |
| `readOnly`   | `false`    | Document is editable     |

---

## ID Conventions

Every element has an `id: string` field. IDs must be **unique across the entire document** — no two elements of any type may share an ID. Use short descriptive strings or any consistent scheme you prefer (e.g. `"conn_J1"`, `"wire_1"`, `"cav_A1"`).

IDs are **internal only** — they are never displayed to the user. They exist solely to cross-reference elements within the document (e.g. a wire's `source.id` references a connector's `id`; a connector's `partId` references a `ConnectorPart`'s `id`).

---

## Canvas Positions

Both canvas views use a **30-unit grid**. All positions should be multiples of 30 (e.g. `{ "x": 90, "y": 210 }`).

Elements carry position fields depending on which views they appear in:

- **SchematicElement** — has `schematicPosition: { x, y }` (schematic only; e.g. Cable, TwistedWires, SchematicNote)
- **LayoutElement** — has `layoutPosition: { x, y }` (layout only; e.g. BranchPoint, LayoutNote)
- **CrossFlowElement** — has `schematicPosition?: { x, y }` and `layoutPosition?: { x, y }` (always present in both views; e.g. Connector, Terminal, Splice, Diode, Resistor, Frame)

**Important for CrossFlowElements:** these elements always appear in both the schematic and layout views regardless of which position fields are defined. If only one position is provided, it is used for both views. **At least one position must be defined.**

### Node Sizes

Positions define the top-left corner of a node. Use the sizes below to avoid overlaps. All values are in grid units (1 unit = 30 px). `N` = number of cavities/cores/wires; `w` = the element's `width` property (default `150` for Connector and Terminal).

**Schematic view** (non-rotated):

| Element | Width | Height |
|---|---|---|
| Connector | `w` | `30 + N_cavities × 30 [+ 30 if shell]` |
| Terminal | `w` | `30` |
| Cable | `60` | `30 + N_cores × 30 [+ 30 if shield]` |
| TwistedWires | `90` | `30 + N_wires × 30` |
| Splice / Diode / Resistor | `30` | `30` |

When `rotated: true`, width and height swap (the node is transposed).

**Layout view** — every node (Connector, Terminal, BranchPoint, Splice, Diode, Resistor) is `30 × 30`.

### Layout Guidelines

**General:**
- Nodes must not overlap. Account for each node's full width and height when placing neighbours.
- Leave at least **60–90 units of clear space** between nodes so that wires and cable cores have room to run between them without crossing through a node.
- Avoid placing layout points (waypoints) on wires unless absolutely necessary. The app has limited auto-routing that works better than poorly placed waypoints. When waypoints are needed to route around a node, keep them to the minimum required.

**Schematic view:**
- A practical arrangement is to place endpoint components (Connectors, Terminals) around the perimeter of a rectangle and leave the interior empty. Non-rotated nodes sit on the left and right edges with wires exiting horizontally; rotated nodes sit on the top and bottom edges with wires exiting vertically.
- Inline components (Splices, Diodes, Resistors, Cables, TwistedWires) go in the open space in the centre, where the wires naturally pass through.
- This perimeter layout keeps all connections in the open interior and minimises crossings without needing waypoints.

**Layout view:**
- Component positions should approximately match the real physical locations of the parts in the harness — e.g. a connector mounted at the front of a vehicle should be on the left, one at the rear on the right.
- BranchPoints mark where the harness trunk physically splits; place them where the bundle routes diverge.
- Inline components with a `locationId` (Splices, Diodes, Resistors) should be placed close to their location element — the app draws an arrow from the inline component to its location, so large distances look cluttered.

---

## Connection Model

Wires are the core of the harness — they define which element endpoints are electrically connected. A `Wire` has `source` and `target`, each a **ConnectionPoint**:

```json
{
  "id": "wire_1",
  "source": { "id": "element_id", "handle": "handle_string" },
  "target": { "id": "element_id", "handle": "handle_string" },
  "color": "Red"
}
```

### What `id` and `handle` Reference

**`id`** — the `id` of the element being connected to. Valid target elements for a wire are: Connector, Terminal, Splice, Diode, Resistor.

**`handle`** — depends on the element type:

| Target element       | `handle` value                                                            |
| -------------------- | ------------------------------------------------------------------------- |
| **Connector** cavity | The `id` of the specific `Cavity` within the connector's `cavities` array |
| **Connector** shell  | The `id` of the connector's `shell` cavity                                |
| **Terminal**         | `"Terminal"`                                                              |
| **Splice**           | `"Splice"`                                                                |
| **Diode**            | `"Left"` or `"Right"`                                                     |
| **Resistor**         | `"Left"` or `"Right"`                                                     |

Example — a wire from a connector cavity to a terminal:

```json
{
  "id": "w1",
  "source": { "id": "J1", "handle": "cav_1" },
  "target": { "id": "term_1", "handle": "Terminal" },
  "color": "Red"
}
```

---

## Components

### Wire

Represents a single conductor connecting two elements. The wire's `color` and `stripeColor` should match the assigned `WirePart`'s color properties when a `partId` is set.

```json
{
  "id": "w1",
  "source": { "id": "J1", "handle": "cav_1" },
  "target": { "id": "J2", "handle": "cav_a" },
  "color": "Red",
  "stripeColor": "White",
  "identColors": ["Blue"],
  "identLabel": "12V",
  "partId": "wp1",
  "coveringIds": ["cov1"],
  "excludeFromBom": false,
  "layoutPoints": [{ "id": "lp1", "schematicPosition": { "x": 300, "y": 210 } }]
}
```

| Field            | Type            | Required | Description                                                                             |
| ---------------- | --------------- | -------- | --------------------------------------------------------------------------------------- |
| `id`             | string          | Yes      | Unique ID                                                                               |
| `source`         | ConnectionPoint | Yes      | Start of the wire                                                                       |
| `target`         | ConnectionPoint | Yes      | End of the wire                                                                         |
| `color`          | PartColor       | Yes      | Wire insulation color — must match the assigned `WirePart`'s `color` if `partId` is set |
| `stripeColor`    | PartColor       | No       | Stripe color — must match the assigned `WirePart`'s `stripeColor` if set                |
| `identColors`    | PartColor[]     | No       | Additional identification color bands                                                   |
| `identLabel`     | string          | No       | Text identification label                                                               |
| `partId`         | string          | No       | ID of a `WirePart` in `wireParts`                                                       |
| `coveringIds`    | string[]        | No       | IDs of `CoveringPart`s in `coveringParts`                                               |
| `excludeFromBom` | boolean         | No       | Exclude from bill of materials                                                          |
| `layoutPoints`   | array           | No       | Waypoints that shape the wire's path in the **schematic** view                          |

---

### Connector

A housing with one or more cavities. This is the most common element — it represents a physical connector into which contacts/terminals are inserted.

In the schematic, a connector is displayed as a vertical node (when not rotated) with a 30-unit header, then each cavity occupying 30 units vertically. The shell cavity (if present) is always at the bottom. When rotated, the layout is horizontal: header on the left, cavities going right, shell at the far right. Wires exit left/right when not rotated, or top/bottom when rotated. Setting `width` controls the horizontal width of the node; when rotated, `width` becomes the height.

```json
{
  "id": "J1",
  "label": "J1",
  "schematicPosition": { "x": 90, "y": 210 },
  "layoutPosition": { "x": 480, "y": 300 },
  "cavities": [
    { "id": "cav_1", "signal": "PWR", "contactPartId": "cp1" },
    { "id": "cav_2", "signal": "GND" },
    { "id": "cav_3" }
  ],
  "shell": { "id": "shell_1" },
  "width": 90,
  "rotated": false,
  "partId": "conn_part_1",
  "configurationId": "cfg1",
  "coveringIds": ["cov1"],
  "excludeFromBom": false
}
```

| Field               | Type      | Required                       | Description                                                                                         |
| ------------------- | --------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `id`                | string    | Yes                            | Unique ID                                                                                           |
| `label`             | string    | No                             | Display name shown on the connector node (e.g. `"J1"`, `"P2"`)                                      |
| `schematicPosition` | `{x, y}`  | At least one position required | Position in schematic view (multiple of 30)                                                         |
| `layoutPosition`    | `{x, y}`  | At least one position required | Position in layout view (multiple of 30)                                                            |
| `cavities`          | Cavity[]  | Yes                            | List of cavities (connection points for wires)                                                      |
| `shell`             | Cavity    | No                             | Shell/shield cavity — always rendered at bottom (or right when rotated)                             |
| `width`             | NodeWidth | No                             | Display width in schematic: `60`, `90`, `150`, `210`, `270`, or `390`. Becomes height when rotated. |
| `rotated`           | boolean   | No                             | Schematic orientation only. When `true`, wires exit top/bottom and cavities run horizontally.       |
| `partId`            | string    | No                             | ID of a `ConnectorPart` in `connectorParts`                                                         |
| `configurationId`   | string    | No                             | ID of a `ConnectorPartConfiguration` within the assigned `ConnectorPart`'s `configurations` array   |
| `coveringIds`       | string[]  | No                             | IDs of `CoveringPart`s in `coveringParts`                                                           |
| `excludeFromBom`    | boolean   | No                             | Exclude from BOM                                                                                    |

#### Cavity

A cavity is a single slot in a connector. Wires connect to a connector by referencing the cavity's `id` as the `handle`.

```json
{ "id": "cav_1", "signal": "12V_MAIN", "contactPartId": "cp1" }
```

| Field           | Type    | Description                                                                                                                                                                   |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | string  | Unique ID — used as the `handle` when wiring to this cavity                                                                                                                   |
| `signal`        | string  | Signal name (e.g. `"PWR"`, `"GND"`, `"CAN_H"`). Signals propagate through the net, so you only need to define it once per net — at the point where the signal originates. Other cavities on the same net will inherit it. Set a signal explicitly on a cavity only when it needs a unique label that differs from what would be inherited. |
| `propagate`     | boolean | Set to `false` to prevent this cavity's signal from propagating further along the net                                                                                         |
| `global`        | boolean | Whether this is a global signal (shared across all elements with the same signal name)                                                                                        |
| `contactPartId` | string  | ID of a `ContactPart` assigned to this specific cavity (overrides configuration default)                                                                                      |

---

### Terminal

A standalone terminal fitting (Ferrule, Ring, Spade, etc.) used at wire endpoints. Wires connect to terminals using `"Terminal"` as the handle.

```json
{
  "id": "term_1",
  "type": "Ferrule",
  "schematicPosition": { "x": 210, "y": 210 },
  "layoutPosition": { "x": 600, "y": 300 },
  "signal": "GND",
  "width": 90,
  "rotated": false,
  "partId": "tp1",
  "coveringIds": [],
  "excludeFromBom": false
}
```

| Field               | Type         | Required                       | Description                                                  |
| ------------------- | ------------ | ------------------------------ | ------------------------------------------------------------ |
| `id`                | string       | Yes                            | Unique ID                                                    |
| `type`              | TerminalType | Yes                            | Terminal type (see [TerminalType](#terminaltype))            |
| `schematicPosition` | `{x, y}`     | At least one position required | Position in schematic view                                   |
| `layoutPosition`    | `{x, y}`     | At least one position required | Position in layout view                                      |
| `signal`            | string       | No                             | Signal name                                                  |
| `width`             | NodeWidth    | No                             | Display width (becomes height when rotated)                  |
| `rotated`           | boolean      | No                             | Schematic orientation only — wires exit top/bottom when true |
| `partId`            | string       | No                             | ID of a `TerminalPart` in `terminalParts`                    |
| `coveringIds`       | string[]     | No                             | IDs of `CoveringPart`s                                       |
| `excludeFromBom`    | boolean      | No                             | Exclude from BOM                                             |

---

### Splice

An inline junction that joins multiple wires at a single point. Wires connect using `"Splice"` as the handle.

```json
{
  "id": "spl_1",
  "schematicPosition": { "x": 390, "y": 210 },
  "layoutPosition": { "x": 780, "y": 300 },
  "locationId": "J1",
  "partId": "sp1",
  "coveringIds": [],
  "excludeFromBom": false
}
```

| Field               | Type     | Required                       | Description                                                                                                                                                                                                                                            |
| ------------------- | -------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                | string   | Yes                            | Unique ID                                                                                                                                                                                                                                              |
| `schematicPosition` | `{x, y}` | At least one position required | Position in schematic view                                                                                                                                                                                                                             |
| `layoutPosition`    | `{x, y}` | At least one position required | Position in layout view                                                                                                                                                                                                                                |
| `locationId`        | string   | No                             | ID of a Connector, Terminal, or BranchPoint indicating where in the physical harness this splice sits. If omitted, the position is calculated automatically to minimise wire lengths — **recommended to leave undefined for LLM-generated harnesses**. |
| `partId`            | string   | No                             | ID of a `SplicePart` in `spliceParts`                                                                                                                                                                                                                  |
| `coveringIds`       | string[] | No                             | IDs of `CoveringPart`s                                                                                                                                                                                                                                 |
| `excludeFromBom`    | boolean  | No                             | Exclude from BOM                                                                                                                                                                                                                                       |

---

### Diode

An inline diode placed in series with a wire. Wires connect using `"Left"` or `"Right"` as the handle.

```json
{
  "id": "d1",
  "schematicPosition": { "x": 390, "y": 300 },
  "layoutPosition": { "x": 690, "y": 420 },
  "anodeOnRight": false,
  "rotated": false,
  "locationId": "J1",
  "partId": "dp1",
  "coveringIds": [],
  "excludeFromBom": false
}
```

| Field               | Type     | Required                       | Description                                                                          |
| ------------------- | -------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| `id`                | string   | Yes                            | Unique ID                                                                            |
| `schematicPosition` | `{x, y}` | At least one position required | Position in schematic view                                                           |
| `layoutPosition`    | `{x, y}` | At least one position required | Position in layout view                                                              |
| `anodeOnRight`      | boolean  | No                             | When `true`, anode is on the right side (default: anode on left)                     |
| `rotated`           | boolean  | No                             | Schematic orientation only — wires exit top/bottom when true                         |
| `locationId`        | string   | No                             | ID of a Connector, Terminal, or BranchPoint for physical placement. Usually omitted. |
| `partId`            | string   | No                             | ID of a `DiodePart` in `diodeParts`                                                  |
| `coveringIds`       | string[] | No                             | IDs of `CoveringPart`s                                                               |
| `excludeFromBom`    | boolean  | No                             | Exclude from BOM                                                                     |

---

### Resistor

An inline resistor placed in series with a wire. Wires connect using `"Left"` or `"Right"` as the handle. Fields are identical to [Diode](#diode) minus `anodeOnRight`.

```json
{
  "id": "r1",
  "schematicPosition": { "x": 390, "y": 420 },
  "rotated": false,
  "locationId": "J1",
  "partId": "rp1"
}
```

---

### Cable

A multi-conductor sheathed assembly. Cables appear in the **schematic view only**. The cable node sits centrally between the elements its cores connect — similar to a TwistedWires node. Each core is a conductor with its own source and target connection points.

```json
{
  "id": "cab1",
  "schematicPosition": { "x": 390, "y": 210 },
  "rotated": false,
  "partId": "cablePart1",
  "cores": [
    {
      "id": "core_1",
      "color": "Red",
      "source": { "id": "J1", "handle": "cav_1" },
      "target": { "id": "J2", "handle": "cav_a" }
    },
    {
      "id": "core_2",
      "color": "Black",
      "stripeColor": "White",
      "source": { "id": "J1", "handle": "cav_2" },
      "target": { "id": "J2", "handle": "cav_b" }
    }
  ],
  "shield": {
    "id": "shield_1",
    "color": "Shield",
    "source": { "id": "spl_gnd", "handle": "Splice" }
  }
}
```

| Field               | Type        | Required | Description                                                                    |
| ------------------- | ----------- | -------- | ------------------------------------------------------------------------------ |
| `id`                | string      | Yes      | Unique ID                                                                      |
| `schematicPosition` | `{x, y}`    | Yes      | Position of the cable node in the schematic                                    |
| `rotated`           | boolean     | No       | Schematic orientation only                                                     |
| `partId`            | string      | No       | ID of a `CablePart` in `cableParts`                                            |
| `cores`             | CableCore[] | Yes      | The individual conductors                                                      |
| `shield`            | CableCore   | No       | Shield/drain wire — may connect to only one endpoint (`target` can be omitted) |

#### CableCore

Cable cores get their color and gauge properties from the parent `CablePart` — they do not have their own `partId`. The `color` and `stripeColor` fields on the core should match the corresponding `CableCorePart` in the assigned `CablePart`.

| Field                | Type            | Required | Description                                                          |
| -------------------- | --------------- | -------- | -------------------------------------------------------------------- |
| `id`                 | string          | Yes      | Unique ID                                                            |
| `color`              | PartColor       | Yes      | Conductor color                                                      |
| `stripeColor`        | PartColor       | No       | Stripe color                                                         |
| `identColors`        | PartColor[]     | No       | Additional identification colors                                     |
| `identLabel`         | string          | No       | Text identification label                                            |
| `source`             | ConnectionPoint | No       | One end — same handle rules as [Connection Model](#connection-model) |
| `target`             | ConnectionPoint | No       | Other end (can be omitted for shield cores with only one connection) |
| `sourceLayoutPoints` | array           | No       | Layout waypoints on the source-side path                             |
| `targetLayoutPoints` | array           | No       | Layout waypoints on the target-side path                             |

---

### TwistedWires

Two or more wires (up to 8) twisted together, represented as a single schematic node with a central position. The node sits between the elements its wires connect — similar to a Cable node. Each inner wire has its own source and target connections using the same handle rules as regular wires.

```json
{
  "id": "tw1",
  "schematicPosition": { "x": 390, "y": 210 },
  "rotated": false,
  "wires": [
    {
      "id": "tw_w1",
      "color": "Blue",
      "source": { "id": "J1", "handle": "cav_1" },
      "target": { "id": "J2", "handle": "cav_a" },
      "partId": "wp1"
    },
    {
      "id": "tw_w2",
      "color": "White",
      "stripeColor": "Blue",
      "source": { "id": "J1", "handle": "cav_2" },
      "target": { "id": "J2", "handle": "cav_b" },
      "partId": "wp1"
    }
  ]
}
```

| Field               | Type        | Required | Description                           |
| ------------------- | ----------- | -------- | ------------------------------------- |
| `id`                | string      | Yes      | Unique ID                             |
| `schematicPosition` | `{x, y}`    | Yes      | Position of the node in the schematic |
| `rotated`           | boolean     | No       | Schematic orientation only            |
| `wires`             | SplitWire[] | Yes      | The twisted conductors (2–8 wires)    |

Each wire inside `wires` supports: `id`, `color`, `stripeColor`, `identColors`, `identLabel`, `source`, `target`, `partId`, `coveringIds`, `excludeFromBom`. The `color`/`stripeColor` should match the assigned `WirePart` if `partId` is set.

---

### Bundle

Represents a physical routing path between two elements in the layout view. Bundles define the route that grouped wires follow through the physical harness.

```json
{
  "id": "bun1",
  "sourceId": "J1",
  "targetId": "J2",
  "length": { "value": 250, "unit": "mm" },
  "label": "Main Trunk",
  "labelColor": "Black",
  "coveringIds": ["cov1"],
  "layoutPoints": [{ "id": "blp1", "layoutPosition": { "x": 600, "y": 330 } }]
}
```

| Field          | Type                | Required | Description                                   |
| -------------- | ------------------- | -------- | --------------------------------------------- |
| `id`           | string              | Yes      | Unique ID                                     |
| `sourceId`     | string              | Yes      | ID of a Connector, Terminal, or BranchPoint   |
| `targetId`     | string              | Yes      | ID of a Connector, Terminal, or BranchPoint   |
| `length`       | `{value, unit}`     | No       | Physical length of this bundle segment        |
| `label`        | string              | No       | Label displayed on the bundle in layout view  |
| `labelColor`   | PartColor           | No       | Color of the label text                       |
| `coveringIds`  | string[]            | No       | IDs of `CoveringPart`s applied to this bundle |
| `layoutPoints` | BundleLayoutPoint[] | No       | Waypoints shaping the bundle's route          |

---

### BranchPoint

A junction in the physical layout where bundles split or join. Appears in the **layout view only**.

```json
{
  "id": "bp1",
  "layoutPosition": { "x": 690, "y": 390 },
  "coveringIds": [],
  "bootPartId": "boot1"
}
```

| Field            | Type     | Required | Description                                                 |
| ---------------- | -------- | -------- | ----------------------------------------------------------- |
| `id`             | string   | Yes      | Unique ID                                                   |
| `layoutPosition` | `{x, y}` | Yes      | Position in layout view                                     |
| `coveringIds`    | string[] | No       | IDs of `CoveringPart`s                                      |
| `bootPartId`     | string   | No       | ID of a `BootPart` (protective boot at the branch junction) |

---

### Mate

Represents a physical mating between two connectors, two terminals, or a terminal and a connector in the layout view.

Connector-to-connector mate:

```json
{ "id": "m1", "sourceId": "J1", "targetId": "J2" }
```

Terminal-to-connector mate (must specify which cavity):

```json
{ "id": "m2", "sourceId": "term_1", "targetId": "J1", "targetCavityId": "cav_3" }
```

Terminal-to-terminal mate:

```json
{ "id": "m3", "sourceId": "term_1", "targetId": "term_2" }
```

| Field            | Type   | Required                                       | Description                             |
| ---------------- | ------ | ---------------------------------------------- | --------------------------------------- |
| `id`             | string | Yes                                            | Unique ID                               |
| `sourceId`       | string | Yes                                            | ID of the first connector or terminal   |
| `targetId`       | string | Yes                                            | ID of the second connector or terminal  |
| `targetCavityId` | string | Required when mating a terminal to a connector | The cavity `id` the terminal mates into |

---

### Frame

A logical grouping box that visually encompasses other elements in the **schematic view only**. The frame's position and size are automatically calculated from its member elements — no position fields are needed or used.

```json
{
  "id": "frame_1",
  "label": "ECU Module",
  "elements": ["J1", "J2", "w1", "w2"],
  "partId": "fp1"
}
```

| Field      | Type     | Required | Description                              |
| ---------- | -------- | -------- | ---------------------------------------- |
| `id`       | string   | Yes      | Unique ID                                |
| `label`    | string   | No       | Display label shown on the frame         |
| `elements` | string[] | Yes      | IDs of elements grouped inside the frame |
| `partId`   | string   | No       | ID of a `FramePart`                      |

---

### SchematicNote / LayoutNote

Free text annotations. `SchematicNote` appears in the schematic view only; `LayoutNote` in the layout view only.

```json
{
  "id": "note_1",
  "text": "High voltage section — handle with care",
  "schematicPosition": { "x": 300, "y": 90 },
  "color": "Yellow",
  "width": 150,
  "alignment": "Left",
  "verticalAlignment": "Top"
}
```

| Field                                  | Type                  | Description                        |
| -------------------------------------- | --------------------- | ---------------------------------- |
| `id`                                   | string                | Unique ID                          |
| `text`                                 | string                | Note content                       |
| `schematicPosition` / `layoutPosition` | `{x, y}`              | Position in the respective view    |
| `color`                                | PartColor             | Background/accent color            |
| `width`                                | NodeWidth             | Display width                      |
| `alignment`                            | NoteTextAlignment     | `"Left"`, `"Center"`, or `"Right"` |
| `verticalAlignment`                    | NoteVerticalAlignment | `"Top"`, `"Middle"`, or `"Bottom"` |

---

## Parts

Parts are the actual manufacturing components. They live in their own arrays (`wireParts`, `connectorParts`, etc.) and are referenced by electrical components via `partId`.

### Common Part Fields

All parts share these base fields:

| Field          | Type      | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| `id`           | string    | Unique ID — referenced by components via `partId` |
| `partNumber`   | string    | Manufacturer part number                          |
| `manufacturer` | string    | Manufacturer name                                 |
| `description`  | string    | Human-readable description                        |
| `url`          | string    | Datasheet or product URL                          |
| `color`        | PartColor | Part color (for visual display)                   |

Parts that have a unit price add:

| Field   | Type   | Description    |
| ------- | ------ | -------------- |
| `price` | number | Price per unit |

Parts that are priced by length add:

| Field            | Type            | Description              |
| ---------------- | --------------- | ------------------------ |
| `pricePerLength` | `{price, unit}` | Price per unit of length |

Parts with gauge constraints add:

| Field      | Type            | Description                   |
| ---------- | --------------- | ----------------------------- |
| `minGauge` | `{value, unit}` | Minimum compatible wire gauge |
| `maxGauge` | `{value, unit}` | Maximum compatible wire gauge |

---

### ConnectorPart

```json
{
  "id": "cp1",
  "partNumber": "1-123456-1",
  "manufacturer": "TE Connectivity",
  "description": "2-pin housing, female",
  "gender": "Female",
  "numberOfCavities": 2,
  "hasShell": false,
  "designationStrategy": { "type": "sequential" },
  "configurations": [
    {
      "id": "cfg_default",
      "lockPartId": "lp1",
      "contactPartId": "cont1"
    },
    {
      "id": "cfg_with_backshell",
      "name": "With Backshell",
      "backshellPartId": "bs1",
      "contactPartId": "cont1"
    }
  ],
  "price": 1.25
}
```

| Field                 | Type                         | Description                                                                                   |
| --------------------- | ---------------------------- | --------------------------------------------------------------------------------------------- |
| `gender`              | ConnectorGender              | `"Male"` or `"Female"`. Can be omitted for connectors with no gender (e.g. neutral housings). |
| `numberOfCavities`    | number                       | Total cavity count                                                                            |
| `hasShell`            | boolean                      | Whether the connector has a shell/shield cavity                                               |
| `designationStrategy` | CavityDesignationStrategy    | How cavity positions are labelled in the UI                                                   |
| `configurations`      | ConnectorPartConfiguration[] | Available hardware configurations                                                             |

#### CavityDesignationStrategy

Controls how cavity positions are labelled in the UI (does not affect IDs):

```json
{ "type": "sequential" }
{ "type": "alphabetical", "skippedLetters": ["I", "O"] }
{ "type": "custom", "labels": ["A1", "B1", "A2", "B2"] }
{
  "type": "grid",
  "rows": 2,
  "columns": 3,
  "rowLabels": { "type": "alphabetical" },
  "columnLabels": { "type": "sequential" }
}
```

#### ConnectorPartConfiguration

Defines a combination of accessories for a connector. The **first configuration is the default** and is applied automatically — its `name` should be left blank. Additional configurations can have names.

| Field             | Type   | Description                                                                    |
| ----------------- | ------ | ------------------------------------------------------------------------------ |
| `id`              | string | Unique ID — referenced by `Connector.configurationId`                          |
| `name`            | string | Configuration name. Leave blank for the first (default) configuration.         |
| `lockPartId`      | string | ID of a `LockPart`                                                             |
| `dustCoverPartId` | string | ID of a `DustCoverPart`                                                        |
| `backshellPartId` | string | ID of a `BackshellPart`                                                        |
| `contactPartId`   | string | ID of a `ContactPart` (default contact for all cavities in this configuration) |
| `bootPartId`      | string | ID of a `BootPart`                                                             |

---

### WirePart

```json
{
  "id": "wp1",
  "partNumber": "GXL-18-RD",
  "manufacturer": "Belden",
  "color": "Red",
  "stripeColor": "White",
  "gauge": { "value": 18, "unit": "AWG" },
  "pricePerLength": { "price": 0.15, "unit": "m" }
}
```

| Field            | Type            | Required | Description                                      |
| ---------------- | --------------- | -------- | ------------------------------------------------ |
| `color`          | PartColor       | Yes      | Wire insulation color                            |
| `stripeColor`    | PartColor       | No       | Stripe color                                     |
| `gauge`          | `{value, unit}` | No       | Wire gauge (e.g. `{"value": 18, "unit": "AWG"}`) |
| `pricePerLength` | `{price, unit}` | No       | Price per length unit                            |

---

### TerminalPart

```json
{
  "id": "tp1",
  "partNumber": "3240102",
  "manufacturer": "Molex",
  "type": "Ferrule",
  "size": { "value": 1.0, "unit": "mm" },
  "minGauge": { "value": 18, "unit": "AWG" },
  "maxGauge": { "value": 22, "unit": "AWG" },
  "price": 0.3
}
```

| Field                   | Type                      | Required | Description                                       |
| ----------------------- | ------------------------- | -------- | ------------------------------------------------- |
| `type`                  | TerminalType              | Yes      | Terminal type — see [TerminalType](#terminaltype) |
| `size`                  | `{value, unit}` or string | No       | Physical size specification                       |
| `minGauge` / `maxGauge` | `{value, unit}`           | No       | Gauge compatibility range                         |

---

### SplicePart

```json
{
  "id": "sp1",
  "partNumber": "SRMAD2S2022Q",
  "manufacturer": "3M",
  "minGauge": { "value": 20, "unit": "AWG" },
  "maxGauge": { "value": 22, "unit": "AWG" },
  "price": 0.25
}
```

---

### ContactPart

A pin or socket inserted into a connector cavity.

```json
{
  "id": "cont1",
  "partNumber": "170031-1",
  "manufacturer": "TE Connectivity",
  "gender": "Pin",
  "type": "Crimp",
  "minGauge": { "value": 18, "unit": "AWG" },
  "maxGauge": { "value": 22, "unit": "AWG" },
  "price": 0.45
}
```

| Field    | Type          | Description                           |
| -------- | ------------- | ------------------------------------- |
| `gender` | ContactGender | `"Pin"` (male) or `"Socket"` (female) |
| `type`   | ContactType   | `"Crimp"`, `"Solder"`, or `"Other"`   |

---

### CoveringPart

Protective coverings applied to wires or bundles (heat shrink, tubing, tape, etc.).

```json
{
  "id": "cov1",
  "partNumber": "EPS200-1/4",
  "manufacturer": "Raychem",
  "type": "HeatShrink",
  "minDiameter": { "value": 3, "unit": "mm" },
  "maxDiameter": { "value": 9, "unit": "mm" },
  "isFixedLength": false,
  "pricePerLength": { "price": 0.5, "unit": "m" }
}
```

| Field           | Type            | Description                                  |
| --------------- | --------------- | -------------------------------------------- |
| `type`          | CoveringType    | See [CoveringType](#coveringtype)            |
| `minDiameter`   | `{value, unit}` | Minimum recoverable diameter                 |
| `maxDiameter`   | `{value, unit}` | Maximum diameter before recovery             |
| `isFixedLength` | boolean         | Whether this covering comes in fixed lengths |
| `length`        | `{value, unit}` | Fixed length, if `isFixedLength` is true     |

---

### DiodePart

```json
{
  "id": "dp1",
  "partNumber": "1N4007",
  "manufacturer": "ON Semi",
  "voltage": 1000,
  "voltageUnit": "V",
  "current": 1,
  "currentUnit": "A",
  "price": 0.1
}
```

---

### ResistorPart

```json
{
  "id": "rp1",
  "partNumber": "CFR-25JB-100R",
  "manufacturer": "Yageo",
  "resistance": 100,
  "resistanceUnit": "ohm",
  "power": 0.25,
  "powerUnit": "W",
  "price": 0.05
}
```

---

### CablePart

```json
{
  "id": "cabpart1",
  "partNumber": "CABLE-2C-18AWG",
  "manufacturer": "Alpha Wire",
  "shielded": false,
  "cores": [
    { "id": "ccp1", "color": "Red", "gauge": { "value": 18, "unit": "AWG" } },
    { "id": "ccp2", "color": "Black", "gauge": { "value": 18, "unit": "AWG" } }
  ],
  "pricePerLength": { "price": 1.2, "unit": "m" }
}
```

| Field      | Type            | Description                             |
| ---------- | --------------- | --------------------------------------- |
| `shielded` | boolean         | Whether the cable has an overall shield |
| `cores`    | CableCorePart[] | Specification for each conductor        |

**CableCorePart fields:** `id` (required), `color` (required), `stripeColor`, `gauge`

---

### FramePart, LockPart, DustCoverPart, BackshellPart, BootPart

These all share just the common part fields (`id`, `partNumber`, `manufacturer`, `description`, `url`, `color`, `price`):

```json
{ "id": "fp1", "partNumber": "BK-2000", "manufacturer": "Acme", "price": 0.8 }
```

---

## Enums Reference

### PartColor

`"Black"`, `"Brown"`, `"Red"`, `"Orange"`, `"Yellow"`, `"Green"`, `"Blue"`, `"Violet"`, `"Gray"`, `"White"`, `"Pink"`, `"Tan"`, `"Maroon"`, `"Light Yellow"`, `"Light Green"`, `"Light Blue"`, `"Light Gray"`, `"Transparent"`, `"Shield"`

### TerminalType

`"Ferrule"`, `"Ring"`, `"Spade"`, `"QuickConnectMale"`, `"QuickConnectFemale"`, `"Loose"`

### LengthUnit

`"mm"`, `"cm"`, `"m"`, `"in"`, `"ft"`, `"yd"`

### GaugeUnit

`"AWG"`, `"Metric"`, `"cmil"`, `"kcmil"`

### Currency

`"$"`, `"€"`, `"£"`, `"¥"`

### ConnectorGender

`"Male"`, `"Female"`

### ContactGender

`"Pin"` (male), `"Socket"` (female)

### ContactType

`"Crimp"`, `"Solder"`, `"Other"`

### CoveringType

`"HeatShrink"`, `"CorrugatedTubing"`, `"SpiralWrap"`, `"Tape"`, `"Tubing"`, `"BraidedSleeve"`, `"Other"`

### VoltageUnit

`"mV"`, `"V"`, `"kV"`

### CurrentUnit

`"mA"`, `"A"`, `"kA"`

### ResistanceUnit

`"mohm"`, `"ohm"`, `"kohm"`, `"Mohm"`

### PowerUnit

`"mW"`, `"W"`, `"kW"`

### NodeWidth

`60`, `90`, `150`, `210`, `270`, `390`

---

## Key Rules Summary

1. **`version` must be `0.8`** — always include this field.
2. **All IDs must be unique** across every element and part in the document. IDs are internal — never shown to the user.
3. **All positions are multiples of 30** — the canvas uses a 30-unit grid.
4. **CrossFlowElements require at least one position** — connectors, terminals, splices, diodes, and resistors always appear in both views. If only one position is given, it is used for both views.
5. **Cavity IDs are the wire handle for connectors** — use the cavity's `id` as the `handle` in the `ConnectionPoint`.
6. **Handle values by element type**: Terminal → `"Terminal"`, Splice → `"Splice"`, Diode/Resistor → `"Left"` or `"Right"`.
7. **Wire color must match its part** — when `partId` is set, `color` and `stripeColor` must match the `WirePart`'s properties.
8. **Cable cores have no partId** — cores inherit properties from the parent `CablePart`.
9. **Empty arrays are omitted** — only include arrays that contain data.
10. **Frame positions are auto-calculated** — do not specify positions on frames; the app calculates them from the contained elements.
11. **`locationId` on inline components is usually omitted** — the app calculates the physical placement automatically, which is preferred for LLM-generated harnesses.

---

## Complete Example

A real-world harness featuring connectors, terminals, a cable, twisted wires, a diode, a splice, bundles, branch points, frames, and a full parts library:

```json
{
  "version": 0.8,
  "lengthUnit": "in",
  "gaugeUnit": "AWG",
  "wires": [
    {
      "id": "p4C0",
      "color": "Black",
      "partId": "hHJx",
      "source": {
        "id": "bnx1",
        "handle": "Terminal"
      },
      "target": {
        "id": "ldgd",
        "handle": "Biby"
      },
      "layoutPoints": [
        {
          "id": "MI-a3z",
          "schematicPosition": {
            "x": 900,
            "y": 870
          }
        },
        {
          "id": "dMu9K3",
          "schematicPosition": {
            "x": 900,
            "y": 510
          }
        }
      ]
    },
    {
      "id": "Sp2Z",
      "color": "Pink",
      "partId": "Ne4i",
      "source": {
        "id": "ldgd",
        "handle": "JMcF"
      },
      "target": {
        "id": "o-ob",
        "handle": "xUsq"
      }
    },
    {
      "id": "DIgn",
      "color": "Red",
      "partId": "8F3f",
      "source": {
        "id": "DTn_",
        "handle": "Splice"
      },
      "target": {
        "id": "ldgd",
        "handle": "sW2_"
      }
    },
    {
      "id": "OVWs",
      "color": "Red",
      "partId": "8F3f",
      "source": {
        "id": "DTn_",
        "handle": "Splice"
      },
      "target": {
        "id": "o-ob",
        "handle": "MHZ6"
      }
    },
    {
      "id": "9tbL",
      "color": "Orange",
      "partId": "QNE-",
      "source": {
        "id": "EwNH",
        "handle": "Left"
      },
      "target": {
        "id": "rBx6",
        "handle": "Terminal"
      }
    },
    {
      "id": "nBsJ",
      "color": "Orange",
      "partId": "QNE-",
      "source": {
        "id": "EwNH",
        "handle": "Right"
      },
      "target": {
        "id": "ldgd",
        "handle": "znO-"
      },
      "layoutPoints": [
        {
          "id": "VN4kMD",
          "schematicPosition": {
            "x": 870,
            "y": 780
          }
        },
        {
          "id": "A7AxD8",
          "schematicPosition": {
            "x": 870,
            "y": 480
          }
        }
      ]
    },
    {
      "id": "06kcze",
      "color": "Red",
      "partId": "8F3f",
      "source": {
        "id": "liFLYR",
        "handle": "41zPJn"
      },
      "target": {
        "id": "cwTybA",
        "handle": "djD6l4"
      }
    },
    {
      "id": "5EumQx",
      "color": "Violet",
      "source": {
        "id": "liFLYR",
        "handle": "a_yeAK"
      },
      "target": {
        "id": "cwTybA",
        "handle": "oS2UCw"
      }
    },
    {
      "id": "e_Hlxl",
      "color": "Brown",
      "source": {
        "id": "cwTybA",
        "handle": "l56K30"
      },
      "target": {
        "id": "liFLYR",
        "handle": "vzai3X"
      }
    }
  ],
  "connectors": [
    {
      "id": "o-ob",
      "label": "Motor",
      "partId": "bxk2",
      "layoutPosition": {
        "x": 420,
        "y": 120
      },
      "schematicPosition": {
        "x": 150,
        "y": 210
      },
      "cavities": [
        {
          "id": "Yi-I",
          "contactPartId": "OEl6"
        },
        {
          "id": "Q6o7",
          "contactPartId": "OEl6"
        },
        {
          "id": "IYVR",
          "contactPartId": "OEl6"
        },
        {
          "id": "MHZ6",
          "contactPartId": "TnIO"
        },
        {
          "id": "xUsq",
          "contactPartId": "TnIO"
        }
      ]
    },
    {
      "id": "ldgd",
      "label": "Controller",
      "partId": "0sF8",
      "layoutPosition": {
        "x": 1050,
        "y": 210
      },
      "schematicPosition": {
        "x": 990,
        "y": 210
      },
      "cavities": [
        {
          "id": "RIrS",
          "signal": "Phase U",
          "contactPartId": "Dyod"
        },
        {
          "id": "0B8m",
          "signal": "Phase V",
          "contactPartId": "Dyod"
        },
        {
          "id": "XBxw",
          "signal": "Phase W",
          "contactPartId": "Dyod"
        },
        {
          "id": "sW2_",
          "signal": "5V",
          "contactPartId": "EhjT"
        },
        {
          "id": "JMcF",
          "signal": "Temp",
          "contactPartId": "EhjT"
        },
        {
          "id": "LC63",
          "signal": "SIG 1",
          "contactPartId": "EhjT"
        },
        {
          "id": "bKCz",
          "signal": "GND",
          "contactPartId": "EhjT"
        },
        {
          "id": "dHl4",
          "signal": "Shield",
          "contactPartId": "Dyod"
        },
        {
          "id": "znO-",
          "signal": "Bat +",
          "contactPartId": "Dyod"
        },
        {
          "id": "Biby",
          "signal": "Bat -"
        }
      ]
    },
    {
      "id": "ZuAT",
      "label": "Inline",
      "partId": "y2bR",
      "layoutPosition": {
        "x": 630,
        "y": 300
      },
      "schematicPosition": {
        "x": 360,
        "y": 480
      },
      "cavities": [
        {
          "id": "XNv-",
          "contactPartId": "TnIO"
        },
        {
          "id": "iiqb",
          "contactPartId": "TnIO"
        },
        {
          "id": "SrNY23",
          "contactPartId": "TnIO"
        }
      ],
      "shell": {
        "id": "FcHPjV"
      }
    },
    {
      "id": "cwTybA",
      "label": "Inline",
      "partId": "5mSXoU",
      "layoutPosition": {
        "x": 510,
        "y": 300
      },
      "schematicPosition": {
        "x": 150,
        "y": 480
      },
      "cavities": [
        {
          "id": "djD6l4",
          "contactPartId": "GIEEsn"
        },
        {
          "id": "oS2UCw",
          "contactPartId": "GIEEsn"
        },
        {
          "id": "l56K30",
          "contactPartId": "GIEEsn"
        }
      ],
      "shell": {
        "id": "FcHPjV"
      }
    },
    {
      "id": "liFLYR",
      "label": "Throttle",
      "partId": "6GcgSe",
      "layoutPosition": {
        "x": 420,
        "y": 390
      },
      "schematicPosition": {
        "x": -120,
        "y": 480
      },
      "cavities": [
        {
          "id": "41zPJn"
        },
        {
          "id": "a_yeAK"
        },
        {
          "id": "vzai3X"
        }
      ]
    }
  ],
  "terminals": [
    {
      "id": "rBx6",
      "type": "Ring",
      "partId": "-xUh",
      "signal": "14.8V",
      "layoutPosition": {
        "x": 1050,
        "y": 330
      },
      "schematicPosition": {
        "x": 360,
        "y": 780
      }
    },
    {
      "id": "bnx1",
      "type": "Ring",
      "partId": "-xUh",
      "signal": "GND",
      "layoutPosition": {
        "x": 1050,
        "y": 390
      },
      "schematicPosition": {
        "x": 360,
        "y": 870
      }
    }
  ],
  "cables": [
    {
      "id": "UKZX",
      "schematicPosition": {
        "x": 600,
        "y": 480
      },
      "partId": "Vmtv",
      "cores": [
        {
          "id": "Ul1z",
          "color": "Red",
          "source": {
            "id": "ZuAT",
            "handle": "XNv-"
          },
          "target": {
            "id": "DTn_",
            "handle": "Splice"
          },
          "targetLayoutPoints": [
            {
              "id": "M5Xe20",
              "schematicPosition": {
                "x": 720,
                "y": 510
              }
            }
          ]
        },
        {
          "id": "5ZSq",
          "color": "Green",
          "source": {
            "id": "ZuAT",
            "handle": "iiqb"
          },
          "target": {
            "id": "ldgd",
            "handle": "LC63"
          },
          "targetLayoutPoints": [
            {
              "id": "dM2iwy",
              "schematicPosition": {
                "x": 750,
                "y": 540
              }
            },
            {
              "id": "kxRnaX",
              "schematicPosition": {
                "x": 750,
                "y": 390
              }
            }
          ]
        },
        {
          "id": "bt-Y",
          "color": "Brown",
          "source": {
            "id": "ldgd",
            "handle": "bKCz"
          },
          "target": {
            "id": "ZuAT",
            "handle": "SrNY23"
          },
          "sourceLayoutPoints": [
            {
              "id": "QkVtHS",
              "schematicPosition": {
                "x": 780,
                "y": 570
              }
            },
            {
              "id": "JWo8zw",
              "schematicPosition": {
                "x": 780,
                "y": 420
              }
            }
          ]
        }
      ],
      "shield": {
        "id": "OP6H",
        "color": "Shield",
        "source": {
          "id": "ldgd",
          "handle": "dHl4"
        },
        "target": {
          "id": "ZuAT",
          "handle": "FcHPjV"
        },
        "sourceLayoutPoints": [
          {
            "id": "PO67hj",
            "schematicPosition": {
              "x": 810,
              "y": 600
            }
          },
          {
            "id": "p2w1JZ",
            "schematicPosition": {
              "x": 810,
              "y": 450
            }
          }
        ]
      }
    }
  ],
  "twistedWires": [
    {
      "id": "6_u7IL",
      "schematicPosition": {
        "x": 570,
        "y": 210
      },
      "wires": [
        {
          "id": "aIpnUw",
          "color": "Blue",
          "partId": "gIQ1",
          "source": {
            "id": "o-ob",
            "handle": "Yi-I"
          },
          "target": {
            "id": "ldgd",
            "handle": "RIrS"
          }
        },
        {
          "id": "rYUBj5",
          "color": "Yellow",
          "partId": "8uqJ",
          "source": {
            "id": "o-ob",
            "handle": "Q6o7"
          },
          "target": {
            "id": "ldgd",
            "handle": "0B8m"
          }
        },
        {
          "id": "h1xShz",
          "color": "Green",
          "partId": "9xdI",
          "source": {
            "id": "o-ob",
            "handle": "IYVR"
          },
          "target": {
            "id": "ldgd",
            "handle": "XBxw"
          }
        }
      ]
    }
  ],
  "diodes": [
    {
      "id": "EwNH",
      "partId": "SUc-",
      "locationId": "nkXS",
      "layoutPosition": {
        "x": 870,
        "y": 150
      },
      "schematicPosition": {
        "x": 720,
        "y": 780
      }
    }
  ],
  "splices": [
    {
      "id": "DTn_",
      "partId": "P3zw",
      "locationId": "ldgd",
      "layoutPosition": {
        "x": 1050,
        "y": 150
      },
      "schematicPosition": {
        "x": 720,
        "y": 330
      }
    }
  ],
  "bundles": [
    {
      "id": "EG0l",
      "length": {
        "unit": "mm",
        "value": 30
      },
      "sourceId": "ldgd",
      "targetId": "nkXS"
    },
    {
      "id": "un8Y",
      "label": "Bat +",
      "labelColor": "Red",
      "sourceId": "rBx6",
      "targetId": "Dd3Q"
    },
    {
      "id": "l_jh",
      "length": {
        "unit": "mm",
        "value": 120
      },
      "sourceId": "nkXS",
      "targetId": "Dd3Q",
      "layoutPoints": [
        {
          "id": "6uIMSf",
          "layoutPosition": {
            "x": 870,
            "y": 360
          }
        }
      ]
    },
    {
      "id": "OKbl",
      "label": "BAT -",
      "labelColor": "Black",
      "sourceId": "Dd3Q",
      "targetId": "bnx1"
    },
    {
      "id": "DkaK",
      "length": {
        "unit": "mm",
        "value": 200
      },
      "sourceId": "nkXS",
      "targetId": "bNJD"
    },
    {
      "id": "cllf",
      "length": {
        "unit": "mm",
        "value": 80
      },
      "sourceId": "ZuAT",
      "targetId": "bNJD"
    },
    {
      "id": "KYU3",
      "length": {
        "unit": "mm",
        "value": 150
      },
      "sourceId": "o-ob",
      "targetId": "bNJD",
      "layoutPoints": [
        {
          "id": "kp1Dh-",
          "layoutPosition": {
            "x": 690,
            "y": 120
          }
        }
      ]
    },
    {
      "id": "tjYiQr",
      "sourceId": "liFLYR",
      "targetId": "cwTybA",
      "layoutPoints": [
        {
          "id": "oZk9-W",
          "layoutPosition": {
            "x": 420,
            "y": 300
          }
        }
      ]
    }
  ],
  "mates": [
    {
      "id": "H0KRYm",
      "sourceId": "cwTybA",
      "targetId": "ZuAT"
    }
  ],
  "frames": [
    {
      "id": "Lc1JP9",
      "label": "Battery",
      "partId": "pvgRGG",
      "elements": ["rBx6", "bnx1"]
    }
  ],
  "branchPoints": [
    {
      "id": "nkXS",
      "layoutPosition": {
        "x": 870,
        "y": 210
      }
    },
    {
      "id": "Dd3Q",
      "layoutPosition": {
        "x": 960,
        "y": 360
      }
    },
    {
      "id": "bNJD",
      "layoutPosition": {
        "x": 750,
        "y": 210
      }
    }
  ],
  "wireParts": [
    {
      "id": "QNE-",
      "color": "Orange",
      "gauge": {
        "unit": "AWG",
        "value": 6
      },
      "partNumber": "GW0806ORG",
      "manufacturer": "GeneralWire Tech"
    },
    {
      "id": "hHJx",
      "color": "Black",
      "gauge": {
        "unit": "AWG",
        "value": 6
      },
      "partNumber": "GW0806BLK",
      "manufacturer": "GeneralWire Tech"
    },
    {
      "id": "8F3f",
      "color": "Red",
      "gauge": {
        "unit": "AWG",
        "value": 20
      },
      "partNumber": "GW0520RD",
      "manufacturer": "GeneralWire Tech"
    },
    {
      "id": "gIQ1",
      "color": "Blue",
      "gauge": {
        "unit": "AWG",
        "value": 6
      },
      "partNumber": "GW0806OBL",
      "manufacturer": "GeneralWire Tech"
    },
    {
      "id": "8uqJ",
      "color": "Yellow",
      "gauge": {
        "unit": "AWG",
        "value": 6
      },
      "partNumber": "GW0806YL",
      "manufacturer": "GeneralWire Tech"
    },
    {
      "id": "9xdI",
      "color": "Green",
      "gauge": {
        "unit": "AWG",
        "value": 6
      },
      "partNumber": "GW0806GRN",
      "manufacturer": "GeneralWire Tech"
    },
    {
      "id": "Ne4i",
      "color": "Pink",
      "gauge": {
        "unit": "AWG",
        "value": 20
      },
      "partNumber": "GW0520PK",
      "manufacturer": "GeneralWire Tech"
    }
  ],
  "cableParts": [
    {
      "id": "Vmtv",
      "color": "Black",
      "shielded": true,
      "partNumber": "GW0320-C",
      "manufacturer": "GeneralWire Tech",
      "cores": [
        {
          "id": "JHGl",
          "color": "Red",
          "gauge": {
            "unit": "AWG",
            "value": 20
          }
        },
        {
          "id": "Q1HA",
          "color": "Green",
          "gauge": {
            "unit": "AWG",
            "value": 20
          }
        },
        {
          "id": "na_E",
          "color": "Brown",
          "gauge": {
            "unit": "AWG",
            "value": 20
          }
        }
      ]
    }
  ],
  "diodeParts": [
    {
      "id": "SUc-",
      "current": 6,
      "voltage": 42,
      "partNumber": "D483",
      "manufacturer": "Universal Electric"
    }
  ],
  "spliceParts": [
    {
      "id": "P3zw",
      "partNumber": "1867S-SCI",
      "manufacturer": "StandCon Inc."
    }
  ],
  "contactParts": [
    {
      "id": "TnIO",
      "type": "Crimp",
      "gender": "Pin",
      "maxGauge": {
        "unit": "AWG",
        "value": 16
      },
      "minGauge": {
        "unit": "AWG",
        "value": 20
      },
      "partNumber": "UEK-SM01",
      "manufacturer": "Universal Electric"
    },
    {
      "id": "OEl6",
      "type": "Crimp",
      "gender": "Pin",
      "maxGauge": {
        "unit": "AWG",
        "value": 6
      },
      "minGauge": {
        "unit": "AWG",
        "value": 8
      },
      "partNumber": "UEK-SM04",
      "manufacturer": "Universal Electric"
    },
    {
      "id": "EhjT",
      "type": "Crimp",
      "gender": "Socket",
      "maxGauge": {
        "unit": "AWG",
        "value": 18
      },
      "minGauge": {
        "unit": "AWG",
        "value": 22
      },
      "partNumber": "1822-PWS",
      "manufacturer": "Power Link Ltd."
    },
    {
      "id": "Dyod",
      "type": "Crimp",
      "gender": "Socket",
      "maxGauge": {
        "unit": "AWG",
        "value": 6
      },
      "minGauge": {
        "unit": "AWG",
        "value": 8
      },
      "partNumber": "0608-PWS",
      "manufacturer": "Power Link Ltd."
    },
    {
      "id": "GIEEsn",
      "type": "Crimp",
      "gender": "Socket",
      "maxGauge": {
        "unit": "AWG",
        "value": 16
      },
      "minGauge": {
        "unit": "AWG",
        "value": 20
      },
      "partNumber": "UEK-SF01",
      "manufacturer": "Universal Electric"
    }
  ],
  "terminalParts": [
    {
      "id": "-xUh",
      "size": {
        "unit": "mm",
        "value": 4
      },
      "type": "Ring",
      "color": "Gray",
      "maxGauge": {
        "unit": "AWG",
        "value": 6
      },
      "minGauge": {
        "unit": "AWG",
        "value": 8
      },
      "partNumber": "06R-SCI",
      "manufacturer": "StandCon Inc."
    }
  ],
  "connectorParts": [
    {
      "id": "y2bR",
      "color": "Blue",
      "gender": "Female",
      "hasShell": true,
      "partNumber": "UEK04-04-S",
      "manufacturer": "Universal Electric",
      "numberOfCavities": 3
    },
    {
      "id": "bxk2",
      "color": "Blue",
      "gender": "Male",
      "partNumber": "UEK04-05",
      "manufacturer": "Universal Electric",
      "numberOfCavities": 5
    },
    {
      "id": "0sF8",
      "color": "Orange",
      "gender": "Male",
      "hasShell": false,
      "partNumber": "PW-10-MK-06",
      "manufacturer": "Power Link Ltd.",
      "numberOfCavities": 10,
      "designationStrategy": {
        "type": "custom",
        "labels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
      }
    },
    {
      "id": "5mSXoU",
      "color": "Blue",
      "gender": "Male",
      "hasShell": true,
      "partNumber": "UEK04-03-S",
      "manufacturer": "Universal Electric",
      "numberOfCavities": 3
    },
    {
      "id": "6GcgSe",
      "url": "nexbridgeelectronics.fake/connectors/nexlock",
      "color": "White",
      "gender": "Male",
      "partNumber": "NLK-3P-M-GY",
      "description": "2.54 Male Connector",
      "manufacturer": "Nexbridge Electronics Co.",
      "numberOfCavities": 3
    }
  ],
  "frameParts": [
    {
      "id": "pvgRGG",
      "url": "https://vortexpowersystems.fake/products/vpx-9400-4s",
      "color": "Blue",
      "partNumber": "VPX-9400 UltraCell 4S",
      "description": "4S1P 14.8 V Li-Ion Battery",
      "manufacturer": "Vortex Power Systems"
    }
  ]
}
```
