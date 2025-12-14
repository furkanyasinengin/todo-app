# 📝 Modern Todo App

Kullanıcıların günlük görevlerini organize etmelerini, önceliklendirmelerini ve takip etmelerini sağlayan, Next.js tabanlı, tam kapsamlı ve çok dilli bir görev yönetim uygulaması.

## 🚀 Proje Hakkında

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, performans ve kullanıcı deneyimi odaklı bir uygulamadır. Kullanıcılar hesap oluşturabilir, görevlerini kategorize edebilir, öncelik durumlarına göre filtreleyebilir ve bitiş tarihlerini dinamik olarak takip edebilirler.

## 🛠️ Teknolojiler ve Mimari

Proje geliştirilirken aşağıdaki teknoloji yığını (Tech Stack) kullanılmıştır:

### Frontend (Ön Yüz)

- **Framework:** Next.js 14 (App Router yapısı)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** **React Context API** (Özellikle Çoklu Dil Desteği ve Tema Yönetimi için aktif olarak kullanıldı)
- **UI Components:** Modüler bileşen mimarisi
- **Bildirimler:** React Hot Toast

### Backend & Veritabanı

- **API:** Next.js API Routes
- **ORM:** Prisma
- **Veritabanı:** PostgreSQL
- **Kimlik Doğrulama:** JWT (JSON Web Token) & Bcrypt (Şifreleme)

## ✨ Temel Özellikler

- **🔐 Güvenli Kimlik Doğrulama:**

  - Kullanıcı kayıt ve giriş işlemleri.
  - JWT tabanlı güvenli oturum yönetimi.

- **🌍 Çoklu Dil Desteği (i18n):**

  - **Context API** kullanılarak geliştirilen dil değiştirme altyapısı.
  - Türkçe, İngilizce, Almanca, İspanyolca dahil olmak üzere geniş dil desteği.
  - Tamamen yerelleştirilmiş arayüz metinleri.

- **📊 Gelişmiş Görev Yönetimi:**

  - **CRUD:** Görev oluşturma, okuma, güncelleme ve silme.
  - **Akıllı Tarih Hesaplama:** Kalan gün sayısı, "Bugün Son", "Gecikti" gibi dinamik durum bildirimleri.
  - **Kategorilendirme:** İş, Kişisel, Alışveriş vb. kategorilere göre gruplama.
  - **Önceliklendirme:** Düşük, Orta ve Yüksek (Acil) öncelik seviyeleri.

- **🎨 Modern Arayüz:**
  - **Responsive Tasarım:** Mobil ve masaüstü uyumlu.
  - **Karanlık/Aydınlık Mod (Dark Mode):** Sistem temasına veya kullanıcı tercihine göre değişen tema desteği.
  - **Dashboard:** Görev istatistiklerini (Tamamlanan, Bekleyen, Acil) gösteren özet paneli.
