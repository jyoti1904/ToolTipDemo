# XelloToolTipChallenge


1. Tooltip functionality has been written as a reusable directive
2. Angular CLI is used
3. Reviewer can run solution with a simple npm command


Functionalities implemented:

1. Single page application with routing
    Route - /ToolTipDemo, or link provided on home page to redirect to this route
2. When button A is clicked, if button B’s tooltip is open, it will close and vice versa 
3. Only one tooltip is visible at a time
4. Tooltip is getting closed when clicked anywhere outside
5. Tooltip is getting closed on press of esc key

Bonus points implemented:

1. scrolling down to an open tooltip should detect being at the edge of the screen and change position to be below the button
2. Styling using bootstrap css
3. keyboard arrow navigation accessibility feature added
4. Responsive design

Bugs resolved:
 1. nglint changes, removed whitespaces, code formatting corrected
 2. In case back button is pressed, tool tip should get removed
 3. 'click here to see tooltip demo' link should not be shown once child component rendered
 
