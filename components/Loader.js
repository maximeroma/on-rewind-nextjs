import React from 'react'
import styles from './Loader.module.scss'
import { Dot } from 'react-animated-dots'

function Loader(props) {
  return (
    <div className={styles.container}>
      <div>
        <Dot>.</Dot>
        <Dot>.</Dot>
        <Dot>.</Dot>
        <Dot>.</Dot>
        <Dot>.</Dot>
      </div>
    </div>
  )
}

export default Loader
