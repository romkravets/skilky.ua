export const SVGS: Record<string, (color: string) => React.JSX.Element> = {
  armor: (color) => (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2L6 8v10c0 9 6 17 14 20 8-3 14-11 14-20V8L20 2z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
      <path d="M15 20l4 4 8-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  helmet: (color) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 24c0-6.627 5.373-14 12-14s12 7.373 12 14H8z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
      <rect x="6" y="24" width="28" height="5" rx="2" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5"/>
      <path d="M13 24v5" stroke={color} strokeWidth="1.2" opacity="0.5"/>
    </svg>
  ),
  fpv: (color) => (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="4" fill={color} stroke={color} strokeWidth="1.2"/>
      <line x1="22" y1="18" x2="22" y2="6" stroke={color} strokeWidth="1.5"/>
      <line x1="22" y1="26" x2="22" y2="38" stroke={color} strokeWidth="1.5"/>
      <line x1="18" y1="22" x2="6" y2="22" stroke={color} strokeWidth="1.5"/>
      <line x1="26" y1="22" x2="38" y2="22" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="22" cy="6" rx="5" ry="2.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2"/>
      <ellipse cx="22" cy="38" rx="5" ry="2.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2"/>
      <ellipse cx="6" cy="22" rx="2.5" ry="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2"/>
      <ellipse cx="38" cy="22" rx="2.5" ry="5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  mavic: (color) => (
    <svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="16" width="12" height="8" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4"/>
      <line x1="18" y1="17" x2="6" y2="10" stroke={color} strokeWidth="1.5"/>
      <line x1="30" y1="17" x2="42" y2="10" stroke={color} strokeWidth="1.5"/>
      <line x1="18" y1="23" x2="6" y2="30" stroke={color} strokeWidth="1.5"/>
      <line x1="30" y1="23" x2="42" y2="30" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="6" cy="10" rx="5" ry="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.1"/>
      <ellipse cx="42" cy="10" rx="5" ry="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.1"/>
      <ellipse cx="6" cy="30" rx="5" ry="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.1"/>
      <ellipse cx="42" cy="30" rx="5" ry="2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.1"/>
      <circle cx="24" cy="20" r="3" fill={color} fillOpacity="0.5"/>
    </svg>
  ),
  thermal: (color) => (
    <svg viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="22" height="16" rx="3" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
      <circle cx="19" cy="18" r="5" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.1"/>
      <circle cx="19" cy="18" r="2" fill={color} fillOpacity="0.5"/>
      <rect x="30" y="14" width="8" height="8" rx="1.5" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2"/>
      <line x1="19" y1="10" x2="19" y2="7" stroke={color} strokeWidth="1.2"/>
      <line x1="8" y1="18" x2="5" y2="18" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  surgery: (color) => (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="32" height="28" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
      <rect x="19" y="15" width="6" height="14" rx="1" fill={color} fillOpacity="0.5"/>
      <rect x="15" y="19" width="14" height="6" rx="1" fill={color} fillOpacity="0.5"/>
    </svg>
  ),
  ambulance: (color) => (
    <svg viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="10" width="38" height="20" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M40 18h6l4 6v6h-10V18z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
      <circle cx="10" cy="30" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
      <circle cx="38" cy="30" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5"/>
      <rect x="13" y="15" width="4" height="10" rx="0.5" fill={color} fillOpacity="0.6"/>
      <rect x="10" y="18" width="10" height="4" rx="0.5" fill={color} fillOpacity="0.6"/>
      <line x1="2" y1="26" x2="40" y2="26" stroke={color} strokeWidth="0.8" opacity="0.3"/>
    </svg>
  ),
  cancer: (color) => (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="20" height="36" rx="5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
      <ellipse cx="20" cy="14" rx="6" ry="4" fill={color} fillOpacity="0.25"/>
      <ellipse cx="20" cy="26" rx="6" ry="4" fill={color} fillOpacity="0.25"/>
      <line x1="20" y1="4" x2="20" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  uni: (color) => (
    <svg viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4L2 14l20 10 20-10L22 4z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
      <path d="M8 18v10c0 0 5 4 14 4s14-4 14-4V18" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="38" y1="14" x2="38" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="38" cy="27" r="2" fill={color}/>
    </svg>
  ),
  kindergarten: (color) => (
    <svg viewBox="0 0 52 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="18" width="44" height="20" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M4 18L26 6l22 12" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/>
      <rect x="16" y="24" width="8" height="14" rx="1" fill={color} fillOpacity="0.3"/>
      <rect x="28" y="24" width="8" height="14" rx="1" fill={color} fillOpacity="0.3"/>
      <rect x="8" y="22" width="6" height="6" rx="1" fill={color} fillOpacity="0.25"/>
      <rect x="38" y="22" width="6" height="6" rx="1" fill={color} fillOpacity="0.25"/>
      <circle cx="26" cy="14" r="2" fill={color} fillOpacity="0.5"/>
    </svg>
  ),
  teacher: (color) => (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="10" r="7" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
      <path d="M6 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
      <rect x="26" y="22" width="12" height="8" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.2"/>
      <line x1="28" y1="25" x2="36" y2="25" stroke={color} strokeWidth="1"/>
      <line x1="28" y1="28" x2="34" y2="28" stroke={color} strokeWidth="1"/>
    </svg>
  ),
  school: (color) => (
    <svg viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="20" width="40" height="22" rx="2" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
      <path d="M6 20L26 8l20 12" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.5"/>
      <rect x="12" y="28" width="6" height="6" rx="1" fill={color} fillOpacity="0.3"/>
      <rect x="23" y="28" width="6" height="6" rx="1" fill={color} fillOpacity="0.3"/>
      <rect x="34" y="28" width="6" height="6" rx="1" fill={color} fillOpacity="0.3"/>
      <rect x="20" y="32" width="12" height="10" rx="1" fill={color} fillOpacity="0.25"/>
    </svg>
  ),
  apt_kyiv: (color) => (
    <svg viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="28" height="40" rx="2" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
      <rect x="8" y="10" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.35"/>
      <rect x="18" y="10" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.35"/>
      <rect x="8" y="20" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.35"/>
      <rect x="18" y="20" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.35"/>
      <rect x="8" y="30" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.35"/>
      <rect x="18" y="30" width="6" height="5" rx="0.5" fill={color} fillOpacity="0.35"/>
      <rect x="13" y="38" width="10" height="8" rx="1" fill={color} fillOpacity="0.25"/>
    </svg>
  ),
  apt_region: (color) => (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="32" height="30" rx="2" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
      <path d="M4 12L20 4l16 8" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1.4"/>
      <rect x="8" y="18" width="7" height="6" rx="0.5" fill={color} fillOpacity="0.3"/>
      <rect x="19" y="18" width="7" height="6" rx="0.5" fill={color} fillOpacity="0.3"/>
      <rect x="8" y="28" width="7" height="6" rx="0.5" fill={color} fillOpacity="0.3"/>
      <rect x="19" y="28" width="7" height="6" rx="0.5" fill={color} fillOpacity="0.3"/>
      <rect x="15" y="36" width="10" height="6" rx="1" fill={color} fillOpacity="0.25"/>
    </svg>
  ),
  house: (color) => (
    <svg viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20L22 6l18 14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
      <rect x="6" y="20" width="32" height="18" rx="1" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
      <rect x="10" y="24" width="8" height="7" rx="0.5" fill={color} fillOpacity="0.3"/>
      <rect x="26" y="24" width="8" height="7" rx="0.5" fill={color} fillOpacity="0.3"/>
      <rect x="18" y="28" width="8" height="10" rx="1" fill={color} fillOpacity="0.25"/>
    </svg>
  ),
  briefcase: (color) => (
    <svg viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="36" height="24" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M15 12V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="4" y1="22" x2="40" y2="22" stroke={color} strokeWidth="1.2" opacity="0.4"/>
      <rect x="18" y="19" width="8" height="6" rx="1" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1"/>
      <line x1="4" y1="28" x2="40" y2="28" stroke={color} strokeWidth="0.8" opacity="0.2"/>
    </svg>
  ),
  wagon: (color) => (
    <svg viewBox="0 0 56 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="52" height="20" rx="3" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5"/>
      <line x1="2" y1="18" x2="54" y2="18" stroke={color} strokeWidth="0.8" opacity="0.25"/>
      <circle cx="10" cy="28" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4"/>
      <circle cx="28" cy="28" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4"/>
      <circle cx="46" cy="28" r="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4"/>
      <rect x="8" y="10" width="40" height="6" rx="1" fill={color} fillOpacity="0.2"/>
      <line x1="0" y1="8" x2="56" y2="8" stroke={color} strokeWidth="0.8" opacity="0.2"/>
    </svg>
  ),
  stack: (color) => (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="36" width="28" height="4" rx="1" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1"/>
      <rect x="6" y="28" width="28" height="4" rx="1" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1"/>
      <rect x="6" y="20" width="28" height="4" rx="1" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1"/>
      <rect x="6" y="12" width="28" height="4" rx="1" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1"/>
      <rect x="6" y="4" width="28" height="4" rx="1" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1"/>
      <line x1="12" y1="37" x2="12" y2="39" stroke={color} strokeWidth="0.8" opacity="0.5"/>
      <line x1="20" y1="37" x2="20" y2="39" stroke={color} strokeWidth="0.8" opacity="0.5"/>
      <line x1="28" y1="37" x2="28" y2="39" stroke={color} strokeWidth="0.8" opacity="0.5"/>
    </svg>
  ),
  weight: (color) => (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20h24l-4 18H12L8 20z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/>
      <path d="M12 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
      <line x1="8" y1="20" x2="32" y2="20" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
};
