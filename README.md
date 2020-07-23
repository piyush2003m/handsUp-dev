# Documentation:

## setup

1 npm install

2. duplicate config.sample.env and rename it to 'config.env' and google secret and client id.
3. npm run dev

# Routes

#### @METHOD -> @ROUTE -> @DESC -> @AUTH

## [ ] User

- [ ] GET -> api/v1/users/ -> Get all users -> PRIVATE/ADMIN
- [ ] GET -> api/v1/users/:id -> Get all users -> PRIVATE/TEACHER/CLASSMATES
- [ ] PUT -> api/v1/users/:userid -> update a user -> PRIVATE/USER
- [ ] DELETE -> api/v1/users/:userid -> delete all users -> PRIVATE/USER

## [ ] Auth

- [ ] POST -> api/v1/auth/register -> Register User -> PUBLIC
- [ ] POST -> api/v1/auth/callback -> Oauth/Passport Callback -> PUBLIC
- [ ] POST -> api/v1/auth/login -> Login User -> PUBLIC
- [ ] GET -> api/v1/auth/profile -> Get logged in user info -> PRIVATE

## [ ] Classroom

- [ ] GET -> api/v1/classroom/ -> Get all classroom -> PRIVATE/ADMIN
- [ ] GET -> api/v1/classroom/:id -> Get a single classroom -> PRIVATE/CLASSSTUDENTS/TEACHER
- [ ] POST -> api/v1/classroom/ -> create a classroom -> PRIVATE/TEACHER
- [ ] PUT -> api/v1/classroom/:classId -> update a classroom -> PRIVATE/TEACHER
- [ ] DELETE -> api/v1/classroom/:classId -> delete a classroom -> PRIVATE/TEACHER

## [ ] Questions

- [ ] GET -> api/v1/questions/ -> Get all questions -> PRIVATE/ADMIN
- [ ] GET -> api/v1/classroom/:classid/questions/ -> Get all questions in a classroom-> PRIVATE/ADMIN
- [ ] GET -> api/v1/classroom/:classid/questions/:questionId -> Get a single question in classroom -> PRIVATE/USER
- [ ] POST -> api/v1/classroom/:classid/questions/ -> post a question in a classroom -> PRIVATE/USER
- [ ] PUT -> api/v1/classroom/:classid/questions/:questionid -> update a question in a classroom -> PRIVATE/USER
- [ ] DELETE -> api/v1/classroom/:classid/questions/:questionId -> delete a question in a classroom -> PRIVATE/USER

## [ ] Comment

- [ ] GET -> api/v1/questions/:questionId/comments/ -> Get all comments in a question -> PRIVATE/USER
- [ ] GET -> api/v1/questions/:questionId/comments/ -> post comment in a question -> PRIVATE/USER
- [ ] GET -> api/v1/questions/:questionId/comments/:commentid -> Get a single question in classroom -> PRIVATE/USER
- [ ] PUT -> api/v1/questions/:questionId/comments/:commentid -> update a single question in classroom -> PRIVATE/USER
- [ ] DELETE -> api/v1/questions/:questionId/comments/:commentid -> delete a single question in classroom -> PRIVATE/USER

# Models

## User

- [ ] Google Id
- [ ] Name
- [ ] Role
- [ ] Google Token
- [ ] Email
- [ ] ClassroomId - array
- [ ] ProfilePic
- [ ] Questions - array

## Classroom

- [x] classId
- [ ] className
- [ ] teacherID
- [ ] students - array

## Question

- [ ] questionId
- [x] topic
- [x] votes
- [x] subject
- [ ] classId
- [x] text
- [x] answers - array
- [x] correctAnswer
- [x] askedBy - userid

## Comment

- [ ] questionId
- [x] votes
- [x] text
- [x] userId
