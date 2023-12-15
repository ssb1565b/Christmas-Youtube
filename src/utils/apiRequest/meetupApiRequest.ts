import { IMeetupBoardData } from '@/app/(meetUp)/@createMeetupModal/(.)detail/[id]/meetupModal/_components/_meetupModal/MeetupModal'
import { executeQuery, supabase } from './defaultApiSetting'

export const createMeetupBoard = async (data: IMeetupBoardData) => {
  return executeQuery(
    supabase.from('meetup_board').insert([data]),
    '데이터를 생성하지 못했습니다',
  )
}

export const getMeetupList = async () => {
  return executeQuery(
    supabase.from('meetup_board').select('*').order('id', { ascending: false }),
    '데이터 조회를 실패했습니다',
  )
}
export const getPrevMember = async (id: number) => {
  return executeQuery(
    supabase.from('meetup_board').select('member_list').eq('id', id).single(),
    '기존멤버 조회를 실패했습니다',
  )
}
export const updateMember = async (id: number, member_list: string[]) => {
  return executeQuery(
    supabase.from('meetup_board').update({ member_list }).eq('id', id),
    '멤버가 추가되지 않았습니다',
  )
}
