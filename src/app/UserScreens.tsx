import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Phone, Video, Languages, Medal, BookOpen, HelpCircle, Lock, Cpu, ThumbsUp, Gift, RotateCcw, ChevronLeft, ChevronRight, Search, Package, User, Zap, Shield, Truck, CreditCard, Settings, FileText, ExternalLink, Check, ToggleLeft, ToggleRight, Eye, Users, Headphones, Star, Download, ShoppingCart, X, Camera, RefreshCw, VolumeX, Play, Square } from "lucide-react";
import { bg, bgC, bgE, mg, vi, cy, go, ok, tx, txS, GM, GV, GC, GG, NeonBtn, Stars, OrderStatus, STATUS_CFG } from "./shared";
import { toast } from "sonner";

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

export const LSM_GLOSSARY: Record<string, { desc: string; hands: string; movement: string }> = {
  "Hola": { desc: "Mano derecha en forma de 'H' (dedos índice y medio extendidos) partiendo de la frente hacia el frente.", hands: "Índice y medio extendidos", movement: "Movimiento de arco corto al frente" },
  "Gracias": { desc: "Mano derecha extendida con el dedo medio ligeramente doblado hacia el frente, tocando la barbilla y bajando al frente.", hands: "Palma abierta, dedo medio inclinado", movement: "Tocar barbilla y mover al frente" },
  "Por favor": { desc: "Palmas juntas al centro del pecho con una ligera inclinación de cabeza.", hands: "Palmas unidas", movement: "Inclinación de reverencia" },
  "Comprar": { desc: "Mano izquierda plana como base (dinero), mano derecha golpea ligeramente con los dedos en forma de gancho.", hands: "Derecha en gancho, izquierda plana", movement: "Golpes sutiles sobre la palma" },
  "Carrito": { desc: "Ambas manos simulan sostener el manubrio de un carrito de compras y avanzan hacia el frente.", hands: "Manos empuñadas", movement: "Empujar hacia adelante" },
  "Garantía": { desc: "Mano derecha sobre el pecho con el puño cerrado, luego golpea suavemente la palma izquierda abierta.", hands: "Puño derecho, palma izquierda", movement: "Golpear palma con puño" },
  "Envío": { desc: "Mano derecha sale de la frente con los dedos juntos expandiéndose hacia el frente simétricamente.", hands: "Dedos juntos abriéndose", movement: "Movimiento de proyectar" },
  "Soporte": { desc: "Mano izquierda plana orientada hacia arriba, mano derecha en puño golpeando la parte inferior de la izquierda (base de soporte).", hands: "Puño abajo de palma", movement: "Empujar hacia arriba" },
  "Falla": { desc: "Mano derecha con el dedo índice y medio formando una 'X' curvada, girando la muñeca dos veces.", hands: "Dedos curvados", movement: "Giro de muñeca" },
  "Devolución": { desc: "Mano derecha toma algo frente a ti y lo regresa hacia atrás sobre tu hombro en un movimiento circular.", hands: "Gesto de agarrar y lanzar", movement: "Arco hacia atrás" }
};

export function getArticleContent(title: string): { subtitle: string; content: string; steps: string[] } {
  const t = title.toLowerCase();
  if (t.includes("garantía") || t.includes("reclamación")) {
    return {
      subtitle: "Garantías y Reclamaciones de Hardware",
      content: "Todos los productos adquiridos en GameHub Store cuentan con una garantía de hardware estándar de 2 años. Sigue estas instrucciones para activar la cobertura extendida de 5 años.",
      steps: [
        "Localiza el número de serie de tu producto en la caja o debajo del dispositivo.",
        "Ve a la sección 'Mis Pedidos' y selecciona el artículo correspondiente.",
        "Haz clic en 'Registrar Garantía Extendida' e introduce el código de activación que viene con tu manual.",
        "Recibirás un comprobante digital en tu correo con la fecha límite de cobertura."
      ]
    };
  }
  if (t.includes("pedido") || t.includes("entrega") || t.includes("envío") || t.includes("dirección")) {
    return {
      subtitle: "Envíos y Seguimiento en Tiempo Real",
      content: "Puedes rastrear tus paquetes directamente desde tu perfil de usuario utilizando el mapa interactivo de logística.",
      steps: [
        "Inicia sesión y dirígete a tu 'Perfil'.",
        "En la pestaña 'Pedidos Recientes', localiza la orden en curso (ej. #GH-88472).",
        "Haz clic en el estado del envío para ver la ruta detallada del transportista en el mapa.",
        "Si observas retrasos inusuales, puedes contactar al conductor directo desde la interfaz."
      ]
    };
  }
  if (t.includes("pago") || t.includes("factura") || t.includes("rechazado")) {
    return {
      subtitle: "Métodos de Pago y Facturación Electrónica",
      content: "Aceptamos tarjetas de crédito/débito Visa, MasterCard, PayPal, y pagos en criptomonedas (BTC, ETH) para usuarios Gold y Platinum.",
      steps: [
        "Durante el Checkout, selecciona tu método de pago preferido en el paso 2.",
        "Si requieres factura XML/PDF, marca la casilla 'Requiero Factura Fiscal' e introduce tu RFC / datos de facturación.",
        "La factura se generará automáticamente a las 24 horas de confirmarse el pago.",
        "Puedes descargarla desde la pestaña de historial en tu perfil."
      ]
    };
  }
  return {
    subtitle: "Guía de Soporte GameHub",
    content: "Esta guía contiene información paso a paso detallada por nuestros técnicos para solucionar el inconveniente de manera inmediata.",
    steps: [
      "Asegúrate de que el dispositivo esté apagado y desconectado de la corriente eléctrica.",
      "Verifica si los drivers del sistema operativo están actualizados a la última versión.",
      "Reinicia la aplicación o consola e intenta realizar la acción nuevamente.",
      "Si el problema persiste, inicia un chat directo con GameBot IA para escalar con un agente."
    ]
  };
}

export function SupportDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [query,   setQuery]   = useState("");
  const [suggest, setSuggest] = useState(false);
  const [selCat,  setSelCat]  = useState("envios");
  const cat = FAQ_CATS.find(c=>c.id===selCat)!;
  const articles = FAQ_ARTICLES[selCat]??[];

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [loadPct, setLoadPct] = useState(0);
  const [readingArticle, setReadingArticle] = useState<{title:string; views:string; catColor:string} | null>(null);
  const [allArticlesModal, setAllArticlesModal] = useState<boolean>(false);

  const startLoading = (message: string, callback: () => void) => {
    setLoading(true);
    setLoadPct(0);
    setLoadingMsg(message);
    const interval = setInterval(() => {
      setLoadPct(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            callback();
          }, 200);
          return 100;
        }
        return p + 20;
      });
    }, 100);
  };

  return (
    <div style={{ background:bg,height:"calc(100vh - 56px)",overflowY:"auto",position:"relative" }} className="thin-scroll">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {loading && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(6, 0, 16, 0.85)",
          backdropFilter: "blur(10px)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            width: 280, padding: 24, borderRadius: 20, background: bgC,
            border: `1px solid rgba(139,47,214,0.3)`, textAlign: "center", boxShadow: GM
          }}>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 16px" }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                border: `3px solid rgba(139,47,214,0.15)`, borderTopColor: mg,
                animation: "spin 1s linear infinite"
              }}/>
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 13,
                fontWeight: 700, color: tx
              }}>{loadPct}%</div>
            </div>
            <p className="ghr" style={{ fontSize: 14, fontWeight: 700, color: tx, margin: "0 0 4px" }}>Cargando...</p>
            <p className="ghi" style={{ fontSize: 11, color: txS, margin: 0 }}>{loadingMsg}</p>
          </div>
        </div>
      )}

      {readingArticle && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(6, 0, 16, 0.85)",
          backdropFilter: "blur(12px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 900, padding: 24
        }}>
          <div className="fade-in" style={{
            width: "100%", maxWidth: 640, background: bgC,
            border: `1px solid ${readingArticle.catColor}55`, borderRadius: 20,
            padding: 28, boxShadow: `0 0 30px ${readingArticle.catColor}22`,
            position: "relative"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <span className="ghi" style={{ fontSize: 10, color: readingArticle.catColor, fontWeight: 700, letterSpacing: "0.1em" }}>ARTÍCULO DE SOPORTE</span>
              <button onClick={() => setReadingArticle(null)} style={{ background: "none", border: "none", cursor: "pointer", color: txS }}>
                <X size={20}/>
              </button>
            </div>
            <h3 className="ghr" style={{ fontSize: 24, fontWeight: 700, color: tx, margin: "0 0 6px" }}>{readingArticle.title}</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
              <span className="ghi" style={{ fontSize: 11, color: txS }}>{readingArticle.views} visitas</span>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: txS }}/>
              <span className="ghi" style={{ fontSize: 11, color: ok, fontWeight: 600 }}>Verificado por Expertos GameHub</span>
            </div>

            <div style={{ borderTop: `1px solid rgba(139,47,214,0.15)`, borderBottom: `1px solid rgba(139,47,214,0.15)`, padding: "20px 0", marginBottom: 20 }}>
              <p className="ghi" style={{ fontSize: 14, color: tx, lineHeight: 1.6, marginBottom: 16 }}>
                {getArticleContent(readingArticle.title).content}
              </p>
              <p className="ghr" style={{ fontSize: 13, fontWeight: 700, color: readingArticle.catColor, marginBottom: 10 }}>PASOS A SEGUIR:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {getArticleContent(readingArticle.title).steps.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${readingArticle.catColor}20`, border: `1px solid ${readingArticle.catColor}44`, color: readingArticle.catColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <span className="ghi" style={{ fontSize: 13, color: txS, lineHeight: 1.4 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="ghi" style={{ fontSize: 12, color: txS }}>¿Te resultó útil esta información?</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { toast.success("¡Gracias por tu valoración!"); setReadingArticle(null); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.3)", color: "#81C784", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>
                  <ThumbsUp size={12}/> Sí
                </button>
                <button onClick={() => { toast.info("Gracias. Canalizaremos esta sugerencia al equipo de soporte."); setReadingArticle(null); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "rgba(244,67,54,0.15)", border: "1px solid rgba(244,67,54,0.3)", color: "#E57373", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {allArticlesModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(6, 0, 16, 0.85)",
          backdropFilter: "blur(12px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 850, padding: 24
        }}>
          <div className="fade-in" style={{
            width: "100%", maxWidth: 500, background: bgC,
            border: `1px solid rgba(139,47,214,0.3)`, borderRadius: 20,
            padding: 24, boxShadow: GM, position: "relative"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <cat.Icon size={16} color={cat.color}/>
                <span className="ghr" style={{ fontSize: 16, fontWeight: 700, color: tx }}>TODOS LOS ARTÍCULOS: {cat.label.toUpperCase()}</span>
              </div>
              <button onClick={() => setAllArticlesModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: txS }}>
                <X size={20}/>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 360, overflowY: "auto" }} className="thin-scroll">
              {articles.map((a, i) => (
                <div key={i} onClick={() => {
                  setAllArticlesModal(false);
                  startLoading(`Desencriptando guía: "${a.title}"...`, () => {
                    setReadingArticle({ title: a.title, views: a.views, catColor: cat.color });
                  });
                }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, borderRadius: 10, background: bgE, border: `1px solid rgba(139,47,214,0.15)`, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.background = "rgba(139,47,214,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(139,47,214,0.15)"; e.currentTarget.style.background = bgE; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    <FileText size={14} color={cat.color}/>
                    <span className="ghi" style={{ fontSize: 12, color: tx, fontWeight: 500 }}>{a.title}</span>
                  </div>
                  <span className="ghi" style={{ fontSize: 10, color: txS, flexShrink: 0, marginLeft: 10 }}>{a.views} visitas</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
                <button onClick={() => {
                  startLoading(`Cargando todos los artículos de ${cat.label}...`, () => {
                    setAllArticlesModal(true);
                  });
                }} style={{ display:"flex",alignItems:"center",gap:5,color:cat.color,fontSize:12,fontWeight:600,background:`${cat.color}12`,border:`1px solid ${cat.color}44`,borderRadius:7,padding:"5px 12px",cursor:"pointer",fontFamily:"'Inter',sans-serif" }}>
                  Ver todos <ExternalLink size={11}/>
                </button>
              </div>
              {articles.map((a,i)=>(
                <div key={i} onClick={() => {
                  startLoading(`Desencriptando guía: "${a.title}"...`, () => {
                    setReadingArticle({ title: a.title, views: a.views, catColor: cat.color });
                  });
                }} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 22px",borderBottom:i<articles.length-1?`1px solid rgba(139,47,214,0.1)`:"none",cursor:"pointer" }}
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
              {[{ Icon:Phone,  label:"Llamada", sub:"Lun-Dom 9-21h", color:vi },
                { Icon:Video,  label:"Videollamada", sub:"Técnicos especializados", color:cy },
                { Icon:Languages, label:"Lengua de señas", sub:"LSM disponible", color:mg }].map(({ Icon,label,sub,color })=>(
                <button key={label} onClick={() => {
                  if (label === "Llamada") {
                    (window as any).pendingCall = "voice";
                    onNav("chat");
                  } else if (label === "Videollamada") {
                    (window as any).pendingCall = "video";
                    onNav("chat");
                  } else {
                    onNav("lsm");
                  }
                }} style={{ display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 0",background:"none",border:"none",cursor:"pointer",borderBottom:`1px solid rgba(139,47,214,0.1)`,transition:"opacity 0.15s" }}>
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

export function SupportMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [query,   setQuery]  = useState("");
  const [selCat,  setSelCat] = useState<string|null>(null);
  const cat = selCat?FAQ_CATS.find(c=>c.id===selCat):null;

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [loadPct, setLoadPct] = useState(0);
  const [readingArticle, setReadingArticle] = useState<{title:string; views:string; catColor:string} | null>(null);

  const startLoading = (message: string, callback: () => void) => {
    setLoading(true);
    setLoadPct(0);
    setLoadingMsg(message);
    const interval = setInterval(() => {
      setLoadPct(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            callback();
          }, 200);
          return 100;
        }
        return p + 20;
      });
    }, 100);
  };

  return (
    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column",position:"relative" }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {loading && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(6, 0, 16, 0.85)",
          backdropFilter: "blur(10px)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            width: 260, padding: 20, borderRadius: 20, background: bgC,
            border: `1px solid rgba(139,47,214,0.3)`, textAlign: "center", boxShadow: GM
          }}>
            <div style={{ position: "relative", width: 60, height: 60, margin: "0 auto 12px" }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                border: `3px solid rgba(139,47,214,0.15)`, borderTopColor: mg,
                animation: "spin 1s linear infinite"
              }}/>
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 11,
                fontWeight: 700, color: tx
              }}>{loadPct}%</div>
            </div>
            <p className="ghr" style={{ fontSize: 13, fontWeight: 700, color: tx, margin: "0 0 4px" }}>Cargando...</p>
            <p className="ghi" style={{ fontSize: 10, color: txS, margin: 0 }}>{loadingMsg}</p>
          </div>
        </div>
      )}

      {readingArticle && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(6, 0, 16, 0.85)",
          backdropFilter: "blur(12px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 900, padding: 16
        }}>
          <div className="fade-in" style={{
            width: "100%", background: bgC,
            border: `1px solid ${readingArticle.catColor}55`, borderRadius: 16,
            padding: 20, boxShadow: `0 0 20px ${readingArticle.catColor}22`,
            position: "relative"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span className="ghi" style={{ fontSize: 9, color: readingArticle.catColor, fontWeight: 700 }}>ARTÍCULO DE SOPORTE</span>
              <button onClick={() => setReadingArticle(null)} style={{ background: "none", border: "none", cursor: "pointer", color: txS }}>
                <X size={18}/>
              </button>
            </div>
            <h3 className="ghr" style={{ fontSize: 18, fontWeight: 700, color: tx, margin: "0 0 4px" }}>{readingArticle.title}</h3>
            <span className="ghi" style={{ fontSize: 10, color: txS, display: "block", marginBottom: 14 }}>{readingArticle.views} visitas</span>

            <div style={{ borderTop: `1px solid rgba(139,47,214,0.15)`, borderBottom: `1px solid rgba(139,47,214,0.15)`, padding: "14px 0", marginBottom: 14, maxHeight: 280, overflowY: "auto" }} className="thin-scroll">
              <p className="ghi" style={{ fontSize: 13, color: tx, lineHeight: 1.5, marginBottom: 12 }}>
                {getArticleContent(readingArticle.title).content}
              </p>
              <p className="ghr" style={{ fontSize: 11, fontWeight: 700, color: readingArticle.catColor, marginBottom: 8 }}>PASOS A SEGUIR:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {getArticleContent(readingArticle.title).steps.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: `${readingArticle.catColor}20`, border: `1px solid ${readingArticle.catColor}44`, color: readingArticle.catColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, marginTop: 1, flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <span className="ghi" style={{ fontSize: 12, color: txS, lineHeight: 1.3 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="ghi" style={{ fontSize: 11, color: txS, textAlign: "center" }}>¿Te resultó útil esta información?</span>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button onClick={() => { toast.success("¡Gracias por tu valoración!"); setReadingArticle(null); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px", borderRadius: 8, background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.3)", color: "#81C784", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                  Sí
                </button>
                <button onClick={() => { toast.info("Gracias por tu feedback"); setReadingArticle(null); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px", borderRadius: 8, background: "rgba(244,67,54,0.15)", border: "1px solid rgba(244,67,54,0.3)", color: "#E57373", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <div key={i} onClick={() => {
                  startLoading(`Desencriptando guía: "${a.title}"...`, () => {
                    setReadingArticle({ title: a.title, views: a.views, catColor: cat?.color ?? cy });
                  });
                }} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderBottom:i<arr.length-1?`1px solid rgba(139,47,214,0.1)`:"none",cursor:"pointer" }}>
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
  const [activeCall, setActiveCall] = useState<"voice" | "video" | null>(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  useEffect(() => {
    if ((window as any).pendingCall) {
      setActiveCall((window as any).pendingCall);
      delete (window as any).pendingCall;
    }
  }, []);

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
    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg,justifyContent:"center",padding:"32px 24px",position:"relative" }}>
      {activeCall && <CallModal type={activeCall} onClose={() => setActiveCall(null)} />}
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
              {[{ Icon:Phone,c:vi,title:"Llamada",type:"voice" as const },{ Icon:Video,c:cy,title:"Video",type:"video" as const },{ Icon:Languages,c:mg,title:"Señas",type:"lsm" as const }].map(({ Icon,c,title,type })=>(
                <button key={title} title={title} onClick={() => {
                  if (type === "lsm") {
                    onNav("lsm");
                  } else {
                    setActiveCall(type);
                  }
                }} style={{ width:34,height:34,borderRadius:8,background:`${c}18`,border:`1px solid ${c}33`,cursor:"pointer",color:c,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s" }}>
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
  const [activeCall, setActiveCall] = useState<"voice" | "video" | null>(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); },[msgs]);

  useEffect(() => {
    if ((window as any).pendingCall) {
      setActiveCall((window as any).pendingCall);
      delete (window as any).pendingCall;
    }
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString("es-ES",{ hour:"2-digit", minute:"2-digit" });
    const topic = QUICK_TOPICS.find(t=>input.toLowerCase().includes(t.label.toLowerCase().split(" ")[0]));
    setMsgs(m=>[...m,{ id:nextId,from:"user",text:input,time:now },{ id:nextId+1,from:"bot",text:topic?.reply??"Un momento… ¿Puedes darme más detalles?",time:now }]);
    setNextId(n=>n+2);
    setInput("");
  };

  return (
    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column",position:"relative" }}>
      {activeCall && <CallModal type={activeCall} onClose={() => setActiveCall(null)} />}
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
          {[{ Icon:Phone,c:vi,type:"voice" as const },{ Icon:Video,c:cy,type:"video" as const },{ Icon:Languages,c:mg,type:"lsm" as const }].map(({ Icon,c,type },i)=>(
            <button key={i} onClick={() => {
              if (type === "lsm") {
                onNav("lsm");
              } else {
                setActiveCall(type);
              }
            }} style={{ width:30,height:30,borderRadius:7,background:`${c}18`,border:`1px solid ${c}33`,cursor:"pointer",color:c,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={13}/></button>
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

export function ProfileDesktop({ onNav, role="guest", user }:{ onNav:(s:string)=>void; role?:string; user?:any }) {
  if (role === "guest") {
    return (
      <div style={{ background:bg, height:"calc(100vh - 56px)", overflowY:"auto", display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 24px" }} className="thin-scroll">
        <div style={{ background:bgC, borderRadius:20, padding:40, maxWidth:460, width:"100%", textAlign:"center", border:`1px solid rgba(139,47,214,0.25)`, boxShadow:GV }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:`rgba(139,47,214,0.15)`, border:`1px solid ${vi}44`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
            <User size={32} color={txS}/>
          </div>
          <h2 className="ghr" style={{ fontSize:26, fontWeight:700, color:tx, marginBottom:8 }}>MODO INVITADO</h2>
          <p className="ghi" style={{ fontSize:14, color:txS, marginBottom:24, lineHeight:1.6 }}>
            No has iniciado sesión. Crea una cuenta gamer o accede para acumular puntos XP, rastrear tus envíos y guardar tus preferencias.
          </p>
          <NeonBtn variant="primary" full onClick={() => onNav("login")} style={{ padding:"14px", justifyContent:"center", fontSize:15 }}>
            <LogIn size={18}/> INICIAR SESIÓN / REGISTRARSE
          </NeonBtn>
        </div>
      </div>
    );
  }

  const u = user || USER_PROFILE;
  const rank = RANK_CFG[u.level];
  const nextLvl = u.level==="Gold"?"Platinum":"—";
  const nextRank = nextLvl!=="—"?RANK_CFG[nextLvl as XPLevel]:null;
  const xpInLevel = u.xp - rank.min;
  const xpTotal   = rank.max - rank.min;
  const pct       = Math.min(100, Math.round((xpInLevel/xpTotal)*100));

  return (
    <div style={{ background:bg,height:"calc(100vh - 56px)",overflowY:"auto",padding:"36px 60px" }} className="thin-scroll">
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

export function ProfileMobile({ onNav, role="guest", user }:{ onNav:(s:string)=>void; role?:string; user?:any }) {
  if (role === "guest") {
    return (
      <div style={{ background:bg, padding:"60px 20px 80px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", minHeight:"60vh" }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:`rgba(139,47,214,0.15)`, border:`1px solid ${vi}44`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
          <User size={28} color={txS}/>
        </div>
        <h2 className="ghr" style={{ fontSize:22, fontWeight:700, color:tx, marginBottom:8 }}>MODO INVITADO</h2>
        <p className="ghi" style={{ fontSize:13, color:txS, marginBottom:24, lineHeight:1.5, maxWidth:320 }}>
          Inicia sesión o crea tu cuenta para guardar tu historial de compras y recompensas gamer.
        </p>
        <NeonBtn variant="primary" full onClick={() => onNav("login")} style={{ padding:"14px", justifyContent:"center", fontSize:15 }}>
          <LogIn size={18}/> INICIAR SESIÓN
        </NeonBtn>
      </div>
    );
  }

  const u = user || USER_PROFILE;
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

export function applyA11y(cfg: A11YState) {
  const root = document.documentElement;
  if (cfg.highContrast) {
    root.style.filter = "contrast(145%) brightness(115%)";
  } else if (cfg.colorblind) {
    root.style.filter = "saturate(150%) hue-rotate(20deg)";
  } else {
    root.style.filter = "none";
  }

  root.style.fontSize = cfg.textScale === 150 ? "18px" : cfg.textScale === 125 ? "17px" : "16px";

  if (cfg.reduceMotion) {
    root.setAttribute("data-reduce-motion", "true");
  } else {
    root.removeAttribute("data-reduce-motion");
  }
}

export function AccessibilityDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [cfg, setCfg] = useState<A11YState>(A11Y_INIT);
  const toggle = (k:keyof A11YState) => setCfg(p=>({ ...p,[k]:!p[k] }));
  const setScale = (v:100|125|150) => setCfg(p=>({ ...p,textScale:v }));

  useEffect(() => {
    applyA11y(cfg);
  }, [cfg]);

  return (
    <div style={{ background:bg,height:"calc(100vh - 56px)",overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"44px 24px" }} className="thin-scroll">
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
          <NeonBtn variant="primary" style={{ padding:"13px 32px" }} onClick={() => {
            applyA11y(cfg);
            try { localStorage.setItem("gamehub_a11y", JSON.stringify(cfg)); } catch (e) {}
            toast.success("Preferencias de accesibilidad guardadas y aplicadas con éxito");
          }}>
            <Check size={15}/>Guardar preferencias
          </NeonBtn>
          <NeonBtn variant="ghost" onClick={()=>{ setCfg(A11Y_INIT); applyA11y(A11Y_INIT); }}>
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
  const [cfg, setCfg] = useState<A11YState>(() => {
    try {
      const saved = localStorage.getItem("gamehub_a11y");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return A11Y_INIT;
  });
  const toggle = (k:keyof A11YState) => setCfg(p=>({ ...p,[k]:!p[k] }));
  const setScale = (v:100|125|150) => setCfg(p=>({ ...p,textScale:v }));

  useEffect(() => {
    applyA11y(cfg);
  }, [cfg]);

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
        <NeonBtn variant="ghost" small onClick={()=>{ setCfg(A11Y_INIT); applyA11y(A11Y_INIT); }} style={{ padding:"12px 14px" }}><RotateCcw size={12}/>Reset</NeonBtn>
        <NeonBtn variant="primary" full style={{ padding:"13px" }} onClick={() => {
          applyA11y(cfg);
          try { localStorage.setItem("gamehub_a11y", JSON.stringify(cfg)); } catch (e) {}
          toast.success("Preferencias de accesibilidad guardadas y aplicadas con éxito");
        }}><Check size={14}/>Guardar preferencias</NeonBtn>
      </div>
    </div>
  );
}

export function CallModal({ type, onClose }:{ type:"voice"|"video"; onClose:()=>void }) {
  const [status, setStatus] = useState("Conectando...");
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setStatus("Llamada en curso");
    }, 1500);

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    if (type === "video") {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.warn("Camera access denied or unavailable", err);
        });
    }

    return () => {
      clearTimeout(t);
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [type]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      const vTrack = streamRef.current.getVideoTracks()[0];
      if (vTrack) {
        vTrack.enabled = !vTrack.enabled;
        setCamOff(!vTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const aTrack = streamRef.current.getAudioTracks()[0];
      if (aTrack) {
        aTrack.enabled = !aTrack.enabled;
        setMuted(!aTrack.enabled);
      }
    } else {
      setMuted(!muted);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(6, 0, 16, 0.9)",
      backdropFilter: "blur(14px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1100, padding: 16
    }}>
      <style>{`
        .pulse-wave {
          width: 140px; height: 140px; border-radius: 50%;
          background: rgba(139,47,214,0.15);
          position: absolute; animation: pulseGlow 2s infinite ease-out;
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .eq-bar {
          width: 4px; border-radius: 2px; background: ${cy};
          animation: eqAnim 0.8s infinite ease-in-out alternate;
        }
        @keyframes eqAnim {
          0% { height: 6px; }
          100% { height: 36px; }
        }
      `}</style>

      <div style={{
        width: "100%", maxWidth: type === "video" ? 680 : 380, background: bgC,
        border: `1px solid rgba(139,47,214,0.35)`, borderRadius: 24,
        padding: 24, display: "flex", flexDirection: "column", alignItems: "center",
        boxShadow: GM, position: "relative", overflow: "hidden"
      }}>
        {type === "voice" ? (
          <>
            <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <div className="pulse-wave" />
              <div className="pulse-wave" style={{ animationDelay: "1s" }} />
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${vi}, ${mg})`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: GV }}>
                <Cpu size={36} color="#fff"/>
              </div>
            </div>

            <h3 className="ghr" style={{ fontSize: 20, fontWeight: 700, color: tx, margin: "0 0 4px" }}>GameBot IA</h3>
            <p className="ghi" style={{ fontSize: 13, color: muted ? mg : cy, fontWeight: 600, margin: "0 0 8px" }}>
              {muted ? "Silenciado" : status}
            </p>
            <p className="ghi" style={{ fontSize: 14, color: txS, margin: "0 0 24px" }}>
              {status === "Llamada en curso" ? formatTime(time) : "--:--"}
            </p>

            {!muted && status === "Llamada en curso" && (
              <div style={{ display: "flex", gap: 3, alignItems: "center", height: 40, marginBottom: 30 }}>
                {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4].map((delay, i) => (
                  <div key={i} className="eq-bar" style={{ animationDelay: `${delay}s`, background: i % 2 === 0 ? cy : mg }} />
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={toggleMic} style={{ width: 48, height: 48, borderRadius: "50%", background: muted ? `rgba(255,46,158,0.2)` : bgE, border: `1px solid ${muted ? mg : "rgba(139,47,214,0.3)"}`, color: muted ? mg : tx, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {muted ? <Headphones size={20}/> : <Cpu size={20}/>}
              </button>
              <button onClick={() => { toast.error("Llamada finalizada"); onClose(); }} style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(244,67,54,0.2)", border: "1px solid #F44336", color: "#EF5350", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={20}/>
              </button>
            </div>
          </>
        ) : (
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative", width: "100%", height: 380, borderRadius: 16, background: "#060010", overflow: "hidden", border: `1px solid rgba(139,47,214,0.2)` }}>
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${cy}, ${vi})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, boxShadow: `0 0 30px ${cy}44` }}>
                  <Cpu size={40} color="#fff"/>
                </div>
                <span className="ghr" style={{ fontSize: 16, fontWeight: 700, color: tx }}>Elena R. (Soporte Técnico)</span>
                <span className="ghi" style={{ fontSize: 11, color: cy }}>Agente de Soporte Asignado</span>
              </div>

              <div style={{ position: "absolute", bottom: 12, right: 12, width: 120, height: 160, borderRadius: 12, background: "#0c051a", border: `2px solid ${mg}`, overflow: "hidden", boxShadow: GV }}>
                {camOff && (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={24} color={txS}/>
                  </div>
                )}
                <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", display: camOff ? "none" : "block" }} />
                <div style={{ position: "absolute", bottom: 4, left: 6, display: "flex", alignItems: "center", gap: 3 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ok }}/>
                  <span className="ghi" style={{ fontSize: 8, color: "#fff", fontWeight: 700 }}>TÚ</span>
                </div>
              </div>

              <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(6,0,16,0.75)", padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: ok, animation: "stockPulseLow 1.5s infinite" }}/>
                <span className="ghi" style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>HD LIVE · {formatTime(time)}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={toggleCamera} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: camOff ? `rgba(255,46,158,0.15)` : bgE, border: `1px solid ${camOff ? mg : "rgba(139,47,214,0.3)"}`, color: camOff ? mg : tx, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                  <Video size={12}/> {camOff ? "Iniciar Vídeo" : "Detener Vídeo"}
                </button>
                <button onClick={toggleMic} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: muted ? `rgba(255,46,158,0.15)` : bgE, border: `1px solid ${muted ? mg : "rgba(139,47,214,0.3)"}`, color: muted ? mg : tx, cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                  <Headphones size={12}/> {muted ? "Unmute Mic" : "Mute Mic"}
                </button>
              </div>
              <button onClick={() => { toast.error("Videollamada finalizada"); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "rgba(244,67,54,0.15)", border: "1px solid #F44336", color: "#EF5350", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                Colgar <X size={12}/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LsmDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [transProgress, setTransProgress] = useState(0);
  const [transPhase, setTransPhase] = useState("");
  const [transCards, setTransCards] = useState<string[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [repeat, setRepeat] = useState(true);
  const [detectedSign, setDetectedSign] = useState("");
  const [detecting, setDetecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const glossaryWords = Object.keys(LSM_GLOSSARY);

  useEffect(() => {
    if (cameraActive) {
      setDetecting(true);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.warn("No camera access", err);
          setCameraActive(false);
          setDetecting(false);
        });
    } else {
      setDetecting(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraActive]);

  useEffect(() => {
    if (detecting) {
      const interval = setInterval(() => {
        const randomWords = ["Hola", "Gracias", "Comprar", "Carrito", "Soporte", "Garantía"];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        setDetectedSign(randomWord);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      setDetectedSign("");
    }
  }, [detecting]);

  const handleTranslate = () => {
    if (!inputVal.trim()) return;
    setIsTranslating(true);
    setTransProgress(0);
    setTransPhase("Dividiendo en componentes semánticos...");
    
    const interval = setInterval(() => {
      setTransProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsTranslating(false);
            const words = inputVal.trim().split(/\s+/);
            const found: string[] = [];
            words.forEach(w => {
              const clean = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
              const match = glossaryWords.find(gw => gw.toLowerCase() === clean.toLowerCase());
              if (match) {
                found.push(match);
              } else {
                for (let char of clean) {
                  if (/[a-zA-Z]/.test(char)) {
                    found.push(char.toUpperCase());
                  }
                }
              }
            });
            setTransCards(found);
            if (found.length > 0) {
              setActiveWord(found[0]);
            }
          }, 300);
          return 100;
        }
        const next = prev + 10;
        if (next === 40) setTransPhase("Traduciendo a estructura gramatical LSM...");
        if (next === 80) setTransPhase("Sincronizando movimientos del avatar virtual...");
        return next;
      });
    }, 150);
  };

  return (
    <div style={{ background:bg, height:"calc(100vh - 56px)", overflowY:"auto", padding:"32px 24px" }} className="thin-scroll">
      <style>{`
        @keyframes floatIdle {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes wavePulse {
          0% { r: 12px; opacity: 0.6; }
          100% { r: 40px; opacity: 0; }
        }
        @keyframes handSign {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(15deg) scale(1.1) translateX(5px); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .interpret-avatar-idle {
          animation: floatIdle 4s infinite ease-in-out;
        }
        .interpret-hand {
          animation: handSign 1s infinite ease-in-out;
          transform-origin: center;
        }
      `}</style>

      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
        <button onClick={()=>onNav("support")} style={{ background:"none", border:"none", cursor:"pointer", color:txS }}><ChevronLeft size={22}/></button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Languages size={20} color={mg}/>
          <h2 className="ghr" style={{ fontSize:22, fontWeight:700, color:tx, margin:0 }}>TRADUCTOR LENGUA DE SEÑAS MEXICANA (LSM)</h2>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", gap:24, maxWidth:1100, margin:"0 auto" }}>
        <div style={{ background:bgC, borderRadius:20, padding:20, border:`1px solid rgba(139,47,214,0.25)`, display:"flex", flexDirection:"column", gap:12 }}>
          <p className="ghi" style={{ fontSize:11, color:txS, fontWeight:700, letterSpacing:"0.08em", margin:0 }}>DICCIONARIO DE SEÑAS RÁPIDAS</p>
          <div style={{ flex:1, overflowY:"auto", maxHeight:500, display:"flex", flexDirection:"column", gap:8 }} className="thin-scroll">
            {glossaryWords.map(w => (
              <button key={w} onClick={() => { setActiveWord(w); setTransCards([]); }} style={{
                width:"100%", padding:"12px 14px", borderRadius:10, textAlign:"left", border:"none",
                background: activeWord === w ? `rgba(255,46,158,0.12)` : bgE,
                color: activeWord === w ? mg : tx, cursor:"pointer", transition:"all 0.2s",
                fontFamily:"'Inter',sans-serif", fontWeight:600, borderLeft:`3px solid ${activeWord === w ? mg : "transparent"}`
              }}
              onMouseEnter={e => { if (activeWord !== w) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (activeWord !== w) e.currentTarget.style.background = bgE; }}>
                {w}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div style={{ background:bgC, borderRadius:20, border:`1px solid rgba(139,47,214,0.25)`, padding:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:12, left:12, background:"rgba(0,240,255,0.08)", border:`1px solid ${cy}44`, borderRadius:5, padding:"3px 8px", fontSize:10, color:cy, fontWeight:700 }}>
                AVATAR INTERPRETE VIRTUAL
              </div>

              <div style={{ width:180, height:180, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }} className="interpret-avatar-idle">
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="45" r="32" fill="url(#haloGrad)" opacity="0.3"/>
                  <path d="M20 90C20 70 30 65 50 65C70 65 80 70 80 90H20Z" fill="url(#torsoGrad)"/>
                  <rect x="46" y="52" width="8" height="14" rx="2" fill="#5F2D99"/>
                  <circle cx="50" cy="40" r="16" fill="url(#headGrad)" stroke="#A05AFF" strokeWidth="1.5"/>
                  <rect x="40" y="34" width="20" height="6" rx="3" fill="#00FFFF" stroke="#00A8FF" strokeWidth="0.5"/>
                  <line x1="43" y1="37" x2="57" y2="37" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"/>
                  <path className="interpret-hand" d="M25 80C25 72 28 68 32 74" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round"/>
                  <path className="interpret-hand" d="M75 80C75 70 65 55 60 48" stroke={activeWord ? mg : "#A05AFF"} strokeWidth="4" strokeLinecap="round" style={{ animationDuration: activeWord ? `${1.5 / speed}s` : "3s" }}/>
                  {activeWord && (
                    <circle cx="60" cy="48" r="12" fill="none" stroke={mg} strokeWidth="1.5" style={{ transformOrigin: "60px 48px" }}>
                      <animate attributeName="r" values="4;16" dur="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="1s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <defs>
                    <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8B2FD6" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#150A24" stopOpacity="0"/>
                    </radialGradient>
                    <linearGradient id="torsoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b0f69"/>
                      <stop offset="100%" stopColor="#150A24"/>
                    </linearGradient>
                    <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A05AFF"/>
                      <stop offset="100%" stopColor="#5F2D99"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {activeWord ? (
                <div style={{ textAlign:"center", zIndex:2 }}>
                  <p className="ghr" style={{ fontSize:18, fontWeight:700, color:mg, margin:"0 0 6px" }}>Seña: "{activeWord}"</p>
                  <p className="ghi" style={{ fontSize:12, color:tx, lineHeight:1.4, margin:"0 auto", maxWidth:260 }}>
                    {LSM_GLOSSARY[activeWord]?.desc || `Deletreando letra: ${activeWord}`}
                  </p>
                  {LSM_GLOSSARY[activeWord] && (
                    <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:10 }}>
                      <span style={{ fontSize:9, background:"rgba(0,240,255,0.08)", color:cy, border:`1px solid ${cy}33`, padding:"2px 6px", borderRadius:4 }}>
                        Manos: {LSM_GLOSSARY[activeWord].hands}
                      </span>
                      <span style={{ fontSize:9, background:"rgba(255,46,158,0.08)", color:mg, border:`1px solid ${mg}33`, padding:"2px 6px", borderRadius:4 }}>
                        Mov: {LSM_GLOSSARY[activeWord].movement}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="ghi" style={{ fontSize:12, color:txS, margin:0, textAlign:"center" }}>Selecciona una palabra o escribe tu texto para comenzar la traducción.</p>
              )}

              <div style={{ display:"flex", gap:16, width:"100%", borderTop:`1px solid rgba(139,47,214,0.15)`, marginTop:16, paddingTop:12, justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span className="ghi" style={{ fontSize:10, color:txS }}>Velocidad:</span>
                  <select value={speed} onChange={e=>setSpeed(parseFloat(e.target.value))} style={{ background:bgE, border:`1px solid rgba(139,47,214,0.3)`, borderRadius:6, padding:"4px 8px", fontSize:11, color:tx, outline:"none" }}>
                    <option value="0.5">0.5x</option>
                    <option value="1">1.0x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                  </select>
                </div>
                <label style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer" }}>
                  <input type="checkbox" checked={repeat} onChange={e=>setRepeat(e.target.checked)} style={{ accentColor:mg }}/>
                  <span className="ghi" style={{ fontSize:10, color:txS }}>Bucle</span>
                </label>
              </div>
            </div>

            <div style={{ background:bgC, borderRadius:20, border:`1px solid rgba(139,47,214,0.25)`, padding:20, display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span className="ghi" style={{ fontSize:10, color:txS, fontWeight:700 }}>RECONOCIMIENTO LSM EN TIEMPO REAL (IA)</span>
                <button onClick={()=>setCameraActive(!cameraActive)} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 10px", borderRadius:6, background:cameraActive?`rgba(244,67,54,0.15)`:`rgba(0,240,255,0.12)`, border:`1px solid ${cameraActive?`rgba(244,67,54,0.4)`:`rgba(0,240,255,0.4)`}`, color:cameraActive?`#EF5350`:cy, fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
                  <Camera size={10}/> {cameraActive ? "Apagar Cámara" : "Encender Cámara"}
                </button>
              </div>

              <div style={{ position:"relative", flex:1, height:180, borderRadius:12, background:"#060010", border:`1px solid rgba(139,47,214,0.2)`, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {cameraActive ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted style={{ width:"100%", height:"100%", objectFit:"cover", transform:"scaleX(-1)" }} />
                    <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
                      <div style={{ position:"absolute", border:`2px solid ${cy}`, top:"25%", left:"35%", width:"30%", height:"40%", boxShadow:`0 0 10px ${cy}55` }}>
                        <span style={{ position:"absolute", top:-16, left:0, background:cy, color:"#060010", fontSize:8, fontWeight:700, padding:"1px 4px", borderRadius:2 }}>MANO DER (DETECTADA)</span>
                      </div>
                      {[
                        { t:"30%", l:"40%" }, { t:"35%", l:"45%" }, { t:"42%", l:"43%" }, { t:"48%", l:"46%" },
                        { t:"32%", l:"50%" }, { t:"39%", l:"52%" }, { t:"45%", l:"55%" }
                      ].map((pos, idx) => (
                        <div key={idx} style={{ position:"absolute", top:pos.t, left:pos.l, width:6, height:6, borderRadius:"50%", background:cy, boxShadow:`0 0 5px ${cy}` }} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign:"center", padding:20 }}>
                    <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}><Camera size={16} color={txS}/></div>
                    <p className="ghi" style={{ fontSize:11, color:txS, margin:0 }}>Permite el acceso a la cámara para iniciar la detección automática de señas mediante IA.</p>
                  </div>
                )}
              </div>

              <div style={{ background:bgE, borderRadius:10, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", border:`1px solid rgba(139,47,214,0.15)` }}>
                <div>
                  <p className="ghi" style={{ fontSize:9, color:txS, margin:0 }}>SEÑAL RECONOCIDA POR IA</p>
                  <p className="ghr" style={{ fontSize:14, fontWeight:700, color:detectedSign?cy:txS, margin:"2px 0 0" }}>
                    {detectedSign ? detectedSign.toUpperCase() : "ESPERANDO SEÑA..."}
                  </p>
                </div>
                {detectedSign && (
                  <span style={{ fontSize:9, background:`rgba(0,240,255,0.1)`, border:`1px solid ${cy}44`, color:cy, padding:"3px 8px", borderRadius:50, fontWeight:700 }}>98% Confianza</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ background:bgC, borderRadius:20, border:`1px solid rgba(139,47,214,0.25)`, padding:24 }}>
            <p className="ghi" style={{ fontSize:11, color:txS, fontWeight:700, letterSpacing:"0.08em", marginBottom:12 }}>TEXTO A TRADUCTOR LSM</p>
            <div style={{ display:"flex", gap:12 }}>
              <input value={inputVal} onChange={e=>setInputVal(e.target.value)} placeholder="Escribe una frase en español (ej. Hola por favor comprar soporte)..." style={{ flex:1, background:bgE, border:`1px solid rgba(139,47,214,0.35)`, borderRadius:12, padding:"14px 18px", color:tx, fontSize:13, outline:"none", fontFamily:"'Inter',sans-serif" }}/>
              <button onClick={handleTranslate} style={{ display:"flex", alignItems:"center", gap:8, padding:"0 24px", borderRadius:12, background:`linear-gradient(135deg, ${mg}, ${vi})`, border:"none", color:"#fff", fontWeight:700, cursor:"pointer", boxShadow:GM }}>
                Traducir <RefreshCw size={14}/>
              </button>
            </div>

            {isTranslating && (
              <div style={{ marginTop:16, borderTop:`1px solid rgba(139,47,214,0.15)`, paddingTop:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span className="ghi" style={{ fontSize:11, color:mg, fontWeight:600 }}>{transPhase}</span>
                  <span className="ghi" style={{ fontSize:11, color:txS }}>{transProgress}%</span>
                </div>
                <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ width:`${transProgress}%`, height:"100%", background:`linear-gradient(90deg, ${mg}, ${vi})`, transition:"all 0.15s" }}/>
                </div>
              </div>
            )}

            {!isTranslating && transCards.length > 0 && (
              <div style={{ marginTop:16, borderTop:`1px solid rgba(139,47,214,0.15)`, paddingTop:14 }}>
                <p className="ghi" style={{ fontSize:11, color:txS, marginBottom:10 }}>SECUENCIA DE TRADUCCIÓN:</p>
                <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8 }} className="thin-scroll">
                  {transCards.map((card, idx) => (
                    <div key={idx} onClick={() => setActiveWord(card)} style={{
                      padding:"10px 16px", borderRadius:10, background: activeWord === card ? `rgba(255,46,158,0.15)` : bgE,
                      border:`1px solid ${activeWord === card ? mg : "rgba(139,47,214,0.25)"}`, cursor:"pointer", flexShrink:0, textAlign:"center"
                    }}>
                      <span className="ghr" style={{ fontSize:13, fontWeight:700, color: activeWord === card ? mg : tx }}>{card}</span>
                      <span className="ghi" style={{ display:"block", fontSize:9, color:txS, marginTop:2 }}>Paso {idx+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LsmMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [transProgress, setTransProgress] = useState(0);
  const [transPhase, setTransPhase] = useState("");
  const [transCards, setTransCards] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1);
  const glossaryWords = Object.keys(LSM_GLOSSARY);

  const handleTranslate = () => {
    if (!inputVal.trim()) return;
    setIsTranslating(true);
    setTransProgress(0);
    setTransPhase("Procesando...");
    const interval = setInterval(() => {
      setTransProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsTranslating(false);
            const words = inputVal.trim().split(/\s+/);
            const found: string[] = [];
            words.forEach(w => {
              const clean = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
              const match = glossaryWords.find(gw => gw.toLowerCase() === clean.toLowerCase());
              if (match) found.push(match);
            });
            setTransCards(found);
            if (found.length > 0) setActiveWord(found[0]);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  return (
    <div style={{ background:bg, height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
      <div style={{ flexShrink:0, padding:"12px 16px", background:bgC, borderBottom:`1px solid rgba(139,47,214,0.2)`, display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={()=>onNav("support")} style={{ background:"none", border:"none", cursor:"pointer", color:txS }}><ChevronLeft size={22}/></button>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Languages size={18} color={mg}/>
          <span className="ghr" style={{ fontSize:15, fontWeight:700, color:tx }}>TRADUCTOR LSM</span>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:16 }} className="thin-scroll">
        <div style={{ background:bgC, borderRadius:16, border:`1px solid rgba(139,47,214,0.25)`, padding:16, display:"flex", flexDirection:"column", alignItems:"center", marginBottom:16 }}>
          <div style={{ width:120, height:120, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke={cy} strokeWidth="1.5"/>
              <circle cx="50" cy="40" r="14" fill={mg}/>
              <rect x="25" y="65" width="50" height="30" rx="6" fill={vi}/>
              <rect x="42" y="36" width="16" height="4" rx="2" fill="#fff"/>
            </svg>
          </div>
          {activeWord ? (
            <div style={{ textAlign:"center", marginTop:8 }}>
              <p className="ghr" style={{ fontSize:16, fontWeight:700, color:mg, margin:0 }}>"{activeWord}"</p>
              <p className="ghi" style={{ fontSize:11, color:tx, marginTop:4 }}>{LSM_GLOSSARY[activeWord]?.desc || `Deletreo`}</p>
            </div>
          ) : (
            <p className="ghi" style={{ fontSize:11, color:txS, textAlign:"center" }}>Escribe o selecciona una palabra abajo.</p>
          )}
        </div>

        <div style={{ background:bgC, borderRadius:16, border:`1px solid rgba(139,47,214,0.25)`, padding:16, marginBottom:16 }}>
          <div style={{ display:"flex", gap:8 }}>
            <input value={inputVal} onChange={e=>setInputVal(e.target.value)} placeholder="Frase en español..." style={{ flex:1, background:bgE, border:`1px solid rgba(139,47,214,0.3)`, borderRadius:10, padding:"10px 12px", color:tx, fontSize:12, outline:"none" }}/>
            <button onClick={handleTranslate} style={{ padding:"0 14px", borderRadius:10, background:`linear-gradient(135deg, ${mg}, ${vi})`, border:"none", color:"#fff", fontSize:12, fontWeight:700 }}>Traducir</button>
          </div>
          {isTranslating && (
            <div style={{ marginTop:10 }}>
              <div style={{ height:4, background:"rgba(255,255,255,0.1)", borderRadius:2, overflow:"hidden" }}>
                <div style={{ width:`${transProgress}%`, height:"100%", background:mg }}/>
              </div>
            </div>
          )}
          {transCards.length > 0 && (
            <div style={{ display:"flex", gap:6, overflowX:"auto", marginTop:12, paddingBottom:4 }}>
              {transCards.map((c, i) => (
                <button key={i} onClick={()=>setActiveWord(c)} style={{ padding:"6px 12px", borderRadius:8, background:activeWord===c?mg:bgE, border:`1px solid ${activeWord===c?mg:"rgba(255,255,255,0.1)"}`, color:"#fff", fontSize:11, flexShrink:0 }}>{c}</button>
              ))}
            </div>
          )}
        </div>

        <div style={{ background:bgC, borderRadius:16, border:`1px solid rgba(139,47,214,0.25)`, padding:16 }}>
          <p className="ghi" style={{ fontSize:10, color:txS, fontWeight:700, marginBottom:10 }}>GLOSARIO LSM</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {glossaryWords.map(w => (
              <button key={w} onClick={()=>{ setActiveWord(w); setTransCards([]); }} style={{ padding:"10px", borderRadius:8, background:bgE, border:`1px solid ${activeWord===w?mg:"rgba(255,255,255,0.05)"}`, color:activeWord===w?mg:tx, fontSize:11, textAlign:"left", fontWeight:600 }}>{w}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

