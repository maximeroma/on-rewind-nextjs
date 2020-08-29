import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

import EventItem from '../../components/EventItem'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import styles from '../../styles/EventPage.module.scss'

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
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
      Streams {
        id
        name
        url
      }
    }
  }
`

function EventPage() {
  const router = useRouter()
  const { id } = router.query

  const { loading, data } = useQuery(GET_EVENT, { variables: { id } })

  const goBack = () => router.push('/')

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <div className={styles.btn_container}>
        <Button onClick={goBack}>Go back</Button>
      </div>
      <EventItem item={data.event} />
      <div className={styles.list_stream_container}>
        {data.event.Streams.map((stream) => {
          return (
            <div key={stream.id} className={styles.stream_container}>
              <div className={styles.stream_name}>{stream.name}</div>
              <div className={styles.stream_box}>
                {stream.url ? (
                  <div>
                    <ReactPlayer
                      width="100%"
                      height="auto"
                      light
                      controls
                      url={stream.url}
                    />
                  </div>
                ) : (
                  <div className={styles.stream_not_found}>
                    Stream not available
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EventPage
