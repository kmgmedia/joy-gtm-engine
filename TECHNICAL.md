# Technical Details & Project Structure

## 📊 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts          # Main API endpoint
│   │   └── utils/
│   │       └── promptBuilder.ts   # System prompt with healthcare angles
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Demo.tsx                   # Main app component
│   ├── GTMForm.tsx                # Lead input form
│   ├── StrategyResults.tsx        # Results display with cards
│   ├── Cards/
│   │   └── StrategyCard.tsx       # Individual result card
│   └── Pipeline/
│       └── PipelineView.tsx       # Lead pipeline tracker
├── constants/
│   └── cardColors.ts              # Color scheme for cards
├── hooks/
│   └── useResponsive.ts           # Mobile/tablet/desktop detection
└── types/
    └── gtm.ts                     # TypeScript type definitions
```

## 📈 What's Different

### Problem We Solved

**Before**: System generated identical messages for all companies using templates.

```
❌ Message 1: "I noticed your company needs healthcare..."
❌ Message 2: "I noticed your company needs healthcare..."
❌ Message 3: "I noticed your company needs healthcare..."
```

### Our Solution

**After**: Each company gets unique, healthcare-focused pitches with high variation.

```
✅ Message 1: "Growth is bottlenecked by manual outreach..."
✅ Message 2: "Healthcare compliance overhead doesn't scale..."
✅ Message 3: "Team productivity hamstrung by burnout-driven turnover..."
```

### Key Changes

| Feature              | Before                       | After                      |
| -------------------- | ---------------------------- | -------------------------- |
| **Prompt Structure** | 10+ sections (complex)       | 5 focused fields (simple)  |
| **Variation**        | Random timestamps            | Deterministic company hash |
| **Message Openings** | "Like you" only (repetitive) | 12 diverse approaches      |
| **Insights**         | Generic observations         | Sharp business constraints |
| **Next Step**        | None                         | AI-suggested GTM action    |
| **Contact Tracking** | None                         | "Mark as Contacted" button |
| **Result Fields**    | 8 fields (bloated)           | 5 fields (essential)       |

### How It Works

1. **Company Name Hash** → Deterministic selection of 1 of 5 healthcare angles
2. **Sharp Insight Gen** → Identifies real scaling problems, not surface-level
3. **Message Variation** → 12 openings × 12 benefits × 12 closings
4. **Suggested Actions** → AI tells sales team what to do next
5. **Clean JSON** → Easy parsing by downstream tools

### Healthcare Angles (Deterministic)

Same company **always** gets the same angle. Different companies get different angles.

1. **Telehealth Access** - Online convenience, removing barriers
2. **Preventive Care** - Health before problems happen
3. **Mental Wellness** - Burnout, stress, mental health focus
4. **Health Compliance** - Regulations, health tracking requirements
5. **Health-Productivity** - How health drives business performance

### Message Variation Examples

**12 Opening Approaches:**

- "As a ${industry} professional like you..."
- "${name}, managing healthcare for [your team/clients] is..."
- "The healthcare reality in ${industry} is..."
- "I understand that ${industry} professionals face..."
- Plus 8 more variations

**12 Benefit Statements:**

- "This reduces healthcare costs by..."
- "Preventive healthcare cuts absenteeism and..."
- "Healthier employees mean less turnover and..."
- Plus 9 more variations

**12 Closing Calls-to-Action:**

- "Let's schedule a meeting"
- "Can we demo this for you?"
- "I'd like to walk you through this"
- Plus 9 more variations

### Sharp Insight Examples

❌ **Generic**: "Joy connects patients with healthcare partners"

✅ **Sharp**:

- "Growth is bottlenecked by manual outreach and relationship management"
- "Compliance overhead that doesn't scale"
- "Team productivity hamstrung by burnout-driven turnover"
- "Healthcare access gaps create both no-shows AND reputation damage"
- "Preventive care doesn't exist = everything reactive and expensive"

### Result

| Metric                   | Before           | After                       |
| ------------------------ | ---------------- | --------------------------- |
| Message uniqueness       | 1 template       | 1,728 variations (12×12×12) |
| Insight quality          | Generic          | Sharp/specific              |
| GTM workflow integration | No guidance      | AI-suggested next steps     |
| User workflow support    | Minimal          | Contact tracking button     |
| API response             | 8 bloated fields | 5 clean fields              |
| Build status             | Issues           | ✅ Zero TypeScript errors   |

---

**Bottom Line**: From templated, generic pitches → Unique, actionable healthcare GTM playbooks that sales teams actually use.
