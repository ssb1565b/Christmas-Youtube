'use client'

import React, { useRef } from 'react'
import styles from '@/app/(sign)/_components/sign.module.scss'
import Link from 'next/link'
import { TProfiles } from '@/type/SupabaseResponse'
import { getProfile } from '@/utils/apiRequest/profileApiRequest'
import { supabase } from '@/utils/apiRequest/defaultApiSetting'
import { debounce } from 'lodash'
import { BasicInput, PasswordHintInput } from '../../_components/SignInput'

const FindPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordHintRef = useRef<HTMLInputElement>(null)

  const handleSubmit = debounce(async (): Promise<null | undefined> => {
    const email = emailRef.current!.value
    const passwordHint = passwordHintRef.current!.value
    const userdata: TProfiles[] = await getProfile('email', email)

    if (!userdata.length) {
      alert('유효하지 않은 이메일 입니다!')
      return null
    }

    if (passwordHint !== userdata[0].password_hint) {
      alert('비밀번호 힌트가 일치하지 않습니다!')
      return null
    }

    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      })
      alert('비밀번호 재설정 이메일이 발송되었습니다.')
    } catch (error) {
      alert('비밀번호 재설정 시도 중 오류가 발생하였습니다.')
      throw error
    }
  }, 500)

  return (
    <main className={styles.container}>
      <h1>비밀번호 찾기</h1>

      <form>
        <BasicInput
          inputRef={emailRef}
          title="이메일"
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <PasswordHintInput passwordHintRef={passwordHintRef} />
        <button type="button" onClick={handleSubmit}>
          비밀번호 재설정 이메일 받기
        </button>
      </form>

      <div className={styles.routerBox}>
        <Link href="/signIn">
          <span className={styles.signInRouter}>로그인으로 돌아가기</span>
        </Link>
      </div>
    </main>
  )
}

export default FindPasswordPage
