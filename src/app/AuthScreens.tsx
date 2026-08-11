import { useState, useEffect } from "react";
import { Eye, EyeOff, LogIn, UserPlus, KeyRound, AtSign, User, Lock, Check, Settings, AlertTriangle, LayoutDashboard, Zap, Truck, Shield, Award } from "lucide-react";
import { bg, bgC, bgE, mg, vi, cy, ok, go, tx, txS, GM, GV, GC, NeonBtn, GHLogo } from "./shared";
import { toast } from "sonner";

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */

/* ═══════════════════════════════════════
   AUTH — COMPONENTS
   ═══════════════════════════════════════ */

export type AuthTab  = "login"|"register";
export type AuthRole = "guest"|"user"|"admin";

export function AuthInput({ icon: Icon, type, placeholder, value, onChange, iconColor, onFocus, onBlur, extra }:{
  icon: React.ElementType; type:string; placeholder:string; value:string; onChange:(v:string)=>void;
  iconColor?:string; onFocus?:()=>void; onBlur?:()=>void; extra?: React.ReactNode;
}) {
  return (
    <div style={{ position:"relative",marginBottom:12 }}>
      <Icon size={15} color={iconColor??txS} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
      <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
        onFocus={onFocus} onBlur={onBlur}
        style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:12,padding:"13px 16px 13px 44px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box",transition:"border-color 0.2s,box-shadow 0.2s" }}/>
      {extra}
    </div>
  );
}

export function PwStrength({ pw }: { pw:string }) {
  const score = pw.length > 10 ? 4 : pw.length > 7 ? 3 : pw.length > 4 ? 2 : pw.length > 0 ? 1 : 0;
  const c = score >= 4 ? ok : score >= 3 ? go : score >= 2 ? mg : "#555";
  return (
    <div style={{ display:"flex",gap:4,marginBottom:18 }}>
      {[1,2,3,4].map(i=>(
        <div key={i} style={{ flex:1,height:3,borderRadius:2,background:i<=score?c:"rgba(255,255,255,0.1)",transition:"all 0.3s" }}/>
      ))}
    </div>
  );
}

/* ── Auth Desktop ─────────────────────── */

export function AuthDesktop({ onLogin, initialTab="login" }:{ onLogin:(r:AuthRole, email?:string)=>void; initialTab?:AuthTab }) {
  const [tab,           setTab]           = useState<AuthTab>(initialTab);
  const [showPw,        setShowPw]        = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form,          setForm]          = useState({ name:"",email:"",password:"",remember:false });
  const f = (k:string,v:string|boolean) => setForm(p=>({ ...p,[k]:v }));

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    (window as any).onTermsAcceptedFromModal = () => {
      setTermsAccepted(true);
    };
    return () => {
      delete (window as any).onTermsAcceptedFromModal;
    };
  }, []);

  const handleLoginSubmit = () => {
    const isAdmin = form.email.toLowerCase() === "admin@gamehub.com" && form.password === "admin1234";
    onLogin(isAdmin ? "admin" : "user", form.email);
  };

  const PROMOS = [
    { Icon:Zap,    l:"Stock en tiempo real",      s:"Inventario actualizado al minuto" },
    { Icon:Truck,  l:"Envío express 24h",          s:"Todo México — sin sorpresas" },
    { Icon:Shield, l:"Garantía oficial 2 años",    s:"Cobertura certificada incluida" },
    { Icon:Award,  l:"XP en cada compra",          s:"Canjea puntos por descuentos" },
  ];

  return (
    <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"100vh",background:bg }}>

      {/* ── Left: promo panel ── */}
      <div style={{ position:"relative",overflow:"hidden",background:`linear-gradient(160deg,#0d0120 0%,#1a0530 50%,#0A0512 100%)`,display:"flex",flexDirection:"column",justifyContent:"center",padding:"60px 64px" }}>
        {/* Animated grid */}
        <div style={{ position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(139,47,214,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,47,214,0.1) 1px,transparent 1px)`,backgroundSize:"40px 40px",animation:"gridFlow 10s linear infinite",pointerEvents:"none" }}/>
        {/* Ambient glows */}
        <div style={{ position:"absolute",top:"10%",left:"15%",width:380,height:380,borderRadius:"50%",background:"rgba(255,46,158,0.07)",filter:"blur(90px)",pointerEvents:"none" }}/>
        <div style={{ position:"absolute",bottom:"15%",right:"5%",width:260,height:260,borderRadius:"50%",background:"rgba(0,240,255,0.07)",filter:"blur(80px)",pointerEvents:"none" }}/>
        {/* Diagonal accent line */}
        <div style={{ position:"absolute",top:0,right:0,width:1,height:"100%",background:`linear-gradient(to bottom,transparent,${mg}55,${cy}55,transparent)` }}/>

        <div style={{ position:"relative",zIndex:1 }} className="auth-slide">
          <GHLogo scale={1.15}/>

          <h1 className="ghr" style={{ fontSize:44,fontWeight:700,color:tx,lineHeight:1.15,margin:"40px 0 14px",letterSpacing:"0.02em" }}>
            El hardware definitivo<br/>
            <span style={{ background:`linear-gradient(90deg,${mg},${vi} 45%,${cy})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>para gamers pro</span>
          </h1>
          <p className="ghi" style={{ fontSize:15,color:txS,marginBottom:40,lineHeight:1.65,maxWidth:380 }}>
            Teclados mecánicos, visores VR y periféricos 4K. Más de 1,200 productos en stock con envío express.
          </p>

          <div style={{ display:"flex",flexDirection:"column",gap:15,marginBottom:48 }}>
            {PROMOS.map(({ Icon,l,s })=>(
              <div key={l} style={{ display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:40,height:40,borderRadius:10,background:`rgba(255,46,158,0.1)`,border:`1px solid rgba(255,46,158,0.28)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 12px rgba(255,46,158,0.18)` }}>
                  <Icon size={17} color={mg}/>
                </div>
                <div>
                  <p className="ghi" style={{ fontSize:13,fontWeight:700,color:tx,margin:0 }}>{l}</p>
                  <p className="ghi" style={{ fontSize:11,color:txS,margin:0 }}>{s}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live badge */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,padding:"10px 20px",borderRadius:50,background:`linear-gradient(135deg,rgba(255,46,158,0.12),rgba(0,240,255,0.08))`,border:`1px solid rgba(0,240,255,0.3)`,boxShadow:`0 0 18px rgba(0,240,255,0.12)` }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:ok,boxShadow:`0 0 8px ${ok}`,animation:"stockPulse 2s infinite" }}/>
            <span className="ghi" style={{ fontSize:11,fontWeight:700,color:cy,letterSpacing:"0.1em" }}>NUEVO · 2026 · HARDWARE PRO</span>
          </div>
        </div>

        {/* Product ghost image */}
        <img src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=520&h=620&fit=crop&auto=format&q=70"
          alt="" style={{ position:"absolute",right:-10,bottom:0,width:"50%",height:"58%",objectFit:"cover",objectPosition:"center top",opacity:0.18,mixBlendMode:"luminosity",maskImage:"linear-gradient(to right,transparent 0%,white 30%,white 70%,transparent 100%)" }}/>
      </div>

      {/* ── Right: form panel ── */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 52px",background:`linear-gradient(180deg,${bg} 0%,${bgC} 100%)` }}>
        <div style={{ width:"100%",maxWidth:420 }} className="auth-slide">

          {/* User / register tabs */}
          <div style={{ display:"flex",background:bgE,borderRadius:14,padding:4,marginBottom:28,border:`1px solid rgba(139,47,214,0.25)` }}>
            {(["login","register"] as AuthTab[]).map(t=>(
              <button key={t} onClick={()=>{ setTab(t); setTermsAccepted(false); }} style={{ flex:1,padding:"11px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",fontSize:13,fontWeight:700,letterSpacing:"0.06em",transition:"all 0.25s",background:tab===t?`linear-gradient(135deg,${mg},${vi})`:"transparent",color:tab===t?"#fff":txS,boxShadow:tab===t?GM:"none" }}>
                {t==="login"?"INICIAR SESIÓN":"REGISTRARSE"}
              </button>
            ))}
          </div>

          {tab==="login" ? (
            <div className="fade-in">
              <h2 className="ghr" style={{ fontSize:30,fontWeight:700,color:tx,marginBottom:5,letterSpacing:"0.03em" }}>Bienvenido de vuelta</h2>
              <p className="ghi" style={{ fontSize:13,color:txS,marginBottom:28 }}>Accede a tu cuenta GameHub</p>

              <AuthInput icon={AtSign} type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={v=>f("email",v)}
                onFocus={e=>{ const i=e?.currentTarget?.closest?.("div")?.querySelector?.("input"); if(i) i.style.boxShadow=GM; }}/>
              <div style={{ position:"relative",marginBottom:16 }}>
                <Lock size={15} color={txS} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <input type={showPw?"text":"password"} placeholder="••••••••" value={form.password} onChange={e=>f("password",e.target.value)}
                  style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:12,padding:"13px 48px 13px 44px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box",transition:"border-color 0.2s,box-shadow 0.2s" }}/>
                <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:txS,display:"flex" }}>
                  {showPw?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>
              </div>

              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:26 }}>
                <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer" }} onClick={()=>f("remember",!form.remember)}>
                  <div style={{ width:18,height:18,borderRadius:4,border:`1px solid ${form.remember?mg+"88":"rgba(139,47,214,0.4)"}`,background:form.remember?"rgba(255,46,158,0.12)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",flexShrink:0 }}>
                    {form.remember&&<Check size={11} color={mg}/>}
                  </div>
                  <span className="ghi" style={{ fontSize:12,color:txS }}>Recordarme</span>
                </label>
                <button type="button" onClick={() => {
                  const email = prompt("Ingresa tu correo para recuperar tu contraseña:", form.email);
                  if (email) {
                    toast.success(`Enlace de recuperación enviado a: ${email}`);
                    setTimeout(() => {
                      toast.info(`📬 Nuevo correo recibido en: ${email}`, {
                        description: "[GameHub Support] Restablece tu contraseña. Revisa tu bandeja de entrada.",
                        duration: 6000
                      });
                    }, 2500);
                  }
                }} style={{ background:"none",border:"none",cursor:"pointer",color:cy,fontSize:12,fontFamily:"'Inter',sans-serif" }}>¿Olvidaste tu contraseña?</button>
              </div>

              <NeonBtn variant="primary" full onClick={handleLoginSubmit} style={{ justifyContent:"center",padding:"15px",fontSize:15,letterSpacing:"0.07em" }}>
                <LogIn size={16}/>ENTRAR A LA TIENDA
              </NeonBtn>

              <div style={{ display:"flex",alignItems:"center",gap:12,margin:"22px 0" }}>
                <div style={{ flex:1,height:1,background:"rgba(139,47,214,0.2)" }}/>
                <span className="ghi" style={{ fontSize:11,color:txS }}>o accede con</span>
                <div style={{ flex:1,height:1,background:"rgba(139,47,214,0.2)" }}/>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                {[{l:"Google",c:"#4285F4"},{l:"PlayStation",c:vi},{l:"Xbox",c:"#107C10"}].map(({ l,c })=>(
                  <button key={l} onClick={() => {
                    toast.success(`Conectando con tu cuenta de ${l}...`);
                    onLogin("user");
                  }} style={{ flex:1,padding:"11px",borderRadius:10,background:bgE,border:`1px solid rgba(139,47,214,0.22)`,color:txS,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em",transition:"all 0.15s",boxSizing:"border-box" }}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor=`${c}66`)} onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(139,47,214,0.22)")}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <h2 className="ghr" style={{ fontSize:30,fontWeight:700,color:tx,marginBottom:5,letterSpacing:"0.03em" }}>Únete a GameHub</h2>
              <p className="ghi" style={{ fontSize:13,color:txS,marginBottom:24 }}>Crea tu cuenta y empieza a ganar XP</p>

              <AuthInput icon={User} type="text" placeholder="Nombre de gamer" value={form.name} onChange={v=>f("name",v)}/>
              <AuthInput icon={AtSign} type="email" placeholder="Correo electrónico" value={form.email} onChange={v=>f("email",v)}/>
              <div style={{ position:"relative",marginBottom:6 }}>
                <Lock size={15} color={txS} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <input type={showPw?"text":"password"} placeholder="Contraseña (mín. 8 caracteres)" value={form.password} onChange={e=>f("password",e.target.value)}
                  style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:12,padding:"13px 48px 13px 44px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box",transition:"border-color 0.2s,box-shadow 0.2s" }}/>
                <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:txS,display:"flex" }}>
                  {showPw?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>
              </div>
              <PwStrength pw={form.password}/>

              <label style={{ display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer",marginBottom:18,marginTop:12 }}>
                <div onClick={()=>setTermsAccepted(t=>!t)} style={{ width:18,height:18,borderRadius:4,border:`1px solid ${termsAccepted?mg+"88":"rgba(139,47,214,0.4)"}`,background:termsAccepted?"rgba(255,46,158,0.12)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s" }}>
                  {termsAccepted&&<Check size={11} color={mg}/>}
                </div>
                <span className="ghi" style={{ fontSize:12,color:txS,lineHeight:1.4 }}>
                  He leído y acepto los <span onClick={(e) => { e.stopPropagation(); e.preventDefault(); if ((window as any).openTerms) (window as any).openTerms(); }} style={{ color:mg,cursor:"pointer",fontWeight:600 }}>Términos</span> y la <span onClick={(e) => { e.stopPropagation(); e.preventDefault(); if ((window as any).openPrivacy) (window as any).openPrivacy(); }} style={{ color:mg,cursor:"pointer",fontWeight:600 }}>Política de Privacidad</span> de GameHub Store.*
                </span>
              </label>

              <NeonBtn variant="primary" full disabled={!termsAccepted} onClick={handleLoginSubmit} style={{ justifyContent:"center",padding:"15px",fontSize:15,letterSpacing:"0.07em",opacity:termsAccepted?1:0.5,pointerEvents:termsAccepted?"auto":"none" }}>
                <UserPlus size={16}/>CREAR CUENTA DE GAMER
              </NeonBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Auth Mobile ───────────────────────── */

export function AuthMobile({ onLogin, initialTab="login" }:{ onLogin:(r:AuthRole, email?:string)=>void; initialTab?:AuthTab }) {
  const [tab,           setTab]           = useState<AuthTab>(initialTab);
  const [showPw,        setShowPw]        = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [form,          setForm]          = useState({ name:"",email:"",password:"",remember:false });
  const f = (k:string,v:string|boolean) => setForm(p => ({ ...p,[k]:v }));

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    (window as any).onTermsAcceptedFromModal = () => { setTermsAccepted(true); };
    return () => { delete (window as any).onTermsAcceptedFromModal; };
  }, []);

  const handleLoginSubmit = () => {
    const isAdmin = form.email.toLowerCase() === "admin@gamehub.com" && form.password === "admin1234";
    onLogin(isAdmin ? "admin" : "user", form.email);
  };

  const inputSt: React.CSSProperties = {
    width:"100%", background:bgE, border:"1px solid rgba(139,47,214,0.35)",
    borderRadius:14, padding:"16px 16px 16px 50px", color:tx, fontSize:16, outline:"none",
    fontFamily:"'Inter',sans-serif", boxSizing:"border-box",
  };

  const iconSt: React.CSSProperties = {
    position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", pointerEvents:"none",
  };

  return (
    <div style={{ background:bg, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      {/* Hero header */}
      <div style={{ position:"relative", padding:"48px 24px 36px", overflow:"hidden", background:`linear-gradient(160deg,#1a0530 0%,#0d0120 60%,#0A0512 100%)`, flexShrink:0 }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(139,47,214,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,47,214,0.1) 1px,transparent 1px)`, backgroundSize:"32px 32px", animation:"gridFlow 10s linear infinite" }}/>
        <div style={{ position:"absolute", top:"20%", left:"10%", width:200, height:200, borderRadius:"50%", background:"rgba(255,46,158,0.08)", filter:"blur(60px)", pointerEvents:"none" }}/>
        <div style={{ position:"relative", display:"flex", justifyContent:"center" }}>
          <GHLogo scale={1.1}/>
        </div>
      </div>

      {/* Form area */}
      <div style={{ flex:1, padding:"28px 22px 48px", overflowY:"auto" }} className="thin-scroll">
        {/* Tabs */}
        <div style={{ display:"flex", background:bgE, borderRadius:14, padding:4, marginBottom:32, border:`1px solid rgba(139,47,214,0.3)` }}>
          {(["login","register"] as AuthTab[]).map(t => (
            <button key={t} onClick={() => { setTab(t); setTermsAccepted(false); }} style={{
              flex:1, padding:"15px", borderRadius:10, border:"none", cursor:"pointer",
              fontFamily:"'Rajdhani',sans-serif", fontSize:15, fontWeight:700, letterSpacing:"0.06em",
              transition:"all 0.25s",
              background:tab===t?`linear-gradient(135deg,${mg},${vi})`:"transparent",
              color:tab===t?"#fff":txS, boxShadow:tab===t?GM:"none"
            }}>
              {t==="login"?"INICIAR SESIÓN":"REGISTRARSE"}
            </button>
          ))}
        </div>

        {tab==="login" ? (
          <div className="fade-in">
            <h2 className="ghr" style={{ fontSize:30, fontWeight:700, color:tx, marginBottom:6 }}>Bienvenido de vuelta</h2>
            <p className="ghi" style={{ fontSize:15, color:txS, marginBottom:28 }}>Accede a tu cuenta GameHub</p>

            <div style={{ position:"relative", marginBottom:16 }}>
              <AtSign size={20} color={txS} style={iconSt}/>
              <input type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={e=>f("email",e.target.value)} style={inputSt}/>
            </div>
            <div style={{ position:"relative", marginBottom:22 }}>
              <Lock size={20} color={txS} style={iconSt}/>
              <input type={showPw?"text":"password"} placeholder="••••••••" value={form.password} onChange={e=>f("password",e.target.value)} style={{ ...inputSt, paddingRight:52 }}/>
              <button type="button" onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:txS, display:"flex" }}>
                {showPw?<EyeOff size={20}/>:<Eye size={20}/>}
              </button>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
              <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>f("remember",!form.remember)}>
                <div style={{ width:24, height:24, borderRadius:6, border:`2px solid ${form.remember?mg:"rgba(139,47,214,0.4)"}`, background:form.remember?"rgba(255,46,158,0.12)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
                  {form.remember&&<Check size={14} color={mg}/>}
                </div>
                <span className="ghi" style={{ fontSize:15, color:txS }}>Recordarme</span>
              </label>
              <button type="button" onClick={() => {
                const email = prompt("Ingresa tu correo para recuperar tu contraseña:", form.email);
                if (email) {
                  toast.success(`Enlace de recuperación enviado a: ${email}`);
                  setTimeout(() => {
                    toast.info(`📬 Nuevo correo recibido en: ${email}`, {
                      description: "[GameHub Support] Restablece tu contraseña. Revisa tu bandeja de entrada.",
                      duration: 6000
                    });
                  }, 2500);
                }
              }} style={{ background:"none", border:"none", cursor:"pointer", color:cy, fontSize:15, fontFamily:"'Inter',sans-serif" }}>¿Olvidaste?</button>
            </div>

            <NeonBtn variant="primary" full onClick={handleLoginSubmit} style={{ justifyContent:"center", padding:"20px", fontSize:18, letterSpacing:"0.07em", borderRadius:14 }}>
              <LogIn size={20}/>ENTRAR A LA TIENDA
            </NeonBtn>

            <div style={{ display:"flex", alignItems:"center", gap:12, margin:"28px 0" }}>
              <div style={{ flex:1, height:1, background:"rgba(139,47,214,0.2)" }}/>
              <span className="ghi" style={{ fontSize:13, color:txS }}>o accede con</span>
              <div style={{ flex:1, height:1, background:"rgba(139,47,214,0.2)" }}/>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              {[{l:"Google",c:"#4285F4"},{l:"PlayStation",c:vi},{l:"Xbox",c:"#107C10"}].map(({l,c}) => (
                <button key={l} onClick={() => { toast.success(`Conectando con ${l}...`); onLogin("user"); }} style={{
                  flex:1, padding:"16px 8px", borderRadius:12, background:bgE,
                  border:`1px solid rgba(139,47,214,0.25)`, color:txS, fontSize:13, fontWeight:700,
                  cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", letterSpacing:"0.04em", transition:"all 0.2s"
                }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=`${c}66`)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(139,47,214,0.25)")}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="fade-in">
            <h2 className="ghr" style={{ fontSize:30, fontWeight:700, color:tx, marginBottom:6 }}>Únete a GameHub</h2>
            <p className="ghi" style={{ fontSize:15, color:txS, marginBottom:24 }}>Crea tu cuenta y empieza a ganar XP</p>

            <div style={{ position:"relative", marginBottom:16 }}>
              <User size={20} color={txS} style={iconSt}/>
              <input type="text" placeholder="Nombre de gamer" value={form.name} onChange={e=>f("name",e.target.value)} style={inputSt}/>
            </div>
            <div style={{ position:"relative", marginBottom:16 }}>
              <AtSign size={20} color={txS} style={iconSt}/>
              <input type="email" placeholder="Correo electrónico" value={form.email} onChange={e=>f("email",e.target.value)} style={inputSt}/>
            </div>
            <div style={{ position:"relative", marginBottom:10 }}>
              <Lock size={20} color={txS} style={iconSt}/>
              <input type={showPw?"text":"password"} placeholder="Contraseña (mín. 8 caracteres)" value={form.password} onChange={e=>f("password",e.target.value)} style={{ ...inputSt, paddingRight:52 }}/>
              <button type="button" onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:txS, display:"flex" }}>
                {showPw?<EyeOff size={20}/>:<Eye size={20}/>}
              </button>
            </div>
            <PwStrength pw={form.password}/>

            <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer", marginBottom:28, marginTop:16 }}>
              <div onClick={()=>setTermsAccepted(t=>!t)} style={{ width:24, height:24, borderRadius:6, border:`2px solid ${termsAccepted?mg:"rgba(139,47,214,0.4)"}`, background:termsAccepted?"rgba(255,46,158,0.12)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s", marginTop:2 }}>
                {termsAccepted&&<Check size={14} color={mg}/>}
              </div>
              <span className="ghi" style={{ fontSize:14, color:txS, lineHeight:1.5 }}>
                Acepto los <span onClick={(e) => { e.stopPropagation(); if ((window as any).openTerms) (window as any).openTerms(); }} style={{ color:mg, cursor:"pointer", fontWeight:600 }}>Términos</span> y la <span onClick={(e) => { e.stopPropagation(); if ((window as any).openPrivacy) (window as any).openPrivacy(); }} style={{ color:mg, cursor:"pointer", fontWeight:600 }}>Privacidad</span> de GameHub.*
              </span>
            </label>

            <NeonBtn variant="primary" full disabled={!termsAccepted} onClick={handleLoginSubmit} style={{ justifyContent:"center", padding:"20px", fontSize:18, letterSpacing:"0.07em", borderRadius:14, opacity:termsAccepted?1:0.5, pointerEvents:termsAccepted?"auto":"none" }}>
              <UserPlus size={20}/>CREAR CUENTA DE GAMER
            </NeonBtn>
          </div>
        )}
      </div>
    </div>
  );
}

