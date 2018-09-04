---
path: "/tech-rundown-blog"
date: "2018-07-16T17:12:33.962Z"
title: "The Rundown: Gatsby JS"
---

Over the past few months, I’ve grown tired of my [old personal site](http://will-ferens.surge.sh/) - it’s a bit overworked, extremely slow, hosted on a free static publishing site (without a fancy .com), and the code is downright messy. I built it a while ago and it's no longer representative of what I can do. So I blocked off some time to start from scratch on something new. I knew I wanted a blog, not only to prove that I could build one, but also to keep closer track of my coding processes and establish a better web presence. #goals.

Of course, there are a ton of ways I could have gone about building it. The first and most obvious way (for a full stack dev like myself) would be to spin up an API to serve my posts, a database to store them, and a fresh React app to display them. This isn’t a bad option - I love building from scratch and architecting everything from start to finish. 

But one of the major reasons I wanted to build a new site was speed - no hate on Heroku, my cloud application platform of choice, but it takes a few seconds to wake up every time it’s called. Not an ideal user experience. 

Another way would be to use Wordpress. Even though it’s not exactly sexy, the CMS still powers [30% of all websites](https://venturebeat.com/2018/03/05/wordpress-now-powers-30-of-websites/) - and that valuable experience isn’t going anywhere. But this route still felt a little restrictive, not to mention somewhat… *ahem*. Dated. 

So I landed on Gatsby JS - a Static Site Generator, or SSG, that uses React component architecture to serve static html pages on the initial query. A static page (rather than a dynamic one) does suffer from a few drawbacks - it can’t offer real time content nor take in user input. But for the purpose of hosting a blog with a few showcased projects, it’ll do just fine.

# Gatsby JS and GraphQL

We already covered what Gatsby JS is, but what can it do for us? Well first of all: damn is it **_fast_**. And that’s important! Doubleclick, a digital advertising firm by Google, found that [53% of mobile sites are abandoned](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) if they don’t load within 5 seconds. Sheesh! Are we spoiled or what? Doesn’t anyone remember flip phones?? 

The story wouldn’t be complete without GraphQL, the query language (hence the QL) that Gatsby uses to pull all of its data. GraphQL offers an alternative to [RESTful](https://en.wikipedia.org/wiki/GraphQL) architecture and allows the client to structure the data required. This lets our user grab only what they need at runtime, preventing lots of useless data from being tossed back and forth. Oh and we can pull data from anywhere we want - including Wordpress! 

In addition, SSG’s are growing in popularity - they’re part of the JAM tech stack that’s elbowing it’s way to the grown up tech stack table. What’s the JAMstack? It stands for JavaScript, API, and Markup. The JAMstack’s guiding philosophy is to let the client do the work - the JavaScript does the heavy lifting by calling destructured and reusable API’s on the backend, while the displayed markup is templated and prebuilt at deploy time. All of this cuts down on calls made to the server, and ultimately delivers faster results, higher security, and cheaper scalability. What’s not to like?

# Conclusion

Overall, switching my personal site to Gatsby JS has been lots of fun and edifying - I learned a little something about GraphQL, Static Site Generators, styling CSS in JS, and functional programing. Check back for a more in depth breakdown of my process (with plenty of code!).

Until next time, nerds!
