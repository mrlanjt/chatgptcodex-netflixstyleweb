#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository." >&2
  exit 1
fi

current_branch="$(git branch --show-current)"
if [[ -z "$current_branch" ]]; then
  echo "Detached HEAD is not supported. Checkout a feature branch first." >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree is not clean. Commit/stash changes before sync." >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' is missing. Configure it first:" >&2
  echo "  git remote add origin <repo-url>" >&2
  exit 1
fi

base_ref=""
if git ls-remote --exit-code --heads origin main >/dev/null 2>&1; then
  base_ref="origin/main"
elif git ls-remote --exit-code --heads origin master >/dev/null 2>&1; then
  base_ref="origin/master"
else
  echo "Neither origin/main nor origin/master exists." >&2
  exit 1
fi

echo "Fetching latest origin..."
git fetch origin --prune

echo "Rebasing ${current_branch} onto ${base_ref} ..."
set +e
git rebase "$base_ref"
rebase_code=$?
set -e

if [[ $rebase_code -ne 0 ]]; then
  echo ""
  echo "Rebase stopped due to conflicts." >&2
  echo "To resolve quickly, if the conflict is package-lock.json, run:" >&2
  echo "  git checkout --theirs package-lock.json" >&2
  echo "  npm install" >&2
  echo "  git add package-lock.json" >&2
  echo "Then continue with:" >&2
  echo "  git rebase --continue" >&2
  exit $rebase_code
fi

echo "Sync complete. ${current_branch} is now rebased onto ${base_ref}."
