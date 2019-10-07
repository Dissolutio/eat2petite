# What is this App
It is for a fitness and nutritional coach to host contests. Users can sign up, join a contest, and then start making daily posts to the app. In their posts, they report a certain quantity(or multiple quantities) of a particular action. These posts are scored and stored, and users are trying to reach certain goals for points, and different point checkpoints earn certain prizes from the coach.
# The flow of the Code
All incoming traffic is either routed to the landing page, where they can go to the sign-in or sign-up page. Once signed in, if they are a default user, they can be enrolled in contests and then make posts wherein they report data and that data is stored.

## Contexts and wrappers and styles in `index.js`

1. Provides our **5 Contexts**

    - **Firebase** - Provides our initialized firebase app, which is built from a class whose methods represent calls to the core firebase API.
    - **Auth** - Uses the firebase authentication listener to set the current `{user}` to either the return value of the core API call, or to some marriage of the core-call return and a database call (we are saving users in the database with properties such as their human height and weight, which are not part of the Firebase authentication protocol)
    - **UI** - tracks the state of the UI (is expanding naviation open? future possibilities too...)
    - **Data** - used to hold the data (users, challenges, contests, and posts) acquired from firebase realtime database

2. Wraps everything in **`<Router>`**
3. Imports our `normalize.css` and `theme.css`

## Routing and navigation in `App.js`

Navigation is setup to only provide authorized routes as links. So non-auth users basically get a one page landing, a sign-up, or a sign-in.

Routes are defined in `routes.js`, where public routes are under the root domain(`/`) and the subdomains `/user` and `/admin` each have their own conditions for authorization as demonstrated in the file `AppRouter.jsx`. If this router routes a user to the default or admin route, then the `UserRouter` or the `AdminRouter` takes over. Either a default or admin user will be directed to their dashboard, and from there they can navigate to their chose destinations.

## Database rules

In the firebase console, you can establish rules that determine what data can be read/written to in the JSON tree that is Firebase Realtime Database.
For our purposes, a user can read their `{users, posts, challenges, contests}` from the locations `{users = DB/publicUsers}` `{ posts = DB/posts[userUID] }` and `{challenges = DB/challenges}` and `{contests = DB/contests}`

## Style

CSS variables are declared in `theme.css`, imported into `index.js` and then Styled Components are used to style the app. In `App.js` I wrap the whole app in `<AppStyleContainer>` and the whole page router in `<PageStyleContainer>`. `reactstrap` and Bootstrap classes are used liberally throughout.

## Organization

I have tried to keep reusable hooks, functions, and firebase API calls in the `src/modules` directory.
Oft used auth-related forms such as the SignInForm, SignUpForm, CurrentUserReadout, and VerifyEmailForm are all kept in the `components/authentication/` directory. An admin user is routed to forms when viewing a post, challenge, or contest. A default user is routed to make posts but otherwise just read data. So there is otherwise in `components`  a `/user`, an `/admin`, a `/shared`, and a `/layout` directory. Layout is connected with routing, navigation, and general app layout and structutre. Then the UserRouter and AdminRouter takeover depending on the user's auth status.