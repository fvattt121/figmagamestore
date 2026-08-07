import { useState, useRef } from "react";
import { toast } from "sonner";
import { LayoutDashboard, Settings, Tag, Upload, Globe, AlertTriangle, Activity, Users, RefreshCw, FileText, Edit3, MoreHorizontal, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Layers, Image, ExternalLink, ToggleLeft, ToggleRight, Info, PieChart, Check, Plus, Minus, Package, Truck, Search, Bell, X, Eye, Monitor, Zap, ShoppingCart, TrendingUp, AlertCircle, Shield, User, Clock, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart as RPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { bg, bgC, bgE, mg, vi, cy, go, ok, tx, txS, GM, GV, GC, GG, NeonBtn, FloatInput, Badge, Stars, OrderStatus, STATUS_CFG, CATEGORIES, PRODUCTS, Product, imgUrl } from "./shared";

/* ═══════════════════════════════════════
   ADMIN — DATA CONSTANTS
═══════════════════════════════════════ */

export const KPI_DATA = [
  { label:"Ingresos del Día",       value:"$24,831",  delta:"+12.4%", trend:"up",   Icon:Zap,       color:mg,  sub:"vs. ayer $22,091" },
  { label:"Tasa de Conversión",     value:"3.82%",    delta:"+0.31%", trend:"up",   Icon:TrendingUp, color:cy,  sub:"1,240 visitas hoy" },
  { label:"Órdenes Activas",        value:"187",      delta:"-4",     trend:"down", Icon:ShoppingCart,color:vi, sub:"23 pendientes pago" },
  { label:"Usuarios Activos",       value:"4,291",    delta:"+8.7%",  trend:"up",   Icon:Users,     color:ok,  sub:"Ahora: 312 en línea" },
  { label:"Rotación de Inventario", value:"6.2x",     delta:"+0.4x",  trend:"up",   Icon:RefreshCw, color:go,  sub:"Ciclo: 58.9 días" },
];

export const BAR_DATA = [
  { canal:"Tienda Web", hoy:8420, ayer:7100 },
  { canal:"App Móvil",  hoy:5630, ayer:4980 },
  { canal:"Marketplace",hoy:3820, ayer:4200 },
  { canal:"Afiliados",  hoy:2760, ayer:2100 },
  { canal:"Direct",     hoy:1450, ayer:1870 },
  { canal:"Email",      hoy:2751, ayer:1890 },
];

export const LINE_DATA = [
  { dia:"L", ingresos:18200, ordenes:142 },
  { dia:"M", ingresos:21500, ordenes:168 },
  { dia:"X", ingresos:19800, ordenes:155 },
  { dia:"J", ingresos:23100, ordenes:182 },
  { dia:"V", ingresos:27400, ordenes:214 },
  { dia:"S", ingresos:31200, ordenes:243 },
  { dia:"D", ingresos:24831, ordenes:187 },
];

export const PIE_DATA = [
  { name:"Visores VR",  value:34, color:mg  },
  { name:"Teclados",    value:28, color:vi  },
  { name:"Controles",   value:22, color:cy  },
  { name:"Auriculares", value:16, color:go  },
];

export type AlertSev = "critical"|"warning"|"info";
export const ALERTS: { id:number; sev:AlertSev; title:string; detail:string; time:string; loc:string }[] = [
  { id:1, sev:"critical", title:"Stock crítico",          detail:"ProVision VR X2 — solo 2 uds. restantes",         time:"09:14",  loc:"Almacén BCN" },
  { id:2, sev:"critical", title:"Error pasarela de pago", detail:"Stripe timeout — 14 transacciones fallidas",       time:"10:02",  loc:"API Gateway" },
  { id:3, sev:"warning",  title:"Alta tasa de abandono",  detail:"Carrito → Pago: 68% abandono (↑12% vs media)",    time:"10:45",  loc:"Funnel Pago" },
  { id:4, sev:"warning",  title:"Proveedor lento",        detail:"DHL responde >8s en tracking API",                 time:"11:03",  loc:"DHL API" },
  { id:5, sev:"info",     title:"Backup completado",      detail:"Snapshot diario OK — 2.4 GB en 00:12:34",          time:"00:12",  loc:"Servidor DB" },
  { id:6, sev:"info",     title:"SEO indexado",           detail:"34 nuevos productos indexados en Google",          time:"03:30",  loc:"Search Console" },
];
export const ALERT_CFG: Record<AlertSev,{color:string;bg:string;Icon:React.FC<{size:number;color:string}>}> = {
  critical: { color:"#FF4500", bg:"rgba(255,69,0,0.12)",   Icon:({size,color})=><AlertTriangle size={size} color={color}/> },
  warning:  { color:go,        bg:"rgba(255,183,0,0.1)",   Icon:({size,color})=><AlertCircle   size={size} color={color}/> },
  info:     { color:cy,        bg:"rgba(0,240,255,0.08)",  Icon:({size,color})=><Info          size={size} color={color}/> },
};


export const ORDERS: { id:string; client:string; items:number; total:number; status:OrderStatus; carrier:string; dest:string; eta:string; selected?:boolean }[] = [
  { id:"#GH-88472", client:"Carlos García",   items:3, total:939.96, status:"en_ruta",   carrier:"DHL",      dest:"CDMX 06600",        eta:"Mañana" },
  { id:"#GH-88471", client:"Lucía Martínez",  items:1, total:189.99, status:"en_espera", carrier:"Estafeta", dest:"Guadalajara 44100",  eta:"2 días" },
  { id:"#GH-88470", client:"Pablo Sánchez",   items:2, total:299.98, status:"entregado", carrier:"DHL",      dest:"Monterrey 64000",   eta:"Entregado" },
  { id:"#GH-88469", client:"Ana Torres",      items:1, total:599.99, status:"en_ruta",   carrier:"FedEx",    dest:"Puebla 72000",       eta:"Hoy 21h" },
  { id:"#GH-88468", client:"Miguel Ruiz",     items:4, total:519.95, status:"en_espera", carrier:"Estafeta", dest:"Tijuana 22000",      eta:"3 días" },
  { id:"#GH-88467", client:"Sara López",      items:1, total:149.99, status:"entregado", carrier:"DHL",      dest:"Cancún 77500",       eta:"Entregado" },
  { id:"#GH-88466", client:"Javier Moreno",   items:2, total:749.98, status:"cancelado", carrier:"—",        dest:"León 37000",         eta:"—" },
  { id:"#GH-88465", client:"Elena Fernández", items:1, total:89.99,  status:"en_ruta",   carrier:"FedEx",    dest:"Mérida 97000",       eta:"Pasado" },
];

export const SEO_CHECKS = [
  "Título de producto (50-60 chars)",
  "Meta description (120-160 chars)",
  "URL slug amigable",
  "Datos estructurados (schema.org/Product)",
  "Open Graph tags",
  "Alt-text en todas las imágenes",
];

/* ═══════════════════════════════════════
   ADMIN — SHARED COMPONENTS
═══════════════════════════════════════ */

export function AdminSidebar({ active, onNav }:{ active:string; onNav:(s:string)=>void }) {
  const items = [
    { id:"admin-dashboard", Icon:LayoutDashboard, label:"Dashboard" },
    { id:"admin-catalog",   Icon:Tag,             label:"Catálogo" },
    { id:"admin-logistics", Icon:Truck,           label:"Logística" },
    { id:"home",            Icon:ExternalLink,    label:"Ver tienda" },
  ];
  return (
    <div style={{ width:64,height:"100vh",position:"fixed",left:0,top:56,zIndex:80,background:bgC,borderRight:`1px solid rgba(139,47,214,0.2)`,display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0" }}>
      <div style={{ marginBottom:12,width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:GV }}>
        <Shield size={16} color="#fff"/>
      </div>
      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:4,width:"100%",alignItems:"center" }}>
        {items.map(({ id,Icon,label })=>{
          const on = active===id;
          return (
            <button key={id} title={label} onClick={()=>onNav(id)} style={{ position:"relative",width:44,height:44,borderRadius:10,background:on?"rgba(139,47,214,0.15)":"transparent",border:"none",cursor:"pointer",color:on?vi:txS,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:on?GV:"none",transition:"all 0.2s" }}>
              <Icon size={20}/>
              {on&&<div style={{ position:"absolute",left:0,top:"20%",height:"60%",width:3,background:vi,borderRadius:"0 2px 2px 0",boxShadow:`0 0 10px ${vi}` }}/>}
            </button>
          );
        })}
      </div>
      <div style={{ width:36,height:1,background:`rgba(139,47,214,0.3)`,marginBottom:8 }}/>
      <button title="Configuración" style={{ width:44,height:44,borderRadius:10,background:"transparent",border:"none",cursor:"pointer",color:txS,display:"flex",alignItems:"center",justifyContent:"center" }}><Settings size={18}/></button>
      <button title="Perfil admin" style={{ width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginTop:6 }}><User size={14} color="#fff"/></button>
    </div>
  );
}

export function AdminTopBar({ title, sub, onNav, children }:{ title:string; sub?:string; onNav:(s:string)=>void; children?:React.ReactNode }) {
  return (
    <div style={{ padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,position:"sticky",top:0,zIndex:10,flexWrap:"wrap",gap:10 }}>
      <div>
        <h2 className="ghr" style={{ fontSize:20,fontWeight:700,color:tx,letterSpacing:"0.05em",margin:0 }}>{title}</h2>
        {sub&&<p className="ghi" style={{ fontSize:11,color:txS,margin:0 }}>{sub}</p>}
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10 }}>
        {children}
        <button onClick={()=>toast("🔔 No hay notificaciones pendientes",{description:"Todos los pedidos están al día."})} style={{ position:"relative",background:"none",border:"none",cursor:"pointer",color:txS }}><Bell size={20}/><span style={{ position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:"50%",background:"#FF4500" }}/></button>
        <button onClick={()=>onNav("profile")} title="Mi perfil" style={{ width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${vi},${mg})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><User size={14} color="#fff"/></button>
      </div>
    </div>
  );
}

export function KpiCard({ kpi, compact=false }:{ kpi:typeof KPI_DATA[0]; compact?:boolean }) {
  const up = kpi.trend==="up";
  return (
    <div className="gh-card" style={{ background:bgC,borderRadius:14,padding:compact?"12px 14px":"18px 20px",border:`1px solid rgba(139,47,214,0.2)`,boxShadow:"0 4px 16px rgba(0,0,0,0.3)" }}>
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:compact?6:10 }}>
        <div style={{ width:compact?32:38,height:compact?32:38,borderRadius:10,background:`${kpi.color}18`,border:`1px solid ${kpi.color}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <kpi.Icon size={compact?14:18} color={kpi.color}/>
        </div>
        <span className="ghi" style={{ fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:4,background:up?"rgba(0,230,118,0.1)":"rgba(255,69,0,0.1)",color:up?ok:"#FF4500",letterSpacing:"0.04em" }}>{kpi.delta}</span>
      </div>
      <p className="ghr" style={{ fontSize:compact?22:28,fontWeight:700,color:kpi.color,margin:"0 0 2px",lineHeight:1 }}>{kpi.value}</p>
      <p className="ghi" style={{ fontSize:compact?10:11,color:tx,fontWeight:600,margin:0 }}>{kpi.label}</p>
      {!compact&&<p className="ghi" style={{ fontSize:10,color:txS,marginTop:3 }}>{kpi.sub}</p>}
    </div>
  );
}

export function AlertRow({ a, compact=false }:{ a:typeof ALERTS[0]; compact?:boolean }) {
  const cfg = ALERT_CFG[a.sev];
  return (
    <div style={{ display:"flex",alignItems:"flex-start",gap:10,padding:compact?"10px 0":"12px 0",borderBottom:`1px solid rgba(139,47,214,0.1)` }}>
      <div style={{ width:compact?28:32,height:compact?28:32,borderRadius:8,flexShrink:0,background:cfg.bg,border:`1px solid ${cfg.color}33`,display:"flex",alignItems:"center",justifyContent:"center" }}>
        <cfg.Icon size={compact?13:15} color={cfg.color}/>
      </div>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
          <span className="ghi" style={{ fontSize:compact?11:12,fontWeight:700,color:tx }}>{a.title}</span>
          <span className="ghi" style={{ fontSize:9,padding:"1px 6px",borderRadius:3,background:cfg.bg,color:cfg.color,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase" }}>{a.sev}</span>
        </div>
        <p className="ghi" style={{ fontSize:compact?10:11,color:txS,margin:"1px 0 0",lineHeight:1.4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{a.detail}</p>
        <div style={{ display:"flex",gap:10,marginTop:2 }}>
          <span className="ghi" style={{ fontSize:9,color:txS }}><Clock size={8}/> {a.time}</span>
          <span className="ghi" style={{ fontSize:9,color:txS }}><MapPin size={8}/> {a.loc}</span>
        </div>
      </div>
      <button style={{ background:"none",border:"none",cursor:"pointer",color:txS,flexShrink:0,padding:"2px 4px" }}><X size={12}/></button>
    </div>
  );
}

/* recharts custom tooltip */
export function ChartTip({ active, payload, label }:any) {
  if (!active||!payload?.length) return null;
  return (
    <div style={{ background:bgC,border:`1px solid rgba(255,46,158,0.3)`,borderRadius:10,padding:"10px 14px",boxShadow:GM }}>
      <p className="ghi" style={{ fontSize:11,color:txS,marginBottom:4 }}>{label}</p>
      {payload.map((p:any)=>(
        <div key={p.name} style={{ display:"flex",alignItems:"center",gap:6,marginBottom:2 }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:p.color }}/>
          <span className="ghi" style={{ fontSize:12,color:tx,fontWeight:600 }}>{p.name}: <span style={{color:p.color}}>{typeof p.value==="number"&&p.value>999?`$${(p.value/1000).toFixed(1)}k`:p.value}</span></span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN DASHBOARD — DESKTOP
═══════════════════════════════════════ */

export function AdminDashboardDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [alertFilter, setAlertFilter] = useState<AlertSev|"all">("all");
  const filteredAlerts = alertFilter==="all"?ALERTS:ALERTS.filter(a=>a.sev===alertFilter);
  return (
    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>
      <AdminSidebar active="admin-dashboard" onNav={onNav}/>
      <div style={{ marginLeft:64,flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>
        <AdminTopBar title="DASHBOARD EJECUTIVO" sub={`Último refresh: ${new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}`} onNav={onNav}>
          <NeonBtn variant="secondary" small onClick={()=>{}}><RefreshCw size={12}/>Actualizar</NeonBtn>
        </AdminTopBar>
        <div style={{ flex:1,overflowY:"auto",padding:"24px",maxHeight:"calc(100vh - 56px - 57px)" }} className="thin-scroll">
          {/* KPI row */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:28 }}>
            {KPI_DATA.map(k=><KpiCard key={k.label} kpi={k}/>)}
          </div>
          {/* Charts row */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 280px",gap:18,marginBottom:28 }}>
            {/* Bar */}
            <div style={{ background:bgC,borderRadius:16,padding:"20px 20px 12px",border:`1px solid rgba(139,47,214,0.2)` }}>
              <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:16 }}>VENTAS POR CANAL</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={BAR_DATA} barSize={14} barGap={3}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,47,214,0.15)" vertical={false}/>
                  <XAxis dataKey="canal" tick={{ fill:txS,fontSize:10,fontFamily:"Inter,sans-serif" }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:txS,fontSize:10,fontFamily:"Inter,sans-serif" }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
                  <Tooltip content={ChartTip}/>
                  <Bar dataKey="hoy" name="Hoy" fill={mg} radius={[3,3,0,0]}/>
                  <Bar dataKey="ayer" name="Ayer" fill={vi} radius={[3,3,0,0]} opacity={0.6}/>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display:"flex",gap:16,justifyContent:"center",marginTop:4 }}>
                {[{ c:mg,l:"Hoy" },{ c:vi,l:"Ayer" }].map(({ c,l })=>(
                  <div key={l} style={{ display:"flex",alignItems:"center",gap:5 }}>
                    <div style={{ width:10,height:10,borderRadius:2,background:c }}/>
                    <span className="ghi" style={{ fontSize:10,color:txS }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Line */}
            <div style={{ background:bgC,borderRadius:16,padding:"20px 20px 12px",border:`1px solid rgba(139,47,214,0.2)` }}>
              <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:16 }}>TENDENCIA SEMANAL</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={LINE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,47,214,0.15)" vertical={false}/>
                  <XAxis dataKey="dia" tick={{ fill:txS,fontSize:10,fontFamily:"Inter,sans-serif" }} axisLine={false} tickLine={false}/>
                  <YAxis yAxisId="left"  tick={{ fill:txS,fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
                  <YAxis yAxisId="right" orientation="right" tick={{ fill:txS,fontSize:10 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={ChartTip}/>
                  <Line yAxisId="left"  type="monotone" dataKey="ingresos" name="Ingresos" stroke={mg} strokeWidth={2.5} dot={{ fill:mg,r:3 }} activeDot={{ r:5,fill:mg }}/>
                  <Line yAxisId="right" type="monotone" dataKey="ordenes"  name="Órdenes"  stroke={cy} strokeWidth={2} dot={{ fill:cy,r:3 }} activeDot={{ r:5,fill:cy }} strokeDasharray="5 3"/>
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display:"flex",gap:16,justifyContent:"center",marginTop:4 }}>
                {[{ c:mg,l:"Ingresos" },{ c:cy,l:"Órdenes" }].map(({ c,l })=>(
                  <div key={l} style={{ display:"flex",alignItems:"center",gap:5 }}>
                    <div style={{ width:10,height:10,borderRadius:2,background:c }}/>
                    <span className="ghi" style={{ fontSize:10,color:txS }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Pie */}
            <div style={{ background:bgC,borderRadius:16,padding:"20px 16px 12px",border:`1px solid rgba(139,47,214,0.2)` }}>
              <p className="ghr" style={{ fontSize:14,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:8 }}>COMPOSICIÓN</p>
              <ResponsiveContainer width="100%" height={160}>
                <RPieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={44} outerRadius={72} paddingAngle={3} dataKey="value">
                    {PIE_DATA.map((entry,i)=>(
                      <Cell key={`cell-${i}`} fill={entry.color} stroke="transparent"/>
                    ))}
                  </Pie>
                  <Tooltip content={ChartTip}/>
                </RPieChart>
              </ResponsiveContainer>
              {PIE_DATA.map(d=>(
                <div key={d.name} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <div style={{ width:8,height:8,borderRadius:"50%",background:d.color,flexShrink:0 }}/>
                    <span className="ghi" style={{ fontSize:10,color:txS }}>{d.name}</span>
                  </div>
                  <span className="ghi" style={{ fontSize:11,fontWeight:700,color:d.color }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Alerts */}
          <div style={{ background:bgC,borderRadius:16,border:`1px solid rgba(139,47,214,0.2)` }}>
            <div style={{ padding:"16px 20px",borderBottom:`1px solid rgba(139,47,214,0.15)`,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10 }}>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <Activity size={16} color={mg}/>
                <span className="ghr" style={{ fontSize:15,fontWeight:700,color:tx,letterSpacing:"0.05em" }}>ALERTAS DEL SISTEMA</span>
                <span style={{ background:"rgba(255,69,0,0.15)",color:"#FF4500",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:50,fontFamily:"'Inter',sans-serif" }}>{ALERTS.filter(a=>a.sev==="critical").length} críticas</span>
              </div>
              <div style={{ display:"flex",gap:6 }}>
                {(["all","critical","warning","info"] as const).map(f=>(
                  <button key={f} onClick={()=>setAlertFilter(f)} style={{ padding:"4px 11px",borderRadius:6,fontSize:10,fontWeight:700,cursor:"pointer",background:alertFilter===f?"rgba(255,46,158,0.14)":bgE,border:`1px solid ${alertFilter===f?mg+"55":"rgba(139,47,214,0.25)"}`,color:alertFilter===f?mg:txS,fontFamily:"'Inter',sans-serif",letterSpacing:"0.04em",transition:"all 0.15s" }}>
                    {f==="all"?"TODAS":f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding:"0 20px",maxHeight:320,overflowY:"auto" }} className="thin-scroll">
              {filteredAlerts.map(a=><AlertRow key={a.id} a={a}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN DASHBOARD — MOBILE
═══════════════════════════════════════ */

export function AdminDashboardMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const criticals = ALERTS.filter(a=>a.sev==="critical");
  return (
    <div style={{ background:bg, height:"100%", display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div style={{ padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${vi},${mg})`,display:"flex",alignItems:"center",justifyContent:"center" }}><Shield size={12} color="#fff"/></div>
          <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>ADMIN</span>
        </div>
        <div style={{ display:"flex",gap:10 }}>
          {[
            { id:"admin-dashboard",Icon:LayoutDashboard },
            { id:"admin-catalog",  Icon:Tag             },
            { id:"admin-logistics",Icon:Truck           },
          ].map(({ id,Icon })=>(
            <button key={id} onClick={()=>onNav(id)} style={{ background:"none",border:"none",cursor:"pointer",color:id==="admin-dashboard"?vi:txS }}><Icon size={18}/></button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 24px" }} className="thin-scroll">
        {/* Critical alerts FIRST on mobile */}
        {criticals.length>0&&(
          <div style={{ marginBottom:20,borderRadius:12,overflow:"hidden",border:`1px solid rgba(255,69,0,0.3)`,boxShadow:"0 0 20px rgba(255,69,0,0.08)" }}>
            <div style={{ padding:"10px 14px",background:"rgba(255,69,0,0.1)",display:"flex",alignItems:"center",gap:8 }}>
              <AlertTriangle size={14} color="#FF4500"/>
              <span className="ghi" style={{ fontSize:11,fontWeight:700,color:"#FF4500",letterSpacing:"0.06em" }}>ALERTAS CRÍTICAS ({criticals.length})</span>
            </div>
            {criticals.map(a=>(
              <div key={a.id} style={{ padding:"10px 14px",borderTop:`1px solid rgba(255,69,0,0.15)`,background:bgC }}>
                <p className="ghi" style={{ fontSize:12,fontWeight:700,color:tx,margin:0 }}>{a.title}</p>
                <p className="ghi" style={{ fontSize:10,color:txS,margin:"2px 0 0" }}>{a.detail}</p>
                <div style={{ display:"flex",gap:10,marginTop:4 }}>
                  <span className="ghi" style={{ fontSize:9,color:txS }}>{a.time} · {a.loc}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KPI scroll */}
        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:10 }}>INDICADORES CLAVE</p>
        <div style={{ display:"flex",gap:10,overflowX:"auto",marginBottom:20 }} className="no-scroll">
          {KPI_DATA.map(k=>(
            <div key={k.label} style={{ minWidth:130,flexShrink:0 }}><KpiCard kpi={k} compact/></div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div style={{ background:bgC,borderRadius:14,padding:"16px 14px",border:`1px solid rgba(139,47,214,0.2)`,marginBottom:16 }}>
          <p className="ghr" style={{ fontSize:12,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:12 }}>VENTAS POR CANAL</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={BAR_DATA.slice(0,4)} barSize={12}>
              <CartesianGrid strokeDasharray="2 2" stroke="rgba(139,47,214,0.1)" vertical={false}/>
              <XAxis dataKey="canal" tick={{ fill:txS,fontSize:8 }} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip content={ChartTip}/>
              <Bar dataKey="hoy" name="Hoy" fill={mg} radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mini line chart */}
        <div style={{ background:bgC,borderRadius:14,padding:"16px 14px",border:`1px solid rgba(139,47,214,0.2)`,marginBottom:16 }}>
          <p className="ghr" style={{ fontSize:12,fontWeight:700,color:tx,letterSpacing:"0.05em",marginBottom:12 }}>TENDENCIA SEMANAL</p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={LINE_DATA}>
              <CartesianGrid strokeDasharray="2 2" stroke="rgba(139,47,214,0.1)" vertical={false}/>
              <XAxis dataKey="dia" tick={{ fill:txS,fontSize:8 }} axisLine={false} tickLine={false}/>
              <YAxis hide/>
              <Tooltip content={ChartTip}/>
              <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke={mg} strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* All alerts */}
        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.08em",marginBottom:8 }}>TODAS LAS ALERTAS</p>
        <div style={{ background:bgC,borderRadius:12,padding:"0 14px",border:`1px solid rgba(139,47,214,0.2)` }}>
          {ALERTS.map(a=><AlertRow key={a.id} a={a} compact/>)}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN CATALOG — WIZARD
═══════════════════════════════════════ */

export type WizardStep = 1|2|3;

export function CatalogWizardProgress({ step, mobile=false }:{ step:WizardStep; mobile?:boolean }) {
  const steps = ["Datos básicos","SEO & A11y","Inventario"];
  return (
    <div style={{ display:"flex",alignItems:"center",marginBottom:mobile?10:28 }}>
      {steps.map((s,i)=>(
        <div key={s} style={{ display:"flex",alignItems:"center",flex:i<2?1:0 }}>
          <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
            <div style={{ width:mobile?24:36,height:mobile?24:36,borderRadius:"50%",background:i+1<=step?`linear-gradient(135deg,${vi},${mg})`:bgE,border:`2px solid ${i+1<=step?"transparent":"rgba(139,47,214,0.3)"}`,display:"flex",alignItems:"center",justifyContent:"center",color:i+1<=step?"#fff":txS,boxShadow:i+1===step?GV:"none",transition:"all 0.3s" }}>
              {i+1<step?<Check size={mobile?10:14} strokeWidth={3}/> :<span className="ghi" style={{ fontSize:mobile?10:13,fontWeight:700 }}>{i+1}</span>}
            </div>
            <span className="ghi" style={{ fontSize:mobile?8:10,color:i+1<=step?tx:txS,fontWeight:i+1===step?700:400,whiteSpace:"nowrap",maxWidth:mobile?55:90,textAlign:"center",lineHeight:1.1,overflow:"hidden",textOverflow:"ellipsis" }}>{s}</span>
          </div>
          {i<2&&<div style={{ flex:1,height:2,marginBottom:mobile?12:18,marginLeft:2,marginRight:2,background:i+1<step?`linear-gradient(90deg,${vi},${mg})`:bgE,minWidth:15 }}/>}
        </div>
      ))}
    </div>
  );
}

export function AdminCatalogDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [step, setStep]  = useState<WizardStep>(1);
  const [pub,  setPub]   = useState(false);
  const [seoChecks, setSeoChecks] = useState<boolean[]>(SEO_CHECKS.map(()=>false));
  const [form, setForm]  = useState({ name:"",cat:"vr",price:"",desc:"",slug:"",meta:"",alt:"",stock:"0",sku:"" });
  const [imgs, setImgs]  = useState<string[]>([]);
  const uf = (k:string,v:string)=>setForm(p=>({...p,[k]:v}));
  const seoScore = Math.round((seoChecks.filter(Boolean).length/SEO_CHECKS.length)*100);

  return (
    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>
      <AdminSidebar active="admin-catalog" onNav={onNav}/>
      <div style={{ marginLeft:64,flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>
        <AdminTopBar title="GESTIÓN DE CATÁLOGO" sub="Nuevo producto — wizard 3 pasos" onNav={onNav}>
          <NeonBtn variant="ghost" small onClick={()=>onNav("catalog")}><ExternalLink size={12}/>Ver catálogo</NeonBtn>
        </AdminTopBar>
        <div style={{ flex:1,overflowY:"auto",padding:"28px 32px" }} className="thin-scroll">
          {/* Progress */}
          <div style={{ maxWidth:680,marginBottom:32 }}><CatalogWizardProgress step={step}/></div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 320px",gap:28 }}>
            {/* Main form panel */}
            <div style={{ background:bgC,borderRadius:18,border:`1px solid rgba(139,47,214,0.2)`,overflow:"hidden" }}>
              <div style={{ padding:"18px 24px",borderBottom:`1px solid rgba(139,47,214,0.15)`,display:"flex",alignItems:"center",gap:8 }}>
                {step===1&&<Tag size={15} color={vi}/>}
                {step===2&&<Globe size={15} color={cy}/>}
                {step===3&&<Layers size={15} color:ok/>}
                <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx,letterSpacing:"0.04em" }}>
                  {step===1?"DATOS BÁSICOS":step===2?"SEO & ACCESIBILIDAD":"INVENTARIO & PUBLICACIÓN"}
                </span>
              </div>
              <div style={{ padding:"24px" }}>
                {step===1&&(
                  <div className="fade-up" style={{ display:"flex",flexDirection:"column",gap:16 }}>
                    <FloatInput label="Nombre del producto" value={form.name} onChange={v=>uf("name",v)} required/>
                    <div style={{ display:"flex",gap:12 }}>
                      <div style={{ flex:1 }}>
                        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:6 }}>CATEGORÍA*</p>
                        <select value={form.cat} onChange={e=>uf("cat",e.target.value)} style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:10,padding:"13px 14px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",cursor:"pointer" }}>
                          {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                      <FloatInput label="Precio (USD)" value={form.price} onChange={v=>uf("price",v.replace(/[^0-9.]/g,""))} inputMode="decimal" required half/>
                    </div>
                    <div style={{ position:"relative" }}>
                      <label className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",display:"block",marginBottom:6 }}>DESCRIPCIÓN</label>
                      <textarea value={form.desc} onChange={e=>uf("desc",e.target.value)} rows={4} style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:10,padding:"12px 14px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",boxSizing:"border-box" }} placeholder="Descripción detallada del producto…"/>
                    </div>
                  </div>
                )}
                {step===2&&(
                  <div className="fade-up" style={{ display:"flex",flexDirection:"column",gap:18 }}>
                    {/* Photo upload */}
                    <div>
                      <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:10 }}>FOTOS DEL PRODUCTO</p>
                      <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                        {imgs.map((url,i)=>(
                          <div key={i} style={{ width:80,height:80,borderRadius:10,overflow:"hidden",background:bgE,position:"relative",border:`1px solid rgba(139,47,214,0.3)` }}>
                            <img src={imgUrl(url,160,160)} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                            <button onClick={()=>setImgs(arr=>arr.filter((_,j)=>j!==i))} style={{ position:"absolute",top:3,right:3,width:18,height:18,borderRadius:"50%",background:"rgba(0,0,0,0.7)",border:"none",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center" }}><X size={9}/></button>
                          </div>
                        ))}
                        <button onClick={()=>setImgs(arr=>[...arr,PRODUCTS[arr.length%PRODUCTS.length].imgId])} style={{ width:80,height:80,borderRadius:10,background:bgE,border:`2px dashed rgba(139,47,214,0.4)`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,color:txS }}>
                          <Upload size={18}/>
                          <span className="ghi" style={{ fontSize:9 }}>Subir</span>
                        </button>
                      </div>
                    </div>
                    {/* Alt text — required */}
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:6 }}>
                        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",margin:0 }}>ALT-TEXT DE IMAGEN*</p>
                        <span style={{ fontSize:9,background:"rgba(0,240,255,0.1)",color:cy,padding:"1px 6px",borderRadius:3,fontFamily:"'Inter',sans-serif",fontWeight:700 }}>Lector de pantalla</span>
                      </div>
                      <FloatInput label="Descripción accesible de la imagen" value={form.alt} onChange={v=>uf("alt",v)} required/>
                      {form.alt.length>0&&form.alt.length<10&&(
                        <p className="ghi" style={{ fontSize:10,color:"#FF4500",marginTop:4 }}>⚠ El alt-text debe ser descriptivo (min. 10 caracteres)</p>
                      )}
                    </div>
                    {/* SEO fields */}
                    <FloatInput label="Slug URL (ej: provision-vr-x2)" value={form.slug} onChange={v=>uf("slug",v.toLowerCase().replace(/\s+/g,"-"))}/>
                    <div>
                      <label className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",display:"block",marginBottom:6 }}>META DESCRIPTION ({form.meta.length}/160)</label>
                      <textarea value={form.meta} onChange={e=>uf("meta",e.target.value.slice(0,160))} rows={2} style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:10,padding:"12px 14px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"none",boxSizing:"border-box" }}/>
                    </div>
                    {/* SEO checklist */}
                    <div style={{ background:bgE,borderRadius:12,padding:"16px 18px",border:`1px solid rgba(139,47,214,0.2)` }}>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 }}>
                        <p className="ghi" style={{ fontSize:11,fontWeight:700,color:tx,margin:0 }}>CHECKLIST SEO</p>
                        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                          <div style={{ width:60,height:6,borderRadius:3,background:"rgba(255,255,255,0.1)",overflow:"hidden" }}>
                            <div style={{ height:"100%",width:`${seoScore}%`,background:seoScore>70?`linear-gradient(90deg,${ok},${cy})`:seoScore>40?`linear-gradient(90deg,${go},${cy})`:mg,borderRadius:3,transition:"width 0.3s" }}/>
                          </div>
                          <span className="ghi" style={{ fontSize:11,fontWeight:700,color:seoScore>70?ok:seoScore>40?go:mg }}>{seoScore}%</span>
                        </div>
                      </div>
                      {SEO_CHECKS.map((c,i)=>(
                        <label key={c} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:9,cursor:"pointer" }}>
                          <div onClick={()=>setSeoChecks(arr=>arr.map((v,j)=>j===i?!v:v))} style={{ width:16,height:16,borderRadius:4,border:`1px solid ${seoChecks[i]?ok:"rgba(255,255,255,0.2)"}`,background:seoChecks[i]?ok:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer" }}>
                            {seoChecks[i]&&<Check size={9} color="#0A0512" strokeWidth={3}/>}
                          </div>
                          <span className="ghi" style={{ fontSize:12,color:seoChecks[i]?tx:txS,transition:"color 0.15s" }}>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {step===3&&(
                  <div className="fade-up" style={{ display:"flex",flexDirection:"column",gap:16 }}>
                    <div style={{ display:"flex",gap:12 }}>
                      <FloatInput label="SKU / Código" value={form.sku} onChange={v=>uf("sku",v.toUpperCase())} half/>
                      <div style={{ flex:"0 0 calc(50% - 6px)" }}>
                        <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:6 }}>STOCK INICIAL</p>
                        <div style={{ display:"flex",alignItems:"center",background:bgE,borderRadius:10,border:`1px solid rgba(139,47,214,0.3)`,overflow:"hidden" }}>
                          <button onClick={()=>uf("stock",String(Math.max(0,Number(form.stock)-1)))} style={{ width:44,height:48,background:"none",border:"none",cursor:"pointer",color:txS,fontSize:18,fontWeight:300,display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
                          <input type="number" value={form.stock} onChange={e=>uf("stock",e.target.value)} style={{ flex:1,background:"transparent",border:"none",color:tx,fontSize:18,fontWeight:700,textAlign:"center",outline:"none",fontFamily:"'Rajdhani',sans-serif" }}/>
                          <button onClick={()=>uf("stock",String(Number(form.stock)+1))} style={{ width:44,height:48,background:"none",border:"none",cursor:"pointer",color:txS,fontSize:18,fontWeight:300,display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
                        </div>
                      </div>
                    </div>
                    {/* Stock level indicator */}
                    <div style={{ display:"flex",gap:10 }}>
                      {[{ t:"Bajo",thr:10,c:"#FF4500" },{ t:"Normal",thr:50,c:go },{ t:"Alto",thr:999,c:ok }].map(({ t,thr,c })=>{
                        const n=Number(form.stock); const sel=t==="Bajo"?n<10:t==="Normal"?n<50:n>=50;
                        return (
                          <div key={t} style={{ flex:1,padding:"10px",borderRadius:8,background:sel?`${c}18`:bgE,border:`1px solid ${sel?c+"44":"rgba(255,255,255,0.08)"}`,textAlign:"center" }}>
                            <span className="ghi" style={{ fontSize:11,fontWeight:700,color:sel?c:txS }}>{t}</span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Publish toggle */}
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",borderRadius:12,background:bgE,border:`1px solid rgba(139,47,214,0.2)`,marginTop:8 }}>
                      <div>
                        <p className="ghi" style={{ fontSize:13,fontWeight:600,color:tx,margin:0 }}>Estado de publicación</p>
                        <p className="ghi" style={{ fontSize:11,color:pub?ok:txS,margin:"2px 0 0" }}>{pub?"✓ Visible en la tienda":"Borrador — no visible"}</p>
                      </div>
                      <button onClick={()=>setPub(p=>!p)} style={{ background:"none",border:"none",cursor:"pointer",color:pub?ok:txS }}>{pub?<ToggleRight size={36}/>:<ToggleLeft size={36}/>}</button>
                    </div>
                  </div>
                )}
              </div>
              {/* Step navigation */}
              <div style={{ padding:"16px 24px",borderTop:`1px solid rgba(139,47,214,0.15)`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <button onClick={()=>step>1&&setStep(s=>Math.max(1,s-1) as WizardStep)} disabled={step===1} style={{ display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:step===1?"default":"pointer",color:step===1?txS:txS,fontSize:13,fontFamily:"'Inter',sans-serif",opacity:step===1?0.4:1 }}>
                  <ChevronLeft size={14}/>Anterior
                </button>
                {step<3?(
                  <NeonBtn variant="secondary" onClick={()=>setStep(s=>Math.min(3,s+1) as WizardStep)}>
                    Siguiente <ArrowRight size={14}/>
                  </NeonBtn>
                ):(
                  <NeonBtn variant="primary" onClick={()=>setPub(true)}>
                    {pub?<><CheckCircle size={14}/>Guardado</>:<><Zap size={14}/>Publicar producto</>}
                  </NeonBtn>
                )}
              </div>
            </div>

            {/* Preview sidebar */}
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ background:bgC,borderRadius:16,padding:"16px 18px",border:`1px solid rgba(139,47,214,0.2)`,position:"sticky",top:20 }}>
                <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:12 }}>PREVISUALIZACIÓN</p>
                {imgs.length>0&&(
                  <div style={{ borderRadius:10,overflow:"hidden",background:bgE,marginBottom:12,height:140 }}>
                    <img src={imgUrl(imgs[0],320,180)} alt={form.alt||form.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                  </div>
                )}
                {!imgs.length&&(
                  <div style={{ borderRadius:10,background:bgE,height:140,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
                    <Image size={28} color={txS} style={{ opacity:0.3 }}/>
                  </div>
                )}
                <p className="ghr" style={{ fontSize:16,fontWeight:700,color:tx,margin:"0 0 4px",lineHeight:1.2 }}>{form.name||"Nombre del producto"}</p>
                <p className="ghi" style={{ fontSize:11,color:txS,marginBottom:8 }}>{CATEGORIES.find(c=>c.id===form.cat)?.label}</p>
                {form.price&&<p className="ghr" style={{ fontSize:22,fontWeight:700,color:mg,margin:0 }}>${form.price}</p>}
                <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:10 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:pub?ok:txS }}/>
                  <span className="ghi" style={{ fontSize:11,color:pub?ok:txS }}>{pub?"Publicado":"Borrador"}</span>
                  {form.stock&&<span className="ghi" style={{ fontSize:11,color:txS,marginLeft:"auto" }}>Stock: {form.stock}</span>}
                </div>
                {/* SEO score mini */}
                {step>=2&&(
                  <div style={{ marginTop:14,paddingTop:12,borderTop:`1px solid rgba(139,47,214,0.15)` }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                      <span className="ghi" style={{ fontSize:10,color:txS }}>SEO score</span>
                      <span className="ghi" style={{ fontSize:11,fontWeight:700,color:seoScore>70?ok:seoScore>40?go:mg }}>{seoScore}%</span>
                    </div>
                    <div style={{ height:4,borderRadius:2,background:"rgba(255,255,255,0.08)" }}>
                      <div style={{ height:"100%",width:`${seoScore}%`,borderRadius:2,background:seoScore>70?`linear-gradient(90deg,${ok},${cy})`:seoScore>40?go:mg,transition:"width 0.4s" }}/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN CATALOG — MOBILE
═══════════════════════════════════════ */

export function AdminCatalogMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [step, setStep]  = useState<WizardStep>(1);
  const [pub,  setPub]   = useState(false);
  const [form, setForm]  = useState({ name:"",cat:"vr",price:"",desc:"",alt:"",stock:"0",slug:"",meta:"" });
  const [seoChecks, setSeoChecks] = useState<boolean[]>(SEO_CHECKS.map(()=>false));
  const uf = (k:string,v:string)=>setForm(p=>({...p,[k]:v}));
  const seoScore = Math.round((seoChecks.filter(Boolean).length/SEO_CHECKS.length)*100);

  return (
    <div style={{ background:bg,height:"100%",display:"flex",flexDirection:"column" }}>
      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)` }}>
        <div style={{ marginBottom:14 }}><CatalogWizardProgress step={step} mobile/></div>
        <span className="ghr" style={{ fontSize:15,fontWeight:700,color:tx }}>
          {step===1?"DATOS BÁSICOS":step===2?"SEO & ACCESIBILIDAD":"INVENTARIO & PUBLICACIÓN"}
        </span>
      </div>

      <div style={{ flex:1,overflowY:"auto",padding:"18px 16px",display:"flex",flexDirection:"column",gap:12 }} className="thin-scroll">
        {step===1&&(
          <>
            <FloatInput label="Nombre del producto" value={form.name} onChange={v=>uf("name",v)} required/>
            <div>
              <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:6 }}>CATEGORÍA*</p>
              <select value={form.cat} onChange={e=>uf("cat",e.target.value)} style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:10,padding:"13px 14px",color:tx,fontSize:14,outline:"none",fontFamily:"'Inter',sans-serif" }}>
                {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <FloatInput label="Precio (USD)" value={form.price} onChange={v=>uf("price",v.replace(/[^0-9.]/g,""))} inputMode="decimal" required/>
            <div>
              <label className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",display:"block",marginBottom:6 }}>DESCRIPCIÓN</label>
              <textarea value={form.desc} onChange={e=>uf("desc",e.target.value)} rows={3} style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:10,padding:"12px 14px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"none",boxSizing:"border-box" }}/>
            </div>
          </>
        )}
        {step===2&&(
          <>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",margin:0 }}>ALT-TEXT*</p>
                <span style={{ fontSize:9,background:"rgba(0,240,255,0.1)",color:cy,padding:"1px 6px",borderRadius:3,fontFamily:"'Inter',sans-serif",fontWeight:700 }}>Accesibilidad</span>
              </div>
              <FloatInput label="Descripción accesible de la imagen" value={form.alt} onChange={v=>uf("alt",v)} required/>
            </div>
            <FloatInput label="Slug URL" value={form.slug} onChange={v=>uf("slug",v.toLowerCase().replace(/\s+/g,"-"))}/>
            <div>
              <label className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",display:"block",marginBottom:6 }}>META DESCRIPTION ({form.meta.length}/160)</label>
              <textarea value={form.meta} onChange={e=>uf("meta",e.target.value.slice(0,160))} rows={2} style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.3)`,borderRadius:10,padding:"12px 14px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",resize:"none",boxSizing:"border-box" }}/>
            </div>
            {/* SEO checklist collapsible */}
            <div style={{ background:bgE,borderRadius:12,padding:"14px",border:`1px solid rgba(139,47,214,0.2)` }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
                <span className="ghi" style={{ fontSize:11,fontWeight:700,color:tx }}>SEO CHECKLIST</span>
                <span className="ghi" style={{ fontSize:11,fontWeight:700,color:seoScore>70?ok:seoScore>40?go:mg }}>{seoScore}%</span>
              </div>
              {SEO_CHECKS.map((c,i)=>(
                <label key={c} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer" }}>
                  <div onClick={()=>setSeoChecks(arr=>arr.map((v,j)=>j===i?!v:v))} style={{ width:16,height:16,borderRadius:4,border:`1px solid ${seoChecks[i]?ok:"rgba(255,255,255,0.2)"}`,background:seoChecks[i]?ok:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    {seoChecks[i]&&<Check size={9} color="#0A0512" strokeWidth={3}/>}
                  </div>
                  <span className="ghi" style={{ fontSize:11,color:seoChecks[i]?tx:txS }}>{c}</span>
                </label>
              ))}
            </div>
          </>
        )}
        {step===3&&(
          <>
            <div>
              <p className="ghi" style={{ fontSize:10,color:txS,letterSpacing:"0.07em",marginBottom:8 }}>STOCK INICIAL</p>
              <div style={{ display:"flex",alignItems:"center",background:bgE,borderRadius:12,border:`1px solid rgba(139,47,214,0.3)`,overflow:"hidden" }}>
                <button onClick={()=>uf("stock",String(Math.max(0,Number(form.stock)-1)))} style={{ width:52,height:56,background:"none",border:"none",cursor:"pointer",color:txS,fontSize:22,display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
                <input type="number" value={form.stock} onChange={e=>uf("stock",e.target.value)} inputMode="numeric" style={{ flex:1,background:"transparent",border:"none",color:tx,fontSize:24,fontWeight:700,textAlign:"center",outline:"none",fontFamily:"'Rajdhani',sans-serif" }}/>
                <button onClick={()=>uf("stock",String(Number(form.stock)+1))} style={{ width:52,height:56,background:"none",border:"none",cursor:"pointer",color:txS,fontSize:22,display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
              </div>
            </div>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderRadius:12,background:bgE,border:`1px solid rgba(139,47,214,0.2)` }}>
              <div>
                <p className="ghi" style={{ fontSize:13,fontWeight:600,color:tx,margin:0 }}>Publicar en tienda</p>
                <p className="ghi" style={{ fontSize:11,color:pub?ok:txS,margin:"2px 0 0" }}>{pub?"Visible":"Borrador"}</p>
              </div>
              <button onClick={()=>setPub(p=>!p)} style={{ background:"none",border:"none",cursor:"pointer",color:pub?ok:txS }}>{pub?<ToggleRight size={32}/>:<ToggleLeft size={32}/>}</button>
            </div>
          </>
        )}
      </div>

      <div style={{ flexShrink:0,padding:"12px 16px",background:bgC,borderTop:`1px solid rgba(139,47,214,0.2)`,display:"flex",gap:10 }}>
        {step>1&&<NeonBtn variant="ghost" onClick={()=>setStep(s=>Math.max(1,s-1) as WizardStep)} style={{ padding:"13px 16px" }}><ChevronLeft size={14}/>Atrás</NeonBtn>}
        {step<3?(
          <NeonBtn variant="secondary" full onClick={()=>setStep(s=>Math.min(3,s+1) as WizardStep)} style={{ padding:"13px",fontSize:14 }}>
            Siguiente <ArrowRight size={14}/>
          </NeonBtn>
        ):(
          <NeonBtn variant="primary" full style={{ padding:"13px",fontSize:14 }}>
            <Zap size={14}/>{pub?"Guardar cambios":"Publicar producto"}
          </NeonBtn>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN LOGISTICS — DESKTOP
═══════════════════════════════════════ */

export function AdminLogisticsDesktop({ onNav }:{ onNav:(s:string)=>void }) {
  const [orders, setOrders] = useState(ORDERS.map(o=>({ ...o, selected:false })));
  const [query,  setQuery]  = useState("");
  const [statusF,setStatusF]= useState<OrderStatus|"all">("all");
  const [dateF,  setDateF]  = useState("");
  const [bulkOpen,setBulkOpen]=useState(false);

  const filtered = orders.filter(o=>{
    const q = query.toLowerCase();
    const matchQ = !q||(o.id.toLowerCase().includes(q)||o.client.toLowerCase().includes(q)||o.dest.toLowerCase().includes(q));
    const matchS = statusF==="all"||o.status===statusF;
    return matchQ&&matchS;
  });

  const selected = orders.filter(o=>o.selected);
  const toggleSelect = (id:string) => setOrders(arr=>arr.map(o=>o.id===id?{...o,selected:!o.selected}:o));
  const toggleAll    = () => { const allSel=filtered.every(o=>o.selected); setOrders(arr=>arr.map(o=>filtered.find(f=>f.id===o.id)?{...o,selected:!allSel}:o)); };
  const bulkStatus   = (s:OrderStatus) => { setOrders(arr=>arr.map(o=>o.selected?{...o,status:s,selected:false}:o)); setBulkOpen(false); };

  return (
    <div style={{ display:"flex",minHeight:"calc(100vh - 56px)",background:bg }}>
      <AdminSidebar active="admin-logistics" onNav={onNav}/>
      <div style={{ marginLeft:64,flex:1,overflow:"hidden",display:"flex",flexDirection:"column" }}>
        <AdminTopBar title="MONITOR LOGÍSTICO" sub={`${ORDERS.length} pedidos · ${ORDERS.filter(o=>o.status==="en_ruta").length} en ruta`} onNav={onNav}/>
        <div style={{ flex:1,overflowY:"auto",padding:"24px" }} className="thin-scroll">

          {/* Search + filters toolbar */}
          <div style={{ display:"flex",gap:12,marginBottom:20,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ flex:1,position:"relative",minWidth:220 }}>
              <Search size={14} color={txS} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}/>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por ID, cliente, destino…" style={{ width:"100%",background:bgC,border:`1px solid rgba(139,47,214,0.25)`,borderRadius:10,padding:"10px 14px 10px 36px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxShadow:query?GM:"none",transition:"all 0.2s",boxSizing:"border-box" }}/>
            </div>
            {/* Status quick filters */}
            <div style={{ display:"flex",gap:6 }}>
              {(["all","en_ruta","en_espera","entregado","cancelado"] as const).map(s=>(
                <button key={s} onClick={()=>setStatusF(s)} style={{ padding:"8px 13px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",background:statusF===s?`rgba(255,46,158,0.14)`:bgC,border:`1px solid ${statusF===s?mg+"55":"rgba(139,47,214,0.25)"}`,color:statusF===s?mg:txS,fontFamily:"'Inter',sans-serif",letterSpacing:"0.04em",transition:"all 0.15s",whiteSpace:"nowrap" }}>
                  {s==="all"?"TODOS":STATUS_CFG[s as OrderStatus].label.toUpperCase()}
                </button>
              ))}
            </div>
            <input type="date" value={dateF} onChange={e=>setDateF(e.target.value)} style={{ background:bgC,border:`1px solid rgba(139,47,214,0.25)`,borderRadius:8,padding:"8px 12px",color:txS,fontSize:12,outline:"none",fontFamily:"'Inter',sans-serif",cursor:"pointer" }}/>
          </div>

          {/* Bulk actions bar */}
          {selected.length>0&&(
            <div className="slide-up" style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 18px",borderRadius:10,background:`rgba(255,46,158,0.08)`,border:`1px solid ${mg}44`,marginBottom:14,flexWrap:"wrap" }}>
              <span className="ghi" style={{ fontSize:13,fontWeight:700,color:mg }}>{selected.length} seleccionado{selected.length>1?"s":""}</span>
              <div style={{ position:"relative" }}>
                <NeonBtn variant="primary" small onClick={()=>setBulkOpen(o=>!o)}>
                  <RefreshCw size={11}/>Actualización masiva <ChevronDown size={11}/>
                </NeonBtn>
                {bulkOpen&&(
                  <div className="fade-in" style={{ position:"absolute",top:"110%",left:0,zIndex:30,background:bgC,borderRadius:10,border:`1px solid rgba(139,47,214,0.3)`,boxShadow:GV,minWidth:180,overflow:"hidden" }}>
                    {(["en_ruta","en_espera","entregado","cancelado"] as OrderStatus[]).map(s=>(
                      <button key={s} onClick={()=>bulkStatus(s)} style={{ display:"block",width:"100%",padding:"10px 16px",background:"none",border:"none",cursor:"pointer",color:STATUS_CFG[s].color,fontSize:12,fontWeight:600,textAlign:"left",fontFamily:"'Inter',sans-serif",transition:"background 0.15s" }}
                        onMouseEnter={e=>(e.currentTarget.style.background=STATUS_CFG[s].bg)}
                        onMouseLeave={e=>(e.currentTarget.style.background="none")}>
                        → {STATUS_CFG[s].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <NeonBtn variant="outline" small onClick={()=>toast.success("✅ Etiquetas generadas",{description:`Se generaron etiquetas de envío para los pedidos seleccionados.`})}><FileText size={11}/>Generar etiquetas</NeonBtn>
              <button onClick={()=>setOrders(arr=>arr.map(o=>({...o,selected:false})))} style={{ marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:txS }}><X size={16}/></button>
            </div>
          )}

          {/* Table */}
          <div style={{ borderRadius:16,overflow:"hidden",border:`1px solid rgba(139,47,214,0.2)` }}>
            {/* Header */}
            <div style={{ display:"grid",gridTemplateColumns:"40px 120px 1fr 80px 100px 120px 100px 110px 80px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,padding:"10px 16px",gap:8,alignItems:"center" }}>
              <input type="checkbox" checked={filtered.length>0&&filtered.every(o=>o.selected)} onChange={toggleAll} style={{ width:15,height:15,cursor:"pointer",accentColor:mg }}/>
              {["ID PEDIDO","CLIENTE","ARTÍC.","TOTAL","TRANSPORTISTA","DESTINO","ETA","ESTADO"].map(h=>(
                <span key={h} className="ghi" style={{ fontSize:10,fontWeight:700,color:txS,letterSpacing:"0.07em",whiteSpace:"nowrap" }}>{h}</span>
              ))}
            </div>
            {/* Rows */}
            {filtered.map((o,i)=>{
              const cfg = STATUS_CFG[o.status];
              return (
                <div key={o.id} style={{ display:"grid",gridTemplateColumns:"40px 120px 1fr 80px 100px 120px 100px 110px 80px",padding:"12px 16px",gap:8,alignItems:"center",background:o.selected?"rgba(255,46,158,0.05)":i%2===0?bgC:bgE,borderBottom:`1px solid rgba(139,47,214,0.1)`,transition:"background 0.15s",cursor:"pointer" }}
                  onMouseEnter={e=>{if(!o.selected)(e.currentTarget as HTMLDivElement).style.background="rgba(139,47,214,0.07)"}}
                  onMouseLeave={e=>{if(!o.selected)(e.currentTarget as HTMLDivElement).style.background=i%2===0?bgC:bgE}}>
                  <input type="checkbox" checked={o.selected||false} onChange={()=>toggleSelect(o.id)} onClick={e=>e.stopPropagation()} style={{ width:15,height:15,cursor:"pointer",accentColor:mg }}/>
                  <span className="ghi" style={{ fontSize:12,fontWeight:700,color:vi }}>{o.id}</span>
                  <span className="ghi" style={{ fontSize:12,color:tx,fontWeight:500 }}>{o.client}</span>
                  <span className="ghi" style={{ fontSize:12,color:txS,textAlign:"center" }}>{o.items}</span>
                  <span className="ghr" style={{ fontSize:13,fontWeight:700,color:mg }}>${o.total.toFixed(2)}</span>
                  <span className="ghi" style={{ fontSize:11,color:txS }}>{o.carrier}</span>
                  <span className="ghi" style={{ fontSize:11,color:txS,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{o.dest}</span>
                  <span className="ghi" style={{ fontSize:11,color:cfg.color,fontWeight:600 }}>{o.eta}</span>
                  <span style={{ padding:"3px 8px",borderRadius:5,fontSize:10,fontWeight:700,background:cfg.bg,color:cfg.color,fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap" }}>{cfg.label}</span>
                </div>
              );
            })}
            {filtered.length===0&&(
              <div style={{ padding:"40px",textAlign:"center" }}><Search size={28} color={txS} style={{ opacity:0.3,marginBottom:8 }}/><p className="ghi" style={{ color:txS }}>Sin resultados para "{query}"</p></div>
            )}
          </div>

          {/* Stats row */}
          <div style={{ display:"flex",gap:10,marginTop:16,flexWrap:"wrap" }}>
            {(["en_ruta","en_espera","entregado","cancelado"] as OrderStatus[]).map(s=>{
              const n = ORDERS.filter(o=>o.status===s).length;
              const cfg = STATUS_CFG[s];
              return (
                <div key={s} style={{ flex:"1 1 120px",background:bgC,borderRadius:10,padding:"12px 16px",border:`1px solid ${cfg.color}33`,display:"flex",alignItems:"center",gap:10 }}>
                  <div style={{ width:32,height:32,borderRadius:8,background:cfg.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <Package size={14} color={cfg.color}/>
                  </div>
                  <div>
                    <p className="ghr" style={{ fontSize:20,fontWeight:700,color:cfg.color,margin:0 }}>{n}</p>
                    <p className="ghi" style={{ fontSize:10,color:txS,margin:0 }}>{cfg.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ADMIN LOGISTICS — MOBILE
═══════════════════════════════════════ */

export function AdminLogisticsMobile({ onNav }:{ onNav:(s:string)=>void }) {
  const [query,  setQuery]   = useState("");
  const [statusF,setStatusF] = useState<OrderStatus|"all">("all");
  const [expandedId, setExpandedId] = useState<string|null>(null);
  const [orders, setOrders]  = useState(ORDERS.map(o=>({ ...o, selected:false })));

  const filtered = orders.filter(o=>{
    const q=query.toLowerCase();
    const matchQ = !q||(o.id.toLowerCase().includes(q)||o.client.toLowerCase().includes(q));
    const matchS = statusF==="all"||o.status===statusF;
    return matchQ&&matchS;
  });

  const selected = orders.filter(o=>o.selected);

  return (
    <div style={{ background:bg, height:"100%", display:"flex", flexDirection:"column" }}>
      {/* Header */}
      <div style={{ padding:"12px 16px",background:bgC,borderBottom:`1px solid rgba(139,47,214,0.2)`,position:"sticky",top:0,zIndex:20,flexShrink:0 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
          <span className="ghr" style={{ fontSize:16,fontWeight:700,color:tx }}>LOGÍSTICA</span>
          <div style={{ display:"flex",gap:8 }}>
            {selected.length>0&&(
              <button style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:8,background:`rgba(255,46,158,0.1)`,border:`1px solid ${mg}44`,color:mg,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"'Inter',sans-serif" }}>
                <RefreshCw size={11}/>{selected.length} sel.
              </button>
            )}
            <button onClick={()=>toast.success("✅ Etiquetas generadas",{description:"Etiquetas de envío generadas correctamente."})} style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:8,background:bgE,border:`1px solid rgba(139,47,214,0.3)`,color:txS,cursor:"pointer",fontSize:11,fontFamily:"'Inter',sans-serif" }}>
              <FileText size={11}/>Etiquetas
            </button>
          </div>
        </div>
        {/* Search */}
        <div style={{ position:"relative",marginBottom:8 }}>
          <Search size={13} color={txS} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)" }}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar pedidos…" style={{ width:"100%",background:bgE,border:`1px solid rgba(139,47,214,0.25)`,borderRadius:8,padding:"8px 12px 8px 30px",color:tx,fontSize:13,outline:"none",fontFamily:"'Inter',sans-serif",boxSizing:"border-box" }}/>
        </div>
        {/* Status chips */}
        <div style={{ display:"flex",gap:6,overflowX:"auto" }} className="no-scroll">
          {(["all","en_ruta","en_espera","entregado","cancelado"] as const).map(s=>(
            <button key={s} onClick={()=>setStatusF(s)} style={{ padding:"5px 11px",borderRadius:50,fontSize:10,fontWeight:700,cursor:"pointer",flexShrink:0,background:statusF===s?`rgba(255,46,158,0.14)`:bgE,border:`1px solid ${statusF===s?mg+"55":"rgba(139,47,214,0.25)"}`,color:statusF===s?mg:txS,letterSpacing:"0.04em",fontFamily:"'Inter',sans-serif" }}>
              {s==="all"?"TODOS":STATUS_CFG[s as OrderStatus].label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 24px", display:"flex", flexDirection:"column", gap:10 }} className="thin-scroll">
        {/* Stats mini row */}
        <div style={{ display:"flex",gap:8,marginBottom:4,overflowX:"auto" }} className="no-scroll">
          {(["en_ruta","en_espera","entregado"] as OrderStatus[]).map(s=>{
            const cfg=STATUS_CFG[s];
            const n=ORDERS.filter(o=>o.status===s).length;
            return (
              <div key={s} style={{ minWidth:88,flexShrink:0,background:bgC,borderRadius:10,padding:"10px 12px",border:`1px solid ${cfg.color}33`,textAlign:"center" }}>
                <p className="ghr" style={{ fontSize:20,fontWeight:700,color:cfg.color,margin:0 }}>{n}</p>
                <p className="ghi" style={{ fontSize:9,color:txS,margin:0 }}>{cfg.label}</p>
              </div>
            );
          })}
        </div>

        {/* Stacked order cards */}
        {filtered.map(o=>{
          const cfg=STATUS_CFG[o.status];
          const exp=expandedId===o.id;
          return (
            <div key={o.id} style={{ background:bgC,borderRadius:14,border:`1px solid ${o.selected?mg+"55":"rgba(139,47,214,0.2)"}`,overflow:"hidden",boxShadow:o.selected?GM:"none",transition:"all 0.2s",flex:"0 0 auto" }}>
              {/* Card header */}
              <div style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer" }} onClick={()=>setExpandedId(exp?null:o.id)}>
                <input type="checkbox" checked={o.selected} onChange={()=>setOrders(arr=>arr.map(x=>x.id===o.id?{...x,selected:!x.selected}:x))} onClick={e=>e.stopPropagation()} style={{ width:15,height:15,accentColor:mg,flexShrink:0 }}/>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:2 }}>
                    <span className="ghi" style={{ fontSize:12,fontWeight:700,color:vi }}>{o.id}</span>
                    <span style={{ padding:"2px 7px",borderRadius:4,fontSize:9,fontWeight:700,background:cfg.bg,color:cfg.color,fontFamily:"'Inter',sans-serif" }}>{cfg.label}</span>
                  </div>
                  <span className="ghi" style={{ display:"block",fontSize:12,color:tx,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{o.client}</span>
                </div>
                <div style={{ textAlign:"right",flexShrink:0,marginLeft:8 }}>
                  <p className="ghr" style={{ fontSize:14,fontWeight:700,color:mg,margin:0 }}>${o.total.toFixed(2)}</p>
                  <p className="ghi" style={{ fontSize:10,color:txS,margin:0 }}>{o.items} art.</p>
                </div>
                <ChevronDown size={14} color={txS} style={{ transform:exp?"rotate(180deg)":"none",transition:"transform 0.2s",flexShrink:0,marginLeft:4 }}/>
              </div>
              {/* Expanded detail */}
              {exp&&(
                <div className="slide-up" style={{ padding:"0 14px 14px",borderTop:`1px solid rgba(139,47,214,0.15)`,paddingTop:12 }}>
                  {[{ l:"Transportista",v:o.carrier },{ l:"Destino",v:o.dest },{ l:"ETA",v:o.eta }].map(({ l, v })=>(
                    <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid rgba(139,47,214,0.08)` }}>
                      <span className="ghi" style={{ fontSize:11,color:txS }}>{l}</span>
                      <span className="ghi" style={{ fontSize:11,color:tx,fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                  {/* Quick actions */}
                  <div style={{ display:"flex",gap:8,marginTop:12 }}>
                    {(["en_ruta","entregado","cancelado"] as OrderStatus[]).filter(s=>s!==o.status).map(s=>(
                      <button key={s} onClick={()=>setOrders(arr=>arr.map(x=>x.id===o.id?{...x,status:s}:x))}
                        style={{ flex:1,padding:"8px 6px",borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer",background:STATUS_CFG[s].bg,border:`1px solid ${STATUS_CFG[s].color}44`,color:STATUS_CFG[s].color,fontFamily:"'Inter',sans-serif" }}>
                        → {STATUS_CFG[s].label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length===0&&(
          <div style={{ textAlign:"center",padding:"40px 0" }}><Search size={28} color={txS} style={{ opacity:0.3,marginBottom:8 }}/><p className="ghi" style={{ color:txS }}>Sin resultados</p></div>
        )}
      </div>
    </div>
  );
}

