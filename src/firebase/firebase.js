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
	doCreateNewUser = user => {
		console.log('doCreateNewUser: ', user)
		const { email, password, username, userRole } = user
		this.auth.createUserWithEmailAndPassword(email, password).then(result => {
			console.log('Created User', result)
			const { uid, email } = result.user
			this.dbSaveNewUser({
				username,
				userRole,
				email,
				uid,
			})
		})
	}
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
	dbSaveNewUser = user => {
		const { uid, username, email, userRole } = user
		this.dbUserById(uid).set({
			username,
			email,
			userRole,
		})
	}
	// *** Contests API ***
	dbContests = () => this.db.ref(`/contests`)
	dbUserContests = uid => this.db.ref(`/users/${uid}/contests`)
	dbAdminContests = uid => this.db.ref(`admin/contests`)
	dbSaveNewContest = contest => {
		const newContestRef = this.dbAdminContests().push()
		console.log('newContestRef', newContestRef)
		newContestRef.set({
			...contest,
			uid: newContestRef.key,
		})
	}

	// *** Challenges API ***
	dbChallenges = () => this.db.ref('/challenges')
	dbSaveNewChallenge = challenge => {
		const newChallengeRef = this.dbChallenges().push()
		console.log('newChallengeRef', newChallengeRef)
		newChallengeRef.set({
			...challenge,
			uid: newChallengeRef.key,
		})
	}
	// *** Posts API ***
	dbPostsByUserId = uid => this.db.ref(`/posts/${uid}`)
}

export { Firebase }
