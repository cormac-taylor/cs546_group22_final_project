# Data API

    Note:
    - All functions throw an error if something goes wrong (invalid input, DB error, etc.) and return on success.
    - All functions abide by the schema defined in the DB proposal (it has changed).

## ./users.js (5 functions)

### createUser(firstName, lastName, email, hashedPassword, location)

    To_Do

### removeUser(id)

    To_Do

### getAllUsers()

    To_Do

### getUserById(id)

    To_Do

### updateUser(id, updateFeilds)

    To_Do

## ./userReviews.js (7 functions)

### createUserReview(postingUser, reviewedUser, title, body, rating)

    To_Do

### removeUserReviewsByReviewedId(id)

    To_Do

### removeUserReviewById(id)

    To_Do

### getAllUserReviews()

    To_Do

### getUserReviewsByReviewedUserId(id)

    To_Do

### getUserReviewById(id)

    To_Do

### updateUserReview(id, updateFeilds)

    To_Do

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

## ./gameReviews.js (7 functions)

### createGameReview(postingUser, reviewedGame, title, body, rating)

    To_Do

### removeGameReviewsByReviewedGameId(id)

    To_Do

### removeGameReviewById(id)

    To_Do

### getAllGameReviews()

    To_Do

### getGameReviewsByReviewedGameId(id)

    To_Do

### getGameReviewById(id)

    To_Do

### updateGameReview(id, updateFeilds)

    To_Do
