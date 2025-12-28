import webpush from 'web-push'
import twilio from 'twilio'
import nodemailer from 'nodemailer'

webpush.setVapidDetails('mailto:info@limo.com', process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE)
const sms = twilio(process.env.TW_SID, process.env.TW_TOKEN)
const mail = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } })

export async function notify(user, { push, sms: txt, email }) {
  if (push) await webpush.sendNotification(push.sub, JSON.stringify(push.payload))
  if (txt) await sms.messages.create({ body: txt, from: process.env.TW_PHONE, to: user.phone })
  if (email) await mail.sendMail({ to: user.email, subject: email.subject, html: email.html })
}
