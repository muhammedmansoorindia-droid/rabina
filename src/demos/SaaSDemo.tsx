import { DemoShell, getDemo } from './DemoShell'
export default function SaaSDemo() { return <DemoShell config={getDemo('saas')!} /> }
