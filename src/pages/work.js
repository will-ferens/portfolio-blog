import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import * as Global from "../constants/globalStyles"

const Work = () => (
  <Layout>
    <SEO title="Work" />
    <Global.Container>
      <Global.ContainerItem>
        <h1>Work</h1>
        <p>
          Currently, Will works at{" "}
          <Global.CtaAnchorTag href="https://evolve.com/">
           Evolve Vacation Rentals
          </Global.CtaAnchorTag>{" "}
          as a Node.js engineer. 
          Using an AWS serverless architecture, he ensures all the listings are insync and up to date across all Evolve partners like AirBnB, Vrbo, and others. 
          He also builds in house solutions to make the technology team’s life easier.
        </p>
        <p>
        Previously, Will worked at {" "}
          <Global.CtaAnchorTag href="https://searchspring.com/">
           Searchspring
          </Global.CtaAnchorTag>{" "} - a search and merchandising solution for Ecommerce sites. 
          As an Implementations Engineer, he worked with sales, customer success, engineering, and directly with clients to provide solutions to problems that arise during integration onto their shopping platform. 
          Will worked there for three years. 
        </p>
        <p>On the rest of his site, he writes in the first person.</p>
      </Global.ContainerItem>
    </Global.Container>
  </Layout>
)

export default Work
