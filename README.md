# Documentation:

## setup

1 npm install

2. duplicate config.sample.env and rename it to 'config.env' and google secret and client id.
3. npm run dev

# Routes

#### @METHOD -> @ROUTE -> @DESC -> @AUTH

## [ ] Auth
- [ ] GET -> /auth/google/ -> Sign in
- [ ] GET -> /auth/google/callback -> Callback for oauth
- [ ] GET -> /auth/logout -> Logout user

## [ ] Question
- [ ] GET -> /question -> Get all unanwered questions
- [ ] POST -> /question/create -> Create a new question
- [ ] PUT -> /question/:id -> Update a specific question, id of question
- [ ] DELETE -> /question/:id -> Delete a particular question, id of question
- [ ] GET -> /question/:id -> View a specific question with answers

## [ ] Answer
- [ ] POST -> /question/:id/answer/create -> Add answer to a specific question, id of question
- [ ] PUT-> /answer/:id, id of answer
- [ ] DELETE -> /answer/:id, id of answer


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
