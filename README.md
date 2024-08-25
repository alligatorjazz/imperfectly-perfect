# Imperfectly Perfect (ip.btw)

A clone of the basic functionality of the [Perfectly Imperfect](https://www.pi.fyi) site. For demonstration purposes only.

Some things to note:
- You can't actually login with your real Perfectly Imperfect account here - make a new (fake) one using the app's signup.
- The only difference between the "Home" and "Everyone" feeds is that "Home" will filter out re-recs.
- Some of the dummy posts have links attached. The urls are valid, but the links don't actually go anywhere - they're just for demonstration.
- The posts are made up of dummy copy, but they are *real* in the sense that they're actually being fetched from a remote database and not being generated client-side. You can see the script I used to generate them in the root folder - it's `/populate.js`. Respectively, I generated:
  - 200 user profiles
  - 5000 posts, with dates spanning the last 10 years

## Stack

### Frontend
- **React**
- **Next.js**
### Backend
- **Supabase**
### Other
- Initial database generated using faker.js.

## Features
- User authentication & profiles.
- Posts that support links, emoji tags, and images.
- Re-recommendations.
- The "Home" and "Everyone" feeds.
- Modifiable user and display names.
- Deleting (your own) posts.
- Infinite scrolling. 


## Demo
[https://imperfectly-perfect.vercel.app](https://imperfectly-perfect.vercel.app)
