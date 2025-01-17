# DevTinder API

authRouter
POST /signup
POST /login
POST /logout

profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

connectionRequestRouter
POST /request/send/intrested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:requestId
POST request/review/rejected/:requestId

userRouter
GET /user/connections
GET /user/requests
GET /user/feed - gets you the profile of others users on platform

status: ignore, intrested, accepted, rejected
