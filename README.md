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

<<<<<<< HEAD
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
=======
- [ ] googleId
- [ ] firstName
- [ ] displayName
- [ ] image
- [ ] role
- [ ] image
- [ ] createdAt
>>>>>>> 8b1f008fb2d26396b796c5bd2c1f9eb09c9ca157

## Question

- [x] topic
- [x] votes
- [x] subject
- [x] text
- [x] votes
- [x] images - array
- [x] answers - array of Answer ID
- [x] correctAnswer - User ID
- [x] askedBy - User ID

## Answer

- [x] votes
- [x] text
- [x] createdAt
- [x] images - array
- [x] answeredBy - User ID
