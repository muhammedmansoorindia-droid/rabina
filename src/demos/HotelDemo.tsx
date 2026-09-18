import { DemoShell, getDemo } from './DemoShell'
export default function HotelDemo() { return <DemoShell config={getDemo('hotel')!} /> }
