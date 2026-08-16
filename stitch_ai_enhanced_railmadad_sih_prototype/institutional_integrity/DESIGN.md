---
name: Institutional Integrity
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#554241'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#887271'
  outline-variant: '#dbc1bf'
  surface-tint: '#9a4342'
  primary: '#5d1618'
  on-primary: '#ffffff'
  primary-container: '#7b2c2c'
  on-primary-container: '#ff9894'
  inverse-primary: '#ffb3af'
  secondary: '#af2853'
  on-secondary: '#ffffff'
  secondary-container: '#ff668e'
  on-secondary-container: '#6b002b'
  tertiary: '#003829'
  on-tertiary: '#ffffff'
  tertiary-container: '#00513d'
  on-tertiary-container: '#80c2a9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3af'
  on-primary-fixed: '#400106'
  on-primary-fixed-variant: '#7b2c2c'
  secondary-fixed: '#ffd9df'
  secondary-fixed-dim: '#ffb1c0'
  on-secondary-fixed: '#3f0016'
  on-secondary-fixed-variant: '#8e083c'
  tertiary-fixed: '#acf1d5'
  tertiary-fixed-dim: '#91d4ba'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#00513d'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
  background-alt: '#F4F4F4'
  status-resolved: '#2E7D32'
  status-pending: '#FF8F00'
  status-emergency: '#C62828'
  ai-accent: '#E3F2FD'
  ai-stroke: '#2196F3'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: auto
  max-width: 1280px
---

## Brand & Style

The design system is engineered for **AI-Enhanced RailMadad**, an evolution of the Indian Railways grievance redressal platform. The brand personality is **authoritative, reliable, and efficient**. It prioritizes accessibility and trust over decorative trends, ensuring that citizens from all demographics can navigate complex reporting tasks with ease.

The design style follows a **Modern Corporate** movement. It utilizes high-density layouts, clear visual hierarchies, and a systematic approach to information display. Unlike consumer-facing startups, this system emphasizes "Utility First," using AI not as a gimmick, but as a subtle, integrated layer that provides clarity and faster resolution through automated categorization and priority analysis.

## Colors

The palette is rooted in the heritage of Indian Railways. The **Primary Maroon-Brown (#7B2C2C)** serves as the anchor for headers, primary actions, and branding, evoking a sense of established authority. 

A secondary deep crimson is used sparingly for interactive elements to maintain visual interest without sacrificing professionalism. For semantic feedback, we use a strict "Traffic Light" system: **Green** for successful resolutions, **Amber** for active processing, and **Red** for critical/emergency flags.

AI-enhanced features are distinguished by a **Subtle Azure (#E3F2FD)** background and a technical blue stroke, signaling "Machine Intelligence" in a way that feels integrated into the official framework rather than a separate experimental tool.

## Typography

The design system utilizes **Inter** for all typographic needs. Inter’s tall x-height and neutral character make it exceptionally legible for data-heavy government portals.

- **Headlines:** Use Bold or Semi-Bold weights to create a strong information hierarchy.
- **Body:** Regular weight is preferred for readability. Line heights are kept generous (1.5x) to aid in scanning long grievance descriptions.
- **Data Labels:** Use Medium weight and slight letter spacing for technical metadata, such as PNR numbers or Complaint IDs, to differentiate them from prose.

## Layout & Spacing

This design system employs a **Fixed-Fluid Hybrid Grid**. On desktop, content is contained within a 1280px max-width container to prevent line lengths from becoming unreadable.

- **Grid Model:** 12-column grid for desktop, 6-column for tablet, and 2-column for mobile.
- **Rhythm:** An 8px base unit (derived from the 4px base token) governs all padding and margins.
- **Responsive Behavior:** On mobile, margins reduce to 16px. Cards and form elements stack vertically. AI analysis panels, which appear side-by-side on desktop, should collapse into expandable "Insights" drawers on mobile to save vertical space.

## Elevation & Depth

To maintain a professional, institutional feel, the system avoids heavy shadows. Instead, it uses **Tonal Layering** and **Structural Borders**.

1.  **Background (Level 0):** Used for the main body of the page.
2.  **Surface (Level 1):** White cards used for grievances and forms. These utilize a `1px` border in `#E0E0E0` and a very soft, 4px-blur shadow to separate them from the background.
3.  **Overlay (Level 2):** Modals and AI-driven tooltips. These use a more pronounced 12px blur shadow to indicate focus.
4.  **AI Layering:** AI-specific components use a specialized `1px` border in the `ai-stroke` color to visually signify that the content was machine-generated or analyzed.

## Shapes

The shape language is **Soft and Precise**. A 4px (0.25rem) base radius is applied to standard inputs, buttons, and form containers. This provides a modern touch without appearing overly "bubbly" or informal.

- **Primary Buttons:** 4px radius.
- **Status Badges:** Fully rounded (pill) to distinguish them from interactive buttons.
- **AI Indicators:** Use a subtle "sparkle" icon or a clipped-corner box-mask to denote "intelligent" content within standard cards.

## Components

### Navigation
The header must include the Ministry of Railways branding. It uses a deep Primary Brown background with white text. Navigation links should be clear, utilizing `label-md` for high legibility.

### Buttons
- **Primary:** Solid Primary Brown background, white text. No gradients.
- **Secondary:** Outline variant with Primary Brown text and border.
- **AI-Action:** Azure background with Blue-600 text, used for "Auto-fill with AI" or "Analyze Complaint."

### Grievance Cards
Structured cards with a clear `headline-sm` for the subject, a `label-sm` metadata bar (Date, PNR, Mode), and a right-aligned **Status Badge**.

### AI Analysis Cards
Specialized cards that appear inside a grievance detail view. They utilize a light blue tint and a left-accent border. They present "Predicted Department," "Sentiment Analysis," and "Suggested Resolution" with high-contrast labels.

### Forms
Input fields should be compact with `body-sm` text. Labels are placed above the fields in `label-sm` weight. Error states use the `status-emergency` red for both text and border.

### Status Badges
Small, high-contrast indicators. 
- **Resolved:** Green background, white text.
- **Pending:** Amber background, black text.
- **High Priority:** Red background, white text.