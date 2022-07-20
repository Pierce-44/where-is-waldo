<div align="center">
  <img src="https://openmoji.org/data/color/svg/1F4D1.svg" height="75px"/>
</div>

# Where's Waldo
A Where's Waldo app that operates like a photo tagging app, which was developed using React, Javascript, CSS, HTML, and FireBase (Realtime Database and hosting). This app was designed, developed and conducted to be submitted as my assignment for <img src="https://www.theodinproject.com/assets/icons/odin-icon-b5b31c073f7417a257003166c98cc23743654715305910c068b93a3bf4d3065d.svg"  width="20" height="20"> [The Odin Project Fullstack JavaScript Where's Waldo (A Photo Tagging App)](https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app).

![whereIsWaldoGIF](https://user-images.githubusercontent.com/96740762/180012705-5a5adf5f-aba8-492b-a5e9-1ac98ca0c11b.gif)

<br/>

## Built With:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  title="CSS3" alt="CSS" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" alt="React" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" title="Firebase" alt="Firebase" width="35" height="35"/>&nbsp;
</div>
<br/>

## Features:
- Selecting a point on the map takes the selected coordinates and checks it against the characters coordinates stored in the FireBase Realtime Database associated to that map.
- on successfully finding all characters players can submit their time score to a global leaderboard and therefore see how they rank against others.
- Implementation of FireBase Realtime Database to record player scores on a global leaderboard, as well as record anonymously submitted guest scores.
- Implementation of FireBase Hosting.
<br/>

## How To Use:

1. Open the live app at the following address:

   [`https://where-is-waldo-game.web.app/`](https://where-is-waldo-game.web.app/)

<br/>

## How to Install and Run the Project Locally:
#### - Please follow the following steps if you would like to install and run the porject locally on http://localhost:3000/:`

1. Clone the repository to your local folder of choice
   ```sh
   git@github.com:Pierce-44/where-is-waldo.git
   ```
   
   
2. Install NPM packages
   ```sh
   npm install
   ```

3. Start the app on your localhost
   ```js
   npm start
   ```
