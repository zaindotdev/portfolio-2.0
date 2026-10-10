'use client';
import { useSyncExternalStore } from 'react';
export type DotsQuality='auto'|'low'|'high';
const subscribe=(callback:()=>void)=>{const queries=[matchMedia('(max-width: 767px)'),matchMedia('(prefers-reduced-motion: reduce)')]; queries.forEach(q=>q.addEventListener('change',callback)); return ()=>queries.forEach(q=>q.removeEventListener('change',callback));};
export function useDotsQuality(quality:DotsQuality='auto') {
  const mobile=useSyncExternalStore(subscribe,()=>matchMedia('(max-width: 767px)').matches,()=>true);
  const reducedMotion=useSyncExternalStore(subscribe,()=>matchMedia('(prefers-reduced-motion: reduce)').matches,()=>true);
  const low=quality==='low'||(quality==='auto'&&mobile);
  return {mobile,reducedMotion,shells:low?6:18,dpr:low?1.25:2,resolution:low?22:32,postprocessing:!low};
}
