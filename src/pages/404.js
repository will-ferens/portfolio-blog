import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import * as Global from "../constants/globalStyles"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Global.Container>
      <Global.ContainerItem>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Global.ContainerItem>
    </Global.Container>
  </Layout>
)

export default NotFoundPage
