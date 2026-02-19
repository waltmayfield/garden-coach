# Garden Coach — Research & Findings

Saved from `intent.md` (vision excerpt).

## Quick verdict

"Strava for gardening" is a compelling concept: it targets a real pain (beginners need structured guidance and habit support) and combines features that, together, can create stickiness — natural-language task generation, habit-focused checklists, localized planting calendars and harvest predictions, and local social/trading features. Market signals show the garden-planning / smart-gardening app space is growing; several existing apps cover parts of this idea but none obviously deliver the full bundle (habit coaching + yield forecasting + local trading), so there's room to differentiate.

## Market signals & competitive landscape

- Market reports (smart gardening / garden planner software) project steady growth in the niche (multiple vendor reports surfaced during research).
- Notable consumer apps and adjacent products:
  - GrowIt (garden planner + community features) — App Store listing
  - PlantIn / MyPlantIn — plant care, identification, and reminders
  - Gardenize and several vegetable garden planners and buyer guides
- Summary: active competition on plant care and planning, but a gap for a task-first, beginner-focused habit and community trading product.

## Why this could work (opportunities)

- Habit design: short, clear tasks + visual progress = higher retention potential.
- Localized value: planting windows, yield calendars, and local swap networks create strong local network effects.
- Partnerships: garden stores, extension programs, and community gardens are natural pilot partners.

## Main risks & mitigations

- User acquisition & seasonal churn — mitigate with off-season features (planning, seed ordering, winter projects), and strong onboarding that produces early wins.
- Accuracy & credibility of predictions/advice — mitigate by starting with conservative heuristics, transparently labeling predictions, and partnering with extension services or master gardeners for content.
- Logistics and liability of crop trading — start small (bulletin-board / meetup coordination) before building paid marketplace; include clear hygiene and terms.
- Competition from established plant-care apps — differentiate on habit coaching, localized yield forecasts, and community swap features.

## MVP recommendation (prioritized)

Goal: Help a beginner complete a first season and build a gardening habit.

MVP v1 (must-have):
- Natural-language -> task-list generator (user describes space and goals → prioritized seasonal tasks with steps and visuals)
- Localized planting calendar (zip/hardiness zone based) + simple harvest prediction (days-to-harvest heuristics)
- Daily/weekly checklist & notifications to promote habit formation
- Lightweight garden model (beds/containers, location, goals)
- Basic social feed (photo updates, local-first) and a simple troubleshooting FAQ/chat flow

Nice-to-have (defer):
- P2P crop trading marketplace (start as local bulletin board)
- Advanced yield models (sensor inputs, historical yield data)
- Hardware integrations (soil sensors, irrigation control)

## Minimal product contract

- Inputs: user garden description (location, space, goals), basic plant selections, and task completion/photo updates
- Outputs: scheduled task list with step instructions, planting & harvest calendar, progress visuals, and basic troubleshooting
- Early success criteria: 30%+ week-1 activation (complete 1 task), week-4 retention >20% for pilot users, and engaged behavior (posting/swapping) in pilot communities

## Monetization ideas (staged)

1. Freemium subscription for advanced features (multi-plot plans, premium forecasts, analytics)
2. Marketplace/affiliate for seeds, soil, tools, and local services
3. Paid community features for organizers (private groups, swap coordination) or B2B partnerships (garden centers, municipalities)

## Go-to-market & growth channels

- Pilot in cities with active urban-gardening communities and with community gardens
- Partnerships: master gardener programs, extension offices, seed retailers, and local garden shops
- Content & challenge marketing: "First 90-day garden challenge", short videos, before/after harvest stories

## 90-day validation plan

1. Conduct 10–15 user interviews with beginner gardeners to validate demand and language
2. Build a landing page describing the core promise; collect emails and run A/B tests on value props
3. Create clickable prototype for the natural-language → task generator and run a small pilot (10–50 users with 2–3 community gardens)
4. Measure activation & retention; refine onboarding and tasks

## Suggested metrics

- Activation: % of signups who create a garden and complete the first task within 7 days
- Retention: 7-day and 30-day retention for pilot cohorts
- Engagement: weekly active users, tasks completed per user/week, photos uploaded
- Conversion: % who opt into premium or marketplace purchases in pilot

## Technical & UX considerations

- Offline-first capability for field use; small check-ins and resumable sync
- Reliable local planting window data (hardiness zone / climate API or dataset) — important foundational data dependency
- Privacy: local-only social defaults, opt-in sharing, and explicit photo/location policies
- Seasonal cadence: design for multi-season lifecycle and re-engagement

## Next steps (short)

- Run the 10–15 interviews and build the landing page (high priority)
- Design a simple prototype of the natural-language task generator (copy + 3 screens)
- Pilot with local community gardens and measure activation/retention

## References & links (sample results found)

- GrowIt (App Store): https://apps.apple.com/us/app/growit-garden-planner/id6443580320
- PlantIn / MyPlantIn — listings and plant-care apps
- Several market reports on "smart gardening" and garden-planner software (Growth Market Reports, FutureDataStats, archive market research listings surfaced during search)

---

File saved to `research/findings.md`. If you'd like, I can now:
- Draft a 6–12 week MVP plan with milestones and an explicit tech stack
- Create landing page copy + A/B test variants
- Build a clickable Figma-style prototype for onboarding and the task generator

Tell me which to do next and I’ll update the todo list and proceed.