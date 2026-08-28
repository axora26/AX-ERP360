---
version: alpha
name: AX-ERP360 Industrial Intelligence
description: Dense, calm and precise enterprise operations system for AXORA GROUP SARLU.
colors:
  primary: "#1E3A8A"
  secondary: "#2563EB"
  tertiary: "#111827"
  neutral: "#FFFFFF"
  canvas: "#F4F6F9"
  surface: "#FFFFFF"
  surface-subtle: "#EEF2F7"
  border: "#D5DAE1"
  text: "#111827"
  text-muted: "#5D6675"
  success: "#08783E"
  warning: "#8A5B00"
  danger: "#B42318"
  info: "#1D4ED8"
  dark-canvas: "#0B1120"
  dark-surface: "#111827"
  dark-surface-subtle: "#182235"
  dark-border: "#334155"
  dark-text: "#F8FAFC"
  dark-text-muted: "#BFC3C9"
typography:
  display:
    fontFamily: Montserrat, Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title-lg:
    fontFamily: Montserrat, Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.018em"
  title-md:
    fontFamily: Montserrat, Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 1.125rem
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  body-sm:
    fontFamily: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0em"
  label:
    fontFamily: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
    fontSize: 0.75rem
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "0.02em"
  data:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  navigation-active:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 8px
  status-success:
    backgroundColor: "#E8F5EE"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 8px
  status-warning:
    backgroundColor: "#FFF4D6"
    textColor: "{colors.warning}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 8px
  status-danger:
    backgroundColor: "#FDECEC"
    textColor: "{colors.danger}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 8px
  application-canvas:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-muted}"
  panel-border:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text}"
  info-message:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.info}"
  dark-application-canvas:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-text}"
  dark-panel:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text-muted}"
  dark-panel-subtle:
    backgroundColor: "{colors.dark-surface-subtle}"
    textColor: "{colors.dark-text}"
  dark-panel-border:
    backgroundColor: "{colors.dark-border}"
    textColor: "{colors.dark-text}"
---

## Overview

AX-ERP360 is primarily a **Monitor** surface with a strong **Operate** secondary posture. It is designed for rapid comprehension and safe action in construction, project control, finance, MEP, BIM and building operations. Information hierarchy, density and traceability take priority over decorative presentation.

## Colors

Deep Blue anchors authority and navigation. Technology Blue is reserved for interaction, current context and focus. Anthracite carries structure and data. Semantic colors communicate business state and must never be used as decoration. Light is the default productivity mode; dark is a complete alternative for control rooms and low-light use.

## Typography

Montserrat is limited to product identity, page titles and section titles. Inter carries navigation, forms, tables and dense data. Numeric columns use tabular figures in implementation. Type hierarchy is preferred over extra cards, icons or color.

## Layout

The desktop shell uses a collapsible left rail, a compact top context bar and a fluid workspace. Content follows an 8-pixel rhythm with 4-pixel micro-alignment. Primary actions remain close to the object they affect. Mobile uses task-focused cards, drawers and bottom actions instead of compressing desktop tables.

## Elevation & Depth

Elevation is functional: sticky navigation, menus, dialogs and transient feedback only. Most grouping uses borders, spacing and background contrast. Blur, glass effects and glossy gradients are prohibited in application workspaces.

## Shapes

Radii stay between 4 and 12 pixels for standard controls. Pills are limited to status, filters and compact identity. Large rounded rectangles must not substitute for hierarchy.

## Components

Data Grid, filters, forms, dialogs, empty states and error states share consistent focus, density and validation rules. Every visible action is functional, disabled with a reason, or explicitly marked “À venir”. Touch targets are at least 44 pixels on mobile.

## Do's and Don'ts

- Do optimize for decisions, exceptions, deadlines, cost and responsibility.
- Do identify demonstration data explicitly.
- Do preserve keyboard navigation and visible focus.
- Do not use heroes, feature-tile grids or monument metrics in operational screens.
- Do not invent business values or decorative statistics.
- Do not rely on color alone or hide critical authorization errors.
- Do not clone a third-party interface; transform enterprise principles into AXORA’s own system.
