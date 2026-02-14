export const LEAGUES = [
  { id: 1, name: "プレミアリーグ" },
  { id: 2, name: "ブンデスリーガ" },
  { id: 3, name: "ラ・リーガ" },
  { id: 4, name: "セリエA" },
  { id: 5, name: "リーグ・アン" },
] as const;

export const POSITIONS = [
  { value: "GK", label: "GK", category: "Goalkeeper" },
  { value: "CB", label: "CB", category: "Defender" },
  { value: "LB", label: "LB", category: "Defender" },
  { value: "RB", label: "RB", category: "Defender" },
  { value: "DM", label: "DM", category: "Midfielder" },
  { value: "CM", label: "CM", category: "Midfielder" },
  { value: "AM", label: "AM", category: "Midfielder" },
  { value: "LM", label: "LM", category: "Midfielder" },
  { value: "RM", label: "RM", category: "Midfielder" },
  { value: "LWG", label: "LWG", category: "Forward" },
  { value: "RWG", label: "RWG", category: "Forward" },
  { value: "CF", label: "CF", category: "Forward" },
  { value: "ST", label: "ST", category: "Forward" },
] as const;

