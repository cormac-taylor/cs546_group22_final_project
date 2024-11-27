# Data API

    Note:
    - All functions throw an error if something goes wrong (invalid input, DB error, etc.) and returns on success.
    - All functions abide by the schema defined in the DB proposal (it has changed).

## ./users.js (5 functions)

### createUser(firstName, lastName, email, hashedPassword, location)

    Creates a user only if the email address is unique across existing users.
    Returns the inserted user

### removeUser(id)

    Removes the user matching the id which is a user _id.
    Returns the removed user

### getAllUsers()

    Gets all the users.
    Returns an array of all the users

### getUserById(id)

    Gets the user matching the id which is a user _id.
    Returns the matching user

### updateUser(id, updateFeilds)

    Updates the user matching the id which is a user _id. updateFeilds is an object whose keys are any of the following: firstName, lastName, email, hashedPassword, or location. Note updateFeilds must not be empty but can contain any number of these fields. 
    Returns the updated user

## ./userReviews.js (8 functions)

### createUserReview(postingUser, reviewedUser, title, body, rating)

    Creates a user review only if both postingUser and reviewedUser exist and are different.
    Returns the created user review

### removeUserReviewsByReviewedId(id)

    Removes all user reviews whose reviewedUser attribute matches id.
    Returns an array of all removed user reviews

### removeUserReviewById(id)

    Removes the user review whose _id attribute matches id.
    Returns the removed user review

### getAllUserReviews()

    Gets all the user reviews.
    Returns an array of all the user reviews

### getUserReviewsByPostingUserId(id)

    Gets all the user reviews whose postingUser matches id.
    Returns an array of all the user reviews

### getUserReviewsByReviewedUserId(id)

    Gets all the user reviews whose reviewedUser matches id.
    Returns an array of all the user reviews

### getUserReviewById(id)

    Gets the user review whose _id matches id.
    Returns a user review

### updateUserReview(id, updateFeilds)

    Updates the user review matching the id which is a user review _id. updateFeilds is an object whose keys are any of the following: reviewedUser, title, body, rating. Note updateFeilds must not be empty but can contain any number of these fields. 
    Returns the updated user review

## ./games.js (7 functions)

### createGame(ownerID, location, gameTitle, description, condition, imgURL)

    To_Do

### removeGamesByOwnerId(id)

    To_Do

### removeGameById(id)

    To_Do

### getAllGames()

    To_Do

### getGamesByOwnerID(id)

    To_Do

### getGameById(id)

    To_Do

### updateGame(id, updateFeilds)

    To_Do

## ./gameReviews.js (8 functions)

### createGameReview(postingUser, reviewedGame, title, body, rating)

    To_Do

### removeGameReviewsByReviewedGameId(id)

    To_Do

### removeGameReviewById(id)

    To_Do

### getAllGameReviews()

    To_Do

### getGameReviewsByPostingUserId(id)

    To_Do

### getGameReviewsByReviewedGameId(id)

    To_Do

### getGameReviewById(id)

    To_Do

### updateGameReview(id, updateFeilds)

    To_Do
