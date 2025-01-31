'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  fetchSession,
  getProfile,
  updateProfile,
} from '@/utils/apiRequest/profileApiRequest'
import { TProfiles } from '@/type/SupabaseResponse'
import styles from './header.module.scss'

const Profile = ({
  setShowProfile,
}: {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [currentImg, setCurrentImg] = useState<number>(0)
  const userData = useRef<TProfiles>()
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const profileImages = ['santa', 'snowman', 'candle', 'cookie']

  useEffect(() => {
    const fetchData = async () => {
      const session = await fetchSession()
      const profile: TProfiles[] = await getProfile(
        'email',
        session!.user.email!,
      )
      if (!profile.length) {
        alert('오류가 발생했습니다!')
        return
      }

      userData.current = profile[0]!
      setCurrentImg(profile[0].profile_img!)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // 프로필 모달 외부 클릭시 창 종료하는 이벤트
    const closeProfile = (e: MouseEvent) => {
      if (
        !(e.target as Element).closest('.profile') &&
        !(e.target as Element).closest('.accountProfileBtn')
      ) {
        setShowProfile(prevShowProfile => !prevShowProfile)
      }
    }
    document.addEventListener('mousedown', closeProfile)
    return () => {
      // 컴포넌트 언마운트 시 이벤트 제거
      document.removeEventListener('mousedown', closeProfile)
    }
  })

  const validateUpdateProfileData = () => {
    const REGEX = /^[a-zA-Z가-힣0-9]{1,8}$/
    if (!REGEX.test(inputRef.current!.value)) {
      alert('닉네임을 특수문자 제외 8글자 이하로 입력해주세요')
      return false
    }

    if (
      userData.current!.user_name === inputRef.current!.value &&
      userData.current!.profile_img === currentImg
    ) {
      alert('프로필 변경 내역이 없습니다')
      return false
    }
    return true
  }

  const handleUserProfile = async () => {
    if (isEditMode && inputRef.current && userData.current) {
      if (!validateUpdateProfileData()) return
      const data = {
        id: userData.current.id,
        profile_img: currentImg,
        user_name: inputRef.current.value,
      }
      try {
        await updateProfile(data)
        userData.current = { ...userData.current, ...data }
      } catch (error) {
        if (error instanceof Error) alert(error.message)
        return
      }
    }
    setIsEditMode(!isEditMode)
  }

  return (
    userData.current && (
      <div ref={modalRef} className={`${styles.profile} profile`}>
        <div className={styles.profileImgBox}>
          {isEditMode && (
            <button
              type="button"
              onClick={() => setCurrentImg(prev => (prev === 0 ? 3 : prev - 1))}
            >
              <img src="/assets/profile-btn.svg" alt="" />
            </button>
          )}
          <img
            className={styles.myProfileImg}
            src={`/assets/profile-${profileImages[currentImg]}.svg`}
            alt=""
          />
          {isEditMode && (
            <button
              type="button"
              onClick={() => setCurrentImg(prev => (prev === 3 ? 0 : prev + 1))}
            >
              <img src="/assets/profile-btn.svg" alt="" />
            </button>
          )}
        </div>
        <div className={styles.userInfo}>
          {isEditMode ? (
            <p>
              <input
                ref={inputRef}
                defaultValue={userData.current.user_name!}
                placeholder={userData.current.user_name!}
              />
            </p>
          ) : (
            <p>{userData.current.user_name}</p>
          )}
          <p>{userData.current.email}</p>

          {isEditMode ? (
            <div className={styles.editModeBtn}>
              <p onClick={() => handleUserProfile()}>수정 완료</p>
              <p
                onClick={() => {
                  setIsEditMode(!isEditMode)
                  setCurrentImg(userData.current?.profile_img as number)
                }}
              >
                취소
              </p>
            </div>
          ) : (
            <p
              className={styles.notEditModeBtn}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              프로필 수정
            </p>
          )}
        </div>
      </div>
    )
  )
}

export default Profile
