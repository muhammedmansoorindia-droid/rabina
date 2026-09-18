import { DemoShell, getDemo } from './DemoShell'
export default function RealEstateDemo() { return <DemoShell config={getDemo('real-estate')!} /> }
