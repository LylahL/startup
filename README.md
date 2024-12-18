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