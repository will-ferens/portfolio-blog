---
slug: "/blog/creating-my-book-log"
date: "2021-04-10T21:53:27+00:00"
title: "Creating my book log"
---

When quarantine started early last year, I thought to myself, 'Well at least I'll get some reading done.' And I did. For a little while, I chewed through a few books that were on my list as canceled plans stacked up and restaurants shuttered their doors. But as weeks turned into months, the pandemic showed little sign of abating. Grouped with an ugly presidential campaign, mass social unrest, and a questionable economic situation, I soon found myself turning towards distractions like video games and TV rather than books. These were places where I could turn off my brain rather than opening it up.

But I'm a reader. I always have been. Letting the hours slip into the next big game title or the show of the moment (looking at you _Tiger King_ and _Love is Blind_) soon left me dissatisfied.

When I was in college, I hit a highwater mark for my reading. Flying through a book or two a week, I read indiscriminately. Philosophy, literary fiction, poetry, sci fi, classics, the latest blockbusters - they were all picked up with as much interest as the last finished title. But reading is a muscle; if you don't work it out, your endurance wanes.

Life is hard. Letting the Netflix autoplay feature roll on is objectively easier than reading the next chapter of _The Brothers Karamazov_.

So I started to ask myself: how could I find my stride again? I'd have to keep myself honest. And in order to ensure I was improving, I'd have to track my reading. So I carved out a section of my website to record my books and reignite my passion.

### The Project

To show my progress over time, I wanted each year to have its own section. Furthermore, I wanted each book to have its own page with a rating, some information about the book, and a little bit about my own impressions on the reading experience.

In order to achieve this, I'd need a place to store all the books. Somewhere easy to query and update. Enter Google Sheets.

### Spreadsheet

I know, I know. [Thou shall not use a spreadsheet as a database](https://medium.com/@eric_koleda/why-you-shouldnt-use-google-sheets-as-a-database-55958ea85d17). But none of this info is exactly sensitive. And as much as I'd like to, I doubt I'll bust the Google Sheets limit of 5 million cells in books read - at least not in this lifetime. So I think the convenience and speed in development outweigh any negatives.

My spreadsheet has a few columns with book info like title, author, publication year, pages, dates started and finished, genres, author gender and ethnicity, and my own review. Simple enough. If I ever want another field, I can always backfill the spreadsheet and easily see which entries need to be completed.

Creating a spreadsheet, making it public to the web, and enabling it as an API is gloriously simple, as far as diving into the labyrinthian Google Cloud Platform goes. Once we have our keys, and our spreadsheet is public, the next step is plugging in the correct settings in `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-google-spreadsheets",
      options: {
        spreadsheetId: process.env.SPREADSHEET_ID,
        apiKey: process.env.GOOGLE_API_KEY,
        credentials: {
          type: "service_account",
          project_id: process.env.PROJECT_ID,
          private_key_id: process.env.PRIVATE_KEY_ID,
          private_key: process.env.PRIVATE_KEY,
          client_email: process.env.CLIENT_EMAIL,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
        },
      },
    },
  ],
}
```

## Creating pages

Once that's done, all that's left is to query the Sheets doc in our `gatsby-node.js` file at runtime. But since I wanted each individual entry to have its own page, we'll need to leverage Gatsby's built in `createPages` API. This will programatically create a page for each book in our spreadsheet, just like it's doing for this blog post:

```js
const kebabCase = require("lodash.kebabcase")

//Create Blog Post pages, create Book pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const bookTemplate = require.resolve(`./src/templates/bookTemplate.js`)
  const result = await graphql(`
    {
      allGoogleSheet1Sheet {
        edges {
          node {
            id
            title
            author
            genres
            pages
            blurb
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Whoops! GraphQL query errored out :(`)
    return
  }

  result.data.allGoogleSheet1Sheet.edges.forEach(({ node }) => {
    let bookSlug = `/books/${kebabCase(node.title)}`
    createPage({
      path: bookSlug,
      component: bookTemplate,
      context: {
        title: node.title,
      },
    })
  })
}
```

Here, I'm querying our sheet with a list of fields (columns, in this case), using a template to create a page for each book, and handling any errors (probably in the least productive way possible, but it's just me here 🙃 ). Oh - also I'm using lodash's `kebabCase` function to create a URL friendly slug for each book so titles look like `this-in-the` url.

### Display

Here's a quick walk through the basic component architecture of this feature:

First we have the parental page component. Gatsby creates a route and page for any file in the `pages/` directory. I've created a `books.js` file that contains a GraphQL query for our book data and creates a div for each year in books:

```js
const Books = ({ data }) => {
  let books = data.allGoogleSheet1Sheet.nodes

  return (
    <Layout>
      <GridContainer>
        {Object.entries(booksObj).map(([key, value]) => (
          <Global.ContainerItem key={key}>
            <Global.Heading1>
              {key != "undefined" ? key : "Currently Reading"}
            </Global.Heading1>
            <BookGrid books={value} />
          </Global.ContainerItem>
        ))}
      </GridContainer>
    </Layout>
  )
}

export const booksQuery = graphql`
  query allBooksQuery {
    allGoogleSheet1Sheet(sort: { fields: started }) {
      nodes {
        id
        author
        title
        completed
        rating
        genres
        optimizedCoverImage {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
```

Left out above are some functions to reorganize our data. I'm grouping books by year, and using that year as the key. This is also used to declare a 'Currently Reading' book, since any book I'm still working on will not have a year associated with it. Not entirely best practice, since keys should be a tad bit more unique, but I don't think we'll be living through another 2020 any time soon. I hope.

I'm using [Emotion](https://emotion.sh/) for styled components. This is by far the best CSS in JS library I've toyed with. It's flexible, allowing you to declare your styles in actual CSS. Most of my larger components have dedicated files, but here I was able to re-use a global container, global items, and a unique component for the book grid. This component is simple enough:

```js
<Styled.BookGrid>
  {books.map(book => (
    <Link css={linkStyle} key={book.id} to={`/books/${kebabCase(book.title)}/`}>
      <Img
        fluid={{
          ...book.optimizedCoverImage.childImageSharp.fluid,
        }}
      />
    </Link>
  ))}
</Styled.BookGrid>
```

This component also coincidentally makes use of one of the biggest features Gatsby has on Next.js - optimized images. Gatsby automatically creates multiple thumbnails, compression and lazy loading already cooked in. Just one plug-in away.

### The book page

Finally, we drill down to each individual book page. This is a simple component with styled components showing our cover image, title, author, genre, and rating. I created another child component for ratings, since there was a little bit of math involved for the star SVG's displayed. Making clever use (if I dare say so myself) of the `<linearGradient>` element, I found the remainder of my rating and filled in the last star with its corresponding percentage:

```js
let rating = props.rating
let fullRating = Math.floor(rating / 1)
let remainder = parseFloat(rating - fullRating).toFixed(2) * 100
let ratingArray = []

for (let i = 0; i < fullRating; i++) {
  let obj = { percentage: "99%", fill: "url(#99%)" }
  ratingArray.push(obj)
}

if (remainder > 0) {
  let obj = { percentage: "50%", fill: "url(#50%)" }
  ratingArray.push(obj)
}

const Star = props => (
  <svg viewBox="0 -10 511 511" height={16} width={16}>
    <defs>
      <linearGradient
        id={props.star.percentage}
        x1={props.star.percentage}
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="1%" stopColor="#3C3880" stopOpacity="1" />
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path d={ICONS.STAR} fill={props.star.fill}></path>
  </svg>
)

return (
  <div>
    {ratingArray.map(star => (
      <Star star={star} />
    ))}
  </div>
)
```

This allows me to give half stars to books - the value 50% is hardcoded here, but I don't feel the need to get [any more arbitrary](https://pitchfork.com/reviews/albums/1538-a-rush-of-blood-to-the-head/) than that.

### Future plans

This was a fun weekend project that [I've kept up with](/books) since its inception in October last year. I'm now constantly thinking about what I'm reading and what I might say about it and why, which was the intended goal. As you can see, I'm at 5 books read on the year. If I keep that pace going, I'll beat out my previous year by about 5. Resounding success.

Down the road, I'd like to create some charts that show in more detail my reading habits. Pages read in a month, genre breakdown, author diversity - these can all give me a better picture of what I'm reading and where I can improve.

On top of that, it'd be nice to have a link to an independent bookstore that carries the reviewed book, and maybe even a wider consensus of what people are saying about it. [Book Marks](https://bookmarks.reviews/) is a review aggregator that's ubiquitous on the literary side of the web.

But for now, I'm happy with the feature and always look forward to adding another book to my spreadsheet. Thoughts on a new feature? Constructive criticism? Want to talk about a book I read? Feel free to drop me a line <will.ferens@gmail.com> .

Cheers!
