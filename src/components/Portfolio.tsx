// import { jsx } from '@emotion/react'
import React from 'react'
import { Portfolio as PortfolioConstant } from '../content/constants'

// HACK: this should be normalized inside a redux, using reselect or something like that
import { normalize, schema } from 'normalizr'

const portfolioItem = new schema.Entity('portfolioItems')

// HACK: END HACK

const Portfolio = (): JSX.Element => {

  console.log('REGULAR PORTFOLIO ==>', PortfolioConstant.items)

  return (
    <div>
      <ul>
        {/* {Gallery.items} */}
      </ul>
    </div>
  )
}

export default Portfolio
