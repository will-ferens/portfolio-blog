---
path: "/tech-shelf-life-mvp"
date: "2018-09-06T21:53:27+00:00"
title: "The Process: Shelf Life"
---

Shelf Life is a reading list app that lets you track your progress with your reading list, add new books to your stack, and soon, discover new things to read based on what you love.

This has been a project I’ve wanted to build for a long time now. It’s something I’m passionate about and I think a lot of people would benefit from and enjoy using. As a lifelong reader, I’ve always felt a little disappointed by the apps designed for literature lovers. Looking at the options, they all fall short of the mark. Goodreads is a cluttered mess - while the community is large, and it boasts a ton of content, I was underwhelmed by the overall experience. At the end of the day, I may as well just be on Amazon. 

The App Store has a few choices for reading list apps that are mostly useful for storing ‘To Reads’ - books I hear about in conversation, or read about in some capacity whether that’s online or in print. They’re great when you walk into a bookstore, already armed with a few selections in mind. But those apps are somewhat one dimensional; you add something to the list, you mark it as currently reading or read, and that’s about it.

What I’ve always had in mind was an app that felt personal. Something that gave you what you wanted without knowing you wanted it in the first place. Something that could take the best elements of what is already out there and condenses them all down to a platform that’s natural and homey.

While it’s not quite there yet, I’ve started the long journey towards something just like that. The project started as a Swift app that, as of writing this, has absolutely no hope of making it onto the app store. A tangled mess of spaghetti code and errors, the first iteration of Shelf Life will always have a special place in my heart. But my ambitions for this project are a little bit bigger than a learning opportunity. 

# The Stack

So I started from square one this summer with an entirely different stack and a clean slate. On the frontend, I decided to use React with Redux for state management. React/Redux are some hot items on the tech scene at the moment, but that wasn’t the ruling factor in the decision. I went with the two because I wanted to see this project grow and evolve over time; managing state with Redux forces you to create actions that are readable, testable, and maintainable. One of the biggest problems I’ve faced while working on full stack projects by myself is coming back to code I’ve written in the past - if you get too far removed, you’ll run yourself in circles, doing work you’ve already done. Redux helps solve this in their architecture. Each action and reducer is siloed in its own file and once it’s in state, that’s it. Keeping only the components that need access to state separate from stateless ones also helps cut the fat down on your program.

On the backend, I picked Node.js as an API and MongoDB as the database. This was mostly for simplicity’s sake. I feel at home with JavaScript, and, after talking with an acquaintance who helped build HarperDB, that felt like the right choice. “If you’re looking to solve a problem, do it with something you’re familiar with,” he told me. Ultimately, I want to build a recommendation engine that will return a personalized list of books for each user. The team at HarperDB built the source code for their product in Node as well. It was because the language was one they were familiar and comfortable with - not because it compiled faster or had any technical weight over this or that other option. As it’s a NoSQL database, my choice of MongoDB may have to change down the road. Building data models with an ODM (Object Data Modeler) like Mongoose is fast and simple, but as the project grows in size and complexity, I know there will be more and more relationships to handle. That means writing actual joins rather than having Mongoose fudge them for me. But that’s an issue to deal with in iteration number three. At the moment, the stack serves my needs, it’s readable and writable, and most of all I want to work in the different techs I chose.

# The Process

The first thing I do before I write a single line of code is plan. That means breaking down the pieces of the project into digestible and sensible pieces. In the past, I’ve made the mistake of diving right into building features. It’s tempting to just get your hands dirty. I’m proactive, and I enjoy a little improvisation now and again, but skipping the whiteboard is a mistake I’ve made one too many times. I’ve drilled into a feature for a few hours only to realize I need to backtrack and build a route to service it, only for another necessity to crop up that requires I scrap blocks of code, and, before I know it, I’m in a bundle of errors that could of been avoided had I gone in with a solid blueprint, rather than a sledgehammer. 

I start planning by asking myself questions about the needs of my app, backend first. What are my data models? What should they include? Will there be relationships between them? How many routes will I need on my API? What will the responses look like? I knew I wanted a dedicated user model with protected routes, keeping profiles separate and private - so what will auth look like?

I write all these questions down, then start answering them one by one, doing preliminary research into questions I don’t know from the jump, taking lots of notes along the way. This helps me flesh out the architecture and, down the road, is a great place to refer to if I get stuck.

At the end of this process, the blueprint for my API looked like this:

1. Two data models: Books and Users 
2. Users would have a one to many relationship with Books (one user can have many books associated with their profile)
3. Users will have hashed passwords and JSON Web Tokens to verify their sessions
4. Users will have two routes: a POST route for new users and another POST route for current users logging in
5. Books will have full CRUD (Create, Read, Update, Delete) functionality
6. Update route will be for changing the `readState` of each book
7. The server will be spun up using the Express framework
8. Data Modeling will be done using Mongoose
9. Mlab will be used for data storage when launched
10. Heroku will host the server

After I have the backend hashed out, I start sketching a frontend. As a visual person, it helps to have a physical representation of the app in front of me. To understand the needs of the UI, the user is always a good place to start! To briefly walk through the minimal viable product of this iteration:

- Users will be able to sign up or login 
- Users will be able to see and inspect the books associated with their account
- Users will be able to update and delete books they have associated with their profiles
- Users will be able to search for new books
- Users will be able to add new books resulting from searches

From there, I start looking at component architecture. With Redux, this means deciding which pieces of my application are going to need access to state (containers) versus the stateless or functional components that simply return props or basic JSX. Containers are going to handle any user input, and will have Redux actions associated with them, whether they are async HTTP requests or clicking around the app. The original architecture inevitably changes with the evolving needs of the app, but it’s a great place to start.

This is the result of this step:

- Containers
    - Register form
    - Login form
    - User books item
    - Search bar
    - Search books item
    - ‘Selected’ book from either the user or search source
- Components
    - Header
    - Footer
    - Landing page
    - Search results list
    - User books list

With our architecture on both the front and backends laid out, we have the blueprint we need to start coding away! Stay tuned for my next piece on some of the technical challenges I ran into putting this project together and all the fun things I learned along the way. Then, further down the road, I’ll investigate how to implement a home cooked recommendation engine! It won’t be too mathy, I promise. You can see the project in process [here](http://shelf-life.surge.sh/). Later for now!