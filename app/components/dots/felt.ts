import { Color, MeshPhysicalMaterial } from 'three';
export function feltMaterial(color:string, shell:number, count:number, wobble:{value:number}, time:{value:number}) {
  const material=new MeshPhysicalMaterial({color,roughness:.94,sheen:1,sheenRoughness:.8,sheenColor:new Color(color).lerp(new Color('white'),.5),transparent:shell>0,depthWrite:shell===0});
  material.onBeforeCompile=shader=>{
    shader.uniforms.uShell={value:shell/count}; shader.uniforms.uWobble=wobble; shader.uniforms.uTime=time;
    shader.vertexShader='uniform float uShell; uniform float uWobble; uniform float uTime; varying vec3 vFelt;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
      vFelt=position;
      transformed += normal * (uShell*.045 + uWobble*sin(position.y*8.0+uTime*12.0)*.12);`);
    shader.fragmentShader='uniform float uShell; varying vec3 vFelt; float feltNoise(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,39.425)))*43758.5453);}\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
      float grain=feltNoise(floor(vFelt*210.0));
      normal=normalize(normal+vec3(grain-.5, feltNoise(floor(vFelt*180.0))-.5,0.0)*.14);`);
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      if(uShell>0.0) { float fur=feltNoise(floor(vFelt*240.0)); if(fur < .52+uShell*.43) discard; diffuseColor.a=(1.0-uShell)*.3; }
      diffuseColor.rgb *= .9 + .1*feltNoise(floor(vFelt*220.0));`);
    shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`float rim=pow(1.0-abs(dot(normal,normalize(vViewPosition))),3.0);
      outgoingLight+=diffuseColor.rgb*rim*.25;
      #include <opaque_fragment>`);
  };
  material.customProgramCacheKey=()=>`felt-${shell===0?'base':'shell'}`;
  return material;
}
