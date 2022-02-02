# Flat Out Api (FOA)

The FOA is the backend Web Api service for the Flat Out Management application(s).

---

## Environment

| Environment Variables | Utilized Tools and Links                                                               |
|-----------------------|----------------------------------------------------------------------------------------|
| Languages             | [NodeJS](https://nodejs.org/en/about/) + [TypeScript](https://www.typescriptlang.org/) |
| Cloud Services        | [Heroku](https://www.heroku.com/what) + [MongoDB](https://www.mongodb.com/)            |

---

## API Calls and Contracts

### Responses:

All responses follow the contract outlined below. `item` is the value of the item requested (if applicable), and
`msg` is the message that associates with the response. A `400` message might be 'Provided unknown user id'.

```typescript
interface response {
    item?: any,
    msg: string
}
```

### User:

**Header**:

```http request
POST /post/user/create
Content-Type: application/json
```

**Body**:

```json
{
}
```