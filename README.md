# Social-Network API

## Description

- API for managing a social media site db. Users, posts and reactions. 


## Installation

N/A

## Usage

API Endpoints:
#Users /api/users/
'/' : Get all Users
'/:id' : get, put(edit email), post, and delete single user by id
'/:id/friends' : get users friends
'/:id/friends/:friendId' : add and remove friend by other userId

#Thoughts /api/Thoughts
'/' : Get all Thoughts
'/:thoughtId' : get, put, post and delete by thoughtId
'/thoughtId/reactions' : get and post reactions to a thought
'/:thoughtId/reactions/:reactionId' : delete reaction to thought

## Credits

N/A

## License

Please refer to the LICENSE in the repo.

---
