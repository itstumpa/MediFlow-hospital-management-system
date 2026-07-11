export interface Review {
  id: string;
  patientName: string;
  patientAvatar: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  helpful: number;
  doctorId: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    patientName: "Alice Thompson",
    patientAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "March 15, 2026",
    comment:
      "Dr. Johnson is an incredible cardiologist. She took the time to explain my condition thoroughly and made me feel completely at ease. Her expertise and compassionate approach are truly exceptional. I highly recommend her to anyone seeking cardiac care.",
    isVerified: true,
    helpful: 24,
    doctorId: "1",
  },
  {
    id: "r2",
    patientName: "Mark Rivera",
    patientAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "February 28, 2026",
    comment:
      "After years of struggling with heart issues, I finally found the right doctor. Dr. Johnson's treatment plan has transformed my health. The follow-up care has been outstanding.",
    isVerified: true,
    helpful: 18,
    doctorId: "1",
  },
  {
    id: "r3",
    patientName: "Sarah Chen",
    patientAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "January 12, 2026",
    comment:
      "I was very nervous about my heart condition, but Dr. Johnson and her team made the entire experience comfortable and stress-free. The facility is modern and the staff is incredibly supportive.",
    isVerified: true,
    helpful: 15,
    doctorId: "1",
  },
  {
    id: "r4",
    patientName: "David Park",
    patientAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "December 5, 2025",
    comment:
      "Dr. Mitchell is a very knowledgeable neurologist. He diagnosed my condition accurately when other doctors couldn't. The only reason for 4 stars is the wait time, but the care itself was excellent.",
    isVerified: true,
    helpful: 12,
    doctorId: "2",
  },
  {
    id: "r5",
    patientName: "Emma Wilson",
    patientAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "November 20, 2025",
    comment:
      "Dr. Mitchell has been treating my mother's Parkinson's disease for the past two years. His expertise and genuine care for his patients is remarkable. We are grateful to have found him.",
    isVerified: true,
    helpful: 20,
    doctorId: "2",
  },
  {
    id: "r6",
    patientName: "James Rodriguez",
    patientAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "October 8, 2025",
    comment:
      "Dr. Khan is wonderful with children! My son used to be terrified of doctor visits, but she has a magical way of making him feel comfortable. Her diagnosis and treatment were spot-on.",
    isVerified: true,
    helpful: 32,
    doctorId: "3",
  },
  {
    id: "r7",
    patientName: "Priya Sharma",
    patientAvatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "September 15, 2025",
    comment:
      "Dr. Khan has been our family pediatrician for years. She always takes the time to listen to our concerns and explains everything in a way that's easy to understand. Absolutely wonderful doctor.",
    isVerified: true,
    helpful: 27,
    doctorId: "3",
  },
  {
    id: "r8",
    patientName: "Michael Chang",
    patientAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "August 22, 2025",
    comment:
      "Dr. Chen performed my knee replacement surgery six months ago and I'm now pain-free and walking better than I have in years. His surgical skill and follow-up care are outstanding.",
    isVerified: true,
    helpful: 19,
    doctorId: "4",
  },
  {
    id: "r9",
    patientName: "Lisa Anderson",
    patientAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "July 14, 2025",
    comment:
      "Dr. Chen is an excellent surgeon. My recovery from hip replacement was smoother than I expected thanks to his expertise and the physical therapy team he recommended.",
    isVerified: true,
    helpful: 14,
    doctorId: "4",
  },
  {
    id: "r10",
    patientName: "Jennifer Lopez",
    patientAvatar:
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "June 30, 2025",
    comment:
      "Dr. Watson completely transformed my skin. I had struggled with acne for years and she developed a treatment plan that finally worked. Her knowledge of dermatology is impressive.",
    isVerified: true,
    helpful: 22,
    doctorId: "5",
  },
  {
    id: "r11",
    patientName: "Robert Kim",
    patientAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "May 18, 2025",
    comment:
      "Dr. Torres saved my father's life during a heart attack emergency. His quick thinking and expertise during the angioplasty procedure were remarkable. We are forever grateful.",
    isVerified: true,
    helpful: 35,
    doctorId: "6",
  },
  {
    id: "r12",
    patientName: "Fatima Al-Rashid",
    patientAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "April 5, 2025",
    comment:
      "Dr. Torres is an exceptional cardiologist. He explained my condition and treatment options in detail and made sure I understood everything. The stent placement procedure went smoothly.",
    isVerified: true,
    helpful: 16,
    doctorId: "6",
  },
  {
    id: "r13",
    patientName: "Karen O'Brien",
    patientAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "March 12, 2025",
    comment:
      "Dr. Park is amazing with children. My daughter was born with a heart condition and Dr. Park has been with us every step of the way. Her expertise and kindness give us so much confidence.",
    isVerified: true,
    helpful: 28,
    doctorId: "7",
  },
  {
    id: "r14",
    patientName: "Thomas Wright",
    patientAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "February 8, 2025",
    comment:
      "Dr. Hassan performed my gallbladder surgery using laparoscopic technique. I was back on my feet in no time. His skill and bedside manner are both top-notch.",
    isVerified: true,
    helpful: 11,
    doctorId: "8",
  },
  {
    id: "r15",
    patientName: "Maria Garcia",
    patientAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "January 25, 2025",
    comment:
      "Dr. Santos performed my cataract surgery and the results are incredible! I can see better now than I have in years. She was professional, thorough, and very caring throughout the process.",
    isVerified: true,
    helpful: 17,
    doctorId: "9",
  },
  {
    id: "r16",
    patientName: "Steven Brown",
    patientAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "December 20, 2024",
    comment:
      "Dr. Baker has been managing my asthma for the past three years. His treatment plan has significantly improved my quality of life. He truly cares about his patients' well-being.",
    isVerified: true,
    helpful: 13,
    doctorId: "10",
  },
  {
    id: "r17",
    patientName: "Amanda Foster",
    patientAvatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "November 15, 2024",
    comment:
      "Dr. Green took exceptional care of our premature twins in the NICU. Her dedication and expertise gave us peace of mind during the most stressful time of our lives. We can't thank her enough.",
    isVerified: true,
    helpful: 30,
    doctorId: "11",
  },
  {
    id: "r18",
    patientName: "Daniel Lee",
    patientAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "October 10, 2024",
    comment:
      "Dr. Kim has been very helpful in managing my epilepsy. The medication regimen he prescribed has significantly reduced my seizure frequency. Very knowledgeable and approachable doctor.",
    isVerified: true,
    helpful: 9,
    doctorId: "12",
  },
];

export function getReviewsByDoctorId(doctorId: string): Review[] {
  return reviews.filter((r) => r.doctorId === doctorId);
}

export function getReviewStats(doctorId: string): {
  average: number;
  total: number;
  distribution: Record<number, number>;
} {
  const doctorReviews = getReviewsByDoctorId(doctorId);
  const total = doctorReviews.length;
  if (total === 0)
    return {
      average: 0,
      total: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };

  const sum = doctorReviews.reduce((acc, r) => acc + r.rating, 0);
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  doctorReviews.forEach((r) => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });

  return {
    average: Math.round((sum / total) * 10) / 10,
    total,
    distribution,
  };
}
