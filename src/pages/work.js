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
          <Global.CtaAnchorTag href="https://searchspring.com/">
            Searchspring
          </Global.CtaAnchorTag>{" "}
          - a search and merchandising solution for Ecommerce sites. As an
          Implementations Engineer, he works with sales, customer success,
          engineering, and directly with clients to provide intuitive and well
          designed solutions to problems that arise during integration onto
          their shopping platform. Will’s been there for two and a half years.
        </p>
        <p>
          Will’s work is used by thousands of shoppers every day and can be seen
          on sites such as{" "}
          <Global.CtaAnchorTag href="https://volcom.com">
            Volcom
          </Global.CtaAnchorTag>{" "}
          and{" "}
          <Global.CtaAnchorTag href="https://ruggable.com/">
            Ruggable
          </Global.CtaAnchorTag>
          .{" "}
        </p>
        <p>On the rest of his site, he writes in the first person.</p>
      </Global.ContainerItem>
    </Global.Container>
  </Layout>
)

export default Work
