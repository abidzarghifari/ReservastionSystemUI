export const mainContentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5, // Muncul setelah halaman pembuka mulai hilang
    },
  },
};


export const openUpVariants = {
  // 1. Keadaan Awal (sebelum "masuk")
  //    Posisinya sedikit di bawah dan transparan
  initial: {
	opacity: 0.2,
	y: 100, // Mulai 50px dari bawah
  },
  // 2. Keadaan Animasi (saat "masuk")
  //    Geser ke atas ke posisi aslinya (y: 0) dan terlihat
  animate: {
	opacity: 1,
	y: 0,
	transition: {
	  duration: 1,
	  ease: [0.17, 0.67, 0.83, 0.67], // Easing yang "lembut" saat masuk
	},
  },
  // 3. Keadaan Keluar (kode asli Anda)
  exit: {
	y: '-100vh', // Geser ke atas sejauh tinggi layar
	opacity: 0,
	transition: {
	  duration: 0.8,
	  ease: [0.76, 0, 0.24, 1], // Kurva easing yang sinematik
	},
  },
};

export const secondOpenUpVariants = {
  // 1. Keadaan Awal (sebelum "masuk")
  //    Posisinya sedikit di bawah dan transparan
  initial: {
	opacity: 1,
	y: 100, // Mulai 50px dari bawah
  },
  // 2. Keadaan Animasi (saat "masuk")
  //    Geser ke atas ke posisi aslinya (y: 0) dan terlihat
  animate: {
	opacity: 1,
	y: 0,
	transition: {
	  duration: 1,
	  ease: [0.17, 0.67, 0.83, 0.67], // Easing yang "lembut" saat masuk
	},
  },
  // 3. Keadaan Keluar (kode asli Anda)
  exit: {
	y: '-100vh', // Geser ke atas sejauh tinggi layar
	opacity: 0,
	transition: {
	  duration: 0.8,
	  ease: [0.76, 0, 0.24, 1], // Kurva easing yang sinematik
	},
  },
};
