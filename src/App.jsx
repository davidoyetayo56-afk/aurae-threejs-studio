import React, { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const pieces = [
  { id:'top', name:'Sculpted top', type:'TOP', color:'#d7d1c8', note:'Clean lines. Easy confidence.' },
  { id:'jacket', name:'Statement jacket', type:'OUTERWEAR', color:'#292929', note:'A sharper layer for any look.' },
  { id:'set', name:'Everyday set', type:'SET', color:'#77716b', note:'Made to move with you.' },
];

function Mannequin({ outfit }) {
  const fabric = useMemo(() => new THREE.MeshStandardMaterial({ color: outfit.color, roughness:.82 }), [outfit.color]);
  const skin = '#9a7968';
  return <group position={[0,-1.55,0]}>
    {/* stylised articulated display mannequin; replaceable with a rigged GLB */}
    <mesh position={[0,1.04,0]} castShadow><capsuleGeometry args={[.34,.68,8,16]}/><meshStandardMaterial color={skin} roughness={.7}/></mesh>
    <mesh position={[0,1.92,0]} castShadow><sphereGeometry args={[.205,32,32]}/><meshStandardMaterial color={skin} roughness={.68}/></mesh>
    <mesh position={[0,1.68,0]}><cylinderGeometry args={[.085,.09,.18,24]}/><meshStandardMaterial color={skin}/></mesh>
    <mesh position={[0,1.12,.015]} castShadow><capsuleGeometry args={[.365,.54,8,20]}/><primitive object={fabric} attach="material"/></mesh>
    {[-1,1].map((s)=><group key={s} position={[s*.43,1.18,0]} rotation={[0,0,-s*.13]}>
      <mesh position={[0,-.27,0]} castShadow><capsuleGeometry args={[.115,.52,8,16]}/><meshStandardMaterial color={skin} roughness={.72}/></mesh>
      <mesh position={[0,-.68,.01]} castShadow><sphereGeometry args={[.105,20,20]}/><meshStandardMaterial color={skin}/></mesh>
    </group>)}
    <mesh position={[-.16,.23,0]} castShadow><capsuleGeometry args={[.145,.82,8,16]}/><meshStandardMaterial color={skin} roughness={.75}/></mesh>
    <mesh position={[.16,.23,0]} castShadow><capsuleGeometry args={[.145,.82,8,16]}/><meshStandardMaterial color={skin} roughness={.75}/></mesh>
    <mesh position={[-.16,-.29,.075]} castShadow><boxGeometry args={[.24,.13,.42]}/><meshStandardMaterial color="#171717" roughness={.85}/></mesh>
    <mesh position={[.16,-.29,.075]} castShadow><boxGeometry args={[.24,.13,.42]}/><meshStandardMaterial color="#171717" roughness={.85}/></mesh>
    <mesh position={[0,1.08,.27]}><boxGeometry args={[.13,.28,.025]}/><meshStandardMaterial color="#aaa39a" metalness:.25 roughness:.45/></mesh>
  </group>;
}

function Loading() { return <Html center><div className="loading">Preparing the studio…</div></Html>; }

export default function App() {
  const [selected,setSelected] = useState(pieces[0]);
  const [view,setView] = useState('front');
  const [showInfo,setShowInfo] = useState(false);
  return <main className="app-shell">
    <header className="topbar"><a className="wordmark" href="#">AURAÈ<span>®</span></a><div className="top-note">THE DIGITAL FITTING ROOM</div><button className="menu-button" onClick={()=>setShowInfo(v=>!v)} aria-label="About this studio">＋</button></header>
    <section className="intro"><div className="eyebrow"><i/> COLLECTION 01 — 3D STUDIO</div><h1>Find your <em>form.</em></h1><p>Explore the pieces. Turn the look. Make it yours.</p></section>
    <section className="studio-grid">
      <div className="viewer-panel">
        <div className="viewer-top"><span>LIVE MODEL / 001</span><span className="live-dot">● INTERACTIVE</span></div>
        <div className="canvas-wrap">
          <Canvas shadows camera={{position:[0,0.3,4.8],fov:36}} dpr={[1,1.6]}>
            <color attach="background" args={['#111110']}/>
            <ambientLight intensity={1.15}/>
            <directionalLight position={[3,5,4]} intensity={2.1} castShadow shadow-mapSize={[1024,1024]}/>
            <spotLight position={[-3,3,-2]} intensity={1.2} color="#d9c8b0"/>
            <Suspense fallback={<Loading/>}>
              <Mannequin outfit={selected}/>
              <Environment preset="studio"/>
              <ContactShadows position={[0,-1.57,0]} opacity={.42} scale={5} blur={2.6} far={2.5}/>
            </Suspense>
            <OrbitControls makeDefault enablePan={false} minDistance={3.4} maxDistance={6.4} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.8} />
          </Canvas>
          <div className="model-tag"><span>01</span> AURAÈ FORM</div>
        </div>
        <div className="viewer-bottom"><span>DRAG TO ROTATE</span><span>SCROLL TO ZOOM</span><span>360° VIEW</span></div>
      </div>
      <aside className="control-panel">
        <div className="panel-heading"><div><div className="eyebrow">THE COLLECTION</div><h2>Style it your way.</h2></div><span className="count">0{pieces.length}</span></div>
        <div className="piece-list">{pieces.map((piece,i)=><button key={piece.id} className={selected.id===piece.id?'piece active':'piece'} onClick={()=>setSelected(piece)}><span className="piece-index">0{i+1}</span><span className="swatch" style={{background:piece.color}}/><span className="piece-copy"><b>{piece.name}</b><small>{piece.type}</small></span><span className="piece-arrow">↗</span></button>)}</div>
        <div className="selected-detail"><div className="detail-label">CURRENT LOOK</div><h3>{selected.name}</h3><p>{selected.note}</p><div className="detail-rule"/><div className="detail-meta"><span>COLOUR</span><span className="colour-value"><i style={{background:selected.color}}/> {selected.color.toUpperCase()}</span></div></div>
        <button className="primary-button" onClick={()=>setShowInfo(true)}>ABOUT THE STUDIO <span>↗</span></button>
        <p className="fine-print">Digital preview. Final garment details may vary.</p>
      </aside>
    </section>
    {showInfo&&<div className="modal-backdrop" onClick={()=>setShowInfo(false)}><section className="info-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setShowInfo(false)}>×</button><div className="eyebrow">AURAÈ / STUDIO NOTES</div><h2>A new way to explore the collection.</h2><p>This first build establishes the interactive 3D fitting-room foundation. The current display figure is a stylised placeholder; production-ready garment fitting requires a detailed rigged avatar and individual 3D garment files.</p><button className="text-button" onClick={()=>setShowInfo(false)}>GOT IT <span>→</span></button></section></div>}
    <footer><span>© AURAÈ STUDIO</span><span>DESIGNED TO MOVE DIFFERENT.</span><span>BUILT FOR EVERY SCREEN</span></footer>
  </main>;
}