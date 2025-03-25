# ChatGPT clone app with Next.js
this is ChatGPT clone application with React / TypeScript / Next.js / Jotai / Firestore.

## Package version

 - React: 18.2.0
 - TypeScript: 5.8.2
 - Jotai: 2.12.2
 - Next.js: 14.2.25
 - Firebase JavaScript SDK: v9

last-updated: 2025-03-25

## Usage
### installation
to launch application locally,
```bash
pnpm install
pnpm dev
```

### additional

1. register and get API key to use ChatGPT to get chat response
2. register your application with Firebase to add Firebase Authentication to the app, and store chat messages history in Firestore

then `$ touch .env` file and fill it below.

```ini:.env
OPENAI_ENDPOINT=https://api.openai.com/v1/chat/completions
OPENAI_APIKEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
 
### hosting
not covered, so choose your favorite service.


## Ref
https://zenn.dev/shin_t_o_/articles/chatgpt-clone-app