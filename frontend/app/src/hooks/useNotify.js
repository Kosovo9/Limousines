import { useEffect } from 'react'

export default function useNotify() {
  const notify = async ({ title, body }) => {
    if (!('Notification' in window)) return
    if (Notification.permission !== 'granted') await Notification.requestPermission()
    if (Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icon-192.png' })
    }
  }
  return notify
}
