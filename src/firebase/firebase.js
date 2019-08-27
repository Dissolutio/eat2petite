import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_FIRE_APIKEY,
    authDomain: process.env.REACT_APP_FIRE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIRE_DB_URL,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
}
class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.database()
        this.EmailAuthProvider = app.auth.EmailAuthProvider
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)
    doSignOut = () => this.auth.signOut()
    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        })

    // *** Users API ***
    dbAllUsers = () => this.db.ref(`/users`)
    dbUserById = uid => this.db.ref(`/users/${uid}`)
    saveNewUser = user => {
        const { uid, username, email, userRole, emailVerified } = user
        this.dbUserById(uid).set({
            username,
            email,
            userRole,
            emailVerified,
        })
    }
    // *** Cards API ***
    getCoreCards = () => {
        return this.db
            .ref('/core-cards')
            .once('value')
            .then(snapshot => {
                return coreCardsFromSnapshot(snapshot)
            })
            .catch(error => {
                console.log(error)
                return []
            })
    }
}
function coreCardsFromSnapshot(snapshot) {
    let snapshotValue = snapshot.val()
    if (snapshotValue === null || undefined) {
        return []
    }
    const defaultCardQuantity = 99
    return Object.entries(snapshotValue).map(entry => {
        const uid = entry[0]
        const card = entry[1]
        return {
            ...card,
            uid,
            quantityCardInLibrary: defaultCardQuantity,
        }
    })
}
export { Firebase }
