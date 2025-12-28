import express from 'express'
import { TOP_20 } from '../config/langs.js'

const router = express.Router()

// top 20 languages
router.get('/top', (_req, res) => res.json(TOP_20))

const disclaimer = {
  en: 'We use your data only to improve service. No spam.',
  es: 'Usamos tus datos solo para mejorar el servicio. Sin spam.',
  fr: 'Nous utilisons vos données uniquement pour améliorer le service. Pas de spam.',
  de: 'Wir verwenden Ihre Daten nur zur Verbesserung des Dienstes. Kein Spam.',
  it: 'Utilizziamo i tuoi dati solo per migliorare il servizio. Nessuno spam.',
  pt: 'Usamos seus dados apenas para melhorar o serviço. Sem spam.',
  ru: 'Мы используем ваши данные только для улучшения сервиса. Без спама.',
  ja: 'お客様のデータはサービス向上のみに使用します。スパムはありません。',
  ko: '귀하의 데이터는 서비스 개선에만 사용됩니다. 스팸 없음.',
  zh: '我们仅使用您的数据来改善服务。没有垃圾邮件。',
  ar: 'نستخدم بياناتك فقط لتحسين الخدمة. لا رسائل غير مرغوب فيها.',
  hi: 'हम आपका डेटा केवल सेवा में सुधार के लिए उपयोग करते हैं। कोई स्पैम नहीं।',
  bn: 'আমরা আপনার ডেটা শুধুমাত্র পরিষেবা উন্নত করতে ব্যবহার করি। কোনো স্প্যাম নেই।',
  tr: 'Verilerinizi yalnızca hizmeti iyileştirmek için kullanıyoruz. Spam yok.',
  pl: 'Używamy Twoich danych tylko do poprawy usług. Brak spamu.',
  nl: 'We gebruiken uw gegevens alleen om de service te verbeteren. Geen spam.',
  sv: 'Vi använder dina data endast för att förbättra tjänsten. Ingen spam.',
  th: 'เราใช้ข้อมูลของคุณเพื่อปรับปรุงบริการเท่านั้น ไม่มีสแปม',
  vi: 'Chúng tôi chỉ sử dụng dữ liệu của bạn để cải thiện dịch vụ. Không spam.',
  id: 'Kami hanya menggunakan data Anda untuk meningkatkan layanan. Tidak ada spam.'
}

router.get('/disclaimer/:lang', (req, res) => {
  const lang = TOP_20.includes(req.params.lang) ? req.params.lang : 'en'
  res.json({ disclaimer: disclaimer[lang] })
})

export default router
