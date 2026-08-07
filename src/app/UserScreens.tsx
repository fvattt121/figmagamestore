import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Phone, Video, Languages, Medal, BookOpen, HelpCircle, Lock, Cpu, ThumbsUp, Gift, RotateCcw, ChevronLeft, ChevronRight, Search, Package, User, Zap, Shield, Truck, CreditCard, Settings, FileText, ExternalLink, Check, ToggleLeft, ToggleRight, Eye, Users, Headphones, Star, Download, ShoppingCart } from "lucide-react";
import { bg, bgC, bgE, mg, vi, cy, go, ok, tx, txS, GM, GV, GC, GG, NeonBtn, Stars, OrderStatus, STATUS_CFG } from "./shared";

/* ═══════════════════════════════════════
   USER MODULES — DATA
═══════════════════════════════════════ */

export const FAQ_CATS = [
  { id:"garantias",     label:"Garantías",      color:mg, Icon:Shield,       articles:8,  desc:"Coberturas y reclamaciones" },
  { id:"envios",        label:"Envíos",          color:cy, Icon:Truck,        articles:12, desc:"Seguimiento y plazos" },
  { id:"pagos",         label:"Pagos",           color:vi, Icon:CreditCard,   articles:6,  desc:"Métodos y seguridad" },
  { id:"cuentas",       label:"Cuentas",         color:mg, Icon:User,         articles:5,  desc:"Gestión de tu cuenta" },
  { id:"soporte",       label:"Soporte Técnico", color:cy, Icon:Headphones,   articles:14, desc:"Problemas y soluciones" },
  { id:"devoluciones",  label:"Devoluciones",    color:vi, Icon:Package,      articles:7,  desc:"Cambios y reembolsos" },
  { id:"suscripciones", label:"Suscripciones",   color:mg, Icon:Zap,          articles:4,  desc:"Planes GameHub+" },
  { id:"privacidad",    label:"Privacidad",      color:cy, Icon:Lock,         articles:9,  desc:"Datos y cookies" },
];

export const FAQ_ARTICLES: Record<string,{title:string;views:string}[]> = {
  garantias:     [{ title:"¿Cómo activar la garantía extendida?",       views:"12k" },{ title:"Proceso de reclamación paso a paso",       views:"8.4k" },{ title:"Garantía internacional — qué cubre",    views:"5.1k" }],
  envios:        [{ title:"¿Cuándo llega mi pedido?",                   views:"24k" },{ title:"Cambiar dirección de entrega",             views:"10k"  },{ title:"Pedido entregado pero no recibido",     views:"18k" }],
  pagos:         [{ title:"Métodos de pago aceptados",                  views:"9.2k"},{ title:"Pago rechazado — qué hacer",              views:"15k"  },{ title:"¿Cómo pedir factura?",                  views:"6.8k"}],
  cuentas:       [{ title:"Cambiar email o contraseña",                 views:"7.3k"},{ title:"Eliminar mi cuenta",                      views:"4.1k" },{ title:"Vincular con PlayStation/Xbox",          views:"11k" }],
  soporte:       [{ title:"Mi dispositivo no enciende",                 views:"20k" },{ title:"Problemas con el driver del teclado",      views:"13k"  },{ title:"Calibrar los mandos del visor VR",       views:"9.5k"}],
  devoluciones:  [{ title:"¿Cómo iniciar una devolución?",              views:"19k" },{ title:"Plazo de 30 días — condiciones",           views:"8.7k" },{ title:"Reembolso a PayPal vs. tarjeta",         views:"11k" }],
  suscripciones: [{ title:"¿Qué incluye GameHub+?",                     views:"6.2k"},{ title:"Cancelar suscripción",                    views:"14k"  },{ title:"Gestionar facturación mensual",          views:"5.9k"}],
  privacidad:    [{ title:"¿Qué datos recopilamos?",                    views:"7.8k"},{ title:"Exportar o eliminar mis datos",            views:"9.1k" },{ title:"Política de cookies explicada",          views:"5.5k"}],
};

export const HELP_SUGGEST = ["¿Cómo rastrear mi pedido?","Política de devoluciones","Error en el pago","Activar garantía","Cambiar dirección"];

export type ChatMsg = { id:number; from:"bot"|"user"|"system"; text:string; time:string };
export const QUICK_TOPICS = [
  { label:"Estado de mi pedido",       reply:"Dime tu número de pedido (ej. #GH-88472) y te doy el estado al instante." },
  { label:"Garantías y devoluciones",  reply:"Los productos GameHub tienen garantía oficial 2 años. Para iniciar una devolución tienes 30 días desde la recepción." },
  { label:"Soporte técnico",           reply:"Cuéntame el problema con tu dispositivo. Intentaré resolverlo o te escalaré con un especialista humano." },
];

export const BOT_INIT: ChatMsg[] = [
  { id:1, from:"system", text:"Sesión iniciada · 06/08/2026 · 14:22", time:"14:22" },
  { id:2, from:"bot",    text:"¡Hola! Soy GameBot IA 🎮 Estoy aquí para ayudarte con tu pedido, garantías, soporte técnico y mucho más. ¿En qué puedo ayudarte hoy?", time:"14:22" },
];

export type XPLevel = "Bronze"|"Silver"|"Gold"|"Platinum";
export const RANK_CFG: Record<XPLevel,{color:string;min:number;max:number;emoji:string}> = {
  Bronze:   { color:"#CD7F32", min:0,    max:500,  emoji:"🥉" },
  Silver:   { color:"#C0C0C0", min:501,  max:1500, emoji:"🥈" },
  Gold:     { color:go,        min:1501, max:3000, emoji:"🥇" },
  Platinum: { color:cy,        min:3001, max:5000, emoji:"💎" },
};

export const USER_PROFILE = {
  name:"Carlos García", handle:"@carlosg_gamer",
  xp:2340, level:"Gold" as XPLevel,
  joinDate:"Enero 2022", totalOrders:14, totalSpent:3241.87,
};

export const PROFILE_ORDERS: { id:string; date:string; items:number; total:number; status:OrderStatus }[] = [
  { id:"#GH-88472", date:"06/08/2025", items:3, total:939.96, status:"en_ruta"  },
  { id:"#GH-88401", date:"22/07/2025", items:1, total:599.99, status:"entregado"},
  { id:"#GH-88310", date:"01/07/2025", items:2, total:339.98, status:"entregado"},
];

export const BADGES_PROFILE = [
  { name:"First Buy",   emoji:"🎮", desc:"Primera compra",          earned:true  },
  { name:"Big Spender", emoji:"💰", desc:"Gasto acumulado >$500",   earned:true  },
  { name:"VR Pioneer",  emoji:"🥽", desc:"Primer visor VR",         earned:true  },
  { name:"Review King", emoji:"⭐", desc:"10 reseñas publicadas",   earned:true  },
  { name:"Setup Master",emoji:"🖥️", desc:"3+ categorías compradas", earned:false },
  { name:"Platinum",    emoji:"💎", desc:"Alcanzar 3001 XP",        earned:false },
];

export type A11YState = { highContrast:boolean; textScale:100|125|150; screenReader:boolean; keyboardNav:boolean; reduceMotion:boolean; colorblind:boolean };
export const A11Y_INIT: A11YState = { highContrast:false, textScale:100, screenReader:false, keyboardNav:true, reduceMotion:false, colorblind:false };

/* ═══════════════════════════════════════
   USER MODULES — SHARED ATOMS
═══════════════════════════════════════ */

export function A11YSwitch({ on, toggle, label, sub, color=cy }:{ on:boolean; toggle:()=>void; label:string; sub?:string; color?:string }) {
  return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",borderRadius:12,background:on?`${color}0D`:bgE,border:`1px solid ${on?color+"44":"rgba(139,47,214,0.2)"}`,transition:"all 0.2s",marginBottom:10 }}>
      <div>
        <p className="ghi" style={{ fontSize:13,fontWeight:600,color:on?tx:txS,margin:0,transition:"color 0.2s" }}>{label}</p>
        {sub&&<p className="ghi" style={{ fontSize:10,color:txS,margin:"2px 0 0" }}>{sub}</p>}
      </div>
      <button onClick={toggle} style={{ background:"none",border:"none",cursor:"pointer",color:on?color:txS,transition:"color 0.2s" }}>
        {on?<ToggleRight size={34}/>:<ToggleLeft size={34}/>}
      </button>
    </div>
  );
}

export function ChatBubble({ msg }:{ msg:ChatMsg }) {
  const isBot=msg.from==="bot"; const isSys=msg.from==="system";
  if (isSys) return (
    <div style={{ display:"flex",justifyContent:"center",margin:"8px 0" }}>
      <span className="ghi" style={{ fontSize:10,color:txS,background:bgE,padding:"4px 12px",borderRadius:50,border:`1px solid rgba(139,47,214,0.2)` }}>{msg.text}</span>
    </div>
  );
  return (
    <div style={{ display:"flex",justifyContent:isBot?"flex-start":"flex-end",marginBottom:10 }}>
      {isBot&&<div style={{ width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",marginRight:8,flexShrink:0,alignSelf:"flex-end",boxShadow:GV }}><Cpu size={12} color="#fff"/></div>}
      <div style={{ maxWidth:"72%",padding:"10px 14px",borderRadius:isBot?"4px 14px 14px 14px":"14px 4px 14px 14px",background:isBot?bgC:`linear-gradient(135deg,${mg},${vi})`,border:isBot?`1px solid rgba(139,47,214,0.3)`:"none",boxShadow:isBot?"none":GM }}>
        <p className="ghi" style={{ fontSize:13,color:tx,margin:0,lineHeight:1.5 }}>{msg.text}</p>
        <p className="ghi" style={{ fontSize:9,color:isBot?txS:"rgba(255,255,255,0.6)",margin:"4px 0 0",textAlign:"right" }}>{msg.time}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SUPPORT CENTER — DESKTOP
═══════════════════════════════════════ */

export function SupportDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [query,   setQuery]   = useState("");
  const [suggest, setSuggest] = useState(false);
  const [selCat,  setSelCat]  = useState("envios");
  const cat = FAQ_CATS.find(c=>c.id===selCat)!;
  const articles = FAQ_ARTICLES[selCat]??[];

  return (
    <div style={{ background:bg,minHeight:"calc(100vh - 56px)" }}>
      {/* Hero search */}
      <div style={{ background:`linear-gradient(135deg,${bgC},${bgE})`,borderBottom:`1px solid rgba(139,47,214,0.25)`,padding:"44px 80px 36px" }}>
        <h1 className="ghr" style={{ fontSize:38,fontWeight:700,color:tx,letterSpacing:"0.04em",marginBottom:6 }}>¿En qué podemos <span style={{ color:mg }}>ayudarte</span>?</h1>
        <p className="ghi" style={{ color:txS,fontSize:14,marginBottom:24 }}>Más de 70 artículos de ayuda · Soporte 24/7 · GameBot IA disponible</p>
        <div style={{ maxWidth:600,position:"relative" }}>
          <Search size={18} color={mg} style={{ position:"absolute",left:18,top:"50%",transform:"translateY(-50%)",zIndex:2 }}/>
          <input value={query} onChange={e=>{setQuery(e.target.value);setSuggest(e.target.value.length>0);}}
            onBlur={()=>setTimeout(()=>setSuggest(false),200)}
            placeholder="Buscar artículos, guías, problemas…"
            style={{ width:"100%",background:bgE,border:`1px solid ${query?mg+"88":"rgba(139,47,214,0.35)"}`,borderRadius:14,padding:"16px 18px 16px 52px",color:tx,fontSize:15,outline:"none",fontFamily:"'Inter',sans-serif",boxShadow:query?GM:"none",transition:"all 0.2s",boxSizing:"border-box" }}/>
          {suggest&&(
            <div className="fade-in" style={{ position:"absolute",top:"110%",left:0,right:0,background:bgC,borderRadius:12,border:`1px solid rgba(255,46,158,0.3)`,boxShadow:GM,overflow:"hidden",zIndex:30 }}>
              {HELP_SUGGEST.filter(s=>s.toLowerCase().includes(query.toLowerCase())).map(s=>(
                <button key={s} onClick={()=>{setQuery(s);setSuggest(false);}} style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 18px",background:"none",border:"none",cursor:"pointer",color:tx,fontSize:13,fontFamily:"'Inter',sans-serif",textAlign:"left" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(139,47,214,0.1)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="none")}>
                  <Search size={13} color={txS}/>{s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding:"36px 80px 60px",maxWidth:1200,margin:"0 auto" }}>
        {/* Category pills */}
        <p className="ghi" style={{ fontSize:11,color:txS,letterSpacing:"0.08em",marginBottom:14 }}>CATEGORÍAS DE AYUDA</p>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:36 }}>
          {FAQ_CATS.map(c=>(
            <button key={c.id} onClick={()=>setSelCat(c.id)} style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:50,cursor:"pointer",background:selCat===c.id?`${c.color}18`:bgC,border:`1px solid ${selCat===c.id?c.color+"66":"rgba(139,47,214,0.25)"}`,color:selCat===c.id?c.color:txS,fontSize:13,fontWeight:600,fontFamily:"'Inter',sans-serif",transition:"all 0.2s",boxShadow:selCat===c.id?`0 0 14px ${c.color}44`:"none" }}>
              <c.Icon size={14}/>{c.label}
            </button>
          ))}
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 340px",gap:28 }}>
          {/* Category cards grid + selected articles */}
          <div>
            {/* 4-col mini category cards */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:32 }}>
              {FAQ_CATS.map(c=>(
                <div key={c.id} onClick={()=>setSelCat(c.id)} className="gh-card" style={{ background:bgC,borderRadius:14,padding:"18px 16px",cursor:"pointer",border:`1px solid ${selCat===c.id?c.color+"55":"rgba(139,47,214,0.18)"}`,boxShadow:selCat===c.id?`0 0 22px ${c.color}22`:"none",transition:"all 0.2s" }}>
                  <div style={{ width:38,height:38,borderRadius:10,background:`${c.color}15`,border:`1px solid ${c.color}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10 }}><c.Icon size={18} color={c.color}/></div>
                  <p className="ghr" style={{ fontSize:13,fontWeight:700,color:selCat===c.id?c.color:tx,marginBottom:2,lineHeight:1.2 }}>{c.label}</p>
                  <p className="ghi" style={{ fontSize:10,color:txS,marginBottom:8 }}>{c.desc}</p>
                  <div style={{ display:"flex",alignItems:"center",gap:4,color:c.color,fontSize:11,fontFamily:"'Inter',sans-serif",fontWeight:600 }}>
                    <BookOpen size={11}/>{c.articles} artículos
                  </div>
                </div>
              ))}
            </div>
            {/* Selected category articles */}
            <div style={{ background:bgC,borderRadius:16,border:`1px solid rgba(139,47,214,0.2)`,overflow:"hidden" }}>
              <div style={{ padding:"16px 22px",borderBottom:`1px solid rgba(139,47,214,0.15)`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <cat.Icon size={15} color={cat.color}/>
                  <span className="ghr" style={{ fontSize:15,fontWeight:700,color:tx,letterSpacing:"0.04em" }}>{cat.label.toUpperCase()}</span>
                  <span className="ghi" style={{ fontSize:11,color:txS }}>({cat.articles} artículos)</span>
                </div>
                <button style={{ display:"flex",alignItems:"center",gap:5,color:cat.color,fontSize:12,fontWeight:600,background:`${cat.color}12`,border:`1px solid ${cat.color}44`,borderRadius:7,padding:"5px 12px",cursor:"pointer",fontFamily:"'Inter',sans-serif" }}>
                  Ver todos <ExternalLink size={11}/>
                </button>
              </div>
              {articles.map((a,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 22px",borderBottom:i<articles.length-1?`1px solid rgba(139,47,214,0.1)`:"none",cursor:"pointer" }}
                  onMouseEnter={e=>(e.currentTarget.style.background="rgba(139,47,214,0.06)")}
                  onMouseLeave={e=>(e.currentTarget.style.background="none")}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <FileText size={14} color={txS}/>
                    <span className="ghi" style={{ fontSize:13,color:tx,fontWeight:500 }}>{a.title}</span>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:12,flexShrink:0 }}>
                    <span className="ghi" style={{ fontSize:11,color:txS }}>{a.views} visitas</span>
                    <ChevronRight size={14} color={txS}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {/* Live chat CTA */}
            <div style={{ background:`linear-gradient(135deg,rgba(255,46,158,0.12),rgba(139,47,214,0.1))`,borderRadius:16,padding:"22px 20px",border:`1px solid rgba(255,46,158,0.3)`,boxShadow:GM }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                <div style={{ width:10,height:10,borderRadius:"50%",background:ok,boxShadow:`0 0 8px ${ok}` }}/>
                <span className="ghi" style={{ fontSize:11,fontWeight:700,color:ok }}>AGENTE DISPONIBLE AHORA</span>
              </div>
              <p className="ghr" style={{ fontSize:18,fontWeight:700,color:tx,marginBottom:4 }}>Habla con GameBot</p>
              <p className="ghi" style={{ fontSize:12,color:txS,marginBottom:14 }}>Respuesta inmediata · Escalado a humano si es necesario</p>
              <NeonBtn variant="primary" full onClick={()=>onNav("chat")} style={{ justifyContent:"center" }}>
                <MessageCircle size={14}/>Iniciar chat →
              </NeonBtn>
            </div>
            {/* Contact options */}
            <div style={{ background:bgC,borderRadius:14,padding:"18px",border:`1px solid rgba(139,47,214,0.2)` }}>
              <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:14 }}>OTRAS FORMAS DE CONTACTO</p>
              {[{ Icon:Phone,  label:"Llamada", sub:"Lun-Dom 9-21h", color:vi, action:"tel:+528001234567" },
                { Icon:Video,  label:"Videollamada", sub:"Técnicos especializados", color:cy, action:"" },
                { Icon:Languages, label:"Lengua de señas", sub:"LSM disponible", color:mg, action:"" }].map(({ Icon,label,sub,color })=>(
                <button key={label} style={{ display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 0",background:"none",border:"none",cursor:"pointer",borderBottom:`1px solid rgba(139,47,214,0.1)`,transition:"opacity 0.15s" }}>
                  <div style={{ width:34,height:34,borderRadius:9,background:`${color}18`,border:`1px solid ${color}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Icon size={16} color={color}/></div>
                  <div style={{ flex:1,textAlign:"left" }}>
                    <p className="ghi" style={{ fontSize:13,fontWeight:600,color:tx,margin:0 }}>{label}</p>
                    <p className="ghi" style={{ fontSize:10,color:txS,margin:0 }}>{sub}</p>
                  </div>
                  <ChevronRight size={13} color={txS}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SUPPORT CENTER — MOBILE
═══════════════════════════════════════ */

export function SupportMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [query,   setQuery]  = useState("");
  const [selCat,  setSelCat] = useState<string|null>(null);
  const cat = selCat?FAQ_CATS.find(c=>c.id===selCat):null;

  return (
    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>
      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)` }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
          <HelpCircle size={16} color={mg}/>
          <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>CENTRO DE AYUDA</span>
          <button onClick={()=>onNav("chat")} style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:50,background:`rgba(255,46,158,0.12)`,border:`1px solid ${mg}44`,color:mg,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"'Inter',sans-serif" }}><MessageCircle size={11}/>GameBot</button>
        </div>
        <div style={{ position:"relative" }}>
          <Search size={14} color={txS} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar ayuda…" style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.25)`,borderRadius:10,padding:"10px 14px 10px 34px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box",boxShadow:query?GM:"none",transition:"all 0.2s" }}/>
        </div>
      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"14px 16px 20px" }} className="thin-scroll">
        {/* Category pills */}
        <div style={{ display:"flex",gap:8,overflowX:"auto",marginBottom:16 }} className="no-scroll">
          <button onClick={()=>setSelCat(null)} style={{ padding:"7px 14px",borderRadius:50,fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,background:!selCat?"rgba(255,46,158,0.14)":bgC,border:`1px solid ${!selCat?mg+"55":"rgba(139,47,214,0.25)"}`,color:!selCat?mg:txS,fontFamily:"'Inter',sans-serif" }}>Todas</button>
          {FAQ_CATS.map(c=>(
            <button key={c.id} onClick={()=>setSelCat(c.id)} style={{ display:"flex",alignItems:"center",gap:5,padding:"7px 14px",borderRadius:50,fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0,background:selCat===c.id?`${c.color}18`:bgC,border:`1px solid ${selCat===c.id?c.color+"55":"rgba(139,47,214,0.25)"}`,color:selCat===c.id?c.color:txS,fontFamily:"'Inter',sans-serif" }}>
              <c.Icon size={11}/>{c.label}
            </button>
          ))}
        </div>

        {/* Category cards or article list */}
        {!selCat?(
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            {FAQ_CATS.map(c=>(
              <div key={c.id} onClick={()=>setSelCat(c.id)} style={{ background:bgC,borderRadius:12,padding:"14px",cursor:"pointer",border:`1px solid rgba(139,47,214,0.18)` }}>
                <div style={{ width:32,height:32,borderRadius:8,background:`${c.color}15`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8 }}><c.Icon size={15} color={c.color}/></div>
                <p className="ghr" style={{ fontSize:13,fontWeight:700,color:tx,marginBottom:2 }}>{c.label}</p>
                <p className="ghi" style={{ fontSize:9,color:txS,marginBottom:6 }}>{c.desc}</p>
                <span className="ghi" style={{ fontSize:10,color:c.color,fontWeight:700 }}>{c.articles} artículos →</span>
              </div>
            ))}
          </div>
        ):(
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
              <button onClick={()=>setSelCat(null)} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><ChevronLeft size={18}/></button>
              {cat&&<div style={{ display:"flex",alignItems:"center",gap:7 }}><cat.Icon size={14} color={cat.color}/><span className="ghr" style={{ fontSize:15,fontWeight:700,color:tx }}>{cat.label}</span></div>}
            </div>
            <div style={{ background:bgC,borderRadius:12,border:`1px solid rgba(139,47,214,0.2)`,overflow:"hidden" }}>
              {(selCat?FAQ_ARTICLES[selCat]:[]).map((a,i,arr)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderBottom:i<arr.length-1?`1px solid rgba(139,47,214,0.1)`:"none",cursor:"pointer" }}>
                  <div>
                    <p className="ghi" style={{ fontSize:13,color:tx,fontWeight:500,margin:0 }}>{a.title}</p>
                    <p className="ghi" style={{ fontSize:10,color:txS,margin:"2px 0 0" }}>{a.views} visitas</p>
                  </div>
                  <ChevronRight size={14} color={txS} style={{ flexShrink:0 }}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA strip */}
        <div style={{ marginTop:20,background:`rgba(255,46,158,0.07)`,borderRadius:12,padding:"16px",border:`1px solid rgba(255,46,158,0.25)`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div>
            <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,margin:0 }}>¿No encuentras tu respuesta?</p>
            <p className="ghi" style={{ fontSize:11,color:txS,margin:"2px 0 0" }}>GameBot IA está disponible 24/7</p>
          </div>
          <NeonBtn variant="primary" small onClick={()=>onNav("chat")}><MessageCircle size={11}/>Chat</NeonBtn>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   GAMEBOT CHAT — DESKTOP
═══════════════════════════════════════ */

export function ChatDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [msgs,      setMsgs]     = useState<ChatMsg[]>([...BOT_INIT]);
  const [input,     setInput]    = useState("");
  const [escalated, setEscalated]= useState(false);
  const [nextId,    setNextId]   = useState(10);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString("es-ES",{ hour:"2-digit", minute:"2-digit" });
    const userMsg: ChatMsg = { id:nextId, from:"user", text:input, time:now };
    const topic = QUICK_TOPICS.find(t=>input.toLowerCase().includes(t.label.toLowerCase().split(" ")[0]));
    const botReply: ChatMsg = { id:nextId+1, from:"bot", text:topic?.reply??"Déjame buscarlo. Un momento… ¿Hay algo más específico en lo que pueda ayudarte?", time:now };
    setMsgs(m=>[...m,userMsg,botReply]);
    setNextId(n=>n+2);
    setInput("");
  };

  const pickTopic = (t:typeof QUICK_TOPICS[0]) => {
    const now = new Date().toLocaleTimeString("es-ES",{ hour:"2-digit", minute:"2-digit" });
    setMsgs(m=>[...m,{ id:nextId,from:"user",text:t.label,time:now },{ id:nextId+1,from:"bot",text:t.reply,time:now }]);
    setNextId(n=>n+2);
  };

  const escalate = () => {
    setEscalated(true);
    const now = new Date().toLocaleTimeString("es-ES",{ hour:"2-digit", minute:"2-digit" });
    setMsgs(m=>[...m,{ id:nextId,from:"system",text:"✦ Tu caso ha sido transferido a un agente humano. Tiempo de espera estimado: 3 min.",time:now }]);
    setNextId(n=>n+1);
  };

  return (
    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg,justifyContent:"center",padding:"32px 24px" }}>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 300px",gap:20,maxWidth:960,width:"100%" }}>
        {/* Chat window */}
        <div style={{ display:"flex",flexDirection:"column",background:bgC,borderRadius:20,border:`1px solid rgba(139,47,214,0.25)`,overflow:"hidden" }}>
          {/* Chat header */}
          <div style={{ padding:"16px 20px",borderBottom:`1px solid rgba(139,47,214,0.2)`,background:bgE,display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:GV }}><Cpu size={20} color="#fff"/></div>
            <div>
              <p className="ghr" style={{ fontSize:16,fontWeight:700,color:tx,margin:0 }}>GameBot IA</p>
              <div style={{ display:"flex",alignItems:"center",gap:5,marginTop:1 }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:escalated?mg:ok,boxShadow:`0 0 6px ${escalated?mg:ok}` }}/>
                <span className="ghi" style={{ fontSize:11,color:escalated?mg:ok,fontWeight:600 }}>{escalated?"Agente humano":"En línea · IA"}</span>
              </div>
            </div>
            <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
              {[{ Icon:Phone,c:vi,title:"Llamada" },{ Icon:Video,c:cy,title:"Video" },{ Icon:Languages,c:mg,title:"Señas" }].map(({ Icon,c,title })=>(
                <button key={title} title={title} style={{ width:34,height:34,borderRadius:8,background:`${c}18`,border:`1px solid ${c}33`,cursor:"pointer",color:c,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}>
                  <Icon size={15}/>
                </button>
              ))}
            </div>
          </div>
          {/* Messages */}
          <div style={{ flex:1,overflowY:"auto",padding:"20px 20px 10px",minHeight:340,maxHeight:480 }} className="thin-scroll">
            {msgs.map(m=><ChatBubble key={m.id} msg={m}/>)}
            {/* Quick topic chips — show only on first load */}
            {msgs.length===1&&(
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:10 }}>
                {QUICK_TOPICS.map(t=>(
                  <button key={t.label} onClick={()=>pickTopic(t)} style={{ padding:"7px 14px",borderRadius:50,fontSize:11,fontWeight:600,cursor:"pointer",background:bgE,border:`1px solid rgba(255,46,158,0.3)`,color:mg,fontFamily:"'Inter',sans-serif",transition:"all 0.15s" }}>{t.label}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
          {/* Input bar */}
          <div style={{ padding:"14px 16px",borderTop:`1px solid rgba(139,47,214,0.2)`,display:"flex",gap:10,alignItems:"center" }}>
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Escribe tu consulta…"
              style={{ flex:1,background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:12,padding:"12px 16px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxShadow:input?GM:"none",transition:"all 0.2s" }}/>
            <button onClick={send} disabled={!input.trim()} className="neon-btn" style={{ width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${mg},${vi})`,border:"none",cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",opacity:input.trim()?1:0.45,boxShadow:GM }}>
              <Send size={17} color="#fff"/>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          {/* Agent card */}
          <div style={{ background:bgC,borderRadius:16,padding:"18px",border:`1px solid rgba(139,47,214,0.2)` }}>
            <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:12 }}>EQUIPO DE SOPORTE</p>
            {[{ name:"GameBot IA",sub:"Asistente virtual",color:vi },{ name:"Elena R.",sub:"Técnica certificada",color:ok },{ name:"Marco A.",sub:"Especialista VR",color:cy }].map(({ name,sub,color },i)=>(
              <div key={name} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:i<2?12:0 }}>
                <div style={{ width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${color},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><User size={14} color="#fff"/></div>
                <div style={{ flex:1 }}>
                  <p className="ghi" style={{ fontSize:12,fontWeight:700,color:tx,margin:0 }}>{name}</p>
                  <p className="ghi" style={{ fontSize:10,color:txS,margin:0 }}>{sub}</p>
                </div>
                <div style={{ width:7,height:7,borderRadius:"50%",background:i===0?ok:i===1?ok:"rgba(255,255,255,0.2)",boxShadow:i<=1?`0 0 6px ${ok}`:"none" }}/>
              </div>
            ))}
          </div>
          {/* Escalate */}
          {!escalated&&(
            <button onClick={escalate} style={{ width:"100%",padding:"14px",borderRadius:12,background:`rgba(139,47,214,0.1)`,border:`1px solid rgba(139,47,214,0.35)`,color:vi,cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:GV,transition:"all 0.2s" }}>
              <Users size={15}/>Hablar con un humano
            </button>
          )}
          {escalated&&(
            <div className="fade-in" style={{ background:"rgba(255,46,158,0.1)",borderRadius:12,padding:"14px 16px",border:`1px solid ${mg}44`,display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:mg,animation:"stockPulseLow 1.5s infinite" }}/>
              <span className="ghi" style={{ fontSize:12,color:mg,fontWeight:600 }}>Agente humano en camino (~3 min)</span>
            </div>
          )}
          {/* Quick links */}
          <div style={{ background:bgC,borderRadius:14,border:`1px solid rgba(139,47,214,0.2)`,overflow:"hidden" }}>
            <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",padding:"12px 16px 8px" }}>ACCESOS RÁPIDOS</p>
            {[{ l:"Centro de ayuda",fn:()=>onNav("support") },{ l:"Mi perfil",fn:()=>onNav("profile") },{ l:"Mis pedidos",fn:()=>onNav("profile") }].map(({ l,fn })=>(
              <button key={l} onClick={fn} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"11px 16px",background:"none",border:"none",borderTop:`1px solid rgba(139,47,214,0.1)`,cursor:"pointer",color:txS,fontFamily:"'Inter',sans-serif",fontSize:12 }}>
                {l}<ChevronRight size={12}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   GAMEBOT CHAT — MOBILE
═══════════════════════════════════════ */

export function ChatMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [msgs,   setMsgs]  = useState<ChatMsg[]>([...BOT_INIT]);
  const [input,  setInput] = useState("");
  const [escalated,setEsc] = useState(false);
  const [nextId, setNextId]= useState(10);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString("es-ES",{ hour:"2-digit", minute:"2-digit" });
    const topic = QUICK_TOPICS.find(t=>input.toLowerCase().includes(t.label.toLowerCase().split(" ")[0]));
    setMsgs(m=>[...m,{ id:nextId,from:"user",text:input,time:now },{ id:nextId+1,from:"bot",text:topic?.reply??"Un momento… ¿Puedes darme más detalles?",time:now }]);
    setNextId(n=>n+2);
    setInput("");
  };

  return (
    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>
      {/* Header */}
      <div style={{ padding:"10px 14px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
        <button onClick={()=>onNav("support")} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><ChevronLeft size={20}/></button>
        <div style={{ width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:GV }}><Cpu size={15} color="#fff"/></div>
        <div style={{ flex:1 }}>
          <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,margin:0 }}>GameBot IA</p>
          <div style={{ display:"flex",alignItems:"center",gap:4 }}>
            <div style={{ width:5,height:5,borderRadius:"50%",background:escalated?mg:ok }}/>
            <span className="ghi" style={{ fontSize:9,color:escalated?mg:ok,fontWeight:600 }}>{escalated?"Agente humano":"En línea"}</span>
          </div>
        </div>
        <div style={{ display:"flex",gap:6 }}>
          {[{ Icon:Phone,c:vi },{ Icon:Video,c:cy },{ Icon:Languages,c:mg }].map(({ Icon,c },i)=>(
            <button key={i} style={{ width:30,height:30,borderRadius:7,background:`${c}18`,border:`1px solid ${c}33`,cursor:"pointer",color:c,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={13}/></button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1,overflowY:"auto",padding:"14px 14px 10px" }} className="no-scroll">
        {msgs.map(m=><ChatBubble key={m.id} msg={m}/>)}
        {msgs.length===1&&(
          <div style={{ display:"flex",flexWrap:"wrap",gap:7,marginTop:8 }}>
            {QUICK_TOPICS.map(t=>(
              <button key={t.label} onClick={()=>{ const now=new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}); setMsgs(ms=>[...ms,{id:nextId,from:"user",text:t.label,time:now},{id:nextId+1,from:"bot",text:t.reply,time:now}]); setNextId(n=>n+2); }} style={{ padding:"7px 12px",borderRadius:50,fontSize:10,fontWeight:600,cursor:"pointer",background:bgC,border:`1px solid rgba(255,46,158,0.3)`,color:mg,fontFamily:"'Inter',sans-serif" }}>{t.label}</button>
            ))}
          </div>
        )}
        {!escalated&&msgs.length>2&&(
          <div style={{ display:"flex",justifyContent:"center",margin:"12px 0" }}>
            <button onClick={()=>{ setEsc(true); const now=new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}); setMsgs(ms=>[...ms,{id:nextId,from:"system",text:"✦ Transferido a agente humano. Espera ~3 min.",time:now}]); setNextId(n=>n+1); }} style={{ padding:"7px 14px",borderRadius:50,background:`rgba(139,47,214,0.1)`,border:`1px solid rgba(139,47,214,0.35)`,color:vi,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif" }}><Users size={11} style={{ display:"inline",marginRight:4 }}/>Hablar con humano</button>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:"10px 12px",borderTop:`1px solid rgba(139,47,214,0.2)`,background:bgC,display:"flex",gap:8,alignItems:"center",flexShrink:0 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Escribe tu consulta…"
          style={{ flex:1,background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:22,padding:"10px 16px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif" }}/>
        <button onClick={send} disabled={!input.trim()} style={{ width:40,height:40,borderRadius:12,background:`linear-gradient(135deg,${mg},${vi})`,border:"none",cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",opacity:input.trim()?1:0.45,boxShadow:GM,flexShrink:0 }}>
          <Send size={15} color="#fff"/>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PROFILE & GAMIFICATION — DESKTOP
═══════════════════════════════════════ */

export function ProfileDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const u = USER_PROFILE;
  const rank = RANK_CFG[u.level];
  const nextLvl = u.level==="Gold"?"Platinum":"—";
  const nextRank = nextLvl!=="—"?RANK_CFG[nextLvl as XPLevel]:null;
  const xpInLevel = u.xp - rank.min;
  const xpTotal   = rank.max - rank.min;
  const pct       = Math.min(100, Math.round((xpInLevel/xpTotal)*100));

  return (
    <div style={{ background:bg,minHeight:"calc(100vh - 56px)",padding:"36px 60px" }}>
      <div style={{ maxWidth:960,margin:"0 auto" }}>
        {/* Header row */}
        <div style={{ display:"grid",gridTemplateColumns:"280px 1fr 240px",gap:24,marginBottom:28 }}>
          {/* Avatar + rank card */}
          <div style={{ background:bgC,borderRadius:20,padding:"24px",border:`1px solid rgba(139,47,214,0.25)`,display:"flex",flexDirection:"column",alignItems:"center",gap:12 }}>
            <div style={{ position:"relative" }}>
              <div style={{ width:88,height:88,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 30px ${rank.color}55`,border:`3px solid ${rank.color}` }}>
                <User size={36} color="#fff"/>
              </div>
              <div style={{ position:"absolute",bottom:-4,right:-4,width:28,height:28,borderRadius:"50%",background:bgC,border:`2px solid ${rank.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>{rank.emoji}</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <p className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,margin:0 }}>{u.name}</p>
              <p className="ghi" style={{ fontSize:12,color:txS,margin:"2px 0 0" }}>{u.handle}</p>
            </div>
            {/* Level badge */}
            <div style={{ background:`${rank.color}18`,border:`1px solid ${rank.color}55`,borderRadius:50,padding:"6px 18px",display:"flex",alignItems:"center",gap:7,boxShadow:`0 0 14px ${rank.color}33` }}>
              <Medal size={14} color={rank.color}/>
              <span className="ghr" style={{ fontSize:14,fontWeight:700,color:rank.color,letterSpacing:"0.06em" }}>RANGO {u.level.toUpperCase()}</span>
            </div>
            {/* XP bar */}
            <div style={{ width:"100%" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                <span className="ghi" style={{ fontSize:11,color:txS }}>XP: <span style={{ color:rank.color,fontWeight:700 }}>{u.xp.toLocaleString()}</span></span>
                {nextRank&&<span className="ghi" style={{ fontSize:11,color:txS }}>{nextRank.emoji} {nextLvl}: {nextRank.min}</span>}
              </div>
              <div style={{ height:8,borderRadius:4,background:"rgba(255,255,255,0.1)",overflow:"hidden" }}>
                <div style={{ height:"100%",width:`${pct}%`,borderRadius:4,background:`linear-gradient(90deg,${rank.color},${mg})`,boxShadow:`0 0 8px ${rank.color}88`,transition:"width 0.5s" }}/>
              </div>
              <p className="ghi" style={{ fontSize:9,color:txS,marginTop:3,textAlign:"right" }}>{pct}% para {nextLvl}</p>
            </div>
            {/* Stats */}
            <div style={{ width:"100%",borderTop:`1px solid rgba(139,47,214,0.15)`,paddingTop:12,display:"flex",flexDirection:"column",gap:6 }}>
              {[{ l:"Miembro desde", v:u.joinDate },{ l:"Pedidos totales", v:u.totalOrders },{ l:"Total gastado", v:`$${u.totalSpent.toLocaleString()}` }].map(({ l,v })=>(
                <div key={l} style={{ display:"flex",justifyContent:"space-between" }}>
                  <span className="ghi" style={{ fontSize:11,color:txS }}>{l}</span>
                  <span className="ghi" style={{ fontSize:11,color:tx,fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Orders + XP feed */}
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            {/* Recent orders */}
            <div style={{ background:bgC,borderRadius:16,border:`1px solid rgba(139,47,214,0.2)`,overflow:"hidden" }}>
              <div style={{ padding:"14px 20px",borderBottom:`1px solid rgba(139,47,214,0.15)`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                <span className="ghr" style={{ fontSize:15,fontWeight:700,color:tx,letterSpacing:"0.04em" }}>PEDIDOS RECIENTES</span>
                <button onClick={()=>onNav("cart")} style={{ background:"none",border:"none",cursor:"pointer",color:mg,fontSize:12,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>Ver todos →</button>
              </div>
              {PROFILE_ORDERS.map((o,i)=>{
                const cfg=STATUS_CFG[o.status];
                return (
                  <div key={o.id} style={{ display:"flex",alignItems:"center",gap:14,padding:"12px 20px",borderBottom:i<PROFILE_ORDERS.length-1?`1px solid rgba(139,47,214,0.1)`:"none" }}>
                    <div style={{ width:40,height:40,borderRadius:9,background:bgE,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid rgba(139,47,214,0.2)` }}><Package size={16} color={cfg.color}/></div>
                    <div style={{ flex:1 }}>
                      <p className="ghi" style={{ fontSize:13,fontWeight:700,color:tx,margin:0 }}>{o.id}</p>
                      <p className="ghi" style={{ fontSize:10,color:txS,margin:"2px 0 0" }}>{o.date} · {o.items} artículos</p>
                    </div>
                    <span style={{ padding:"3px 9px",borderRadius:5,fontSize:10,fontWeight:700,background:cfg.bg,color:cfg.color,fontFamily:"'Inter',sans-serif" }}>{cfg.label}</span>
                    <span className="ghr" style={{ fontSize:14,fontWeight:700,color:mg,flexShrink:0 }}>${o.total.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            {/* XP Activity feed */}
            <div style={{ background:bgC,borderRadius:16,border:`1px solid rgba(139,47,214,0.2)`,padding:"16px 20px" }}>
              <p className="ghr" style={{ fontSize:15,fontWeight:700,color:tx,letterSpacing:"0.04em",marginBottom:12 }}>ACTIVIDAD XP</p>
              {[{ ev:"Compra confirmada",      pts:"+120 XP", color:ok  },{ ev:"Reseña publicada",       pts:"+30 XP",  color:cy  },{ ev:"Referido registrado",   pts:"+75 XP",  color:vi  },{ ev:"Primera compra del mes", pts:"+50 XP",  color:mg  }].map(({ ev,pts,color })=>(
                <div key={ev} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid rgba(139,47,214,0.08)` }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}><Zap size={13} color={color}/><span className="ghi" style={{ fontSize:12,color:tx }}>{ev}</span></div>
                  <span className="ghi" style={{ fontSize:12,fontWeight:700,color:color }}>{pts}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges col */}
          <div style={{ background:bgC,borderRadius:16,border:`1px solid rgba(139,47,214,0.2)`,padding:"18px" }}>
            <p className="ghr" style={{ fontSize:15,fontWeight:700,color:tx,letterSpacing:"0.04em",marginBottom:14 }}>LOGROS</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
              {BADGES_PROFILE.map(b=>(
                <div key={b.name} style={{ background:b.earned?bgE:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 10px",textAlign:"center",border:`1px solid ${b.earned?"rgba(255,183,0,0.3)":"rgba(255,255,255,0.06)"}`,opacity:b.earned?1:0.45,boxShadow:b.earned?`0 0 12px rgba(255,183,0,0.1)`:"none",transition:"all 0.2s" }}>
                  <div style={{ fontSize:24,marginBottom:5 }}>{b.emoji}</div>
                  <p className="ghr" style={{ fontSize:11,fontWeight:700,color:b.earned?tx:txS,margin:0,lineHeight:1.1 }}>{b.name}</p>
                  <p className="ghi" style={{ fontSize:8,color:txS,margin:"3px 0 0",lineHeight:1.3 }}>{b.desc}</p>
                  {!b.earned&&<p className="ghi" style={{ fontSize:8,color:"rgba(255,255,255,0.2)",marginTop:2 }}>Bloqueado</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: quick links */}
        <div style={{ display:"flex",gap:12 }}>
          {[{ Icon:ShoppingCart,l:"Ir a tienda",fn:()=>onNav("home"),c:mg },{ Icon:HelpCircle,l:"Soporte",fn:()=>onNav("support"),c:cy },{ Icon:Settings,l:"Accesibilidad",fn:()=>onNav("accessibility"),c:vi },{ Icon:MessageCircle,l:"GameBot",fn:()=>onNav("chat"),c:go }].map(({ Icon,l,fn,c })=>(
            <button key={l} onClick={fn} style={{ flex:1,padding:"13px",borderRadius:12,background:bgC,border:`1px solid rgba(139,47,214,0.2)`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,color:c,fontSize:13,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,letterSpacing:"0.04em",transition:"all 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.background=`${c}12`)}
              onMouseLeave={e=>(e.currentTarget.style.background=bgC)}>
              <Icon size={15}/>{l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PROFILE & GAMIFICATION — MOBILE
═══════════════════════════════════════ */

export function ProfileMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const u = USER_PROFILE;
  const rank = RANK_CFG[u.level];
  const xpInLevel = u.xp - rank.min;
  const xpTotal   = rank.max - rank.min;
  const pct       = Math.min(100, Math.round((xpInLevel/xpTotal)*100));

  return (
    <div style={{ background:bg,height:"100%",overflowY:"auto" }} className="thin-scroll">
      {/* Hero gradient header */}
      <div style={{ background:`linear-gradient(160deg,${vi}55,${mg}22,${bg})`,padding:"24px 16px 20px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",right:-30,top:-30,width:160,height:160,borderRadius:"50%",background:`${rank.color}18` }}/>
        <div style={{ display:"flex",alignItems:"flex-end",gap:14,position:"relative" }}>
          <div style={{ position:"relative" }}>
            <div style={{ width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",border:`3px solid ${rank.color}`,boxShadow:`0 0 22px ${rank.color}44` }}>
              <User size={28} color="#fff"/>
            </div>
            <div style={{ position:"absolute",bottom:-4,right:-4,width:24,height:24,borderRadius:"50%",background:bgC,border:`2px solid ${rank.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>{rank.emoji}</div>
          </div>
          <div>
            <p className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,margin:0 }}>{u.name}</p>
            <p className="ghi" style={{ fontSize:11,color:txS,margin:"2px 0 4px" }}>{u.handle}</p>
            <div style={{ display:"inline-flex",alignItems:"center",gap:5,background:`${rank.color}18`,border:`1px solid ${rank.color}55`,borderRadius:50,padding:"3px 10px" }}>
              <Medal size={11} color={rank.color}/>
              <span className="ghr" style={{ fontSize:11,fontWeight:700,color:rank.color }}>RANGO {u.level.toUpperCase()}</span>
            </div>
          </div>
        </div>
        {/* XP bar */}
        <div style={{ marginTop:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
            <span className="ghi" style={{ fontSize:11,color:txS }}>XP: <span style={{ color:rank.color,fontWeight:700 }}>{u.xp.toLocaleString()}</span></span>
            <span className="ghi" style={{ fontSize:11,color:txS }}>Platinum: 3,001</span>
          </div>
          <div style={{ height:7,borderRadius:4,background:"rgba(255,255,255,0.1)",overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${pct}%`,borderRadius:4,background:`linear-gradient(90deg,${rank.color},${mg})`,boxShadow:`0 0 8px ${rank.color}66` }}/>
          </div>
          <p className="ghi" style={{ fontSize:9,color:txS,marginTop:2 }}>{pct}% hacia Platinum</p>
        </div>
      </div>

      <div style={{ padding:"14px 16px 24px" }}>
        {/* Stats chips */}
        <div style={{ display:"flex",gap:10,marginBottom:16 }}>
          {[{ l:"Pedidos",v:u.totalOrders,c:vi },{ l:"Gastado",v:`$${(u.totalSpent/1000).toFixed(1)}k`,c:mg },{ l:"Desde",v:"2022",c:cy }].map(({ l,v,c })=>(
            <div key={l} style={{ flex:1,background:bgC,borderRadius:10,padding:"11px 8px",textAlign:"center",border:`1px solid rgba(139,47,214,0.2)` }}>
              <p className="ghr" style={{ fontSize:18,fontWeight:700,color:c,margin:0 }}>{v}</p>
              <p className="ghi" style={{ fontSize:9,color:txS,margin:0 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Badges horizontal scroll */}
        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:10 }}>LOGROS</p>
        <div style={{ display:"flex",gap:10,overflowX:"auto",marginBottom:18 }} className="no-scroll">
          {BADGES_PROFILE.map(b=>(
            <div key={b.name} style={{ minWidth:80,flexShrink:0,background:bgC,borderRadius:12,padding:"12px 8px",textAlign:"center",border:`1px solid ${b.earned?"rgba(255,183,0,0.3)":"rgba(255,255,255,0.06)"}`,opacity:b.earned?1:0.45 }}>
              <div style={{ fontSize:22,marginBottom:4 }}>{b.emoji}</div>
              <p className="ghr" style={{ fontSize:10,fontWeight:700,color:b.earned?tx:txS,margin:0,lineHeight:1.1 }}>{b.name}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:10 }}>PEDIDOS RECIENTES</p>
        <div style={{ background:bgC,borderRadius:12,border:`1px solid rgba(139,47,214,0.2)`,overflow:"hidden",marginBottom:16 }}>
          {PROFILE_ORDERS.map((o,i)=>{
            const cfg=STATUS_CFG[o.status];
            return (
              <div key={o.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderBottom:i<PROFILE_ORDERS.length-1?`1px solid rgba(139,47,214,0.1)`:"none" }}>
                <div style={{ width:34,height:34,borderRadius:8,background:bgE,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Package size={13} color={cfg.color}/></div>
                <div style={{ flex:1 }}>
                  <p className="ghi" style={{ fontSize:12,fontWeight:700,color:vi,margin:0 }}>{o.id}</p>
                  <p className="ghi" style={{ fontSize:10,color:txS,margin:"1px 0 0" }}>{o.date}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p className="ghr" style={{ fontSize:13,fontWeight:700,color:mg,margin:0 }}>${o.total.toFixed(2)}</p>
                  <span style={{ fontSize:9,padding:"1px 6px",borderRadius:3,background:cfg.bg,color:cfg.color,fontFamily:"'Inter',sans-serif",fontWeight:700 }}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
          {[{ Icon:HelpCircle,l:"Soporte",fn:()=>onNav("support"),c:cy },{ Icon:MessageCircle,l:"GameBot",fn:()=>onNav("chat"),c:mg },{ Icon:Gift,l:"Canjear XP",fn:()=>{},c:go }].map(({ Icon,l,fn,c })=>(
            <button key={l} onClick={fn} style={{ padding:"13px",borderRadius:12,background:bgC,border:`1px solid rgba(139,47,214,0.2)`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,color:c,fontSize:12,fontFamily:"'Rajdhani',sans-serif",fontWeight:700 }}>
              <Icon size={14}/>{l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ACCESSIBILITY SETTINGS — DESKTOP
═══════════════════════════════════════ */

export function AccessibilityDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [cfg, setCfg] = useState<A11YState>(A11Y_INIT);
  const toggle = (k:keyof A11YState) => setCfg(p=>({ ...p,[k]:!p[k] }));
  const setScale = (v:100|125|150) => setCfg(p=>({ ...p,textScale:v }));

  return (
    <div style={{ background:bg,minHeight:"calc(100vh - 56px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"44px 24px" }}>
      <div style={{ width:"100%",maxWidth:820 }}>
        {/* Header */}
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:32 }}>
          <div style={{ width:48,height:48,borderRadius:14,background:`rgba(0,240,255,0.12)`,border:`1px solid rgba(0,240,255,0.35)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:GC }}><Eye size={22} color={cy}/></div>
          <div>
            <h2 className="ghr" style={{ fontSize:24,fontWeight:700,color:tx,letterSpacing:"0.04em",margin:0 }}>ACCESIBILIDAD</h2>
            <p className="ghi" style={{ fontSize:12,color:txS,margin:0 }}>Personaliza tu experiencia para una navegación óptima</p>
          </div>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:28 }}>
          {/* Visual */}
          <div>
            <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:14 }}>AJUSTES VISUALES</p>
            <A11YSwitch on={cfg.highContrast} toggle={()=>toggle("highContrast")} label="Alto contraste" sub="Aumenta el contraste para mejor legibilidad" color={cy}/>
            {/* Text scale segmented */}
            <div style={{ padding:"14px 18px",borderRadius:12,background:bgE,border:`1px solid rgba(139,47,214,0.2)`,marginBottom:10 }}>
              <p className="ghi" style={{ fontSize:13,fontWeight:600,color:tx,margin:"0 0 10px" }}>Escala de texto</p>
              <div style={{ display:"flex",gap:8 }}>
                {([100,125,150] as const).map(v=>(
                  <button key={v} onClick={()=>setScale(v)} style={{ flex:1,padding:"9px",borderRadius:8,border:`1px solid ${cfg.textScale===v?cy+"66":"rgba(255,255,255,0.1)"}`,background:cfg.textScale===v?`rgba(0,240,255,0.12)`:"transparent",color:cfg.textScale===v?cy:txS,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",boxShadow:cfg.textScale===v?GC:"none",transition:"all 0.2s" }}>{v}%</button>
                ))}
              </div>
            </div>
            <A11YSwitch on={cfg.colorblind} toggle={()=>toggle("colorblind")} label="Modo daltónico" sub="Paleta optimizada para daltonismo" color={go}/>
            <A11YSwitch on={cfg.reduceMotion} toggle={()=>toggle("reduceMotion")} label="Reducir movimiento" sub="Desactiva animaciones y transiciones" color={vi}/>
          </div>
          {/* Navigation */}
          <div>
            <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:14 }}>NAVEGACIÓN & LECTORES</p>
            <A11YSwitch on={cfg.screenReader} toggle={()=>toggle("screenReader")} label="Lector de pantalla" sub="Compatible con NVDA, JAWS y VoiceOver" color={mg}/>
            <A11YSwitch on={cfg.keyboardNav} toggle={()=>toggle("keyboardNav")} label="Navegación por teclado" sub="Tab, Enter, flechas y atajos activos" color={cy}/>
            {/* Preview card */}
            <div style={{ background:bgC,borderRadius:14,padding:"18px",border:`1px solid rgba(139,47,214,0.25)`,marginTop:6 }}>
              <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:10 }}>PREVISUALIZACIÓN</p>
              <div style={{ padding:"16px",borderRadius:10,background:cfg.highContrast?"#fff":bgE,border:`2px solid ${cfg.highContrast?"#000":mg+"44"}`,transition:"all 0.3s" }}>
                <p className="ghi" style={{ fontSize:cfg.textScale===100?13:cfg.textScale===125?16:20,color:cfg.highContrast?"#000":tx,margin:0,fontWeight:cfg.highContrast?700:400,transition:"all 0.3s",lineHeight:1.5 }}>ProVision VR X2 — $599.99</p>
                <p className="ghi" style={{ fontSize:cfg.textScale===100?11:cfg.textScale===125?14:17,color:cfg.highContrast?"#333":"#9B8AB0",marginTop:6,transition:"all 0.3s" }}>Visor de Realidad Virtual 4K · En stock</p>
                <div style={{ marginTop:10,height:8,borderRadius:4,background:cfg.highContrast?"#000":mg,width:"75%",transition:"all 0.3s" }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Save + reset */}
        <div style={{ display:"flex",gap:12,marginTop:28 }}>
          <NeonBtn variant="primary" style={{ padding:"13px 32px" }} onClick={()=>{}}>
            <Check size={15}/>Guardar preferencias
          </NeonBtn>
          <NeonBtn variant="ghost" onClick={()=>setCfg(A11Y_INIT)}>
            <RotateCcw size={13}/>Restablecer
          </NeonBtn>
          <button onClick={()=>onNav("profile")} style={{ marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:txS,fontSize:13,fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:5 }}>
            <ChevronLeft size={13}/>Volver al perfil
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ACCESSIBILITY SETTINGS — MOBILE
═══════════════════════════════════════ */

export function AccessibilityMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [cfg, setCfg] = useState<A11YState>(A11Y_INIT);
  const toggle = (k:keyof A11YState) => setCfg(p=>({ ...p,[k]:!p[k] }));
  const setScale = (v:100|125|150) => setCfg(p=>({ ...p,textScale:v }));

  return (
    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>
      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,display:"flex",alignItems:"center",gap:10 }}>
        <button onClick={()=>onNav("profile")} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><ChevronLeft size={22}/></button>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <Eye size={16} color={cy}/>
          <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>ACCESIBILIDAD</span>
        </div>
      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"16px 16px",display:"flex",flexDirection:"column",gap:4 }} className="thin-scroll">
        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",margin:"8px 0 10px" }}>AJUSTES VISUALES</p>
        <A11YSwitch on={cfg.highContrast} toggle={()=>toggle("highContrast")} label="Alto contraste" sub="Aumenta contraste para mayor legibilidad" color={cy}/>
        {/* Text scale */}
        <div style={{ padding:"14px 16px",borderRadius:12,background:bgE,border:`1px solid rgba(139,47,214,0.2)`,marginBottom:10 }}>
          <p className="ghi" style={{ fontSize:13,fontWeight:600,color:tx,margin:"0 0 10px" }}>Escala de texto</p>
          <div style={{ display:"flex",gap:8 }}>
            {([100,125,150] as const).map(v=>(
              <button key={v} onClick={()=>setScale(v)} style={{ flex:1,padding:"10px",borderRadius:8,border:`1px solid ${cfg.textScale===v?cy+"66":"rgba(255,255,255,0.1)"}`,background:cfg.textScale===v?`rgba(0,240,255,0.12)`:"transparent",color:cfg.textScale===v?cy:txS,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif" }}>{v}%</button>
            ))}
          </div>
        </div>
        <A11YSwitch on={cfg.colorblind} toggle={()=>toggle("colorblind")} label="Modo daltónico" sub="Paleta optimizada" color={go}/>
        <A11YSwitch on={cfg.reduceMotion} toggle={()=>toggle("reduceMotion")} label="Reducir movimiento" color={vi}/>

        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",margin:"14px 0 10px" }}>NAVEGACIÓN & LECTORES</p>
        <A11YSwitch on={cfg.screenReader} toggle={()=>toggle("screenReader")} label="Lector de pantalla" sub="Compatible con TalkBack / VoiceOver" color={mg}/>
        <A11YSwitch on={cfg.keyboardNav} toggle={()=>toggle("keyboardNav")} label="Navegación por teclado" color={cy}/>

        {/* Preview */}
        <div style={{ background:bgC,borderRadius:12,padding:"14px",border:`1px solid rgba(139,47,214,0.2)`,marginTop:10 }}>
          <p className="ghi" style={{ fontSize:9,color:txS,letterSpacing:"0.07em",marginBottom:10 }}>PREVISUALIZACIÓN</p>
          <div style={{ padding:"14px",borderRadius:8,background:cfg.highContrast?"#fff":bgE,border:`2px solid ${cfg.highContrast?"#000":mg+"33"}`,transition:"all 0.3s" }}>
            <p className="ghi" style={{ fontSize:cfg.textScale===100?12:cfg.textScale===125?15:19,color:cfg.highContrast?"#000":tx,margin:0,fontWeight:cfg.highContrast?700:400,transition:"all 0.3s" }}>ProVision VR X2 — $599.99</p>
            <p className="ghi" style={{ fontSize:cfg.textScale===100?10:cfg.textScale===125?12:16,color:cfg.highContrast?"#333":txS,marginTop:4,transition:"all 0.3s" }}>Visor VR 4K · En stock (14 uds.)</p>
          </div>
        </div>
      </div>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderTop:`1px solid rgba(139,47,214,0.2)`,display:"flex",gap:10 }}>
        <NeonBtn variant="ghost" small onClick={()=>setCfg(A11Y_INIT)} style={{ padding:"12px 14px" }}><RotateCcw size={12}/>Reset</NeonBtn>
        <NeonBtn variant="primary" full style={{ padding:"13px" }}><Check size={14}/>Guardar preferencias</NeonBtn>
      </div>
    </div>
  );
}

