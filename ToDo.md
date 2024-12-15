# To Do

### Core Features In Progress
    Landing Page:               Needs content
    --------------------------------------------------------------------------------------------------------------------------
    User Profile:               Needs update location function
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
    - Sign up page

### Missing Requirements
    - Full seed file

### Requirements to test
    - input validation, site-wide
    - valid HTML
    - bugs/usability issues
    - server crash
    - confirm user can only leave one review and delete review
    - XSS

### Cormac's Notes
    Route                           Description
    --------------------------------------------------------------------------------------------------------------------------
    *                               make prettier if have time
    --------------------------------------------------------------------------------------------------------------------------
    *                               make header dynamic or at least make the routing more intuitive (the button are bit odd
                                    to use in their current placment)
    --------------------------------------------------------------------------------------------------------------------------
    /                               home should have info; either add new content or make see events or community the home 
    --------------------------------------------------------------------------------------------------------------------------
    /                               rename "Create Account" to  "Sign Up" for consistancy
    --------------------------------------------------------------------------------------------------------------------------
    /                               discover and community should probably have the same access; either need account or don't
    --------------------------------------------------------------------------------------------------------------------------
    /                               add signout button
    --------------------------------------------------------------------------------------------------------------------------
    /signup                         should not be accessable when signed in
    --------------------------------------------------------------------------------------------------------------------------
    /sigin                          add client side validation
    --------------------------------------------------------------------------------------------------------------------------
    /signup                         add client side validation
    --------------------------------------------------------------------------------------------------------------------------
    /signup                         route to the sign in page after sign up
    --------------------------------------------------------------------------------------------------------------------------
    /signup                         make sure all data is collected; address currently isn't
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     make sure that user can't select default attribute
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     maybe password should only be updated at /login as forgot password
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     feild and value should persist through invalid input
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     everything should route back to user dashboard not home
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     probably best to offer a link to the dashboard
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     updating password doesn't work
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     updating username if user's should let them know its theirs
    --------------------------------------------------------------------------------------------------------------------------
    /dashboard/:username/update     updating username should route to dashbord or something to get them off the page so that 
                                    the url updates
    --------------------------------------------------------------------------------------------------------------------------
    /community                      buttons dont do anything with new user at least
    --------------------------------------------------------------------------------------------------------------------------
    /manage/addGame2                unhandled error when no games come up Ex. ovienronvoerno
    --------------------------------------------------------------------------------------------------------------------------
    ... to be continued 
