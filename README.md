# NailEdit

This is a project for CS260

## Specification Deliverable

### Pitch

As me personally is super in to nail art, I've always wished for a platform of nail art where you can unleash your creativity effortlessly. This web application is your personal haven for nail design enthusiasts. Dive into a user-friendly platform where you can effortlessly create and store your unique nail designs using a palette of endless colors. Showcase your artistic flair by sharing your creations online, and be inspired by checking out stunning designs from fellow users.

## Design

![NailEdit](https://github.com/LylahL/startup/assets/144963899/087377ac-0d71-45d5-b248-c8461075b707)
~~Do I need to draw a sequence diagram as well, not sure 🧐~~

## Key features

- Secure log in/ sign up to your personal account
- Random color generator
- Edit nail colors or patterns through Hex code input
- Post your own design
- Explore other people's design
- Save/ delete yours and other people's design to/ from your own collection
- Amount of how many users have saved this design display in realtime

## Technologies

- **HTML**
  - Use HTML structure to construct four page. Log in page, Edit page, Explore page and Collection page.
- **CSS**
  - Beautify user interface design, makes the application looks apealing.
- **JavaScript**
  - Makes the website interactive.
- **Service**
  - Log in/ Sign up
  - Store collections
  - Save yours and others designs
- **Login**
  - Users may log in to their personal account have their designs and collections saved.
- **WebSocket**
  - Use for display the amount of how many people have saved a design.
- **React**
  - Application ported to use the React web framework.

## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages**
  - Four HTML page, index for log in or sign up, myAccount to design nails, explore to check out other peoples design, existingNails for storing design collection.
- **Links**
  - The login page links to the myAccount page, and can use buttons to navigate through other pages they are all linked together. Sign out to get back to the login page.
- **Text**
  - Use HEX codes to represent nail colors
- **Images**
  - Included image of icon
- **DB/Login**
  - Input box and submit button for login, and like button for how many other users have liked your design.
- **WebSocket**
- The count of like represent realtime data.
- **Third Party Services**
- Calls Colormind API to generate a random set of color design.

## CSS deliverable

For this deliverable I proplerly styled the application into its final appearance

- **Header,footer, and main content body**
- **Navigation elements**
  - The styling for navigation elements changes when hovering over them, and when switching inbetween tabs
- **Responsive to window resizing**
  - The app looks great on all window sizes and devices
- **Application elements**
  - Used good contrast and whitespace
- **Application text content**
  - Consistent fonts
- **Application images**
  - Background image floats

## React Phase 1: Routing deliverable

For this deliverable I used JavaScript and React so that the application completely works for a single user. I also added placeholders for future technology.
- Bundled using Vite 
- NailEdit now boasts a modular React codebase.
- React components facilitate easier maintenance and future feature expansion.

  - **Component-Based Architecture:**  
    The original HTML pages have been divided into modular React components:
  - **Login Component:** Handles user authentication with a form for login and sign-up.
  - **MyAccount Component:** Provides a workspace for creating and editing nail designs, featuring a random color generator and HEX code input.
  - **Explore Component:** Displays nail designs from other users with like buttons that update realtime.
  - **ExistingNails Component:** Allows users to view, save, and delete nail designs from their personal collection.

- **Routing with React Router:**  
  Client-side routing is managed through React Router, resulting in a smooth single-page application (SPA) experience. Users can navigate seamlessly between Login, MyAccount, Explore, and ExistingNails without full page reloads.

- **Enhanced Styling & Layout:**  
  The original CSS has been adapted for React and integrated within the component hierarchy. A flexbox-based layout ensures that:
  - The header remains at the top.
  - The main content area fills available space.
  - A sticky footer is automatically pushed to the bottom on pages with little content (without using fixed positioning).

## React Phase 2: Reactivity Deliverable

For this deliverable I used JavaScript and React to ensure the application is fully functional for a single user. I have also added placeholders for future technology.

### My Account (myAccount.jsx)
- Uses a helper function to generate a random hex code (simulating a third–party API call).
- On component mount (inside a `useEffect`), it “fetches” an initial hex code.
- The **Random** and **Custom** buttons let the user update the displayed hex code.
- The **Save** button stores the current design (hex color) to localStorage so that the **Existing Nails** view can later load it.

### Explore (explore.jsx)
- Refactored into a parent component composed of two child components:
  - **LiveMessages:** Uses a `useEffect` hook with `setInterval` to simulate a WebSocket that every few seconds “receives” a like message from a random user. It displays the latest five messages.
  - **ExploreNails:** Displays nail designs for three sample users. The like button increments a local like counter on click.

### Login (login.jsx)
- Implements two child components that render based on the authentication state:
  - **Unauthenticated:** Shows a login form. On a mock login (when username and password are provided), the username is stored in localStorage and reported back up via a callback.
  - **Authenticated:** Welcomes the user and displays a **Sign Out** button which clears localStorage, updates the state, and “logs out” the user.
- Also includes an optional **MessageDialog** component for error handling (handled simply in this deliverable).

### App (app.jsx)
- Lifts the authentication state (`authState` and `username`) into the top–level component so that other parts of the app (and even the navigation menu) can react to login changes.
- Checks localStorage on startup and conditionally renders either **Log In** or **Sign Out** in the menu.

### Existing Nails (existingNails.jsx)
- Reads a list of saved designs from localStorage and displays each one, rendering nails with their saved hex code.

## Service Deliverable

This deliverable implements a comprehensive backend service for NailEdit using Node.js and Express, offering secure authentication, integration with third-party endpoints, and dedicated backend endpoints that power the React frontend.


- **Node.js/Express HTTP Service:**  
  The service is built on Node.js and Express, and listens on a specified port (defaulting to 4000). It provides RESTful endpoints for user registration, login, logout, nail design management, and a proxy for a third-party color service.

- **Static Middleware for Frontend:**  
  The Express static middleware serves the React frontend from the `public` directory. This integration ensures that the entire application (backend and frontend) runs as a single unified service.

- **Third-Party API Integration:**  
  The backend leverages `node-fetch` to proxy requests to [The Color API](https://www.thecolorapi.com/). By calling the endpoint with `hex=random`, the service always returns a random color, eliminating the need to generate a hex code locally.

#### Authentication Endpoints

- **Register:**  
  **`POST /api/auth/create`**  
  Registers a new user after ensuring that the email is not already in use. The password is securely hashed using `bcryptjs` and the user receives a token stored as an HTTP-only cookie.

- **Login:**  
  **`POST /api/auth/login`**  
  Authenticates an existing user by validating the credentials. On success, the system issues a new session token (via UUID) and sets it in a secure cookie.

- **Logout:**  
  **`DELETE /api/auth/logout`**  
  Logs out the user by removing their session token from the in-memory store and clearing the authentication cookie.


#### Nail Design Endpoints

- **Saved Designs (Private):**  
  - **`POST /api/designs/saved`**  
    Saves a nail design (color) for the authenticated user.
  - **`GET /api/designs/saved`**  
    Retrieves the saved designs for the logged-in user.
  - **`DELETE /api/designs/saved/:id`**  
    Deletes a specific design if it belongs to the authenticated user.

- **Posted Designs (Public):**  
  - **`POST /api/designs/posted`**  
    Allows an authenticated user to post a design publicly.
  - **`GET /api/designs/posted`**  
    Retrieves all publicly posted nail designs.

#### Third-Party Color API Proxy

- **Random Color Endpoint:**  
  **`GET /api/color`**  
  This endpoint proxies a request to The Color API by calling it with `hex=random&format=json`. The result is forwarded to the client and used to display a random color on the frontend.