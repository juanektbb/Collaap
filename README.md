# COLLAAP

### SESSION CONFIG
There are 3 variables to look at:
* session_status: STRING or NULL,
* session_error: STRING or NULL,
* session_token: STRING or NULL

##### SESSION_STATUS VALUES
* `session_status: null` - User has not logged in yet
```
session_error: null
session_token: null
``` 

* `session_status: 'error'` - An error happened, like wrong password or unable to load keychain details
```
session_error: response['msg'],
session_token: null
```

* `session_status: 'loading'` -  The application is making a request
```
session_error: null
session_token: null
```

###### SUCCESS Force Status: `session_status: forced_status` 
```
session_error: null
session_token: 'Token String'
```

With values

* `obtained` - User was logged in automatically when app loaded
* `clicked` - User click to log in
* `collaap` - Automatically changes at 8s for better text in profile page

