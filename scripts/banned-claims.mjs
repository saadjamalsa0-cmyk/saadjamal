// Phrases that must never render (visible text, title, description, JSON-LD).
// The crawl gate fails the release if one appears. Method taken from gulforbit.sa.
// Remove an entry only when the owner has documents that prove the claim.
export const BANNED_CLAIMS = [
  // Superlatives
  /\bleading (provider|supplier|company)/i,
  /\bpremier\b/i,
  /\b(the )?largest (provider|supplier|company|contractor)\b/i,
  /\bbest in (the )?(industry|market|region)/i,
  /\bnumber one\b|\b#1\b/i,
  /\bproven track record\b/i,
  /\btrusted by\b/i,
  /\bindustry[- ]leading\b|\bworld[- ]class\b/i,
  /\bhighest (quality|standards)\b/i,
  /المزود الرائد|الرائدة في|الأفضل في|بأعلى معايير/,
  // Guarantees
  /\bwe guarantee\b|\bguaranteed\b/i,
  /\bfull(y)? compliant\b|\bfull compliance\b/i,
  /نضمن|الامتثال الكامل/,
  // Speed promises
  /\bsame[- ]day\b|\b24\/7\b|\bimmediate (deployment|replacement|delivery)\b/i,
  // 2026-11-26: brochure claims with no document on file for Saad Jamal
  /exclusive(ly)? (licensed )?sponsor/i,
  /رعاية حصرية|كفيل معتمد/,
  /contractors authority/i,
  /الهيئة السعودية للمقاولين/,
  /\bcertified (and experienced )?(scaffolders|welders|workforce|workers)\b/i,
  /عمال سقالات معتمد|معتمدون وذوو/,
  /temporary (or|and) permanent/i,
  /مؤقتة أو دائمة|مؤقت أو دائم/,
  // Other companies' names and credentials: nothing copied in may bring these with it.
  /\bgulf ?orbit\b|جلف أوربت/i,
  /\baramco\b|أرامكو/i,
  /\bTUV[- ]?(certified|carded)\b/i,
  /\b48\s?[–-]\s?72\b|\b24[- ]hour (response|reply)\b/i,
  /\bsince 20[01]\d\b|منذ (عام )?20[01]\d/i,
  // Wording not used without the owner's approval.
  /تأجير (ال)?عمال/,
  // Build bugs
  /\bundefined undefined\b|\bPLACEHOLDER\b/,
];
