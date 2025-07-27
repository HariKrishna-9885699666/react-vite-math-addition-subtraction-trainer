import { useState } from 'react';

const userDetails = {
  name: 'Hari Krishna Anem',
  phone: '+91 9885699666',
  email: 'anemharikrishna@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anemharikrishna',
  github: 'https://github.com/HariKrishna-9885699666/',
  portfolio: 'https://harikrishna.netlify.app/',
};

export default function UserProfileModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating User Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 hover:bg-cyan-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white transition-all duration-300 group"
        onClick={() => setOpen(true)}
        aria-label="Open user profile"
      >
        <svg className="w-9 h-9 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Modal Card */}
          <div className="relative bg-gradient-to-br from-cyan-700 via-cyan-500 to-cyan-300 rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md border-4 border-white/30 animate-popIn">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-cyan-700 hover:bg-cyan-900 rounded-full p-2 shadow"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            {/* Avatar */}
            <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg border-4 border-white/50 animate-bounceIn">HK</div>
            {/* Name */}
            <div className="text-2xl font-extrabold text-white text-center mb-1 drop-shadow">{userDetails.name}</div>
            {/* Contact */}
            <div className="text-base text-cyan-100 font-mono text-center mb-1">{userDetails.phone}</div>
            <div className="text-base text-cyan-100 font-mono text-center mb-4">{userDetails.email}</div>
            {/* Links */}
            <div className="flex flex-col gap-2 w-full mb-2">
              <a href={userDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-900 bg-white/80 hover:bg-white text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200">
                <span>🔗</span> LinkedIn
              </a>
              <a href={userDetails.github} target="_blank" rel="noopener noreferrer" className="text-cyan-900 bg-white/80 hover:bg-white text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200">
                <span>🐙</span> Github
              </a>
              <a href={userDetails.portfolio} target="_blank" rel="noopener noreferrer" className="text-cyan-900 bg-white/80 hover:bg-white text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200">
                <span>🌐</span> Portfolio
              </a>
            </div>
            <div className="text-center mt-4">
              <span className="text-xs text-white/70 font-mono">Made with ❤️ by Hari Krishna</span>
            </div>
          </div>
        </div>
      )}
      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s; }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-popIn { animation: popIn 0.3s cubic-bezier(.68,-0.55,.27,1.55); }
        @keyframes bounceIn { 0% { transform: scale(0.7); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .animate-bounceIn { animation: bounceIn 0.5s; }
      `}</style>
    </>
  );
}
