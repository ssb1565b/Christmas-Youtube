'use client'

import React from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      alert('로그인 완료. 반갑습니다!')
      router.refresh()
      router.push('/')
    } catch (error) {
      alert(
        '[ERROR]\n로그인 실패\n이메일이나 비밀번호가 잘못되었습니다. 다시 입력해주세요!',
      )
      console.error(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <h3>이메일</h3>
          <input
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            required
          />
        </div>
        <div className={styles.inputField}>
          <h3>비밀번호</h3>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
          />
        </div>
        <button>로그인</button>
        <div className={styles.account}>
          <span>비밀번호를 잊으셨나요?</span>
          <Link href="signIn/findPassword">비밀번호 찾기</Link>
        </div>
        <div className={styles.account}>
          <span>회원이 아니세요?</span>
          <Link href="signUp">회원가입</Link>
        </div>
      </form>
    </main>
  )
}

export default SignIn
