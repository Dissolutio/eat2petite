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
	doCreateNewUser = (formUser, userPassword) => {
		const { email } = formUser
		this.auth.createUserWithEmailAndPassword(email, userPassword).then(result => {
			console.log('Created User', result)
			this.dbSaveNewUser({
				...formUser,
				uid: result.user.uid,
				email: result.user.email,
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
	dbPrivateUsers = () => this.db.ref(`/users`)
	dbPublicUsers = () => this.db.ref(`/publicUsers`)
	dbPublicUserById = uid => this.db.ref(`/publicUsers/${uid}`)
	dbPrivateUserById = uid => this.db.ref(`/users/${uid}`)
	dbSaveNewUser = user => {
		const { uid } = user
		this.dbPrivateUserById(uid).set({
			...user,
		})
		this.dbPublicUserById(uid).set({
			...user,
			email: null,
		})
	}
	// *** Contests API ***
	dbContests = () => this.db.ref(`/contests`)
	dbSaveNewContest = contest => {
		const newContestRef = this.dbContests().push()
		newContestRef.set({
			...contest,
			uid: newContestRef.key,
		})
		return newContestRef.key
	}
	dbEnrollUserInContest = (userId, contestId) => {
		let updates = {}
		updates['/contests/' + contestId + '/enrolledUsers/' + userId] = true
		updates['/users/' + userId + '/contests/' + contestId] = true
		return this.db.ref().update(updates)
	}

	// *** Challenges API ***
	dbChallenges = () => this.db.ref('/challenges')
	dbSaveNewChallenge = challenge => {
		const newChallengeRef = this.dbChallenges().push()
		newChallengeRef.set({
			...challenge,
			uid: newChallengeRef.key,
		})
	}
	dbUpdateChallenge = (updatedChallenge) => this.db.ref(`/challenges/${updatedChallenge.uid}`).set(updatedChallenge)
	// *** Posts API ***
	dbPosts = () => this.db.ref('posts')
	dbPostsByUserId = uid => this.db.ref(`/posts/${uid}`)
	dbCreateUserPost = post => {
		const newPostRef = this.dbPostsByUserId(post.author).push()
		newPostRef.set({ ...post })
	}
}

export { Firebase }
