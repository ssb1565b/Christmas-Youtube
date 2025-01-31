'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { handleSignOut } from '@/utils/apiRequest/signUserSupabase'
import styles from './header.module.scss'
import { fetchSession } from '@/utils/apiRequest/profileApiRequest'

interface IProps {
  closeMenu: () => void
  modalRef: React.MutableRefObject<null>
  onClickOutside?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const MainMenu = ({ closeMenu, modalRef, onClickOutside }: IProps) => {
  const [isLogin, setIsLogin] = useState(false)
  const setLoginMenu = async () => {
    const session = await fetchSession()
    if (session) setIsLogin(true)
    else setIsLogin(false)
  }

  useEffect(() => {
    setLoginMenu()
  }, [])
  return (
    <div
      className={styles.dropDownWrap}
      ref={modalRef}
      onClick={onClickOutside}
    >
      <div className={styles.dropDownMenu}>
        <ul className="inner-box">
          <li style={{ backgroundColor: '#FEFFD9' }} onClick={closeMenu}>
            <Link href="/#counter">
              <figure>
                <img src="/assets/calendar.png" alt="" />
              </figure>
              <p>카운트다운</p>
            </Link>
          </li>
          <li style={{ backgroundColor: '#5EC63A' }} onClick={closeMenu}>
            <Link href="/#streaming">
              <figure>
                <img src="/assets/bell.png" alt="" />
              </figure>
              <p>라이브</p>
            </Link>
          </li>
          <li style={{ backgroundColor: '#FFA132' }} onClick={closeMenu}>
            <Link href="/#slot">
              <figure>
                <img src="/assets/slot-arrow.png" alt="" />
              </figure>
              <p>랜덤 슬롯</p>
            </Link>
          </li>
          <li style={{ backgroundColor: '#FB6B2D' }} onClick={closeMenu}>
            <Link href="/#survey">
              <figure>
                <img src="/assets/gift.png" alt="" />
              </figure>
              <p>설문조사</p>
            </Link>
          </li>
          <li style={{ backgroundColor: '#FB2D38' }} onClick={closeMenu}>
            <Link href="/meetup">
              <figure>
                <img src="/assets/candles.png" alt="" />
              </figure>
              <p>촛불 모임</p>
            </Link>
          </li>
          <li style={{ backgroundColor: '#FFF' }} onClick={closeMenu}>
            <Link href="/developers">
              <figure>
                <img src="/assets/sledge.png" alt="" />
              </figure>
              <p>개발자</p>
            </Link>
          </li>
          <li style={{ backgroundColor: '#F3FFAC' }} onClick={closeMenu}>
            <Link href={isLogin ? '/' : '/signIn'}>
              <figure>
                <img src="/assets/sock.png" alt="" />
              </figure>
              <p>{isLogin ? '프로필' : '로그인'}</p>
            </Link>
          </li>
          {isLogin ? (
            <li
              style={{ backgroundColor: '#0E6B1D' }}
              onClick={() => {
                closeMenu()
                handleSignOut()
              }}
            >
              <Link href="/">
                <figure>
                  <img src="/assets/stuckedSanta.png" alt="" />
                </figure>
                <p>로그아웃</p>
              </Link>
            </li>
          ) : (
            <li
              style={{ backgroundColor: '#0E6B1D' }}
              onClick={() => {
                closeMenu()
              }}
            >
              <Link href="/signUp">
                <figure>
                  <img src="/assets/stuckedSanta.png" alt="" />
                </figure>
                <p>회원가입</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default MainMenu
