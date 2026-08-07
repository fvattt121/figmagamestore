import { useState } from "react";
import { Laptop, Smartphone, LogIn, Wifi, Battery } from "lucide-react";
import {
  GH_CSS, bg, bgC, bgE, mg, vi, cy, ok, tx, txS, GM,
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
  Product, GHLogo,
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
} from "./UserScreens";
import { AuthDesktop, AuthMobile, AuthRole } from "./AuthScreens";
import { Toaster } from "sonner";

const CHECKOUT_SCREENS = ["checkout-1","checkout-2","checkout-3"];

function PhoneFrame({ children, activeNav="home", onNav, screen }:{
  children:React.ReactNode; activeNav?:string;
  onNav:(s:string)=>void; screen:string;
}) {
  const showBottomNav = !CHECKOUT_SCREENS.includes(screen) && screen!=="search";

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

type Screen = "home"|"catalog"|"detail"|"search"|"compare"|"cart"|"checkout-1"|"checkout-2"|"checkout-3"|"confirmation"|"admin-dashboard"|"admin-catalog"|"admin-logistics"|"profile"|"support"|"chat"|"accessibility";

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
];

export default function App() {
  const [screen,     setScreen]     = useState<Screen>("home");
  const [role,       setRole]       = useState<AuthRole>("guest");
  const [isMobile,   setIsMobile]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems,  setCartItems]  = useState<CartItemType[]>(CART_INIT);

  const nav = (s:string) => { setSearchOpen(false); setScreen(s as Screen); };
  const login  = (r:"user"|"admin") => { setRole(r); setScreen(r==="admin"?"admin-dashboard":"home"); };
  const logout = () => setRole("guest");

  const openDetail = (_p: Product) => { setScreen("detail"); };

  const MobileWrapper = ({ children }: { children: React.ReactNode }) => (
    <PhoneFrame activeNav={screen} onNav={nav} screen={screen}>{children}</PhoneFrame>
  );

  const MobileToggle = () => (
    <div style={{ display:"flex",background:bgE,borderRadius:50,padding:3,border:`1px solid rgba(139,47,214,0.3)`,flexShrink:0 }}>
      {[{m:false,Icon:Laptop,l:"Web"},{m:true,Icon:Smartphone,l:"Móvil"}].map(({ m,Icon,l })=>(
        <button key={l} onClick={()=>setIsMobile(m)} style={{ padding:"5px 12px",borderRadius:50,fontSize:11,fontWeight:600,cursor:"pointer",background:isMobile===m?`linear-gradient(135deg,${mg},${vi})`:"transparent",border:"none",color:isMobile===m?"#fff":txS,display:"flex",alignItems:"center",gap:4,boxShadow:isMobile===m?GM:"none",fontFamily:"'Inter',sans-serif",transition:"all 0.2s" }}>
          <Icon size={11}/>{l}
        </button>
      ))}
    </div>
  );

  /* ── Auth gate: guest → fullscreen auth, no nav ── */
  if (role === "guest") {
    return (
      <div style={{ background:bg,minHeight:"100vh" }}>
        <style>{GH_CSS}</style>
        <div style={{ position:"fixed",top:14,right:14,zIndex:300 }}>
          <MobileToggle/>
        </div>
        {!isMobile ? (
          <AuthDesktop onLogin={login}/>
        ) : (
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",padding:"20px 16px",background:bg }}>
            <PhoneFrame activeNav={"home" as Screen} onNav={nav} screen={"home" as Screen}>
              <AuthMobile onLogin={login}/>
            </PhoneFrame>
          </div>
        )}
      </div>
    );
  }

  /* ── All tabs always visible in prototype ── */
  const visibleTabs = SCREEN_TABS;

  const DIVIDER_LABELS: Record<number,{color:string;label:string}> = {
    1: { color:vi,     label:"COMPRA"  },
    2: { color:"#FF4500", label:"ADMIN"  },
    3: { color:cy,     label:"USUARIO" },
  };

  return (
    <div style={{ background:bg, minHeight:"100vh" }}>
      <style>{GH_CSS}</style>
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style:{ background:"#150A24",border:"1px solid rgba(255,46,158,0.35)",color:"#F0E6FF" } }}/>

      {/* ─── Top navigation ─── */}
      <div style={{ position:"sticky",top:0,zIndex:200,background:"rgba(21,10,36,0.97)",backdropFilter:"blur(14px)",borderBottom:`1px solid rgba(139,47,214,0.25)`,height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:2,overflowX:"auto",flex:1 }} className="no-scroll">
          <div style={{ marginRight:12,flexShrink:0,cursor:"pointer" }} onClick={()=>nav(role==="admin"?"admin-dashboard":"home")}>
            <GHLogo scale={0.65} />
          </div>
          {visibleTabs.map((t,i)=>{
            const prevGroup = i>0?visibleTabs[i-1].group:t.group;
            const newGroup  = i>0 && t.group!==prevGroup;
            const div       = newGroup ? DIVIDER_LABELS[t.group] : null;
            return (
              <span key={t.id} style={{ display:"flex",alignItems:"center" }}>
                {div&&<div style={{ display:"flex",alignItems:"center",gap:4,flexShrink:0,margin:"0 2px" }}><div style={{ width:1,height:18,background:"rgba(139,47,214,0.45)" }}/><span className="ghi" style={{ fontSize:8,fontWeight:800,color:div.color,letterSpacing:"0.1em",opacity:0.8 }}>{div.label}</span></div>}
                <button onClick={()=>nav(t.id)} style={{ padding:"5px 11px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",background:screen===t.id?"rgba(255,46,158,0.14)":"transparent",border:`1px solid ${screen===t.id?mg+"55":"transparent"}`,color:screen===t.id?mg:txS,boxShadow:screen===t.id?GM:"none",transition:"all 0.2s",fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap",flexShrink:0 }}>{t.label}</button>
              </span>
            );
          })}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0,marginLeft:8 }}>
          {/* Role badge */}
          <div style={{ display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:6,background:role==="admin"?"rgba(255,69,0,0.12)":"rgba(0,230,118,0.08)",border:`1px solid ${role==="admin"?"rgba(255,69,0,0.35)":"rgba(0,230,118,0.3)"}` }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:role==="admin"?"#FF4500":ok,boxShadow:`0 0 5px ${role==="admin"?"#FF4500":ok}` }}/>
            <span className="ghi" style={{ fontSize:10,fontWeight:700,color:role==="admin"?"#FF6533":ok,letterSpacing:"0.06em" }}>{role==="admin"?"ADMIN":"USER"}</span>
          </div>
          {/* Logout */}
          <button onClick={logout} style={{ padding:"5px 10px",borderRadius:7,background:"transparent",border:`1px solid rgba(139,47,214,0.3)`,color:txS,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",display:"flex",alignItems:"center",gap:4,transition:"all 0.15s" }}
            onMouseEnter={e=>(e.currentTarget.style.borderColor=mg+"55")} onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(139,47,214,0.3)")}>
            <LogIn size={11} style={{ transform:"scaleX(-1)" }}/>Salir
          </button>
          <MobileToggle/>
        </div>
      </div>

      {/* ─── Screen content ─── */}
      <div style={{ position:"relative" }}>
        {screen==="home"&&!isMobile&&<HomeDesktop onNav={nav} onSearch={()=>setSearchOpen(true)}/>}
        {screen==="home"&&isMobile&&(<MobileWrapper><HomeMobile onNav={nav} onSearch={()=>setSearchOpen(true)}/>{searchOpen&&<SearchOverlay onClose={()=>setSearchOpen(false)} mobile/>}</MobileWrapper>)}

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

        {screen==="profile"&&!isMobile&&<ProfileDesktop onNav={nav}/>}
        {screen==="profile"&&isMobile&&(<MobileWrapper><ProfileMobile onNav={nav}/></MobileWrapper>)}

        {screen==="support"&&!isMobile&&<SupportDesktop onNav={nav}/>}
        {screen==="support"&&isMobile&&(<MobileWrapper><SupportMobile onNav={nav}/></MobileWrapper>)}

        {screen==="chat"&&!isMobile&&<ChatDesktop onNav={nav}/>}
        {screen==="chat"&&isMobile&&(<MobileWrapper><ChatMobile onNav={nav}/></MobileWrapper>)}

        {screen==="accessibility"&&!isMobile&&<AccessibilityDesktop onNav={nav}/>}
        {screen==="accessibility"&&isMobile&&(<MobileWrapper><AccessibilityMobile onNav={nav}/></MobileWrapper>)}
      </div>

      {/* ─── Global search overlay (desktop) — works from any screen ─── */}
      {searchOpen&&!isMobile&&screen!=="search"&&(
        <div style={{position:"fixed",inset:"56px 0 0 0",zIndex:150}}>
          <SearchOverlay onClose={()=>setSearchOpen(false)}/>
        </div>
      )}
    </div>
  );
}
