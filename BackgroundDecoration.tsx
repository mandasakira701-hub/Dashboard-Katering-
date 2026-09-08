import React from 'react';

export const BackgroundDecoration: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fffdf7]"
    >
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/40 to-rose-50/30" />

      {/* Floating blur blobs */}
      <div
        className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full opacity-50 blur-3xl animate-blob-1"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #fbbf24 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -top-40 -right-[120px] h-[520px] w-[520px] rounded-full opacity-40 blur-3xl animate-blob-2"
        style={{
          background: 'radial-gradient(circle at 60% 40%, #fb923c 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[160px] left-[20%] h-[560px] w-[560px] rounded-full opacity-40 blur-3xl animate-blob-3"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #fcd34d 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-[100px] -right-[100px] h-[440px] w-[440px] rounded-full opacity-35 blur-3xl animate-blob-4"
        style={{
          background: 'radial-gradient(circle at 40% 60%, #f97316 0%, transparent 70%)',
        }}
      />

      {/* Subtle dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Conic glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-50"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(251, 191, 36, 0.18) 90deg, transparent 180deg, rgba(249, 115, 22, 0.18) 270deg, transparent 360deg)',
        }}
      />

      {/* Top micro border line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-400" />

      {/* Culinary steam paths */}
      <svg
        className="absolute left-[8%] top-[20%] w-24 opacity-20 animate-float-slow"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M30 90 Q30 70 40 60 Q50 50 40 30 Q30 10 50 5"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M60 90 Q60 70 50 60 Q40 50 50 30 Q60 10 40 5"
          stroke="#fb923c"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <svg
        className="absolute right-[12%] top-[28%] w-20 opacity-20 animate-float-slower"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M40 90 Q40 70 50 60 Q60 50 50 30 Q40 10 60 5"
          stroke="#f97316"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Subtle food utensils outline icons */}
      <svg
        className="absolute left-[6%] bottom-[18%] w-16 opacity-[0.08] animate-float-slow"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a3 3 0 0 0-3 3v1H7a3 3 0 0 0-3 3v1a3 3 0 0 0 2 2.83V14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2.17A3 3 0 0 0 20 9V8a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3z" />
      </svg>
    </div>
  );
};
