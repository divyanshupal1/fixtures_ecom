import { Button } from '@/components/ui/button';
import Image from 'next/image'

export default function Home(): JSX.Element {

  function heelo():number{
    return 1;
  } 
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className={"flex"}>{heelo()}</div>
      <Button variant={"ghost"} >Click me</Button>
    </main>
  )
}
