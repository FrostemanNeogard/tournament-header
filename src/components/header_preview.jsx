import { doc, setDoc, getDoc } from "firebase/firestore"
import GetFirestore from "../utils/GetFirestore"

import { useState, useEffect } from 'react'

import TournamentHeader from "./tournament_header"
import CopyToClipboard from "react-copy-to-clipboard"

const currentDocId = ''

function HeaderPreview() {

  const db = GetFirestore()

  let [copiedState, setCopiedState] = useState(false)

  let [playerOneName, setPlayerOneName] = useState("Player One")
  let [playerOneScore, setPlayerOneScore] = useState(0)
  let [playerOneTag, setPlayerOneTag] = useState('')
  let [playerTwoName, setPlayerTwoName] = useState("Player Two")
  let [playerTwoScore, setPlayerTwoScore] = useState(0)
  let [playerTwoTag, setPlayerTwoTag] = useState('')
  let [headerTheme, setHeaderTheme] = useState('flower')
  let [reversedState, setReversedState] = useState(false)
  let [centerText, setCenterText] = useState('')

  const updatePlayerInformation = async (form) => {
    if (!form) return console.log('faulty update')
    form.preventDefault()
    console.log('updating')

    const data = {
      playerOneName: playerOneName,
      playerOneScore: playerOneScore,
      playerOneTag: playerOneTag,
      playerTwoName: playerTwoName,
      playerTwoScore: playerTwoScore,
      playerTwoTag: playerTwoTag,
      preview: true,
      theme: headerTheme,
      reversed: reversedState,
      centerText: centerText,
    }
    console.log('Updating to:', data)

    await setDoc(doc(db, 'tournament-sets', '1rLoyh1KhPG66ERCaHDV'), {
      playerOneName: playerOneName,
      playerOneScore: playerOneScore,
      playerOneTag: playerOneTag,
      playerTwoName: playerTwoName,
      playerTwoScore: playerTwoScore,
      playerTwoTag: playerTwoTag,
      preview: true,
      theme: headerTheme,
      reversed: reversedState,
      centerText: centerText,
    })
  }

  return (
    <>
      {/* <TournamentHeader
        playerOneName={playerOneName}
        playerOneScore={playerOneScore}
        playerOneTag={playerOneTag}
        playerTwoName={playerTwoName}
        playerTwoScore={playerTwoScore}
        playerTwoTag={playerTwoTag}
        preview={true}
        theme={headerTheme}
        reversed={reversedState}
        centerText={centerText}
      /> */}
      <div className="header-interface">
        <form onSubmit={updatePlayerInformation} className="player-info-form">
          <div>
            <label htmlFor="player-one-tag">P1 Tag/Sponsor</label>
            <input type="text" name="player-one-tag" placeholder="Type new tag here..." onChange={(e) => setPlayerOneTag(e.target.value)} />
            <label htmlFor="player-one-name">P1 Name</label>
            <input type="text" name="player-one-name" placeholder="Type new name here..." onChange={(e) => setPlayerOneName(e.target.value)} />
            <label htmlFor="player-one-score">P1 Score</label>
            <input type="number" name="player-one-score" placeholder="Update score here..." onChange={(e) => setPlayerOneScore(e.target.value)} />
          </div>
          <div>
            <label htmlFor="player-two-tag">P2 Tag/Sponsor</label>
            <input type="text" name="player-two-tag" placeholder="Type new tag here..." onChange={(e) => setPlayerTwoTag(e.target.value)} />
            <label htmlFor="player-two-name">P2 Name</label>
            <input type="text" name="player-two-name" placeholder="Type new name here..." onChange={(e) => setPlayerTwoName(e.target.value)} />
            <label htmlFor="player-two-score">P2 Score</label>
            <input type="number" name="player-two-score" placeholder="Update score here..." onChange={(e) => setPlayerTwoScore(e.target.value)} />
          </div>
          <div>
            <label htmlFor="center-text">Center Text</label>
            <input type="text" name="center-text" placeholder="Type text..." onChange={(e) => setCenterText(e.target.value)} />
            <label htmlFor="header-theme">Select Theme</label>
            <select name="header-theme" id="header-theme">
              <option value="flower" onChange={(e) => setHeaderTheme(e.target.value)} >Flower</option>
            </select>
            <label htmlFor="reverse-button">Swap Player Sides</label>
            <button id="reverse-button" onClick={() => {
              setReversedState(!reversedState)
              console.log("Updated reverseState to", reversedState)
            }}>Swap player sides</button>
          </div>

          <button type="submit">Update Information</button>

        </form>
        <CopyToClipboard text={`http://127.0.0.1:5173/render?id=${currentDocId}`} onCopy={() => setCopiedState(true)}>
          <button>Copy Link to Clipboard</button>
        </CopyToClipboard>
      </div>
    </>
  )
}

export default HeaderPreview