import { ref, computed } from 'vue'

const currentLanguage = ref('ID')

const translations = {
  EN: {
    header: {
      signUp: 'Buy License',
      tryNow: 'Try it now for free',
    },
    nav: {
      about: 'About',
      features: 'Features',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    hero: {
      headline: 'Take Control of Your Money, One Day at a Time 🌱',
      subheadline: 'Fanplanner is a web-based personal finance app that helps users easily track and organize their daily financial records. With simple tools for adding transactions, reviewing summaries, and managing personal data, Fanplanner is designed for straightforward and practical everyday use.',
      form: {
        name: 'Your legal name',
        email: 'Email address',
        submit: 'Sign up',
        disclaimer: 'By signing up, you agree to our Terms of Service and Privacy Policy.',
      },
    },
    discover: {
      title: 'Discover. Track. Control.',
      description: 'Find all your transactions, track your spending patterns, and take complete control of your finances.',
    },
    about: {
      title: 'Why Fanplanner?',
      subtitle: 'Finance tracking that works for you',
      description: 'Traditional finance apps are complicated, require accounts, and often sell your data. Fanplanner is different—a simple, web-based tool that works offline, keeps your data private, and gives you lifetime access with a one-time purchase.',
      problemTitle: 'Problems with traditional apps',
      problems: [
        'Complex sign-up processes',
        'Monthly subscriptions',
        'Privacy concerns',
        'Requires internet connection',
      ],
      solutionTitle: 'Our approach',
      solutions: [
        'Web-based, no installation needed',
        'Offline-first design',
        'Privacy-focused (your data stays local)',
        'One-time license, lifetime access',
      ],
    },
    features: {
      title: 'Why choose Fanplanner?',
      subtitle: 'Fanplanner helps thousands of users track and manage their finances effectively.',
      steps: [
        {
          title: 'Fast & Flexible Input',
          description: 'Easily record income and expenses using a simple manual form — perfect for quick daily tracking.',
        },
        {
          title: 'Scan Receipts Instantly',
          description: 'Upload or take a photo of your receipt and let the system automatically turn it into transaction data.',
        },
        {
          title: 'Just Type Like Chatting',
          description: 'Type a simple sentence like "bought coffee for 2 dollars" and Fanplanner converts it into a ready transaction.',
        },
        {
          title: 'Your Personal Finance Assistant',
          description: 'Ask questions, review expenses, or get insights — all through a friendly and easy-to-use chatbot.',
        },
        {
          title: 'Switch Devices Securely',
          description: 'Move your data safely using JSON export and a private data key. Your data stays fully under your control.',
        },
        {
          title: 'See Your Finances Clearly',
          description: 'Visualize your income and spending through clear, meaningful charts to make better financial decisions.',
        },
      ],
    },
    proTools: {
      title: 'Pro Tools for Finance Experts (coming soon)',
      description: 'Advanced features for financial advisors and power users. Get early access to professional-grade tools.',
      benefit1: '99% faster transaction processing',
      benefit2: '50% better financial insights',
      button: 'Buy License',  
    },
    clarity: {
      title: 'How it Works',
      steps: {
        signUp: {
          label: 'Sign up',
          title: 'Sign Up Without the Hassle',
          subtitle: 'Get Started Easily and Quickly.',
          description: 'Open Fanplanner directly from your browser, no need to install an app. Once you\'re in, you\'re ready to start tracking your finances securely and privately.',
        },
        explore: {
          label: 'Explore',
          title: 'Use the Method You Prefer Most',
          subtitle: 'Flexible Transaction Recording.',
          description: 'Record transactions in the way that\'s most comfortable for you — manual, receipt scan, or just type a simple sentence. Fanplanner will organize it automatically for you.',
        },
        takeAction: {
          label: 'Take Action',
          title: 'Take Action Immediately, No Drama',
          subtitle: 'Manage Transactions with Ease.',
          description: 'Every transaction is recorded neatly right away. Edit, search, filter, export, or import data anytime — without unnecessary steps.',
        },
        trackProgress: {
          label: 'Track Progress',
          title: 'See Patterns, Not Just Numbers',
          subtitle: 'Understand Your Spending Patterns.',
          description: 'Fanplanner helps you understand where your money goes, so you can build healthier financial habits.',
        },
        feelConfident: {
          label: 'Feel Confident',
          title: 'Easy Device Switching, Data Stays Safe',
          subtitle: 'Better Financial Decisions.',
          description: 'Switching devices is no problem. You can export and import all transaction data easily anytime. All data is stored privately in your device\'s browser, not on our servers. To move data to another device, you only need the data key that you own — ensuring data stays safe and can\'t be accessed by just anyone.',
        },
      },
    },
    testimonial: {
      title: 'Words of praise from others about our presence',
      badge: 'Rated 4/5 by over 1 Lakh users',
      testimonials: [
        {
          name: 'Isabella Rodriguez',
          role: 'CEO and Co-founder of ABC Company',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
          quote: 'Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.',
        },
        {
          name: 'Gabrielle Williams',
          role: 'CEO and Co-founder of ABC Company',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
          quote: 'Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.',
        },
        {
          name: 'Samantha Johnson',
          role: 'CEO and Co-founder of ABC Company',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80',
          quote: 'Exceeded our expectations with innovative designs that brought vision to life - a truly remarkable creative agency.',
        },
        {
          name: 'Natalie Martinez',
          role: 'CEO and Co-founder of ABC Company',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80',
          quote: 'From concept to execution, their creativity knows no bounds - a game-changer for our brand\'s success.',
        },
        {
          name: 'Victoria Thompson',
          role: 'CEO and Co-founder of ABC Company',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80',
          quote: 'A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.',
        },
        {
          name: 'John Peter',
          role: 'CEO and Co-founder of ABC Company',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
          quote: 'Their team\'s artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.',
        },
      ],
    },
    steps: {
      title: '4 simple steps to take complete control of your finances',
      step1: {
        title: 'Sign up',
        description: 'Create your account in seconds. No credit card required.',
      },
      step2: {
        title: 'Add transactions',
        description: 'Start tracking by adding your first transaction. Use manual input, receipt scan, or text-to-transaction.',
      },
      step3: {
        title: 'Analyze patterns',
        description: 'Let AI analyze your spending patterns and provide insights to help you save money.',
      },
      step4: {
        title: 'Take control',
        description: 'Use insights to make better financial decisions and achieve your goals.',
      },
      button: 'Get started',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about Fanplanner',
      items: [
        {
          question: 'What is Fanplanner?',
          answer: 'Fanplanner is a smart personal finance tracking app that helps you track, analyze, and control your finances.',
        },
        {
          question: 'How does it work?',
          answer: 'Simply add your transactions manually, scan receipts, or use text-to-transaction. Our AI analyzes your spending patterns and provides insights.',
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes! All your data stays on your device. We don\'t sync to the cloud, ensuring complete privacy.',
        },
        {
          question: 'Do I need an internet connection?',
          answer: 'No! Fanplanner works completely offline. Your data is stored locally on your device.',
        },
        {
          question: 'What is the pricing?',
          answer: 'We offer a one-time lifetime license for $2.6. No subscriptions, no hidden fees.',
        },
      ],
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that works for you',
      basic: {
        name: 'Basic',
        price: '$0',
        priceSubtext: 'Free forever',
        description: 'Perfect for getting started',
        features: [
          'Access all features (limit 3x/day)',
          'Import and export data',
          'No ads',
        ],
        cta: 'Get Started',
      },
      lifetime: {
        name: 'Lifetime License',
        originalPrice: '$4.5',
        price: '$2.6',
        discount: '42% OFF',
        priceSubtext: 'One-time payment',
        description: 'Best for power users',
        badge: 'Most Popular',
        features: [
          'Unlimited access to all features',
          'Import and export data',
          'No ads',
          'Lifetime access',
          'Priority support',
        ],
        cta: 'Buy License',
      },
    },
    cta: {
      title: 'Be among the first to experience smarter finance tracking and control.',
      subtitle: 'Join our waitlist today and take the first step towards financial freedom.',
      button: 'Try it now for free',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have questions? We\'d love to hear from you.',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send Message',
      },
      or: 'Or contact us directly at',
      email: 'fandi.bayu110@gmail.com',
      copy: 'Copy Email',
      copied: 'Copied!',
      sendEmail: 'Send Email',
    },
    footer: {
      headline: 'Smart personal finance tracking powered by AI',
      description: 'The easiest way to track, analyze, and control your finances—Fanplanner puts simplicity, privacy, and offline-first security at the forefront. Automatically organize all your transactions, uncover useful patterns with AI-powered analytics, and gain full control of your money. No accounts, no cloud sync, no ads—just a seamless, intuitive experience designed for your peace of mind and financial success.',
      tagline: 'Simple, private, offline-first personal finance tracking.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      contact: 'Contact',
      copyright: '© 2025 Fanplanner. All rights reserved.',
      features: {
        title: 'Features',
        smartTracking: 'Smart Transaction Tracking',
        receiptScanning: 'Receipt Scanning',
        verifiedRecords: 'Verified Records',
        securePrivate: 'Secure & Private',
      },
      company: {
        title: 'Company',
        about: 'About',
        pricing: 'Pricing',
        faq: 'FAQ',
        contact: 'Contact',
      },
    },
  },
  ID: {
    header: {
      signUp: 'Beli License',
      tryNow: 'Coba gratis sekarang',
    },
    nav: {
      about: 'Tentang',
      features: 'Fitur',
      pricing: 'Harga',
      contact: 'Kontak',
    },
    hero: {
      headline: 'Ambil Kendali atas Keuanganmu, Satu Hari demi Satu Hari 🌱',
      subheadline: 'Fanplanner adalah aplikasi keuangan berbasis web yang membantu pengguna mencatat dan mengelola data keuangan harian dengan mudah. Dengan alat sederhana untuk menambahkan transaksi, melihat ringkasan, dan mengelola data pribadi, Fanplanner dirancang untuk digunakan secara praktis dan nyaman dalam aktivitas sehari-hari.',
      form: {
        name: 'Nama lengkap Anda',
        email: 'Alamat email',
        submit: 'Daftar',
        disclaimer: 'Dengan mendaftar, Anda menyetujui Syarat Layanan dan Kebijakan Privasi kami.',
      },
    },
    discover: {
      title: 'Temukan. Lacak. Kendalikan.',
      description: 'Temukan semua transaksi Anda, lacak pola pengeluaran, dan kendalikan keuangan Anda sepenuhnya.',
    },
    about: {
      title: 'Mengapa Fanplanner?',
      subtitle: 'Pelacakan keuangan yang bekerja untuk Anda',
      description: 'Aplikasi keuangan tradisional rumit, memerlukan akun, dan sering menjual data Anda. Fanplanner berbeda—alat berbasis web yang sederhana, bekerja offline, menjaga data Anda tetap privat, dan memberi Anda akses seumur hidup dengan pembelian satu kali.',
      problemTitle: 'Masalah dengan aplikasi tradisional',
      problems: [
        'Proses pendaftaran yang rumit',
        'Berlangganan bulanan',
        'Kekhawatiran privasi',
        'Memerlukan koneksi internet',
      ],
      solutionTitle: 'Pendekatan kami',
      solutions: [
        'Berbasis web, tidak perlu instalasi',
        'Desain offline-first',
        'Fokus pada privasi (data Anda tetap lokal)',
        'Lisensi sekali bayar, akses seumur hidup',
      ],
    },
    features: {
      title: 'Mengapa pilih Fanplanner?',
      subtitle: 'Fanplanner membantu ribuan pengguna melacak dan mengelola keuangan mereka dengan efektif.',
      steps: [
        {
          title: 'Input Cepat & Fleksibel',
          description: 'Catat pemasukan dan pengeluaran dengan form manual yang simpel dan cepat. Cocok untuk pencatatan harian tanpa ribet.',
        },
        {
          title: 'Scan Struk, Data Langsung Tercatat',
          description: 'Upload atau foto struk belanja, lalu biarkan sistem membaca dan mengubahnya menjadi data transaksi otomatis.',
        },
        {
          title: 'Cukup Ketik Seperti Chat',
          description: 'Tulis kalimat sederhana seperti "hari ini beli kopi 25 ribu", dan Fanplanner akan mengubahnya menjadi transaksi siap pakai.',
        },
        {
          title: 'Asisten Keuangan Pribadi',
          description: 'Tanya pengeluaranmu, cek ringkasan keuangan, atau minta insight — semua lewat chatbot yang mudah dipahami.',
        },
        {
          title: 'Pindah Device dengan Aman',
          description: 'Pindahkan data ke device lain dengan mudah melalui file JSON dan data key pribadi. Data tetap aman dan sepenuhnya milikmu.',
        },
        {
          title: 'Lihat Keuangan Lebih Jelas',
          description: 'Pantau pemasukan dan pengeluaran lewat grafik yang informatif untuk membantu kamu mengambil keputusan lebih baik.',
        },
      ],
    },
    proTools: {
      title: 'Alat Pro untuk Ahli Keuangan (segera hadir)',
      description: 'Fitur canggih untuk penasihat keuangan dan pengguna profesional. Dapatkan akses awal ke alat tingkat profesional.',
      benefit1: '99% lebih cepat dalam pemrosesan transaksi',
      benefit2: '50% wawasan keuangan yang lebih baik',
      button: 'Beli Lisensi',
    },
    clarity: {
      title: 'Cara Kerjanya',
      steps: {
        signUp: {
          label: 'Daftar',
          title: 'Daftar Tanpa Ribet',
          subtitle: 'Mulai dengan Mudah dan Cepat.',
          description: 'Buka Fanplanner langsung dari browser, tanpa perlu install aplikasi. Sekali masuk, kamu sudah siap mulai mencatat keuangan dengan aman dan privat.',
        },
        explore: {
          label: 'Jelajahi',
          title: 'Gunakan Cara yang Paling Kamu Suka',
          subtitle: 'Fleksibel dalam Mencatat Transaksi.',
          description: 'Catat transaksi dengan cara yang paling nyaman — manual, scan struk, atau cukup ketik kalimat biasa. Fanplanner akan menyusunnya otomatis untuk kamu.',
        },
        takeAction: {
          label: 'Ambil Tindakan',
          title: 'Langsung Bertindak, Tanpa Drama',
          subtitle: 'Kelola Transaksi dengan Mudah.',
          description: 'Setiap transaksi langsung tercatat rapi. Edit, cari, filter, export, atau import data kapan saja — tanpa langkah bertele-tele.',
        },
        trackProgress: {
          label: 'Lacak Kemajuan',
          title: 'Lihat Pola, Bukan Sekadar Angka',
          subtitle: 'Pahami Pola Pengeluaran Anda.',
          description: 'Fanplanner membantumu memahami ke mana uangmu pergi, sehingga kamu bisa membangun kebiasaan finansial yang lebih sehat.',
        },
        feelConfident: {
          label: 'Rasa Percaya Diri',
          title: 'Mudah Berpindah Device, Data Tetap Aman',
          subtitle: 'Keputusan Finansial yang Lebih Baik.',
          description: 'Pindah perangkat bukan masalah. Kamu bisa export dan import seluruh data transaksi dengan mudah kapan saja. Semua data disimpan secara pribadi di browser perangkatmu, bukan di server kami. Untuk memindahkan data ke device lain, kamu hanya perlu data key yang kamu miliki sendiri — memastikan data tetap aman dan tidak bisa diakses sembarang orang.',
        },
      },
    },
    testimonial: {
      title: 'Kata-kata pujian dari orang lain tentang kehadiran kami',
      badge: 'Dinilai 4/5 oleh lebih dari 1 Lakh pengguna',
      testimonials: [
        {
          name: 'Isabella Rodriguez',
          role: 'CEO dan Co-founder dari ABC Company',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
          quote: 'Kemampuan mereka untuk menangkap esensi merek kami dalam setiap proyek tidak tertandingi - kolaborator kreatif yang sangat berharga.',
        },
        {
          name: 'Gabrielle Williams',
          role: 'CEO dan Co-founder dari ABC Company',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
          quote: 'Jenius kreatif yang mendengarkan, memahami, dan menciptakan visual yang memukau - agensi yang benar-benar memahami kebutuhan kami.',
        },
        {
          name: 'Samantha Johnson',
          role: 'CEO dan Co-founder dari ABC Company',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80',
          quote: 'Melampaui harapan kami dengan desain inovatif yang menghidupkan visi - agensi kreatif yang benar-benar luar biasa.',
        },
        {
          name: 'Natalie Martinez',
          role: 'CEO dan Co-founder dari ABC Company',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80',
          quote: 'Dari konsep hingga eksekusi, kreativitas mereka tidak mengenal batas - pengubah permainan untuk kesuksesan merek kami.',
        },
        {
          name: 'Victoria Thompson',
          role: 'CEO dan Co-founder dari ABC Company',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80',
          quote: 'Agensi yang segar dan imajinatif yang secara konsisten memberikan hasil yang luar biasa - sangat direkomendasikan untuk proyek apa pun.',
        },
        {
          name: 'John Peter',
          role: 'CEO dan Co-founder dari ABC Company',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
          quote: 'Bakat artistik dan pendekatan strategis tim mereka menghasilkan kampanye yang luar biasa - mitra kreatif yang dapat diandalkan.',
        },
      ],
    },
    steps: {
      title: '4 langkah sederhana untuk mengendalikan keuangan Anda sepenuhnya',
      step1: {
        title: 'Daftar',
        description: 'Buat akun Anda dalam hitungan detik. Tidak perlu kartu kredit.',
      },
      step2: {
        title: 'Tambahkan transaksi',
        description: 'Mulai melacak dengan menambahkan transaksi pertama Anda. Gunakan input manual, pindai struk, atau teks-ke-transaksi.',
      },
      step3: {
        title: 'Analisis pola',
        description: 'Biarkan AI menganalisis pola pengeluaran Anda dan memberikan wawasan untuk membantu Anda menghemat uang.',
      },
      step4: {
        title: 'Ambil kendali',
        description: 'Gunakan wawasan untuk membuat keputusan keuangan yang lebih baik dan mencapai tujuan Anda.',
      },
      button: 'Mulai',
    },
    faq: {
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Semua yang perlu Anda ketahui tentang Fanplanner',
      items: [
        {
          question: 'Apa itu Fanplanner?',
          answer: 'Fanplanner adalah aplikasi pelacakan keuangan pribadi yang cerdas yang membantu Anda melacak, menganalisis, dan mengendalikan keuangan Anda.',
        },
        {
          question: 'Bagaimana cara kerjanya?',
          answer: 'Cukup tambahkan transaksi Anda secara manual, pindai struk, atau gunakan teks-ke-transaksi. AI kami menganalisis pola pengeluaran Anda dan memberikan wawasan.',
        },
        {
          question: 'Apakah data saya aman?',
          answer: 'Ya! Semua data Anda tetap di perangkat Anda. Kami tidak menyinkronkan ke cloud, memastikan privasi penuh.',
        },
        {
          question: 'Apakah saya perlu koneksi internet?',
          answer: 'Tidak! Fanplanner bekerja sepenuhnya offline. Data Anda disimpan secara lokal di perangkat Anda.',
        },
        {
          question: 'Berapa harganya?',
          answer: 'Kami menawarkan lisensi seumur hidup sekali bayar seharga Rp. 39.000. Tidak ada langganan, tidak ada biaya tersembunyi.',  
        },
      ],
    },
    pricing: {
      title: 'Harga Sederhana dan Transparan',
      subtitle: 'Pilih paket yang sesuai untuk Anda',
      basic: {
        name: 'Basic',
        price: 'Rp0',
        priceSubtext: 'Gratis selamanya',
        description: 'Sempurna untuk memulai',
        features: [
          'Akses semua fitur (batas 3x/hari)',
          'Import dan export data',
          'Tanpa iklan',
        ],
        cta: 'Mulai Gratis',
      },
      lifetime: {
        name: 'Lisensi Seumur Hidup',
        originalPrice: 'Rp67.000',
        price: 'Rp39.000',
        discount: '42% OFF',
        priceSubtext: 'Pembayaran satu kali',
        description: 'Terbaik untuk power users',
        badge: 'Paling Populer',
        features: [
          'Akses tanpa batas ke semua fitur',
          'Import dan export data',
          'Tanpa iklan',
          'Akses seumur hidup',
          'Dukungan prioritas',
        ],
        cta: 'Beli Lisensi',
      },
    },
    cta: {
      title: 'Jadilah yang pertama merasakan pelacakan dan pengendalian keuangan yang lebih cerdas.',
      subtitle: 'Bergabunglah dengan waitlist kami hari ini dan ambil langkah pertama menuju kebebasan finansial.',
      button: 'Coba Gratis Sekarang',
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Ada pertanyaan? Kami ingin mendengar dari Anda.',
      form: {
        name: 'Nama',
        email: 'Email',
        message: 'Pesan',
        submit: 'Kirim Pesan',
      },
      or: 'Atau hubungi kami langsung di',
      email: 'fandi.bayu110@gmail.com',
      copy: 'Salin Email',
      copied: 'Tersalin!',
      sendEmail: 'Kirim Email',
    },
    footer: {
      headline: 'Pelacakan keuangan pribadi yang cerdas dengan AI',
      description: 'Cara termudah untuk melacak, menganalisis, dan mengendalikan keuangan Anda—Fanplanner memposisikan kesederhanaan, privasi, dan keamanan offline-first di depan. Secara otomatis mengorganisir semua transaksi Anda, menemukan pola berguna dengan analisis AI, dan mendapatkan kendali penuh atas uang Anda. Tanpa akun, tanpa sinkronisasi cloud, tanpa iklan—hanya pengalaman yang lancar dan intuitif yang dirancang untuk pikiran Anda dan kesuksesan finansial.',
      tagline: 'Pelacakan keuangan pribadi yang sederhana, privat, dan offline-first.',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat Penggunaan',
      contact: 'Kontak',
      copyright: '© 2025 Fanplanner. Hak cipta dilindungi.',
      features: {
        title: 'Fitur',
        smartTracking: 'Pelacakan Transaksi Cerdas',
        receiptScanning: 'Pindai Struk',
        verifiedRecords: 'Catatan Terverifikasi',
        securePrivate: 'Aman & Privat',
      },
      company: {
        title: 'Perusahaan',
        about: 'Tentang',
        pricing: 'Harga',
        faq: 'FAQ',
        contact: 'Kontak',
      },
    },
  },
}

export function useI18n() {
  const t = computed(() => translations[currentLanguage.value])
  
  const setLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      localStorage.setItem('fanplanner-language', lang)
    }
  }
  
  const initLanguage = () => {
    const saved = localStorage.getItem('fanplanner-language')
    if (saved && translations[saved]) {
      currentLanguage.value = saved
    } else {
      // Default to Indonesian if no saved language
      currentLanguage.value = 'ID'
      localStorage.setItem('fanplanner-language', 'ID')
    }
  }
  
  return {
    t,
    currentLanguage,
    setLanguage,
    initLanguage,
  }
}

