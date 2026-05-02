const iconPaths = {
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  arrowUpRight: "M7 17 17 7M9 7h8v8",
  briefcase: "M10 6h4a2 2 0 0 1 2 2v1h4v11H4V9h4V8a2 2 0 0 1 2-2Zm0 3h4V8h-4v1Z",
  code: "M8 9 4 12l4 3M16 9l4 3-4 3M14 5l-4 14",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  file: "M7 3h7l5 5v13H7V3Zm7 0v6h5",
  github: "M12 2a10 10 0 0 0-3 19c.5.1.7-.2.7-.5v-2c-3 .7-3.7-1.4-3.7-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.8-.4 2.2-.8.1-.7.4-1.1.7-1.4-2.4-.3-4.9-1.2-4.9-5.2 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4-2.5 4.9-4.9 5.2.4.3.8 1 .8 2v3c0 .3.2.6.8.5A10 10 0 0 0 12 2Z",
  graduation: "M22 10 12 5 2 10l10 5 10-5ZM6 12v5c2.8 2 9.2 2 12 0v-5",
  linkedin: "M6.5 9H3v12h3.5V9ZM4.75 7A2 2 0 1 0 4.7 3a2 2 0 0 0 .05 4ZM21 21h-3.5v-6.2c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V21h-3.5V9h3.5v1.7c.5-.8 1.4-2 3.4-2 2.5 0 4 1.6 4 5.1V21Z",
  mail: "M4 5h16v14H4V5Zm0 2 8 6 8-6",
  mapPin: "M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Zm0-8.5A2.5 2.5 0 1 0 12 7a2.5 2.5 0 0 0 0 5.5Z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7l.4 2.7a2 2 0 0 1-.6 1.8L8.6 10.4a16 16 0 0 0 5 5l1.2-1.2a2 2 0 0 1 1.8-.6l2.7.4a2 2 0 0 1 1.7 2Z",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z",
  sparkles: "M12 3l1.5 5L19 10l-5.5 2L12 17l-1.5-5L5 10l5.5-2L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
};

export default function Icon({ name, size = 20, className = "", ...props }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={iconPaths[name] || iconPaths.code} />
    </svg>
  );
}
