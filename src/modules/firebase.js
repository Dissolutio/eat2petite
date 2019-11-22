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
    return this.auth
      .createUserWithEmailAndPassword(formUser.email, userPassword)
      .then((result) => {
        console.log('Created User', result)
        return this.dbSaveNewUser({
          ...formUser,
          uid: result.user.uid,
          email: result.user.email,
        })
      })
      .catch((error) => error)
  }
  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  doPasswordReset = (email) => {
    return this.auth.sendPasswordResetEmail(email)
  }
  doPasswordUpdate = (password) => {
    return this.auth.currentUser.updatePassword(password)
  }
  doSignOut = () => {
    return this.auth.signOut()
  }
  doSendEmailVerification = () => {
    return this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    })
  }
  // *** Dev API ***
  dbBlowItAllAway = async () => {
    await this.db.ref('/challenges').remove()
    await this.db.ref('/contests').remove()
    await this.db.ref('/posts').remove()
    await this.db
      .ref('/users')
      .once('value')
      .then((snapshot) => {
        Object.keys(snapshot.val()).forEach((userKey) => {
          this.db.ref(`/users/${userKey}/contests`).remove()
          this.db.ref(`/users/${userKey}/challengeTargets`).remove()
        })
      })
    return
  }
  // *** Users API ***
  dbPrivateUsers = () => this.db.ref(`/users`)
  dbPersonalUser = (uid) => this.db.ref(`/users/${uid}`)
  dbPublicUsers = () => this.db.ref(`/publicUsers`)
  dbPublicUserById = (uid) => this.db.ref(`/publicUsers/${uid}`)
  dbPrivateUserById = (uid) => this.db.ref(`/users/${uid}`)
  dbSaveNewUser = (user) => {
    const { uid, userRole, username } = user
    this.dbPrivateUserById(uid).set({
      ...user,
    })
    this.dbPublicUserById(uid).set({
      uid,
      userRole,
      username,
    })
  }
  dbSetUserChallengeTarget = (userId, challengeId, target) => {
    return this.dbPrivateUsers()
      .child(`${userId}/challengeTargets/${challengeId}`)
      .set(target)
  }
  // *** Contests API ***
  dbContests = () => this.db.ref(`/contests`)
  dbSaveNewContest = (contest) => {
    console.log('TCL: Firebase -> contest', contest)
    return this.dbContests()
      .push()
      .then((ref) => {
        ref.set({
          ...contest,
          uid: ref.key,
        })
        return ref.key
      })
  }
  dbEnrollUserInContest = (userId, contestId) => {
    let updates = {}
    updates['/contests/' + contestId + '/enrolledUsers/' + userId] = true
    updates['/users/' + userId + '/contests/' + contestId] = true
    return this.db.ref().update(updates)
  }
  // *** Challenges API ***
  dbChallenges = () => this.db.ref('/challenges')
  dbSetChallenge = (challenge) => {
    return this.dbChallenges()
      .child(`/${challenge.uid}`)
      .set(challenge)
  }
  dbUpdateChallenge = (updatedChallenge) => {
    return this.db.ref(`/challenges/${updatedChallenge.uid}`).set(updatedChallenge)
  }
  // *** Posts API ***
  dbPosts = () => this.db.ref('posts')
  dbPostsByUserId = (uid) => this.db.ref(`/posts/${uid}`)
  dbCreateUserPost = (post) => {
    return this.dbPostsByUserId(post.userId).push().then(ref => {
      ref.set({ ...post, uid: ref.key })
    })
  }
  dbUpdateUserPost = (post) => {
    return this.db.ref(`posts/${post.userId}/${post.uid}`).update({ ...post })
  }
}

export { Firebase }
