import { useState, useEffect, useRef } from "react";

import { toast } from "sonner";

import {

  Home, Search, ShoppingCart, User, Menu, X,

  ChevronLeft, ChevronRight, Star, Volume2, Mic,

  Heart, Eye, Monitor, Headphones, Gamepad2,

  ArrowRight, Clock, TrendingUp, SlidersHorizontal,

  ZoomIn, ChevronDown, Plus, Minus, Check,

  Smartphone, Laptop, Zap, Shield, Truck, Award,

  Wifi, Battery, Bell,

  Package, Trophy, Download, MapPin, CreditCard,

  CheckCircle, Trash2, Wallet, Copy, AlertCircle,

  BarChart2, History,

  // Admin icons

  LayoutDashboard, Settings, Tag, Upload, Globe,

  AlertTriangle, Activity, Users, RefreshCw,

  FileText, Edit3, MoreHorizontal, Filter,

  ChevronUp, Layers, Image, ExternalLink,

  ToggleLeft, ToggleRight, Info, PieChart,

  // Support / Chat / Profile / A11Y icons

  MessageCircle, Send, Phone, Video, Languages,

  Medal, BookOpen, HelpCircle, Lock, Cpu,

  ThumbsUp, Gift, RotateCcw,

  // Auth icons

  EyeOff, LogIn, UserPlus, KeyRound, AtSign,

} from "lucide-react";

import {

  BarChart, Bar, LineChart, Line, PieChart as RPieChart, Pie, Cell,

  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,

} from "recharts";

/* ─────────────── ANIMATION & GLOBAL CSS ─────────────── */

export const GH_CSS = `

  html, body, #root {

    overscroll-behavior-x: none;

    overflow-x: hidden;

    touch-action: manipulation;

    -webkit-overflow-scrolling: touch;

  }

  .ghr { font-family: 'Rajdhani', sans-serif; }

  .ghi { font-family: 'Inter', sans-serif; }

  @keyframes gradFlow {

    0%   { background-position: 0% 50%; }

    100% { background-position: 300% 50%; }

  }

  @keyframes fadeUp {

    from { opacity:0; transform:translateY(14px); }

    to   { opacity:1; transform:translateY(0); }

  }

  @keyframes fadeIn {

    from { opacity:0; }

    to   { opacity:1; }

  }

  @keyframes slideRight {

    from { opacity:0; transform:translateX(-24px); }

    to   { opacity:1; transform:translateX(0); }

  }

  @keyframes slideUp {

    from { opacity:0; transform:translateY(40px); }

    to   { opacity:1; transform:translateY(0); }

  }

  @keyframes heroIn {

    from { opacity:0; transform:translateX(28px); }

    to   { opacity:1; transform:translateX(0); }

  }

  @keyframes stockPulse {

    0%,100% { opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(0,230,118,0.5); }

    50% { opacity:0.8; transform:scale(0.88); box-shadow:0 0 0 4px rgba(0,230,118,0); }

  }

  @keyframes stockPulseLow {

    0%,100% { box-shadow:0 0 0 0 rgba(255,183,0,0.6); }

    50%     { box-shadow:0 0 0 5px rgba(255,183,0,0); }

  }

  @keyframes trophyGlow {

    0%,100% { filter: drop-shadow(0 0 20px rgba(255,183,0,0.8)) drop-shadow(0 0 40px rgba(255,46,158,0.5)); }

    50%     { filter: drop-shadow(0 0 35px rgba(255,183,0,1.0)) drop-shadow(0 0 70px rgba(139,47,214,0.6)); }

  }

  @keyframes successPop {

    0%   { opacity:0; transform:scale(0.5) rotate(-10deg); }

    65%  { transform:scale(1.12) rotate(3deg); }

    100% { opacity:1; transform:scale(1) rotate(0deg); }

  }

  @keyframes progressFill {

    from { width: 0%; }

    to   { width: 100%; }

  }

  .hero-title {

    font-family: 'Rajdhani', sans-serif;

    font-weight: 700;

    background: linear-gradient(90deg, #FF2E9E 0%, #C43FFF 30%, #00F0FF 60%, #FF2E9E 100%);

    background-size: 300% 100%;

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;

    background-clip: text;

    animation: gradFlow 4s linear infinite;

  }

  .neon-btn {

    transition: all 0.2s ease;

    box-shadow: 0 0 18px rgba(255,46,158,0.55), 0 0 36px rgba(255,46,158,0.2);

  }

  .neon-btn:hover {

    box-shadow: 0 0 36px rgba(255,46,158,0.95), 0 0 72px rgba(255,46,158,0.4) !important;

    transform: scale(1.04) !important;

  }

  .neon-btn-vi { transition: all 0.2s ease; box-shadow: 0 0 18px rgba(139,47,214,0.55), 0 0 36px rgba(139,47,214,0.2); }

  .neon-btn-vi:hover { box-shadow: 0 0 36px rgba(139,47,214,0.9), 0 0 72px rgba(139,47,214,0.4) !important; transform: scale(1.04) !important; }

  .neon-btn-cy { transition: all 0.2s ease; box-shadow: 0 0 18px rgba(0,240,255,0.5), 0 0 36px rgba(0,240,255,0.2); }

  .gh-card { transition: all 0.25s ease; }

  .gh-card:hover {

    border-color: rgba(255,46,158,0.55) !important;

    box-shadow: 0 0 28px rgba(255,46,158,0.2), 0 10px 36px rgba(0,0,0,0.55) !important;

    transform: translateY(-5px);

  }

  .gh-card-vi:hover {

    border-color: rgba(139,47,214,0.6) !important;

    box-shadow: 0 0 28px rgba(139,47,214,0.22), 0 10px 36px rgba(0,0,0,0.55) !important;

    transform: translateY(-5px);

  }

  .zoom-img { transition: transform 0.45s ease; }

  .zoom-img:hover { transform: scale(1.1); }

  .no-scroll { scrollbar-width: none; }

  .no-scroll::-webkit-scrollbar { display: none; }

  .thin-scroll::-webkit-scrollbar { width: 3px; height: 3px; }

  .thin-scroll::-webkit-scrollbar-track { background: transparent; }

  .thin-scroll::-webkit-scrollbar-thumb { background: #8B2FD6; border-radius: 3px; }

  .fade-up   { animation: fadeUp 0.35s ease both; }

  .fade-in   { animation: fadeIn 0.3s ease both; }

  .slide-r   { animation: slideRight 0.35s ease both; }

  .slide-up  { animation: slideUp 0.4s ease both; }

  .hero-anim { animation: heroIn 0.6s ease both; }

  .success-pop { animation: successPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

  .trophy-glow { animation: trophyGlow 2.5s ease-in-out infinite; }

  @keyframes gridFlow {

    0%   { background-position: 0 0; }

    100% { background-position: 40px 40px; }

  }

  @keyframes rgbPulse {

    0%,100% { box-shadow: 0 0 28px rgba(255,46,158,0.7), 0 0 60px rgba(255,46,158,0.25); }

    33%     { box-shadow: 0 0 28px rgba(0,240,255,0.7),  0 0 60px rgba(0,240,255,0.25); }

    66%     { box-shadow: 0 0 28px rgba(139,47,214,0.7), 0 0 60px rgba(139,47,214,0.25); }

  }

  @keyframes authSlide {

    from { opacity:0; transform:translateY(20px); }

    to   { opacity:1; transform:translateY(0); }

  }

  .auth-slide { animation: authSlide 0.45s cubic-bezier(0.16,1,0.3,1) both; }

  .rgb-pulse  { animation: rgbPulse 3s ease-in-out infinite; }

  .sidebar-active-bar {

    position: absolute; left: 0; top: 20%; height: 60%; width: 3px;

    background: #FF2E9E; border-radius: 0 2px 2px 0;

    box-shadow: 0 0 10px #FF2E9E;

  }

  .float-label { transition: all 0.18s ease; pointer-events:none; }

  .compare-best { position: relative; }

  .compare-best::after {

    content: '★ MEJOR';

    position: absolute; top: 4px; right: 4px;

    font-size: 8px; font-weight: 700; color: #FF2E9E;

    font-family: 'Inter', sans-serif; letter-spacing: 0.06em;

  }

`;

/* ─────────────── TOKENS ─────────────── */

export const bg  = "#0A0512";

export const bgC = "#150A24";

export const bgE = "#1E0F35";

export const mg  = "#FF2E9E";

export const vi  = "#8B2FD6";

export const cy  = "#00F0FF";

export const go  = "#FFB800";

export const ht  = "#FF5722";

export const tx  = "#F0E6FF";

export const txS = "#9B8AB0";

export const ok  = "#00E676";

export const GM = "0 0 18px rgba(255,46,158,0.55), 0 0 36px rgba(255,46,158,0.2)";

export const GV = "0 0 18px rgba(139,47,214,0.55), 0 0 36px rgba(139,47,214,0.2)";

export const GC = "0 0 18px rgba(0,240,255,0.5), 0 0 36px rgba(0,240,255,0.2)";

export const GG = "0 0 18px rgba(0,230,118,0.55), 0 0 36px rgba(0,230,118,0.2)";

export function GHLogo({ scale = 1 }: { scale?: number }) {

  return (

    <div style={{ display:"flex",alignItems:"center",gap:10*scale }}>

      <div className="rgb-pulse" style={{ width:42*scale,height:42*scale,borderRadius:10*scale,background:`linear-gradient(135deg,${mg},${vi},${cy})`,padding:2,flexShrink:0 }}>

        <div style={{ width:"100%",height:"100%",borderRadius:8*scale,background:bg,display:"flex",alignItems:"center",justifyContent:"center" }}>

          <span className="ghr" style={{ fontSize:22*scale,fontWeight:700,lineHeight:1,background:`linear-gradient(135deg,${mg},${cy})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>G</span>

        </div>

      </div>

      <div>

        <div className="hero-title" style={{ fontSize:26*scale,letterSpacing:"0.08em",lineHeight:1 }}>GAMEHUB</div>

        <p className="ghi" style={{ fontSize:9*scale,color:cy,letterSpacing:"0.14em",margin:"3px 0 0",fontWeight:700 }}>STORE — HARDWARE PRO</p>

      </div>

    </div>

  );

}

/* ─────────────── DATA ─────────────── */

export const imgUrl = (id: string, w = 800, h = 600) =>

  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export type Product = {

  id: number; name: string; sub: string; cat: string;

  price: number; orig: number | null;

  badges: string[]; rating: number; reviews: number;

  imgId: string; variants: string[];

};

export const PRODUCTS: Product[] = [

  { id:1, name:"ProVision VR X2",    sub:"Visor de Realidad Virtual", cat:"vr",         price:599.99, orig:799.99, badges:["NUEVO","4K"],  rating:4.8, reviews:2341, imgId:"1588336443962-49d88df004a1", variants:["Negro Obsidiana","Blanco Ártico","Violeta Cósmico"] },

  { id:2, name:"MechStrike Pro RGB",  sub:"Teclado Mecánico Gamer",    cat:"keyboard",   price:189.99, orig:229.99, badges:["TOP","ERGON"], rating:4.7, reviews:5821, imgId:"1547394765-185e1e68f34e",   variants:["Switch Rojo","Switch Azul","Switch Brown"] },

  { id:3, name:"NexForce Elite",      sub:"Control Inalámbrico",       cat:"controller", price:79.99,  orig:99.99,  badges:["HOT"],         rating:4.6, reviews:8942, imgId:"1633499737221-5e3406d4d952", variants:["Negro Stealth","Blanco Ghost","Edición Oro"] },

  { id:4, name:"SoundStrike 7.1 Pro", sub:"Auriculares Gaming",        cat:"headset",    price:149.99, orig:null,   badges:["NUEVO","PRO"], rating:4.9, reviews:3120, imgId:"1761005654036-ffe7410d5d2a", variants:["Negro","Rojo Neón"] },

  { id:5, name:"UltraSwitch 65%",     sub:"Teclado Compacto",          cat:"keyboard",   price:129.99, orig:159.99, badges:["OFERTA"],      rating:4.5, reviews:1240, imgId:"1555532538-dcdbd01d373d",   variants:["Negro","Gris Espacial"] },

  { id:6, name:"AeroGrip X Pro",      sub:"Control Ergonómico",        cat:"controller", price:59.99,  orig:74.99,  badges:["ERGON"],       rating:4.4, reviews:2560, imgId:"1633499737248-c2b931d412c6", variants:["Negro Mate"] },

  { id:7, name:"QuantumVR S3",        sub:"Visor VR Standalone",       cat:"vr",         price:449.99, orig:549.99, badges:["OFERTA","4K"], rating:4.6, reviews:1820, imgId:"1604272986062-67ef7145f0ef", variants:["128GB","256GB"] },

  { id:8, name:"BassCore X8",         sub:"Auriculares Over-Ear",      cat:"headset",    price:89.99,  orig:null,   badges:["TOP"],         rating:4.3, reviews:4211, imgId:"1588336443962-49d88df004a1", variants:["Negro","Blanco"] },

];

export const PRODUCT_DETAIL = {

  ...PRODUCTS[0],

  description: "Experimenta la realidad virtual más inmersiva con resolución 4K por ojo, campo de visión de 120° y seguimiento ocular nativo a 120Hz. El ProVision VR X2 redefine los límites del gaming con su procesador Snapdragon XR2 Gen 2 y 12 GB de RAM dedicada.",

  specs: [

    { label:"Resolución",      value:"4K por ojo (2160×2160)" },

    { label:"Tasa Refresco",   value:"120Hz / 90Hz adaptativo" },

    { label:"Campo de Visión", value:"120° diagonal" },

    { label:"Procesador",      value:"Snapdragon XR2 Gen 2" },

    { label:"RAM",             value:"12 GB LPDDR5" },

    { label:"Almacenamiento",  value:"256 GB / 512 GB" },

    { label:"Peso",            value:"503 g" },

    { label:"Batería",         value:"5300 mAh — 3h intensivo, 4.5h casual" },

    { label:"Conectividad",    value:"Wi-Fi 6E, Bluetooth 5.3" },

    { label:"Audio",           value:"Estéreo integrado + jack 3.5 mm" },

    { label:"Tracking",        value:"6DOF inside-out tracking" },

    { label:"Mandos",          value:"Touch Pro Controllers incluidos" },

  ],

  gallery: [

    "1588336443962-49d88df004a1",

    "1604272986062-67ef7145f0ef",

    "1633499737221-5e3406d4d952",

    "1547394765-185e1e68f34e",

  ],

};

export const HERO_SLIDES = [

  { headline:"JUEGA SIN LÍMITES",   sub:"Visores VR de próxima generación con 4K por ojo", tag:"NUEVO", cta:"Explorar VR",   imgId:"1588336443962-49d88df004a1", accent:mg },

  { headline:"DOMINA CADA BATALLA", sub:"Teclados mecánicos de competición profesional",   tag:"TOP",   cta:"Ver Teclados",  imgId:"1547394765-185e1e68f34e",   accent:vi },

  { headline:"PRECISIÓN ABSOLUTA",  sub:"Controles de élite con haptic feedback avanzado", tag:"HOT",   cta:"Ver Controles", imgId:"1633499737221-5e3406d4d952", accent:cy },

];

export const CATEGORIES = [

  { id:"vr",         label:"Visores VR",  Icon: Eye },

  { id:"keyboard",   label:"Teclados",    Icon: Monitor },

  { id:"controller", label:"Controles",   Icon: Gamepad2 },

  { id:"headset",    label:"Auriculares", Icon: Headphones },

];

export const BADGE_MAP: Record<string, { bg: string; color: string; border?: string }> = {

  NUEVO:  { bg: cy,                       color: "#0A0512" },

  TOP:    { bg: go,                       color: "#0A0512" },

  HOT:    { bg: ht,                       color: "#fff" },

  OFERTA: { bg: mg,                       color: "#fff" },

  ERGON:  { bg: vi,                       color: "#fff" },

  "4K":   { bg:"rgba(0,240,255,0.12)",   color: cy,      border:`1px solid ${cy}55` },

  PRO:    { bg:"rgba(139,47,214,0.2)",   color:"#D9AAFF", border:`1px solid ${vi}55` },

};

export const FILTERS = [

  { id:"cat",   label:"Categoría",    opts:[{id:"vr",label:"Visores VR",n:24},{id:"kb",label:"Teclados",n:38},{id:"ctrl",label:"Controles",n:31},{id:"hs",label:"Auriculares",n:27}] },

  { id:"brand", label:"Marca",        opts:[{id:"rz",label:"Razer",n:22},{id:"lg",label:"Logitech",n:31},{id:"sn",label:"Sony",n:18},{id:"ss",label:"SteelSeries",n:15},{id:"cr",label:"Corsair",n:19}] },

  { id:"price", label:"Precio",       opts:[{id:"0",label:"Hasta $50",n:12},{id:"1",label:"$50–$150",n:34},{id:"2",label:"$150–$300",n:28},{id:"3",label:"$300+",n:16}] },

  { id:"conn",  label:"Conectividad", opts:[{id:"wl",label:"Wireless",n:45},{id:"bt",label:"Bluetooth",n:52},{id:"uc",label:"USB-C",n:63}] },

];

export const SEARCH_RECENT   = ["Visor VR 4K","Teclado mecánico RGB","Control PS5 compatible","Auriculares 7.1 surround"];

export const SEARCH_TRENDING = ["ProVision VR X2","MechStrike Pro","Cherry MX switches","Setup gaming 2025"];

/* ── NEW: Comparator data ── */

export const CMP_PRODS = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]];

export const SPEC_LABELS = ["Precio","Rating","Valoraciones","Conectividad","Autonomía","Peso","Garantía","Envío","Stock"];

export const PRODUCT_SPECS: Record<number, string[]> = {

  1: ["$599.99","★ 4.8","2,341","Wi-Fi 6E + BT5.3","5300mAh / 4.5h","503g","2 años","Gratis","✓ 14 uds."],

  2: ["$189.99","★ 4.7","5,821","USB + 2.4GHz","—","1,050g","2 años","Gratis","✓ 22 uds."],

  3: ["$79.99", "★ 4.6","8,942","2.4GHz + BT + USB","1000mAh / 40h","268g","2 años","Gratis","✓ 9 uds."],

  4: ["$149.99","★ 4.9","3,120","USB-C + Jack","—","320g","1 año","Gratis","⚠ 2 uds."],

  5: ["$129.99","★ 4.5","1,240","USB + 2.4GHz","—","820g","2 años","Gratis","✓ 31 uds."],

  6: ["$59.99", "★ 4.4","2,560","BT + USB","500mAh / 20h","195g","1 año","Gratis","✓ 45 uds."],

  7: ["$449.99","★ 4.6","1,820","Wi-Fi 6 + BT5","6000mAh / 5h","620g","2 años","Gratis","✓ 7 uds."],

  8: ["$89.99", "★ 4.3","4,211","3.5mm + BT5","1800mAh / 28h","285g","1 año","Gratis","✓ 18 uds."],

};

export const CMP_SPECS: { label:string; vals:string[]; best:number[] }[] = [

  { label:"Precio",        vals:["$599.99","$79.99","$149.99"],             best:[1] },

  { label:"Rating",        vals:["★ 4.8","★ 4.6","★ 4.9"],                 best:[2] },

  { label:"Valoraciones",  vals:["2,341","8,942","3,120"],                  best:[1] },

  { label:"Conectividad",  vals:["Wi-Fi 6E + BT5.3","2.4GHz + BT + USB","USB-C + Jack"], best:[1] },

  { label:"Autonomía",     vals:["5300mAh / 4.5h","1000mAh / 40h","—"],    best:[1] },

  { label:"Peso",          vals:["503g","268g","320g"],                     best:[1] },

  { label:"Garantía",      vals:["2 años","2 años","1 año"],               best:[0,1] },

  { label:"Envío",         vals:["Gratis","Gratis","Gratis"],              best:[0,1,2] },

  { label:"Stock",         vals:["✓ 14 uds.","✓ 9 uds.","⚠ 2 uds."],      best:[0,1] },

];

/* ── NEW: Cart data ── */

export type StockState = "ok" | "low" | "out";

export type CartItemType = Product & { qty:number; variant:string; stock:StockState; stockCount:number };

export const CART_INIT: CartItemType[] = [];

/* ── NEW: Tracking ── */

export const TRACKING = [

  { label:"Pedido procesado",  time:"Hoy, 14:32",     done:true,  active:false },

  { label:"Preparando envío",  time:"Hoy, 17:00",     done:true,  active:false },

  { label:"En camino",         time:"Mañana, 09:00",  done:false, active:true  },

  { label:"Entregado",         time:"Est. 48h",       done:false, active:false },

];

/* ─────────────── UTILS ─────────────── */

export const maskCard   = (v:string) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();

export const maskExpiry = (v:string) => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?d.slice(0,2)+"/"+d.slice(2):d; };

export const calcTotals = (items:CartItemType[]) => {

  const sub = items.reduce((s,i)=>s+i.price*i.qty,0);

  const ship = items.length===0 ? 0 : sub>300 ? 0 : 9.99;

  const tax  = items.length===0 ? 0 : sub*0.16;

  return { sub, ship, tax, total:sub+ship+tax };

};

/* ═══════════════════════════════════════

   ATOMS

═══════════════════════════════════════ */

export function Badge({ label }:{ label:string }) {

  const s = BADGE_MAP[label] ?? { bg:bgE, color:txS };

  return (

    <span className="ghi" style={{

      background:s.bg, color:s.color, border:s.border??"none",

      fontSize:10, fontWeight:700, letterSpacing:"0.08em",

      padding:"2px 7px", borderRadius:4, lineHeight:1.6, whiteSpace:"nowrap",

    }}>{label}</span>

  );

}

export function Stars({ value, count, size=12 }:{ value:number; count?:number; size?:number }) {

  return (

    <div style={{ display:"flex", alignItems:"center", gap:3 }}>

      {[1,2,3,4,5].map(i=>(

        <Star key={i} size={size} fill={i<=Math.round(value)?go:"transparent"} color={i<=Math.round(value)?go:txS} strokeWidth={1.5}/>

      ))}

      <span className="ghi" style={{ color:txS, fontSize:11, marginLeft:2 }}>

        {value.toFixed(1)}{count!==undefined?` (${count.toLocaleString()})`:""}

      </span>

    </div>

  );

}

export type BtnVariant = "primary"|"secondary"|"outline"|"ghost"|"cyan"|"success";

export function NeonBtn({ children, variant="primary", small=false, full=false, disabled=false, onClick, style:extra }:{

  children:React.ReactNode; variant?:BtnVariant; small?:boolean; full?:boolean;

  disabled?:boolean; onClick?:()=>void; style?:React.CSSProperties;

}) {

  const map:Record<BtnVariant,React.CSSProperties> = {

    primary:   { background:`linear-gradient(135deg,${mg},#B5007D)`, color:"#fff", boxShadow:GM },

    secondary: { background:`linear-gradient(135deg,${vi},#6010B8)`, color:"#fff", boxShadow:GV },

    outline:   { background:"transparent", color:mg, border:`1px solid ${mg}55`, boxShadow:GM },

    ghost:     { background:"transparent", color:txS, border:`1px solid rgba(255,255,255,0.1)` },

    cyan:      { background:`linear-gradient(135deg,${cy},#00BFCC)`, color:"#0A0512", boxShadow:GC },

    success:   { background:`linear-gradient(135deg,${ok},#00B85A)`, color:"#0A0512", boxShadow:GG },

  };

  const cls = variant==="secondary"?"neon-btn-vi":variant==="cyan"?"neon-btn-cy":"neon-btn";

  return (

    <button className={`ghi ${cls}`} onClick={onClick} disabled={disabled} style={{

      ...map[variant],

      padding:small?"5px 13px":"10px 22px",

      borderRadius:8, fontWeight:700, cursor:disabled?"not-allowed":"pointer",

      fontSize:small?11:14, border:map[variant].border??"none",

      width:full?"100%":"auto",

      display:"inline-flex", alignItems:"center", gap:6,

      opacity:disabled?0.45:1, transition:"all 0.2s",

      ...extra,

    }}>{children}</button>

  );

}

export function PriceTag({ price, orig }:{ price:number; orig:number|null }) {

  const disc = orig?Math.round((1-price/orig)*100):0;

  return (

    <div style={{ display:"flex", alignItems:"baseline", gap:8, flexWrap:"wrap" }}>

      <span className="ghr" style={{ fontSize:22, fontWeight:700, color:mg }}>${price.toFixed(2)}</span>

      {orig&&(

        <>

          <span className="ghi" style={{ fontSize:13, color:txS, textDecoration:"line-through" }}>${orig.toFixed(2)}</span>

          <span className="ghi" style={{ fontSize:11, fontWeight:700, background:"rgba(255,46,158,0.15)", color:mg, padding:"1px 6px", borderRadius:4 }}>-{disc}%</span>

        </>

      )}

    </div>

  );

}

export function CatChip({ cat, active, onClick }:{ cat:{id:string;label:string;Icon:React.FC<{size:number}>}; active:boolean; onClick:()=>void }) {

  return (

    <button onClick={onClick} className={active?"neon-btn":""} style={{

      display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:50,

      flexShrink:0, cursor:"pointer",

      background:active?`linear-gradient(135deg,${mg},${vi})`:bgE,

      border:`1px solid ${active?"transparent":"rgba(139,47,214,0.35)"}`,

      color:active?"#fff":txS, fontSize:13, fontWeight:600,

      boxShadow:active?GM:"none", transition:"all 0.2s ease",

    }}>

      <cat.Icon size={14}/>

      <span className="ghi">{cat.label}</span>

    </button>

  );

}

/* ── NEW ATOM: Floating label input ── */

export function FloatInput({ label, value, onChange, type="text", required=false, inputMode, pattern, half=false }:{

  label:string; value:string; onChange:(v:string)=>void;

  type?:string; required?:boolean;

  inputMode?:React.HTMLAttributes<HTMLInputElement>["inputMode"];

  pattern?:string; half?:boolean;

}) {

  const [focused, setFocused] = useState(false);

  const raised = focused||value.length>0;

  const hasError = required&&!value&&!focused;

  return (

    <div style={{ position:"relative", width:half?"calc(50% - 6px)":"100%", flex:"0 0 auto" }}>

      <label className="float-label ghi" style={{

        position:"absolute", left:14, zIndex:1,

        top:raised?6:15,

        fontSize:raised?10:13, color:raised?(focused?mg:txS):txS,

        fontWeight:raised?600:400, letterSpacing:raised?"0.06em":"normal",

        transition:"all 0.18s ease",

      }}>{label}{required&&<span style={{color:mg}}>*</span>}</label>

      <input type={type} value={value} onChange={e=>onChange(e.target.value)}

        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}

        inputMode={inputMode} pattern={pattern}

        style={{

          width:"100%", background:bgE,

          border:`1px solid ${hasError?"rgba(255,69,0,0.5)":focused?mg+"88":"rgba(139,47,214,0.3)"}`,

          borderRadius:10, color:tx,

          padding:"22px 14px 8px",

          fontSize:14, outline:"none", fontFamily:"'Inter',sans-serif",

          boxShadow:focused?GM:"none", transition:"all 0.18s ease",

          boxSizing:"border-box",

        }}

      />

      {hasError&&(

        <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",

          width:6, height:6, borderRadius:"50%", background:"rgba(255,69,0,0.7)" }}/>

      )}

    </div>

  );

}

/* ── NEW ATOM: Checkout progress bar ── */

export function CheckoutProgress({ step, mobile=false }:{ step:1|2|3|4; mobile?:boolean }) {

  const steps = ["Envío","Pago","Revisión","¡Listo!"];

  return (

    <div style={{ display:"flex", alignItems:"center", marginBottom:mobile?20:32 }}>

      {steps.map((s,i)=>(

        <div key={s} style={{ display:"flex", alignItems:"center", flex:i<3?1:0 }}>

          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>

            <div style={{

              width:mobile?28:36, height:mobile?28:36, borderRadius:"50%",

              background:i+1<=step?`linear-gradient(135deg,${mg},${vi})`:bgE,

              border:`2px solid ${i+1<=step?"transparent":"rgba(139,47,214,0.3)"}`,

              display:"flex", alignItems:"center", justifyContent:"center",

              color:i+1<=step?"#fff":txS,

              boxShadow:i+1===step?GM:"none",

              transition:"all 0.3s",

            }}>

              {i+1<step

                ?<Check size={mobile?12:16} strokeWidth={3}/>

                :<span className="ghi" style={{ fontSize:mobile?11:13, fontWeight:700 }}>{i+1}</span>

              }

            </div>

            <span className="ghi" style={{

              fontSize:mobile?9:11, color:i+1<=step?tx:txS,

              fontWeight:i+1===step?700:400, whiteSpace:"nowrap",

            }}>{s}</span>

          </div>

          {i<3&&(

            <div style={{ flex:1, height:2, marginBottom:mobile?14:18, marginLeft:4, marginRight:4,

              background:i+1<step?`linear-gradient(90deg,${mg},${vi})`:bgE, minWidth:20 }}/>

          )}

        </div>

      ))}

    </div>

  );

}

/* ── NEW ATOM: Simple Footer Component ── */

export function SimpleFooter({ onNav, mobile=false }:{ onNav:(s:string)=>void; mobile?:boolean }) {

  return (

    <footer style={{

      background: bgC,

      borderTop: `1px solid rgba(139,47,214,0.25)`,

      padding: mobile ? "24px 16px 36px" : "32px 48px",

      marginTop: "auto",

      width: "100%",

      boxSizing: "border-box"

    }}>

      <div style={{

        maxWidth: 1100, margin: "0 auto",

        display: "flex", flexDirection: mobile ? "column" : "row",

        alignItems: mobile ? "center" : "flex-start",

        justifyContent: "space-between", gap: 20, textAlign: mobile ? "center" : "left"

      }}>

        <div>

          <GHLogo scale={mobile ? 0.75 : 0.85} />

          <p className="ghi" style={{ fontSize: 11, color: txS, marginTop: 8, maxWidth: 280 }}>

            La plataforma líder de e-commerce gamer para hardware, visores VR y periféricos pro.

          </p>

        </div>

        <div style={{

          display: "flex", flexWrap: "wrap", justifyContent: mobile ? "center" : "flex-start",

          gap: mobile ? 12 : 20

        }}>

          <button onClick={() => onNav("home")} style={{ background: "none", border: "none", color: tx, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Inicio</button>

          <button onClick={() => onNav("catalog")} style={{ background: "none", border: "none", color: tx, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Catálogo</button>

          <button onClick={() => onNav("compare")} style={{ background: "none", border: "none", color: tx, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Comparar</button>

          <button onClick={() => onNav("support")} style={{ background: "none", border: "none", color: tx, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Soporte</button>

          <button onClick={() => onNav("profile")} style={{ background: "none", border: "none", color: tx, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Perfil</button>

        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 11, color: txS }}>

          <span onClick={() => { if ((window as any).openTerms) (window as any).openTerms(); }} style={{ color: mg, cursor: "pointer", fontWeight: 600 }}>Términos</span>

          <span>·</span>

          <span onClick={() => { if ((window as any).openPrivacy) (window as any).openPrivacy(); }} style={{ color: mg, cursor: "pointer", fontWeight: 600 }}>Privacidad</span>

        </div>

      </div>

      <div style={{ borderTop: `1px solid rgba(139,47,214,0.15)`, marginTop: 20, paddingTop: 14, textAlign: "center" }}>

        <p className="ghi" style={{ fontSize: 10, color: txS, margin: 0 }}>

          © 2026 GameHub Store. Todos los derechos reservados. | Tópicos de Calidad

        </p>

      </div>

    </footer>

  );

}

/* ═══════════════════════════════════════

   MOLECULES

═══════════════════════════════════════ */

export function ProductCard({ p, onClick }:{ p:Product; onClick?:()=>void }) {

  const [wished, setWished] = useState(false);

  const catLabel = CATEGORIES.find(c=>c.id===p.cat)?.label??p.cat;

  return (

    <div className="gh-card" onClick={onClick} style={{

      background:bgC, borderRadius:14, overflow:"hidden", cursor:"pointer",

      border:"1px solid rgba(255,46,158,0.18)", boxShadow:"0 4px 20px rgba(0,0,0,0.45)",

    }}>

      <div style={{ position:"relative", height:180, background:"#0D0820", overflow:"hidden" }}>

        <img src={imgUrl(p.imgId,400,300)} alt={p.name}

          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", transition:"transform 0.35s ease" }}

          className="zoom-img"

        />

        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,5,18,0.75) 0%,transparent 55%)" }}/>

        <div style={{ position:"absolute", top:8, left:8, display:"flex", gap:4, flexWrap:"wrap" }}>

          {p.badges.map(b=><Badge key={b} label={b}/>)}

        </div>

        <button onClick={e=>{e.stopPropagation();setWished(w=>!w);}} style={{

          position:"absolute", top:8, right:8, width:30, height:30, borderRadius:"50%",

          background:"rgba(21,10,36,0.85)", border:"none", cursor:"pointer",

          display:"flex", alignItems:"center", justifyContent:"center",

        }}><Heart size={14} fill={wished?mg:"transparent"} color={wished?mg:txS}/></button>

      </div>

      <div style={{ padding:"12px 14px 14px" }}>

        <p className="ghi" style={{ fontSize:10, color:txS, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:2 }}>{catLabel}</p>

        <p className="ghr" style={{ fontSize:15, fontWeight:700, color:tx, lineHeight:1.2, marginBottom:6 }}>{p.name}</p>

        <Stars value={p.rating} count={p.reviews} size={11}/>

        <div style={{ marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>

          <PriceTag price={p.price} orig={p.orig}/>

          <button onClick={e=>{

            e.stopPropagation();

            if ((window as any).addToCart) {

              (window as any).addToCart(p);

            } else {

              toast.success(`${p.name} añadido al carrito`,{duration:1800,position:"bottom-right"});

            }

          }} style={{

            padding:"6px 13px", borderRadius:8, fontSize:12, fontWeight:700,

            background:"transparent", border:`1px solid ${mg}66`, color:mg,

            cursor:"pointer", boxShadow:GM, transition:"all 0.2s",

          }}>+ Carrito</button>

        </div>

      </div>

    </div>

  );

}

/* ── NEW: Cart item ── */

export function CartItem({ item, onChange, onRemove }:{

  item:CartItemType;

  onChange:(qty:number)=>void;

  onRemove:()=>void;

}) {

  const stockColor = item.stock==="ok"?ok:item.stock==="low"?go:"#FF4500";

  const qtyWarn = item.qty>item.stockCount;

  const stockLabel = item.stock==="ok"?`En stock (${item.stockCount})`:item.stock==="low"?`Stock bajo (${item.stockCount} uds.)`:"Agotado";

  return (

    <div style={{ display:"flex",gap:14,padding:"16px 0",borderBottom:`1px solid rgba(139,47,214,0.15)` }}>

      {/* Product image */}

      <div style={{ width:80,height:80,borderRadius:12,overflow:"hidden",background:bgE,flexShrink:0,border:`1px solid rgba(139,47,214,0.22)`,boxShadow:`0 4px 20px rgba(0,0,0,0.4)` }}>

        <img src={imgUrl(item.imgId,160,160)} alt={item.name} className="zoom-img" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

      </div>

      <div style={{ flex:1,minWidth:0,display:"flex",flexDirection:"column",justifyContent:"space-between" }}>

        {/* Name row */}

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8 }}>

          <div style={{ minWidth:0 }}>

            <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,lineHeight:1.2,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</p>

            <p className="ghi" style={{ fontSize:11,color:txS }}>{item.variant}</p>

          </div>

          <button onClick={onRemove} title="Eliminar" style={{ background:"none",border:"none",cursor:"pointer",color:txS,padding:4,borderRadius:6,transition:"color 0.15s,background 0.15s",flexShrink:0 }}

            onMouseEnter={e=>{e.currentTarget.style.color="#FF4500";e.currentTarget.style.background="rgba(255,69,0,0.1)";}}

            onMouseLeave={e=>{e.currentTarget.style.color=txS;e.currentTarget.style.background="none";}}>

            <Trash2 size={15}/>

          </button>

        </div>

        {/* Stock badge */}

        <div style={{ display:"flex",alignItems:"center",gap:5,marginTop:4 }}>

          <div style={{ width:6,height:6,borderRadius:"50%",background:stockColor,flexShrink:0,

            animation:item.stock==="ok"?"stockPulse 2s infinite":item.stock==="low"?"stockPulseLow 1.5s infinite":"none",

            boxShadow:`0 0 8px ${stockColor}` }}/>

          <span className="ghi" style={{ fontSize:10,color:stockColor,fontWeight:700 }}>{stockLabel}</span>

        </div>

        {/* Qty + price */}

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8 }}>

          <div style={{ display:"flex",alignItems:"center",background:bgE,borderRadius:8,border:`1px solid ${qtyWarn?"rgba(255,69,0,0.5)":"rgba(139,47,214,0.3)"}`,overflow:"hidden" }}>

            <button onClick={()=>onChange(Math.max(1,item.qty-1))} style={{ width:32,height:32,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center",transition:"color 0.15s" }}

              onMouseEnter={e=>(e.currentTarget.style.color=mg)} onMouseLeave={e=>(e.currentTarget.style.color=txS)}>

              <Minus size={12}/>

            </button>

            <span className="ghi" style={{ width:28,textAlign:"center",fontSize:13,fontWeight:700,color:qtyWarn?"#FF4500":tx }}>{item.qty}</span>

            <button onClick={()=>onChange(item.qty+1)} style={{ width:32,height:32,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center",transition:"color 0.15s" }}

              onMouseEnter={e=>(e.currentTarget.style.color=mg)} onMouseLeave={e=>(e.currentTarget.style.color=txS)}>

              <Plus size={12}/>

            </button>

          </div>

          <div style={{ textAlign:"right" }}>

            {item.orig&&<p className="ghi" style={{ fontSize:10,color:txS,textDecoration:"line-through",margin:"0 0 1px" }}>${(item.orig*item.qty).toFixed(2)}</p>}

            <span className="ghr" style={{ fontSize:16,fontWeight:700,color:mg }}>${(item.price*item.qty).toFixed(2)}</span>

          </div>

        </div>

        {qtyWarn&&(

          <div style={{ display:"flex",alignItems:"center",gap:4,marginTop:4 }}>

            <AlertCircle size={11} color="#FF4500"/>

            <span className="ghi" style={{ fontSize:10,color:"#FF4500",fontWeight:600 }}>Máximo: {item.stockCount} uds.</span>

          </div>

        )}

      </div>

    </div>

  );

}

/* ── NEW: Order summary ── */

export function OrderSummaryPanel({ items, compact=false }:{ items:CartItemType[]; compact?:boolean }) {

  const { sub, ship, tax, total } = calcTotals(items);

  const Row = ({ l, v, bold=false, accent=false, small=false }:{ l:string;v:string;bold?:boolean;accent?:boolean;small?:boolean }) => (

    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:compact?"5px 0":"7px 0" }}>

      <span className="ghi" style={{ fontSize:small?11:13, color:txS }}>{l}</span>

      <span className="ghi" style={{ fontSize:small?11:13, fontWeight:bold?700:500, color:accent?ok:bold?tx:txS }}>{v}</span>

    </div>

  );

  return (

    <div>

      <Row l="Subtotal" v={`$${sub.toFixed(2)}`}/>

      <Row l="IVA (16%)" v={`$${tax.toFixed(2)}`} small/>

      <Row l="Envío" v={ship===0?"Gratis ✓":`$${ship.toFixed(2)}`} accent={ship===0} small/>

      <div style={{ height:1, background:`linear-gradient(90deg,${mg}55,transparent)`, margin:"8px 0" }}/>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>

        <span className="ghr" style={{ fontSize:14, fontWeight:700, color:tx }}>TOTAL</span>

        <span className="ghr" style={{ fontSize:22, fontWeight:700, color:mg }}>${total.toFixed(2)}</span>

      </div>

    </div>

  );

}

/* ═══════════════════════════════════════

   ORGANISMS

═══════════════════════════════════════ */

export function Sidebar({ activeNav, onNav, onSearch }:{ activeNav:string; onNav:(s:string)=>void; onSearch:()=>void }) {

  const items = [

    { id:"home",    Icon:Home,         label:"Inicio" },

    { id:"catalog", Icon:Gamepad2,     label:"Catálogo" },

    { id:"compare", Icon:BarChart2,    label:"Comparar" },

    { id:"search",  Icon:Search,       label:"Buscar" },

    { id:"cart",    Icon:ShoppingCart, label:"Carrito" },

  ];

  return (

    <div style={{

      width:64, height:"calc(100vh - 56px)", position:"fixed", left:0, top:56, zIndex:80,

      background:bgC, borderRight:`1px solid rgba(139,47,214,0.2)`,

      display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 0",

    }}>

      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4, width:"100%", alignItems:"center" }}>

        {items.map(({ id, Icon, label }) => {

          const active = activeNav===id;

          return (

            <button key={id} title={label}

              onClick={()=>id==="search"?onSearch():onNav(id)}

              style={{

                position:"relative", width:44, height:44, borderRadius:10,

                background:active?"rgba(255,46,158,0.1)":"transparent",

                border:"none", cursor:"pointer", color:active?mg:txS,

                display:"flex", alignItems:"center", justifyContent:"center",

                boxShadow:active?GM:"none", transition:"all 0.2s ease",

              }}>

              <Icon size={20}/>

              {active&&<div className="sidebar-active-bar"/>}

            </button>

          );

        })}

      </div>

    </div>

  );

}

export function HeroCarousel({ mobile=false, onCTA, onAll }:{ mobile?:boolean; onCTA?:()=>void; onAll?:()=>void }) {

  const [idx, setIdx] = useState(0);

  const total = HERO_SLIDES.length;

  useEffect(() => {

    const t = setInterval(()=>setIdx(i=>(i+1)%total),4500);

    return ()=>clearInterval(t);

  },[total]);

  const s = HERO_SLIDES[idx];

  return (

    <div style={{ position:"relative", height:mobile?268:420, overflow:"hidden", borderRadius:mobile?0:16, background:"#0D0820" }}>

      <div key={`bg${idx}`} className="fade-in" style={{ position:"absolute", inset:0, backgroundImage:`url(${imgUrl(s.imgId,1200,600)})`, backgroundSize:"cover", backgroundPosition:"center" }}>

        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(10,5,18,0.93) 35%,rgba(10,5,18,0.4))" }}/>

        <div style={{ position:"absolute", right:"12%", top:"50%", transform:"translateY(-50%)", width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle,${s.accent}22 0%,transparent 70%)`, filter:"blur(70px)" }}/>

      </div>

      <div key={`c${idx}`} className="hero-anim" style={{ position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:mobile?"24px 20px":"48px 52px" }}>

        <Badge label={s.tag}/>

        <h1 className="hero-title" style={{ fontSize:mobile?38:66, marginTop:8, marginBottom:8, lineHeight:0.95 }}>{s.headline}</h1>

        <p className="ghi" style={{ color:txS, fontSize:mobile?13:15, marginBottom:22, maxWidth:440 }}>{s.sub}</p>

        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>

          <NeonBtn variant="primary" onClick={onCTA}>{s.cta}<ArrowRight size={14}/></NeonBtn>

          <NeonBtn variant="ghost" onClick={onAll}>Ver todo</NeonBtn>

        </div>

      </div>

      <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:3 }}>

        {HERO_SLIDES.map((_,i)=>(

          <button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?24:6, height:6, borderRadius:3, border:"none", cursor:"pointer", background:i===idx?mg:"rgba(255,255,255,0.3)", boxShadow:i===idx?GM:"none", transition:"all 0.3s ease" }}/>

        ))}

      </div>

      {!mobile&&(

        <>

          {[{side:"left",fn:()=>setIdx(i=>(i-1+total)%total),Icon:ChevronLeft},{side:"right",fn:()=>setIdx(i=>(i+1)%total),Icon:ChevronRight}].map(({side,fn,Icon})=>(

            <button key={side} onClick={fn} style={{ position:"absolute",[side]:16,top:"50%",transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",background:"rgba(21,10,36,0.8)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:3 }}><Icon size={18}/></button>

          ))}

        </>

      )}

    </div>

  );

}

export type Logic = "AND"|"OR"|"NOT";

export const LOGIC_CLR:Record<Logic,string> = { AND:cy, OR:vi, NOT:mg };

export function filterProducts(products: Product[], selected: Record<string, string[]>, logics: Record<string, Logic>) {

  return products.filter(p => {

    // 1. Filter by category

    const selCats = selected["cat"] || [];

    if (selCats.length > 0) {

      const match = selCats.some(c => {

        if (c === "vr") return p.cat === "vr";

        if (c === "kb") return p.cat === "keyboard";

        if (c === "ctrl") return p.cat === "controller";

        if (c === "hs") return p.cat === "headset";

        return false;

      });

      const logic = logics["cat"] || "OR";

      if (logic === "NOT" && match) return false;

      if (logic !== "NOT" && !match) return false;

    }

    // 2. Filter by brand

    const selBrands = selected["brand"] || [];

    if (selBrands.length > 0) {

      let pBrand = "";

      if (p.id === 1) pBrand = "sn"; // Sony

      if (p.id === 2) pBrand = "lg"; // Logitech

      if (p.id === 3) pBrand = "rz"; // Razer

      if (p.id === 4) pBrand = "ss"; // SteelSeries

      if (p.id === 5) pBrand = "cr"; // Corsair

      if (p.id === 6) pBrand = "rz";

      if (p.id === 7) pBrand = "sn";

      

      const match = selBrands.includes(pBrand);

      const logic = logics["brand"] || "OR";

      if (logic === "NOT" && match) return false;

      if (logic !== "NOT" && !match) return false;

    }

    // 3. Filter by price

    const selPrices = selected["price"] || [];

    if (selPrices.length > 0) {

      const match = selPrices.some(pr => {

        if (pr === "0") return p.price <= 50;

        if (pr === "1") return p.price > 50 && p.price <= 150;

        if (pr === "2") return p.price > 150 && p.price <= 300;

        if (pr === "3") return p.price > 300;

        return false;

      });

      const logic = logics["price"] || "OR";

      if (logic === "NOT" && match) return false;

      if (logic !== "NOT" && !match) return false;

    }

    // 4. Filter by connectivity

    const selConn = selected["conn"] || [];

    if (selConn.length > 0) {

      let pConn: string[] = [];

      if (p.id === 1) pConn = ["wl", "bt"];

      if (p.id === 2) pConn = ["uc"];

      if (p.id === 3) pConn = ["wl", "bt", "uc"];

      if (p.id === 4) pConn = ["uc"];

      if (p.id === 5) pConn = ["uc"];

      if (p.id === 6) pConn = ["wl"];

      if (p.id === 7) pConn = ["wl", "bt"];

      const match = selConn.some(c => pConn.includes(c));

      const logic = logics["conn"] || "OR";

      if (logic === "NOT" && match) return false;

      if (logic !== "NOT" && !match) return false;

    }

    return true;

  });

}

export function FilterPanel({ onClose, isMobile=false, selected, setSelected, logics, setLogics }:{

  onClose?:()=>void; isMobile?:boolean;

  selected?: Record<string, string[]>;

  setSelected?: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;

  logics?: Record<string, Logic>;

  setLogics?: React.Dispatch<React.SetStateAction<Record<string, Logic>>>;

}) {

  const [localLogics,   setLocalLogics]   = useState<Record<string,Logic>>(()=>Object.fromEntries(FILTERS.map(f=>[f.id,"OR"])));

  const [localSelected, setLocalSelected] = useState<Record<string,string[]>>(()=>Object.fromEntries(FILTERS.map(f=>[f.id,[]])));

  

  const curSelected = selected || localSelected;

  const curSetSelected = setSelected || setLocalSelected;

  const curLogics = logics || localLogics;

  const curSetLogics = setLogics || setLocalLogics;

  const [expanded, setExpanded] = useState<string[]>(["cat","brand"]);

  const toggleLogic = (fid:string) => curSetLogics(p=>{ const c=p[fid]; return {...p,[fid]:c==="AND"?"OR":c==="OR"?"NOT":"AND"}; });

  const toggleOpt   = (fid:string,oid:string) => curSetSelected(p=>({...p,[fid]:p[fid].includes(oid)?p[fid].filter(x=>x!==oid):[...p[fid],oid]}));

  const clearAll    = () => curSetSelected(Object.fromEntries(FILTERS.map(f=>[f.id,[]])));

  const total       = Object.values(curSelected).flatMap(v=>v).length;

  return (

    <div style={{ background:bgC, height:"100%", overflowY:"auto", padding:20 }} className="thin-scroll">

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>

          <SlidersHorizontal size={16} color={mg}/>

          <span className="ghr" style={{ fontSize:16, fontWeight:700, color:tx, letterSpacing:"0.06em" }}>FILTROS</span>

          {total>0&&<span style={{ background:mg,color:"#fff",fontSize:10,fontWeight:700,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>{total}</span>}

        </div>

        <div style={{ display:"flex", gap:8, alignItems:"center" }}>

          {total>0&&<button onClick={clearAll} style={{ background:"none",border:"none",color:txS,fontSize:11,cursor:"pointer" }}>Limpiar</button>}

          {isMobile&&onClose&&<button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><X size={18}/></button>}

        </div>

      </div>

      {FILTERS.map(f=>{

        const isExp=expanded.includes(f.id);

        const logic=curLogics[f.id];

        return (

          <div key={f.id} style={{ marginBottom:14, borderBottom:`1px solid rgba(139,47,214,0.15)`, paddingBottom:14 }}>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:isExp?10:0 }}>

              <button onClick={()=>setExpanded(e=>e.includes(f.id)?e.filter(x=>x!==f.id):[...e,f.id])} style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>

                <span className="ghi" style={{ fontSize:13,fontWeight:600,color:tx }}>{f.label}</span>

                <ChevronDown size={12} color={txS} style={{ transform:isExp?"rotate(180deg)":"none",transition:"transform 0.2s" }}/>

              </button>

              <button onClick={()=>toggleLogic(f.id)} style={{ padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,cursor:"pointer",border:"none",background:`rgba(${logic==="AND"?"0,240,255":logic==="OR"?"139,47,214":"255,46,158"},0.15)`,color:LOGIC_CLR[logic],outline:`1px solid ${LOGIC_CLR[logic]}44` }}>{logic}</button>

            </div>

            {isExp&&(

              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>

                {f.opts.map(o=>{

                  const sel=curSelected[f.id].includes(o.id);

                  return (

                    <label key={o.id} style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer" }}>

                      <div onClick={()=>toggleOpt(f.id,o.id)} style={{ width:16,height:16,borderRadius:4,flexShrink:0,cursor:"pointer",border:`1px solid ${sel?mg:"rgba(255,255,255,0.2)"}`,background:sel?mg:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}>

                        {sel&&<Check size={10} color="#fff" strokeWidth={3}/>}

                      </div>

                      <span className="ghi" style={{ fontSize:12,color:txS,flex:1 }}>{o.label}</span>

                      <span className="ghi" style={{ fontSize:11,color:"rgba(155,138,176,0.55)" }}>({o.n})</span>

                    </label>

                  );

                })}

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}

export function SearchOverlay({ onClose, mobile=false }:{ onClose:()=>void; mobile?:boolean }) {

  const [query,     setQuery]     = useState("");

  const [listening, setListening] = useState(false);

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape") onClose();

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [onClose]);

  const hits = query.length > 1 ? PRODUCTS.filter(p => {

    const q = query.toLowerCase();

    const brandMap: Record<number, string[]> = {

      1: ["sony", "playstation", "vr", "provision", "visor", "realidad virtual"],

      2: ["logitech", "teclado", "keyboard", "mechstrike"],

      3: ["razer", "control", "controller", "nexforce"],

      4: ["steelseries", "auriculares", "headset", "soundstrike"],

      5: ["corsair", "teclado", "keyboard", "ultraswitch"],

      6: ["razer", "control", "controller", "aerogrip"],

      7: ["sony", "playstation", "vr", "quantumvr", "visor", "realidad virtual"],

      8: ["logitech", "auriculares", "headset", "basscore"]

    };

    const keywords = brandMap[p.id] || [];

    const matchesBrand = keywords.some(keyword => keyword.includes(q) || q.includes(keyword));

    const matchesName = p.name.toLowerCase().includes(q);

    const matchesSub = p.sub.toLowerCase().includes(q);

    const matchesCat = p.cat.toLowerCase().includes(q);

    return matchesName || matchesSub || matchesCat || matchesBrand;

  }).slice(0, 4) : [];

  if (mobile) {

    return (

      <div className="fade-in" style={{ position:"absolute",inset:0,background:bg,zIndex:50,display:"flex",flexDirection:"column" }}>

        <div style={{ padding:"12px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid rgba(139,47,214,0.2)`,flexShrink:0 }}>

          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><ChevronLeft size={22}/></button>

          <div style={{ flex:1,position:"relative" }}>

            <Search size={15} color={txS} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}/>

            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar productos gaming..."

              style={{ width:"100%",background:bgE,border:`1px solid rgba(255,46,158,${query?"0.5":"0.2"})`,borderRadius:50,padding:"10px 16px 10px 36px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxShadow:query?GM:"none",transition:"all 0.2s" }}

            />

          </div>

        </div>

        {!query?(

          <div style={{ flex:1,overflowY:"auto",padding:20 }} className="no-scroll">

            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 0 28px" }}>

              <button onClick={()=>setListening(l=>!l)} style={{ width:88,height:88,borderRadius:"50%",border:"none",cursor:"pointer",background:listening?`linear-gradient(135deg,${mg},${vi})`:bgE,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:listening?GM:GV,transition:"all 0.3s ease" }}>

                <Mic size={34} color={listening?"#fff":txS}/>

              </button>

              <p className="ghi" style={{ color:txS,fontSize:12,marginTop:12 }}>{listening?"Escuchando…":"Toca para buscar por voz"}</p>

            </div>

            <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:8 }}>RECIENTES</p>

            {SEARCH_RECENT.map(s=>(

              <button key={s} onClick={()=>setQuery(s)} style={{ display:"flex",alignItems:"center",gap:10,width:"100%",background:"none",border:"none",cursor:"pointer",padding:"11px 0",borderBottom:`1px solid rgba(139,47,214,0.12)` }}>

                <Clock size={14} color={txS}/><span className="ghi" style={{ color:tx,fontSize:14 }}>{s}</span>

              </button>

            ))}

          </div>

        ):(

          <div style={{ flex:1,overflowY:"auto",padding:16 }} className="thin-scroll">

            <p className="ghi" style={{ fontSize:11,color:txS,marginBottom:12 }}>{hits.length} resultado{hits.length!==1?"s":""} para "<span style={{color:tx}}>{query}</span>"</p>

            {hits.map(p=>(

              <div key={p.id} onClick={onClose} style={{ display:"flex",gap:12,padding:"12px 0",borderBottom:`1px solid rgba(139,47,214,0.12)`,cursor:"pointer" }}>

                <div style={{ width:56,height:56,borderRadius:10,overflow:"hidden",background:bgE,flexShrink:0 }}>

                  <img src={imgUrl(p.imgId,120,120)} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                </div>

                <div>

                  <div style={{ display:"flex",gap:4,marginBottom:3 }}>{p.badges.slice(0,2).map(b=><Badge key={b} label={b}/>)}</div>

                  <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx }}>{p.name}</p>

                  <PriceTag price={p.price} orig={p.orig}/>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    );

  }

  return (

    <div className="fade-in" style={{ position:"absolute",inset:0,background:"rgba(10,5,18,0.96)",backdropFilter:"blur(14px)",zIndex:50,display:"flex",justifyContent:"center",paddingTop:80 }}>

      <button onClick={onClose} style={{ position:"absolute",top:20,right:24,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",gap:6 }}>

        <X size={20}/><span className="ghi" style={{ fontSize:12 }}>ESC</span>

      </button>

      <div style={{ width:"100%",maxWidth:680,padding:"0 24px" }}>

        <div style={{ position:"relative",marginBottom:32 }}>

          <Search size={20} color={mg} style={{ position:"absolute",left:20,top:"50%",transform:"translateY(-50%)" }}/>

          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar productos, marcas, categorías…"

            style={{ width:"100%",background:bgC,border:`1px solid ${mg}66`,borderRadius:14,padding:"18px 52px 18px 56px",color:tx,fontSize:18,outline:"none",fontFamily:"'Inter',sans-serif",boxShadow:GM }}

          />

          <button style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",width:36,height:36,borderRadius:8,background:bgE,border:`1px solid rgba(0,240,255,0.35)`,cursor:"pointer",color:cy,display:"flex",alignItems:"center",justifyContent:"center" }}><Mic size={16}/></button>

        </div>

        {!query?(

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }}>

            {[{ title:"RECIENTES",items:SEARCH_RECENT,Icon:Clock,color:txS },{ title:"TENDENCIAS",items:SEARCH_TRENDING,Icon:TrendingUp,color:mg }].map(({ title,items,Icon,color })=>(

              <div key={title}>

                <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.08em",marginBottom:12 }}>{title}</p>

                {items.map(s=>(

                  <button key={s} onClick={()=>setQuery(s)} style={{ display:"flex",alignItems:"center",gap:10,width:"100%",background:"none",border:"none",cursor:"pointer",padding:"10px 0",borderBottom:`1px solid rgba(139,47,214,0.12)` }}>

                    <Icon size={14} color={color}/><span className="ghi" style={{ color:tx,fontSize:14 }}>{s}</span>

                  </button>

                ))}

              </div>

            ))}

          </div>

        ):(

          <div className="fade-up">

            <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:14 }}>{hits.length} RESULTADO{hits.length!==1?"S":""} PARA "<span style={{color:tx}}>{query.toUpperCase()}</span>"</p>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>

              {hits.map(p=>(

                <div key={p.id} onClick={onClose} className="gh-card gh-card-vi" style={{ display:"flex",gap:12,padding:14,borderRadius:12,cursor:"pointer",background:bgC,border:"1px solid rgba(139,47,214,0.25)" }}>

                  <div style={{ width:62,height:62,borderRadius:8,overflow:"hidden",background:bgE,flexShrink:0 }}>

                    <img src={imgUrl(p.imgId,124,124)} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                  </div>

                  <div>

                    <div style={{ display:"flex",gap:4,marginBottom:4 }}>{p.badges.slice(0,2).map(b=><Badge key={b} label={b}/>)}</div>

                    <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,marginBottom:2 }}>{p.name}</p>

                    <PriceTag price={p.price} orig={p.orig}/>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

/* ── NEW ORGANISM: Bottom Navigation ── */

export function BottomNav({ active, onNav }:{ active:string; onNav:(s:string)=>void }) {

  const items = [

    { id:"home",   Icon:Home,         label:"Tienda" },

    { id:"cart",   Icon:ShoppingCart, label:"Pedidos" },

    { id:"profile",Icon:User,         label:"Perfil" },

    { id:"orders", Icon:History,      label:"Historial" },

  ];

  return (

    <div style={{

      background:`rgba(21,10,36,0.98)`, borderTop:`1px solid rgba(139,47,214,0.25)`,

      display:"flex", padding:"6px 0 2px", flexShrink:0,

    }}>

      {items.map(({ id, Icon, label })=>{

        const on = active===id||(id==="home"&&["catalog","detail","search","compare"].includes(active));

        return (

          <button key={id} onClick={()=>onNav(id==="orders"?"profile":id)}

            style={{

              flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3,

              background:"none", border:"none", cursor:"pointer",

              padding:"6px 0",

              color: on?mg:txS,

            }}>

            <div style={{ position:"relative" }}>

              <Icon size={20} color={on?mg:txS}/>

              {on&&<div style={{ position:"absolute",bottom:-4,left:"50%",transform:"translateX(-50%)",width:4,height:4,borderRadius:"50%",background:mg,boxShadow:GM }}/>}

            </div>

            <span className="ghi" style={{ fontSize:9,fontWeight:on?700:400,letterSpacing:"0.04em" }}>{label}</span>

          </button>

        );

      })}

    </div>

  );

}

/* ── NEW ORGANISM: Delivery Map ── */

export function DeliveryMap() {

  return (

    <div style={{ borderRadius:16, overflow:"hidden", background:"#0D0820", position:"relative",

      border:`1px solid rgba(255,46,158,0.2)`, height:"100%", minHeight:260 }}>

      <svg width="100%" height="100%" viewBox="0 0 420 280" preserveAspectRatio="xMidYMid slice">

        <rect width="420" height="280" fill="#0D0820"/>

        {/* City blocks */}

        {[[20,20,72,52],[112,20,82,52],[214,20,62,52],[296,20,100,52],

          [20,100,52,60],[92,100,104,60],[216,100,82,60],[318,100,72,60],

          [20,190,92,56],[132,190,64,56],[216,190,82,56],[318,190,76,56]].map(([x,y,w,h],i)=>(

          <rect key={i} x={x} y={y} width={w} height={h} rx={5} fill="rgba(139,47,214,0.09)"/>

        ))}

        {/* Major roads */}

        <rect x={0} y={84} width={420} height={10} fill="rgba(139,47,214,0.18)"/>

        <rect x={0} y={174} width={420} height={7} fill="rgba(139,47,214,0.12)"/>

        <rect x={198} y={0} width={9} height={280} fill="rgba(139,47,214,0.12)"/>

        <rect x={79} y={0} width={6} height={280} fill="rgba(139,47,214,0.08)"/>

        <rect x={308} y={0} width={6} height={280} fill="rgba(139,47,214,0.08)"/>

        {/* Delivery route */}

        <path d="M 56 228 L 56 174 L 56 89 L 202 89 L 202 46 L 350 46"

          stroke={mg} strokeWidth={2.5} fill="none" strokeDasharray="8 4"

          style={{ filter:`drop-shadow(0 0 6px rgba(255,46,158,0.8))` }}/>

        {/* Origin */}

        <circle cx={56} cy={228} r={8} fill={mg} style={{ filter:`drop-shadow(0 0 12px rgba(255,46,158,0.95))` }}/>

        <circle cx={56} cy={228} r={18} fill="rgba(255,46,158,0.15)" stroke={mg} strokeWidth={1}/>

        <text x={78} y={233} fill={txS} fontSize={10} fontFamily="Inter,sans-serif">Almacén · CDMX</text>

        {/* Destination */}

        <circle cx={350} cy={46} r={8} fill={cy} style={{ filter:`drop-shadow(0 0 12px rgba(0,240,255,0.95))` }}/>

        <circle cx={350} cy={46} r={18} fill="rgba(0,240,255,0.15)" stroke={cy} strokeWidth={1}/>

        <text x={310} y={34} fill={cy} fontSize={10} fontFamily="Inter,sans-serif">Tu dirección</text>

      </svg>

      {/* ETA badge */}

      <div style={{ position:"absolute", bottom:16, right:16, background:bgC,

        borderRadius:12, padding:"10px 16px", border:`1px solid rgba(0,240,255,0.35)`, boxShadow:GC }}>

        <p className="ghi" style={{ fontSize:9, color:txS, margin:0, letterSpacing:"0.07em" }}>TIEMPO ESTIMADO</p>

        <p className="ghr" style={{ fontSize:22, fontWeight:700, color:cy, margin:0 }}>24 – 48h</p>

      </div>

    </div>

  );

}

/* ═══════════════════════════════════════

   OLD SCREENS (unchanged)

═══════════════════════════════════════ */

/* STYLE GUIDE */

export function StyleGuide() {

  return (

    <div style={{ background:bg, minHeight:"100vh", padding:"40px 40px 80px" }} className="thin-scroll">

      <div style={{ maxWidth:1100, margin:"0 auto" }}>

        <div style={{ marginBottom:48 }}>

          <h1 className="hero-title" style={{ fontSize:48, lineHeight:1 }}>GAMEHUB DESIGN SYSTEM</h1>

          <p className="ghi" style={{ color:txS, marginTop:6 }}>Componentes atómicos · Tokens · Guía visual</p>

        </div>

        <SGSection title="PALETA DE COLOR">

          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>

            {[{ name:"Deep BG",hex:bg },{ name:"Card BG",hex:bgC },{ name:"Elevated",hex:bgE },

              { name:"Magenta Neón",hex:mg,glow:GM },{ name:"Violeta",hex:vi,glow:GV },

              { name:"Cian PRO",hex:cy,glow:GC },{ name:"Gold TOP",hex:go },

              { name:"Success",hex:ok,glow:GG },{ name:"Text Primary",hex:tx },{ name:"Text Sec.",hex:txS }].map(c=>(

              <div key={c.name} style={{ width:96 }}>

                <div style={{ height:64,borderRadius:12,background:c.hex,marginBottom:6,border:"1px solid rgba(255,255,255,0.07)",boxShadow:(c as any).glow??"none" }}/>

                <p className="ghi" style={{ fontSize:11,color:tx,fontWeight:600,marginBottom:2 }}>{c.name}</p>

                <p className="ghi" style={{ fontSize:10,color:txS }}>{c.hex}</p>

              </div>

            ))}

          </div>

        </SGSection>

        <SGSection title="TIPOGRAFÍA">

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {[

              { label:"H1 — Rajdhani 700 / 56px", el:<p className="ghr" style={{fontSize:56,fontWeight:700,color:tx,lineHeight:1}}>ProVision VR X2</p> },

              { label:"H2 — Rajdhani 700 / 34px", el:<p className="ghr" style={{fontSize:34,fontWeight:700,color:tx}}>Teclados Mecánicos</p> },

              { label:"Hero — Gradient Animado",   el:<p className="hero-title" style={{fontSize:44,lineHeight:1}}>JUEGA SIN LÍMITES</p> },

              { label:"Body — Inter 400 / 14px",   el:<p className="ghi" style={{fontSize:14,color:tx,maxWidth:500}}>Experimenta la realidad virtual más inmersiva con resolución 4K por ojo y campo de visión de 120°. El ProVision VR X2 redefine los límites del gaming.</p> },

              { label:"Caption — Inter 400 / 11px",el:<p className="ghi" style={{fontSize:11,color:txS}}>4.8 · 2,341 valoraciones · En stock · Envío 24 h</p> },

            ].map(({ label, el })=>(

              <div key={label}>

                <p className="ghi" style={{ fontSize:10,color:txS,marginBottom:6,letterSpacing:"0.07em" }}>{label}</p>

                {el}

              </div>

            ))}

          </div>

        </SGSection>

        <SGSection title="BADGES">

          <div style={{ display:"flex",gap:10,flexWrap:"wrap",alignItems:"center" }}>

            {Object.keys(BADGE_MAP).map(b=><Badge key={b} label={b}/>)}

          </div>

        </SGSection>

        <SGSection title="BOTONES">

          <div style={{ display:"flex",gap:12,flexWrap:"wrap",alignItems:"center" }}>

            <NeonBtn variant="primary">Agregar al Carrito</NeonBtn>

            <NeonBtn variant="secondary">Ver Catálogo</NeonBtn>

            <NeonBtn variant="outline">+ Favoritos</NeonBtn>

            <NeonBtn variant="cyan"><Eye size={13}/>4K / PRO</NeonBtn>

            <NeonBtn variant="success"><CheckCircle size={13}/>Confirmado</NeonBtn>

            <NeonBtn variant="ghost">Ver todo</NeonBtn>

            <NeonBtn variant="primary" small>Oferta −30%</NeonBtn>

            <NeonBtn variant="primary" disabled>Agotado</NeonBtn>

          </div>

        </SGSection>

        <SGSection title="CHECKOUT PROGRESS">

          <div style={{ maxWidth:560 }}>

            <CheckoutProgress step={2}/>

          </div>

        </SGSection>

        <SGSection title="FLOATING LABEL INPUT">

          <div style={{ display:"flex",gap:12,maxWidth:500,flexWrap:"wrap" }}>

            <FloatInput label="Nombre" value="" onChange={()=>{}} required/>

            <FloatInput label="Número de tarjeta" value="4242 4242 4242 " onChange={()=>{}} inputMode="numeric"/>

          </div>

        </SGSection>

        <SGSection title="GLOW / NEON EFFECTS">

          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>

            {[{ l:"Magenta Primary",c:mg,s:GM },{ l:"Violet Secondary",c:vi,s:GV },{ l:"Cyan PRO",c:cy,s:GC },{ l:"Success",c:ok,s:GG }].map(g=>(

              <div key={g.l} style={{ padding:"18px 28px",borderRadius:12,background:bgC,border:`1px solid ${g.c}44`,color:g.c,fontWeight:700,fontSize:13,boxShadow:g.s,fontFamily:"'Rajdhani',sans-serif" }}>{g.l}</div>

            ))}

          </div>

        </SGSection>

        <SGSection title="PRODUCT CARDS">

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,maxWidth:880 }}>

            {PRODUCTS.slice(0,4).map(p=><ProductCard key={p.id} p={p}/>)}

          </div>

        </SGSection>

      </div>

    </div>

  );

}

export function SGSection({ title, children }:{ title:string; children:React.ReactNode }) {

  return (

    <div style={{ marginBottom:44 }}>

      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>

        <span className="ghr" style={{ fontSize:12,fontWeight:700,color:mg,letterSpacing:"0.1em" }}>{title}</span>

        <div style={{ flex:1,height:1,background:`linear-gradient(to right,rgba(255,46,158,0.45),transparent)` }}/>

      </div>

      {children}

    </div>

  );

}

export function HomeDesktop({ onNav, onSearch, onDetail }:{ onNav:(s:string)=>void; onSearch:()=>void; onDetail:(p:Product)=>void }) {

  const [activeCat, setActiveCat] = useState<string|null>(null);

  return (

    <div style={{ display:"flex", minHeight:"calc(100vh - 56px)", background:bg }}>

      <Sidebar activeNav="home" onNav={onNav} onSearch={onSearch}/>

      <div style={{ marginLeft:64, flex:1, overflow:"hidden" }}>

        <div style={{ padding:"14px 24px",display:"flex",alignItems:"center",gap:14,borderBottom:`1px solid rgba(139,47,214,0.18)`,background:bgC,position:"sticky",top:0,zIndex:10 }}>

          <div style={{ flex:1,position:"relative",maxWidth:480 }}>

            <Search size={15} color={txS} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)" }}/>

            <input onFocus={onSearch} readOnly placeholder="Buscar hardware gaming…"

              style={{ width:"100%",background:bgE,border:`1px solid rgba(255,46,158,0.2)`,borderRadius:50,padding:"9px 16px 9px 40px",color:txS,fontSize:13,outline:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif" }}/>

          </div>

          <button onClick={() => {

            const list = (window as any).getNotifications ? (window as any).getNotifications() : [];

            if (list.length === 0) {

              toast("🔔 No tienes notificaciones nuevas", { description: "Estás al día con todas tus alertas." });

            } else {

              list.forEach((n: any, idx: number) => {

                setTimeout(() => {

                  toast(`🔔 ${n.title}`, {

                    description: `${n.desc} (${n.date})`,

                    action: n.targetScreen && n.actionLabel ? {

                      label: n.actionLabel,

                      onClick: () => {

                        if ((window as any).navigateToScreen) {

                          (window as any).navigateToScreen(n.targetScreen);

                        }

                      }

                    } : undefined

                  });

                }, idx * 150);

              });

            }

          }} title="Notificaciones" style={{ position:"relative",background:"none",border:"none",cursor:"pointer",color:txS,transition:"color 0.15s" }}

            onMouseEnter={e=>(e.currentTarget.style.color=mg)} onMouseLeave={e=>(e.currentTarget.style.color=txS)}>

            <Bell size={20}/>

            {((window as any).getNotifications ? (window as any).getNotifications().length > 0 : true) && (

              <span style={{ position:"absolute",top:-2,right:-2,width:8,height:8,borderRadius:"50%",background:mg,animation:"stockPulse 2s infinite" }}/>

            )}

          </button>

          <button onClick={()=>onNav("profile")} title="Mi perfil" style={{ width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${mg},${vi})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><User size={14} color="#fff"/></button>

        </div>

        <div style={{ padding:"24px",overflowY:"auto",maxHeight:"calc(100vh - 56px - 57px)" }} className="thin-scroll">

          <HeroCarousel onCTA={()=>onNav("catalog")} onAll={()=>onNav("catalog")}/>

          <div style={{ display:"flex",gap:10,marginTop:24,flexWrap:"wrap" }}>

            {CATEGORIES.map(c=><CatChip key={c.id} cat={c} active={activeCat===c.id} onClick={()=>{setActiveCat(a=>a===c.id?null:c.id);onNav("catalog");}}/>)}

          </div>

          <div style={{ marginTop:36 }}>

            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>

              <div style={{ display:"flex",alignItems:"center",gap:10 }}>

                <Zap size={18} color={mg} fill={mg}/>

                <span className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,letterSpacing:"0.05em" }}>OFERTAS DEL DÍA</span>

                <span className="ghi" style={{ background:"rgba(255,46,158,0.14)",color:mg,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:50,border:`1px solid rgba(255,46,158,0.3)` }}>⏱ 11:23:47</span>

              </div>

              <button onClick={()=>onNav("catalog")} style={{ background:"none",border:"none",cursor:"pointer",color:mg,fontSize:13,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>Ver todo →</button>

            </div>

            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>

              {PRODUCTS.slice(0,4).map(p=><ProductCard key={p.id} p={p} onClick={()=>onDetail(p)}/>)}

            </div>

          </div>

          <div style={{ marginTop:44 }}>

            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>

              <Award size={18} color={go}/>

              <span className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,letterSpacing:"0.05em" }}>MÁS VALORADOS</span>

            </div>

            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>

              {PRODUCTS.slice(4,8).map(p=><ProductCard key={p.id} p={p} onClick={()=>onDetail(p)}/>)}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export function HomeMobile({ onNav, onSearch, onDetail }:{ onNav:(s:string)=>void; onSearch:()=>void; onDetail:(p:Product)=>void }) {

  const [activeCat, setActiveCat] = useState<string|null>(null);

  return (

    <div style={{ background:bg,height:"100%",overflowY:"auto",position:"relative" }} className="thin-scroll">

      <HeroCarousel mobile onCTA={()=>onNav("catalog")} onAll={()=>onNav("catalog")}/>

      <div style={{ display:"flex",gap:10,padding:"14px 16px",overflowX:"auto" }} className="no-scroll">

        {CATEGORIES.map(c=><CatChip key={c.id} cat={c} active={activeCat===c.id} onClick={()=>{setActiveCat(a=>a===c.id?null:c.id);onNav("catalog");}}/>)}

      </div>

      <div style={{ padding:"0 16px 20px" }}>

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>

          <div style={{ display:"flex",alignItems:"center",gap:8 }}><Zap size={16} color={mg} fill={mg}/><span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>OFERTAS DEL DÍA</span></div>

          <span className="ghi" style={{ fontSize:12,color:mg,fontWeight:700 }}>⏱ 11:23:47</span>

        </div>

        <div style={{ display:"flex",gap:14,overflowX:"auto" }} className="no-scroll">

          {PRODUCTS.slice(0,4).map(p=><div key={p.id} style={{ minWidth:182,flexShrink:0 }}><ProductCard p={p} onClick={()=>onDetail(p)}/></div>)}

        </div>

      </div>

      <div style={{ padding:"0 16px 16px" }}>

        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}><Award size={16} color={go}/><span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>MÁS VALORADOS</span></div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>

          {PRODUCTS.slice(4,8).map(p=><ProductCard key={p.id} p={p} onClick={()=>onDetail(p)}/>)}

        </div>

      </div>

    </div>

  );

}

export function CatalogDesktop({ onNav, onSearch, onDetail }:{ onNav:(s:string)=>void; onSearch:()=>void; onDetail:(p:Product)=>void }) {

  const [activeCat, setActiveCat] = useState("all");

  const [sort, setSort] = useState("popular");

  const [selected, setSelected] = useState<Record<string, string[]>>(()=>Object.fromEntries(FILTERS.map(f=>[f.id,[]])));

  const [logics, setLogics] = useState<Record<string, Logic>>(()=>Object.fromEntries(FILTERS.map(f=>[f.id,"OR"])));

  let hits = activeCat==="all"?PRODUCTS:PRODUCTS.filter(p=>p.cat===activeCat);

  hits = filterProducts(hits, selected, logics);

  // Apply sorting

  if (sort === "price_asc") {

    hits = [...hits].sort((a,b)=>a.price-b.price);

  } else if (sort === "price_desc") {

    hits = [...hits].sort((a,b)=>b.price-a.price);

  } else if (sort === "rating") {

    hits = [...hits].sort((a,b)=>b.rating-a.rating);

  }

  return (

    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>

      <Sidebar activeNav="catalog" onNav={onNav} onSearch={onSearch}/>

      <div style={{ marginLeft:64,flex:1,display:"flex",overflow:"hidden" }}>

        <div style={{ width:232,flexShrink:0,height:"calc(100vh - 56px)",overflowY:"auto",borderRight:`1px solid rgba(139,47,214,0.2)` }}>

          <FilterPanel selected={selected} setSelected={setSelected} logics={logics} setLogics={setLogics}/>

        </div>

        <div style={{ flex:1,padding:24,overflowY:"auto",maxHeight:"calc(100vh - 56px)" }} className="thin-scroll">

          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 }}>

            <div><span className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,letterSpacing:"0.05em" }}>CATÁLOGO</span><span className="ghi" style={{ fontSize:12,color:txS,marginLeft:10 }}>({hits.length} productos)</span></div>

            <select value={sort} onChange={e=>setSort(e.target.value)} style={{ background:bgE,color:tx,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:8,padding:"7px 12px",fontSize:13,cursor:"pointer",outline:"none",fontFamily:"'Inter',sans-serif" }}>

              <option value="popular">Más populares</option>

              <option value="price_asc">Precio: menor a mayor</option>

              <option value="price_desc">Precio: mayor a menor</option>

              <option value="rating">Mejor valorados</option>

            </select>

          </div>

          <div style={{ display:"flex",gap:8,marginBottom:20,flexWrap:"wrap" }}>

            {["all",...CATEGORIES.map(c=>c.id)].map(id=>(

              <button key={id} onClick={()=>setActiveCat(id)} style={{ padding:"6px 16px",borderRadius:50,fontSize:12,fontWeight:600,cursor:"pointer",background:activeCat===id?`linear-gradient(135deg,${mg},${vi})`:bgE,border:`1px solid ${activeCat===id?"transparent":"rgba(139,47,214,0.3)"}`,color:activeCat===id?"#fff":txS,boxShadow:activeCat===id?GM:"none",transition:"all 0.2s" }}>{id==="all"?"Todos":CATEGORIES.find(c=>c.id===id)?.label}</button>

            ))}

          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>

            {hits.map(p=><ProductCard key={p.id} p={p} onClick={()=>onDetail(p)}/>)}

          </div>

        </div>

      </div>

    </div>

  );

}

export function ProductDetailDesktop({ onNav, onSearch, product }:{ onNav:(s:string)=>void; onSearch:()=>void; product?:Product }) {
  const activeProduct = product || PRODUCTS[0];
  const gallery = [activeProduct.imgId, "1604272986062-67ef7145f0ef", "1633499737221-5e3406d4d952", "1547394765-185e1e68f34e"];
  const description = activeProduct.id === 1 ? "Experimenta la realidad virtual más inmersiva con resolución 4K por ojo, campo de visión de 120° y seguimiento ocular nativo a 120Hz." : `El nuevo ${activeProduct.name} es la elección definitiva para los gamers más exigentes. Diseñado con tecnología de vanguardia y ergonomía premium para llevar tu setup de juego al siguiente nivel.`;
  const baseSpecs = [
    { label: "Garantía", value: "2 años de fábrica" },
    { label: "Compatibilidad", value: "PC, PS5, Xbox Series X/S" },
    { label: "Valoraciones", value: `${activeProduct.rating} estrellas de ${activeProduct.reviews} reseñas` }
  ];
  const specs = activeProduct.cat === "vr" ? [
    { label: "Resolución", value: "4K por ojo" },
    { label: "Tasa Refresco", value: "120Hz / 90Hz adaptativo" },
    { label: "Campo de Visión", value: "120° diagonal" },
    ...baseSpecs
  ] : activeProduct.cat === "keyboard" ? [
    { label: "Tipo Switch", value: "Mecánico Premium" },
    { label: "Layout", value: "Español / ISO" },
    { label: "Conectividad", value: "USB-C desmontable / Inalámbrico" },
    ...baseSpecs
  ] : activeProduct.cat === "controller" ? [
    { label: "Grip", value: "Antideslizante Ergonómico" },
    { label: "Batería", value: "Hasta 20 horas de autonomía" },
    { label: "Botones", value: "Mecánicos táctiles de alta velocidad" },
    ...baseSpecs
  ] : [
    { label: "Audio", value: "Sonido envolvente 7.1 espacial" },
    { label: "Drivers", value: "50 mm de neodimio" },
    { label: "Micrófono", value: "Cancelación de ruido activa" },
    ...baseSpecs
  ];
  const p = {
    ...activeProduct,
    gallery,
    description,
    specs
  };
  const [selImg,     setSelImg]     = useState(0);

  const [selVariant, setSelVariant] = useState(0);

  const [qty,        setQty]        = useState(1);

  const [voiceOn,    setVoiceOn]    = useState(false);

  const [zoomed,     setZoomed]     = useState(false);

  return (

    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>

      <Sidebar activeNav="catalog" onNav={onNav} onSearch={onSearch}/>

      <div style={{ marginLeft:64,flex:1,padding:"32px",overflowY:"auto",maxHeight:"calc(100vh - 56px)" }} className="thin-scroll">

        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:24 }}>

          {["Catálogo","Visores VR",p.name].map((crumb,i,arr)=>(

            <span key={crumb} style={{ display:"flex",alignItems:"center",gap:8 }}>

              <button style={{ background:"none",border:"none",cursor:i<arr.length-1?"pointer":"default",color:i===arr.length-1?tx:txS,fontSize:13,fontFamily:"'Inter',sans-serif" }}>{crumb}</button>

              {i<arr.length-1&&<span style={{ color:txS,fontSize:13 }}>/</span>}

            </span>

          ))}

        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 420px",gap:44 }}>

          <div style={{ display:"flex",gap:14 }}>

            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>

              {p.gallery.map((id,i)=>(

                <div key={i} onClick={()=>setSelImg(i)} style={{ width:72,height:72,borderRadius:10,overflow:"hidden",cursor:"pointer",border:`2px solid ${i===selImg?mg:"rgba(139,47,214,0.25)"}`,boxShadow:i===selImg?GM:"none",background:bgE,flexShrink:0,transition:"all 0.2s" }}>

                  <img src={imgUrl(id,144,144)} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                </div>

              ))}

            </div>

            <div onMouseEnter={()=>setZoomed(true)} onMouseLeave={()=>setZoomed(false)} style={{ flex:1,borderRadius:16,overflow:"hidden",background:bgC,border:`1px solid rgba(255,46,158,0.22)`,position:"relative",cursor:"zoom-in" }}>

              <img src={imgUrl(p.gallery[selImg],600,500)} alt={p.name} style={{ width:"100%",height:440,objectFit:"cover",transform:zoomed?"scale(1.1)":"scale(1)",transition:"transform 0.45s ease" }}/>

              <div style={{ position:"absolute",bottom:12,right:12,background:"rgba(21,10,36,0.8)",borderRadius:8,padding:"5px 10px",display:"flex",alignItems:"center",gap:5,color:txS,fontSize:12 }}><ZoomIn size={12}/>Zoom</div>

            </div>

          </div>

          <div>

            <div style={{ display:"flex",gap:6,marginBottom:10 }}>{p.badges.map(b=><Badge key={b} label={b}/>)}</div>

            <h1 className="ghr" style={{ fontSize:28,fontWeight:700,color:tx,lineHeight:1.1,marginBottom:6 }}>{p.name}</h1>

            <p className="ghi" style={{ fontSize:13,color:txS,lineHeight:1.6,marginBottom:12 }}>{p.description}</p>

            <Stars value={p.rating} count={p.reviews} size={14}/>

            <div style={{ margin:"16px 0" }}><PriceTag price={p.price} orig={p.orig}/></div>

            <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:8 }}>VARIANTE: <span style={{color:tx}}>{p.variants[selVariant]}</span></p>

            <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:20 }}>

              {p.variants.map((v,i)=>(

                <button key={i} onClick={()=>setSelVariant(i)} style={{ padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:i===selVariant?"rgba(255,46,158,0.14)":bgE,border:`1px solid ${i===selVariant?mg:"rgba(139,47,214,0.25)"}`,color:i===selVariant?mg:txS,boxShadow:i===selVariant?GM:"none",transition:"all 0.2s" }}>{v}</button>

              ))}

            </div>

            <div style={{ display:"flex",gap:10,marginBottom:14 }}>

              <div style={{ display:"flex",alignItems:"center",background:bgE,borderRadius:10,border:`1px solid rgba(139,47,214,0.3)` }}>

                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:38,height:44,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center" }}><Minus size={14}/></button>

                <span className="ghi" style={{ width:30,textAlign:"center",color:tx,fontWeight:700 }}>{qty}</span>

                <button onClick={()=>setQty(q=>q+1)} style={{ width:38,height:44,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center" }}><Plus size={14}/></button>

              </div>

              <button className="neon-btn" onClick={() => {

                if ((window as any).addToCart) {

                  (window as any).addToCart({ ...p, price: p.price, qty });

                } else {

                  toast.success(`${p.name} añadido al carrito`, { duration: 1800, position: "bottom-right" });

                }

              }} style={{ flex:1,padding:"12px",background:`linear-gradient(135deg,${mg},#B5007D)`,border:"none",borderRadius:10,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:GM,fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em" }}>

                AGREGAR AL CARRITO — ${(p.price*qty).toFixed(2)}

              </button>

            </div>

            <div style={{ display:"flex",gap:10,marginBottom:18 }}>

              <button onClick={()=>setVoiceOn(v=>!v)} style={{ flex:1,padding:"9px",borderRadius:10,cursor:"pointer",background:voiceOn?"rgba(0,240,255,0.1)":bgE,border:`1px solid ${voiceOn?cy:"rgba(139,47,214,0.3)"}`,color:voiceOn?cy:txS,display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,transition:"all 0.2s" }}>

                <Volume2 size={15}/>{voiceOn?"Detener lectura":"Leer specs por voz"}

              </button>

              <button style={{ padding:"9px 14px",borderRadius:10,background:bgE,border:`1px solid rgba(139,47,214,0.3)`,cursor:"pointer",color:txS,display:"flex",alignItems:"center",gap:6,fontFamily:"'Inter',sans-serif",fontSize:12 }}><Heart size={15}/>Favorito</button>

            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:8,padding:"14px",borderRadius:10,background:bgE,border:`1px solid rgba(139,47,214,0.2)` }}>

              {[{I:Truck,t:"Envío gratis en 24-48 h"},{I:Shield,t:"Garantía 2 años + soporte premium"},{I:Zap,t:"En stock — salida inmediata"}].map(({ I, t })=>(

                <div key={t} style={{ display:"flex",alignItems:"center",gap:10 }}><I size={13} color={cy}/><span className="ghi" style={{ fontSize:12,color:txS }}>{t}</span></div>

              ))}

            </div>

          </div>

        </div>

        <div style={{ marginTop:52 }}>

          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>

            <h2 className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,letterSpacing:"0.05em" }}>ESPECIFICACIONES TÉCNICAS</h2>

            <button style={{ display:"flex",alignItems:"center",gap:7,padding:"8px 16px",borderRadius:8,background:"rgba(0,240,255,0.1)",border:`1px solid rgba(0,240,255,0.3)`,cursor:"pointer",color:cy,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif" }}><Volume2 size={14}/>Leer tabla completa</button>

          </div>

          <div style={{ borderRadius:16,overflow:"hidden",border:`1px solid rgba(139,47,214,0.25)` }}>

            {p.specs.map((s,i)=>(

              <div key={s.label} style={{ display:"grid",gridTemplateColumns:"220px 1fr",background:i%2===0?bgC:bgE,borderBottom:i<p.specs.length-1?`1px solid rgba(139,47,214,0.12)`:"none" }}>

                <div style={{ padding:"14px 20px",borderRight:`1px solid rgba(139,47,214,0.12)` }}><span className="ghi" style={{ fontSize:13,color:txS,fontWeight:500 }}>{s.label}</span></div>

                <div style={{ padding:"14px 20px" }}><span className="ghi" style={{ fontSize:13,color:tx }}>{s.value}</span></div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export function ProductDetailMobile({ onBack, product }:{ onBack:()=>void; product?:Product }) {
  const activeProduct = product || PRODUCTS[0];
  const gallery = [activeProduct.imgId, "1604272986062-67ef7145f0ef", "1633499737221-5e3406d4d952", "1547394765-185e1e68f34e"];
  const description = activeProduct.id === 1 ? "Experimenta la realidad virtual más inmersiva con resolución 4K por ojo." : `El nuevo ${activeProduct.name} es la elección definitiva para los gamers más exigentes.`;
  const baseSpecs = [
    { label: "Garantía", value: "2 años de fábrica" },
    { label: "Compatibilidad", value: "PC, PS5, Xbox Series X/S" },
    { label: "Valoraciones", value: `${activeProduct.rating} estrellas` }
  ];
  const specs = activeProduct.cat === "vr" ? [
    { label: "Resolución", value: "4K por ojo" },
    { label: "Tasa Refresco", value: "120Hz / 90Hz adaptativo" },
    ...baseSpecs
  ] : [
    { label: "Audio", value: "Sonido envolvente 7.1" },
    ...baseSpecs
  ];
  const p = {
    ...activeProduct,
    gallery,
    description,
    specs
  };
  const [selImg,     setSelImg]     = useState(0);

  const [selVariant, setSelVariant] = useState(0);

  const [qty,        setQty]        = useState(1);

  return (

    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>

      <div style={{ position:"relative",height:272,overflow:"hidden",background:bgC,flexShrink:0 }}>

        <img src={imgUrl(p.gallery[selImg],800,600)} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(10,5,18,0.7) 0%,transparent 50%)" }}/>

        <button onClick={onBack} style={{ position:"absolute",top:16,left:16,width:36,height:36,borderRadius:"50%",background:"rgba(21,10,36,0.85)",border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center" }}><ChevronLeft size={20}/></button>

        <div style={{ position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",display:"flex",gap:5 }}>

          {p.gallery.map((_,i)=><button key={i} onClick={()=>setSelImg(i)} style={{ width:i===selImg?20:5,height:5,borderRadius:3,border:"none",cursor:"pointer",background:i===selImg?mg:"rgba(255,255,255,0.35)",boxShadow:i===selImg?GM:"none",transition:"all 0.3s" }}/>)}

        </div>

      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"18px 18px 8px" }} className="thin-scroll">

        <div style={{ display:"flex",gap:6,marginBottom:8 }}>{p.badges.map(b=><Badge key={b} label={b}/>)}</div>

        <h1 className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,marginBottom:4,lineHeight:1.1 }}>{p.name}</h1>

        <Stars value={p.rating} count={p.reviews}/>

        <div style={{ margin:"14px 0" }}><PriceTag price={p.price} orig={p.orig}/></div>

        <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:8 }}>VARIANTE</p>

        <div style={{ display:"flex",gap:8,marginBottom:18,flexWrap:"wrap" }}>

          {p.variants.map((v,i)=>(

            <button key={i} onClick={()=>setSelVariant(i)} style={{ padding:"7px 13px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:i===selVariant?"rgba(255,46,158,0.14)":bgE,border:`1px solid ${i===selVariant?mg:"rgba(139,47,214,0.25)"}`,color:i===selVariant?mg:txS }}>{v}</button>

          ))}

        </div>

        <button style={{ width:"100%",padding:"11px",borderRadius:10,marginBottom:16,background:"rgba(0,240,255,0.08)",border:`1px solid rgba(0,240,255,0.35)`,color:cy,display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,cursor:"pointer" }}>

          <Volume2 size={16}/>Leer especificaciones por voz

        </button>

        <div style={{ borderRadius:12,overflow:"hidden",border:`1px solid rgba(139,47,214,0.2)` }}>

          {p.specs.slice(0,6).map((s,i)=>(

            <div key={s.label} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:i%2===0?bgC:bgE,borderBottom:i<5?`1px solid rgba(139,47,214,0.1)`:"none" }}>

              <span className="ghi" style={{ fontSize:12,color:txS }}>{s.label}</span>

              <span className="ghi" style={{ fontSize:12,color:tx,fontWeight:500,textAlign:"right",maxWidth:"55%" }}>{s.value}</span>

            </div>

          ))}

        </div>

      </div>

      <div style={{ flexShrink:0,padding:"12px 16px",background:`linear-gradient(to top,${bg} 80%,transparent)`,display:"flex",gap:10,alignItems:"center" }}>

        <div style={{ display:"flex",alignItems:"center",background:bgE,borderRadius:10,border:`1px solid rgba(139,47,214,0.3)` }}>

          <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:36,height:44,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center" }}><Minus size={14}/></button>

          <span className="ghi" style={{ width:26,textAlign:"center",color:tx,fontWeight:700 }}>{qty}</span>

          <button onClick={()=>setQty(q=>q+1)} style={{ width:36,height:44,background:"none",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center" }}><Plus size={14}/></button>

        </div>

        <button className="neon-btn" onClick={() => {

          if ((window as any).addToCart) {

            (window as any).addToCart({ ...p, price: p.price, qty });

          } else {

            toast.success(`${p.name} añadido al carrito`, { duration: 1800, position: "bottom-right" });

          }

        }} style={{ flex:1,padding:"14px",background:`linear-gradient(135deg,${mg},#B5007D)`,border:"none",borderRadius:12,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",boxShadow:GM,fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em" }}>

          AGREGAR — ${(p.price*qty).toFixed(2)}

        </button>

      </div>

    </div>

  );

}

/* ═══════════════════════════════════════

   NEW SCREENS — PURCHASE FLOW

═══════════════════════════════════════ */

/* ── COMPARADOR DESKTOP ── */

export function CompareDesktop({ onNav, onSearch }:{ onNav:(s:string)=>void; onSearch:()=>void }) {

  const [cmpProds, setCmpProds] = useState<Product[]>([]);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [catFilter,   setCatFilter]   = useState<string[]>([]);

  const [brandFilter, setBrandFilter] = useState<string[]>([]);

  const [pickerOpen,  setPickerOpen]  = useState(false);

  const BRANDS = ["Razer","Logitech","Sony","SteelSeries","Corsair"];

  const removeProduct = (id:number) => setCmpProds(ps=>ps.filter(p=>p.id!==id));

  const addProduct    = (p:Product) => { setCmpProds(ps=>[...ps,p]); setPickerOpen(false); };

  const totalFilters = catFilter.length + brandFilter.length;

  const availableProds = PRODUCTS.filter(p=>{

    if (cmpProds.find(c=>c.id===p.id)) return false;

    if (catFilter.length>0 && !catFilter.includes(CATEGORIES.find(c=>c.id===p.cat)?.label??"")) return false;

    return true;

  });

  const cols = Math.max(cmpProds.length, 1);

  const gridCols = `210px repeat(${cols + (cmpProds.length<3?1:0)},1fr)`;

  return (

    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>

      <Sidebar activeNav="compare" onNav={onNav} onSearch={onSearch}/>

      <div style={{ marginLeft:64,flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>

        {/* ── Top bar ── */}

        <div style={{ padding:"28px 32px 0",display:"flex",alignItems:"center",gap:14,flexShrink:0 }}>

          <BarChart2 size={20} color={mg}/>

          <h2 className="ghr" style={{ fontSize:24,fontWeight:700,color:tx,letterSpacing:"0.05em" }}>COMPARADOR TÉCNICO</h2>

          <span className="ghi" style={{ fontSize:12,color:txS }}>(máx. 3 productos)</span>

          <div style={{ flex:1 }}/>

          <button onClick={()=>setFiltersOpen(o=>!o)} style={{

            display:"flex",alignItems:"center",gap:8,padding:"8px 18px",borderRadius:10,

            background:filtersOpen?"rgba(255,46,158,0.12)":bgC,

            border:`1px solid ${filtersOpen?mg+"66":"rgba(139,47,214,0.3)"}`,

            cursor:"pointer",color:filtersOpen?mg:txS,

            fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,transition:"all 0.2s",

          }}>

            <SlidersHorizontal size={14}/>

            Filtros

            {totalFilters>0&&<span style={{ background:mg,color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,flexShrink:0 }}>{totalFilters}</span>}

          </button>

        </div>

        {/* ── Collapsible filter panel ── */}

        {filtersOpen&&(

          <div style={{ margin:"14px 32px 0",background:bgC,borderRadius:14,border:`1px solid rgba(139,47,214,0.22)`,padding:"18px 22px",display:"flex",gap:32,flexWrap:"wrap",alignItems:"flex-end",flexShrink:0 }}>

            {[{ title:"CATEGORÍA", opts:CATEGORIES.map(c=>c.label), state:catFilter, set:setCatFilter },

              { title:"MARCA",     opts:BRANDS,                     state:brandFilter, set:setBrandFilter }].map(({ title, opts, state, set })=>(

              <div key={title}>

                <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:10,fontWeight:700 }}>{title}</p>

                <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>

                  {opts.map(o=>{

                    const sel=state.includes(o);

                    return (

                      <button key={o} onClick={()=>set(s=>sel?s.filter(x=>x!==o):[...s,o])} style={{

                        padding:"5px 14px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",

                        background:sel?"rgba(255,46,158,0.15)":bgE,

                        border:`1px solid ${sel?mg+"66":"rgba(139,47,214,0.25)"}`,

                        color:sel?mg:txS,transition:"all 0.2s",fontFamily:"'Inter',sans-serif",

                      }}>{o}</button>

                    );

                  })}

                </div>

              </div>

            ))}

            {totalFilters>0&&(

              <button onClick={()=>{setCatFilter([]);setBrandFilter([]);}} style={{

                padding:"5px 14px",borderRadius:20,fontSize:12,cursor:"pointer",

                background:"none",border:`1px solid rgba(255,69,0,0.4)`,color:"#FF4500",fontFamily:"'Inter',sans-serif",

              }}>Limpiar ×</button>

            )}

          </div>

        )}

        {/* ── Main scrollable area ── */}

        <div style={{ flex:1,padding:"20px 32px 40px",overflowY:"auto" }} className="thin-scroll">

          {/* Product header row */}

          <div style={{ display:"grid",gridTemplateColumns:gridCols,gap:0 }}>

            <div style={{ padding:"20px 18px",background:bgC,borderRadius:"12px 0 0 0",border:`1px solid rgba(139,47,214,0.2)`,borderRight:"none",borderBottom:"none",display:"flex",alignItems:"center" }}>

              <span className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em" }}>COMPARANDO</span>

            </div>

            {cmpProds.map((p,pi)=>(

              <div key={p.id} style={{

                padding:"20px 18px",background:bgC,

                borderRadius:pi===cmpProds.length-1&&cmpProds.length===3?"0 12px 0 0":"none",

                border:`1px solid rgba(139,47,214,0.2)`,borderLeft:"none",borderBottom:"none",

                display:"flex",flexDirection:"column",gap:10,

              }}>

                <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8 }}>

                  <div style={{ width:96,height:96,borderRadius:12,overflow:"hidden",background:bgE,flexShrink:0,border:`1px solid rgba(139,47,214,0.25)` }}>

                    <img src={imgUrl(p.imgId,192,192)} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                  </div>

                  <button onClick={()=>removeProduct(p.id)} title="Quitar" style={{

                    background:"rgba(255,69,0,0.1)",border:`1px solid rgba(255,69,0,0.35)`,borderRadius:8,

                    cursor:"pointer",color:"#FF4500",width:28,height:28,

                    display:"flex",alignItems:"center",justifyContent:"center",

                    transition:"all 0.2s",flexShrink:0,

                  }}><X size={13}/></button>

                </div>

                <div style={{ display:"flex",gap:4,flexWrap:"wrap" }}>{p.badges.slice(0,2).map(b=><Badge key={b} label={b}/>)}</div>

                <p className="ghr" style={{ fontSize:15,fontWeight:700,color:tx,lineHeight:1.25 }}>{p.name}</p>

                <PriceTag price={p.price} orig={p.orig}/>

                <NeonBtn variant="ghost" small onClick={() => {

                  if ((window as any).addToCart) (window as any).addToCart(p);

                }} style={{ marginTop: 4, fontSize: 11 }}><ShoppingCart size={12}/> + Carrito</NeonBtn>

              </div>

            ))}

            {/* Empty add-product slot */}

            {cmpProds.length<3&&(

              <div style={{

                padding:"20px 18px",background:bgC,borderRadius:"0 12px 0 0",

                border:`1px solid rgba(139,47,214,0.2)`,borderLeft:"none",borderBottom:"none",

                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,minHeight:190,

              }}>

                <div style={{ width:52,height:52,borderRadius:"50%",background:"rgba(139,47,214,0.1)",border:`2px dashed rgba(139,47,214,0.35)`,display:"flex",alignItems:"center",justifyContent:"center" }}>

                  <Plus size={20} color={vi} strokeWidth={1.5}/>

                </div>

                <p className="ghi" style={{ fontSize:12,color:txS,textAlign:"center" }}>Agregar producto</p>

                <NeonBtn variant="ghost" onClick={()=>setPickerOpen(o=>!o)}><Plus size={12}/>Añadir</NeonBtn>

              </div>

            )}

          </div>

          {/* Product picker */}

          {pickerOpen&&cmpProds.length<3&&(

            <div style={{ border:`1px solid rgba(139,47,214,0.3)`,borderTop:"none",borderRadius:"0 0 12px 12px",background:bgE,padding:"14px 18px",display:"flex",gap:10,flexWrap:"wrap" }}>

              {availableProds.length===0

                ? <p className="ghi" style={{ fontSize:13,color:txS }}>No hay más productos disponibles con estos filtros.</p>

                : availableProds.map(p=>(

                  <button key={p.id} onClick={()=>addProduct(p)} style={{

                    display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderRadius:10,

                    background:bgC,border:`1px solid rgba(139,47,214,0.25)`,cursor:"pointer",

                    color:tx,fontFamily:"'Inter',sans-serif",transition:"all 0.2s",

                  }}>

                    <div style={{ width:34,height:34,borderRadius:6,overflow:"hidden",flexShrink:0 }}>

                      <img src={imgUrl(p.imgId,68,68)} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                    </div>

                    <div style={{ textAlign:"left" }}>

                      <p style={{ fontSize:12,fontWeight:600,margin:0 }}>{p.name}</p>

                      <p style={{ fontSize:11,color:mg,fontWeight:700,margin:0 }}>${p.price}</p>

                    </div>

                  </button>

                ))}

            </div>

          )}

          {/* Empty state */}

          {cmpProds.length===0&&(

            <div style={{ textAlign:"center",padding:"80px 20px",color:txS }}>

              <BarChart2 size={52} color="rgba(139,47,214,0.25)" style={{ margin:"0 auto 20px" }}/>

              <p className="ghr" style={{ fontSize:20,color:tx,marginBottom:10 }}>Comparador vacío</p>

              <p className="ghi" style={{ fontSize:13,marginBottom:24 }}>Añade productos para comparar sus especificaciones</p>

              <NeonBtn variant="primary" onClick={()=>onNav("catalog")}><ShoppingCart size={14}/>Ir al catálogo</NeonBtn>

            </div>

          )}

          {/* Spec rows */}

          {cmpProds.length>0&&(

            <div style={{ borderRadius:"0 0 12px 12px",overflow:"hidden",border:`1px solid rgba(139,47,214,0.2)` }}>

              {SPEC_LABELS.map((label,si)=>{

                const rowBg = si%2===0?bgC:bgE;

                const isLast = si===SPEC_LABELS.length-1;

                const vals = cmpProds.map(p=>PRODUCT_SPECS[p.id]?.[si]??"—");

                const numericVals = vals.map(v=>parseFloat(v.replace(/[^0-9.]/g,"")));

                const validNums  = numericVals.filter(n=>!isNaN(n));

                const bestNum    = validNums.length>1 ? (label==="Precio"||label==="Peso"?Math.min(...validNums):Math.max(...validNums)) : null;

                return (

                  <div key={label} style={{ display:"grid",gridTemplateColumns:gridCols,borderBottom:isLast?"none":`1px solid rgba(139,47,214,0.12)` }}>

                    <div style={{ padding:"16px 18px",background:rowBg,display:"flex",alignItems:"center",borderRight:`1px solid rgba(139,47,214,0.12)` }}>

                      <span className="ghi" style={{ fontSize:13,color:txS,fontWeight:500 }}>{label}</span>

                    </div>

                    {vals.map((v,vi)=>{

                      const isBest = bestNum!==null && numericVals[vi]===bestNum && !isNaN(numericVals[vi]);

                      return (

                        <div key={vi} style={{

                          padding:"16px 18px",

                          background:isBest?"rgba(255,46,158,0.08)":rowBg,

                          borderRight:vi<vals.length-1?`1px solid rgba(139,47,214,0.12)`:"none",

                          borderLeft:isBest?"2px solid rgba(255,46,158,0.5)":"none",

                          display:"flex",alignItems:"center",gap:8,

                        }}>

                          <span className="ghi" style={{ fontSize:13,color:isBest?mg:tx,fontWeight:isBest?700:400 }}>{v}</span>

                          {isBest&&<span style={{ fontSize:9,background:"rgba(255,46,158,0.2)",color:mg,padding:"2px 6px",borderRadius:3,fontWeight:700,fontFamily:"'Inter',sans-serif",letterSpacing:"0.06em",flexShrink:0 }}>★ MEJOR</span>}

                        </div>

                      );

                    })}

                    {cmpProds.length<3&&<div style={{ padding:"16px 18px",background:rowBg,borderLeft:`1px solid rgba(139,47,214,0.12)` }}/>}

                  </div>

                );

              })}

            </div>

          )}

          {/* CTA row */}

          {cmpProds.length>0&&(

            <div style={{ display:"grid",gridTemplateColumns:gridCols,gap:0,borderTop:"none" }}>

              <div style={{ padding:"16px 18px",background:bgE,borderRadius:"0 0 0 12px",border:`1px solid rgba(139,47,214,0.2)`,borderTop:"none",borderRight:"none" }}/>

              {cmpProds.map((p,pi)=>(

                <div key={p.id} style={{

                  padding:"16px 18px",background:bgE,display:"flex",flexDirection:"column",gap:8,

                  borderRadius:pi===cmpProds.length-1&&cmpProds.length===3?"0 0 12px 0":"none",

                  border:`1px solid rgba(139,47,214,0.2)`,borderTop:"none",borderLeft:"none",

                }}>

                  <NeonBtn variant="primary" full onClick={()=>onNav("cart")}><ShoppingCart size={13}/>Agregar al carrito</NeonBtn>

                  <NeonBtn variant="ghost" full onClick={()=>onNav("detail")}>Ver producto</NeonBtn>

                </div>

              ))}

              {cmpProds.length<3&&(

                <div style={{ padding:"16px 18px",background:bgE,borderRadius:"0 0 12px 0",border:`1px solid rgba(139,47,214,0.2)`,borderTop:"none",borderLeft:"none" }}/>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export function CatalogMobile({ onNav, onSearch, onDetail }:{ onNav:(s:string)=>void; onSearch:()=>void; onDetail:(p:Product)=>void }) {

  const [activeCat, setActiveCat] = useState("all");

  const [filterOpen, setFilterOpen] = useState(false);

  const [sort, setSort] = useState("popular");

  const [selected, setSelected] = useState<Record<string, string[]>>(()=>Object.fromEntries(FILTERS.map(f=>[f.id,[]])));

  const [logics, setLogics] = useState<Record<string, Logic>>(()=>Object.fromEntries(FILTERS.map(f=>[f.id,"OR"])));

  let hits = activeCat==="all"?PRODUCTS:PRODUCTS.filter(p=>p.cat===activeCat);

  hits = filterProducts(hits, selected, logics);

  // Apply sorting

  if (sort === "price_asc") {

    hits = [...hits].sort((a,b)=>a.price-b.price);

  } else if (sort === "price_desc") {

    hits = [...hits].sort((a,b)=>b.price-a.price);

  } else if (sort === "rating") {

    hits = [...hits].sort((a,b)=>b.rating-a.rating);

  }

  return (

    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column",position:"relative" }}>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)` }}>

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>

          <div style={{ display:"flex",gap:8,overflowX:"auto" }} className="no-scroll">

            {["all",...CATEGORIES.map(c=>c.id)].map(id=>(

              <button key={id} onClick={()=>setActiveCat(id)} style={{ padding:"5px 14px",borderRadius:50,fontSize:11,fontWeight:600,flexShrink:0,cursor:"pointer",background:activeCat===id?`linear-gradient(135deg,${mg},${vi})`:bgE,border:`1px solid ${activeCat===id?"transparent":"rgba(139,47,214,0.3)"}`,color:activeCat===id?"#fff":txS,boxShadow:activeCat===id?GM:"none" }}>{id==="all"?"Todos":CATEGORIES.find(c=>c.id===id)?.label}</button>

            ))}

          </div>

          <select value={sort} onChange={e=>setSort(e.target.value)} style={{ background:bgE,color:tx,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:8,padding:"5px 8px",fontSize:11,cursor:"pointer",outline:"none" }}>

            <option value="popular">Populares</option>

            <option value="price_asc">Precio ↑</option>

            <option value="price_desc">Precio ↓</option>

            <option value="rating">Rating</option>

          </select>

        </div>

      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"14px 14px" }} className="thin-scroll">

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>

          {hits.map(p=><ProductCard key={p.id} p={p} onClick={()=>onDetail(p)}/>)}

        </div>

      </div>

      <button onClick={()=>setFilterOpen(true)} className="neon-btn-vi" style={{ position:"absolute",bottom:20,right:16,padding:"12px 20px",borderRadius:50,background:`linear-gradient(135deg,${vi},${mg})`,border:"none",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:8,boxShadow:GV,zIndex:30 }}>

        <SlidersHorizontal size={15}/>Filtros

      </button>

      {filterOpen&&(

        <div className="fade-in" style={{ position:"absolute",inset:0,zIndex:50 }}>

          <div onClick={()=>setFilterOpen(false)} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.75)" }}/>

          <div style={{ position:"absolute",bottom:0,left:0,right:0,maxHeight:"78%",background:bgC,borderRadius:"20px 20px 0 0",overflow:"hidden",boxShadow:`0 -4px 40px rgba(139,47,214,0.25)`,display:"flex",flexDirection:"column" }}>

            <div style={{ height:4,width:40,background:"rgba(255,255,255,0.2)",borderRadius:2,margin:"12px auto 0",flexShrink:0 }}/>

            <div style={{ flex:1,overflowY:"auto" }} className="thin-scroll">

              <FilterPanel selected={selected} setSelected={setSelected} logics={logics} setLogics={setLogics} onClose={()=>setFilterOpen(false)} isMobile/>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export function CompareMobile({ onNav }:{ onNav:(s:string)=>void }) {

  const [cmpProds, setCmpProds] = useState<Product[]>([]);

  const [pickerOpen, setPickerOpen] = useState(false);

  const removeProduct = (id:number) => setCmpProds(arr=>arr.filter(p=>p.id!==id));

  const addProduct = (p:Product) => { setCmpProds(arr=>[...arr,p]); setPickerOpen(false); };

  const availableProds = PRODUCTS.filter(p=>!cmpProds.some(x=>x.id===p.id));

  return (

    <div style={{ background:bg, height:"100%", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Fixed product header */}

      <div style={{ position:"relative", zIndex:20, background:bgC, borderBottom:`1px solid rgba(139,47,214,0.2)`, flexShrink:0 }}>

        <div style={{ display:"flex", alignItems:"center", gap:16, padding:"16px" }}>

          <button onClick={()=>onNav("catalog")} style={{ background:"none", border:"none", cursor:"pointer", color:txS, padding:8 }}><ChevronLeft size={28}/></button>

          <div style={{ display:"flex", alignItems:"center", gap:10, flex:1 }}>

            <BarChart2 size={20} color={mg}/>

            <span className="ghr" style={{ fontSize:18, fontWeight:700, color:tx }}>COMPARADOR</span>

          </div>

          {cmpProds.length<3&&(

            <button onClick={()=>setPickerOpen(o=>!o)} style={{ padding:"10px 16px", borderRadius:8, background:`rgba(139,47,214,0.15)`, border:`1px solid ${vi}44`, color:vi, cursor:"pointer", fontSize:13, fontWeight:700 }}>

              + Añadir

            </button>

          )}

        </div>

        {/* Picker modal for mobile */}

        {pickerOpen&&availableProds.length>0&&(

          <div style={{ background:bgE, borderBottom:`1px solid rgba(139,47,214,0.25)`, padding:12, display:"flex", gap:10, overflowX:"auto" }} className="no-scroll">

            {availableProds.map(p=>(

              <button key={p.id} onClick={()=>addProduct(p)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:10, background:bgC, border:`1px solid rgba(139,47,214,0.2)`, color:tx, cursor:"pointer", flexShrink:0 }}>

                <span className="ghi" style={{ fontSize:13 }}>{p.name.split(" ")[0]}</span>

              </button>

            ))}

          </div>

        )}

        {/* 3 product thumbnails */}

        <div style={{ display:"grid", gridTemplateColumns:"80px repeat(3,1fr)", gap:12, borderTop:`1px solid rgba(139,47,214,0.15)` }}>

          <div style={{ padding:"12px 10px", display:"flex", alignItems:"center" }}>

            <span className="ghi" style={{ fontSize:11, color:txS, letterSpacing:"0.05em" }}>PRODUCTO</span>

          </div>

          {cmpProds.map(p=>(

            <div key={p.id} style={{ padding:"12px 8px", borderLeft:`1px solid rgba(139,47,214,0.15)`, display:"flex", flexDirection:"column", alignItems:"center", gap:8, position:"relative" }}>

              <button onClick={()=>removeProduct(p.id)} style={{ position:"absolute", top:4, right:4, width:24, height:24, borderRadius:"50%", background:"rgba(255,69,0,0.9)", border:"none", color:"#fff", fontSize:14, fontWeight:"bold", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:5 }}>×</button>

              <div style={{ width:80, height:80, borderRadius:12, overflow:"hidden", background:bgE, border:`1px solid rgba(139,47,214,0.2)` }}>

                <img src={imgUrl(p.imgId,150,150)} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>

              </div>

              <p className="ghr" style={{ fontSize:15, fontWeight:700, color:tx, textAlign:"center", lineHeight:1.2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", width:"100%", margin:0 }}>{p.name}</p>

              <span className="ghr" style={{ fontSize:15, fontWeight:700, color:mg, margin:0 }}>${p.price}</span>

            </div>

          ))}

          {/* Empty placeholders */}

          {Array.from({ length: 3 - cmpProds.length }).map((_, i) => (

            <div key={i} onClick={()=>setPickerOpen(true)} style={{ padding:"10px 6px", borderLeft:`1px solid rgba(139,47,214,0.15)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, background:"rgba(139,47,214,0.05)", cursor:"pointer" }}>

              <Plus size={18} color={txS}/>

              <span className="ghi" style={{ fontSize:10, color:txS, fontWeight:600 }}>Añadir</span>

            </div>

          ))}

        </div>

      </div>

      {/* Scrollable spec table with sticky first column */}

      <div style={{ flex:1, overflowY:"auto", overflowX:"auto" }} className="thin-scroll">

        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:380 }}>

          <tbody>

            {SPEC_LABELS.map((label, si)=>{

              const rowBg = si%2===0?bgC:bgE;

              return (

                <tr key={label}>

                  <td style={{ position:"sticky",left:0,background:rowBg,zIndex:2,padding:"11px 10px",fontSize:11,color:txS,minWidth:80,fontFamily:"'Inter',sans-serif",borderRight:`1px solid rgba(139,47,214,0.2)`,borderBottom:`1px solid rgba(139,47,214,0.1)`,whiteSpace:"nowrap" }}>

                    {label}

                  </td>

                  {cmpProds.map((p,vi)=>{

                    const v = PRODUCT_SPECS[p.id]?.[si] ?? "—";

                    return (

                      <td key={vi} style={{ padding:"11px 10px",minWidth:110,textAlign:"center",background:rowBg,color:tx,fontSize:11,fontFamily:"'Inter',sans-serif",borderBottom:`1px solid rgba(139,47,214,0.1)`,borderLeft:`1px solid rgba(139,47,214,0.1)` }}>

                        {v}

                      </td>

                    );

                  })}

                  {Array.from({ length: 3 - cmpProds.length }).map((_, i) => (

                    <td key={i} style={{ background:rowBg, borderBottom:`1px solid rgba(139,47,214,0.1)`, borderLeft:`1px solid rgba(139,47,214,0.1)` }} />

                  ))}

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* Sticky buy buttons aligned with product columns */}

      <div style={{ position:"sticky",bottom:0,left:0,right:0,background:bgC,borderTop:`1px solid rgba(139,47,214,0.2)`,padding:"10px 8px",display:"grid",gridTemplateColumns:"80px repeat(3,1fr)",gap:4,zIndex:15,boxSizing:"border-box" }}>

        <div /> {/* Aligns with the sticky label column */}

        {cmpProds.map(p=>(

          <button key={p.id} onClick={()=>onNav("cart")} className="neon-btn" style={{ padding:"8px 2px",borderRadius:8,background:`linear-gradient(135deg,${mg},#B5007D)`,border:"none",color:"#fff",fontSize:9,fontWeight:700,cursor:"pointer",boxShadow:GM,fontFamily:"'Rajdhani',sans-serif",lineHeight:1.1 }}>

            COMPRAR<br/><span style={{ fontSize:10 }}>${p.price}</span>

          </button>

        ))}

        {Array.from({ length: 3 - cmpProds.length }).map((_, i) => (

          <div key={i} />

        ))}

      </div>

    </div>

  );

}

/* ── CARRITO DESKTOP ── */

export function CartDesktop({ onNav, onSearch, cartItems, setCartItems }:{

  onNav:(s:string)=>void; onSearch:()=>void;

  cartItems:CartItemType[]; setCartItems:React.Dispatch<React.SetStateAction<CartItemType[]>>;

}) {

  const [promo, setPromo] = useState("");

  const [promoApplied, setPromoApplied] = useState(false);

  const { sub, ship, tax, total } = calcTotals(cartItems);

  const discount = promoApplied ? sub * 0.1 : 0;

  const updateQty = (id:number,qty:number) => setCartItems(items=>items.map(i=>i.id===id?{...i,qty}:i));

  const removeItem = (id:number) => setCartItems(items=>items.filter(i=>i.id!==id));

  return (

    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>

      <Sidebar activeNav="cart" onNav={onNav} onSearch={onSearch}/>

      {/* Centered main content */}

      <div style={{ marginLeft:64,flex:1,display:"flex",justifyContent:"center",padding:"40px 32px 60px",overflowY:"auto",maxHeight:"calc(100vh - 56px)" }} className="thin-scroll">

        <div style={{ width:"100%",maxWidth:1100,display:"grid",gridTemplateColumns:"1fr 420px",gap:32,alignItems:"start" }}>

          {/* ── Left: Cart Items ── */}

          <div>

            {/* Header */}

            <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:32 }}>

              <div style={{ width:48,height:48,borderRadius:14,background:`rgba(255,46,158,0.12)`,border:`1px solid rgba(255,46,158,0.35)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:GM }}>

                <ShoppingCart size={22} color={mg}/>

              </div>

              <div>

                <h2 className="ghr" style={{ fontSize:30,fontWeight:700,color:tx,letterSpacing:"0.05em",margin:0 }}>TU CARRITO</h2>

                <p className="ghi" style={{ fontSize:13,color:txS,margin:0 }}>{cartItems.length} {cartItems.length===1?"producto":"productos"} seleccionados</p>

              </div>

            </div>

            {cartItems.length===0?(

              <div style={{ textAlign:"center",padding:"80px 0",background:bgC,borderRadius:20,border:`1px solid rgba(139,47,214,0.2)` }}>

                <ShoppingCart size={56} color={txS} style={{ opacity:0.25,marginBottom:18 }}/>

                <p className="ghr" style={{ fontSize:26,color:txS,letterSpacing:"0.04em" }}>Tu carrito está vacío</p>

                <p className="ghi" style={{ fontSize:14,color:txS,marginBottom:28 }}>Explora nuestro catálogo para encontrar tu próximo setup</p>

                <NeonBtn variant="primary" onClick={()=>onNav("catalog")}>Explorar catálogo <ArrowRight size={14}/></NeonBtn>

              </div>

            ):(

              <div style={{ background:bgC,borderRadius:20,border:`1px solid rgba(139,47,214,0.18)`,padding:"0 28px" }}>

                {cartItems.map(item=>(

                  <CartItem key={item.id} item={item}

                    onChange={qty=>updateQty(item.id,qty)}

                    onRemove={()=>removeItem(item.id)}

                  />

                ))}

                <div style={{ padding:"20px 0",display:"flex",alignItems:"center",justifyContent:"space-between" }}>

                  <button style={{ display:"flex",alignItems:"center",gap:7,background:"none",border:"none",cursor:"pointer",color:txS,fontSize:14,fontFamily:"'Inter',sans-serif",transition:"color 0.15s" }}

                    onClick={()=>onNav("catalog")}

                    onMouseEnter={e=>(e.currentTarget.style.color=mg)} onMouseLeave={e=>(e.currentTarget.style.color=txS)}>

                    <ChevronLeft size={16}/> Seguir comprando

                  </button>

                  <span className="ghi" style={{ fontSize:12,color:txS }}>{cartItems.length} artículos</span>

                </div>

              </div>

            )}

            {/* Cross-sell strip */}

            {cartItems.length>0&&(

              <div style={{ marginTop:20,padding:"16px 20px",background:bgC,borderRadius:14,border:`1px solid rgba(139,47,214,0.18)`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>

                <div>

                  <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,margin:0 }}>¿Buscas más equipamiento?</p>

                  <p className="ghi" style={{ fontSize:12,color:txS,margin:0 }}>Descubre los accesorios más vendidos</p>

                </div>

                <NeonBtn variant="outline" small onClick={()=>onNav("catalog")}>Ver catálogo <ArrowRight size={12}/></NeonBtn>

              </div>

            )}

          </div>

          {/* ── Right: Summary Panel ── */}

          <div style={{ background:bgC,borderRadius:20,border:`1px solid rgba(139,47,214,0.22)`,padding:"28px 26px",display:"flex",flexDirection:"column",gap:22,position:"sticky",top:20 }}>

            <h3 className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,letterSpacing:"0.06em",display:"flex",alignItems:"center",gap:8,margin:0 }}>

              <Zap size={17} color={mg} fill={mg}/>RESUMEN DEL PEDIDO

            </h3>

            {/* Mini thumbnails */}

            <div style={{ borderBottom:`1px solid rgba(139,47,214,0.15)`,paddingBottom:18 }}>

              {cartItems.map(item=>(

                <div key={item.id} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>

                  <div style={{ width:50,height:50,borderRadius:9,overflow:"hidden",background:bgE,flexShrink:0,border:`1px solid rgba(139,47,214,0.2)` }}>

                    <img src={imgUrl(item.imgId,100,100)} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                  </div>

                  <div style={{ flex:1,minWidth:0 }}>

                    <p className="ghi" style={{ fontSize:13,color:tx,fontWeight:600,lineHeight:1.2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</p>

                    <p className="ghi" style={{ fontSize:11,color:txS }}>x{item.qty} · {item.variant}</p>

                  </div>

                  <span className="ghi" style={{ fontSize:13,fontWeight:700,color:mg,flexShrink:0 }}>${(item.price*item.qty).toFixed(2)}</span>

                </div>

              ))}

            </div>

            {/* Promo code */}

            <div>

              <p className="ghi" style={{ fontSize:11,color:txS,marginBottom:9,letterSpacing:"0.07em",fontWeight:700 }}>CÓDIGO PROMOCIONAL</p>

              <div style={{ display:"flex",gap:8 }}>

                <input value={promo} onChange={e=>setPromo(e.target.value.toUpperCase())} placeholder="Ej: GG2025"

                  disabled={promoApplied}

                  style={{ flex:1,background:bgE,border:`1px solid ${promoApplied?"rgba(0,230,118,0.5)":"rgba(139,47,214,0.3)"}`,borderRadius:10,padding:"10px 14px",color:promoApplied?ok:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",transition:"all 0.2s" }}/>

                <button onClick={()=>{if(promo.trim().length>0)setPromoApplied(true);}} disabled={promoApplied}

                  style={{ padding:"10px 16px",borderRadius:10,background:promoApplied?`rgba(0,230,118,0.1)`:bgE,border:`1px solid ${promoApplied?ok+"44":"rgba(139,47,214,0.3)"}`,color:promoApplied?ok:txS,cursor:promoApplied?"default":"pointer",fontSize:13,fontWeight:700,fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em" }}>

                  {promoApplied?"✓":"Aplicar"}

                </button>

              </div>

              {promoApplied&&<p className="ghi" style={{ fontSize:12,color:ok,marginTop:7,fontWeight:600 }}>✓ Descuento 10% aplicado (GG2025)</p>}

            </div>

            {/* Breakdown */}

            <div style={{ background:bgE,borderRadius:14,padding:"18px 16px",border:`1px solid rgba(139,47,214,0.2)` }}>

              {[

                { l:"Subtotal",  v:`$${sub.toFixed(2)}`,          accent:false },

                ...(promoApplied?[{ l:"Descuento −10%", v:`−$${discount.toFixed(2)}`, accent:true }]:[]),

                { l:"IVA (16%)", v:`$${((sub-discount)*0.16).toFixed(2)}`, accent:false },

                { l:"Envío",     v:ship===0?"Gratis ✓":`$${ship.toFixed(2)}`,        accent:ship===0 },

              ].map(({ l,v,accent })=>(

                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(139,47,214,0.07)` }}>

                  <span className="ghi" style={{ fontSize:13,color:txS }}>{l}</span>

                  <span className="ghi" style={{ fontSize:13,color:accent?ok:txS,fontWeight:600 }}>{v}</span>

                </div>

              ))}

              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:14 }}>

                <span className="ghr" style={{ fontSize:17,fontWeight:700,color:tx }}>TOTAL</span>

                <span className="ghr" style={{ fontSize:28,fontWeight:700,color:mg }}>${(total-discount).toFixed(2)}</span>

              </div>

              {sub>300&&<p className="ghi" style={{ fontSize:11,color:ok,marginTop:5,textAlign:"right",fontWeight:700 }}>✓ Envío gratuito desbloqueado</p>}

            </div>

            <NeonBtn variant="primary" full onClick={() => {

              if (cartItems.length === 0) {

                toast.error("Tu carrito está vacío. Añade productos para continuar.");

                return;

              }

              onNav("checkout-1");

            }} style={{ padding:"16px",fontSize:16,letterSpacing:"0.05em",justifyContent:"center" }}>

              PROCEDER AL PAGO <ArrowRight size={17}/>

            </NeonBtn>

            {/* Trust badges */}

            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>

              {[{I:Shield,t:"Pago 100% seguro — SSL"},{I:Truck,t:"Devoluciones gratis 30 días"},{I:Award,t:"Garantía oficial de marca"}].map(({ I,t })=>(

                <div key={t} style={{ display:"flex",alignItems:"center",gap:10 }}>

                  <I size={14} color={cy}/><span className="ghi" style={{ fontSize:12,color:txS }}>{t}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

/* ── CARRITO MOBILE ── */

export function CartMobile({ onNav, cartItems, setCartItems }:{

  onNav:(s:string)=>void;

  cartItems:CartItemType[]; setCartItems:React.Dispatch<React.SetStateAction<CartItemType[]>>;

}) {

  const [sheetOpen, setSheetOpen] = useState(false);

  const { sub, ship, tax, total } = calcTotals(cartItems);

  const updateQty = (id:number,qty:number) => setCartItems(items=>items.map(i=>i.id===id?{...i,qty}:i));

  const removeItem = (id:number) => setCartItems(items=>items.filter(i=>i.id!==id));

  return (

    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,display:"flex",alignItems:"center",gap:10,zIndex:20 }}>

        <button onClick={()=>onNav("catalog")} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><ChevronLeft size={22}/></button>

        <span className="ghr" style={{ fontSize:18,fontWeight:700,color:tx }}>MI CARRITO</span>

        <span className="ghi" style={{ fontSize:12,color:txS,marginLeft:"auto" }}>{cartItems.length} artículos</span>

      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"10px 12px" }} className="thin-scroll">

        {cartItems.length===0?(

          <div style={{ textAlign:"center",padding:"60px 0" }}>

            <ShoppingCart size={40} color={txS} style={{ opacity:0.3,marginBottom:12 }}/>

            <p className="ghi" style={{ fontSize:14,color:txS }}>Tu carrito está vacío</p>

          </div>

        ):cartItems.map(item=>(

          <CartItem key={item.id} item={item} onChange={qty=>updateQty(item.id,qty)} onRemove={()=>removeItem(item.id)}/>

        ))}

      </div>

      {/* Bottom sheet */}

      <div style={{ flexShrink:0,zIndex:20,background:bgC,borderTop:`1px solid rgba(139,47,214,0.25)`,borderRadius:sheetOpen?"16px 16px 0 0":"12px 12px 0 0",boxShadow:`0 -4px 30px rgba(139,47,214,0.2)` }}>

        {/* Handle */}

        <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 0" }}>

          <button onClick={()=>setSheetOpen(s=>!s)} style={{ width:40,height:4,borderRadius:2,background:"rgba(255,255,255,0.25)",border:"none",cursor:"pointer" }}/>

        </div>

        <div style={{ padding:"12px 16px 16px" }}>

          {sheetOpen&&(

            <div className="slide-up" style={{ paddingBottom:12,borderBottom:`1px solid rgba(139,47,214,0.15)`,marginBottom:12 }}>

              {[{ l:"Subtotal",v:`$${sub.toFixed(2)}` },{ l:"IVA (16%)",v:`$${tax.toFixed(2)}` },{ l:"Envío",v:ship===0?"Gratis ✓":`$${ship.toFixed(2)}` }].map(({ l, v })=>(

                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"4px 0" }}>

                  <span className="ghi" style={{ fontSize:12,color:txS }}>{l}</span>

                  <span className="ghi" style={{ fontSize:12,color:txS,fontWeight:500 }}>{v}</span>

                </div>

              ))}

            </div>

          )}

          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>

            <span className="ghi" style={{ fontSize:12,color:txS }}>Total a pagar</span>

            <span className="ghr" style={{ fontSize:18,fontWeight:700,color:mg }}>${total.toFixed(2)}</span>

          </div>

          <NeonBtn variant="primary" full onClick={() => {

            if (cartItems.length === 0) {

              toast.error("Tu carrito está vacío. Añade productos para continuar.");

              return;

            }

            onNav("checkout-1");

          }} style={{ padding:"14px",fontSize:15,justifyContent:"center" }}>

            Pagar <ArrowRight size={15}/>

          </NeonBtn>

        </div>

      </div>

    </div>

  );

}

/* ── CHECKOUT STEP 1 — SHIPPING (DESKTOP) ── */

export function CheckoutShipDesktop({ onNav }:{ onNav:(s:string)=>void }) {

  const [f, setF] = useState({ nombre:"",apellido:"",email:"",telefono:"",direccion:"",numero:"",ciudad:"",cp:"",pais:"México",metodo:"standard" });

  const u = (k:string,v:string)=>setF(p=>({...p,[k]:v}));

  const valid = f.nombre&&f.apellido&&f.email&&f.direccion&&f.ciudad&&f.cp;

  return (

    <div style={{ background:bg,minHeight:"calc(100vh - 56px)",padding:"40px 60px" }}>

      <div style={{ maxWidth:960,margin:"0 auto" }}>

        <CheckoutProgress step={1}/>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 380px",gap:40 }}>

          {/* Form */}

          <div>

            <h2 className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:24,display:"flex",alignItems:"center",gap:8 }}><MapPin size={18} color={mg}/>DATOS DE ENVÍO</h2>

            <div style={{ display:"flex",flexWrap:"wrap",gap:12,marginBottom:12 }}>

              <FloatInput label="Nombre" value={f.nombre} onChange={v=>u("nombre",v)} required half/>

              <FloatInput label="Apellido" value={f.apellido} onChange={v=>u("apellido",v)} required half/>

              <FloatInput label="Email" value={f.email} onChange={v=>u("email",v)} type="email" required/>

              <FloatInput label="Teléfono" value={f.telefono} onChange={v=>u("telefono",v)} type="tel" inputMode="tel"/>

            </div>

            <div style={{ display:"flex",flexWrap:"wrap",gap:12,marginBottom:20 }}>

              <FloatInput label="Dirección" value={f.direccion} onChange={v=>u("direccion",v)} required/>

              <FloatInput label="Número / Piso" value={f.numero} onChange={v=>u("numero",v)} half/>

              <FloatInput label="Ciudad" value={f.ciudad} onChange={v=>u("ciudad",v)} required half/>

              <FloatInput label="Código postal" value={f.cp} onChange={v=>u("cp",v)} inputMode="numeric" required half/>

              <FloatInput label="País" value={f.pais} onChange={v=>u("pais",v)} required half/>

            </div>

            {/* Delivery method */}

            <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:12 }}>MÉTODO DE ENTREGA</p>

            {[

              { id:"standard", label:"Estándar",  detail:"5-7 días laborables",  price:"Gratis",     pColor:ok },

              { id:"express",  label:"Express",   detail:"2-3 días laborables",  price:"+$9.99",     pColor:cy },

              { id:"sameday",  label:"Same-day",  detail:"Hoy antes de las 21h", price:"+$19.99",    pColor:mg },

            ].map(m=>(

              <label key={m.id} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px",borderRadius:12,marginBottom:8,cursor:"pointer",background:f.metodo===m.id?`rgba(255,46,158,0.08)`:bgE,border:`1px solid ${f.metodo===m.id?mg+"66":"rgba(139,47,214,0.25)"}`,boxShadow:f.metodo===m.id?GM:"none",transition:"all 0.2s" }}>

                <div onClick={()=>u("metodo",m.id)} style={{ width:18,height:18,borderRadius:"50%",border:`2px solid ${f.metodo===m.id?mg:"rgba(255,255,255,0.2)"}`,background:f.metodo===m.id?mg:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer" }}>

                  {f.metodo===m.id&&<div style={{ width:7,height:7,borderRadius:"50%",background:"#fff" }}/>}

                </div>

                <Truck size={16} color={f.metodo===m.id?mg:txS}/>

                <div style={{ flex:1 }}>

                  <span className="ghi" style={{ fontSize:13,fontWeight:600,color:f.metodo===m.id?tx:txS }}>{m.label}</span>

                  <p className="ghi" style={{ fontSize:11,color:txS,margin:0 }}>{m.detail}</p>

                </div>

                <span className="ghi" style={{ fontSize:13,fontWeight:700,color:m.pColor }}>{m.price}</span>

              </label>

            ))}

            <div style={{ marginTop:24 }}>

              <NeonBtn variant="primary" full disabled={!valid} onClick={()=>onNav("checkout-2")} style={{ padding:"14px",fontSize:15 }}>

                Continuar al pago <ArrowRight size={16}/>

              </NeonBtn>

            </div>

          </div>

          {/* Map */}

          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>

            <h3 className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>RUTA DE ENTREGA</h3>

            <div style={{ flex:1,minHeight:280 }}><DeliveryMap/></div>

            <div style={{ background:bgC,borderRadius:12,padding:16,border:`1px solid rgba(139,47,214,0.2)` }}>

              {[{ l:"Origen",     v:"GameHub CDMX · MX" },{ l:"Destino",    v:f.ciudad||"—" },{ l:"ETA",        v:f.metodo==="sameday"?"Hoy <21h":f.metodo==="express"?"2-3 días":"5-7 días" }].map(({ l, v })=>(

                <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0" }}>

                  <span className="ghi" style={{ fontSize:11,color:txS }}>{l}</span>

                  <span className="ghi" style={{ fontSize:11,color:tx,fontWeight:600 }}>{v}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

/* ── CHECKOUT STEP 1 — SHIPPING (MOBILE) ── */

export function CheckoutShipMobile({ onNav }:{ onNav:(s:string)=>void }) {

  const [f, setF] = useState({ nombre:"",apellido:"",email:"",telefono:"",direccion:"",ciudad:"",cp:"",metodo:"standard" });

  const u = (k:string,v:string)=>setF(p=>({...p,[k]:v}));

  const valid = f.nombre&&f.email&&f.direccion&&f.ciudad&&f.cp;

  return (

    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,zIndex:20 }}>

        <div style={{ marginBottom:14 }}><CheckoutProgress step={1} mobile/></div>

        <div style={{ display:"flex",alignItems:"center",gap:8 }}>

          <MapPin size={15} color={mg}/>

          <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>DATOS DE ENVÍO</span>

        </div>

      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"20px 16px",display:"flex",flexDirection:"column",gap:12 }} className="thin-scroll">

        <FloatInput label="Nombre completo" value={f.nombre} onChange={v=>u("nombre",v)} required/>

        <FloatInput label="Email" value={f.email} onChange={v=>u("email",v)} type="email" required/>

        <FloatInput label="Teléfono" value={f.telefono} onChange={v=>u("telefono",v)} inputMode="tel"/>

        <FloatInput label="Dirección" value={f.direccion} onChange={v=>u("direccion",v)} required/>

        <FloatInput label="Ciudad" value={f.ciudad} onChange={v=>u("ciudad",v)} required/>

        <FloatInput label="Código postal" value={f.cp} onChange={v=>u("cp",v)} inputMode="numeric" required/>

        <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginTop:4 }}>MÉTODO</p>

        {[{ id:"standard",label:"Estándar",detail:"5-7 días",price:"Gratis",pColor:ok },{ id:"express",label:"Express",detail:"2-3 días",price:"+$9.99",pColor:cy }].map(m=>(

          <label key={m.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"12px",borderRadius:10,cursor:"pointer",background:f.metodo===m.id?`rgba(255,46,158,0.08)`:bgE,border:`1px solid ${f.metodo===m.id?mg+"66":"rgba(139,47,214,0.25)"}` }}>

            <div onClick={()=>u("metodo",m.id)} style={{ width:16,height:16,borderRadius:"50%",border:`2px solid ${f.metodo===m.id?mg:"rgba(255,255,255,0.2)"}`,background:f.metodo===m.id?mg:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>

              {f.metodo===m.id&&<div style={{ width:6,height:6,borderRadius:"50%",background:"#fff" }}/>}

            </div>

            <div style={{ flex:1 }}>

              <span className="ghi" style={{ fontSize:12,fontWeight:600,color:tx }}>{m.label}</span>

              <p className="ghi" style={{ fontSize:10,color:txS,margin:0 }}>{m.detail}</p>

            </div>

            <span className="ghi" style={{ fontSize:12,fontWeight:700,color:m.pColor }}>{m.price}</span>

          </label>

        ))}

      </div>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderTop:`1px solid rgba(139,47,214,0.2)` }}>

        <NeonBtn variant="primary" full disabled={!valid} onClick={()=>onNav("checkout-2")} style={{ padding:"14px",fontSize:15 }}>

          Continuar al pago <ArrowRight size={16}/>

        </NeonBtn>

      </div>

    </div>

  );

}

/* ── CHECKOUT STEP 2 — PAYMENT (DESKTOP) ── */

export function CheckoutPayDesktop({ onNav, cartItems }:{ onNav:(s:string)=>void; cartItems:CartItemType[] }) {

  const [method, setMethod] = useState<"card"|"paypal"|"wallet">("card");

  const [card, setCard] = useState({ num:"",name:"",exp:"",cvv:"" });

  const uc = (k:string,v:string)=>setCard(p=>({...p,[k]:v}));

  const valid = method!=="card"||(card.num.replace(/\s/g,"").length===16&&card.name&&card.exp.length===5&&card.cvv.length===3);

  const { total } = calcTotals(cartItems);

  return (

    <div style={{ background:bg,minHeight:"calc(100vh - 56px)",padding:"40px 60px" }}>

      <div style={{ maxWidth:960,margin:"0 auto" }}>

        <CheckoutProgress step={2}/>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 380px",gap:40 }}>

          <div>

            <h2 className="ghr" style={{ fontSize:26,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:28,display:"flex",alignItems:"center",gap:10 }}><CreditCard size={22} color={mg}/>MÉTODO DE PAGO</h2>

            {/* Method buttons */}

            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:28 }}>

              {[{ id:"card",label:"Tarjeta",sub:"Visa, MC, Amex",Icon:CreditCard },{ id:"paypal",label:"PayPal",sub:"paypal.com",Icon:Wallet },{ id:"wallet",label:"Billetera",sub:"Apple / Google Pay",Icon:Smartphone }].map(m=>(

                <button key={m.id} onClick={()=>setMethod(m.id as "card"|"paypal"|"wallet")}

                  style={{ padding:"18px 14px",borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,background:method===m.id?`rgba(255,46,158,0.1)`:bgE,border:`2px solid ${method===m.id?mg:"rgba(139,47,214,0.25)"}`,boxShadow:method===m.id?GM:"none",transition:"all 0.2s" }}>

                  <m.Icon size={24} color={method===m.id?mg:txS}/>

                  <span className="ghi" style={{ fontSize:13,fontWeight:700,color:method===m.id?tx:txS }}>{m.label}</span>

                  <span className="ghi" style={{ fontSize:10,color:txS }}>{m.sub}</span>

                </button>

              ))}

            </div>

            {method==="card"&&(

              <div className="fade-up" style={{ display:"flex",flexDirection:"column",gap:14 }}>

                {/* Card preview */}

                <div style={{ borderRadius:16,padding:"22px 24px",background:`linear-gradient(135deg,${vi}88,${mg}44)`,border:`1px solid rgba(255,46,158,0.3)`,boxShadow:GM,position:"relative",overflow:"hidden",marginBottom:8 }}>

                  <div style={{ position:"absolute",right:-20,top:-20,width:160,height:160,borderRadius:"50%",background:"rgba(255,46,158,0.08)" }}/>

                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:30 }}>

                    <Zap size={28} color={mg} fill={mg}/>

                    <span className="ghi" style={{ fontSize:12,color:"rgba(255,255,255,0.6)" }}>GAMEHUB CARD</span>

                  </div>

                  <p className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,letterSpacing:"0.12em",marginBottom:16 }}>

                    {card.num||"•••• •••• •••• ••••"}

                  </p>

                  <div style={{ display:"flex",justifyContent:"space-between" }}>

                    <span className="ghi" style={{ fontSize:12,color:"rgba(255,255,255,0.7)" }}>{card.name||"NOMBRE TITULAR"}</span>

                    <span className="ghi" style={{ fontSize:12,color:"rgba(255,255,255,0.7)" }}>{card.exp||"MM/AA"}</span>

                  </div>

                </div>

                <FloatInput label="Número de tarjeta" value={card.num} onChange={v=>uc("num",maskCard(v))} inputMode="numeric"/>

                <FloatInput label="Titular de la tarjeta" value={card.name} onChange={v=>uc("name",v.toUpperCase())} required/>

                <div style={{ display:"flex",gap:12 }}>

                  <FloatInput label="Vencimiento (MM/AA)" value={card.exp} onChange={v=>uc("exp",maskExpiry(v))} inputMode="numeric" half/>

                  <FloatInput label="CVV" value={card.cvv} onChange={v=>uc("cvv",v.replace(/\D/g,"").slice(0,3))} inputMode="numeric" type="password" half/>

                </div>

              </div>

            )}

            {method==="paypal"&&(

              <div className="fade-up" style={{ textAlign:"center",padding:"40px 0" }}>

                <Wallet size={48} color={cy} style={{ marginBottom:16 }}/>

                <p className="ghi" style={{ color:tx,fontSize:16,fontWeight:600 }}>Serás redirigido a PayPal</p>

                <p className="ghi" style={{ color:txS,fontSize:13 }}>Completa el pago de forma segura en tu cuenta PayPal</p>

              </div>

            )}

            {method==="wallet"&&(

              <div className="fade-up" style={{ textAlign:"center",padding:"40px 0" }}>

                <Smartphone size={48} color={mg} style={{ marginBottom:16 }}/>

                <p className="ghi" style={{ color:tx,fontSize:16,fontWeight:600 }}>Pago con billetera digital</p>

                <p className="ghi" style={{ color:txS,fontSize:13 }}>Apple Pay · Google Pay · Samsung Pay</p>

              </div>

            )}

            <div style={{ marginTop:24 }}>

              <NeonBtn variant="primary" full disabled={!valid} onClick={()=>onNav("checkout-3")} style={{ padding:"14px",fontSize:15 }}>

                Revisar pedido <ArrowRight size={16}/>

              </NeonBtn>

            </div>

          </div>

          {/* Order summary sidebar */}

          <div style={{ background:bgC,borderRadius:16,padding:24,border:`1px solid rgba(139,47,214,0.2)`,height:"fit-content",position:"sticky",top:20 }}>

            <p className="ghr" style={{ fontSize:16,fontWeight:700,color:tx,marginBottom:16,letterSpacing:"0.05em" }}>RESUMEN</p>

            {cartItems.map(item=>(

              <div key={item.id} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>

                <div style={{ width:40,height:40,borderRadius:8,overflow:"hidden",background:bgE,flexShrink:0 }}>

                  <img src={imgUrl(item.imgId,80,80)} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>

                </div>

                <div style={{ flex:1,minWidth:0 }}>

                  <p className="ghi" style={{ fontSize:11,color:tx,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</p>

                  <p className="ghi" style={{ fontSize:10,color:txS }}>x{item.qty}</p>

                </div>

                <span className="ghi" style={{ fontSize:11,fontWeight:700,color:mg }}>${(item.price*item.qty).toFixed(2)}</span>

              </div>

            ))}

            <div style={{ height:1,background:`linear-gradient(90deg,${mg}44,transparent)`,margin:"12px 0" }}/>

            <OrderSummaryPanel items={cartItems}/>

            <div style={{ marginTop:16,display:"flex",alignItems:"center",gap:6 }}>

              <Shield size={12} color={ok}/>

              <span className="ghi" style={{ fontSize:10,color:txS }}>Transacción cifrada SSL 256-bit</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

/* ── CHECKOUT STEP 2 — PAYMENT (MOBILE) ── */

export function CheckoutPayMobile({ onNav }:{ onNav:(s:string)=>void }) {

  const [method, setMethod] = useState<"card"|"paypal"|"wallet">("card");

  const [card, setCard] = useState({ num:"",name:"",exp:"",cvv:"" });

  const uc = (k:string,v:string)=>setCard(p=>({...p,[k]:v}));

  return (

    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,zIndex:20 }}>

        <div style={{ marginBottom:14 }}><CheckoutProgress step={2} mobile/></div>

        <div style={{ display:"flex",alignItems:"center",gap:8 }}>

          <CreditCard size={15} color={mg}/>

          <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>PAGO</span>

        </div>

      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"16px 16px" }} className="thin-scroll">

        {/* Method */}

        <div style={{ display:"flex",gap:10,marginBottom:20 }}>

          {[{ id:"card",Icon:CreditCard,label:"Tarjeta" },{ id:"paypal",Icon:Wallet,label:"PayPal" },{ id:"wallet",Icon:Smartphone,label:"Wallet" }].map(m=>(

            <button key={m.id} onClick={()=>setMethod(m.id as "card"|"paypal"|"wallet")}

              style={{ flex:1,padding:"14px 8px",borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:method===m.id?`rgba(255,46,158,0.1)`:bgE,border:`2px solid ${method===m.id?mg:"rgba(139,47,214,0.25)"}`,boxShadow:method===m.id?GM:"none" }}>

              <m.Icon size={20} color={method===m.id?mg:txS}/>

              <span className="ghi" style={{ fontSize:10,fontWeight:700,color:method===m.id?tx:txS }}>{m.label}</span>

            </button>

          ))}

        </div>

        {method==="card"&&(

          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>

            <FloatInput label="Número de tarjeta" value={card.num} onChange={v=>uc("num",maskCard(v))} inputMode="numeric"/>

            <FloatInput label="Titular" value={card.name} onChange={v=>uc("name",v.toUpperCase())} required/>

            <div style={{ display:"flex",gap:12 }}>

              <FloatInput label="MM/AA" value={card.exp} onChange={v=>uc("exp",maskExpiry(v))} inputMode="numeric" half/>

              <FloatInput label="CVV" value={card.cvv} onChange={v=>uc("cvv",v.replace(/\D/g,"").slice(0,3))} inputMode="numeric" type="password" half/>

            </div>

          </div>

        )}

        {method!=="card"&&(

          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"40px 0" }}>

            {method==="paypal"?<Wallet size={40} color={cy}/>:<Smartphone size={40} color={mg}/>}

            <p className="ghi" style={{ color:tx,fontSize:14,fontWeight:600,marginTop:12,marginBottom:0 }}>

              {method==="paypal"?"Continuar con PayPal":"Pago con Wallet"}

            </p>

          </div>

        )}

      </div>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderTop:`1px solid rgba(139,47,214,0.2)` }}>

        <NeonBtn variant="primary" full onClick={()=>onNav("checkout-3")} style={{ padding:"14px",fontSize:15 }}>

          Revisar pedido <ArrowRight size={16}/>

        </NeonBtn>

      </div>

    </div>

  );

}

/* ── CHECKOUT STEP 3 — REVIEW ── */

export function CheckoutReviewDesktop({ onNav, cartItems }:{ onNav:(s:string)=>void; cartItems:CartItemType[] }) {

  const [terms, setTerms] = useState(false);

  const { total } = calcTotals(cartItems);

  return (

    <div style={{ background:bg,minHeight:"calc(100vh - 56px)",padding:"40px 60px" }}>

      <div style={{ maxWidth:800,margin:"0 auto" }}>

        <CheckoutProgress step={3}/>

        <h2 className="ghr" style={{ fontSize:24,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:28 }}>REVISIÓN DEL PEDIDO</h2>

        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>

          {/* Items */}

          <ReviewCard title="ARTÍCULOS">

            {cartItems.map(item=>(

              <div key={item.id} style={{ display:"flex",alignItems:"center",gap:16,padding:"14px 0",borderBottom:`1px solid rgba(139,47,214,0.1)` }}>

                <div style={{ width:72,height:72,borderRadius:12,overflow:"hidden",background:bgE,flexShrink:0,border:`1px solid rgba(139,47,214,0.2)` }}><img src={imgUrl(item.imgId,144,144)} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/></div>

                <div style={{ flex:1 }}>

                  <p className="ghi" style={{ fontSize:15,fontWeight:700,color:tx }}>{item.name}</p>

                  <p className="ghi" style={{ fontSize:12,color:txS,marginTop:3 }}>{item.variant} · x{item.qty}</p>

                </div>

                <span className="ghr" style={{ fontSize:17,fontWeight:700,color:mg }}>${(item.price*item.qty).toFixed(2)}</span>

              </div>

            ))}

          </ReviewCard>

          {/* Shipping */}

          <ReviewCard title="DIRECCIÓN DE ENVÍO">

            <p className="ghi" style={{ fontSize:13,color:tx }}>Carlos García · carlos@email.com</p>

            <p className="ghi" style={{ fontSize:13,color:txS }}>Av. Paseo de la Reforma 180, Piso 3 · CDMX, 06600 · México</p>

            <p className="ghi" style={{ fontSize:12,color:cy,marginTop:4,display:"flex",alignItems:"center",gap:5 }}><Truck size={11}/>Entrega Express — 2-3 días laborables</p>

          </ReviewCard>

          {/* Payment */}

          <ReviewCard title="MÉTODO DE PAGO">

            <div style={{ display:"flex",alignItems:"center",gap:10 }}>

              <CreditCard size={18} color={txS}/>

              <div>

                <p className="ghi" style={{ fontSize:13,color:tx,fontWeight:600 }}>Tarjeta •••• •••• •••• 4242</p>

                <p className="ghi" style={{ fontSize:11,color:txS }}>Visa — Carlos García · Vence 08/27</p>

              </div>

            </div>

          </ReviewCard>

          {/* Summary */}

          <ReviewCard title="RESUMEN ECONÓMICO">

            <OrderSummaryPanel items={cartItems}/>

          </ReviewCard>

        </div>

        {/* T&C + CTA */}

        <div style={{ marginTop:28,padding:24,background:bgC,borderRadius:16,border:`1px solid rgba(139,47,214,0.2)` }}>

          <label style={{ display:"flex",alignItems:"flex-start",gap:12,cursor:"pointer",marginBottom:24 }}>

            <div onClick={()=>setTerms(t=>!t)} style={{ width:20,height:20,borderRadius:5,border:`2px solid ${terms?mg:"rgba(255,255,255,0.2)"}`,background:terms?mg:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",marginTop:1,boxShadow:terms?GM:"none",transition:"all 0.15s" }}>

              {terms&&<Check size={12} color="#fff" strokeWidth={3}/>}

            </div>

            <span className="ghi" style={{ fontSize:13,color:txS,lineHeight:1.5 }}>

              He leído y acepto los <span onClick={(e) => { e.stopPropagation(); e.preventDefault(); if ((window as any).openTerms) (window as any).openTerms(); }} style={{color:mg,cursor:"pointer"}}>Términos y Condiciones</span> y la <span onClick={(e) => { e.stopPropagation(); e.preventDefault(); if ((window as any).openPrivacy) (window as any).openPrivacy(); }} style={{color:mg,cursor:"pointer"}}>Política de Privacidad</span> de GameHub Store. Entiendo que mi pedido es definitivo una vez confirmado.*

            </span>

          </label>

          <NeonBtn variant="primary" full disabled={!terms} onClick={()=>onNav("confirmation")}

            style={{ padding:"16px",fontSize:16,letterSpacing:"0.06em",justifyContent:"center" }}>

            <Trophy size={18}/> REALIZAR COMPRA DEFINITIVA — ${total.toFixed(2)}

          </NeonBtn>

        </div>

      </div>

    </div>

  );

}

export function CheckoutReviewMobile({ onNav, cartItems }:{ onNav:(s:string)=>void; cartItems:CartItemType[] }) {

  const [terms, setTerms] = useState(false);

  const { total } = calcTotals(cartItems);

  return (

    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,zIndex:20 }}>

        <div style={{ marginBottom:14 }}><CheckoutProgress step={3} mobile/></div>

        <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>REVISIÓN</span>

      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"16px 16px",display:"flex",flexDirection:"column",gap:12 }} className="thin-scroll">

        <ReviewCard title="ARTÍCULOS" compact>

          {cartItems.map(item=>(

            <div key={item.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid rgba(139,47,214,0.1)` }}>

              <div style={{ width:36,height:36,borderRadius:6,overflow:"hidden",background:bgE,flexShrink:0 }}><img src={imgUrl(item.imgId,72,72)} alt={item.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/></div>

              <div style={{ flex:1 }}><p className="ghi" style={{ fontSize:12,fontWeight:600,color:tx,lineHeight:1.2 }}>{item.name}</p><p className="ghi" style={{ fontSize:10,color:txS }}>x{item.qty}</p></div>

              <span className="ghi" style={{ fontSize:12,fontWeight:700,color:mg }}>${(item.price*item.qty).toFixed(2)}</span>

            </div>

          ))}

        </ReviewCard>

        <ReviewCard title="ENVÍO" compact>

          <p className="ghi" style={{ fontSize:12,color:tx }}>Reforma 180, CDMX · Express 2-3d</p>

        </ReviewCard>

        <ReviewCard title="PAGO" compact>

          <div style={{ display:"flex",alignItems:"center",gap:8 }}><CreditCard size={14} color={txS}/><p className="ghi" style={{ fontSize:12,color:tx }}>•••• •••• •••• 4242 (Visa)</p></div>

        </ReviewCard>

        <ReviewCard title="TOTAL" compact>

          <OrderSummaryPanel items={cartItems} compact/>

        </ReviewCard>

        <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",padding:"12px",background:bgC,borderRadius:10,border:`1px solid rgba(139,47,214,0.2)` }}>

          <div onClick={()=>setTerms(t=>!t)} style={{ width:18,height:18,borderRadius:4,border:`2px solid ${terms?mg:"rgba(255,255,255,0.2)"}`,background:terms?mg:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",marginTop:1,boxShadow:terms?GM:"none" }}>

            {terms&&<Check size={10} color="#fff" strokeWidth={3}/>}

          </div>

          <span className="ghi" style={{ fontSize:11,color:txS,lineHeight:1.5 }}>Acepto los <span onClick={(e) => { e.stopPropagation(); e.preventDefault(); if ((window as any).openTerms) (window as any).openTerms(); }} style={{color:mg,cursor:"pointer"}}>Términos y Condiciones</span> y la <span onClick={(e) => { e.stopPropagation(); e.preventDefault(); if ((window as any).openPrivacy) (window as any).openPrivacy(); }} style={{color:mg,cursor:"pointer"}}>Política de Privacidad</span>.*</span>

        </label>

      </div>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderTop:`1px solid rgba(139,47,214,0.2)` }}>

        <NeonBtn variant="primary" full disabled={!terms} onClick={()=>onNav("confirmation")} style={{ padding:"14px",fontSize:14,justifyContent:"center" }}>

          <Trophy size={15}/>REALIZAR COMPRA — ${total.toFixed(2)}

        </NeonBtn>

      </div>

    </div>

  );

}

export function ReviewCard({ title, children, compact=false }:{ title:string; children:React.ReactNode; compact?:boolean }) {

  return (

    <div style={{ background:bgC,borderRadius:compact?12:14,padding:compact?"14px 16px":"20px 24px",border:`1px solid rgba(139,47,214,0.2)` }}>

      <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",fontWeight:700,marginBottom:compact?8:12 }}>{title}</p>

      {children}

    </div>

  );

}

/* ── CONFIRMACIÓN & TRACKING (DESKTOP) ── */

export function ConfirmDesktop({ onNav }:{ onNav:(s:string)=>void }) {

  const TRACKING_ID = "GH-2025-88472-X";

  const [copied, setCopied] = useState(false);

  const copy = ()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (

    <div style={{ background:bg,minHeight:"calc(100vh - 56px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"60px 24px" }}>

      <div style={{ maxWidth:720,width:"100%" }}>

        {/* Trophy header */}

        <div style={{ textAlign:"center",marginBottom:40 }}>

          <div className="success-pop" style={{ display:"inline-block",marginBottom:16 }}>

            <Trophy size={72} color={go} className="trophy-glow"/>

          </div>

          <h1 className="hero-title" style={{ fontSize:52,lineHeight:1,marginBottom:8 }}>¡GG! GOOD GAME</h1>

          <p className="ghr" style={{ fontSize:24,color:tx,fontWeight:600 }}>¡Tu pedido está confirmado!</p>

          <p className="ghi" style={{ fontSize:14,color:txS,marginTop:6 }}>Recibirás un email de confirmación en carlos@email.com</p>

        </div>

        {/* Tracking ID */}

        <div style={{ background:bgC,borderRadius:16,padding:"20px 24px",border:`1px solid rgba(255,183,0,0.3)`,boxShadow:`0 0 20px rgba(255,183,0,0.1)`,marginBottom:24 }}>

          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>

            <div>

              <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:4 }}>TRACKING ID</p>

              <p className="ghr" style={{ fontSize:22,fontWeight:700,color:go,letterSpacing:"0.06em" }}>{TRACKING_ID}</p>

            </div>

            <button onClick={copy} style={{ display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:8,background:copied?`rgba(0,230,118,0.1)`:bgE,border:`1px solid ${copied?ok+"55":"rgba(139,47,214,0.3)"}`,color:copied?ok:txS,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Inter',sans-serif",transition:"all 0.2s" }}>

              {copied?<CheckCircle size={14}/>:<Copy size={14}/>}{copied?"¡Copiado!":"Copiar ID"}

            </button>

          </div>

        </div>

        {/* Tracking progress */}

        <div style={{ background:bgC,borderRadius:16,padding:"24px",border:`1px solid rgba(139,47,214,0.2)`,marginBottom:24 }}>

          <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.07em",marginBottom:20 }}>ESTADO DEL ENVÍO</p>

          <div style={{ position:"relative" }}>

            {/* Vertical line */}

            <div style={{ position:"absolute",left:16,top:20,bottom:20,width:2,background:`linear-gradient(to bottom,${mg},${vi}33)` }}/>

            {TRACKING.map((t,i)=>(

              <div key={t.label} style={{ display:"flex",alignItems:"flex-start",gap:16,marginBottom:i<TRACKING.length-1?24:0,position:"relative",zIndex:1 }}>

                <div style={{

                  width:34,height:34,borderRadius:"50%",flexShrink:0,

                  background:t.done?`linear-gradient(135deg,${mg},${vi})`:t.active?bgE:bgE,

                  border:t.active?`2px solid ${mg}`:`2px solid ${t.done?"transparent":"rgba(139,47,214,0.2)"}`,

                  display:"flex",alignItems:"center",justifyContent:"center",

                  boxShadow:t.done||t.active?GM:"none",

                }}>

                  {t.done?<CheckCircle size={16} color="#fff"/>:t.active?<Package size={14} color={mg}/>:<Package size={14} color={txS}/>}

                </div>

                <div style={{ paddingTop:4 }}>

                  <p className="ghi" style={{ fontSize:14,fontWeight:t.active?700:600,color:t.done||t.active?tx:txS }}>{t.label}</p>

                  <p className="ghi" style={{ fontSize:11,color:t.active?mg:txS,fontWeight:t.active?600:400 }}>{t.time}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Actions */}

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:40 }}>

          <NeonBtn variant="secondary" full style={{ padding:"13px",justifyContent:"center" }}>

            <Download size={16}/>Descargar factura PDF

          </NeonBtn>

          <NeonBtn variant="primary" full onClick={()=>onNav("home")} style={{ padding:"13px",justifyContent:"center" }}>

            <Zap size={16}/>Volver a la tienda

          </NeonBtn>

        </div>

        {/* Related products */}

        <div>

          <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.08em",marginBottom:16 }}>TAMBIÉN TE PUEDE INTERESAR</p>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>

            {PRODUCTS.slice(1,4).map(p=><ProductCard key={p.id} p={p} onClick={()=>onNav("detail")}/>)}

          </div>

        </div>

      </div>

    </div>

  );

}

/* ── CONFIRMACIÓN & TRACKING (MOBILE) ── */

export function ConfirmMobile({ onNav }:{ onNav:(s:string)=>void }) {

  const TRACKING_ID = "GH-2025-88472-X";

  const [copied, setCopied] = useState(false);

  const copy = ()=>{ setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (

    <div style={{ background:bg,height:"100%",overflowY:"auto",padding:"24px 16px" }} className="thin-scroll">

      {/* Trophy */}

      <div style={{ textAlign:"center",marginBottom:28 }}>

        <div className="success-pop" style={{ display:"inline-block",marginBottom:10 }}>

          <Trophy size={56} color={go} className="trophy-glow"/>

        </div>

        <h1 className="hero-title" style={{ fontSize:36,lineHeight:1,marginBottom:6 }}>¡GG! GOOD GAME</h1>

        <p className="ghr" style={{ fontSize:16,color:tx,fontWeight:600 }}>¡Pedido confirmado!</p>

        <p className="ghi" style={{ fontSize:11,color:txS,marginTop:4 }}>Email de confirmación enviado</p>

      </div>

      {/* Tracking ID */}

      <div style={{ background:bgC,borderRadius:14,padding:"16px",border:`1px solid rgba(255,183,0,0.3)`,marginBottom:16 }}>

        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:4 }}>TRACKING ID</p>

        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>

          <p className="ghr" style={{ fontSize:18,fontWeight:700,color:go }}>{TRACKING_ID}</p>

          <button onClick={copy} style={{ display:"flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:8,background:copied?`rgba(0,230,118,0.1)`:bgE,border:`1px solid ${copied?ok+"55":"rgba(139,47,214,0.3)"}`,color:copied?ok:txS,cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>

            {copied?<CheckCircle size={12}/>:<Copy size={12}/>}{copied?"Copiado":"Copiar"}

          </button>

        </div>

      </div>

      {/* Tracking steps */}

      <div style={{ background:bgC,borderRadius:14,padding:"16px",border:`1px solid rgba(139,47,214,0.2)`,marginBottom:16 }}>

        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:16 }}>ESTADO DEL ENVÍO</p>

        {TRACKING.map((t,i)=>(

          <div key={t.label} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:i<TRACKING.length-1?14:0 }}>

            <div style={{ width:28,height:28,borderRadius:"50%",flexShrink:0,background:t.done?`linear-gradient(135deg,${mg},${vi})`:t.active?bgE:bgE,border:t.active?`2px solid ${mg}`:`2px solid ${t.done?"transparent":"rgba(139,47,214,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:t.done||t.active?GM:"none" }}>

              {t.done?<CheckCircle size={13} color="#fff"/>:t.active?<Package size={11} color={mg}/>:<Package size={11} color={txS}/>}

            </div>

            <div style={{ flex:1 }}>

              <p className="ghi" style={{ fontSize:12,fontWeight:t.active?700:500,color:t.done||t.active?tx:txS,margin:0 }}>{t.label}</p>

              <p className="ghi" style={{ fontSize:10,color:t.active?mg:txS,margin:0 }}>{t.time}</p>

            </div>

            {i<TRACKING.length-1&&<div style={{ position:"absolute",left:30,marginTop:28,width:2,height:14,background:t.done?`${mg}44`:"rgba(139,47,214,0.15)" }}/>}

          </div>

        ))}

      </div>

      {/* Actions */}

      <div style={{ display:"flex",flexDirection:"column",gap:10 }}>

        <NeonBtn variant="secondary" full style={{ padding:"13px",justifyContent:"center" }}>

          <Download size={15}/>Descargar factura PDF

        </NeonBtn>

        <NeonBtn variant="primary" full onClick={()=>onNav("home")} style={{ padding:"13px",justifyContent:"center" }}>

          <Zap size={15}/>Volver a la tienda

        </NeonBtn>

      </div>

    </div>

  );

}

export type OrderStatus = "en_ruta"|"en_espera"|"entregado"|"cancelado";

export const STATUS_CFG: Record<OrderStatus,{label:string;color:string;bg:string}> = {

  en_ruta:    { label:"En ruta",   color:cy,          bg:"rgba(0,240,255,0.1)" },

  en_espera:  { label:"En espera", color:go,          bg:"rgba(255,183,0,0.1)" },

  entregado:  { label:"Entregado", color:ok,          bg:"rgba(0,230,118,0.1)" },

  cancelado:  { label:"Cancelado", color:"#FF4500",   bg:"rgba(255,69,0,0.1)" },

};

