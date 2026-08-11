import { useState, useEffect, useRef } from "react";

import { Laptop, Smartphone, LogIn, Wifi, Battery, Menu, X, ChevronDown, Eye, Search, ShoppingCart, User, Bell } from "lucide-react";

import {

  GH_CSS, bg, bgC, bgE, mg, vi, cy, ok, tx, txS, GM, GC,

  CartItemType, CART_INIT,

  BottomNav, SearchOverlay,

  HomeDesktop, HomeMobile,

  CatalogDesktop, CatalogMobile,

  ProductDetailDesktop, ProductDetailMobile,

  CompareDesktop, CompareMobile,

  CartDesktop, CartMobile,

  CheckoutShipDesktop, CheckoutShipMobile,

  CheckoutPayDesktop, CheckoutPayMobile,

  CheckoutReviewDesktop, CheckoutReviewMobile,

  ConfirmDesktop, ConfirmMobile,

  Product, GHLogo, NeonBtn, SimpleFooter, PRODUCTS,

} from "./shared";

import {

  AdminDashboardDesktop, AdminDashboardMobile,

  AdminCatalogDesktop, AdminCatalogMobile,

  AdminLogisticsDesktop, AdminLogisticsMobile,

} from "./AdminScreens";

import {

  SupportDesktop, SupportMobile,

  ChatDesktop, ChatMobile,

  ProfileDesktop, ProfileMobile,

  AccessibilityDesktop, AccessibilityMobile,

  LsmDesktop, LsmMobile,

} from "./UserScreens";

import { AuthDesktop, AuthMobile, AuthRole } from "./AuthScreens";

import { Toaster, toast } from "sonner";
import { ChevronLeft } from "lucide-react";

import { ChevronLeft } from "lucide-react";

import { ChevronLeft } from "lucide-react";

const CHECKOUT_SCREENS = ["checkout-1","checkout-2","checkout-3"];

function PhoneFrame({ children, activeNav="home", onNav, screen, hideBottomNav=false }:{

  children:React.ReactNode; activeNav?:string;

  onNav:(s:string)=>void; screen:string; hideBottomNav?:boolean;

}) {

  const showBottomNav = !hideBottomNav && !CHECKOUT_SCREENS.includes(screen) && screen!=="search";

  return (

    <div style={{ display:"flex",justifyContent:"center",padding:"24px 0 48px",background:bg,minHeight:"calc(100vh - 56px)" }}>

      <div style={{

        width:390, flexShrink:0, borderRadius:46, overflow:"hidden",

        border:`6px solid #2A1550`,

        boxShadow:`0 0 60px rgba(255,46,158,0.22), 0 0 120px rgba(139,47,214,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)`,

        height:800, display:"flex", flexDirection:"column", background:bg,

      }}>

        {/* Status bar */}

        <div style={{ height:44,background:"#060010",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",flexShrink:0,position:"relative" }}>

          <span style={{ color:"#fff",fontSize:12,fontWeight:700,fontFamily:"'Inter',sans-serif" }}>9:41</span>

          {/* 3 product thumbnails - enlarged for premium UI */}

         <div style={{ display:"grid", gridTemplateColumns:"80px repeat(3,1fr)", gap:12, borderTop:`1px solid rgba(139,47,214,0.15)` }}>

           <div style={{ padding:"12px 14px", display:"flex", alignItems:"center" }}>

             <span className="ghi" style={{ fontSize:12, color:txS, letterSpacing:"0.05em", fontWeight:600 }}>PRODUCTO</span>

           </div>

           {/* Placeholder for logic content omitted from prompt */}

           {Array.from({ length: 3 }).map((_, i) => (

             <div key={i} style={{ padding:"14px 8px", borderLeft:`1px solid rgba(139,47,214,0.15)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8, background:"rgba(139,47,214,0.05)", cursor:"pointer" }}>

               <Plus size={24} color={txS}/>

               <span className="ghi" style={{ fontSize:12, color:txS, fontWeight:600 }}>Añadir</span>

             </div>

           ))}

         </div>

          <div style={{ position:"absolute",left:"50%",transform:"translateX(-50%)",top:0,width:120,height:32,background:"#060010",borderRadius:"0 0 18px 18px" }}/>

          <div style={{ display:"flex",gap:5,alignItems:"center" }}>

            <Wifi size={12} color="#fff"/>

            <Battery size={12} color="#fff"/>

          </div>

        </div>

        {/* Content area */}

        <div style={{ flex:1,overflow:"hidden",position:"relative" }} className="no-scroll">

          {children}

        </div>

        {/* Bottom Navigation */}

        {showBottomNav&&<BottomNav active={activeNav} onNav={onNav}/>}

        {/* Home indicator */}

        <div style={{ height:26,background:"#060010",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>

          <div style={{ width:80,height:4,background:"rgba(255,255,255,0.28)",borderRadius:2 }}/>

        </div>

      </div>

    </div>

  );

}

type Screen = "home"|"catalog"|"detail"|"search"|"compare"|"cart"|"checkout-1"|"checkout-2"|"checkout-3"|"confirmation"|"admin-dashboard"|"admin-catalog"|"admin-logistics"|"profile"|"support"|"chat"|"accessibility"|"lsm"|"login"|"register";

const SCREEN_TABS: { id:Screen; label:string; group:0|1|2|3 }[] = [

  { id:"home",             label:"Home",          group:0 },

  { id:"catalog",          label:"Catálogo",      group:0 },

  { id:"detail",           label:"Producto",      group:0 },

  { id:"search",           label:"Búsqueda",      group:0 },

  { id:"compare",          label:"Comparar",      group:1 },

  { id:"cart",             label:"Carrito",       group:1 },

  { id:"checkout-1",       label:"Envío",         group:1 },

  { id:"checkout-2",       label:"Pago",          group:1 },

  { id:"checkout-3",       label:"Revisión",      group:1 },

  { id:"confirmation",     label:"Confirmación",  group:1 },

  { id:"admin-dashboard",  label:"Admin KPI",     group:2 },

  { id:"admin-catalog",    label:"Admin Cat.",    group:2 },

  { id:"admin-logistics",  label:"Admin Log.",    group:2 },

  { id:"profile",          label:"Perfil",        group:3 },

  { id:"support",          label:"Soporte",       group:3 },

  { id:"chat",             label:"GameBot",       group:3 },

  { id:"accessibility",    label:"Accesibilidad", group:3 },

  { id:"lsm",              label:"Traductor LSM", group:3 },

];

export default function App() {

  const [screen,     setScreen]     = useState<Screen>("home");

  useEffect(() => {

    const handleHashChange = () => {

      const h = window.location.hash.replace("#", "") as Screen;

      if (h && h !== screen) {

        if (SCREEN_TABS.some(t => t.id === h) || h === "login" || h === "register") {

          setScreen(h);

        }

      }

    };

    window.addEventListener("hashchange", handleHashChange);

    

    const initialHash = window.location.hash.replace("#", "");

    if (initialHash) {

      if (SCREEN_TABS.some(t => t.id === initialHash as Screen) || initialHash === "login" || initialHash === "register") {

        setScreen(initialHash as Screen);

      }

    } else {

      window.location.hash = screen;

    }

    

    return () => window.removeEventListener("hashchange", handleHashChange);

  }, [screen]);

  const [role,       setRole]       = useState<AuthRole>("guest");

  const [isMobile,   setIsMobile]   = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [cartItems,  setCartItems]  = useState<CartItemType[]>(CART_INIT);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [menuOpen,     setMenuOpen]     = useState(false);

  const [modalType,    setModalType]    = useState<"terms" | "privacy" | null>(null);

  const [modalMode,    setModalMode]    = useState<"legal" | "gamer">("gamer");

  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const [modalChecked, setModalChecked] = useState(false);

  const [notifications, setNotifications] = useState<{ id: number; title: string; desc: string; date: string; actionLabel?: string; targetScreen?: string }[]>([

    { id: 1, title: "🎁 ¡Gamer Starter Pack!", desc: "Reclama tus 100 XP iniciales en tu perfil.", date: "Hace 2 min", actionLabel: "Ir a Perfil", targetScreen: "profile" },

    { id: 2, title: "🔥 Nuevos visores VR", desc: "El stock de ProVision VR X2 ha sido renovado.", date: "Hace 5 min", actionLabel: "Ver Catálogo", targetScreen: "catalog" }

  ]);

  // UI state for notifications panel

  const [notifOpen, setNotifOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    setScrolledToBottom(false);

    setModalChecked(false);

    setModalMode("gamer");

  }, [modalType]);

  const handleScroll = () => {

    const el = scrollRef.current;

    if (el) {

      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;

      if (isAtBottom) {

        setScrolledToBottom(true);

      }

    }

  };

  // Responsive layout auto-detection

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 1024);

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  // Expose notifications globally

  useEffect(() => {

    (window as any).getNotifications = () => notifications;

    (window as any).addNotification = (title: string, desc: string, actionLabel?: string, targetScreen?: string) => {

      setNotifications(prev => [

        { id: Date.now(), title, desc, date: "Ahora mismo", actionLabel, targetScreen },

        ...prev

      ]);

    };

    (window as any).navigateToScreen = (s: string) => {

      nav(s);

    };

    return () => {

      delete (window as any).getNotifications;

      delete (window as any).addNotification;

      delete (window as any).navigateToScreen;

    };

  }, [notifications]);

  // Global Add to Cart handler

  useEffect(() => {

    (window as any).addToCart = (p: Product) => {

      setCartItems(prev => {

        const existing = prev.find(item => item.id === p.id);

        if (existing) {

          return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);

        }

        return [...prev, { ...p, qty: 1, variant: p.variants[0] || "Estándar", stock: "ok", stockCount: 10 }];

      });

      toast.success(`${p.name} añadido al carrito`, { duration: 1800, position: "bottom-right" });

    };

    (window as any).openTerms = () => setModalType("terms");

    (window as any).openPrivacy = () => setModalType("privacy");

    return () => {

      delete (window as any).addToCart;

      delete (window as any).openTerms;

      delete (window as any).openPrivacy;

    };

  }, []);

  const pushedRef = useRef(false);

  useEffect(() => {

    if (!isMobile) return;

    const hasOpenOverlay = menuOpen || notifOpen || searchOpen || !!modalType;

    

    if (hasOpenOverlay && !pushedRef.current) {

      window.history.pushState({ overlayOpen: true }, "");

      pushedRef.current = true;

    } else if (!hasOpenOverlay && pushedRef.current) {

      pushedRef.current = false;

      if (window.history.state?.overlayOpen) {

        window.history.back();

      }

    }

    

    const handlePopState = (e: PopStateEvent) => {

      if (pushedRef.current) {

        pushedRef.current = false;

        setMenuOpen(false);

        setNotifOpen(false);

        setSearchOpen(false);

        setModalType(null);

      }

    };

    

    window.addEventListener("popstate", handlePopState);

    return () => {

      window.removeEventListener("popstate", handlePopState);

    };

  }, [menuOpen, notifOpen, searchOpen, modalType, isMobile]);

  const nav = (s:string) => {

    setSearchOpen(false);

    // Auth guard for guest users accessing profile or checkout

    if (role === "guest" && (s === "profile" || s.startsWith("checkout"))) {

      toast.info("Inicia sesión para acceder a tu perfil y realizar compras.", { position: "bottom-right" });

      setScreen("login");

      return;

    }

    if (window.location.hash !== `#${s}`) {

      window.location.hash = s;

    }

    setScreen(s as Screen);

    if (s === "confirmation") {

      const orderNum = Math.floor(Math.random() * 90000) + 10000;

      setNotifications(prev => [

        {

          id: Date.now(),

          title: "🛒 ¡Compra Completada!",

          desc: `Tu orden de hardware #${orderNum} está lista. Revisa el estado de entrega en tu mapa.`,

          date: "Ahora mismo",

          actionLabel: "Ver Pedidos",

          targetScreen: "profile"

        },

        ...prev

      ]);

      toast.success("¡Compra completada con éxito!", { position: "bottom-right" });

    }

  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const login  = (r:"user"|"admin") => { setRole(r); nav(r==="admin"?"admin-dashboard":"home"); };

  const logout = () => { setRole("guest"); setMenuOpen(false); };

  const openDetail = (p: Product) => {

    setSelectedProduct(p);

    nav("detail");

  };

  // Fluid responsive container for mobile viewports (each view scrolls vertically to SimpleFooter)

  const MobileWrapper = ({ children }: { children: React.ReactNode }) => {

    const showBottomNav = !CHECKOUT_SCREENS.includes(screen) && screen !== "search";

    return (

      <div style={{ minHeight: "calc(100vh - 56px)", background: bg, display: "flex", flexDirection: "column" }}>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }} className="thin-scroll">

          <div style={{ flex: 1 }}>{children}</div>

          <SimpleFooter onNav={nav} mobile />

        </div>

        {showBottomNav && <BottomNav active={screen} onNav={nav} />}

      </div>

    );

  };

  const renderLegalModal = () => {

    if (!modalType) return null;

    const isTerms = modalType === "terms";

    const title = isTerms ? "Contrato Gamer: Términos y Condiciones" : "Contrato Gamer: Política de Privacidad";

    return (

      <div style={{

        position: "fixed",

        inset: 0,

        backgroundColor: "rgba(6, 0, 16, 0.85)",

        backdropFilter: "blur(12px)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        zIndex: 2000,

        padding: 20,

      }}>

        <div style={{

          background: bgC,

          border: `1px solid rgba(139, 47, 214, 0.3)`,

          borderRadius: 20,

          width: "100%",

          maxWidth: 600,

          maxHeight: "85vh",

          display: "flex",

          flexDirection: "column",

          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8)`,

          position: "relative",

          overflow: "hidden",

        }}>

          {/* Header */}

          <div style={{

            padding: "20px 24px",

            borderBottom: "1px solid rgba(139, 47, 214, 0.2)",

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

          }}>

            <h3 style={{

              margin: 0,

              fontSize: 18,

              fontWeight: 800,

              color: "#FFF",

              fontFamily: "'Rajdhani', sans-serif",

              letterSpacing: "0.05em",

              textTransform: "uppercase",

            }}>

              {title}

            </h3>

            <button

              onClick={() => setModalType(null)}

              style={{

                background: "transparent",

                border: "none",

                color: txS,

                cursor: "pointer",

                padding: 4,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

              }}

            >

              <X size={20} />

            </button>

          </div>

          {/* Scrollable Content */}

          <div

            ref={scrollRef}

            onScroll={handleScroll}

            style={{

              padding: 24,

              overflowY: "auto",

              flex: 1,

              color: tx,

              fontSize: 14,

              lineHeight: 1.6,

              fontFamily: "'Inter', sans-serif",

            }}

            className="thin-scroll"

          >

            {isTerms ? (

              <>

                <h4 style={{ color: mg, marginTop: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>1. REGLAS DE LA PARTIDA (Aceptación)</h4>

                <p>Al entrar al lobby de GameHub Store, aceptas seguir las normas de juego limpio. No se permiten hacks, exploits ni comportamientos tóxicos. Al navegar, confirmas que aceptas jugar bajo estas condiciones.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>2. TU LOOT Y LICENCIA (Uso del sitio)</h4>

                <p>Te otorgamos una licencia limitada (como un skin temporal de arma) para explorar e interactuar con nuestro sitio para uso personal. No puedes duplicar, revender ni reclamar propiedad del código o del inventario.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>3. PERFIL DE JUGADOR (Tu cuenta)</h4>

                <p>Protege tu contraseña como si fuera tu barra de vida en un Boss Fight. Eres el único responsable de lo que ocurra con tu perfil. Si compartes tus datos de acceso y pierdes tu loot o tu cuenta es penalizada, no podemos revivirte.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>4. SIN RESPAWN POR LAG (Responsabilidad)</h4>

                <p>No somos responsables si tu PC experimenta sobrecalentamiento, si pierdes la conexión durante una compra o si tu setup explota por falta de mantenimiento. GameHub funciona en la nube pero no hace milagros.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>5. LA TIENDA DE ITEMS (Precios y Stock)</h4>

                <p>Los precios del hardware y periféricos fluctúan según la economía global de la industria. Nos reservamos el derecho de modificar el inventario y las ofertas sin previo aviso.</p>

              </>

            ) : (

              <>

                <h4 style={{ color: mg, marginTop: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>1. ESCANEO DE GREMIO (Datos recolectados)</h4>

                <p>Solo guardamos información útil para completar tu misión de compra: tu gamer tag, email para mandarte el recibo, y la dirección física para que los repartidores de la party no se pierdan en el mapa.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>2. OPTIMIZAR TU BUILD (Uso de datos)</h4>

                <p>Usamos tus preferencias de juego para recomendarte el hardware perfecto para subir de nivel y configurar promociones exclusivas para tu build o setup específico.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>3. PARTY PRIVADA (Terceros)</h4>

                <p>No vendemos tus datos a gremios enemigos ni a spammers de publicidad. Solo los compartimos con nuestros aliados indispensables (procesadores de pago seguros y paqueterías) para finalizar la entrega de tu loot.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>4. SHIELD DE NIVEL LEGENDARIO (Seguridad)</h4>

                <p>Tus datos están protegidos por encriptación avanzada equivalente a un escudo de nivel legendario. Ningún hacker novato podrá traspasar nuestras defensas cibernéticas y muros de fuego.</p>

                <h4 style={{ color: mg, fontFamily: "'Rajdhani', sans-serif", fontSize: 16 }}>5. RESET DE PERSONAJE (Derechos)</h4>

                <p>Tienes el control total de tu personaje. Si decides hacer un reset completo y borrar tu cuenta y todo tu historial de datos de nuestros servidores, puedes pedírnoslo a través de soporte técnico.</p>

              </>

            )}

            <div style={{ height: 20 }} />

          </div>

          {/* Footer */}

          <div style={{

            padding: "20px 24px",

            borderTop: "1px solid rgba(139, 47, 214, 0.2)",

            display: "flex",

            justifyContent: "flex-end",

            background: "rgba(10, 5, 18, 0.5)",

          }}>

            <button

              onClick={() => setModalType(null)}

              style={{

                padding: "10px 24px",

                borderRadius: 10,

                background: `linear-gradient(135deg, ${mg}, ${vi})`,

                border: "none",

                color: "#FFF",

                fontSize: 13,

                fontWeight: 700,

                cursor: "pointer",

                boxShadow: GM,

                transition: "all 0.2s",

              }}

            >

              Cerrar

            </button>

          </div>

        </div>

      </div>

    );

  };

  const HIDDEN_NAV_SCREENS = ["checkout-1", "checkout-2", "checkout-3", "confirmation", "detail", "search", "lsm", "login", "register"];

  const visibleTabs = SCREEN_TABS.filter(t => !HIDDEN_NAV_SCREENS.includes(t.id));

  const groups = [

    { name: "Tienda", group: 0, color: mg },

    { name: "Compra", group: 1, color: vi },

    { name: "Admin", group: 2, color: "#FF4500", adminOnly: true },

    { name: "Usuario", group: 3, color: cy },

  ];

  return (

    <div style={{ background:bg, height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>

      <style>{GH_CSS}</style>

      <Toaster theme="dark" position="bottom-right" toastOptions={{ style:{ background:"#150A24",border:"1px solid rgba(255,46,158,0.35)",color:"#F0E6FF" } }}/>

      {/* ─── Top navigation (desktop only) ─── */}

      {!isMobile && (

      <div style={{ position:"sticky",top:0,zIndex:500,background:"rgba(21,10,36,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid rgba(139,47,214,0.25)`,height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px" }}>

        {/* Left: Brand Logo */}

        <div style={{ display:"flex",alignItems:"center",gap:20 }}>

          <div style={{ cursor:"pointer" }} onClick={()=>nav(role==="admin"?"admin-dashboard":"home")}>

            <GHLogo scale={0.65} />

          </div>

        </div>

        {/* Center: Grouped Dropdowns */}

        <div style={{ display:"flex", alignItems:"center", gap:24 }}>

          {groups.map(g => {

            if (g.adminOnly && role !== "admin") return null;

            const gItems = visibleTabs.filter(t => t.group === g.group);

            const isActive = gItems.some(t => t.id === screen);

            return (

              <div key={g.name}

                onMouseEnter={() => setOpenDropdown(g.name)}

                onMouseLeave={() => setOpenDropdown(null)}

                style={{ position:"relative", padding:"12px 0" }}>

                <button style={{

                  display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none",

                  color: isActive ? g.color : txS, fontSize:13, fontWeight:700, cursor:"pointer",

                  fontFamily:"'Inter',sans-serif", letterSpacing:"0.05em", transition:"all 0.2s"

                }}>

                  {g.name.toUpperCase()} <ChevronDown size={13}/>

                </button>

                {openDropdown === g.name && (

                  <div style={{

                    position:"absolute", top:"100%", left:0, background:bgC, borderRadius:12,

                    border:`1px solid rgba(139,47,214,0.3)`, padding:"6px", minWidth:170,

                    display:"flex", flexDirection:"column", gap:3, boxShadow:`0 10px 30px rgba(0,0,0,0.6)`,

                    zIndex:600

                  }}>

                    {gItems.map(t => (

                      <button key={t.id} onClick={() => nav(t.id)} style={{

                        padding:"8px 12px", borderRadius:6, fontSize:12, fontWeight:600,

                        textAlign:"left", cursor:"pointer", border:"none", width:"100%",

                        background: screen === t.id ? "rgba(255,46,158,0.12)" : "transparent",

                        color: screen === t.id ? mg : tx, transition: "all 0.15s",

                        fontFamily:"'Inter',sans-serif"

                      }}>

                        {t.label}

                      </button>

                    ))}

                  </div>

                )}

              </div>

            );

          })}

        </div>

        {/* Right: Actions cleanly spaced */}

        <div style={{ display:"flex",alignItems:"center",gap:14,flexShrink:0 }}>

           {/* Search button */}

           <button onClick={() => setSearchOpen(true)} title="Buscar productos" style={{

             display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:8,

             background:bgE, border:`1px solid rgba(139,47,214,0.25)`, color:txS, fontSize:12,

             fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif"

           }}>

             <Search size={14} color={cy}/> Buscar...

           </button>

           {/* Cart button with live item count badge */}

           <button onClick={() => nav("cart")} title="Ver Carrito" style={{

             position:"relative", display:"flex", alignItems:"center", gap:6, padding:"6px 14px",

             borderRadius:8, background:cartItems.length>0?`rgba(255,46,158,0.12)`:bgE,

             border:`1px solid ${cartItems.length>0?mg+"55":"rgba(139,47,214,0.25)"}`,

             color:cartItems.length>0?mg:tx, fontSize:12, fontWeight:700, cursor:"pointer",

             fontFamily:"'Inter',sans-serif", boxShadow:cartItems.length>0?GM:"none"

           }}>

             <ShoppingCart size={15} color={cartItems.length>0?mg:tx}/>

             <span>Carrito ({cartItems.length})</span>

           </button>

           {/* Accessibility button */}

           <button onClick={() => nav("accessibility")} title="Accesibilidad" style={{

             padding:6, borderRadius:8, background:screen==="accessibility"?`rgba(0,240,255,0.15)`:"transparent",

             border:`1px solid ${screen==="accessibility"?cy:"rgba(139,47,214,0.25)"}`, color:cy, cursor:"pointer",

             display:"flex", alignItems:"center", justifyContent:"center"

           }}>

             <Eye size={18}/>

           </button>

           {/* Notification Bell */}

           <button onClick={() => setNotifOpen(true)} title="Notificaciones" style={{

             position:"relative", background:"none", border:"none", cursor:"pointer", color:tx, padding:6,

             display:"flex", alignItems:"center"

           }}>

             <Bell size={20}/>

             {notifications.length > 0 && (

               <span style={{ position:"absolute", top:3, right:3, width:8, height:8, borderRadius:"50%", background:mg, boxShadow:`0 0 6px ${mg}` }}/>

             )}

           </button>

           {/* Profile & Login/Logout button */}

           {role === "guest" ? (

             <button onClick={() => nav("login")} style={{

               padding:"7px 16px", borderRadius:8, background:`linear-gradient(135deg,${mg},${vi})`,

               border:"none", color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer",

               fontFamily:"'Rajdhani',sans-serif", letterSpacing:"0.04em", boxShadow:GM, display:"flex", alignItems:"center", gap:6

             }}>

               <LogIn size={13}/> INICIAR SESIÓN

             </button>

           ) : (

             <div style={{ display:"flex", alignItems:"center", gap:8 }}>

               <button onClick={() => nav("profile")} title="Mi Perfil" style={{

                 display:"flex", alignItems:"center", gap:6, padding:"5px 10px", borderRadius:8,

                 background:bgE, border:`1px solid rgba(139,47,214,0.3)`, color:tx, fontSize:12,

                 fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif"

               }}>

                 <User size={14} color={cy}/> Perfil ({role})

               </button>

               <button onClick={logout} title="Cerrar sesión" style={{

                 padding:"5px 10px", borderRadius:8, background:"transparent",

                 border:`1px solid rgba(139,47,214,0.3)`, color:txS, fontSize:11, fontWeight:600,

                 cursor:"pointer", fontFamily:"'Inter',sans-serif", display:"flex", alignItems:"center", gap:4

               }}>

                 <LogIn size={11} style={{ transform:"scaleX(-1)" }}/> Salir

               </button>

             </div>

           )}

        </div>

      </div>

      )}

      {/* Mobile Header (Sticky across ALL mobile views) */}

      {isMobile && (

        <div style={{

          position: "sticky", top: 0, zIndex: 600,

          background: "rgba(21,10,36,0.97)", backdropFilter: "blur(14px)",

          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",

          padding: "0 14px", borderBottom: `1px solid rgba(139,47,214,0.25)`

        }}>

           <button onClick={() => setMenuOpen(true)} title="Menú principal" style={{ background: "none", border: "none", cursor: "pointer", color: tx, display: "flex", alignItems: "center", padding: 4 }}>

             <Menu size={22} />

           </button>

           <div style={{ cursor: "pointer" }} onClick={() => nav(role === "admin" ? "admin-dashboard" : "home")}>

             <GHLogo scale={0.6} />

           </div>

           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

             {/* Search */}

             <button onClick={() => setSearchOpen(true)} title="Buscar" style={{ background: "none", border: "none", cursor: "pointer", color: txS, padding: 4, display: "flex" }}>

               <Search size={20} color={cy}/>

             </button>

             {/* Cart with live badge */}

             <button onClick={() => nav("cart")} title="Carrito" style={{ background: "none", border: "none", cursor: "pointer", color: cartItems.length>0?mg:txS, position: "relative", padding: 4, display: "flex" }}>

               <ShoppingCart size={20}/>

               {cartItems.length > 0 && (

                 <span style={{ position: "absolute", top: -2, right: -4, background: mg, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 10, padding: "1px 4px", minWidth: 14, textAlign: "center" }}>

                   {cartItems.length}

                 </span>

               )}

             </button>

             {/* Notification Bell */}

             <button onClick={() => setNotifOpen(true)} title="Notificaciones" style={{ background: "none", border: "none", cursor: "pointer", color: txS, position: "relative", padding: 4, display: "flex" }}>

               <Bell size={20} />

               {notifications.length > 0 && (

                 <span style={{ position: "absolute", top: 2, right: 2, width: 6, height: 6, borderRadius: "50%", background: mg }} />

               )}

             </button>

             {/* Profile / Login */}

             {role === "guest" ? (

               <button onClick={() => nav("login")} title="Iniciar Sesión" style={{ background: "none", border: "none", cursor: "pointer", color: mg, padding: 4, display: "flex" }}>

                 <LogIn size={20}/>

               </button>

             ) : (

               <button onClick={() => nav("profile")} title="Mi Perfil" style={{ background: "none", border: "none", cursor: "pointer", color: cy, padding: 4, display: "flex" }}>

                 <User size={20}/>

               </button>

             )}

           </div>

        </div>

      )}

      {/* ─── Mobile Hamburger Menu Drawer ─── */}

      {isMobile && menuOpen && (

        <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex" }}>

          <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(6,0,16,0.85)", backdropFilter: "blur(8px)" }}/>

          <div className="slide-r" style={{ position: "relative", width: 290, height: "100%", background: bgC, borderRight: `1px solid rgba(139,47,214,0.3)`, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16, zIndex: 1 }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

              <div style={{ cursor: "pointer" }} onClick={() => { nav("home"); setMenuOpen(false); }}>

                <GHLogo scale={0.65} />

              </div>

              <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: txS, padding: 4 }}>

                <X size={20}/>

              </button>

            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }} className="thin-scroll">

              {groups.map(g => {

                if (g.adminOnly && role !== "admin") return null;

                const gItems = SCREEN_TABS.filter(t => t.group === g.group);

                return (

                  <div key={g.name} style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>

                    <span className="ghi" style={{ fontSize: 10, fontWeight: 800, color: g.color, letterSpacing: "0.1em", paddingLeft: 10 }}>{g.name.toUpperCase()}</span>

                    {gItems.map(t => (

                      <button key={t.id} onClick={() => { nav(t.id); setMenuOpen(false); }} style={{

                        padding: "10px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,

                        textAlign: "left", cursor: "pointer", border: "none", width: "100%",

                        background: screen === t.id ? "rgba(255,46,158,0.12)" : "transparent",

                        color: screen === t.id ? mg : tx, transition: "all 0.2s",

                        fontFamily: "'Inter',sans-serif"

                      }}>

                        {t.label}

                      </button>

                    ))}

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      )}

       {/* ─── Screen content ─── */}

       <div style={{ position:"relative", flex: 1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

         {screen==="home"&&!isMobile&&<HomeDesktop onNav={nav} onSearch={()=>setSearchOpen(true)} onDetail={openDetail}/>}

         {screen==="home"&&isMobile&&(<MobileWrapper><HomeMobile onNav={nav} onSearch={()=>setSearchOpen(true)} onDetail={openDetail}/>{searchOpen&&<SearchOverlay onClose={()=>setSearchOpen(false)} mobile/>}</MobileWrapper>)}

         {/* Notification Panel */}

         {notifOpen && (

           <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", justifyContent:"flex-end" }}>

             <div onClick={() => setNotifOpen(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)" }}/>

             <div style={{ width:300, height:"100%", background:bgC, padding:20, overflowY:"auto", boxShadow:`-4px 0 12px rgba(0,0,0,0.4)` }}>

               <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}><span style={{ fontSize:18, fontWeight:600, color:tx }}>Notificaciones</span><button onClick={() => setNotifOpen(false)} style={{ background:"none",border:"none",cursor:"pointer",color:txS }}><X size={20}/></button></div>

               {notifications.length===0 ? (<div style={{ color:txS, fontSize:14 }}>No hay notificaciones</div>) : (notifications.map(n=> (

                 <div key={n.id} style={{ marginBottom:12, padding:12, background:mg, borderRadius:8, color:tx }}>

                   <div style={{ fontWeight:600, marginBottom:4 }}>{n.title}</div>

                   <div style={{ fontSize:12 }}>{n.desc}</div>

                   <div style={{ fontSize:10, opacity:0.8, marginTop:4 }}>{n.date}</div>

                 </div>

               )))}

             </div>

           </div>

         )}

        {screen==="catalog"&&!isMobile&&<CatalogDesktop onNav={nav} onSearch={()=>setSearchOpen(true)} onDetail={openDetail}/>}

        {screen==="catalog"&&isMobile&&(<MobileWrapper><CatalogMobile onNav={nav} onSearch={()=>setSearchOpen(true)} onDetail={openDetail}/>{searchOpen&&<SearchOverlay onClose={()=>setSearchOpen(false)} mobile/>}</MobileWrapper>)}

        {screen==="detail"&&!isMobile&&<ProductDetailDesktop onNav={nav} onSearch={()=>setSearchOpen(true)}/>}

        {screen==="detail"&&isMobile&&(<MobileWrapper><ProductDetailMobile onBack={()=>nav("catalog")}/></MobileWrapper>)}

        {screen==="search"&&!isMobile&&(<div style={{minHeight:"calc(100vh - 56px)",background:bg}}><SearchOverlay onClose={()=>nav("home")}/></div>)}

        {screen==="search"&&isMobile&&(<MobileWrapper><SearchOverlay onClose={()=>nav("home")} mobile/></MobileWrapper>)}

        {screen==="compare"&&!isMobile&&<CompareDesktop onNav={nav} onSearch={()=>setSearchOpen(true)}/>}

        {screen==="compare"&&isMobile&&(<MobileWrapper><CompareMobile onNav={nav}/></MobileWrapper>)}

        {screen==="cart"&&!isMobile&&<CartDesktop onNav={nav} onSearch={()=>setSearchOpen(true)} cartItems={cartItems} setCartItems={setCartItems}/>}

        {screen==="cart"&&isMobile&&(<MobileWrapper><CartMobile onNav={nav} cartItems={cartItems} setCartItems={setCartItems}/></MobileWrapper>)}

        {screen==="checkout-1"&&!isMobile&&<CheckoutShipDesktop onNav={nav}/>}

        {screen==="checkout-1"&&isMobile&&(<MobileWrapper><CheckoutShipMobile onNav={nav}/></MobileWrapper>)}

        {screen==="checkout-2"&&!isMobile&&<CheckoutPayDesktop onNav={nav} cartItems={cartItems}/>}

        {screen==="checkout-2"&&isMobile&&(<MobileWrapper><CheckoutPayMobile onNav={nav}/></MobileWrapper>)}

        {screen==="checkout-3"&&!isMobile&&<CheckoutReviewDesktop onNav={nav} cartItems={cartItems}/>}

        {screen==="checkout-3"&&isMobile&&(<MobileWrapper><CheckoutReviewMobile onNav={nav} cartItems={cartItems}/></MobileWrapper>)}

        {screen==="confirmation"&&!isMobile&&<ConfirmDesktop onNav={nav}/>}

        {screen==="confirmation"&&isMobile&&(<MobileWrapper><ConfirmMobile onNav={nav}/></MobileWrapper>)}

        {screen==="admin-dashboard"&&!isMobile&&<AdminDashboardDesktop onNav={nav}/>}

        {screen==="admin-dashboard"&&isMobile&&(<MobileWrapper><AdminDashboardMobile onNav={nav}/></MobileWrapper>)}

        {screen==="admin-catalog"&&!isMobile&&<AdminCatalogDesktop onNav={nav}/>}

        {screen==="admin-catalog"&&isMobile&&(<MobileWrapper><AdminCatalogMobile onNav={nav}/></MobileWrapper>)}

        {screen==="admin-logistics"&&!isMobile&&<AdminLogisticsDesktop onNav={nav}/>}

        {screen==="admin-logistics"&&isMobile&&(<MobileWrapper><AdminLogisticsMobile onNav={nav}/></MobileWrapper>)}

        {(screen==="login"||screen==="register")&&!isMobile&&(

          <div style={{ position:"relative", minHeight:"calc(100vh - 56px)" }}>

            <button onClick={()=>nav("home")} style={{ position:"absolute", top:20, left:24, zIndex:100, padding:"8px 16px", borderRadius:10, background:bgC, border:`1px solid rgba(139,47,214,0.3)`, color:tx, cursor:"pointer", fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>

              ← Volver a la Tienda

            </button>

            <AuthDesktop onLogin={login}/>

          </div>

        )}

        {(screen==="login"||screen==="register")&&isMobile&&(

          <div style={{ position:"relative", height:"100%" }}>

            <button onClick={()=>nav("home")} style={{ position:"absolute", top:12, left:16, zIndex:100, padding:"6px 12px", borderRadius:8, background:bgC, border:`1px solid rgba(139,47,214,0.3)`, color:tx, cursor:"pointer", fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:600 }}>

              ← Tienda

            </button>

            <AuthMobile onLogin={login}/>

          </div>

        )}

        {screen==="profile"&&!isMobile&&<ProfileDesktop onNav={nav} role={role}/>}

        {screen==="profile"&&isMobile&&(<MobileWrapper><ProfileMobile onNav={nav} role={role}/></MobileWrapper>)}

        {screen==="support"&&!isMobile&&<SupportDesktop onNav={nav}/>}

        {screen==="support"&&isMobile&&(<MobileWrapper><SupportMobile onNav={nav}/></MobileWrapper>)}

        {screen==="chat"&&!isMobile&&<ChatDesktop onNav={nav}/>}

        {screen==="chat"&&isMobile&&(<MobileWrapper><ChatMobile onNav={nav}/></MobileWrapper>)}

        {screen==="accessibility"&&!isMobile&&<AccessibilityDesktop onNav={nav}/>}

        {screen==="accessibility"&&isMobile&&(<MobileWrapper><AccessibilityMobile onNav={nav}/></MobileWrapper>)}

        {screen==="lsm"&&!isMobile&&<LsmDesktop onNav={nav}/>}

        {screen==="lsm"&&isMobile&&(<MobileWrapper><LsmMobile onNav={nav}/></MobileWrapper>)}

      </div>

      {/* ─── Global search overlay (desktop) — works from any screen ─── */}

      {searchOpen&&!isMobile&&screen!=="search"&&(

        <div style={{position:"fixed",inset:"56px 0 0 0",zIndex:150}}>

          <SearchOverlay onClose={()=>setSearchOpen(false)}/>

        </div>

      )}

      {/* ─── Premium Accessibility Floating Action Button ─── */}

      {screen !== "accessibility" && (

        <button

          onClick={() => nav("accessibility")}

          title="Accesibilidad"

          className="neon-btn-cy"

          style={{

            position: "fixed",

            bottom: 20,

            right: 20,

            width: 50,

            height: 50,

            borderRadius: "50%",

            background: `linear-gradient(135deg, ${cy}, ${vi})`,

            border: "none",

            cursor: "pointer",

            color: "#0A0512",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            boxShadow: GC,

            zIndex: 1000,

            transition: "all 0.2s ease",

          }}

          onMouseEnter={e => {

            e.currentTarget.style.transform = "scale(1.1)";

          }}

          onMouseLeave={e => {

            e.currentTarget.style.transform = "scale(1)";

          }}

        >

          <Eye size={22} />

        </button>

      )}

      {/* ─── Custom Premium Legal Document Modal Overlay ─── */}

      {renderLegalModal()}

    </div>

  );

}

