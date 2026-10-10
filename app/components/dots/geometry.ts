import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';
export type Field = (x: number, y: number, z: number) => number;
export const sphere = (x: number,y: number,z: number,r: number) => Math.hypot(x,y,z)-r;
export const union = (a: number,b: number,k=.28) => { const h=Math.max(k-Math.abs(a-b),0)/k; return Math.min(a,b)-h*h*k*.25; };
// Marching tetrahedra samples an SDF, producing a single seamless plush surface.
export function sdfGeometry(field: Field, resolution=30) {
  const vertices: number[]=[];
  const corners=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
  const tetra=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]];
  const step=3.4/resolution;
  for(let x=0;x<resolution;x++) for(let y=0;y<resolution;y++) for(let z=0;z<resolution;z++) {
    const p=corners.map(c=>new Vector3(-1.7+(x+c[0])*step,-1.7+(y+c[1])*step,-1.7+(z+c[2])*step));
    const v=p.map(q=>field(q.x,q.y,q.z));
    for(const t of tetra) {
      const inside=t.filter(i=>v[i]<0), outside=t.filter(i=>v[i]>=0);
      if(!inside.length||!outside.length) continue;
      const cross=(a:number,b:number)=>p[a].clone().lerp(p[b],v[a]/(v[a]-v[b]));
      const emit=(a:Vector3,b:Vector3,c:Vector3)=> {
        const mid=a.clone().add(b).add(c).multiplyScalar(1/3), e=.002;
        const gradient=new Vector3(field(mid.x+e,mid.y,mid.z)-field(mid.x-e,mid.y,mid.z),field(mid.x,mid.y+e,mid.z)-field(mid.x,mid.y-e,mid.z),field(mid.x,mid.y,mid.z+e)-field(mid.x,mid.y,mid.z-e));
        if(b.clone().sub(a).cross(c.clone().sub(a)).dot(gradient)<0) [b,c]=[c,b];
        vertices.push(...a.toArray(),...b.toArray(),...c.toArray());
      };
      if(inside.length===1) emit(...outside.map(i=>cross(inside[0],i)) as [Vector3,Vector3,Vector3]);
      else if(outside.length===1) emit(...inside.map(i=>cross(outside[0],i)) as [Vector3,Vector3,Vector3]);
      else { const a=cross(inside[0],outside[0]),b=cross(inside[0],outside[1]),c=cross(inside[1],outside[0]),d=cross(inside[1],outside[1]); emit(a,b,c); emit(b,d,c); }
    }
  }
  const geometry=new BufferGeometry(); geometry.setAttribute('position',new Float32BufferAttribute(vertices,3));
  // SDF gradients give smooth normals even across the tetrahedron boundaries.
  const normals: number[]=[];
  for(let i=0;i<vertices.length;i+=3) { const [x,y,z]=vertices.slice(i,i+3),e=.005; const n=new Vector3(field(x+e,y,z)-field(x-e,y,z),field(x,y+e,z)-field(x,y-e,z),field(x,y,z+e)-field(x,y,z-e)).normalize(); normals.push(...n.toArray()); }
  geometry.setAttribute('normal',new Float32BufferAttribute(normals,3)); return geometry;
}
