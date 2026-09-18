import { DemoShell, getDemo } from './DemoShell'
export default function FoodDemo() { return <DemoShell config={getDemo('food')!} /> }
