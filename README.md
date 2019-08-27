# What is this App

It is a game-aid for players of the boardgame Heroscape. It is built with create-react-app, Firebase. It uses `styled-components` for styling, `react-spring` for animations, and `react-router` for routing.

# The flow of the Code

## Contexts and wrappers and styles in `index.js`

1. Provides our **5 Contexts**

    - **Firebase** - provides our initialized firebase app
    - **Auth** - uses the firebase authentication listener to set the current user
    - **UI** - tracks the state of the UI (isSidenavOpen?)
    - **Data** - used to hold the data (cards, armies, libraries, users, messages) acquired either locally or from firebase realtime database
    - **Cloudinary** - provides access to images in the Cloudinary database.

2. Wraps everything in **`<Router>`**
3. Imports our `normalize.css` and `theme.css`

## Routing and navigation in `App.js`

`<Sidenav>` is setup to only provide authorized routes as links.

Routes are defined in `routes.js`, where public routes are under the root domain(`/`) and the subdomains `/authenticated` and `/authenticated/admin` each have their own conditions for authorization.

`<PageRouter>` dishes up our different pages, and some may have their own internal routing, like the `<Gallery>` component using the `<GalleryRouter>`.

## Style

CSS variables are declared in `theme.css`, imported into `index.js` and then Styled Components are used to style the app. In `App.js` I wrap the whole app in `<AppStyleContainer>` and the whole page router in `<PageStyleContainer>`.
