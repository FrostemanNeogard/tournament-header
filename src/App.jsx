import { Route, Routes } from "react-router-dom"
import { useState, useEffect, Component } from "react"
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CopyToClipboard } from "react-copy-to-clipboard"

import './main.sass'

import GetDocumentData from './util.jsx'
import TournamentHeader from "./components/tournament-header.jsx"

const collectionName = 'tournament-sets'

firebase.initializeApp({
  apiKey: "AIzaSyAd_syOGkvdAuFw_0FSpetUeLD3zDCOdJ0",
  authDomain: "tournament-header.firebaseapp.com",
  projectId: "tournament-header",
  storageBucket: "tournament-header.appspot.com",
  messagingSenderId: "756396079293",
  appId: "1:756396079293:web:91849ba16b725213809fd4"
})
const db = firebase.firestore()
let currentDocId


function App() {
  let [headerData, updateHeaderData] = useState('')
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  currentDocId = urlParams.get('id')
  
  const OutPutRender = (props) => {
  
    let { playerOneName, playerOneScore, playerOneTag, playerTwoName, playerTwoScore, playerTwoTag, headerTheme, reversedState, centerText} = headerData
  
    useEffect(() => {
      console.log("Run ONCE please")
      GetDocumentData(db, collectionName, currentDocId).then((res) => {
        updateHeaderData(res)
      })
    }, [headerData])
  
    return (
      <TournamentHeader
        playerOneName={playerOneName}
        playerOneScore={playerOneScore}
        playerOneTag={playerOneTag}
        playerTwoName={playerTwoName}
        playerTwoScore={playerTwoScore}
        playerTwoTag={playerTwoTag}
        preview={false}
        headerTheme={headerTheme}
        reversedState={reversedState}
        centerText={centerText}
      />
    )
  
  }
  return (
    <Routes>
      <Route path="/" element={<HeaderPreview />} />
      <Route path="/render" element={<OutPutRender />} />
    </Routes>
  )
}

function HeaderPreview() {

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

  useEffect(() => {
    console.log("Doing stuff")
    GetDocumentData(db, collectionName, currentDocId).then((res) => {
      setPlayerOneName(res.playerOneName)
      setPlayerOneScore(res.playerOneScore)
      setPlayerOneTag(res.playerOneTag)
      setPlayerTwoName(res.playerTwoName)
      setPlayerTwoScore(res.playerTwoScore)
      setPlayerTwoTag(res.playerTwoTag)
      setHeaderTheme(res.headerTheme)
      setReversedState(res.reversedState)
      setCenterText(res.centerText)
    })
  }, [])

  const setRef = db.collection("tournament-sets")
  const query = setRef.orderBy("createdAt").limit(25)
  const [sets] = useCollectionData(query, { idField: 'id' })

  async function updatePlayerInformation(form) {
    form.preventDefault()
    
    updateHeaderData(
      playerOneName,
      playerOneScore,
      playerOneTag,
      playerTwoName,
      playerTwoScore,
      playerTwoTag,
      headerTheme,
      reversedState,
      centerText
    )
    if (!currentDocId || !setRef.doc(currentDocId)) {
      await setRef.add({
        headerData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then((docRef) => {
        currentDocId = docRef.id
        location.href = `?id=${currentDocId}`
      })
    }
    else {
      setRef.doc(currentDocId).update({
        headerData
      })
    }
  }
  
  return (
    <>
      <TournamentHeader 
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
      />
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


export default App