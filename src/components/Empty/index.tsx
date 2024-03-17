import { Empty as EmptyComponent } from 'antd'
import React, { ReactNode } from 'react'

import { variables } from './../../utils/variables'

type Props = {
  /** Customize description */
  description?: ReactNode
  /** Choose type image empty */
  simple?: boolean
}

const { PRESENTED_IMAGE_SIMPLE, PRESENTED_IMAGE_DEFAULT } = EmptyComponent

const Empty = ({ description = variables.EMPTY_DATA_TEXT, simple }: Props) => {
  const image = simple ? PRESENTED_IMAGE_SIMPLE : PRESENTED_IMAGE_DEFAULT

  return <EmptyComponent description={description} image={image} />
}

export default Empty
