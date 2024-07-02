# HASHSTACK ASSIGNMENT

### PRE REQUISITES

-   Node (v21.6.2^ ideal)
-   npm (v10.2.4)
-   mongoDB ( set uri in env according to testing.env )

### INSTALLATION

-   `npm i`
-   `npm run build`
-   `npm start`

### BASIC FLOW

-   On successful server start, admin details is migrated.
-   Users can be created through `POST: /user/createUser`. Required keys are `mobile: XXXXXXXXXX, username: abcxyz,password: XXXXXXXXXX`.
-   Users can login via `POST: /user/login`. Required keys are `mobile: XXXXXXXXXX, password: XXXXXXXXXX`.
-   Users can view their own details using `GET: /user/getUser`.
-   Admin can login via `POST: /user/login` with admin credentails `mobile: 1234567890, password: password`.
-   Admin can view user details by mobile in `GET: /admin/doGetUser?mobile=XXXXXXXXXX`.

### Authentication

For routes like `/user/getUser` and `/admin/doGetUser` we need to pass `session_key` in header as received on time of login/signup.

## FAQs

### How does session invalidation work?

> Once a user logs in, we push device details alongwith epoch timestamp to their corresponding record in Db. The `session_key` obtained as response can be used for subsequent APIs until a new log in has been done for same user account. At this time the new `session_key` obtained is made `activeSession` in DB and all older sessions_keys if found with request headers are invalidated.

### How are user and admin roles specified?

> Roles are specified at the time of creation, signup assigns User role (enum: 1). While admin migration assigns admin role (enum: 2)
