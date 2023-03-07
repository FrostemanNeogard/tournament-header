import { doc, getDoc } from 'firebase/firestore'
import GetFirestore from '../utils/GetFirestore'
import { useState, useEffect } from 'react'

function TournamentHeader(props) {

  const db = GetFirestore()

  let [playerOneName, setPlayerOneName] = useState(props.playerOneName)
  let [playerOneScore, setPlayerOneScore] = useState(props.playerOneScore)
  let [playerOneTag, setPlayerOneTag] = useState(props.playerOneTag)
  let [playerTwoName, setPlayerTwoName] = useState(props.playerTwoName)
  let [playerTwoScore, setPlayerTwoScore] = useState(props.playerTwoScore)
  let [playerTwoTag, setPlayerTwoTag] = useState(props.playerTwoTag)
  let [headerTheme, setHeaderTheme] = useState(props.headerTheme)
  let [reversedState, setReversedState] = useState(props.reversedState)
  let [centerText, setCenterText] = useState(props.centerText)

  const readDocumentData = async () => {
    console.log('Reading document data...')

    const docRef = doc(db, 'tournament-sets', '1rLoyh1KhPG66ERCaHDV')
    const docSnap = await getDoc(docRef)

    if (!docSnap?.exists()) return console.log('ERROR: No document found.')

    const docData = docSnap.data()

    setPlayerOneName(docData.playerOneName)
    setPlayerOneScore(docData.playerOneScore)
    setPlayerOneTag(docData.playerOneTag)
    setPlayerTwoName(docData.playerTwoName)
    setPlayerTwoScore(docData.playerTwoScore)
    setPlayerTwoTag(docData.playerTwoTag)
    setHeaderTheme(docData.headerTheme)
    setReversedState(docData.reversedState)
    setCenterText(docData.centerText)
  }

  useEffect(() => {
    readDocumentData
  }, [])

  setInterval(() => {

    readDocumentData()
  }, 7000)
  
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

function PlayerSide(props) {
  return (
    <div className="player-side">
      <h1>{props.playerTag ? <span>{props.playerTag} </span> : <></>}{props.playerName}</h1>
      <h1>{props.playerScore}</h1>
    </div>
  )
}

export default TournamentHeader