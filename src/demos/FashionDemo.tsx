import { DemoShell, getDemo } from './DemoShell'
export default function FashionDemo() { return <DemoShell config={getDemo('fashion')!} /> }
