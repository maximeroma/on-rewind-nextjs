import React, { useEffect, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'

import styles from './HomePage.module.scss'
import EventItem from '../components/EventItem'
import Loader from '../components/Loader'
import Button from '../components/Button'
import useScroll from '../hooks/useScroll'

const ALL_EVENTS = gql`
  query AllEvents($after: String) {
    allEvents(tags: "vod", limit: 10, after: $after) {
      items {
        id
        name
        Video {
          poster
        }
        Challengers {
          id
          name
          pictureUrl
        }
        Tags {
          id
          name
        }
      }
      cursor {
        after
      }
    }
  }
`

function HomePage() {
  const { loading, data, fetchMore } = useQuery(ALL_EVENTS, {
    notifyOnNetworkStatusChange: true
  })

  const cursor = useRef(null)

  const { isAtBottom, isAtTop, goTop } = useScroll({ isWindow: true })

  useEffect(() => {
    if (
      isAtBottom &&
      data &&
      data.allEvents.cursor.after !== null &&
      data.allEvents.cursor.after !== cursor.current
    ) {
      fetchMore({
        variables: {
          tags: 'vod',
          limit: 10,
          after: data.allEvents.cursor.after
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return Object.assign({}, prev, {
            allEvents: {
              items: [
                ...prev.allEvents.items,
                ...fetchMoreResult.allEvents.items
              ],
              cursor: { after: fetchMoreResult.allEvents.cursor.after }
            }
          })
        }
      })

      cursor.current = data.allEvents.cursor.after
    }
  }, [isAtBottom])

  return (
    <>
      <div className={styles.list_item}>
        {(data ? data.allEvents.items : []).map((item) => {
          return <EventItem key={item.id} item={item} />
        })}
        {!isAtTop && (
          <div className={styles.btn_container}>
            <div className={styles.btn_inner_container}>
              <Button onClick={goTop}>Go to top</Button>
            </div>
          </div>
        )}
      </div>
      {loading && <Loader />}
    </>
  )
}

export default HomePage
