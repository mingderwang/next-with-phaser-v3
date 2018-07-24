import dynamic from 'next/dynamic'
const Game = dynamic(import('../components/PhaserGame'), {ssr: false})

export default () => {
  return (
    <div>
      <Game />
    </div>
  )
}