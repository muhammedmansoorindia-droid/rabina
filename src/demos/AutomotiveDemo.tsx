import { DemoShell, getDemo } from './DemoShell'
export default function AutomotiveDemo() { return <DemoShell config={getDemo('automotive')!} /> }
