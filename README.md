# Gitlab backup all your repositories

Get a personal token: https://gitlab.com/profile/personal_access_tokens

Create a file `token.json` with the structure

```javascript
{
"token": "YOUR_GITLAB_TOKEN",
"server": "gitlab.com",
"user": "YOUR_GITLAB_USERNAME"
}
```

Run the following commands

```javascript
npm install
npm start
```

Default will download all the repositories of a given user  
To get ALL the repos from server _(useful only for your own gitlab server)_,  
change it:

```sh
`https://${server}/api/v4/users/${gituser}/projects?per_page=100&page=${page}`,
```

to

```sh
`https://${server}/api/v4/projects?per_page=100&page=${page}`,
```
