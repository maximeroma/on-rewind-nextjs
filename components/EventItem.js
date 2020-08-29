import React from 'react'
import { useRouter } from 'next/router'

import styles from './EventItem.module.scss'

function EventItem({ item }) {
  const router = useRouter()

  const goToEvent = () => router.push('/event/' + item.id)

  return (
    <div className={styles.container}>
      <div
        data-testid={`event-item-${item.id}`}
        onClick={goToEvent}
        className={styles.inner_container}
      >
        <div className={styles.thumbnail_container}>
          <img
            className={styles.video_img}
            alt={`thumbnail-${item.name}`}
            src={item.Video.poster ? item.Video.poster : '/fallback.png'}
          />
        </div>
        <div className={styles.info_container}>
          <div data-testid="event-name" className={styles.name}>
            {item.name}
          </div>
          <div className={styles.list_challenger_container}>
            {item.Challengers.map((challenger, idx) => {
              return (
                <div
                  key={challenger.id}
                  className={styles['challenger_container_' + idx]}
                >
                  <div
                    data-testid={`challenger-name-${challenger.name}`}
                    className={styles['challenger_name_' + idx]}
                  >
                    {challenger.name}
                  </div>
                  <div>
                    <img
                      className={styles.challenger_img}
                      alt={`challenger-${challenger.name}`}
                      src={
                        challenger.pictureUrl
                          ? challenger.pictureUrl
                          : '/logo512.png'
                      }
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.list_tag_container}>
            {item.Tags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  data-testid={`tag-${tag.name}`}
                  className={`${styles.tag_container} ${
                    styles['tag_' + tag.name]
                  }`}
                >
                  {tag.name.toUpperCase()}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventItem
