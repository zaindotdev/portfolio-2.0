import type { DotExpression } from './config';
import Glasses from './accessories/glasses';

export default function Face({ expression }: { expression: DotExpression }) {
  const happy = expression === 'happy';
  const curious = expression === 'curious';
  return <>
    {[-.26, .26].map((x, i) => <group key={x} position={[x, .16, .64]}>
      {happy ? <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[.105, .027, 10, 24, Math.PI]} />
        <meshStandardMaterial color="#171910" roughness={1} />
      </mesh> : <mesh scale={[.075, curious && i === 1 ? .1 : .145, .045]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#171910" roughness={1} />
      </mesh>}
      {curious && <mesh position={[0, i === 0 ? .25 : .19, -.015]} rotation={[0, 0, i === 0 ? -.22 : .15]}>
        <capsuleGeometry args={[.022, .14, 4, 12]} />
        <meshStandardMaterial color="#171910" />
      </mesh>}
    </group>)}
    {curious ? <mesh position={[.025, -.18, .686]} scale={[.06, .085, .025]}>
      <sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#352511" />
    </mesh> : <mesh position={[0, expression === 'confident' ? -.15 : -.11, .675]}
      rotation={[0, 0, Math.PI + (expression === 'confident' ? .2 : 0)]} scale={[1, happy ? 1.1 : .65, 1]}>
      <torusGeometry args={[happy ? .2 : .15, .026, 10, 30, Math.PI]} />
      <meshStandardMaterial color="#352511" roughness={1} />
    </mesh>}
    {[-.43, .43].map(x => <mesh key={x} position={[x, -.045, .594]} scale={[.1, .055, .02]}>
      <sphereGeometry args={[1, 20, 12]} /><meshStandardMaterial color="#F08946" roughness={1} />
    </mesh>)}
    {expression === 'focused' && <Glasses />}
  </>;
}
