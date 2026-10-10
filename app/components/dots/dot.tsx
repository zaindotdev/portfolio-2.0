import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import { accessories, variants, type DotProps, type DotExpression } from './config';
import Face from './face';
import { sdfGeometry } from './geometry';
import { feltMaterial } from './felt';
export function Dot({variant,color,accessory,size,position,shells,resolution,reducedMotion,phase,expression='welcome'}:DotProps & {shells:number;resolution:number;reducedMotion:boolean;phase:number;expression?:DotExpression}) {
  const body=useRef<Group>(null),eyes=useRef<Group>(null);
  const state=useRef({elapsed:0,nextBlink:3+phase*.4,blink:-1,hop:0,velocity:0,wobble:0,wobbleVelocity:0,hover:false});
  const uniforms=useRef({wobble:{value:0},time:{value:0}});
  const geometry=useMemo(()=>sdfGeometry(variants[variant],resolution),[variant,resolution]);
  // Shader uniforms are imperative GPU state shared with the render loop.
  // eslint-disable-next-line react-hooks/refs
  const materials=useMemo(()=>Array.from({length:shells+1},(_,i)=>feltMaterial(color,i,shells,uniforms.current.wobble,uniforms.current.time)),[color,shells]);
  useEffect(()=>()=>{geometry.dispose();materials.forEach(m=>m.dispose());},[geometry,materials]);
  useEffect(() => {
    // Scrolling moves the canvas away from the last pointer event. That stale
    // local coordinate must not keep the mascot turned after it moves away.
    const resetTracking = () => { state.current.hover = false; };
    window.addEventListener('scroll', resetTracking, { passive: true });
    window.addEventListener('blur', resetTracking);
    return () => {
      window.removeEventListener('scroll', resetTracking);
      window.removeEventListener('blur', resetTracking);
    };
  }, []);
  useFrame(({pointer},delta)=>{
    if(!body.current||!eyes.current) return;
    const s=state.current,dt=Math.min(delta,.05); s.elapsed+=dt; uniforms.current.time.value=s.elapsed;
    if(s.elapsed>s.nextBlink) {s.blink=s.elapsed;s.nextBlink=s.elapsed+3+Math.random()*3;}
    const blink=s.elapsed-s.blink; eyes.current.scale.y=blink>=0&&blink<.22?1-.9*Math.sin(blink/.22*Math.PI):1;
    const breathing=reducedMotion?1:1+.02*(1+Math.sin(s.elapsed*1.5+phase));
    // Substeps keep the two damped springs stable at low frame rates.
    for(let t=0;t<dt;t+=1/120) {const h=Math.min(1/120,dt-t);s.velocity+=(-90*s.hop-12*s.velocity)*h;s.hop+=s.velocity*h;s.wobbleVelocity+=(-65*s.wobble-8*s.wobbleVelocity)*h;s.wobble+=s.wobbleVelocity*h;}
    body.current.scale.set(size/Math.sqrt(breathing),size*breathing,size/Math.sqrt(breathing));
    body.current.position.y=position[1]+(reducedMotion?0:s.hop);
    body.current.rotation.z=reducedMotion?0:Math.sin(s.elapsed*17)*s.wobble*.17;
    const tracking = s.hover && !reducedMotion;
    const pointerX = tracking ? MathUtils.clamp(pointer.x, -1, 1) : 0;
    const pointerY = tracking ? MathUtils.clamp(pointer.y, -1, 1) : 0;
    body.current.rotation.y=MathUtils.damp(body.current.rotation.y,pointerX*.12,6,dt);
    body.current.rotation.x=MathUtils.damp(body.current.rotation.x,-pointerY*.06,6,dt);
    eyes.current.position.x=MathUtils.damp(eyes.current.position.x,pointerX*.045,8,dt);
    uniforms.current.wobble.value=reducedMotion?0:s.wobble;
  });
  const Accessory=accessory?accessories[accessory]:null;
  return <group ref={body} position={position} scale={size}
    onPointerOver={event=>{event.stopPropagation();const s=state.current;if(!s.hover&&!reducedMotion)s.velocity=3.4;s.hover=true;}}
    onPointerOut={()=>{state.current.hover=false;}}
    onPointerMove={()=>{state.current.hover=true;}}
    onClick={event=>{event.stopPropagation();if(!reducedMotion){state.current.wobbleVelocity=7;state.current.velocity=2;}}}>
    {materials.map((material,i)=><mesh key={i} geometry={geometry} material={material} dispose={null} castShadow={i===0}/>)}
    <group ref={eyes}>
      <Face expression={expression} />
    </group>
    {Accessory&&<Accessory/>}
  </group>;
}
