import Image from 'next/image'

export default function Home() {

  function heelo(){
    return 1;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={"flex"}>{heelo()}</div>
    </main>
  )
}
