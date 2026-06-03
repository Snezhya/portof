import React, { useRef, useEffect } from 'react';

const ROLES = ["Student", "Tech Enthusiast", "Linux User", "Network Engineer"];
const GOLD = '#D4AF37';
const RED  = '#D9383A';

const SCATTER_DUR = 65;
const GATHER_DUR  = 95;
const HOLD_DUR    = 110;
const EXIT_DUR    = 50;
const ROLE_INTERVAL = 22; // frames antar pergantian role

export default function LoadingScreen({ onComplete }) {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({
    particles: [], bgParticles: [],
    phase: 'init', phaseT: 0,
    roleIdx: 0, W: 0, H: 0,
  });

  // --- DOM refs untuk elemen overlay ---
  const roleRef    = useRef(null);
  const taglineRef = useRef(null);
  const cornersRef = useRef([]);
  const clabelsRef = useRef([]);
  const blsRef     = useRef([]);
  const vlsRef     = useRef([]);
  const dgsRef     = useRef([]);

  // --- Easing ---
  const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeInCubic = t => t * t * t;
  const easeOutBack = t => { const c = 1.5; return 1 + (c+1)*Math.pow(t-1,3) + c*Math.pow(t-1,2); };

  // --- Ambil piksel dari teks di offscreen canvas ---
  function getTextPixels(text, size, W, H, offsetY = -16) {
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const c = off.getContext('2d');
    c.fillStyle = '#fff';
    c.font = `800 ${size}px Georgia, serif`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(text, W / 2, H / 2 + offsetY);
    const data = c.getImageData(0, 0, W, H).data;
    const pts = [], gap = 4;
    for (let y = 0; y < H; y += gap)
      for (let x = 0; x < W; x += gap)
        if (data[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
    return pts;
  }

  function makeBgParticles(W, H) {
    return Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.1 + 0.3,
      alpha: Math.random() * 0.12 + 0.04,
      color: Math.random() < 0.12 ? RED : GOLD,
    }));
  }

  // --- Tampilkan / sembunyikan frame dekoratif ---
  function showFrame() {
    cornersRef.current.forEach(el => el && (el.style.opacity = '1'));
    clabelsRef.current.forEach(el => el && (el.style.color = 'rgba(212,175,55,0.4)'));
    dgsRef.current.forEach(el => el && (el.style.opacity = '1'));
    blsRef.current.forEach(el => el && (el.style.background = 'rgba(212,175,55,0.1)'));
    vlsRef.current.forEach(el => el && (el.style.background = 'rgba(212,175,55,0.07)'));
  }

  function hideFrame() {
    cornersRef.current.forEach(el => el && (el.style.opacity = '0'));
    clabelsRef.current.forEach(el => el && (el.style.color = 'rgba(212,175,55,0)'));
    dgsRef.current.forEach(el => el && (el.style.opacity = '0'));
    blsRef.current.forEach(el => el && (el.style.background = 'rgba(212,175,55,0)'));
    vlsRef.current.forEach(el => el && (el.style.background = 'rgba(212,175,55,0)'));
    if (roleRef.current) {
      roleRef.current.style.color = 'rgba(212,175,55,0)';
      roleRef.current.style.transform = 'translateY(16px)';
    }
    if (taglineRef.current) taglineRef.current.style.color = 'rgba(130,120,100,0)';
  }

  // --- Cycle role teks dengan slide up/down ---
  function cycleRole(nextText) {
    const el = roleRef.current;
    if (!el) return;
    el.style.transition = 'color 0.3s, transform 0.3s';
    el.style.color = 'rgba(212,175,55,0)';
    el.style.transform = 'translateY(-12px)';
    setTimeout(() => {
      if (!roleRef.current) return;
      el.textContent = nextText;
      el.style.transition = 'none';
      el.style.transform = 'translateY(14px)';
      void el.offsetWidth; // force reflow
      el.style.transition = 'color 0.35s, transform 0.35s';
      el.style.color = 'rgba(212,175,55,0.9)';
      el.style.transform = 'translateY(0)';
    }, 300);
  }

  // --- Draw background ambient particles ---
  function drawBg(ctx, alpha) {
    const { bgParticles, W, H } = stateRef.current;
    bgParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * alpha));
      ctx.fill();
    });
  }

  // --- Loop utama ---
  function loop() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;
    ctx.clearRect(0, 0, s.W, s.H);
    s.phaseT++;

    if (s.phase === 'init') {
      showFrame();
      s.phase = 'scatter'; s.phaseT = 0;
    }

    // FASE 1: SCATTER
    if (s.phase === 'scatter') {
      const t = Math.min(s.phaseT / SCATTER_DUR, 1);
      drawBg(ctx, t);
      s.particles.forEach(p => {
        p.x += p.vx * 0.55; p.y += p.vy * 0.55;
        p.alpha = Math.min(t * 4, 0.4);
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.r * 0.55), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha)); ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (t >= 1) {
        s.phase = 'gather'; s.phaseT = 0;
        s.particles.forEach(p => { p.startX = p.x; p.startY = p.y; });
      }
    }

    // FASE 2: GATHER
    else if (s.phase === 'gather') {
      const t = Math.min(s.phaseT / GATHER_DUR, 1);
      drawBg(ctx, 1);
      s.particles.forEach(p => {
        const dt = Math.max(0, Math.min((t - p.delay) / (1 - p.delay), 1));
        const e  = easeOutBack(dt);
        p.x = p.startX + (p.tx - p.startX) * e;
        p.y = p.startY + (p.ty - p.startY) * e;
        p.alpha = 0.3 + e * 0.7;
        const tw = 0.85 + 0.15 * Math.sin(s.phaseT * 0.2 + p.tw);
        ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.r * tw), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha)); ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Munculkan role teks saat partikel hampir terbentuk
      if (t > 0.6 && roleRef.current) {
        const fi = (t - 0.6) / 0.4;
        roleRef.current.style.transition = 'none';
        roleRef.current.style.color = `rgba(212,175,55,${fi * 0.9})`;
        roleRef.current.style.transform = `translateY(${(1 - fi) * 10}px)`;
        if (roleRef.current.textContent === '—') {
          roleRef.current.textContent = ROLES[0];
        }
      }
      if (t > 0.78 && taglineRef.current) {
        taglineRef.current.style.color = `rgba(140,128,98,${((t - 0.78) / 0.22) * 0.6})`;
      }
      if (t >= 1) {
        s.roleIdx = 1;
        s.phase = 'hold'; s.phaseT = 0;
      }
    }

    // FASE 3: HOLD — role berganti tiap ROLE_INTERVAL frame
    else if (s.phase === 'hold') {
      drawBg(ctx, 1);
      if (s.phaseT % ROLE_INTERVAL === 0 && s.roleIdx < ROLES.length) {
        cycleRole(ROLES[s.roleIdx]);
        s.roleIdx++;
      }
      s.particles.forEach(p => {
        const jx = Math.sin(s.phaseT * 0.11 + p.tw) * 0.55;
        const jy = Math.cos(s.phaseT * 0.09 + p.tw * 1.3) * 0.38;
        const tw = 0.82 + 0.18 * Math.sin(s.phaseT * 0.17 + p.tw);
        ctx.beginPath(); ctx.arc(p.tx + jx, p.ty + jy, Math.max(0.1, p.r * tw), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, Math.min(1, tw)); ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (s.phaseT >= HOLD_DUR) {
        s.phase = 'exit'; s.phaseT = 0;
        s.particles.forEach(p => { p.startX = p.tx; p.startY = p.ty; });
      }
    }

    // FASE 4: EXIT — partikel meledak, semua fade out, panggil onComplete
    else if (s.phase === 'exit') {
      const t = Math.min(s.phaseT / EXIT_DUR, 1);
      const e = easeInCubic(t);
      drawBg(ctx, 1 - t);

      if (roleRef.current) {
        roleRef.current.style.transition = 'none';
        roleRef.current.style.color = `rgba(212,175,55,${(1 - t) * 0.9})`;
        roleRef.current.style.transform = `translateY(${-e * 14}px)`;
      }
      if (taglineRef.current) {
        taglineRef.current.style.color = `rgba(140,128,98,${Math.max(0, (1 - t) * 0.6)})`;
      }
      if (t > 0.35) {
        const ft = (t - 0.35) / 0.65;
        clabelsRef.current.forEach(el => el && (el.style.color = `rgba(212,175,55,${(1 - ft) * 0.4})`));
        cornersRef.current.forEach(el => el && (el.style.opacity = `${Math.max(0, 1 - ft)}`));
      }

      s.particles.forEach(p => {
        const sp = e * e * 90;
        ctx.beginPath();
        ctx.arc(p.tx + p.vx * sp, p.ty + p.vy * sp - e * 28, Math.max(0.1, p.r * (1 - e * 0.9)), 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, Math.min(1, 1 - e)); ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (t >= 1) {
        cancelAnimationFrame(rafRef.current);
        onComplete?.();
        return;
      }
    }

    rafRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    const s = stateRef.current;

    s.W = wrap.clientWidth || window.innerWidth;
    s.H = wrap.clientHeight || window.innerHeight;
    canvas.width  = s.W;
    canvas.height = s.H;

    const sz = Math.min(s.W * 0.27, 125);
    const targets = getTextPixels('ADIL.', sz, s.W, s.H);
    s.bgParticles = makeBgParticles(s.W, s.H);
    s.particles = targets.map(tgt => ({
      x: Math.random() * s.W, y: Math.random() * s.H,
      tx: tgt.x, ty: tgt.y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      r: Math.random() * 1.5 + 0.6,
      delay: Math.random() * 0.45,
      color: Math.random() < 0.07 ? RED : GOLD,
      alpha: 0, startX: 0, startY: 0,
      tw: Math.random() * Math.PI * 2,
    }));
    s.particles.forEach(p => { p.startX = p.x; p.startY = p.y; });

    if (roleRef.current) roleRef.current.textContent = '—';
    s.phase = 'init'; s.phaseT = 0; s.roleIdx = 0;
    hideFrame();

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ---- JSX ----
  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] bg-[#06060e] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Border frame */}
      <div ref={el => blsRef.current[0] = el} className="absolute top-0 left-0 w-full h-px" />
      <div ref={el => blsRef.current[1] = el} className="absolute bottom-0 left-0 w-full h-px" />
      <div ref={el => blsRef.current[2] = el} className="absolute top-0 left-0 w-px h-full" />
      <div ref={el => blsRef.current[3] = el} className="absolute top-0 right-0 w-px h-full" />

      {/* Vertical inner lines */}
      <div ref={el => vlsRef.current[0] = el} className="absolute left-[18px] top-[58px] bottom-[58px] w-px" />
      <div ref={el => vlsRef.current[1] = el} className="absolute right-[18px] top-[58px] bottom-[58px] w-px" />

      {/* Corner brackets */}
      {[
        { id: 0, cls: 'top-[16px] left-[16px]',                         transform: '' },
        { id: 1, cls: 'top-[16px] right-[16px]',                        transform: 'scaleX(-1)' },
        { id: 2, cls: 'bottom-[16px] left-[16px]',                      transform: 'scaleY(-1)' },
        { id: 3, cls: 'bottom-[16px] right-[16px]',                     transform: 'scale(-1,-1)' },
      ].map(({ id, cls, transform }) => (
        <div
          key={id}
          ref={el => cornersRef.current[id] = el}
          className={`absolute w-8 h-8 opacity-0 transition-opacity duration-700 ${cls}`}
          style={{ transform }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
            <path d="M2 30L2 2L30 2" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      ))}

      {/* Corner labels */}
      {[
        { id: 0, cls: 'top-[54px] left-[18px]',              text: 'PORT://FOLIO' },
        { id: 1, cls: 'top-[54px] right-[18px] text-right',  text: '2025'         },
        { id: 2, cls: 'bottom-[54px] left-[18px]',           text: 'ADIL.DEV'     },
        { id: 3, cls: 'bottom-[54px] right-[18px] text-right', text: 'CENTRAL JAVA, ID' },
      ].map(({ id, cls, text }) => (
        <span
          key={id}
          ref={el => clabelsRef.current[id] = el}
          className={`absolute font-mono text-[9px] tracking-[2px] transition-colors duration-700 ${cls}`}
          style={{ color: 'rgba(212,175,55,0)' }}
        >
          {text}
        </span>
      ))}

      {/* Dot grids */}
      {[
        { id: 0, cls: 'top-[54px] left-[54px]'   },
        { id: 1, cls: 'top-[54px] right-[54px]'  },
        { id: 2, cls: 'bottom-[54px] left-[54px]'},
        { id: 3, cls: 'bottom-[54px] right-[54px]'},
      ].map(({ id, cls }) => (
        <svg
          key={id}
          ref={el => dgsRef.current[id] = el}
          className={`absolute opacity-0 transition-opacity duration-1000 ${cls}`}
          width="20" height="20" viewBox="0 0 20 20"
        >
          {[2,10,18].flatMap(cx => [2,10,18].map(cy =>
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1" fill="#D4AF37" opacity=".35"/>
          ))}
        </svg>
      ))}

      {/* Canvas partikel */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Overlay teks */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        {/* Role text dengan overflow hidden untuk efek slide */}
        <div className="h-[22px] overflow-hidden flex items-center justify-center mt-3">
          <div
            ref={roleRef}
            className="font-poppins font-bold text-[11px] tracking-[5px] uppercase"
            style={{ color: 'rgba(212,175,55,0)', transform: 'translateY(16px)' }}
          >
            —
          </div>
        </div>

        {/* Sub tagline */}
        <div
          ref={taglineRef}
          className="font-fira text-[9px] tracking-[3px] mt-[7px]"
          style={{ color: 'rgba(130,120,100,0)' }}
        >
          NETWORK & SYSTEM ENGINEER
        </div>
      </div>
    </div>
  );
}
