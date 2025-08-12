// Enforce allowed pairs for team/department: (Solo,Solo) or (Not-Solo,Not-Solo)
const SOLO = 'Solo';
const OTHER = 'Other';

function sanitizeName(input = '') {
  let out = String(input).trim().replace(/\s+/g, ' ');
  // Keep letters (Unicode), numbers, space, &, -, _
  out = out.replace(/[^\p{L}\p{N}&\-_ ]/gu, '');
  if (out.length > 50) out = out.slice(0, 50);
  return out;
}

function normalizeChoice(v, fallback = SOLO) {
  if (!v) return fallback;
  const t = String(v).trim();
  if (/^solo$/i.test(t)) return SOLO;
  if (/^other$/i.test(t)) return OTHER;
  // Treat any other string as a concrete custom name
  return sanitizeName(t);
}

export default function validateTeamDept(req, res, next) {
  let { team, department } = req.body ?? {};

  // Normalize incoming values (accept 'solo'/'SOLO', etc.)
  team = normalizeChoice(team, SOLO);
  department = normalizeChoice(department, SOLO);

  // If the client literally sent "Other", reject — require a concrete name
  if (team === OTHER || department === OTHER) {
    return res.status(400).json({
      message: 'Please provide a concrete team/department name instead of "Other".',
    });
  }

  // Pair rule: both Solo or both not Solo
  const isSoloPair = team === SOLO && department === SOLO;
  const isBothNotSolo = team !== SOLO && department !== SOLO;
  if (!isSoloPair && !isBothNotSolo) {
    return res.status(400).json({
      message: 'Team/Department must both be Solo or both be non-Solo.',
    });
  }

  // Length guard (after sanitize)
  if (team.length > 50 || department.length > 50) {
    return res.status(400).json({ message: 'team/department are too long.' });
  }

  // Write normalized back
  req.body.team = team;
  req.body.department = department;
  next();
}
