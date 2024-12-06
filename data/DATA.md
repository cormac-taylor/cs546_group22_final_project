# TODO:
    - Add Status to the Games Listing on the Dashboard
        (Games now have a borrowed field if owner approved the request, (false or userId) check this field and list the name of user)
    - Make the root page better (Add banner, image, etc)
    

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

    Updates the user review matching the id which is a user review _id. updateFeilds is an object whose keys are any of the following: reviewedUser, title, body, or rating. Note updateFeilds must not be empty but can contain any number of these fields.
    Returns the updated user review

## ./games.js (7 functions)

### createGame(ownerID, location, gameTitle, description, condition, imgURL)

    Creates a game only if the ownerID exists.
    Returns the inserted game

### removeGamesByOwnerId(id)

    Removes all games whose ownerId attribute matches id.
    Returns an array of all removed games

### removeGameById(id)

    Removes the game matching the id which is a game _id.
    Returns the removed game

### getAllGames()

    Gets all the games.
    Returns an array of all the games

### getGamesByOwnerID(id)

    Gets all the games whose ownerId matches id.
    Returns an array of all the games

### getGameById(id)

    Gets the game matching the id which is a game _id.
    Returns the matching game

### updateGame(id, updateFeilds)

    Updates the game matching the id which is a game _id. updateFeilds is an object whose keys are any of the following: location, gameTitle, description, condition, or imgURL. Note updateFeilds must not be empty but can contain any number of these fields.
    Returns the updated game

## ./gameReviews.js (8 functions)

### createGameReview(postingUser, reviewedGame, title, body, rating)

    Creates a game review only if both postingUser and reviewedGame exist and postingUser doesn't own reviewedGame.
    Returns the created game review

### removeGameReviewsByReviewedGameId(id)

    Removes all game reviews whose reviewedGame attribute matches id.
    Returns an array of all removed game reviews

### removeGameReviewById(id)

    Removes the game review whose _id attribute matches id.
    Returns the removed game review

### getAllGameReviews()

    Gets all the game reviews.
    Returns an array of all the game reviews

### getGameReviewsByPostingUserId(id)

    Gets all the game reviews whose postingUser matches id.
    Returns an array of all the game reviews

### getGameReviewsByReviewedGameId(id)

    Gets all the game reviews whose reviewedGame matches id.
    Returns an array of all the game reviews

### getGameReviewById(id)

    Gets the game review whose _id matches id.
    Returns a game review

### updateGameReview(id, updateFeilds)

    Updates the game review matching the id which is a game review _id. updateFeilds is an object whose keys are any of the following: reviewedGame, title, body, or rating. Note updateFeilds must not be empty but can contain any number of these fields.
    Returns the updated game review
