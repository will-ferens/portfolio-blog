---
date: 2026.05.01
title: Software Engineering Has Not Changed
tags: [ENGINEERING, THOUGHTS, AI]
reading: 5 min read
---

All the way back in 2023, I participated in a company wide hackathon, just as large language models were starting to become publicly accessible. At that point, most people hadn’t really interacted with the technology yet. I wired our company's search bar into the model and built a prototype that let users query internal information conversationally.

It was a vacation rental app. So rather than search for '2 bedroom San Francisco', you could write a sentence like 'Recommend me a property that would be great for a romantic get away in San Francisco'. ChatGPT would churn for a while then present you with some options as well as a reason why these properties came back. 

It wasn't very good. It was slow. The results were all over the place. Often, the results were not even in the city for which the user was searching. Nobody was particularly impressed. But I was charmed, at the very least. ChatGPT became my go to rubber ducky coding assistant. Pasting error messages, asking it to print out simple and tedious mapping functions that I could be reasonably confident in, and of course [generally abusing it](https://news.ycombinator.com/item?id=35630801) - was enough for me to keep my eye on it and wonder how the technology might impact my role and field.

Fast forward a few years and AI-assisted development is everywhere. Code generation is dramatically faster than it used to be. Entire interfaces can be scaffolded in minutes. Hype is off the charts. Claims that 'the paradigm' has shifted abound. The oft-repeated phrase is that 'code is cheap'. All the rules need to be rewritten, right?

But after spending real time building production systems alongside these tools, it's clear to me that software engineering has not fundamentally changed.

Code can't manage itself. The output that you receive from these models is only as good as the context you give. And producing good context requires understanding the problem itself: asking the right questions, identifying tradeoffs, understanding edge cases, leveraging existing patterns, and knowing when new abstractions are actually warranted... you know, engineering.

If anything, AI has amplified the importance of good engineering fundamentals. Bad code remains as consequential and expensive as ever. Generating code was never the hard part of software engineering. Understanding what should exist (and why) is the hard part.

I suspect the engineers who thrive in the next decade will not necessarily be the  most prolific code generators. They’ll be the people who can guide powerful tools toward solving the correct problems in sustainable ways. And as far as I can see that will require communication, understanding, and curiosity; these skills are only becoming more valuable, not less.