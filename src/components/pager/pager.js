import React from "react"
import { Link } from "gatsby"

import * as Global from "../../constants/globalStyles"

const Pager = ({ pageContext }) => {
  console.log(pageContext)
  const { previousPagePath, nextPagePath } = pageContext
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {previousPagePath && (
          <Link to={previousPagePath}>
            <Global.Button>← Newer Posts</Global.Button>
          </Link>
        )}
      </div>

      <div style={{ justifySelf: "flex-end" }}>
        {nextPagePath && (
          <Link to={nextPagePath}>
            <Global.Button>Older Posts →</Global.Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Pager
