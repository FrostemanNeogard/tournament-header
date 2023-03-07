import { Route, Routes, HashRouter } from "react-router-dom"
import { useState, useEffect, Component } from "react"
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import './main.sass'

import HeaderPreview from "./components/header_preview"
import TournamentHeader from "./components/tournament_header"

firebase.initializeApp({
  apiKey: "AIzaSyAd_syOGkvdAuFw_0FSpetUeLD3zDCOdJ0",
  authDomain: "tournament-header.firebaseapp.com",
  projectId: "tournament-header",
  storageBucket: "tournament-header.appspot.com",
  messagingSenderId: "756396079293",
  appId: "1:756396079293:web:91849ba16b725213809fd4"
})

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HeaderPreview />} />
        <Route path="/render" element={<TournamentHeader />} />
      </Routes>
    </HashRouter>
  )
}

export default App