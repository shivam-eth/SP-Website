import { useEffect, useRef, useState } from 'react';

/* A drop of water on a stone tile.

   Shape: a metaball field. Up to four blobs, the main drop and the pieces a
   click splits off, so separate drops join with a real liquid bridge.
   Surface: a dome profile taken from the field, and its gradient gives the
   normal. Light: the normal drives refraction of the stone underneath, a
   Fresnel rim that reflects the room, a sharp glint, a soft shadow cast away
   from the light with a caustic where the drop focuses light onto the stone,
   and a wet trail kept in a second buffer that dries over a few seconds.

   The theme does not recolour the drop. It changes the light source. */

const T = 0.2; // field threshold
const EDGE = 0.644; // visible radius over kernel radius at T = 0.2
const R0 = 0.13; // resting radius, in tile heights
const MAX = 4;

const VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FIELD = `
uniform float uAspect;
uniform int uCount;
uniform vec4 uBlob[4];
uniform vec4 uDef[4];

float kernel(vec2 p, vec4 b, vec4 d) {
  vec2 q = p - b.xy;
  float s = length(d.xy);
  if (s > 0.0001) {
    vec2 t = d.xy / s;
    float e = 1.0 + s;
    q = vec2(dot(q, t) / e, dot(q, vec2(-t.y, t.x)) * e);
  }
  float R = b.z / ${EDGE.toFixed(3)};
  float k = max(0.0, 1.0 - dot(q, q) / (R * R));
  return k * k * k;
}

float field(vec2 p) {
  float f = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= uCount) break;
    f += kernel(p, uBlob[i], uDef[i]);
  }
  return f;
}`;

const WET_FRAG = `#version 300 es
precision highp float;
${FIELD}
in vec2 vUv;
out vec4 o;
uniform sampler2D uPrev;
uniform float uDecay;
uniform float uDry;
void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  float prev = texture(uPrev, vUv).r;
  float stamp = smoothstep(${T.toFixed(2)}, ${(T + 0.25).toFixed(2)}, field(p));
  o = vec4(max(prev * uDecay - uDry, stamp), 0.0, 0.0, 1.0);
}`;

const DROP_FRAG = `#version 300 es
precision highp float;
${FIELD}
in vec2 vUv;
out vec4 o;
uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uWet;
uniform vec3 uL;
uniform vec3 uLc;
uniform vec3 uAmb;
uniform vec3 uSky;
uniform vec3 uStoneA;
uniform vec3 uStoneB;
uniform vec2 uLampPos;
uniform float uFalloff;
uniform float uExposure;
uniform float uGrain;

const float TH = ${T.toFixed(2)};

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    s += a * vnoise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + 3.1;
    a *= 0.5;
  }
  return s;
}

vec3 stoneAlbedo(vec2 p) {
  float m = fbm(p * 2.3 + 11.0);
  float g = fbm(p * 26.0);
  vec3 c = mix(uStoneB, uStoneA, smoothstep(0.28, 0.74, m));
  c *= 0.82 + 0.34 * g;
  float fleck = smoothstep(0.8, 0.88, vnoise(p * 150.0 + 4.0));
  float pore = smoothstep(0.86, 0.93, vnoise(p * 230.0 + 17.0));
  c = mix(c, c * 1.28, fleck * 0.7);
  return c * (1.0 - 0.3 * pore);
}

float dome(vec2 p) {
  return pow(clamp((field(p) - TH) / (1.0 - TH), 0.0, 1.0), 0.55);
}

vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  float px = 1.0 / uRes.y;
  float f = field(p);
  float aa = max(fwidth(f), 1e-4) * 1.25;
  float inside = smoothstep(TH - aa, TH + aa, f);

  // a lamp falls off across the tile, the sun does not
  float d2 = dot(p - uLampPos, p - uLampPos);
  float fall = mix(1.0, 1.0 / (1.0 + 1.4 * d2), uFalloff);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 Hv = normalize(uL + V);

  // ---- stone ----
  float rel = fbm(p * 4.0) * 0.7 + fbm(p * 20.0) * 0.3;
  float k = 5.0 * uRes.y / 700.0;
  vec3 ns = normalize(vec3(-dFdx(rel) * k, -dFdy(rel) * k, 1.0));
  float wet = texture(uWet, vUv).r * (1.0 - inside);
  vec3 alb = stoneAlbedo(p) * (1.0 - 0.28 * wet);
  vec3 stone = alb * (uAmb + uLc * max(dot(ns, uL), 0.0) * fall);
  stone += uLc * fall * pow(max(dot(ns, Hv), 0.0), 80.0) * 0.5 * wet;

  // shadow cast away from the light, with light focused through the drop
  vec2 toLight = uL.xy / max(uL.z, 0.25);
  float fs = field(p + toLight * 0.068);
  float ring = smoothstep(TH - 0.05, TH + 0.12, fs) * (1.0 - smoothstep(TH + 0.12, TH + 0.6, fs));
  float focus = smoothstep(TH + 0.38, 1.0, fs);
  float outside = 1.0 - inside;
  stone *= 1.0 - 0.45 * ring * outside;
  stone += uLc * fall * pow(focus, 2.6) * 0.62 * outside;
  // meniscus, where water meets stone
  stone *= 1.0 - 0.28 * smoothstep(TH * 0.45, TH, f) * outside;

  // ---- drop ----
  float h = dome(p);
  float e = px * 1.5;
  float hx = dome(p + vec2(e, 0.0)) - dome(p - vec2(e, 0.0));
  float hy = dome(p + vec2(0.0, e)) - dome(p - vec2(0.0, e));
  const float HEIGHT = 0.07;
  vec3 n = normalize(vec3(-HEIGHT * hx, -HEIGHT * hy, 2.0 * e));

  vec2 look = -n.xy * (0.35 + 0.65 * h) * 0.09;
  vec3 under = stoneAlbedo(p + look) * (uAmb + uLc * max(uL.z, 0.0) * fall);
  under *= mix(vec3(1.0), vec3(0.86, 0.97, 0.96), h);

  // the bright crescent on the far side, where light gathers inside the drop
  vec2 dir = normalize(n.xy + 1e-5);
  float slope = 1.0 - n.z;
  float crescent = pow(max(dot(dir, -normalize(uL.xy + 1e-5)), 0.0), 3.0)
                 * smoothstep(0.05, 0.5, slope) * (1.0 - smoothstep(0.75, 1.0, slope));
  under += uLc * fall * crescent * 0.85;

  under *= 1.0 - 0.55 * smoothstep(0.45, 0.92, slope);

  vec3 R = reflect(-V, n);
  vec3 env = mix(uSky * 0.32, uSky, pow(clamp(R.z, 0.0, 1.0), 0.6));
  float fres = 0.02 + 0.98 * pow(1.0 - clamp(n.z, 0.0, 1.0), 5.0);
  vec3 drop = mix(under, env * (0.55 + 0.45 * fall), fres);
  float nh = max(dot(n, Hv), 0.0);
  drop += uLc * fall * (pow(nh, 600.0) * 6.0 + pow(nh, 90.0) * 0.08);

  vec3 col = mix(stone, drop, inside);

  // a slab darkens a little toward its rim
  vec2 q = abs(vUv - 0.5) * 2.0;
  col *= 1.0 - 0.16 * smoothstep(0.72, 1.0, max(q.x, q.y));

  col = pow(aces(col * uExposure), vec3(1.0 / 2.2));
  col += (hash(gl_FragCoord.xy + fract(uTime * 7.31) * 911.0) - 0.5) * uGrain;
  o = vec4(col, 1.0);
}`;

const toLinear = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
};

const norm = (v) => {
  const l = Math.hypot(...v);
  return v.map((x) => x / l);
};

// Day: high, soft, slightly cool sunlight from the upper left.
// Lamp: one low warm key from the right, falling off across the stone.
const LIGHTS = {
  light: {
    L: norm([-0.5, 0.62, 0.62]),
    Lc: [1.15, 1.11, 1.05],
    Amb: [0.42, 0.47, 0.49],
    Sky: [0.8, 0.87, 0.9],
    StoneA: toLinear('#c6cdc7'),
    StoneB: toLinear('#aab3ac'),
    LampPos: [0.5, 0.5],
    Falloff: 0,
    Exposure: 1.0,
    Grain: 0.034,
  },
  dark: {
    L: norm([0.8, 0.2, 0.42]),
    Lc: [1.9, 1.36, 0.84],
    Amb: [0.045, 0.07, 0.075],
    Sky: [0.1, 0.13, 0.14],
    StoneA: toLinear('#56625e'),
    StoneB: toLinear('#3a4441'),
    LampPos: [1.35, 0.62],
    Falloff: 1,
    Exposure: 1.15,
    Grain: 0.04,
  },
};

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (a, b, t) =>
  Array.isArray(a) ? a.map((v, i) => lerp(v, b[i], t)) : lerp(a, b, t);

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) || 'shader compile failed');
  }
  return s;
}

function program(gl, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.bindAttribLocation(p, 0, 'aPos');
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) || 'program link failed');
  }
  const u = {};
  const count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(p, i).name.replace('[0]', '');
    u[name] = gl.getUniformLocation(p, name);
  }
  return { p, u };
}

function target(gl, w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { tex, fbo };
}

function startDrop(canvas, stoneEl, setFallback) {
    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      setFallback(true);
      return undefined;
    }

    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      new URLSearchParams(window.location.search).has('still');
    const weak =
      (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;

    let drop, wet;
    try {
      drop = program(gl, DROP_FRAG);
      wet = program(gl, WET_FRAG);
    } catch (err) {
      console.warn('[drop] falling back to CSS:', err.message);
      setFallback(true);
      return undefined;
    }

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // ---- sizing ----
    let W = 1;
    let H = 1;
    let aspect = 1;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let scale = Math.min(window.devicePixelRatio || 1, weak ? 1 : coarse ? 1.5 : 2);
    let buffers = [];
    let read = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(2, Math.round(rect.width * scale));
      H = Math.max(2, Math.round(rect.height * scale));
      canvas.width = W;
      canvas.height = H;
      aspect = W / H;
      for (const b of buffers) {
        gl.deleteTexture(b.tex);
        gl.deleteFramebuffer(b.fbo);
      }
      const ww = Math.max(32, Math.round(W / 4));
      const wh = Math.max(32, Math.round(H / 4));
      buffers = [target(gl, ww, wh), target(gl, ww, wh)];
      buffers.size = [ww, wh];
      for (const b of state.blobs) {
        b.x = Math.min(Math.max(b.x, b.r), aspect - b.r);
      }
    };

    // ---- physics ----
    const state = {
      blobs: [{ x: 0.56, y: 0.52, vx: 0, vy: 0, r: reduce ? R0 : 0.02, main: true }],
      def: { x: 0, y: 0, vx: 0, vy: 0 },
      grow: reduce ? 1 : 0,
      pointer: { x: 0, y: 0, vx: 0, vy: 0, inside: false, t: 0 },
      time: 0,
      lastActive: 0,
    };

    const light = { from: null, to: null, t: 1, cur: null };
    const themeNow = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    light.cur = { ...LIGHTS[themeNow()] };
    light.to = light.cur;

    const kick = (x, y) => {
      state.def.vx += x;
      state.def.vy += y;
    };

    const step = (dt) => {
      const { blobs, pointer, def } = state;
      const main = blobs[0];
      state.time += dt;
      const t = state.time;

      // The drop arrives once, on load: it lands and settles.
      if (state.grow < 1) {
        state.grow = Math.min(1, state.grow + dt / 0.55);
        const g = 1 - (1 - state.grow) ** 3;
        main.r = 0.02 + (R0 - 0.02) * g;
        if (state.grow === 1) kick(0, 2.2);
      }

      for (const b of blobs) {
        if (!b.main) b.age += dt;
        let ax = 0;
        let ay = 0;
        if (b.main) {
          // The stone is never quite level.
          ax += Math.cos(t * 0.21) * 0.012 + Math.sin(t * 0.13 + 2) * 0.008;
          ay += Math.sin(t * 0.17 + 1) * 0.012 + Math.cos(t * 0.11) * 0.006;
          // and the middle of the tile is a shallow dip
          ax += (aspect * 0.56 - b.x) * 0.05;
          ay += (0.52 - b.y) * 0.05;
        }
        if (pointer.inside) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1e-4;
          const reach = b.r * 1.9 + 0.04;
          if (d < reach) {
            const s = 1 - d / reach;
            ax += (dx / d) * s * s * 6.5 + pointer.vx * s * 3;
            ay += (dy / d) * s * s * 6.5 + pointer.vy * s * 3;
          }
        }
        if (!b.main) {
          // surface tension pulls a split piece back
          const dx = main.x - b.x;
          const dy = main.y - b.y;
          const d = Math.hypot(dx, dy) || 1e-4;
          const pull = 0.22 + 0.9 * Math.max(0, 1 - d / 0.55);
          ax += (dx / d) * pull;
          ay += (dy / d) * pull;
        }
        b.vx += ax * dt;
        b.vy += ay * dt;
        const drag = Math.exp(-2.4 * dt);
        b.vx *= drag;
        b.vy *= drag;
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const m = b.r * 1.05 + 0.02;
        if (b.x < m) { b.x = m; b.vx = Math.abs(b.vx) * 0.35; if (b.main) kick(0, 1.6); }
        if (b.x > aspect - m) { b.x = aspect - m; b.vx = -Math.abs(b.vx) * 0.35; if (b.main) kick(0, 1.6); }
        if (b.y < m) { b.y = m; b.vy = Math.abs(b.vy) * 0.35; if (b.main) kick(1.6, 0); }
        if (b.y > 1 - m) { b.y = 1 - m; b.vy = -Math.abs(b.vy) * 0.35; if (b.main) kick(1.6, 0); }
      }

      // merge pieces that have come home
      for (let i = blobs.length - 1; i > 0; i--) {
        const s = blobs[i];
        const d = Math.hypot(s.x - main.x, s.y - main.y);
        if (s.age > 0.45 && d < (main.r + s.r) * 0.78) {
          const a1 = main.r * main.r;
          const a2 = s.r * s.r;
          main.vx = (main.vx * a1 + s.vx * a2) / (a1 + a2);
          main.vy = (main.vy * a1 + s.vy * a2) / (a1 + a2);
          main.r = Math.sqrt(a1 + a2);
          kick((s.x - main.x) * 14, (s.y - main.y) * 14);
          blobs.splice(i, 1);
        }
      }

      // stretch along the direction of travel, on a damped spring, so it wobbles
      const sp = Math.hypot(main.vx, main.vy);
      const amt = Math.min(sp * 0.9, 0.38);
      const tx = sp > 1e-4 ? (main.vx / sp) * amt : 0;
      const ty = sp > 1e-4 ? (main.vy / sp) * amt : 0;
      def.vx += (-90 * (def.x - tx) - 9 * def.vx) * dt;
      def.vy += (-90 * (def.y - ty) - 9 * def.vy) * dt;
      def.x += def.vx * dt;
      def.y += def.vy * dt;

      pointer.vx *= Math.exp(-10 * dt);
      pointer.vy *= Math.exp(-10 * dt);

      if (blobs.length > 1 || pointer.inside || sp > 0.02 || state.grow < 1 || light.t < 1) {
        state.lastActive = t;
      }

      if (light.t < 1) {
        light.t = Math.min(1, light.t + dt / 0.7);
        const k = light.t * light.t * (3 - 2 * light.t);
        const next = {};
        for (const key of Object.keys(light.to)) next[key] = mix(light.from[key], light.to[key], k);
        light.cur = next;
      }
    };

    // ---- render ----
    const blobData = new Float32Array(16);
    const defData = new Float32Array(16);

    const uploadBlobs = (u) => {
      blobData.fill(0);
      defData.fill(0);
      state.blobs.forEach((b, i) => {
        blobData.set([b.x, b.y, b.r, 0], i * 4);
        if (b.main) defData.set([state.def.x, state.def.y, 0, 0], i * 4);
      });
      gl.uniform1f(u.uAspect, aspect);
      gl.uniform1i(u.uCount, state.blobs.length);
      gl.uniform4fv(u.uBlob, blobData);
      gl.uniform4fv(u.uDef, defData);
    };

    const render = (dt) => {
      // wet trail
      const src = buffers[read];
      const dst = buffers[1 - read];
      gl.useProgram(wet.p);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
      gl.viewport(0, 0, buffers.size[0], buffers.size[1]);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, src.tex);
      gl.uniform1i(wet.u.uPrev, 0);
      gl.uniform1f(wet.u.uDecay, Math.pow(0.99, dt * 60));
      gl.uniform1f(wet.u.uDry, 0.0025 * dt * 60);
      uploadBlobs(wet.u);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      read = 1 - read;

      // the tile
      const c = light.cur;
      gl.useProgram(drop.p);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, W, H);
      gl.bindTexture(gl.TEXTURE_2D, dst.tex);
      gl.uniform1i(drop.u.uWet, 0);
      gl.uniform2f(drop.u.uRes, W, H);
      gl.uniform1f(drop.u.uTime, Math.floor(state.time * 12) / 12);
      gl.uniform3fv(drop.u.uL, norm(c.L));
      gl.uniform3fv(drop.u.uLc, c.Lc);
      gl.uniform3fv(drop.u.uAmb, c.Amb);
      gl.uniform3fv(drop.u.uSky, c.Sky);
      gl.uniform3fv(drop.u.uStoneA, c.StoneA);
      gl.uniform3fv(drop.u.uStoneB, c.StoneB);
      gl.uniform2f(drop.u.uLampPos, c.LampPos[0] * aspect, c.LampPos[1]);
      gl.uniform1f(drop.u.uFalloff, c.Falloff);
      gl.uniform1f(drop.u.uExposure, c.Exposure);
      gl.uniform1f(drop.u.uGrain, c.Grain);
      uploadBlobs(drop.u);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // ---- loop ----
    let raf = 0;
    let timer = 0;
    let last = 0;
    let visible = true;
    let frames = 0;
    let probe = 0;
    let stage = weak ? 1 : 0;

    const frame = (now) => {
      raf = 0;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 1 / 60);
      last = now;
      let left = dt;
      while (left > 1e-6) {
        const h = Math.min(left, 1 / 120);
        step(h);
        left -= h;
      }
      render(dt);

      // Measure while the drop is landing, when the loop runs at full rate.
      // A device that cannot hold the frame gets fewer pixels, and if that is
      // still not enough, it stops drawing between interactions.
      frames++;
      if (frames > 2 && frames <= 14) probe += dt * 1000;
      if (frames === 14) {
        const avg = probe / 12;
        if (avg > 34 && stage === 0) {
          stage = 1;
          scale = Math.max(0.6, scale * 0.55);
          resize();
          frames = 0;
          probe = 0;
        } else if (avg > 34 && stage === 1) {
          stage = 2;
        }
      }
      schedule();
    };

    const settled = () => state.time - state.lastActive > 3;

    const schedule = () => {
      if (raf || timer || !visible || document.hidden || reduce) return;
      if (!settled()) {
        raf = requestAnimationFrame(frame);
      } else if (stage < 2) {
        timer = window.setTimeout(() => {
          timer = 0;
          raf = requestAnimationFrame(frame);
        }, 83);
      }
    };

    const wake = () => {
      state.lastActive = state.time;
      if (timer) {
        window.clearTimeout(timer);
        timer = 0;
      }
      schedule();
    };

    const still = () => {
      state.time += 0.016;
      render(1 / 60);
    };

    const onVisibility = () => {
      last = 0;
      schedule();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
      schedule();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) still();
    });
    ro.observe(canvas);

    const mo = new MutationObserver(() => {
      const next = LIGHTS[themeNow()];
      if (next === light.to) return;
      light.from = light.cur;
      light.to = next;
      light.t = reduce ? 1 : 0;
      wake();
      if (reduce) {
        light.cur = { ...next };
        still();
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // ---- input ----
    const toTile = (e) => {
      const r = canvas.getBoundingClientRect();
      return [((e.clientX - r.left) / r.height), 1 - (e.clientY - r.top) / r.height];
    };

    const onMove = (e) => {
      const [x, y] = toTile(e);
      const p = state.pointer;
      const now = performance.now();
      const dt = Math.max(0.008, (now - (p.t || now - 16)) / 1000);
      if (p.inside) {
        p.vx = p.vx * 0.5 + ((x - p.x) / dt) * 0.5;
        p.vy = p.vy * 0.5 + ((y - p.y) / dt) * 0.5;
      }
      p.x = x;
      p.y = y;
      p.t = now;
      p.inside = true;
      wake();
    };

    const onLeave = () => {
      state.pointer.inside = false;
    };

    const onDown = (e) => {
      onMove(e);
      const { blobs } = state;
      const main = blobs[0];
      if (blobs.length >= MAX || main.r < R0 * 0.62 || state.grow < 1) {
        kick((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3);
        return;
      }
      const [x, y] = toTile(e);
      let dx = x - main.x;
      let dy = y - main.y;
      let d = Math.hypot(dx, dy);
      if (d < 1e-3) {
        const a = Math.random() * Math.PI * 2;
        dx = Math.cos(a);
        dy = Math.sin(a);
        d = 1;
      }
      dx /= d;
      dy /= d;
      const rs = main.r * 0.44;
      main.r = Math.sqrt(main.r * main.r - rs * rs);
      blobs.push({
        x: main.x + dx * (main.r + rs) * 0.92,
        y: main.y + dy * (main.r + rs) * 0.92,
        vx: main.vx + dx * 1.05,
        vy: main.vy + dy * 1.05,
        r: rs,
        main: false,
        age: 0,
      });
      main.vx -= dx * 0.22;
      main.vy -= dy * 0.22;
      kick(dx * 2.4, dy * 2.4);
    };

    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      setFallback(true);
    };

    canvas.addEventListener('webglcontextlost', onLost);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduce) {
      stoneEl.addEventListener('pointermove', onMove);
      stoneEl.addEventListener('pointerdown', onDown);
      stoneEl.addEventListener('pointerleave', onLeave);
      stoneEl.addEventListener('pointercancel', onLeave);
    }

    resize();
    still();
    if (!reduce) schedule();

    // Development only: step the simulation by hand, since a background tab
    // never gets animation frames.
    if (import.meta.env.DEV) {
      window.__drop = {
        state,
        tick(n = 1, dt = 1 / 60) {
          for (let i = 0; i < n; i++) {
            let left = dt;
            while (left > 1e-6) {
              const h = Math.min(left, 1 / 120);
              step(h);
              left -= h;
            }
          }
          render(dt);
        },
        split: (x, y) => onDown({ clientX: x, clientY: y }),
        move: (x, y) => onMove({ clientX: x, clientY: y }),
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      document.removeEventListener('visibilitychange', onVisibility);
      stoneEl.removeEventListener('pointermove', onMove);
      stoneEl.removeEventListener('pointerdown', onDown);
      stoneEl.removeEventListener('pointerleave', onLeave);
      stoneEl.removeEventListener('pointercancel', onLeave);
      for (const b of buffers) {
        gl.deleteTexture(b.tex);
        gl.deleteFramebuffer(b.fbo);
      }
      gl.deleteBuffer(quad);
      gl.deleteProgram(drop.p);
      gl.deleteProgram(wet.p);
    };
}

export default function Droplet() {
  const stoneRef = useRef(null);
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  // The slab paints with the page. The drop starts once the main thread is
  // idle, so a slow GPU never delays the text, and then it lands.
  useEffect(() => {
    let cleanup;
    let done = false;
    const begin = () => {
      if (!done && canvasRef.current) cleanup = startDrop(canvasRef.current, stoneRef.current, setFallback);
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(begin, { timeout: 1500 })
      : window.setTimeout(begin, 200);
    return () => {
      done = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, []);

  return (
    <div className="tile" aria-hidden="true">
      <div className="tile__stone" ref={stoneRef}>
        {fallback ? <div className="css-drop" /> : <canvas ref={canvasRef} />}
      </div>
      <p className="tile__caption meta">
        <span className="pointer-only">Push the drop. Click to split it.</span>
        <span className="touch-only">Tap the stone to split the drop.</span>
      </p>
    </div>
  );
}
