import React from 'react'
import styles from './Button.module.scss'

function Button({ children, onClick }) {
  return (
    <div onClick={onClick}>
      <a className={styles.button} target="_blank" rel="nofollow noopener">
        {children}
      </a>
    </div>
  )
}

export default Button
