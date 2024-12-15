# To Do

### Core Features In Progress
    User Profile:               Needs location validation
    --------------------------------------------------------------------------------------------------------------------------
    Sign up page:               Needs location validation
    --------------------------------------------------------------------------------------------------------------------------
    Manage Games Page:          Waiting Approval
    --------------------------------------------------------------------------------------------------------------------------
    Game Profile/Reviews:       Waiting Approval
    --------------------------------------------------------------------------------------------------------------------------
    Discover Games:             Waiting Approval
    --------------------------------------------------------------------------------------------------------------------------
    Find Games:                 ?
    --------------------------------------------------------------------------------------------------------------------------
    Community blog/Events page: ?
    --------------------------------------------------------------------------------------------------------------------------
    User Profile/Reviews:       Waiting Approval
    --------------------------------------------------------------------------------------------------------------------------
    Return Borrowed Games       Waiting Approval

### Core Features Awaiting Approval
    - Manage Games Page
    - Game Profile/Reviews
    - Discover Games
    - User Reviews
    - Return Borrowed Game

### Core Features Done
    - Sign in page
    - Home page

### Missing Requirements
    - Seed file for requests, etc.
    - All core features

### Requirements to test
    - XSS
    - Input validation
    - Valid HTML
    - Sign up/in logical errors
    - Bugs/usability issues (server crash, multiple likes/dislikes likes, multiple reviews, etc.)
    - no node_modules & package.json has all dependencies 

### Cormac's Notes
    Route                           Description
    --------------------------------------------------------------------------------------------------------------------------
    /                               discover and community should probably have the same access; either need account or don't
    --------------------------------------------------------------------------------------------------------------------------
    /signup                         route to the sign in page after sign up
    --------------------------------------------------------------------------------------------------------------------------
    /signup                         make sure all data is collected; address currently isn't
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     feild and value should persist through invalid input
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     everything should route back to user dashboard not home
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     updating username should route to dashbord or something to get them off the page so that 
                                    the url updates
    --------------------------------------------------------------------------------------------------------------------------
    ... to be continued 
