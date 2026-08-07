import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus, KeyRound, AtSign, User, Lock, Check, Settings, AlertTriangle, LayoutDashboard, Zap, Truck, Shield, Award } from "lucide-react";
import { bg, bgC, bgE, mg, vi, cy, ok, tx, txS, GM, GV, GC, NeonBtn, GHLogo } from "./shared";

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

export function AuthDesktop({ onLogin }:{ onLogin:(r:AuthRole)=>void }) {
  const [tab,       setTab]       = useState<AuthTab>("login");
  const [adminMode, setAdminMode] = useState(false);
  const [showPw,    setShowPw]    = useState(false);
  const [form,      setForm]      = useState({ name:"",email:"",password:"",remember:false,staffCode:"" });
  const f = (k:string,v:string|boolean) => setForm(p=>({ ...p,[k]:v }));

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

          {!adminMode ? (
            <>
              {/* User / register tabs */}
              <div style={{ display:"flex",background:bgE,borderRadius:14,padding:4,marginBottom:28,border:`1px solid rgba(139,47,214,0.25)` }}>
                {(["login","register"] as AuthTab[]).map(t=>(
                  <button key={t} onClick={()=>setTab(t)} style={{ flex:1,padding:"11px",borderRadius:10,border:"none",cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",fontSize:13,fontWeight:700,letterSpacing:"0.06em",transition:"all 0.25s",background:tab===t?`linear-gradient(135deg,${mg},${vi})`:"transparent",color:tab===t?"#fff":txS,boxShadow:tab===t?GM:"none" }}>
                    {t==="login"?"INICIAR SESIÓN":"REGISTRARSE"}
                  </button>
                ))}
              </div>

              {tab==="login" ? (
                <div className="fade-in">
                  <h2 className="ghr" style={{ fontSize:30,fontWeight:700,color:tx,marginBottom:5,letterSpacing:"0.03em" }}>Bienvenido de vuelta</h2>
                  <p className="ghi" style={{ fontSize:13,color:txS,marginBottom:28 }}>Accede a tu cuenta GameHub</p>

                  <AuthInput icon={AtSign} type="email" placeholder="Correo electrónico" value={form.email} onChange={v=>f("email",v)}
                    onFocus={e=>{ const i=e?.currentTarget?.closest?.("div")?.querySelector?.("input"); if(i) i.style.boxShadow=GM; }}/>
                  <div style={{ position:"relative",marginBottom:16 }}>
                    <Lock size={15} color={txS} style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                    <input type={showPw?"text":"password"} placeholder="Contraseña" value={form.password} onChange={e=>f("password",e.target.value)}
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
                    <button style={{ background:"none",border:"none",cursor:"pointer",color:cy,fontSize:12,fontFamily:"'Inter',sans-serif" }}>¿Olvidaste tu contraseña?</button>
                  </div>

                  <NeonBtn variant="primary" full onClick={()=>onLogin("user")} style={{ justifyContent:"center",padding:"15px",fontSize:15,letterSpacing:"0.07em" }}>
                    <LogIn size={16}/>ENTRAR A LA TIENDA
                  </NeonBtn>

                  <div style={{ display:"flex",alignItems:"center",gap:12,margin:"22px 0" }}>
                    <div style={{ flex:1,height:1,background:"rgba(139,47,214,0.2)" }}/>
                    <span className="ghi" style={{ fontSize:11,color:txS }}>o accede con</span>
                    <div style={{ flex:1,height:1,background:"rgba(139,47,214,0.2)" }}/>
                  </div>
                  <div style={{ display:"flex",gap:10 }}>
                    {[{l:"Google",c:"#4285F4"},{l:"PlayStation",c:vi},{l:"Xbox",c:"#107C10"}].map(({ l,c })=>(
                      <button key={l} style={{ flex:1,padding:"11px",borderRadius:10,background:bgE,border:`1px solid rgba(139,47,214,0.22)`,color:txS,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em",transition:"all 0.15s",boxSizing:"border-box" }}
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

                  <NeonBtn variant="primary" full onClick={()=>onLogin("user")} style={{ justifyContent:"center",padding:"15px",fontSize:15,letterSpacing:"0.07em" }}>
                    <UserPlus size={16}/>CREAR CUENTA DE GAMER
                  </NeonBtn>

                  <p className="ghi" style={{ fontSize:11,color:txS,textAlign:"center",marginTop:16,lineHeight:1.55 }}>
                    Al registrarte aceptas los <span style={{ color:mg,cursor:"pointer" }}>Términos</span> y la <span style={{ color:mg,cursor:"pointer" }}>Política de Privacidad</span>
                  </p>
                </div>
              )}
            </>
          ) : (
            /* ── Admin login ── */
            <div className="fade-in">
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
                <div style={{ width:42,height:42,borderRadius:10,background:`rgba(255,69,0,0.1)`,border:`1px solid rgba(255,69,0,0.45)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 14px rgba(255,69,0,0.3)" }}>
                  <Settings size={18} color="#FF4500"/>
                </div>
                <div>
                  <h2 className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,letterSpacing:"0.05em",margin:0 }}>PANEL DE ADMINISTRACIÓN</h2>
                  <p className="ghi" style={{ fontSize:11,color:"#FF6533",margin:0 }}>Acceso Staff — Área restringida</p>
                </div>
              </div>

              <div style={{ background:`rgba(255,69,0,0.06)`,border:`1px solid rgba(255,69,0,0.28)`,borderRadius:12,padding:"11px 16px",marginBottom:24,display:"flex",alignItems:"center",gap:8 }}>
                <AlertTriangle size={13} color="#FF6533"/>
                <span className="ghi" style={{ fontSize:11,color:"#FF6533" }}>Este acceso excluye la navegación de la tienda</span>
              </div>

              {/* Staff fields */}
              {[
                { icon:User,    type:"email",    ph:"Correo de staff (@gamehub.com)", key:"email",     val:form.email },
                { icon:Lock,    type:"password", ph:"Contraseña de staff",            key:"password",  val:form.password },
                { icon:KeyRound,type:"text",     ph:"Código de verificación (STAFF-XXXX)", key:"staffCode", val:form.staffCode },
              ].map(({ icon:Icon,type,ph,key,val })=>(
                <div key={key} style={{ position:"relative",marginBottom:12 }}>
                  <Icon size={15} color="#FF6533" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input type={type} placeholder={ph} value={val} onChange={e=>f(key,e.target.value)}
                    style={{ width:"100%",background:bgE,border:`1px solid rgba(255,69,0,0.32)`,borderRadius:12,padding:"13px 16px 13px 44px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box",transition:"border-color 0.2s,box-shadow 0.2s" }}
                    onFocus={e=>{ e.target.style.borderColor="rgba(255,69,0,0.75)"; e.target.style.boxShadow="0 0 18px rgba(255,69,0,0.35)"; }}
                    onBlur={e=>{  e.target.style.borderColor="rgba(255,69,0,0.32)";  e.target.style.boxShadow="none"; }}/>
                </div>
              ))}

              <button onClick={()=>onLogin("admin")} className="neon-btn" style={{ width:"100%",marginTop:10,padding:"15px",borderRadius:12,background:`linear-gradient(135deg,#E03000,#FF6533)`,border:"none",cursor:"pointer",color:"#fff",fontSize:15,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,letterSpacing:"0.08em",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 0 22px rgba(255,69,0,0.55),0 0 44px rgba(255,69,0,0.2)" }}>
                <LayoutDashboard size={16}/>ACCEDER AL PANEL ADMIN
              </button>
            </div>
          )}

          {/* Admin toggle */}
          <div style={{ marginTop:30,textAlign:"center",borderTop:`1px solid rgba(139,47,214,0.15)`,paddingTop:20 }}>
            <button onClick={()=>{ setAdminMode(p=>!p); setForm({ name:"",email:"",password:"",remember:false,staffCode:"" }); }}
              style={{ background:"none",border:"none",cursor:"pointer",color:adminMode?cy:txS,fontSize:11,fontFamily:"'Inter',sans-serif",display:"inline-flex",alignItems:"center",gap:6,opacity:0.65,transition:"opacity 0.2s,color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.opacity="1")} onMouseLeave={e=>(e.currentTarget.style.opacity="0.65")}>
              <Settings size={11}/>
              {adminMode?"← Volver al login de usuario":"Acceso a Panel de Administración / Staff"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Auth Mobile ───────────────────────── */

export function AuthMobile({ onLogin }:{ onLogin:(r:AuthRole)=>void }) {
  const [tab,       setTab]       = useState<AuthTab>("login");
  const [adminMode, setAdminMode] = useState(false);
  const [showPw,    setShowPw]    = useState(false);
  const [form,      setForm]      = useState({ name:"",email:"",password:"",remember:false,staffCode:"" });
  const f = (k:string,v:string|boolean) => setForm(p=>({ ...p,[k]:v }));

  const inputSt = (accent?:string) => ({
    width:"100%",background:bgE,border:`1px solid ${accent?"rgba(255,69,0,0.32)":"rgba(139,47,214,0.28)"}`,
    borderRadius:12,padding:"12px 16px 12px 42px",color:tx,fontSize:13,outline:"none",
    fontFamily:"'Inter',sans-serif",boxSizing:"border-box" as const,
  });

  return (
    <div style={{ background:bg,minHeight:"100%",display:"flex",flexDirection:"column" }}>
      {/* Header */}
      <div style={{ position:"relative",padding:"28px 18px 22px",overflow:"hidden",background:`linear-gradient(160deg,#1a0530,#0A0512)`,flexShrink:0 }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(139,47,214,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(139,47,214,0.09) 1px,transparent 1px)`,backgroundSize:"28px 28px",animation:"gridFlow 10s linear infinite" }}/>
        <div style={{ position:"relative",display:"flex",justifyContent:"center" }}>
          <GHLogo scale={0.82}/>
        </div>
      </div>

      <div style={{ flex:1,padding:"16px 16px 80px",overflowY:"auto" }} className="thin-scroll">
        {!adminMode ? (
          <>
            <div style={{ display:"flex",background:bgE,borderRadius:12,padding:3,marginBottom:20,border:`1px solid rgba(139,47,214,0.25)` }}>
              {(["login","register"] as AuthTab[]).map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{ flex:1,padding:"10px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",fontSize:12,fontWeight:700,letterSpacing:"0.05em",transition:"all 0.2s",background:tab===t?`linear-gradient(135deg,${mg},${vi})`:"transparent",color:tab===t?"#fff":txS,boxShadow:tab===t?GM:"none" }}>
                  {t==="login"?"INICIAR SESIÓN":"REGISTRARSE"}
                </button>
              ))}
            </div>

            {tab==="login" ? (
              <div className="fade-in">
                <h2 className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,marginBottom:18,letterSpacing:"0.04em" }}>Bienvenido de vuelta</h2>
                <div style={{ position:"relative",marginBottom:11 }}>
                  <AtSign size={14} color={txS} style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input type="email" placeholder="Correo electrónico" value={form.email} onChange={e=>f("email",e.target.value)} style={inputSt()}/>
                </div>
                <div style={{ position:"relative",marginBottom:14 }}>
                  <Lock size={14} color={txS} style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input type={showPw?"text":"password"} placeholder="Contraseña" value={form.password} onChange={e=>f("password",e.target.value)} style={{ ...inputSt(),paddingRight:40 }}/>
                  <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:txS,display:"flex" }}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>
                </div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
                  <label style={{ display:"flex",alignItems:"center",gap:7,cursor:"pointer" }} onClick={()=>f("remember",!form.remember)}>
                    <div style={{ width:16,height:16,borderRadius:3,border:`1px solid ${form.remember?mg+"88":"rgba(139,47,214,0.4)"}`,background:form.remember?"rgba(255,46,158,0.12)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      {form.remember&&<Check size={10} color={mg}/>}
                    </div>
                    <span className="ghi" style={{ fontSize:11,color:txS }}>Recordarme</span>
                  </label>
                  <button style={{ background:"none",border:"none",cursor:"pointer",color:cy,fontSize:11,fontFamily:"'Inter',sans-serif" }}>¿Olvidaste?</button>
                </div>
                <NeonBtn variant="primary" full onClick={()=>onLogin("user")} style={{ justifyContent:"center",padding:"14px",fontSize:14,letterSpacing:"0.06em" }}>
                  <LogIn size={14}/>ENTRAR
                </NeonBtn>
              </div>
            ) : (
              <div className="fade-in">
                <h2 className="ghr" style={{ fontSize:22,fontWeight:700,color:tx,marginBottom:16,letterSpacing:"0.04em" }}>Crear cuenta</h2>
                <div style={{ position:"relative",marginBottom:10 }}>
                  <User size={14} color={txS} style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input type="text" placeholder="Nombre de gamer" value={form.name} onChange={e=>f("name",e.target.value)} style={inputSt()}/>
                </div>
                <div style={{ position:"relative",marginBottom:10 }}>
                  <AtSign size={14} color={txS} style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input type="email" placeholder="Correo electrónico" value={form.email} onChange={e=>f("email",e.target.value)} style={inputSt()}/>
                </div>
                <div style={{ position:"relative",marginBottom:6 }}>
                  <Lock size={14} color={txS} style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input type={showPw?"text":"password"} placeholder="Contraseña (mín. 8 caracteres)" value={form.password} onChange={e=>f("password",e.target.value)} style={{ ...inputSt(),paddingRight:40 }}/>
                  <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:txS,display:"flex" }}>{showPw?<EyeOff size={14}/>:<Eye size={14}/>}</button>
                </div>
                <PwStrength pw={form.password}/>
                <NeonBtn variant="primary" full onClick={()=>onLogin("user")} style={{ justifyContent:"center",padding:"14px",fontSize:14,letterSpacing:"0.06em" }}>
                  <UserPlus size={14}/>CREAR CUENTA DE GAMER
                </NeonBtn>
                <p className="ghi" style={{ fontSize:10,color:txS,textAlign:"center",marginTop:12,lineHeight:1.5 }}>
                  Al registrarte aceptas los <span style={{ color:mg }}>Términos</span> y la <span style={{ color:mg }}>Privacidad</span>
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="fade-in">
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:14 }}>
              <div style={{ width:34,height:34,borderRadius:8,background:`rgba(255,69,0,0.1)`,border:`1px solid rgba(255,69,0,0.45)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Settings size={15} color="#FF4500"/></div>
              <div>
                <p className="ghr" style={{ fontSize:16,fontWeight:700,color:tx,letterSpacing:"0.04em",margin:0 }}>PANEL ADMIN</p>
                <p className="ghi" style={{ fontSize:10,color:"#FF6533",margin:0 }}>Acceso Staff — Restringido</p>
              </div>
            </div>
            <div style={{ background:`rgba(255,69,0,0.06)`,border:`1px solid rgba(255,69,0,0.25)`,borderRadius:10,padding:"10px 13px",marginBottom:18,display:"flex",alignItems:"center",gap:7 }}>
              <AlertTriangle size={12} color="#FF6533"/>
              <span className="ghi" style={{ fontSize:10,color:"#FF6533" }}>Excluye la navegación de tienda</span>
            </div>
            {[
              { icon:User,     type:"email",    ph:"Correo staff",          k:"email" },
              { icon:Lock,     type:"password", ph:"Contraseña staff",      k:"password" },
              { icon:KeyRound, type:"text",     ph:"Código (STAFF-XXXX)",   k:"staffCode" },
            ].map(({ icon:Icon,type,ph,k })=>(
              <div key={k} style={{ position:"relative",marginBottom:10 }}>
                <Icon size={14} color="#FF6533" style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                <input type={type} placeholder={ph} value={(form as Record<string,string>)[k]} onChange={e=>f(k,e.target.value)} style={inputSt("orange")}/>
              </div>
            ))}
            <button onClick={()=>onLogin("admin")} style={{ width:"100%",marginTop:8,padding:"14px",borderRadius:12,background:`linear-gradient(135deg,#E03000,#FF6533)`,border:"none",cursor:"pointer",color:"#fff",fontSize:14,fontFamily:"'Rajdhani',sans-serif",fontWeight:700,letterSpacing:"0.06em",display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:"0 0 18px rgba(255,69,0,0.5)" }}>
              <LayoutDashboard size={14}/>ACCEDER AL PANEL
            </button>
          </div>
        )}

        {/* Admin toggle */}
        <div style={{ marginTop:22,textAlign:"center",borderTop:`1px solid rgba(139,47,214,0.15)`,paddingTop:16 }}>
          <button onClick={()=>{ setAdminMode(p=>!p); setForm({ name:"",email:"",password:"",remember:false,staffCode:"" }); }}
            style={{ background:"none",border:"none",cursor:"pointer",color:adminMode?cy:txS,fontSize:11,fontFamily:"'Inter',sans-serif",display:"inline-flex",alignItems:"center",gap:5,opacity:0.6 }}>
            <Settings size={11}/>
            {adminMode?"← Volver al login de usuario":"Acceso Panel Admin / Staff"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────── */

