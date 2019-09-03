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
	dbAllSampleUsers = () => this.db.ref(`/sampleUsers`)
	dbUserById = uid => this.db.ref(`/users/${uid}`)
	saveNewUser = user => {
		const { uid, username, email, userRole } = user
		this.dbUserById(uid).set({
			username,
			email,
			userRole,
		})
	}
	// *** Contests API ***
	dbAllContests = () => this.db.ref(`/contests`)
	dbContestById = uid => this.db.ref(`/contests/${uid}`)
	// *** Challenges API ***
	dbAllChallenges = () => this.db.ref(`/challenges`)
	dbChallengeById = uid => this.db.ref(`/challenges/${uid}`)
	// *** Posts API ***
	dbAllPosts = () => this.db.ref(`/posts`)
	dbPostsById = uid => this.db.ref(`/posts/${uid}`)
}
export { Firebase }
