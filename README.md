#URL Shortener Microservice
FreeCodeCamp API Basejump

##### User stories:
- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.

##### Example creation usage:
```
https://stn.herokuapp.com/new/http://google.co.th
```

##### Example creation output

```
{ "original_url":"http://google.co.th", "short_url":"https://stn.herokuapp.com/B1Js5gn0" }
```

##### Usage:

```
https://stn.herokuapp.com/B1Js5gn0
```

##### Will redirect to:
```
http://google.co.th/
```
