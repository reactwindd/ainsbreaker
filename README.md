# AINS(Advance Intergrated Nilam System) Breaker

> This is only made for educational and research purposes.
> and not meant to be exploited.

## Requests

```
GET /api/getid
```
```
GET /api/getbook
```
```
GET /api/insertrecord
```

All requests above requires a token sent in the HTTP Headers as Parameters
```
Authorization: Bearer <token>
```

## Responses

```
0001
```
```
{
  "data": {
    "user": number,
    "type": "book",
    "date": string,
    "title": string,
    "bookType": "physical",
    "category": "fiction",
    "noOfPage": number,
    "isbn": string,
    "author": string,
    "publisher": string,
    "publishedYear": string,
    "language": "en",
    "summary": string,
    "review": "It's Really Good",
    "rating": 5,
    "reviewIsVideo": false
  }
}
```

## Frequently Asked Question
Q: When trying to access the api endpoints `"error": "Unauthorized"` pop up, what did I missed? <br>
A: You are required to use the access token of your AINS account. When sending a request to the api endpoints, include a field under the name of ***Authorization*** and put the token as the value in the ***Request Header***.

Q: How do I find my AINS access token? <br>
A: Open up the developer console and navigate to the ***Network*** tab, find a request under the name of ***me*** and click on it. A sidebar will open up, navigate to ***Headers*** and expand ***Request Headers***. Find the the value under the name of ***Authorization***. Copy it and there you have it! (Including ***Bearer***)

