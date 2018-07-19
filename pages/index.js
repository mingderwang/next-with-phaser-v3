import dynamic from 'next/dynamic'
const Game = dynamic(import('../components/Phaser'), {ssr: false})

export default () => {
  return (
    <div>
      <Game />
    </div>
  )
}