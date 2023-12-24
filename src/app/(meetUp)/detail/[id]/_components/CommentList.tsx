'use client'

import React, { useState, useEffect } from 'react'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import Image from 'next/image'
import { getComments } from '@/utils/apiRequest/commentsApiRequest'
import { Tables } from '@/type/supabase'
import styles from '../detail.module.scss'
import CreateComment from './CreateComment'
import Comment from './Comment'
import { getProfileByEmail } from '@/utils/apiRequest/profileApiRequest'

type TCommnets = Tables<'comments'>

const CommentList = ({ getVideoId }: { getVideoId: string }) => {
  const profiles = [santa, snowman, candle, cookie]
  const [comments, setComments] = useState<TCommnets[]>([])
  const [userProfile, setUserProfile] = useState<number>(0)

  const fetchComments = async (): Promise<void> => {
    const totalComments: TCommnets[] = await getComments(getVideoId)
    if (totalComments) {
      setComments(totalComments)
    }
  }
  const fetchUser = async (): Promise<void> => {
    const userData: Tables<'profiles'> = await getProfileByEmail()
    setUserProfile(userData?.profile_img!)
  }
  useEffect(() => {
    fetchUser()
    fetchComments()
  }, [])

  return (
    <div className={styles.comments}>
      <p>댓글 {comments.length}개</p>
      <div className={styles.inputComments}>
        <Image src={profiles[userProfile]} alt="프로필 이미지" />
        <CreateComment profile={userProfile} fetchComments={fetchComments} />
      </div>
      {comments.length !== 0 &&
        comments.map((el: TCommnets) => {
          return (
            <Comment key={el.id} comment={el} fetchComments={fetchComments} />
          )
        })}
    </div>
  )
}

export default CommentList
