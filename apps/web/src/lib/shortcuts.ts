export interface Shortcut {
  readonly keys: readonly string[];
  readonly label: string;
  readonly action:
    | "toggleSidebar"
    | "openSearch"
    | "openNotifications"
    | "openHelp";
}

export const shortcuts: readonly Shortcut[] = [
  {
    keys: ["Ctrl", "B"],
    label: "Basculer la barre latérale",
    action: "toggleSidebar",
  },
  { keys: ["Ctrl", "K"], label: "Recherche globale", action: "openSearch" },
  { keys: ["Ctrl", "I"], label: "Notifications", action: "openNotifications" },
  { keys: ["?"], label: "Aide des raccourcis", action: "openHelp" },
] as const;

export const shortcutKeyMap: Readonly<Record<string, Shortcut["action"]>> =
  Object.freeze({
    "ctrl+b": "toggleSidebar",
    "ctrl+k": "openSearch",
    "ctrl+i": "openNotifications",
    "?": "openHelp",
  });

/**
 * Returns the shortcut action for a keyboard event, or undefined when the
 * event does not map to a registered shortcut. Only single-key ("?") and
 * Ctrl-modified combinations are matched; plain modifier presses are ignored.
 */
export function matchShortcut(event: {
  readonly key: string;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
}): Shortcut["action"] | undefined {
  const key = event.key.toLowerCase();
  const combo = event.ctrlKey || event.metaKey ? `ctrl+${key}` : key;
  return shortcutKeyMap[combo];
}
