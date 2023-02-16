export default function TournamentHeader(props) {

  const PlayerSide = (props) => {
    return (
      <div className="player-side">
        <h1>{props.playerTag ? <span>{props.playerTag} </span> : <></>}{props.playerName}</h1>
        <h1>{props.playerScore}</h1>
      </div>
    )
  }


  let { playerOneName, playerOneScore, playerOneTag, playerTwoName, playerTwoScore, playerTwoTag, headerTheme, reversedState, centerText} = props

  let classList = []
  classList.push('header-background')
  classList.push(headerTheme ? headerTheme : 'flower')
  if (props.preview) classList.push('preview')
  if (!props.preview) {
    document.getElementsByTagName("body")[0].style.background = "none"
    document.getElementsByTagName("html")[0].style.background = "none"
  }

  return (
    <div className={classList.join(' ')}>
      <section className={`rendered-header ${reversedState ? 'reversed' : ''}`}>
        <PlayerSide playerTag={playerOneTag} playerName={playerOneName} playerScore={playerOneScore} />
        <h2>{centerText}</h2>
        <PlayerSide playerTag={playerTwoTag} playerName={playerTwoName} playerScore={playerTwoScore} />
      </section>
    </div>
  )
}