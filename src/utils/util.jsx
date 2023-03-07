import 'firebase/compat/firestore'

async function GetDocumentData(db, collection, docId) {
  let docRef = db.collection(collection).doc(docId)
  let doc = await docRef.get()
  if (!doc) return console.log("Error: no such document", docId)
  let docData = doc.data()
  return docData
}

export default GetDocumentData