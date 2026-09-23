# weekly-lines-tracker
# Mainline Weekly Lines

A small Git CLI report for tracking lines added to a repository's `main` branch this week.

## Run

From any Git repository, run:

```powershell
python C:\path\to\mainline-weekly-lines\weekly_lines.py
```

Choose a branch or week start explicitly:

```powershell
python weekly_lines.py --repo C:\src\my-project --branch main --since 2026-09-21
```

The default week starts Monday (local time). Added and removed line counts come from Git's per-commit numstat. Merge commits are excluded to avoid counting merged diffs twice. Binary changes are ignored. This is a local estimate; the competition site may use its own rules and refresh schedule.

## What it reports

- Added and removed lines over the selected period
- Commits and files touched
- Added lines by file, to show where meaningful work landed
- JSON output for saving a history or piping into other tools

To appear on a connected leaderboard, the repository must be the one linked to your competition profile, and the work must reach its tracked branch during the scoring period.
