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
- [ ] POST -> /question/:id/update -> Update a specific question
- [ ] POST -> /question/:id/delete -> Delete a particular question
- [ ] GET -> /question/:id -> View a specific question with answers

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

- [ ] classId
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
