// ✏️ EDIT THIS FILE to personalise the invitation.
export const WEDDING = {
  header: 'शुभविवाह आमंत्रण पत्रिका',
  groom: 'रोहन',
  bride: 'तनुजा',
  groomEn: 'Rohan',
  brideEn: 'Tanuja',
  groomParents: 'कै. राजेंद्र बाजीराव यादव',
  brideParents: 'श्री. राजेंद्र एकनाथ तळेकर',
  date: '2027-02-28T16:26:00+05:30',       // Muhurat date & time
  groomInfo: {
    photo: './assets/photos/people/groom.png',
    // photo: 'assets/people/groom.jpg',
    grandparents: 'कै.बाजीराव धोंडिबा यादव यांचा नातू',
    parents: 'कै. राजेंद्र बाजीराव यादव यांचे सुपुत्र',
    education: 'बी.ई. (संगणक अभियांत्रिकी)',
    profession: 'मुंबई पोलीस, मुंबई',
    about: 'शांत, मनमिळावू आणि कुटुंबवत्सल. प्रवास, क्रिकेट आणि संगीताची आवड.',
    address: 'मु. केसुर्डी, पो. नायगाव, ता. खंडाळा, जि. सातारा.',
  },
  brideInfo: {
    photo: './assets/photos/people/bride.png',
    grandparents: 'कै. एकनाथ तळेकर यांची नात',
    parents: 'श्री. राजेंद्र एकनाथ तळेकर यांची कन्या',
    education: 'एम.कॉम.',
    profession: 'चार्टर्ड अकाउंटंट, पुणे',
    about: 'हसतमुख, जिद्दी आणि कलाप्रेमी. चित्रकला, नृत्य आणि वाचनाची आवड.',
    address: 'मु. पो. विंग, ता. खंडाळा, जि. सातारा.',
  },
  credit: { text: 'by', name: 'GuruWebs Designers', url: 'https://guruwebs.netlify.app/' },  // add a website link in url to make the name clickable
  venue: 'विराज मल्टीपर्पज हॉल',
  address: 'मु. पो. पारगांव , तालुका खंडाळा , जिल्हा सातारा . बेंगलोर हायवे शेजारी',
  mapLink: 'https://maps.app.goo.gl/CyTvsHJmjzoB4vmM9',  // paste your Google Maps link
  liveStreamUrl: '', // Optional YouTube video/live URL (watch, live, youtu.be, or embed); blank shows a placeholder.
  rsvpWhatsApp: '917821051801',              // country code + number, no +
  contactPeople: [
    { name: 'कु. गोविंद राजेंद्र तळेकर.', phone: '7821051801' },
    { name: 'श्री. राजेंद्र एकनाथ तळेकर.', phone: '9870199268' },
  ],
  events: [
    { name: 'उटणे कार्यक्रम', en: 'Utane', when: '२७ फेब्रुवारी, सायं ६:००' },
    { name: 'सुपारी साखरपुडा', en: 'Engagement', when: '२८ फेब्रुवारी, सकाळी ११:००' },
    { name: 'हळदी समारंभ', en: 'Haldi ceremony', when: '२८ फेब्रुवारी, दुपारी १:००' },
    { name: 'स्नेहभोजन', en: 'Bhojan Samarambha', when: '२८ फेब्रुवारी, दुपारी २ ते सायं ८' },
    { name: 'लग्न', en: 'Muhurat', when: '२८ फेब्रुवारी, सायं ४:२६' },
    // { name: 'स्वागत समारंभ', en: 'Reception', when: '१४ फेब्रुवारी, सायं ७:००' },
  ],
  // Put photos in src/assets/photos and videos in src/assets/videos, then list them here.
  feather: 'assets/feather.png',   // your peacock feather image (see src/assets/README.txt)
  heroImage: '', // Optional separate hero background; do not use a gallery photo.
  photos: ['./assets/photos/engagement_1.jpeg', './assets/photos/engagement_2.jpeg'] as string[],
  videos: ['./assets/videos/engagement_1_vid_1.mp4'] as string[],
};
