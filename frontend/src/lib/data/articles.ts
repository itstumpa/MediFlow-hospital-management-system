export interface ArticleAuthor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  avatar: string;
  bio: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ArticleContentSection {
  type:
    | "heading"
    | "subheading"
    | "paragraph"
    | "list"
    | "quote"
    | "callout"
    | "warning"
    | "tip"
    | "image"
    | "table"
    | "statistics";
  content?: string;
  items?: string[];
  caption?: string;
  src?: string;
  alt?: string;
  rows?: { label: string; value: string }[];
  stats?: { label: string; value: string }[];
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface ArticleComment {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  comment: string;
  likes: number;
  replies: ArticleComment[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  readTime: string;
  date: string;
  modifiedDate: string;
  imageUrl: string;
  largeImageUrl: string;
  views: number;
  likes: number;
  comments: number;
  isPopular: boolean;
  isTrending: boolean;
  featured: boolean;
  author: ArticleAuthor;
  content: ArticleContentSection[];
  keyTakeaways: string[];
  relatedSymptoms: string[];
  sources: { label: string; url: string }[];
  faqs: ArticleFAQ[];
  sampleComments: ArticleComment[];
}

export const articleCategories: ArticleCategory[] = [
  {
    id: "heart-health",
    name: "Heart Health",
    slug: "heart-health",
    description:
      "Expert advice on cardiovascular wellness, heart disease prevention, and cardiac care.",
  },
  {
    id: "mental-health",
    name: "Mental Health",
    slug: "mental-health",
    description:
      "Resources for emotional wellbeing, anxiety, depression, and mental health support.",
  },
  {
    id: "nutrition",
    name: "Nutrition",
    slug: "nutrition",
    description:
      "Evidence-based dietary guidance for better health at every age.",
  },
  {
    id: "womens-health",
    name: "Women's Health",
    slug: "womens-health",
    description:
      "Comprehensive care guides covering reproductive health, pregnancy, and wellness.",
  },
  {
    id: "children",
    name: "Children",
    slug: "children",
    description:
      "Pediatric care advice from vaccinations to developmental milestones.",
  },
  {
    id: "diabetes",
    name: "Diabetes",
    slug: "diabetes",
    description:
      "Management strategies, prevention tips, and lifestyle guidance for diabetes.",
  },
  {
    id: "skin-care",
    name: "Skin Care",
    slug: "skin-care",
    description:
      "Dermatologist-approved tips for healthy, glowing skin at every age.",
  },
  {
    id: "emergency",
    name: "Emergency",
    slug: "emergency",
    description:
      "Critical first-aid guidance and when to seek emergency medical care.",
  },
  {
    id: "fitness",
    name: "Fitness",
    slug: "fitness",
    description:
      "Exercise routines and physical activity recommendations for all fitness levels.",
  },
  {
    id: "pregnancy",
    name: "Pregnancy",
    slug: "pregnancy",
    description:
      "Prenatal care guides, trimester information, and postpartum support.",
  },
  {
    id: "vaccination",
    name: "Vaccination",
    slug: "vaccination",
    description:
      "Vaccine schedules, safety information, and immunization guidelines.",
  },
  {
    id: "senior-care",
    name: "Senior Care",
    slug: "senior-care",
    description:
      "Aging well resources, geriatric care, and healthy living for seniors.",
  },
];

const authors: ArticleAuthor[] = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    experience: 18,
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with 18 years of experience in preventive cardiology and heart disease management. She has published over 40 research papers and is a fellow of the American College of Cardiology.",
  },
  {
    id: "dr-michael-torres",
    name: "Dr. Michael Torres",
    specialization: "Pediatrician",
    experience: 14,
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    bio: "Dr. Michael Torres is a dedicated pediatrician with 14 years of experience caring for children from infancy through adolescence. He is board-certified and a member of the American Academy of Pediatrics.",
  },
  {
    id: "dr-priya-sharma",
    name: "Dr. Priya Sharma",
    specialization: "Nutrition Specialist",
    experience: 12,
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    bio: "Dr. Priya Sharma is a clinical nutrition specialist with a PhD in Nutritional Sciences. She helps patients achieve optimal health through evidence-based dietary interventions and personalized nutrition plans.",
  },
  {
    id: "dr-lisa-park",
    name: "Dr. Lisa Park",
    specialization: "OB-GYN",
    experience: 16,
    avatar:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
    bio: "Dr. Lisa Park is an experienced OB-GYN specializing in women's health across all life stages. She is passionate about prenatal care, minimally invasive gynecologic surgery, and patient education.",
  },
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    specialization: "Psychiatrist",
    experience: 13,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    bio: "Dr. Emily Chen is a board-certified psychiatrist specializing in anxiety disorders, depression, and women's mental health. She integrates evidence-based pharmacotherapy with psychotherapy approaches.",
  },
  {
    id: "dr-james-mitchell",
    name: "Dr. James Mitchell",
    specialization: "Neurologist",
    experience: 14,
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    bio: "Dr. James Mitchell is a board-certified neurologist with expertise in stroke management, epilepsy, and neurodegenerative disorders. He is committed to advancing neurological care through clinical research.",
  },
];

export const articles: Article[] = [
  {
    id: "heart-health-daily-habits",
    slug: "heart-health",
    title: "5 Everyday Habits That Keep Your Heart Healthy",
    subtitle:
      "Simple lifestyle changes backed by cardiology research that can dramatically reduce your risk of heart disease.",
    excerpt:
      "Discover five simple yet powerful daily habits that can significantly improve your cardiovascular health. From mindful eating to stress management, our cardiologists share evidence-based practices you can start today.",
    category: "Heart Health",
    categorySlug: "heart-health",
    readTime: "5 min read",
    date: "May 12, 2026",
    modifiedDate: "June 1, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=700&fit=crop",
    views: 15420,
    likes: 892,
    comments: 64,
    isPopular: true,
    isTrending: true,
    featured: true,
    author: authors[0],
    content: [
      {
        type: "paragraph",
        content:
          "Heart disease remains the leading cause of death worldwide, but the good news is that many risk factors are within your control. By incorporating these five evidence-backed habits into your daily routine, you can significantly strengthen your cardiovascular health and reduce your risk of heart disease by up to 80%.",
      },
      {
        type: "heading",
        content: "1. Start Your Day with Heart-Healthy Nutrition",
      },
      {
        type: "paragraph",
        content:
          "A heart-healthy diet begins with the first meal of the day. Research published in the Journal of the American College of Cardiology shows that people who eat a balanced breakfast rich in whole grains, healthy fats, and fiber have lower rates of cardiovascular disease.",
      },
      {
        type: "subheading",
        content: "What to Include in Your Heart-Healthy Plate",
      },
      {
        type: "list",
        items: [
          "Oats or whole-grain cereals rich in soluble fiber that helps lower LDL cholesterol",
          "Fresh berries packed with antioxidants that reduce inflammation and oxidative stress",
          "Nuts and seeds—almonds, walnuts, flaxseeds, and chia seeds for omega-3 fatty acids",
          "Greek yogurt or plant-based alternatives for protein without saturated fat",
          "Avocado for monounsaturated fats that support healthy cholesterol levels",
        ],
      },
      {
        type: "callout",
        content:
          "💡 The Mediterranean diet is consistently ranked as the best dietary pattern for heart health by cardiologists worldwide. Aim for 5-7 servings of fruits and vegetables daily.",
      },
      {
        type: "heading",
        content: "2. Move Your Body for at Least 30 Minutes Daily",
      },
      {
        type: "paragraph",
        content:
          "Physical activity is one of the most powerful tools for preventing heart disease. The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic exercise per week—that's just 30 minutes a day, five days a week.",
      },
      {
        type: "statistics",
        stats: [
          { label: "Reduced Heart Disease Risk", value: "35%" },
          { label: "Lower Blood Pressure", value: "5-10 mmHg" },
          { label: "Improved HDL Cholesterol", value: "8-12%" },
        ],
      },
      {
        type: "table",
        caption: "Exercise Intensity Guide for Heart Health",
        rows: [
          { label: "Walking (brisk)", value: "Moderate" },
          { label: "Swimming", value: "Moderate-Vigorous" },
          { label: "Cycling", value: "Moderate-Vigorous" },
          { label: "Running", value: "Vigorous" },
          { label: "Yoga", value: "Light-Moderate" },
        ],
      },
      {
        type: "tip",
        content:
          "Start small. Even a 10-minute walk after meals can improve blood sugar regulation and cardiovascular function. Gradually increase duration as your fitness improves.",
      },
      {
        type: "heading",
        content: "3. Practice Stress Management Techniques",
      },
      {
        type: "paragraph",
        content:
          "Chronic stress triggers inflammation and raises cortisol levels, both of which contribute to heart disease. Learning to manage stress effectively is not just good for your mental health—it is essential for your heart.",
      },
      {
        type: "list",
        items: [
          "Deep breathing exercises—4 seconds in, 4 seconds hold, 6 seconds out",
          "Mindfulness meditation for 10 minutes daily",
          "Progressive muscle relaxation before bed",
          "Spending time in nature—green spaces lower cortisol",
          "Connecting with loved ones—social support buffers stress",
        ],
      },
      {
        type: "quote",
        content:
          "The greatest weapon against stress is our ability to choose one thought over another.",
        caption: "— William James, Psychologist",
      },
      {
        type: "heading",
        content: "4. Prioritize Quality Sleep",
      },
      {
        type: "paragraph",
        content:
          "Sleep is when your body repairs itself, including your cardiovascular system. Studies show that people who sleep fewer than 6 hours per night have a 20% higher risk of heart attack compared to those who sleep 7-8 hours.",
      },
      {
        type: "warning",
        content:
          "⚠ If you experience loud snoring, gasping for air during sleep, or excessive daytime fatigue, you may have sleep apnea—a condition that significantly increases heart disease risk. Consult your doctor for a sleep evaluation.",
      },
      {
        type: "subheading",
        content: "Tips for Better Sleep Hygiene",
      },
      {
        type: "list",
        items: [
          "Maintain a consistent sleep schedule, even on weekends",
          "Keep your bedroom cool (65-68°F) and completely dark",
          "Avoid screens for at least 60 minutes before bedtime",
          "Limit caffeine consumption after 2 PM",
          "Avoid heavy meals within 3 hours of bedtime",
        ],
      },
      {
        type: "heading",
        content: "5. Schedule Regular Health Screenings",
      },
      {
        type: "paragraph",
        content:
          "Prevention is always better than treatment. Regular health check-ups can detect risk factors like hypertension, high cholesterol, and diabetes before they cause significant damage. Early intervention dramatically improves outcomes.",
      },
      {
        type: "table",
        caption: "Recommended Heart Health Screenings by Age",
        rows: [
          {
            label: "Blood Pressure",
            value: "Every 2 years (annually if > 120/80)",
          },
          {
            label: "Cholesterol Panel",
            value: "Every 4-6 years (more if high risk)",
          },
          { label: "Blood Glucose", value: "Every 3 years starting at age 45" },
          { label: "ECG", value: "Baseline at 40, then as recommended" },
          {
            label: "Stress Test",
            value: "As recommended by your cardiologist",
          },
        ],
      },
      {
        type: "callout",
        content:
          "🫀 Your heart health journey is unique. Consult with a cardiologist to create a personalized prevention plan tailored to your risk factors, family history, and lifestyle.",
      },
    ],
    keyTakeaways: [
      "A heart-healthy diet rich in fiber, healthy fats, and antioxidants can reduce cardiovascular risk by up to 80%",
      "Regular physical activity of 150 minutes weekly significantly improves heart function and blood pressure",
      "Effective stress management through meditation and deep breathing lowers inflammation markers",
      "Quality sleep of 7-8 hours nightly is essential for cardiovascular repair and hormone regulation",
      "Regular health screenings enable early detection and intervention for heart disease risk factors",
    ],
    relatedSymptoms: [
      "Chest Pain",
      "High Blood Pressure",
      "Fatigue",
      "Irregular Heartbeat",
      "Shortness of Breath",
    ],
    sources: [
      {
        label: "American Heart Association — Daily Habits for Heart Health",
        url: "#",
      },
      {
        label:
          "Journal of the American College of Cardiology — Diet and Heart Disease",
        url: "#",
      },
      { label: "WHO — Cardiovascular Disease Prevention Guidelines", url: "#" },
      { label: "CDC — Heart Disease Risk Factors", url: "#" },
      { label: "NIH — Sleep and Cardiovascular Health", url: "#" },
    ],
    faqs: [
      {
        question: "How much exercise do I need for a healthy heart?",
        answer:
          "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic exercise or 75 minutes of vigorous-intensity exercise per week. This can be broken into 30-minute sessions, 5 days per week. Even short 10-minute bouts of activity throughout the day provide cardiovascular benefits.",
      },
      {
        question: "Can heart disease be reversed with lifestyle changes?",
        answer:
          "While some damage can be slowed or partially reversed with aggressive lifestyle changes and medication, established heart disease typically requires ongoing medical management. However, lifestyle modifications can significantly reduce symptoms, prevent progression, and improve quality of life.",
      },
      {
        question: "What are the early warning signs of a heart attack?",
        answer:
          "Early warning signs include chest discomfort (pressure, squeezing, or pain), shortness of breath, pain in the arms, back, neck, or jaw, cold sweat, nausea, and lightheadedness. Women may experience less typical symptoms like extreme fatigue, indigestion, and anxiety. Call emergency services immediately if you suspect a heart attack.",
      },
    ],
    sampleComments: [
      {
        id: "c1",
        patientName: "Rebecca M.",
        patientAvatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        date: "May 15, 2026",
        comment:
          "This article was incredibly helpful! I've started incorporating oats and berries into my breakfast routine and already feel more energetic. Thank you, Dr. Johnson!",
        likes: 24,
        replies: [
          {
            id: "c1r1",
            patientName: "MediFlow Team",
            patientAvatar:
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face",
            date: "May 16, 2026",
            comment:
              "Thank you, Rebecca! We're glad you found the tips helpful. Small changes really do add up! 💪",
            likes: 8,
            replies: [],
          },
        ],
      },
      {
        id: "c2",
        patientName: "David K.",
        patientAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        date: "May 14, 2026",
        comment:
          "The sleep tips made a huge difference for me. I started turning off screens an hour before bed and my sleep quality has improved dramatically.",
        likes: 18,
        replies: [],
      },
    ],
  },
  {
    id: "diabetes-management",
    slug: "diabetes-management",
    title: "Diabetes Management: A Complete Guide to Living Well",
    subtitle:
      "Practical strategies for monitoring blood sugar, making healthy food choices, and maintaining an active lifestyle with diabetes.",
    excerpt:
      "A comprehensive guide to managing diabetes through diet, exercise, medication, and lifestyle adjustments. Learn how to take control of your health and live a full, active life.",
    category: "Diabetes",
    categorySlug: "diabetes",
    readTime: "7 min read",
    date: "May 8, 2026",
    modifiedDate: "May 28, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=1200&h=700&fit=crop",
    views: 12350,
    likes: 712,
    comments: 48,
    isPopular: true,
    isTrending: false,
    featured: false,
    author: authors[2],
    content: [
      {
        type: "paragraph",
        content:
          "Diabetes affects more than 500 million people worldwide, but with proper management, individuals with diabetes can lead full, healthy lives. This guide covers the essential strategies for managing blood glucose levels and preventing complications.",
      },
      {
        type: "heading",
        content: "Understanding Blood Sugar Monitoring",
      },
      {
        type: "paragraph",
        content:
          "Regular blood sugar monitoring is the foundation of effective diabetes management. Knowing your numbers helps you make informed decisions about food, physical activity, and medication.",
      },
      {
        type: "table",
        caption: "Target Blood Glucose Ranges for Adults with Diabetes",
        rows: [
          { label: "Before meals (fasting)", value: "80-130 mg/dL" },
          { label: "2 hours after meals", value: "Less than 180 mg/dL" },
          { label: "HbA1c target", value: "Less than 7%" },
          { label: "Bedtime", value: "100-140 mg/dL" },
        ],
      },
      {
        type: "callout",
        content:
          "📊 Keep a log of your blood sugar readings. Patterns help your healthcare team adjust your treatment plan for optimal control.",
      },
      {
        type: "heading",
        content: "Nutrition for Diabetes Management",
      },
      {
        type: "paragraph",
        content:
          "A diabetes-friendly diet focuses on controlling carbohydrate intake while ensuring adequate nutrition. The key is consistency and balance.",
      },
      {
        type: "list",
        items: [
          "Choose complex carbohydrates like whole grains, legumes, and vegetables over simple sugars",
          "Include lean protein at every meal to stabilize blood sugar",
          "Healthy fats from avocados, nuts, and olive oil improve satiety and heart health",
          "Fiber-rich foods slow glucose absorption—aim for 25-30g daily",
          "Stay hydrated with water; avoid sugary beverages including fruit juices",
        ],
      },
      {
        type: "tip",
        content:
          "The plate method is a simple way to portion your meals: fill half your plate with non-starchy vegetables, one quarter with lean protein, and one quarter with complex carbohydrates.",
      },
      {
        type: "heading",
        content: "Physical Activity and Diabetes",
      },
      {
        type: "paragraph",
        content:
          "Exercise improves insulin sensitivity and helps lower blood glucose levels. Both aerobic exercise and resistance training offer significant benefits for diabetes management.",
      },
      {
        type: "warning",
        content:
          "⚠ Always check your blood sugar before exercising. If it is below 100 mg/dL, eat a small snack. If above 250 mg/dL, test for ketones and consult your doctor before strenuous activity.",
      },
    ],
    keyTakeaways: [
      "Regular blood sugar monitoring helps make informed decisions about diet and activity",
      "A balanced diet with controlled carbohydrates is essential for glucose management",
      "Physical activity improves insulin sensitivity and cardiovascular health",
      "Medication adherence and regular check-ups prevent long-term complications",
      "Stress management and quality sleep play crucial roles in blood sugar control",
    ],
    relatedSymptoms: [
      "Excessive Thirst",
      "Frequent Urination",
      "Fatigue",
      "Blurred Vision",
      "Slow-Healing Wounds",
    ],
    sources: [
      {
        label: "American Diabetes Association — Standards of Medical Care",
        url: "#",
      },
      { label: "WHO — Diabetes Fact Sheet", url: "#" },
      { label: "CDC — Diabetes Management Guidelines", url: "#" },
      { label: "NIH — Nutrition and Diabetes", url: "#" },
    ],
    faqs: [
      {
        question: "Can diabetes be reversed?",
        answer:
          "Type 2 diabetes can go into remission through significant weight loss, dietary changes, and increased physical activity. Type 1 diabetes requires lifelong insulin therapy. Even when remission is achieved, ongoing monitoring and healthy lifestyle habits are essential.",
      },
      {
        question: "How often should I check my blood sugar?",
        answer:
          "The frequency depends on your type of diabetes and treatment plan. Most people with Type 1 diabetes check 4-10 times daily. Those with Type 2 diabetes may check 1-2 times daily or as recommended by their healthcare provider.",
      },
    ],
    sampleComments: [
      {
        id: "c3",
        patientName: "Margaret L.",
        patientAvatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
        date: "May 10, 2026",
        comment:
          "The plate method has been a game-changer for me! My blood sugar readings have been so much more stable since I started using it.",
        likes: 31,
        replies: [],
      },
    ],
  },
  {
    id: "healthy-pregnancy",
    slug: "healthy-pregnancy",
    title: "Healthy Pregnancy: A Trimester-by-Trimester Guide",
    subtitle:
      "Everything you need to know about prenatal care, nutrition, exercise, and preparing for your new arrival.",
    excerpt:
      "Navigate your pregnancy journey with confidence. Our comprehensive guide covers nutrition, exercise, prenatal appointments, and preparation for each trimester.",
    category: "Pregnancy",
    categorySlug: "pregnancy",
    readTime: "8 min read",
    date: "May 5, 2026",
    modifiedDate: "May 25, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&h=700&fit=crop",
    views: 18900,
    likes: 1054,
    comments: 89,
    isPopular: true,
    isTrending: true,
    featured: false,
    author: authors[3],
    content: [
      {
        type: "paragraph",
        content:
          "Pregnancy is a remarkable journey that brings physical and emotional changes. Understanding what to expect during each trimester helps you prepare and ensures the best outcomes for both mother and baby.",
      },
      {
        type: "heading",
        content: "First Trimester (Weeks 1-12): Building the Foundation",
      },
      {
        type: "paragraph",
        content:
          "The first trimester is a period of rapid development. Your baby's major organs and systems begin to form, making proper nutrition and prenatal care essential during these early weeks.",
      },
      {
        type: "list",
        items: [
          "Begin prenatal vitamins with folic acid at least one month before conception",
          "Manage morning sickness with small, frequent meals and ginger tea",
          "Stay hydrated—aim for 8-10 glasses of water daily",
          "Avoid alcohol, tobacco, and limit caffeine to 200mg daily",
          "Schedule your first prenatal visit by week 8",
        ],
      },
      {
        type: "warning",
        content:
          "⚠ Certain foods should be avoided during pregnancy: raw or undercooked meats, unpasteurized dairy products, high-mercury fish, and deli meats unless heated to steaming.",
      },
      {
        type: "heading",
        content: "Second Trimester (Weeks 13-26): The Comfort Phase",
      },
      {
        type: "paragraph",
        content:
          "Many women find the second trimester to be the most comfortable. Morning sickness typically subsides, and energy levels increase. This is when you will likely feel your baby's first movements.",
      },
      {
        type: "statistics",
        stats: [
          { label: "Recommended Weight Gain", value: "1-2 lbs/week" },
          { label: "Increased Caloric Need", value: "340 cal/day" },
          { label: "Baby's Length by Week 26", value: "14 inches" },
        ],
      },
      {
        type: "tip",
        content:
          "Gentle exercise like prenatal yoga, swimming, and walking can reduce back pain, improve sleep, and prepare your body for labor. Always consult your OB-GYN before starting any exercise routine.",
      },
      {
        type: "heading",
        content: "Third Trimester (Weeks 27-40): Preparing for Birth",
      },
      {
        type: "paragraph",
        content:
          "As your due date approaches, focus on preparing for labor and delivery. Your baby continues to gain weight and develop essential systems.",
      },
      {
        type: "list",
        items: [
          "Attend childbirth education classes with your partner",
          "Pack your hospital bag by week 36",
          "Practice pelvic floor exercises (Kegels) daily",
          "Finalize your birth plan with your healthcare provider",
          "Rest on your left side to improve blood flow to the baby",
        ],
      },
    ],
    keyTakeaways: [
      "Start prenatal vitamins with folic acid before conception or as soon as pregnancy is confirmed",
      "Eat a balanced diet rich in fruits, vegetables, lean protein, and whole grains throughout pregnancy",
      "Stay active with pregnancy-safe exercises like walking, swimming, and prenatal yoga",
      "Attend all scheduled prenatal appointments for monitoring and early detection of complications",
      "Prepare for childbirth through education classes, birth planning, and hospital bag packing",
    ],
    relatedSymptoms: [
      "Morning Sickness",
      "Back Pain",
      "Swelling",
      "Fatigue",
      "Braxton Hicks",
    ],
    sources: [
      { label: "ACOG — Pregnancy Guidelines", url: "#" },
      { label: "WHO — Antenatal Care Recommendations", url: "#" },
      { label: "NIH — Nutrition During Pregnancy", url: "#" },
      { label: "CDC — Pregnancy and Vaccination", url: "#" },
    ],
    faqs: [
      {
        question: "How much weight should I gain during pregnancy?",
        answer:
          "Weight gain depends on your pre-pregnancy BMI. Underweight women should gain 28-40 lbs, normal weight 25-35 lbs, overweight 15-25 lbs, and obese 11-20 lbs. Your OB-GYN will provide personalized recommendations.",
      },
      {
        question: "What exercises are safe during pregnancy?",
        answer:
          "Walking, swimming, stationary cycling, prenatal yoga, and low-impact aerobics are generally safe. Avoid contact sports, activities with fall risk, and exercises that require lying flat on your back after the first trimester.",
      },
    ],
    sampleComments: [
      {
        id: "c4",
        patientName: "Amanda R.",
        patientAvatar:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&h=80&fit=crop&crop=face",
        date: "May 7, 2026",
        comment:
          "This guide is so thorough! I'm in my second trimester and the exercise tips have been invaluable. Thank you, Dr. Park!",
        likes: 42,
        replies: [],
      },
    ],
  },
  {
    id: "mental-health-awareness",
    slug: "mental-health-awareness",
    title: "Understanding Anxiety: When to Seek Professional Help",
    subtitle:
      "Learn to recognize the signs of anxiety disorders and discover effective treatment options and coping strategies.",
    excerpt:
      "Learn to recognize the signs of anxiety disorders and understand when it's time to consult a mental health professional. Early intervention can make a significant difference.",
    category: "Mental Health",
    categorySlug: "mental-health",
    readTime: "6 min read",
    date: "May 10, 2026",
    modifiedDate: "May 30, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=700&fit=crop",
    views: 20300,
    likes: 1245,
    comments: 112,
    isPopular: true,
    isTrending: true,
    featured: false,
    author: authors[4],
    content: [
      {
        type: "paragraph",
        content:
          "Anxiety is a normal human emotion that everyone experiences from time to time. However, when anxiety becomes persistent, overwhelming, and interferes with daily life, it may be an anxiety disorder requiring professional attention.",
      },
      {
        type: "heading",
        content: "What is an Anxiety Disorder?",
      },
      {
        type: "paragraph",
        content:
          "Anxiety disorders are the most common mental health conditions, affecting approximately 40 million adults in the United States alone. They involve excessive fear, worry, and related behavioral disturbances that significantly impact quality of life.",
      },
      {
        type: "subheading",
        content: "Common Types of Anxiety Disorders",
      },
      {
        type: "list",
        items: [
          "Generalized Anxiety Disorder (GAD) — persistent, excessive worry about multiple areas of life",
          "Panic Disorder — recurrent unexpected panic attacks with intense fear",
          "Social Anxiety Disorder — intense fear of social situations and judgment",
          "Specific Phobias — extreme fear of specific objects or situations",
          "Agoraphobia — fear of being in situations where escape might be difficult",
        ],
      },
      {
        type: "quote",
        content:
          "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
        caption: "— Charles Spurgeon",
      },
      {
        type: "heading",
        content: "Signs You May Need Professional Help",
      },
      {
        type: "list",
        items: [
          "Worry that is out of proportion to the actual situation",
          "Difficulty concentrating or mind going blank due to worry",
          "Physical symptoms like rapid heartbeat, sweating, trembling, or gastrointestinal issues",
          "Avoidance of situations that trigger anxiety",
          "Sleep disturbances including difficulty falling or staying asleep",
          "Irritability and restlessness",
        ],
      },
      {
        type: "warning",
        content:
          "⚠ If you are experiencing thoughts of self-harm or suicide, please call emergency services immediately. You are not alone—help is available 24/7.",
      },
      {
        type: "heading",
        content: "Treatment Options",
      },
      {
        type: "paragraph",
        content:
          "Anxiety disorders are highly treatable. The most effective approaches typically combine psychotherapy, medication, and lifestyle modifications.",
      },
      {
        type: "table",
        caption: "Common Anxiety Treatment Approaches",
        rows: [
          {
            label: "Cognitive Behavioral Therapy (CBT)",
            value: "Gold-standard psychotherapy",
          },
          { label: "SSRIs/SNRIs", value: "First-line medication options" },
          {
            label: "Mindfulness-Based Stress Reduction",
            value: "Evidence-based complementary approach",
          },
          {
            label: "Exercise Regular",
            value: "30 min daily reduces symptoms by 20-30%",
          },
          { label: "Support Groups", value: "Peer support enhances recovery" },
        ],
      },
      {
        type: "callout",
        content:
          "🧠 Recovery from anxiety is a journey, not a destination. With proper treatment, most people experience significant improvement in their symptoms and quality of life.",
      },
    ],
    keyTakeaways: [
      "Anxiety disorders are common and highly treatable with professional intervention",
      "Persistent worry that interferes with daily life warrants a mental health evaluation",
      "CBT is the gold-standard psychotherapy approach for anxiety disorders",
      "Combining therapy, medication, and lifestyle changes produces the best outcomes",
      "Early intervention leads to faster recovery and better long-term prognosis",
    ],
    relatedSymptoms: [
      "Panic Attacks",
      "Insomnia",
      "Chest Tightness",
      "Excessive Worry",
      "Social Withdrawal",
    ],
    sources: [
      {
        label: "National Institute of Mental Health — Anxiety Disorders",
        url: "#",
      },
      {
        label: "American Psychiatric Association — Practice Guidelines",
        url: "#",
      },
      { label: "WHO — Mental Health and Anxiety", url: "#" },
      { label: "Journal of Clinical Psychology — CBT Effectiveness", url: "#" },
    ],
    faqs: [
      {
        question: "Can anxiety go away without treatment?",
        answer:
          "Mild anxiety may improve with lifestyle changes and stress management, but moderate to severe anxiety disorders typically require professional treatment. Without intervention, anxiety disorders often become chronic and may worsen over time.",
      },
      {
        question: "How long does it take for anxiety treatment to work?",
        answer:
          "CBT often produces noticeable improvements within 8-12 sessions. Medications like SSRIs typically take 4-6 weeks to reach full effectiveness. Many people begin to feel better within 2-3 months of starting treatment.",
      },
    ],
    sampleComments: [
      {
        id: "c5",
        patientName: "James T.",
        patientAvatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
        date: "May 12, 2026",
        comment:
          "Thank you for normalizing mental health care. I've been struggling with anxiety for years and this article gave me the courage to schedule my first therapy appointment.",
        likes: 67,
        replies: [
          {
            id: "c5r1",
            patientName: "Dr. Emily Chen",
            patientAvatar:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
            date: "May 12, 2026",
            comment:
              "James, that is wonderful news! Taking the first step is often the hardest part. Wishing you the very best on your journey. 💙",
            likes: 45,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "child-vaccination-guide",
    slug: "child-vaccination-guide",
    title: "Vaccination Schedule: Protecting Your Child's Future",
    subtitle:
      "A complete guide to childhood immunizations, including vaccine safety, recommended schedules, and what to expect during well-child visits.",
    excerpt:
      "Stay informed about the recommended vaccination schedule for children. Our pediatricians explain each vaccine and why timely immunization matters.",
    category: "Vaccination",
    categorySlug: "vaccination",
    readTime: "6 min read",
    date: "May 3, 2026",
    modifiedDate: "May 20, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=700&fit=crop",
    views: 16780,
    likes: 934,
    comments: 76,
    isPopular: true,
    isTrending: false,
    featured: false,
    author: authors[1],
    content: [
      {
        type: "paragraph",
        content:
          "Vaccination is one of the most effective public health interventions in history, saving millions of lives worldwide each year. This guide provides parents with accurate, evidence-based information about childhood immunization schedules.",
      },
      {
        type: "heading",
        content: "Why Vaccination Matters",
      },
      {
        type: "paragraph",
        content:
          "Vaccines protect children from serious, potentially life-threatening diseases. They work by stimulating the immune system to produce antibodies without causing the disease itself, creating protection that lasts for years or even a lifetime.",
      },
      {
        type: "callout",
        content:
          "💉 The CDC estimates that childhood vaccination in the US prevents approximately 42 million deaths and 24 million hospitalizations each year.",
      },
      {
        type: "heading",
        content: "Recommended Vaccination Schedule (Birth to 6 Years)",
      },
      {
        type: "table",
        caption: "CDC Recommended Immunization Schedule",
        rows: [
          { label: "Birth", value: "Hepatitis B (1st dose)" },
          { label: "2 Months", value: "Hep B, DTaP, IPV, Hib, PCV13, RV" },
          { label: "4 Months", value: "DTaP, IPV, Hib, PCV13, RV (2nd doses)" },
          {
            label: "6 Months",
            value: "Hep B, DTaP, PCV13, RV, Influenza (annual)",
          },
          {
            label: "12-15 Months",
            value: "MMR, Varicella, Hep A, PCV13 Booster",
          },
          { label: "18 Months", value: "DTaP Booster, Hep A (2nd dose)" },
          { label: "4-6 Years", value: "DTaP, IPV, MMR, Varicella Boosters" },
        ],
      },
      {
        type: "heading",
        content: "Vaccine Safety: Addressing Common Concerns",
      },
      {
        type: "paragraph",
        content:
          "Vaccines undergo rigorous testing and continuous monitoring to ensure their safety. The US vaccine safety system is one of the most comprehensive in the world, involving multiple federal agencies and independent scientific bodies.",
      },
      {
        type: "warning",
        content:
          "⚠ Vaccines are safe and effective. The overwhelming scientific consensus supports vaccination. Speak with your pediatrician if you have concerns about specific vaccines or your child's health condition.",
      },
      {
        type: "tip",
        content:
          "Comfort your baby during vaccinations with breastfeeding, a pacifier, or gentle distraction. A calm parent helps a calm baby. Most side effects are mild—low-grade fever or soreness at the injection site for 1-2 days.",
      },
    ],
    keyTakeaways: [
      "Vaccination prevents millions of deaths annually and is the safest way to protect against serious diseases",
      "Following the recommended schedule ensures optimal protection at the most vulnerable ages",
      "Vaccines undergo extensive safety testing and continuous monitoring after approval",
      "Herd immunity protects community members who cannot be vaccinated for medical reasons",
      "Side effects are typically mild and temporary; serious reactions are extremely rare",
    ],
    relatedSymptoms: [
      "Fever After Vaccination",
      "Sore Injection Site",
      "Mild Rash",
      "Fussiness",
      "Decreased Appetite",
    ],
    sources: [
      { label: "CDC — Childhood Immunization Schedule", url: "#" },
      { label: "WHO — Vaccination Fact Sheet", url: "#" },
      { label: "American Academy of Pediatrics — Vaccine Resources", url: "#" },
      { label: "NIH — Vaccine Safety Research", url: "#" },
    ],
    faqs: [
      {
        question: "Can vaccines cause the disease they are meant to prevent?",
        answer:
          "No. Vaccines use killed or weakened forms of pathogens that cannot cause disease in healthy individuals. Some vaccines (like MMR) use live attenuated viruses that are too weak to cause illness in people with normal immune systems.",
      },
      {
        question: "What if my child misses a scheduled vaccine?",
        answer:
          "Your pediatrician can administer catch-up vaccines according to the CDC's catch-up schedule. It is never too late to vaccinate—delaying vaccines leaves your child vulnerable to preventable diseases.",
      },
    ],
    sampleComments: [
      {
        id: "c6",
        patientName: "Sarah M.",
        patientAvatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
        date: "May 5, 2026",
        comment:
          "This is exactly what I needed as a new mom! The schedule is so clear and easy to follow. Thank you for making this information accessible.",
        likes: 38,
        replies: [],
      },
    ],
  },
  {
    id: "skin-care-tips",
    slug: "skin-care-tips",
    title: "Dermatologist-Approved Skin Care Tips for Healthy Skin",
    subtitle:
      "Expert advice on building an effective skincare routine, protecting your skin from damage, and treating common skin conditions.",
    excerpt:
      "Healthy skin is a reflection of overall wellness. Our dermatologists share their top tips for building an effective skincare routine tailored to your skin type.",
    category: "Skin Care",
    categorySlug: "skin-care",
    readTime: "5 min read",
    date: "April 28, 2026",
    modifiedDate: "May 15, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=700&fit=crop",
    views: 14200,
    likes: 823,
    comments: 55,
    isPopular: false,
    isTrending: true,
    featured: false,
    author: authors[0],
    content: [
      {
        type: "paragraph",
        content:
          "Your skin is your body's largest organ and your first line of defense against environmental damage. A proper skincare routine is essential for maintaining healthy, radiant skin at every age.",
      },
      {
        type: "heading",
        content: "The Foundation: Cleanse, Moisturize, Protect",
      },
      {
        type: "paragraph",
        content:
          "An effective skincare routine doesn't need to be complicated or expensive. The three essential steps—cleansing, moisturizing, and sun protection—form the foundation of healthy skin.",
      },
      {
        type: "list",
        items: [
          "Cleanse twice daily with a gentle, pH-balanced cleanser suitable for your skin type",
          "Moisturize while skin is still slightly damp to lock in hydration",
          "Apply broad-spectrum SPF 30+ sunscreen every morning, even on cloudy days",
          "Exfoliate 1-2 times per week with chemical exfoliants (AHAs or BHAs) for smoother texture",
          "Incorporate antioxidants like vitamin C in the morning for environmental protection",
        ],
      },
      {
        type: "tip",
        content:
          "Sunscreen is the single most effective anti-aging product. UV damage accumulates over time and is responsible for up to 80% of visible skin aging.",
      },
      {
        type: "heading",
        content: "Common Skin Concerns and Solutions",
      },
      {
        type: "table",
        caption: "Treatment Options by Skin Concern",
        rows: [
          {
            label: "Acne",
            value: "Salicylic acid, benzoyl peroxide, retinoids",
          },
          {
            label: "Dryness",
            value: "Hyaluronic acid, ceramides, gentle cleansing",
          },
          {
            label: "Hyperpigmentation",
            value: "Vitamin C, niacinamide, SPF, retinoids",
          },
          {
            label: "Fine Lines",
            value: "Retinoids, peptides, antioxidants, SPF",
          },
          {
            label: "Sensitivity",
            value: "Fragrance-free, soothing ingredients like centella",
          },
        ],
      },
    ],
    keyTakeaways: [
      "A simple three-step routine—cleanse, moisturize, protect—is the foundation of skin health",
      "Daily broad-spectrum sunscreen prevents premature aging and skin cancer",
      "Choose products formulated for your specific skin type and concerns",
      "Consistency matters more than expensive products for achieving results",
      "Consult a dermatologist for persistent or severe skin conditions",
    ],
    relatedSymptoms: ["Dry Skin", "Acne", "Rash", "Itching", "Redness"],
    sources: [
      {
        label: "American Academy of Dermatology — Skincare Guidelines",
        url: "#",
      },
      {
        label: "Journal of Clinical Dermatology — Sun Protection Research",
        url: "#",
      },
      { label: "NIH — Skin Health and Nutrition", url: "#" },
    ],
    faqs: [],
    sampleComments: [],
  },
  {
    id: "nutrition-for-seniors",
    slug: "nutrition-for-seniors",
    title: "Nutrition for Seniors: Eating Well at Every Age",
    subtitle:
      "Essential dietary guidance for older adults covering nutrient needs, meal planning, and healthy aging strategies.",
    excerpt:
      "As we age, nutritional needs change. Learn how to adapt your diet to support healthy aging, maintain muscle mass, and prevent chronic disease.",
    category: "Senior Care",
    categorySlug: "senior-care",
    readTime: "6 min read",
    date: "April 25, 2026",
    modifiedDate: "May 10, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1550989460-0adf4f622b7b?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1550989460-0adf4f622b7b?w=1200&h=700&fit=crop",
    views: 9870,
    likes: 567,
    comments: 32,
    isPopular: false,
    isTrending: false,
    featured: false,
    author: authors[2],
    content: [
      {
        type: "paragraph",
        content:
          "Good nutrition is essential at every stage of life, but it becomes especially important as we age. Proper nutrition can help seniors maintain independence, manage chronic conditions, and enjoy a higher quality of life.",
      },
      {
        type: "heading",
        content: "Key Nutrients for Healthy Aging",
      },
      {
        type: "table",
        caption: "Essential Nutrients for Seniors",
        rows: [
          { label: "Calcium", value: "1200mg daily for bone health" },
          { label: "Vitamin D", value: "800-1000 IU for calcium absorption" },
          {
            label: "Vitamin B12",
            value: "2.4mcg (often requires supplementation)",
          },
          { label: "Fiber", value: "25-30g for digestive health" },
          { label: "Protein", value: "1-1.2g per kg body weight" },
          { label: "Omega-3s", value: "Brain and heart health" },
        ],
      },
      {
        type: "callout",
        content:
          "🥗 Many seniors experience decreased appetite. Focus on nutrient-dense foods rather than large portions. Smoothies, soups, and fortified foods can help meet nutritional needs.",
      },
      {
        type: "heading",
        content: "Meal Planning Tips for Seniors",
      },
      {
        type: "list",
        items: [
          "Plan meals around colorful vegetables and fruits for antioxidants",
          "Include lean protein at every meal to maintain muscle mass",
          "Choose whole grains over refined carbohydrates for sustained energy",
          "Stay hydrated—thirst sensation decreases with age, aim for 8 cups daily",
          "Limit sodium to reduce blood pressure risk (under 1500mg daily)",
        ],
      },
    ],
    keyTakeaways: [
      "Calcium and vitamin D are critical for maintaining bone density and preventing fractures",
      "Adequate protein intake helps preserve muscle mass and strength in older adults",
      "Fiber supports digestive health and helps manage cholesterol and blood sugar",
      "Staying hydrated is especially important as thirst sensation diminishes with age",
      "Meal planning and nutrient-dense foods help overcome age-related appetite changes",
    ],
    relatedSymptoms: [
      "Loss of Appetite",
      "Fatigue",
      "Bone Pain",
      "Muscle Weakness",
      "Weight Changes",
    ],
    sources: [
      { label: "NIH — Nutrition for Older Adults", url: "#" },
      { label: "WHO — Healthy Aging Guidelines", url: "#" },
      {
        label: "Academy of Nutrition and Dietetics — Senior Nutrition",
        url: "#",
      },
    ],
    faqs: [],
    sampleComments: [],
  },
  {
    id: "exercise-benefits-mental-health",
    slug: "exercise-and-mental-health",
    title: "The Exercise-Mental Health Connection: Move for Your Mood",
    subtitle:
      "Discover how physical activity transforms brain chemistry, reduces depression, and builds emotional resilience.",
    excerpt:
      "Regular exercise does more than tone your body—it transforms your brain chemistry, reduces symptoms of depression and anxiety, and builds emotional resilience.",
    category: "Fitness",
    categorySlug: "fitness",
    readTime: "5 min read",
    date: "April 22, 2026",
    modifiedDate: "May 8, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=700&fit=crop",
    views: 11200,
    likes: 678,
    comments: 41,
    isPopular: false,
    isTrending: true,
    featured: false,
    author: authors[4],
    content: [
      {
        type: "paragraph",
        content:
          "The link between physical activity and mental health is one of the most robust findings in medical research. Exercise is not just good for your body—it is one of the most effective interventions for improving mental wellbeing.",
      },
      {
        type: "heading",
        content: "How Exercise Affects Your Brain",
      },
      {
        type: "paragraph",
        content:
          "When you exercise, your brain releases endorphins, serotonin, dopamine, and norepinephrine—neurotransmitters that regulate mood, reduce pain perception, and improve focus. Regular exercise also stimulates the growth of new brain cells in the hippocampus, the region responsible for memory and emotional regulation.",
      },
      {
        type: "statistics",
        stats: [
          { label: "Depression Risk Reduction", value: "25%" },
          { label: "Anxiety Symptom Improvement", value: "30-40%" },
          { label: "Improved Sleep Quality", value: "65%" },
        ],
      },
      {
        type: "tip",
        content:
          "Even a single session of moderate exercise can elevate your mood for up to 24 hours. Consistency matters most—find an activity you enjoy and make it a non-negotiable part of your routine.",
      },
    ],
    keyTakeaways: [
      "Exercise releases mood-elevating neurotransmitters that reduce depression and anxiety",
      "Regular physical activity stimulates neurogenesis in the hippocampus, improving memory and mood",
      "Even 30 minutes of moderate exercise, 5 days per week, produces significant mental health benefits",
      "Outdoor exercise in natural settings provides additional mood-boosting benefits",
      "Consistency matters more than intensity for long-term mental health improvements",
    ],
    relatedSymptoms: [
      "Low Mood",
      "Fatigue",
      "Poor Sleep",
      "Irritability",
      "Brain Fog",
    ],
    sources: [
      {
        label: "Harvard Medical School — Exercise and Mental Health",
        url: "#",
      },
      {
        label:
          "American Psychological Association — Physical Activity Guidelines",
        url: "#",
      },
      { label: "NIH — Exercise and Brain Health", url: "#" },
    ],
    faqs: [],
    sampleComments: [],
  },
  {
    id: "women-heart-disease",
    slug: "women-and-heart-disease",
    title: "Heart Disease in Women: Recognizing Unique Warning Signs",
    subtitle:
      "Women often experience different heart attack symptoms than men. Learn what to watch for and how to protect your heart.",
    excerpt:
      "Heart disease affects women differently than men. Learn about the unique risk factors, symptoms, and prevention strategies specific to women's heart health.",
    category: "Women's Health",
    categorySlug: "womens-health",
    readTime: "6 min read",
    date: "April 20, 2026",
    modifiedDate: "May 5, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    largeImageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=700&fit=crop",
    views: 13500,
    likes: 745,
    comments: 53,
    isPopular: false,
    isTrending: false,
    featured: false,
    author: authors[3],
    content: [
      {
        type: "paragraph",
        content:
          "Heart disease is the leading cause of death among women worldwide, yet it is often under-recognized and undertreated in women compared to men. Understanding how heart disease manifests differently in women is crucial for early detection and prevention.",
      },
      {
        type: "heading",
        content: "Women's Heart Attack Symptoms Are Different",
      },
      {
        type: "paragraph",
        content:
          "While men typically experience classic chest pain during a heart attack, women are more likely to experience subtler symptoms that can be easily dismissed or attributed to other conditions.",
      },
      {
        type: "list",
        items: [
          "Unusual fatigue lasting days or weeks before the event",
          "Shortness of breath without chest discomfort",
          "Indigestion, nausea, or vomiting",
          "Back, neck, or jaw pain",
          "Lightheadedness or dizziness",
          "Anxiety or a sense of doom",
        ],
      },
      {
        type: "warning",
        content:
          "⚠ If you are a woman experiencing any combination of these symptoms—especially if they are new or unusual for you—do not dismiss them. Call emergency services immediately.",
      },
    ],
    keyTakeaways: [
      "Women often experience heart attack symptoms differently than men, including fatigue, nausea, and back pain",
      "Pregnancy complications like preeclampsia and gestational diabetes increase long-term heart disease risk",
      "Regular heart health screenings should begin by age 20 for all women",
      "Autoimmune conditions common in women (like lupus and RA) increase cardiovascular risk",
      "Lifestyle modifications are highly effective for preventing heart disease in women",
    ],
    relatedSymptoms: [
      "Chest Pressure",
      "Jaw Pain",
      "Extreme Fatigue",
      "Shortness of Breath",
      "Nausea",
    ],
    sources: [
      { label: "Go Red for Women — American Heart Association", url: "#" },
      { label: "NIH — Women and Heart Disease Research", url: "#" },
      { label: "CDC — Heart Disease in Women", url: "#" },
    ],
    faqs: [],
    sampleComments: [],
  },
];

export const trendingArticles = articles
  .filter((a) => a.isTrending)
  .slice(0, 6);
export const popularArticles = articles.filter((a) => a.isPopular).slice(0, 4);
export const featuredArticle = articles.find((a) => a.featured) ?? articles[0];
export const regularArticles = articles.filter((a) => !a.featured);

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getRelatedArticles(currentSlug: string, limit = 4): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((a) => a.slug !== currentSlug)
    .sort((a, b) => {
      const aSameCat = a.categorySlug === current.categorySlug ? 1 : 0;
      const bSameCat = b.categorySlug === current.categorySlug ? 1 : 0;
      return bSameCat - aSameCat || b.views - a.views;
    })
    .slice(0, limit);
}

export function getUniqueCategories(): string[] {
  return [...new Set(articles.map((a) => a.category))];
}

export function getUniqueAuthors(): ArticleAuthor[] {
  const seen = new Set<string>();
  return articles
    .filter((a) => {
      if (seen.has(a.author.id)) return false;
      seen.add(a.author.id);
      return true;
    })
    .map((a) => a.author);
}
